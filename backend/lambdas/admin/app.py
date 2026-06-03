import os
import re
from decimal import Decimal
from datetime import datetime, timezone
from uuid import uuid4

import boto3

from shared.auth import is_admin_user, get_current_user
from shared.response import success_response, error_response, parse_json_body


VENUES_TABLE = os.environ.get("VENUES_TABLE", "Work4U_Venues")
IMAGES_BUCKET = os.environ.get("IMAGES_BUCKET", "work4u-venue-images")

dynamodb = boto3.resource("dynamodb")
s3_client = boto3.client("s3")

venues_table = dynamodb.Table(VENUES_TABLE)


VALID_PRICE_RANGES = {"low", "medium", "high", "any"}
VALID_WIFI_QUALITIES = {"low", "medium", "high"}
VALID_NOISE_LEVELS = {"low", "medium", "high"}


def lambda_handler(event, context):
    """
    Handles admin workspace management actions.

    Supported routes:
    POST   /admin/venues
    PUT    /admin/venues/{venueId}
    DELETE /admin/venues/{venueId}
    POST   /admin/venues/{venueId}/images/upload-url
    """

    try:
        method = event.get("httpMethod", "")

        if method == "OPTIONS":
            return success_response("CORS preflight OK")

        if not is_admin_user(event):
            return error_response(
                message="Admin permission is required",
                error_code="FORBIDDEN",
                status_code=403
            )

        path_parameters = event.get("pathParameters") or {}
        venue_id = path_parameters.get("venueId")

        path = event.get("path", "")

        if method == "POST" and path.endswith("/images/upload-url"):
            if not venue_id:
                return error_response(
                    message="Missing venueId path parameter",
                    error_code="VALIDATION_ERROR",
                    status_code=400
                )

            return generate_upload_url(event, venue_id)

        if method == "POST":
            return create_venue(event)

        if method == "PUT":
            if not venue_id:
                return error_response(
                    message="Missing venueId path parameter",
                    error_code="VALIDATION_ERROR",
                    status_code=400
                )

            return update_venue(event, venue_id)

        if method == "DELETE":
            if not venue_id:
                return error_response(
                    message="Missing venueId path parameter",
                    error_code="VALIDATION_ERROR",
                    status_code=400
                )

            return disable_venue(event, venue_id)

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


def create_venue(event):
    """
    Creates a new workspace venue.
    """

    admin_user = get_current_user(event)
    data = parse_json_body(event)

    validation_error = validate_venue_payload(data, is_update=False)

    if validation_error:
        return validation_error

    now = datetime.now(timezone.utc).isoformat()
    venue_id = f"venue-{uuid4()}"

    item = {
        "venueId": venue_id,
        "name": data["name"],
        "address": data["address"],
        "latitude": to_decimal(data["latitude"]),
        "longitude": to_decimal(data["longitude"]),
        "openingHours": data["openingHours"],
        "priceRange": data["priceRange"],
        "wifiQuality": data["wifiQuality"],
        "noiseLevel": data["noiseLevel"],
        "hasPowerOutlets": data["hasPowerOutlets"],
        "description": data.get("description", ""),
        "imageUrls": data.get("imageUrls", []),
        "categoryLabel": data.get("categoryLabel", ""),
        "accessNote": data.get("accessNote", ""),
        "contactNote": data.get("contactNote", ""),
        "website": data.get("website", ""),
        "phone": data.get("phone", ""),
        "email": data.get("email", ""),
        "averageRating": Decimal("0"),
        "currentCrowdLevel": data.get("currentCrowdLevel", "reasonable"),
        "isActive": True,
        "createdBy": admin_user.get("userId"),
        "createdAt": now,
        "updatedAt": now
    }

    venues_table.put_item(Item=item)

    return success_response(
        message="Venue created successfully",
        data=item,
        status_code=201
    )


def update_venue(event, venue_id):
    """
    Updates an existing workspace venue.
    """

    data = parse_json_body(event)

    existing_venue = get_venue(venue_id)

    if not existing_venue:
        return error_response(
            message="Venue not found",
            error_code="NOT_FOUND",
            status_code=404
        )

    validation_error = validate_venue_payload(data, is_update=True)

    if validation_error:
        return validation_error

    updated_venue = {
        **existing_venue,
        "updatedAt": datetime.now(timezone.utc).isoformat()
    }

    allowed_fields = [
        "name",
        "address",
        "openingHours",
        "priceRange",
        "wifiQuality",
        "noiseLevel",
        "hasPowerOutlets",
        "description",
        "imageUrls",
        "categoryLabel",
        "accessNote",
        "contactNote",
        "website",
        "phone",
        "email",
        "currentCrowdLevel"
    ]

    for field in allowed_fields:
        if field in data:
            updated_venue[field] = data[field]

    if "latitude" in data:
        updated_venue["latitude"] = to_decimal(data["latitude"])

    if "longitude" in data:
        updated_venue["longitude"] = to_decimal(data["longitude"])

    venues_table.put_item(Item=updated_venue)

    return success_response(
        message="Venue updated successfully",
        data=updated_venue
    )


def disable_venue(event, venue_id):
    """
    Soft deletes a venue by setting isActive to False.
    The item remains in DynamoDB for history and maintenance.
    """

    existing_venue = get_venue(venue_id)

    if not existing_venue:
        return error_response(
            message="Venue not found",
            error_code="NOT_FOUND",
            status_code=404
        )

    existing_venue["isActive"] = False
    existing_venue["updatedAt"] = datetime.now(timezone.utc).isoformat()

    venues_table.put_item(Item=existing_venue)

    return success_response(
        message="Venue disabled successfully",
        data={
            "venueId": venue_id,
            "isActive": False
        }
    )


def generate_upload_url(event, venue_id):
    """
    Generates a pre-signed S3 URL for uploading a venue image.
    The frontend will use this URL to upload the image directly to S3.
    """

    existing_venue = get_venue(venue_id)

    if not existing_venue:
        return error_response(
            message="Venue not found",
            error_code="NOT_FOUND",
            status_code=404
        )

    data = parse_json_body(event)

    file_name = data.get("fileName")
    content_type = data.get("contentType")

    if not file_name:
        return error_response(
            message="fileName is required",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if not content_type:
        return error_response(
            message="contentType is required",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if not content_type.startswith("image/"):
        return error_response(
            message="Only image files are allowed",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    safe_file_name = sanitize_file_name(file_name)
    object_key = f"venues/{venue_id}/{uuid4()}-{safe_file_name}"

    upload_url = s3_client.generate_presigned_url(
        ClientMethod="put_object",
        Params={
            "Bucket": IMAGES_BUCKET,
            "Key": object_key,
            "ContentType": content_type
        },
        ExpiresIn=900
    )

    image_url = f"https://{IMAGES_BUCKET}.s3.amazonaws.com/{object_key}"

    return success_response(
        message="Upload URL generated successfully",
        data={
            "uploadUrl": upload_url,
            "imageUrl": image_url,
            "objectKey": object_key
        }
    )


def get_venue(venue_id):
    response = venues_table.get_item(
        Key={
            "venueId": venue_id
        }
    )

    return response.get("Item")


def validate_venue_payload(data, is_update=False):
    """
    Validates venue fields.

    For create:
    required fields must exist.

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
            "name",
            "address",
            "latitude",
            "longitude",
            "openingHours",
            "priceRange",
            "wifiQuality",
            "noiseLevel",
            "hasPowerOutlets"
        ]

        for field in required_fields:
            if field not in data:
                return error_response(
                    message=f"Missing required field: {field}",
                    error_code="VALIDATION_ERROR",
                    status_code=400
                )

    if "name" in data and not is_non_empty_string(data["name"]):
        return error_response(
            message="name must be a non-empty string",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "address" in data and not is_non_empty_string(data["address"]):
        return error_response(
            message="address must be a non-empty string",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "openingHours" in data and not is_non_empty_string(data["openingHours"]):
        return error_response(
            message="openingHours must be a non-empty string",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "latitude" in data:
        latitude_error = validate_number(data["latitude"], "latitude")

        if latitude_error:
            return latitude_error

    if "longitude" in data:
        longitude_error = validate_number(data["longitude"], "longitude")

        if longitude_error:
            return longitude_error

    if "priceRange" in data and data["priceRange"] not in VALID_PRICE_RANGES:
        return error_response(
            message="priceRange must be one of: low, medium, high, any",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "wifiQuality" in data and data["wifiQuality"] not in VALID_WIFI_QUALITIES:
        return error_response(
            message="wifiQuality must be one of: low, medium, high",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "noiseLevel" in data and data["noiseLevel"] not in VALID_NOISE_LEVELS:
        return error_response(
            message="noiseLevel must be one of: low, medium, high",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "hasPowerOutlets" in data and not isinstance(data["hasPowerOutlets"], bool):
        return error_response(
            message="hasPowerOutlets must be boolean",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "description" in data and not isinstance(data["description"], str):
        return error_response(
            message="description must be a string",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    if "imageUrls" in data and not isinstance(data["imageUrls"], list):
        return error_response(
            message="imageUrls must be a list",
            error_code="VALIDATION_ERROR",
            status_code=400
        )


    for optional_text_field in ["categoryLabel", "accessNote", "contactNote", "website", "phone", "email"]:
        if optional_text_field in data and not isinstance(data[optional_text_field], str):
            return error_response(
                message=f"{optional_text_field} must be a string",
                error_code="VALIDATION_ERROR",
                status_code=400
            )

    return None


def is_non_empty_string(value):
    return isinstance(value, str) and len(value.strip()) > 0


def validate_number(value, field_name):
    try:
        float(value)
    except (ValueError, TypeError):
        return error_response(
            message=f"{field_name} must be a valid number",
            error_code="VALIDATION_ERROR",
            status_code=400
        )

    return None


def to_decimal(value):
    """
    Converts numeric values to Decimal because DynamoDB does not support float.
    """

    return Decimal(str(value))


def sanitize_file_name(file_name):
    """
    Removes unsafe characters from file names before saving them in S3.
    """

    file_name = file_name.strip()
    file_name = re.sub(r"[^a-zA-Z0-9._-]", "_", file_name)

    if not file_name:
        return "image.jpg"

    return file_name