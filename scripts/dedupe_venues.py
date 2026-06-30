import os
import re
from collections import defaultdict
from datetime import datetime, timezone
from decimal import Decimal

import boto3


TABLE_NAME = os.environ.get("VENUES_TABLE", "Work4U_Venues")
APPLY = os.environ.get("APPLY") == "1"


dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def scan_all():
    items = []
    response = table.scan()
    items.extend(response.get("Items", []))

    while "LastEvaluatedKey" in response:
        response = table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        items.extend(response.get("Items", []))

    return items


def norm_text(value):
    value = str(value or "").strip().lower()
    value = value.replace("־", "-")
    value = value.replace("–", "-")
    value = value.replace("—", "-")
    value = re.sub(r"[\"'״׳]", "", value)
    value = re.sub(r"[\s\-_/,.:;()]+", "", value)
    return value


def coord(value):
    try:
        if value is None or value == "":
            return ""
        return f"{float(value):.5f}"
    except Exception:
        return ""


def get_lat_lng(item):
    lat = item.get("lat", item.get("latitude"))
    lng = item.get("lng", item.get("longitude"))
    return coord(lat), coord(lng)


def duplicate_keys(item):
    name = norm_text(item.get("name"))
    address = norm_text(item.get("address"))
    city = norm_text(item.get("city"))
    place_type = norm_text(item.get("placeType"))
    lat, lng = get_lat_lng(item)

    keys = []

    if name and address:
        keys.append(f"name_address:{name}|{address}")

    if name and city:
        keys.append(f"name_city:{name}|{city}")

    if lat and lng and name:
        keys.append(f"coord_name:{lat}|{lng}|{name}")

    if lat and lng and address:
        keys.append(f"coord_address:{lat}|{lng}|{address}")

    if lat and lng and name and place_type:
        keys.append(f"coord_name_type:{lat}|{lng}|{name}|{place_type}")

    return keys


class UnionFind:
    def __init__(self):
        self.parent = {}

    def find(self, x):
        self.parent.setdefault(x, x)
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a, b):
        ra = self.find(a)
        rb = self.find(b)
        if ra != rb:
            self.parent[rb] = ra


def completeness_score(item):
    fields = [
        "name",
        "address",
        "city",
        "placeType",
        "openingHours",
        "description",
        "phone",
        "website",
        "email",
        "averageCoffeePrice",
        "priceRange",
        "wifiQuality",
        "noiseLevel",
    ]

    filled = sum(1 for f in fields if item.get(f) not in [None, "", [], {}])
    images = item.get("imageUrls") or []
    image_count = len(images) if isinstance(images, list) else 0

    rating_count = item.get("ratingCount", 0)
    try:
        rating_count = int(rating_count)
    except Exception:
        rating_count = 0

    avg_rating = item.get("averageRating", 0)
    try:
        avg_rating = float(avg_rating)
    except Exception:
        avg_rating = 0

    # Prefer richer records.
    return (
        rating_count,
        image_count,
        filled,
        avg_rating,
        str(item.get("updatedAt", "")),
    )


def main():
    items = scan_all()

    active_items = [
        item for item in items
        if item.get("isActive", True) is not False
    ]

    by_id = {
        item["venueId"]: item
        for item in active_items
        if item.get("venueId")
    }

    key_to_ids = defaultdict(list)

    for item in active_items:
        venue_id = item.get("venueId")
        if not venue_id:
            continue

        for key in duplicate_keys(item):
            key_to_ids[key].append(venue_id)

    uf = UnionFind()

    for venue_ids in key_to_ids.values():
        unique_ids = list(dict.fromkeys(venue_ids))
        if len(unique_ids) < 2:
            continue

        first = unique_ids[0]
        for other in unique_ids[1:]:
            uf.union(first, other)

    components = defaultdict(list)

    for venue_id in by_id:
        root = uf.find(venue_id)
        components[root].append(venue_id)

    duplicate_groups = [
        ids for ids in components.values()
        if len(ids) > 1
    ]

    print(f"Total venues in table: {len(items)}")
    print(f"Active venues: {len(active_items)}")
    print(f"Duplicate groups found: {len(duplicate_groups)}")
    print(f"Mode: {'APPLY - updating DynamoDB' if APPLY else 'DRY RUN - no updates'}")

    updates = []

    for index, ids in enumerate(duplicate_groups, start=1):
        records = [by_id[i] for i in ids]
        records.sort(key=completeness_score, reverse=True)

        keep = records[0]
        duplicates = records[1:]

        print(f"\nGroup {index}: keep {keep.get('venueId')} | {keep.get('name')} | {keep.get('address')}")

        for dup in duplicates:
            print(f"  deactivate {dup.get('venueId')} | {dup.get('name')} | {dup.get('address')}")
            updates.append((dup.get("venueId"), keep.get("venueId")))

    if not APPLY:
        print("\nDry run only. To apply, run:")
        print(f"VENUES_TABLE={TABLE_NAME} APPLY=1 python3 scripts/dedupe_venues.py")
        return

    now = datetime.now(timezone.utc).isoformat()

    for venue_id, keep_id in updates:
        table.update_item(
            Key={"venueId": venue_id},
            UpdateExpression=(
                "SET isActive = :false, "
                "duplicateOfVenueId = :keep, "
                "deduplicatedAt = :now"
            ),
            ExpressionAttributeValues={
                ":false": False,
                ":keep": keep_id,
                ":now": now,
            },
        )

    print(f"\nDone. Deactivated {len(updates)} duplicate venues.")


if __name__ == "__main__":
    main()
