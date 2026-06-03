import os
from decimal import Decimal
from datetime import datetime, timezone

import boto3

from shared.auth import get_current_user
from shared.response import success_response, error_response, parse_json_body


USER_LEARNING_TABLE = os.environ.get("USER_LEARNING_TABLE", "Work4U_UserLearning")

dynamodb = boto3.resource("dynamodb")
learning_table = dynamodb.Table(USER_LEARNING_TABLE)


VALID_EVENT_TYPES = {"search", "open_venue", "rating"}


def lambda_handler(event, context):
    """
    User behavior learning API.

    Supported routes:
    GET  /learning
    POST /learning/event
    """

    try:
        method = event.get("httpMethod", "")

        if method == "OPTIONS":
            return success_response("CORS preflight OK")

        current_user = get_current_user(event)
        user_id = current_user.get("userId")

        if not user_id:
            return error_response(
                message="Unauthorized",
                error_code="UNAUTHORIZED",
                status_code=401,
            )

        if method == "GET":
            return get_learning_profile(user_id)

        if method == "POST":
            return record_learning_event(event, user_id)

        return error_response(
            message="Method not allowed",
            error_code="METHOD_NOT_ALLOWED",
            status_code=405,
        )

    except Exception as e:
        return error_response(
            message=str(e),
            error_code="SERVER_ERROR",
            status_code=500,
        )


def get_learning_profile(user_id):
    profile = load_profile(user_id)

    return success_response(
        message="Learning profile loaded successfully",
        data=profile,
    )


def record_learning_event(event, user_id):
    data = parse_json_body(event)

    event_type = data.get("type")

    if event_type not in VALID_EVENT_TYPES:
        return error_response(
            message="type must be one of: search, open_venue, rating",
            error_code="VALIDATION_ERROR",
            status_code=400,
        )

    profile = load_profile(user_id)

    if event_type == "search":
        apply_search_event(profile, data)
    elif event_type == "open_venue":
        apply_open_venue_event(profile, data)
    elif event_type == "rating":
        apply_rating_event(profile, data)

    profile["updatedAt"] = now_iso()
    profile["totalEvents"] = int(profile.get("totalEvents", 0)) + 1

    learning_table.put_item(Item=to_dynamo_item(profile))

    return success_response(
        message="Learning event recorded successfully",
        data=profile,
    )


def load_profile(user_id):
    response = learning_table.get_item(Key={"userId": user_id})
    item = response.get("Item")

    if not item:
        return {
            "userId": user_id,
            "categoryScores": {
                "cafe": 0,
                "coworking": 0,
                "library": 0,
                "academic": 0,
                "community": 0,
                "workspace": 0,
            },
            "searchTermScores": {},
            "totalEvents": 0,
            "createdAt": now_iso(),
            "updatedAt": now_iso(),
        }

    item["categoryScores"] = decimal_map_to_ints(item.get("categoryScores", {}))
    item["searchTermScores"] = decimal_map_to_ints(item.get("searchTermScores", {}))
    item["totalEvents"] = int(item.get("totalEvents", 0))

    return item


def apply_search_event(profile, data):
    search_term = str(data.get("searchTerm", "")).strip().lower()

    if not search_term:
        return

    add_search_term_score(profile, search_term, 1)

    inferred_categories = infer_categories_from_search(search_term)

    for category in inferred_categories:
        add_category_score(profile, category, 1)


def apply_open_venue_event(profile, data):
    place_type = normalize_place_type(data.get("placeType"))
    add_category_score(profile, place_type, 1)


def apply_rating_event(profile, data):
    place_type = normalize_place_type(data.get("placeType"))

    try:
        rating = int(data.get("rating", 0))
    except (ValueError, TypeError):
        rating = 0

    if rating >= 5:
        delta = 3
    elif rating == 4:
        delta = 2
    elif rating == 3:
        delta = 0
    elif rating in {1, 2}:
        delta = -2
    else:
        delta = 0

    add_category_score(profile, place_type, delta)


def infer_categories_from_search(term):
    categories = set()

    cafe_terms = ["cafe", "coffee", "קפה", "בית קפה", "ארומה"]
    coworking_terms = [
        "coworking",
        "wework",
        "mindspace",
        "urban",
        "regus",
        "spaces",
        "חלל עבודה",
        "מתחם עבודה",
        "וויוורק",
        "מיינדספייס",
    ]
    library_terms = ["library", "ספריה", "ספרייה"]
    academic_terms = ["university", "college", "campus", "אוניברסיטה", "מכללה", "קמפוס"]

    if any(t in term for t in cafe_terms):
        categories.add("cafe")

    if any(t in term for t in coworking_terms):
        categories.add("coworking")

    if any(t in term for t in library_terms):
        categories.add("library")

    if any(t in term for t in academic_terms):
        categories.add("academic")

    if not categories:
        categories.add("workspace")

    return categories


def normalize_place_type(value):
    value = str(value or "").strip().lower()

    if value in {"cafe", "coffee"}:
        return "cafe"

    if value in {"coworking", "office", "workspace"}:
        return "coworking"

    if value in {"library"}:
        return "library"

    if value in {"academic", "university", "college"}:
        return "academic"

    if value in {"community", "community_centre"}:
        return "community"

    return "workspace"


def add_category_score(profile, category, delta):
    scores = profile.setdefault("categoryScores", {})
    current = int(scores.get(category, 0))
    scores[category] = max(0, current + int(delta))


def add_search_term_score(profile, term, delta):
    scores = profile.setdefault("searchTermScores", {})
    current = int(scores.get(term, 0))
    scores[term] = max(0, current + int(delta))


def decimal_map_to_ints(value):
    if not isinstance(value, dict):
        return {}

    result = {}

    for key, raw in value.items():
        if isinstance(raw, Decimal):
            result[key] = int(raw)
        else:
            try:
                result[key] = int(raw)
            except (ValueError, TypeError):
                result[key] = 0

    return result


def to_dynamo_item(profile):
    item = dict(profile)

    item["categoryScores"] = {
        key: Decimal(str(value))
        for key, value in profile.get("categoryScores", {}).items()
    }

    item["searchTermScores"] = {
        key: Decimal(str(value))
        for key, value in profile.get("searchTermScores", {}).items()
    }

    item["totalEvents"] = Decimal(str(profile.get("totalEvents", 0)))

    return item


def now_iso():
    return datetime.now(timezone.utc).isoformat()
