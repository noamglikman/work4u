import os
from datetime import datetime, timezone
from decimal import Decimal
from uuid import uuid4
from zoneinfo import ZoneInfo

import boto3
from boto3.dynamodb.conditions import Key, Attr

from shared.auth import get_current_user
from shared.response import success_response, error_response, parse_json_body

RATINGS_TABLE = os.environ.get("RATINGS_TABLE", "Work4U_Ratings")
VENUES_TABLE = os.environ.get("VENUES_TABLE", "Work4U_Venues")

dynamodb = boto3.resource("dynamodb")
ratings_table = dynamodb.Table(RATINGS_TABLE)
venues_table = dynamodb.Table(VENUES_TABLE)


VALID_CROWD_LEVELS = {"free", "reasonable", "crowded"}
APP_TZ = ZoneInfo("Asia/Jerusalem")


def lambda_handler(event, context):
    """
    Handles workspace ratings.

    Supported routes:
    GET    /ratings/my
    POST   /ratings
    PUT    /ratings/{ratingId}
    DELETE /ratings/{ratingId}
    """

    try:
        method = event.get("httpMethod", "")

        if method == "OPTIONS":
            return success_response("CORS preflight OK")

        path_parameters = event.get("pathParameters") or {}
        rating_id = path_parameters.get("ratingId")

        if method == "GET":
            return get_my_ratings(event)

        if method == "POST":
            return submit_rating(event)

        if method == "PUT":
            if not rating_id:
                return error_response(
                    message="Missing ratingId path parameter",
                    error_code="VALIDATION_ERROR",
                    status_code=400
                )

            return update_rating(event, rating_id)

        if method == "DELETE":
            if not rating_id:
                return error_response(
                    message="Missing ratingId path parameter",
                    error_code="VALIDATION_ERROR",
                    status_code=400
                )

            return delete_rating(event, rating_id)

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
    """
    Returns all ratings submitted by the current logged-in user.
    """

    user = get_current_user(event)
    user_id = user["userId"]

    response = ratings_table.query(
        IndexName="userId-index",
        KeyConditionExpression=Key("userId").eq(user_id)
    )

    ratings = response.get("Items", [])

    while "LastEvaluatedKey" in response:
        response = ratings_table.query(
            IndexName="userId-index",
            KeyConditionExpression=Key("userId").eq(user_id),
            ExclusiveStartKey=response["LastEvaluatedKey"]
        )

        ratings.extend(response.get("Items", []))

    ratings = sorted(
        ratings,
        key=lambda item: item.get("createdAt", ""),
        reverse=True
    )

    return success_response(
        message="Ratings history loaded successfully",
        data=ratings
    )


def submit_rating(event):
    """
    Creates a new rating for a workspace.
    """

    user = get_current_user(event)
    user_id = user["userId"]

    data = parse_json_body(event)

    validation_error = validate_rating_payload(data, is_update=False)

    if validation_error:
        return validation_error

    venue = get_venue(data["venueId"])

    if not venue:
        return error_response(
            message="Venue not found",
            error_code="NOT_FOUND",
            status_code=404
        )

    now_dt = datetime.now(timezone.utc)
    now = now_dt.isoformat()
    rating_date = now_dt.astimezone(APP_TZ).date().isoformat()

    existing_today_rating = get_existing_rating_for_today(
        user_id=user_id,
        venue_id=data["venueId"],
        rating_date=rating_date
    )

    if existing_today_rating:
        return error_response(
            message="You already rated this venue today. You can rate it again tomorrow.",
            error_code="DUPLICATE_RESOURCE",
            status_code=409
        )

    item = {
        "ratingId": f"rating-{uuid4()}",
        "userId": user_id,
        "userEmail": user.get("email", ""),
        "venueId": data["venueId"],
        "venueName": venue.get("name", ""),
        "ratingDate": rating_date,
        "crowdLevel": data["crowdLevel"],
        "wifiRating": int(data["wifiRating"]),
        "noiseRating": int(data["noiseRating"]),
        "comment": data.get("comment", ""),
        "createdAt": now,
        "updatedAt": now
    }

    ratings_table.put_item(Item=item)
    recalculate_venue_rating(data["venueId"])

    return success_response(
        message="Rating submitted successfully",
        data=item,
        status_code=201
    )


def update_rating(event, rating_id):
    """
    Updates an existing rating.

    Regular users can update only their own rating.
    Admin users can update any rating.
    """

    user = get_current_user(event)
    data = parse_json_body(event)

    existing_rating = get_rating(rating_id)

    if not existing_rating:
        return error_response(
            message="Rating not found",
            error_code="NOT_FOUND",
            status_code=404
        )

    if not user["isAdmin"] and existing_rating.get("userId") != user["userId"]:
        return error_response(
            message="You are not allowed to update this rating",
            error_code="FORBIDDEN",
            status_code=403
        )

    validation_error = validate_rating_payload(data, is_update=True)

    if validation_error:
        return validation_error

    updated_item = {
        **existing_rating,
        "crowdLevel": data.get("crowdLevel", existing_rating.get("crowdLevel")),
        "wifiRating": int(data.get("wifiRating", existing_rating.get("wifiRating"))),
        "noiseRating": int(data.get("noiseRating", existing_rating.get("noiseRating"))),
        "comment": data.get("comment", existing_rating.get("comment", "")),
        "updatedAt": datetime.now(timezone.utc).isoformat()
    }

    ratings_table.put_item(Item=updated_item)
    recalculate_venue_rating(updated_item["venueId"])

    return success_response(
        message="Rating updated successfully",
        data=updated_item
    )


def delete_rating(event, rating_id):
    """
    Deletes a rating.

    Regular users can delete only their own rating.
    Admin users can delete any rating.
    """

    user = get_current_user(event)

    existing_rating = get_rating(rating_id)

    if not existing_rating:
        return error_response(
            message="Rating not found",
            error_code="NOT_FOUND",
            status_code=404
        )

    if not user["isAdmin"] and existing_rating.get("userId") != user["userId"]:
        return error_response(
            message="You are not allowed to delete this rating",
            error_code="FORBIDDEN",
            status_code=403
        )

    ratings_table.delete_item(
        Key={
            "ratingId": rating_id
        }
    )

    recalculate_venue_rating(existing_rating["venueId"])

    return success_response(
        message="Rating deleted successfully",
        data={
            "ratingId": rating_id
        }
    )



def recalculate_venue_rating(venue_id):
    """
    Recalculates the public average rating for a venue after a rating is
    created, updated, or deleted.

    We currently calculate the venue score as the average of:
    - wifiRating
    - noiseRating

    Each rating therefore contributes one score between 1 and 5.
    """

    ratings = []

    response = ratings_table.scan(
        FilterExpression=Attr("venueId").eq(venue_id)
    )

    ratings.extend(response.get("Items", []))

    while "LastEvaluatedKey" in response:
        response = ratings_table.scan(
            FilterExpression=Attr("venueId").eq(venue_id),
            ExclusiveStartKey=response["LastEvaluatedKey"]
        )
        ratings.extend(response.get("Items", []))

    scores = []

    for rating in ratings:
        try:
            wifi = float(rating.get("wifiRating", 0))
            noise = float(rating.get("noiseRating", 0))

            if wifi <= 0 and noise <= 0:
                continue

            if wifi <= 0:
                score = noise
            elif noise <= 0:
                score = wifi
            else:
                score = (wifi + noise) / 2

            scores.append(score)
        except Exception:
            continue

    rating_count = len(scores)
    average_rating = 0 if rating_count == 0 else round(sum(scores) / rating_count, 2)

    venues_table.update_item(
        Key={
            "venueId": venue_id
        },
        UpdateExpression="SET averageRating = :averageRating, ratingCount = :ratingCount, updatedAt = :updatedAt",
        ExpressionAttributeValues={
            ":averageRating": Decimal(str(average_rating)),
            ":ratingCount": rating_count,
            ":updatedAt": datetime.now(timezone.utc).isoformat(),
        }
    )


def get_existing_rating_for_today(user_id, venue_id, rating_date):
    """
    Returns an existing rating if this user already rated this venue today.

    We query by userId using the existing userId-index, then filter by
    venueId and ratingDate. This avoids scanning the whole ratings table.
    """

    response = ratings_table.query(
        IndexName="userId-index",
        KeyConditionExpression=Key("userId").eq(user_id),
        FilterExpression=Attr("venueId").eq(venue_id) & Attr("ratingDate").eq(rating_date)
    )

    items = response.get("Items", [])

    while not items and "LastEvaluatedKey" in response:
        response = ratings_table.query(
            IndexName="userId-index",
            KeyConditionExpression=Key("userId").eq(user_id),
            FilterExpression=Attr("venueId").eq(venue_id) & Attr("ratingDate").eq(rating_date),
            ExclusiveStartKey=response["LastEvaluatedKey"]
        )
        items.extend(response.get("Items", []))

    return items[0] if items else None

def get_rating(rating_id):
    response = ratings_table.get_item(
        Key={
            "ratingId": rating_id
        }
    )

    return response.get("Item")


def get_venue(venue_id):
    response = venues_table.get_item(
        Key={
            "venueId": venue_id
        }
    )

    venue = response.get("Item")

    if not venue:
        return None

    if venue.get("isActive") is False:
        return None

    return venue


def validate_rating_payload(data, is_update=False):
    """
    Validates rating fields.

    For create:
    venueId, crowdLevel, wifiRating, noiseRating are required.

    For update:
    fields are optional, but if provided they must be valid.
    """

    if not isinstance(data, dict):
        return error_response(
            message="Request body must be a JSON object",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if not is_update:
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

    if "venueId" in data and not isinstance(data["venueId"], str):
        return error_response(
            message="venueId must be a string",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "crowdLevel" in data and data["crowdLevel"] not in VALID_CROWD_LEVELS:
        return error_response(
            message="crowdLevel must be one of: free, reasonable, crowded",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "wifiRating" in data:
        wifi_error = validate_rating_number(data["wifiRating"], "wifiRating")

        if wifi_error:
            return wifi_error

    if "noiseRating" in data:
        noise_error = validate_rating_number(data["noiseRating"], "noiseRating")

        if noise_error:
            return noise_error

    if "comment" in data and not isinstance(data["comment"], str):
        return error_response(
            message="comment must be a string",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "comment" in data and len(data["comment"]) > 500:
        return error_response(
            message="comment cannot be longer than 500 characters",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    return None


def validate_rating_number(value, field_name):
    try:
        rating_number = int(value)
    except (ValueError, TypeError):
        return error_response(
            message=f"{field_name} must be a number between 1 and 5",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if rating_number < 1 or rating_number > 5:
        return error_response(
            message=f"{field_name} must be between 1 and 5",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    return None