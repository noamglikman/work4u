import os
import math
from decimal import Decimal

import boto3

from shared.response import success_response, error_response


VENUES_TABLE = os.environ.get("VENUES_TABLE", "Work4U_Venues")

dynamodb = boto3.resource("dynamodb")
venues_table = dynamodb.Table(VENUES_TABLE)


def lambda_handler(event, context):
    try:
        method = event.get("httpMethod", "")

        if method == "OPTIONS":
            return success_response("CORS preflight OK")

        if method != "GET":
            return error_response(
                message="Method not allowed",
                error_code="METHOD_NOT_ALLOWED",
                status_code=405
            )

        path_parameters = event.get("pathParameters") or {}
        venue_id = path_parameters.get("venueId")

        if venue_id:
            return get_venue_by_id(venue_id)

        return get_all_venues(event)

    except Exception as e:
        return error_response(
            message=str(e),
            error_code="SERVER_ERROR",
            status_code=500
        )


def get_all_venues(event):
    query_params = event.get("queryStringParameters") or {}

    response = venues_table.scan()
    venues = response.get("Items", [])

    while "LastEvaluatedKey" in response:
        response = venues_table.scan(
            ExclusiveStartKey=response["LastEvaluatedKey"]
        )
        venues.extend(response.get("Items", []))

    active_venues = [
        venue for venue in venues
        if venue.get("isActive", True) is True
    ]

    filtered_venues = apply_filters(active_venues, query_params)

    return success_response(
        message="Venues loaded successfully",
        data=filtered_venues
    )


def get_venue_by_id(venue_id):
    response = venues_table.get_item(
        Key={"venueId": venue_id}
    )

    venue = response.get("Item")

    if not venue or venue.get("isActive") is False:
        return error_response(
            message="Venue not found",
            error_code="NOT_FOUND",
            status_code=404
        )

    if "forecast" not in venue:
        venue["forecast"] = build_default_forecast()

    return success_response(
        message="Venue details loaded successfully",
        data=venue
    )


def apply_filters(venues, query_params):
    result = venues

    search = query_params.get("search")
    price_range = query_params.get("priceRange")
    wifi_quality = query_params.get("wifiQuality")
    quiet_environment = query_params.get("quietEnvironment")
    need_power_outlet = query_params.get("needPowerOutlet")

    user_lat = parse_float(query_params.get("lat"))
    user_lng = parse_float(query_params.get("lng"))
    radius_km = parse_float(query_params.get("radiusKm"))

    if search:
        search_lower = search.lower()
        result = [
            venue for venue in result
            if search_lower in str(venue.get("name", "")).lower()
            or search_lower in str(venue.get("address", "")).lower()
        ]

    if price_range and price_range != "any":
        result = [
            venue for venue in result
            if venue.get("priceRange") == price_range
        ]

    if wifi_quality:
        result = [
            venue for venue in result
            if venue.get("wifiQuality") == wifi_quality
        ]

    if quiet_environment == "true":
        result = [
            venue for venue in result
            if venue.get("noiseLevel") == "low"
        ]

    if need_power_outlet == "true":
        result = [
            venue for venue in result
            if venue.get("hasPowerOutlets") is True
        ]

    if user_lat is not None and user_lng is not None and radius_km is not None:
        venues_with_distance = []

        for venue in result:
            venue_lat = parse_float(venue.get("latitude"))
            venue_lng = parse_float(venue.get("longitude"))

            if venue_lat is None or venue_lng is None:
                continue

            distance = haversine_km(user_lat, user_lng, venue_lat, venue_lng)

            if distance <= radius_km:
                venue["distanceKm"] = Decimal(str(round(distance, 2)))
                venues_with_distance.append(venue)

        result = sorted(
            venues_with_distance,
            key=lambda venue: float(venue.get("distanceKm", 999999))
        )

    return result


def parse_float(value):
    if value is None:
        return None

    try:
        return float(value)
    except (ValueError, TypeError):
        return None


def haversine_km(lat1, lng1, lat2, lng2):
    earth_radius_km = 6371.0

    lat1_rad = math.radians(lat1)
    lng1_rad = math.radians(lng1)
    lat2_rad = math.radians(lat2)
    lng2_rad = math.radians(lng2)

    dlat = lat2_rad - lat1_rad
    dlng = lng2_rad - lng1_rad

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlng / 2) ** 2
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return earth_radius_km * c


def build_default_forecast():
    return [
        {"hour": "09:00", "crowdLevel": "free"},
        {"hour": "12:00", "crowdLevel": "reasonable"},
        {"hour": "18:00", "crowdLevel": "crowded"}
    ]
