import json
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "../../shared"))

from response import success_response, error_response


def lambda_handler(event, context):
    """
    Handles user preferences requests.

    Supported methods:
    GET  /preferences
    POST /preferences
    """

    try:
        method = event.get("httpMethod", "")

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
    """
    Temporary mock response.
    Later this will read the user's preferences from DynamoDB.
    """

    mock_preferences = {
        "userId": "mock-user-123",
        "quietEnvironment": True,
        "needPowerOutlet": True,
        "wifiQuality": "high",
        "preferredSeatType": "table",
        "priceRange": "medium"
    }

    return success_response(
        message="Preferences loaded successfully",
        data=mock_preferences
    )


def save_preferences(event):
    """
    Temporary mock save.
    Later this will save the preferences to DynamoDB.
    """

    body = event.get("body")

    if not body:
        return error_response(
            message="Missing request body",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    data = json.loads(body)

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

    saved_preferences = {
        "userId": "mock-user-123",
        **data
    }

    return success_response(
        message="Preferences saved successfully",
        data=saved_preferences
    )