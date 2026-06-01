import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "../../shared"))

from response import success_response, error_response


MOCK_VENUES = [
    {
        "venueId": "venue-001",
        "name": "Work Cafe Tel Aviv",
        "address": "Dizengoff 100, Tel Aviv",
        "latitude": 32.0853,
        "longitude": 34.7818,
        "priceRange": "medium",
        "wifiQuality": "high",
        "noiseLevel": "medium",
        "hasPowerOutlets": True,
        "averageRating": 4.5,
        "currentCrowdLevel": "reasonable",
        "mainImageUrl": ""
    },
    {
        "venueId": "venue-002",
        "name": "Quiet Hub",
        "address": "Rothschild 22, Tel Aviv",
        "latitude": 32.064,
        "longitude": 34.774,
        "priceRange": "high",
        "wifiQuality": "high",
        "noiseLevel": "low",
        "hasPowerOutlets": True,
        "averageRating": 4.8,
        "currentCrowdLevel": "free",
        "mainImageUrl": ""
    }
]


def lambda_handler(event, context):
    """
    Handles venues requests.

    Supported routes:
    GET /venues
    GET /venues/{venueId}
    """

    try:
        path_parameters = event.get("pathParameters") or {}
        venue_id = path_parameters.get("venueId")

        if venue_id:
            return get_venue_by_id(venue_id)

        return get_all_venues()

    except Exception as e:
        return error_response(
            message=str(e),
            error_code="SERVER_ERROR",
            status_code=500
        )


def get_all_venues():
    return success_response(
        message="Venues loaded successfully",
        data=MOCK_VENUES
    )


def get_venue_by_id(venue_id):
    for venue in MOCK_VENUES:
        if venue["venueId"] == venue_id:
            venue_details = {
                **venue,
                "openingHours": "08:00-22:00",
                "description": "A comfortable workspace suitable for students and remote workers.",
                "imageUrls": [],
                "forecast": [
                    {"hour": "09:00", "crowdLevel": "free"},
                    {"hour": "12:00", "crowdLevel": "reasonable"},
                    {"hour": "18:00", "crowdLevel": "crowded"}
                ]
            }

            return success_response(
                message="Venue details loaded successfully",
                data=venue_details
            )

    return error_response(
        message="Venue not found",
        error_code="NOT_FOUND",
        status_code=404
    )