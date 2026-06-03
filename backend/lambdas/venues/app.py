import os
import math
from decimal import Decimal

import boto3

from shared.response import success_response, error_response
from shared.auth import get_current_user


VENUES_TABLE = os.environ.get("VENUES_TABLE", "Work4U_Venues")
USER_LEARNING_TABLE = os.environ.get("USER_LEARNING_TABLE", "Work4U_UserLearning")

dynamodb = boto3.resource("dynamodb")
venues_table = dynamodb.Table(VENUES_TABLE)
learning_table = dynamodb.Table(USER_LEARNING_TABLE)


def lambda_handler(event, context):
    try:
        method = event.get("httpMethod", "")

        if method == "OPTIONS":
            return success_response("CORS preflight OK")

        if method != "GET":
            return error_response(
                message="Method not allowed",
                error_code="METHOD_NOT_ALLOWED",
                status_code=405,
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
            status_code=500,
        )


def get_all_venues(event):
    query_params = event.get("queryStringParameters") or {}

    response = venues_table.scan()
    venues = response.get("Items", [])

    while "LastEvaluatedKey" in response:
        response = venues_table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        venues.extend(response.get("Items", []))

    active_venues = [
        venue for venue in venues
        if venue.get("isActive", True) is True
    ]

    learning_profile = get_learning_profile_for_request(event)
    filtered_venues = apply_filters_and_rank(active_venues, query_params, learning_profile)

    return success_response(
        message="Venues loaded successfully",
        data=filtered_venues,
    )


def get_venue_by_id(venue_id):
    response = venues_table.get_item(Key={"venueId": venue_id})
    venue = response.get("Item")

    if not venue or venue.get("isActive") is False:
        return error_response(
            message="Venue not found",
            error_code="NOT_FOUND",
            status_code=404,
        )

    if "forecast" not in venue:
        venue["forecast"] = build_default_forecast()

    return success_response(
        message="Venue details loaded successfully",
        data=venue,
    )


def apply_filters_and_rank(venues, query_params, learning_profile=None):
    result = venues

    search = query_params.get("search")

    # These are now treated as preference signals, not hard filters.
    preferred_price_range = query_params.get("priceRange")
    preferred_wifi_quality = query_params.get("wifiQuality")
    prefers_quiet = query_params.get("quietEnvironment") == "true"
    prefers_power = query_params.get("needPowerOutlet") == "true"

    user_lat = parse_float(query_params.get("lat"))
    user_lng = parse_float(query_params.get("lng"))
    radius_km = parse_float(query_params.get("radiusKm"))

    # Hard filter: text search.
    if search:
        search_lower = search.lower().strip()
        result = [
            venue for venue in result
            if search_lower in build_search_text(venue).lower()
        ]

    ranked = []

    for venue in result:
        venue_lat = parse_float(venue.get("latitude"))
        venue_lng = parse_float(venue.get("longitude"))

        distance = None

        # Hard filter: real radius.
        if user_lat is not None and user_lng is not None and radius_km is not None:
            if venue_lat is None or venue_lng is None:
                continue

            distance = haversine_km(user_lat, user_lng, venue_lat, venue_lng)

            if distance > radius_km:
                continue

            venue["distanceKm"] = Decimal(str(round(distance, 2)))

        base_score = calculate_match_score(
            venue=venue,
            preferred_price_range=preferred_price_range,
            preferred_wifi_quality=preferred_wifi_quality,
            prefers_quiet=prefers_quiet,
            prefers_power=prefers_power,
        )

        learning_score = calculate_learning_score(venue, learning_profile)
        match_score = base_score + learning_score

        venue["matchScore"] = Decimal(str(match_score))
        venue["learningScore"] = Decimal(str(learning_score))

        ranked.append(venue)

    # Higher match score first, then closer distance.
    ranked.sort(
        key=lambda venue: (
            -float(venue.get("matchScore", 0)),
            float(venue.get("distanceKm", 999999)),
            str(venue.get("name", "")),
        )
    )

    return ranked


def calculate_match_score(
    venue,
    preferred_price_range,
    preferred_wifi_quality,
    prefers_quiet,
    prefers_power,
):
    score = 0

    if preferred_price_range and preferred_price_range != "any":
        if venue.get("priceRange") == preferred_price_range:
            score += 2

    if preferred_wifi_quality:
        if venue.get("wifiQuality") == preferred_wifi_quality:
            score += 2

    if prefers_quiet:
        if venue.get("noiseLevel") == "low":
            score += 2
        elif venue.get("noiseLevel") == "medium":
            score += 1

    if prefers_power:
        if venue.get("hasPowerOutlets") is True:
            score += 2

    return score


def build_search_text(venue):
    values = [
        venue.get("name"),
        venue.get("nameHe"),
        venue.get("nameEn"),
        venue.get("address"),
        venue.get("addressHe"),
        venue.get("addressEn"),
        venue.get("description"),
        venue.get("placeType"),
    ]

    aliases = venue.get("searchAliases", [])

    if isinstance(aliases, list):
        values.extend(aliases)

    return " ".join(str(value) for value in values if value)



def get_learning_profile_for_request(event):
    """
    Loads behavior-based personalization profile for the current Cognito user.
    If anything fails, venues still load normally without personalization.
    """

    try:
        current_user = get_current_user(event)
        user_id = current_user.get("userId")

        if not user_id:
            return None

        response = learning_table.get_item(Key={"userId": user_id})
        return response.get("Item")
    except Exception:
        return None


def calculate_learning_score(venue, learning_profile):
    if not learning_profile:
        return 0

    category_scores = learning_profile.get("categoryScores", {})

    if not isinstance(category_scores, dict):
        return 0

    place_type = normalize_place_type(venue.get("placeType"))
    score = category_scores.get(place_type, 0)

    try:
        score = int(score)
    except (ValueError, TypeError):
        score = 0

    # Keep the learning influence meaningful but not too aggressive.
    return min(score, 10)


def normalize_place_type(value):
    value = str(value or "").strip().lower()

    if value in {"cafe", "coffee"}:
        return "cafe"

    if value in {"coworking", "office"}:
        return "coworking"

    if value == "library":
        return "library"

    if value in {"academic", "university", "college"}:
        return "academic"

    if value in {"community", "community_centre"}:
        return "community"

    return "workspace"



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
        + math.cos(lat1_rad)
        * math.cos(lat2_rad)
        * math.sin(dlng / 2) ** 2
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return earth_radius_km * c


def build_default_forecast():
    return [
        {"hour": "09:00", "crowdLevel": "free"},
        {"hour": "12:00", "crowdLevel": "reasonable"},
        {"hour": "18:00", "crowdLevel": "crowded"},
    ]
