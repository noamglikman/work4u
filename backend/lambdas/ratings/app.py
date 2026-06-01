import json
import sys
import os
from datetime import datetime, timezone
from uuid import uuid4

sys.path.append(os.path.join(os.path.dirname(__file__), "../../shared"))

from response import success_response, error_response


def lambda_handler(event, context):
    """
    Handles ratings requests.

    Supported methods:
    GET  /ratings/my
    POST /ratings
    """

    try:
        method = event.get("httpMethod", "")

        if method == "GET":
            return get_my_ratings(event)

        if method == "POST":
            return submit_rating(event)

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


def get_my_ratings(event):
    mock_ratings = [
        {
            "ratingId": "rating-001",
            "venueId": "venue-001",
            "venueName": "Work Cafe Tel Aviv",
            "crowdLevel": "reasonable",
            "wifiRating": 5,
            "noiseRating": 3,
            "comment": "Good place to work.",
            "createdAt": "2026-06-01T11:00:00Z"
        }
    ]

    return success_response(
        message="Ratings history loaded successfully",
        data=mock_ratings
    )


def submit_rating(event):
    body = event.get("body")

    if not body:
        return error_response(
            message="Missing request body",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    data = json.loads(body)

    required_fields = [
        "venueId",
        "crowdLevel",
        "wifiRating",
        "noiseRating"
    ]

    for field in required_fields:
        if field not in data:
            return error_response(
                message=f"Missing required field: {field}",
                error_code="VALIDATION_ERROR",
                status_code=400
            )

    rating = {
        "ratingId": f"rating-{uuid4()}",
        "userId": "mock-user-123",
        "venueId": data["venueId"],
        "crowdLevel": data["crowdLevel"],
        "wifiRating": data["wifiRating"],
        "noiseRating": data["noiseRating"],
        "comment": data.get("comment", ""),
        "createdAt": datetime.now(timezone.utc).isoformat()
    }

    return success_response(
        message="Rating submitted successfully",
        data=rating
    )