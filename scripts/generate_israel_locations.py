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
  node["place"~"city|town|village|hamlet|locality|suburb|quarter|neighbourhood"](area.israel);
  way["place"~"city|town|village|hamlet|locality|suburb|quarter|neighbourhood"](area.israel);
  relation["place"~"city|town|village|hamlet|locality|suburb|quarter|neighbourhood"](area.israel);
);
out center tags;
"""


def fetch_osm_places():
    data = urllib.parse.urlencode({"data": QUERY}).encode("utf-8")
    request = urllib.request.Request(
        OVERPASS_URL,
        data=data,
        method="POST",
        headers={"User-Agent": "Work4U-StudentProject/1.0"}
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


def get_name(tags):
    return (
        tags.get("name:he")
        or tags.get("name")
        or tags.get("name:en")
    )


def make_id(name, osm_id):
    slug = re.sub(r"[^a-zA-Z0-9א-ת]+", "-", name.strip()).strip("-").lower()
    return f"{slug}-{osm_id}"


def main():
    print("Fetching Israeli cities/localities from OpenStreetMap...")
    data = fetch_osm_places()
    elements = data.get("elements", [])

    locations_by_key = {}

    for element in elements:
        tags = element.get("tags", {})
        name = get_name(tags)
        lat, lng = get_coordinates(element)

        if not name or lat is None or lng is None:
            continue

        place_type = tags.get("place", "place")
        osm_id = element.get("id")

        # Deduplicate by normalized name + coordinates rounded to 4 decimals.
        key = (name.strip().lower(), round(float(lat), 4), round(float(lng), 4))

        locations_by_key[key] = {
            "id": make_id(name, osm_id),
            "label": name.strip(),
            "placeType": place_type,
            "lat": float(lat),
            "lng": float(lng),
        }

    locations = sorted(
        locations_by_key.values(),
        key=lambda item: item["label"]
    )

    print(f"Generated locations: {len(locations)}")

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
    lines.append("  {")
    lines.append("    id: 'current',")
    lines.append("    label: 'המיקום הנוכחי שלי',")
    lines.append("    location: null,")
    lines.append("  },")

    for location in locations:
        label = location["label"].replace("\\", "\\\\").replace("'", "\\'")
        location_id = location["id"].replace("\\", "\\\\").replace("'", "\\'")
        lat = location["lat"]
        lng = location["lng"]

        lines.append("  {")
        lines.append(f"    id: '{location_id}',")
        lines.append(f"    label: '{label}',")
        lines.append(f"    location: {{ lat: {lat:.6f}, lng: {lng:.6f} }},")
        lines.append("  },")

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
