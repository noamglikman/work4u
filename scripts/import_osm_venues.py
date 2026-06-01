import json
import time
import urllib.parse
import urllib.request
from decimal import Decimal

import boto3


TABLE_NAME = "Work4U_Venues"
REGION = "us-east-1"
OVERPASS_URL = "https://overpass-api.de/api/interpreter"


QUERY = """
[out:json][timeout:120];
area["ISO3166-1"="IL"][admin_level=2]->.israel;
(
  node["office"="coworking"](area.israel);
  way["office"="coworking"](area.israel);
  relation["office"="coworking"](area.israel);

  node["amenity"="library"](area.israel);
  way["amenity"="library"](area.israel);
  relation["amenity"="library"](area.israel);

  node["amenity"="cafe"]["internet_access"](area.israel);
  way["amenity"="cafe"]["internet_access"](area.israel);
  relation["amenity"="cafe"]["internet_access"](area.israel);
);
out center tags;
"""


def fetch_osm_data():
    print("Fetching data from OpenStreetMap Overpass API...")

    encoded_data = urllib.parse.urlencode({"data": QUERY}).encode("utf-8")
    request = urllib.request.Request(
        OVERPASS_URL,
        data=encoded_data,
        method="POST",
        headers={"User-Agent": "Work4U-StudentProject/1.0"}
    )

    with urllib.request.urlopen(request, timeout=180) as response:
        return json.loads(response.read().decode("utf-8"))


def get_coordinates(element):
    if "lat" in element and "lon" in element:
        return element["lat"], element["lon"]

    center = element.get("center")
    if center:
        return center.get("lat"), center.get("lon")

    return None, None


def get_name(tags):
    return (
        tags.get("name:he")
        or tags.get("name:en")
        or tags.get("name")
    )


def build_address(tags):
    parts = [
        tags.get("addr:street"),
        tags.get("addr:housenumber"),
        tags.get("addr:city"),
    ]

    address = " ".join(str(part) for part in parts if part)

    return (
        address
        or tags.get("addr:full")
        or tags.get("addr:city")
        or "Israel"
    )


def get_place_type(tags):
    if tags.get("office") == "coworking":
        return "coworking"

    if tags.get("amenity") == "library":
        return "library"

    if tags.get("amenity") == "cafe":
        return "cafe"

    return "workspace"


def map_noise_level(place_type):
    if place_type == "library":
        return "low"

    if place_type == "coworking":
        return "medium"

    if place_type == "cafe":
        return "medium"

    return "medium"


def map_price_range(place_type):
    if place_type == "library":
        return "low"

    if place_type == "coworking":
        return "medium"

    if place_type == "cafe":
        return "medium"

    return "medium"


def map_wifi_quality(tags):
    internet_access = str(tags.get("internet_access", "")).lower()

    if internet_access in {"wlan", "wifi", "yes"}:
        return "high"

    return "medium"


def build_item(element):
    tags = element.get("tags", {})
    name = get_name(tags)

    if not name:
        return None

    lat, lon = get_coordinates(element)

    if lat is None or lon is None:
        return None

    place_type = get_place_type(tags)
    now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    venue_id = f"osm-{element.get('type')}-{element.get('id')}"

    return {
        "venueId": venue_id,
        "name": name,
        "address": build_address(tags),
        "latitude": Decimal(str(lat)),
        "longitude": Decimal(str(lon)),
        "openingHours": tags.get("opening_hours", "Not specified"),
        "priceRange": map_price_range(place_type),
        "wifiQuality": map_wifi_quality(tags),
        "noiseLevel": map_noise_level(place_type),
        "hasPowerOutlets": False,
        "description": f"Imported automatically from OpenStreetMap. Place type: {place_type}",
        "imageUrls": [],
        "averageRating": Decimal("0"),
        "currentCrowdLevel": "reasonable",
        "isActive": True,
        "source": "OpenStreetMap",
        "sourceId": str(element.get("id")),
        "placeType": place_type,
        "createdAt": now,
        "updatedAt": now,
    }


def main():
    data = fetch_osm_data()
    elements = data.get("elements", [])

    print(f"Fetched raw elements: {len(elements)}")

    dynamodb = boto3.resource("dynamodb", region_name=REGION)
    table = dynamodb.Table(TABLE_NAME)

    inserted = 0
    skipped = 0

    with table.batch_writer(overwrite_by_pkeys=["venueId"]) as batch:
        for element in elements:
            item = build_item(element)

            if item is None:
                skipped += 1
                continue

            batch.put_item(Item=item)
            inserted += 1

    print(f"Inserted/updated venues: {inserted}")
    print(f"Skipped elements: {skipped}")
    print("Done.")


if __name__ == "__main__":
    main()
