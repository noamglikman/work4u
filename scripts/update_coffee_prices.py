import os
import hashlib
from decimal import Decimal
from datetime import datetime, timezone

import boto3


TABLE_NAME = os.environ.get("VENUES_TABLE", "Work4U_Venues")
APPLY = os.environ.get("APPLY", "0") == "1"

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def stable_int(seed: str, min_value: int, max_value: int) -> int:
    digest = hashlib.sha256(seed.encode("utf-8")).hexdigest()
    value = int(digest[:8], 16)
    return min_value + (value % (max_value - min_value + 1))


def text_of(item: dict) -> str:
    parts = [
        item.get("name"),
        item.get("address"),
        item.get("city"),
        item.get("area"),
        item.get("placeType"),
        item.get("categoryLabel"),
        item.get("source"),
    ]
    return " ".join(str(x) for x in parts if x).lower()


def get_float(item: dict, *keys: str):
    for key in keys:
        value = item.get(key)
        if value is not None:
            try:
                return float(value)
            except Exception:
                pass
    return None


def detect_region(item: dict) -> str:
    text = text_of(item)

    lat = get_float(item, "lat", "latitude")
    lng = get_float(item, "lng", "lon", "longitude")

    # לפי טקסט בעברית/אנגלית
    if any(x in text for x in ["תל אביב", "tel aviv"]):
        return "tel_aviv"

    if any(x in text for x in [
        "רמת גן", "גבעתיים", "הרצליה", "חולון", "בת ים", "בני ברק",
        "פתח תקווה", "ראשון לציון", "רעננה", "כפר סבא", "הוד השרון",
        "ramat gan", "givatayim", "herzliya", "holon", "bat yam",
        "petah tikva", "rishon", "raanana", "kfar saba"
    ]):
        return "center"

    if any(x in text for x in ["ירושלים", "jerusalem"]):
        return "jerusalem"

    if any(x in text for x in ["חיפה", "קריות", "haifa"]):
        return "haifa"

    if any(x in text for x in ["באר שבע", "אשקלון", "אשדוד", "אילת", "beer sheva", "beersheba", "eilat"]):
        return "south"

    if any(x in text for x in ["טבריה", "נצרת", "נהריה", "עכו", "כרמיאל", "קריית שמונה", "nahariya", "akko", "nazareth"]):
        return "north"

    # fallback לפי קואורדינטות
    if lat is not None and lng is not None:
        # תל אביב והעיר עצמה
        if 32.00 <= lat <= 32.15 and 34.73 <= lng <= 34.86:
            return "tel_aviv"

        # גוש דן / שרון
        if 31.90 <= lat <= 32.35 and 34.70 <= lng <= 35.00:
            return "center"

        # ירושלים
        if 31.68 <= lat <= 31.88 and 35.08 <= lng <= 35.28:
            return "jerusalem"

        # חיפה והקריות
        if 32.70 <= lat <= 32.92 and 34.90 <= lng <= 35.16:
            return "haifa"

        # דרום
        if lat < 31.45:
            return "south"

        # צפון
        if lat > 32.55:
            return "north"

    return "general"


def base_range_by_region(region: str) -> tuple[int, int]:
    ranges = {
        "tel_aviv": (16, 22),
        "center": (14, 20),
        "jerusalem": (13, 18),
        "haifa": (13, 18),
        "north": (11, 17),
        "south": (10, 16),
        "general": (12, 18),
    }
    return ranges.get(region, (12, 18))


def adjust_by_place_type(item: dict, min_price: int, max_price: int) -> tuple[int, int]:
    text = text_of(item)

    # חללי עבודה לרוב יקרים יותר
    if any(x in text for x in ["cowork", "coworking", "workspace", "wework", "hub", "חלל עבודה"]):
        min_price += 4
        max_price += 7

    # ספריות / קמפוסים לרוב זולים יותר או מסובסדים
    elif any(x in text for x in ["library", "campus", "university", "college", "ספרייה", "קמפוס", "אוניברסיטה", "מכללה"]):
        min_price -= 4
        max_price -= 2

    # מלונות / מקומות פרימיום
    elif any(x in text for x in ["hotel", "מלון"]):
        min_price += 3
        max_price += 5

    # מאפיות / בתי קפה רגילים - לא משנים
    return max(7, min_price), max(8, max_price)


def price_range_from_coffee(price: int) -> str:
    if price <= 13:
        return "low"
    if price <= 18:
        return "medium"
    return "high"


def get_venue_id(item: dict) -> str:
    return str(item.get("venueId") or item.get("id") or item.get("pk") or "")


def scan_all():
    items = []
    kwargs = {}

    while True:
        response = table.scan(**kwargs)
        items.extend(response.get("Items", []))

        last_key = response.get("LastEvaluatedKey")
        if not last_key:
            break

        kwargs["ExclusiveStartKey"] = last_key

    return items


def main():
    items = scan_all()

    print(f"Found {len(items)} venues in {TABLE_NAME}")
    print(f"Mode: {'APPLY - updating DynamoDB' if APPLY else 'DRY RUN - no updates'}")
    print()

    counters = {}

    for index, item in enumerate(items, start=1):
        venue_id = get_venue_id(item)
        name = item.get("name", "")
        address = item.get("address", "")

        if not venue_id:
            print(f"Skipping item without venueId: {item}")
            continue

        region = detect_region(item)
        min_price, max_price = base_range_by_region(region)
        min_price, max_price = adjust_by_place_type(item, min_price, max_price)

        seed = f"{venue_id}|{name}|{address}|coffee-price"
        coffee_price = stable_int(seed, min_price, max_price)
        price_range = price_range_from_coffee(coffee_price)

        counters[region] = counters.get(region, 0) + 1

        if index <= 25:
            print(
                f"{index:03d}. {name} | {region} | "
                f"{min_price}-{max_price}₪ -> {coffee_price}₪ | {price_range}"
            )

        if APPLY:
            table.update_item(
                Key={"venueId": venue_id},
                UpdateExpression="""
                    SET averageCoffeePrice = :coffee,
                        coffeePriceSource = :source,
                        coffeePriceUpdatedAt = :updatedAt,
                        priceRange = :priceRange
                """,
                ExpressionAttributeValues={
                    ":coffee": Decimal(coffee_price),
                    ":source": "estimated_by_region",
                    ":updatedAt": datetime.now(timezone.utc).isoformat(),
                    ":priceRange": price_range,
                },
            )

    print()
    print("Region distribution:")
    for region, count in sorted(counters.items()):
        print(f"- {region}: {count}")

    if not APPLY:
        print()
        print("Dry run only. To update DynamoDB, run with APPLY=1")


if __name__ == "__main__":
    main()
