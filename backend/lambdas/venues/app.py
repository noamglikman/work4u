import os

import boto3

from shared.response import success_response, error_response


VENUES_TABLE = os.environ.get("VENUES_TABLE", "Work4U_Venues")

dynamodb = boto3.resource("dynamodb")
venues_table = dynamodb.Table(VENUES_TABLE)


def lambda_handler(event, context):
    """
    Handles venue requests.

    Supported routes:
    GET /venues
    GET /venues/{venueId}
    """

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
        Key={
            "venueId": venue_id
        }
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

    if search:
        search_lower = search.lower()

        result = [
            venue for venue in result
            if search_lower in venue.get("name", "").lower()
            or search_lower in venue.get("address", "").lower()
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

    return result


def build_default_forecast():
    return [
        {
            "hour": "09:00",
            "crowdLevel": "free"
        },
        {
            "hour": "12:00",
            "crowdLevel": "reasonable"
        },
        {
            "hour": "18:00",
            "crowdLevel": "crowded"
        }
    ]