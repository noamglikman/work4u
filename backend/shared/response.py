import base64
import json
from decimal import Decimal


def _json_default(value):
    if isinstance(value, Decimal):
        if value % 1 == 0:
            return int(value)
        return float(value)

    raise TypeError(f"Object of type {type(value).__name__} is not JSON serializable")


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,PATCH,DELETE",
    "Access-Control-Max-Age": "86400",
}


def parse_json_body(event):
    body = event.get("body")

    if not body:
        return {}

    if event.get("isBase64Encoded"):
        body = base64.b64decode(body).decode("utf-8")

    if isinstance(body, dict):
        return body

    return json.loads(body)


def success_response(message="OK", data=None, status_code=200):
    return {
        "statusCode": status_code,
        "headers": CORS_HEADERS,
        "body": json.dumps(
            {
                "success": True,
                "ok": True,
                "message": message,
                "data": data,
            },
            ensure_ascii=False,
            default=_json_default,
        ),
    }


def error_response(message="Something went wrong", error_code="SERVER_ERROR", status_code=400, details=None):
    body = {
        "success": False,
        "ok": False,
        "message": message,
        "errorCode": error_code,
    }

    if details is not None:
        body["details"] = details

    return {
        "statusCode": status_code,
        "headers": CORS_HEADERS,
        "body": json.dumps(body, ensure_ascii=False, default=_json_default),
    }
