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
[out:json][timeout:180];
area["ISO3166-1"="IL"][admin_level=2]->.israel;
(
  node["office"="coworking"](area.israel);
  way["office"="coworking"](area.israel);
  relation["office"="coworking"](area.israel);

  node["amenity"="coworking_space"](area.israel);
  way["amenity"="coworking_space"](area.israel);
  relation["amenity"="coworking_space"](area.israel);

  node["amenity"="library"](area.israel);
  way["amenity"="library"](area.israel);
  relation["amenity"="library"](area.israel);

  node["amenity"="cafe"](area.israel);
  way["amenity"="cafe"](area.israel);
  relation["amenity"="cafe"](area.israel);

  node["amenity"="university"](area.israel);
  way["amenity"="university"](area.israel);
  relation["amenity"="university"](area.israel);

  node["amenity"="college"](area.israel);
  way["amenity"="college"](area.israel);
  relation["amenity"="college"](area.israel);

  node["amenity"="community_centre"](area.israel);
  way["amenity"="community_centre"](area.israel);
  relation["amenity"="community_centre"](area.israel);
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
        headers={"User-Agent": "Work4U-StudentProject/1.0"},
    )

    with urllib.request.urlopen(request, timeout=240) as response:
        return json.loads(response.read().decode("utf-8"))


def get_coordinates(element):
    if "lat" in element and "lon" in element:
        return element["lat"], element["lon"]

    center = element.get("center")
    if center:
        return center.get("lat"), center.get("lon")

    return None, None


def clean(value):
    return str(value).strip() if value is not None else ""


def first_non_empty(*values):
    for value in values:
        value = clean(value)
        if value:
            return value
    return ""


def unique_list(values):
    result = []
    seen = set()

    for value in values:
        value = clean(value)
        if not value:
            continue

        key = value.lower()
        if key not in seen:
            seen.add(key)
            result.append(value)

    return result


def normalize_url(value):
    value = clean(value)

    if not value:
        return ""

    if value.startswith("http://") or value.startswith("https://"):
        return value

    if "." in value and " " not in value:
        return "https://" + value

    return ""


def wikimedia_file_url(value):
    """
    Converts OSM wikimedia_commons=File:Something.jpg into a stable Commons redirect URL.
    Category values are ignored because they are not a single image.
    """

    value = clean(value)

    if not value:
        return ""

    if value.startswith("File:"):
        file_name = value.replace("File:", "", 1)
        return "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + urllib.parse.quote(file_name)

    return ""


def get_image_urls(tags):
    image_url = normalize_url(tags.get("image"))
    wikimedia_url = wikimedia_file_url(tags.get("wikimedia_commons"))

    return unique_list([
        image_url,
        wikimedia_url,
    ])


def get_contact_fields(tags, place_type):
    website = first_non_empty(
        tags.get("contact:website"),
        tags.get("website"),
        tags.get("url"),
    )

    phone = first_non_empty(
        tags.get("contact:phone"),
        tags.get("phone"),
    )

    email = first_non_empty(
        tags.get("contact:email"),
        tags.get("email"),
    )

    website = normalize_url(website)

    if place_type == "coworking":
        category_label = "מתחם עבודה בתשלום"
        access_note = "כניסה בתשלום, בדרך כלל לפי מנוי, עמדה, משרד או חדר ישיבות. מומלץ לבדוק זמינות ומחיר מול המקום."
        contact_note = "למתחמי עבודה מסחריים מומלץ ליצור קשר מראש ולוודא זמינות."
    elif place_type in {"library", "academic"}:
        category_label = "ספרייה / קמפוס"
        access_note = "מתאים ללמידה או עבודה שקטה. מומלץ לבדוק שעות פעילות והרשאות כניסה."
        contact_note = "פרטי קשר מלאים לא תמיד זמינים במקור הנתונים."
    elif place_type == "cafe":
        category_label = "בית קפה לעבודה"
        access_note = "מתאים לעבודה קצרה או פגישה לא פורמלית. ייתכן צורך ברכישה במקום."
        contact_note = "מומלץ לבדוק שעות פעילות ועומס לפני הגעה."
    else:
        category_label = "מקום עבודה"
        access_note = "מומלץ לבדוק זמינות, שעות פעילות ותנאי כניסה מול המקום."
        contact_note = "פרטי קשר מלאים לא תמיד זמינים במקור הנתונים."

    if website or phone or email:
        contact_note = "פרטי הקשר נמשכו ממקור הנתונים הפתוח. מומלץ לוודא זמינות ושעות פעילות לפני הגעה."

    return {
        "website": website,
        "phone": phone,
        "email": email,
        "categoryLabel": category_label,
        "accessNote": access_note,
        "contactNote": contact_note,
    }


def get_names(tags):
    name_he = tags.get("name:he")
    name_en = tags.get("name:en")
    name_default = tags.get("name")

    display_name = first_non_empty(name_he, name_default, name_en)

    aliases = unique_list([
        name_he,
        name_en,
        name_default,
        tags.get("alt_name"),
        tags.get("old_name"),
        tags.get("official_name"),
        tags.get("short_name"),
    ])

    return display_name, clean(name_he), clean(name_en), aliases


def build_address(tags):
    parts = [
        tags.get("addr:street"),
        tags.get("addr:housenumber"),
        tags.get("addr:city"),
    ]

    address = " ".join(clean(part) for part in parts if clean(part))

    return (
        address
        or clean(tags.get("addr:full"))
        or clean(tags.get("addr:city"))
        or "Israel"
    )


def get_place_type(tags):
    if tags.get("office") == "coworking":
        return "coworking"

    if tags.get("amenity") == "coworking_space":
        return "coworking"

    if tags.get("amenity") == "library":
        return "library"

    if tags.get("amenity") == "cafe":
        return "cafe"

    if tags.get("amenity") in {"university", "college"}:
        return "academic"

    if tags.get("amenity") == "community_centre":
        return "community"

    return "workspace"


def map_noise_level(place_type):
    if place_type in {"library", "academic"}:
        return "low"

    if place_type == "cafe":
        return "medium"

    if place_type == "coworking":
        return "medium"

    return "medium"


def map_price_range(place_type):
    if place_type in {"library", "academic"}:
        return "low"

    if place_type == "cafe":
        return "medium"

    if place_type == "coworking":
        return "high"

    return "medium"


def map_wifi_quality(tags):
    internet_access = clean(tags.get("internet_access")).lower()

    if internet_access in {"wlan", "wifi", "yes"}:
        return "high"

    if internet_access in {"no", "none"}:
        return "low"

    return "medium"


def has_power_outlets(place_type):
    return place_type in {"coworking", "library", "academic"}


def build_item(element):
    tags = element.get("tags", {})

    display_name, name_he, name_en, aliases = get_names(tags)

    if not display_name:
        return None

    lat, lon = get_coordinates(element)

    if lat is None or lon is None:
        return None

    place_type = get_place_type(tags)
    now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    venue_id = f"osm-{element.get('type')}-{element.get('id')}"
    address = build_address(tags)
    image_urls = get_image_urls(tags)
    contact = get_contact_fields(tags, place_type)

    search_aliases = unique_list([
        *aliases,
        address,
        tags.get("addr:city"),
        tags.get("addr:street"),
        place_type,
        "workspace",
        "work space",
        "coworking" if place_type == "coworking" else None,
        "library" if place_type == "library" else None,
        "academic" if place_type == "academic" else None,
        "cafe" if place_type == "cafe" else None,
        "חלל עבודה" if place_type == "coworking" else None,
        "ספרייה" if place_type == "library" else None,
        "קמפוס" if place_type == "academic" else None,
        "קפה" if place_type == "cafe" else None,
        contact["website"],
        contact["phone"],
        contact["email"],
    ])

    return {
        "venueId": venue_id,
        "name": display_name,
        "nameHe": name_he,
        "nameEn": name_en,
        "searchAliases": search_aliases,
        "address": address,
        "latitude": Decimal(str(lat)),
        "longitude": Decimal(str(lon)),
        "openingHours": clean(tags.get("opening_hours")) or "Not specified",
        "priceRange": map_price_range(place_type),
        "wifiQuality": map_wifi_quality(tags),
        "noiseLevel": map_noise_level(place_type),
        "hasPowerOutlets": has_power_outlets(place_type),
        "description": f"Imported automatically from OpenStreetMap. Place type: {place_type}",
        "categoryLabel": contact["categoryLabel"],
        "accessNote": contact["accessNote"],
        "contactNote": contact["contactNote"],
        "website": contact["website"],
        "phone": contact["phone"],
        "email": contact["email"],
        "imageUrls": image_urls,
        "mainImageUrl": image_urls[0] if image_urls else "",
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
    with_images = 0
    with_website = 0
    with_phone = 0
    with_email = 0

    with table.batch_writer(overwrite_by_pkeys=["venueId"]) as batch:
        for element in elements:
            item = build_item(element)

            if item is None:
                skipped += 1
                continue

            batch.put_item(Item=item)
            inserted += 1

            if item.get("imageUrls"):
                with_images += 1
            if item.get("website"):
                with_website += 1
            if item.get("phone"):
                with_phone += 1
            if item.get("email"):
                with_email += 1

    print(f"Inserted/updated venues: {inserted}")
    print(f"Skipped elements: {skipped}")
    print(f"With images: {with_images}")
    print(f"With website: {with_website}")
    print(f"With phone: {with_phone}")
    print(f"With email: {with_email}")
    print("Done.")


if __name__ == "__main__":
    main()
