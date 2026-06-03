import json
import re
import urllib.parse
import urllib.request
from pathlib import Path


OVERPASS_URL = "https://overpass-api.de/api/interpreter"
OUTPUT_FILE = Path("frontend/src/lib/searchLocations.ts")


QUERY = """
[out:json][timeout:180];
area["ISO3166-1"="IL"][admin_level=2]->.israel;
(
  node["place"~"city|town|village|hamlet|locality"](area.israel);
  way["place"~"city|town|village|hamlet|locality"](area.israel);
  relation["place"~"city|town|village|hamlet|locality"](area.israel);
);
out center tags;
"""


MANUAL_LOCATIONS = [
    ("current", "המיקום הנוכחי שלי", None, None),
    ("manual-ariel", "אריאל / Ariel", 32.1043, 35.1733),
    ("manual-kfar-saba", "כפר סבא / Kfar Saba", 32.1782, 34.9076),
    ("manual-raanana", "רעננה / Ra'anana", 32.1848, 34.8713),
    ("manual-petah-tikva", "פתח תקווה / Petah Tikva", 32.0871, 34.8878),
    ("manual-tel-aviv", "תל אביב / Tel Aviv", 32.0853, 34.7818),
    ("manual-jerusalem", "ירושלים / Jerusalem", 31.7683, 35.2137),
    ("manual-haifa", "חיפה / Haifa", 32.7940, 34.9896),
    ("manual-beer-sheva", "באר שבע / Beer Sheva", 31.2529, 34.7915),
]


def fetch_osm_places():
    data = urllib.parse.urlencode({"data": QUERY}).encode("utf-8")
    request = urllib.request.Request(
        OVERPASS_URL,
        data=data,
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


def get_names(tags):
    name_he = tags.get("name:he")
    name_en = tags.get("name:en")
    name_default = tags.get("name")

    primary = name_he or name_default or name_en

    if not primary:
        return None, None

    if name_he and name_en and name_he.strip().lower() != name_en.strip().lower():
        label = f"{name_he.strip()} / {name_en.strip()}"
    else:
        label = primary.strip()

    return primary.strip(), label.strip()


def make_id(name, osm_id):
    slug = re.sub(r"[^a-zA-Z0-9א-ת]+", "-", name.strip()).strip("-").lower()
    if not slug:
        slug = "location"
    return f"{slug}-{osm_id}"


def ts_string(value):
    return json.dumps(value, ensure_ascii=False)


def write_option(lines, location_id, label, lat, lng):
    lines.append("  {")
    lines.append(f"    id: {ts_string(location_id)},")
    lines.append(f"    label: {ts_string(label)},")

    if lat is None or lng is None:
        lines.append("    location: null,")
    else:
        lines.append(f"    location: {{ lat: {float(lat):.6f}, lng: {float(lng):.6f} }},")

    lines.append("  },")


def main():
    print("Fetching Israeli cities/localities from OpenStreetMap...")
    data = fetch_osm_places()
    elements = data.get("elements", [])

    locations_by_key = {}

    for element in elements:
        tags = element.get("tags", {})
        name, label = get_names(tags)
        lat, lng = get_coordinates(element)

        if not name or not label or lat is None or lng is None:
            continue

        key = (label.lower(), round(float(lat), 4), round(float(lng), 4))

        locations_by_key[key] = {
            "id": make_id(name, element.get("id")),
            "label": label,
            "lat": float(lat),
            "lng": float(lng),
        }

    locations = sorted(locations_by_key.values(), key=lambda item: item["label"])
    print(f"Generated OSM locations: {len(locations)}")

    lines = []
    lines.append("import type { LatLng } from './geo';")
    lines.append("")
    lines.append("export interface SearchLocationOption {")
    lines.append("  id: string;")
    lines.append("  label: string;")
    lines.append("  location: LatLng | null;")
    lines.append("}")
    lines.append("")
    lines.append("export const SEARCH_LOCATIONS: SearchLocationOption[] = [")

    for location_id, label, lat, lng in MANUAL_LOCATIONS:
        write_option(lines, location_id, label, lat, lng)

    manual_labels = {label.lower() for _, label, _, _ in MANUAL_LOCATIONS}

    for location in locations:
        if location["label"].lower() in manual_labels:
            continue

        write_option(
            lines,
            location["id"],
            location["label"],
            location["lat"],
            location["lng"],
        )

    lines.append("];")
    lines.append("")
    lines.append("export type SearchLocationId = (typeof SEARCH_LOCATIONS)[number]['id'];")
    lines.append("")
    lines.append("export function getSearchLocationById(id: string): SearchLocationOption {")
    lines.append("  return SEARCH_LOCATIONS.find((option) => option.id === id) ?? SEARCH_LOCATIONS[0];")
    lines.append("}")
    lines.append("")

    OUTPUT_FILE.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
