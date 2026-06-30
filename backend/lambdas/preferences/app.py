import os
from datetime import datetime, timezone

import boto3

from shared.auth import get_current_user
from shared.response import success_response, error_response, parse_json_body


PREFERENCES_TABLE = os.environ.get("PREFERENCES_TABLE", "Work4U_UserPreferences")

dynamodb = boto3.resource("dynamodb")
preferences_table = dynamodb.Table(PREFERENCES_TABLE)


VALID_WIFI_QUALITIES = {"low", "medium", "high"}
VALID_SEAT_TYPES = {"table", "sofa", "bar", "any"}
VALID_PRICE_RANGES = {"low", "medium", "high", "any"}


def lambda_handler(event, context):
    """
    Handles user preferences.

    Supported routes:
    GET  /preferences
    POST /preferences
    """

    try:
        method = event.get("httpMethod", "")

        if method == "OPTIONS":
            return success_response("CORS preflight OK")

        if method == "GET":
            return get_preferences(event)

        if method == "POST":
            return save_preferences(event)

        return error_response(
            message="Method not allowed",
            error_code="METHOD_NOT_ALLOWED",
            status_code=405
        )

    except Exception as e:
        return error_response(
            message=str(e),
            error_code="SERVER_ERROR",
            status_code=500
        )


def get_preferences(event):
    user = get_current_user(event)
    user_id = user["userId"]

    result = preferences_table.get_item(
        Key={
            "userId": user_id
        }
    )

    preferences = result.get("Item")

    if not preferences:
        return success_response(
            message="No preferences found for this user",
            data=None
        )

    # Backward compatibility for users who saved preferences before favorites existed.
    preferences.setdefault("favoriteVenueIds", [])

    return success_response(
        message="Preferences loaded successfully",
        data=preferences
    )


def save_preferences(event):
    user = get_current_user(event)
    user_id = user["userId"]

    data = parse_json_body(event)

    validation_error = validate_preferences(data)

    if validation_error:
        return validation_error

    item = {
        "userId": user_id,
        "email": user.get("email", ""),
        "quietEnvironment": data["quietEnvironment"],
        "needPowerOutlet": data["needPowerOutlet"],
        "wifiQuality": data["wifiQuality"],
        "preferredSeatType": data["preferredSeatType"],
        "preferredSeatTypes": clean_preferred_seat_types(
            data.get("preferredSeatTypes"),
            data.get("preferredSeatType")
        ),
        "priceRange": data["priceRange"],
        "favoriteVenueIds": clean_favorite_venue_ids(data.get("favoriteVenueIds", [])),
        "updatedAt": datetime.now(timezone.utc).isoformat()
    }

    preferences_table.put_item(Item=item)

    return success_response(
        message="Preferences saved successfully",
        data=item
    )



def clean_preferred_seat_types(value, fallback=None):
    """
    New format: preferredSeatTypes = ["table", "sofa"].
    Backward compatibility: if the array is missing, derive it from preferredSeatType.
    "any" means no specific seating preference.
    """

    if value is None:
        if fallback and fallback != "any":
            return [fallback]
        return []

    if not isinstance(value, list):
        return []

    cleaned = []

    for seat_type in value:
        if not isinstance(seat_type, str):
            continue

        seat_type = seat_type.strip()

        if seat_type == "any":
            continue

        if seat_type not in VALID_SEAT_TYPES:
            continue

        if seat_type not in cleaned:
            cleaned.append(seat_type)

    return cleaned[:3]

def clean_favorite_venue_ids(value):
    if value is None:
        return []

    if not isinstance(value, list):
        return []

    cleaned = []

    for venue_id in value:
        if not isinstance(venue_id, str):
            continue

        venue_id = venue_id.strip()

        if not venue_id:
            continue

        if venue_id not in cleaned:
            cleaned.append(venue_id)

    # Prevent a single user preferences item from growing too much.
    return cleaned[:100]


def validate_preferences(data):
    required_fields = [
        "quietEnvironment",
        "needPowerOutlet",
        "wifiQuality",
        "preferredSeatType",
        "priceRange"
    ]

    for field in required_fields:
        if field not in data:
            return error_response(
                message=f"Missing required field: {field}",
                error_code="VALIDATION_ERROR",
                status_code=400
            )

    if not isinstance(data["quietEnvironment"], bool):
        return error_response(
            message="quietEnvironment must be boolean",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if not isinstance(data["needPowerOutlet"], bool):
        return error_response(
            message="needPowerOutlet must be boolean",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if data["wifiQuality"] not in VALID_WIFI_QUALITIES:
        return error_response(
            message="wifiQuality must be one of: low, medium, high",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if data["preferredSeatType"] not in VALID_SEAT_TYPES:
        return error_response(
            message="preferredSeatType must be one of: table, sofa, bar, any",
            error_code="VALIDATION_ERROR",
            status_code=400
        )


    preferred_seat_types = data.get("preferredSeatTypes")

    if preferred_seat_types is not None:
        if not isinstance(preferred_seat_types, list):
            return error_response(
                message="preferredSeatTypes must be a list",
                error_code="VALIDATION_ERROR",
                status_code=400
            )

        for seat_type in preferred_seat_types:
            if seat_type not in VALID_SEAT_TYPES:
                return error_response(
                    message="preferredSeatTypes values must be one of: table, sofa, bar, any",
                    error_code="VALIDATION_ERROR",
                    status_code=400
                )

    if data["priceRange"] not in VALID_PRICE_RANGES:
        return error_response(
            message="priceRange must be one of: low, medium, high, any",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "favoriteVenueIds" in data and not isinstance(data["favoriteVenueIds"], list):
        return error_response(
            message="favoriteVenueIds must be a list",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    return None
