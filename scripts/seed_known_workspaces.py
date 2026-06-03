import time
from decimal import Decimal

import boto3


TABLE_NAME = "Work4U_Venues"
REGION = "us-east-1"


KNOWN_PLACES = [
    # =========================
    # Paid coworking spaces
    # =========================
    {
        "venueId": "manual-wework-herzliya",
        "name": "WeWork Herzliya",
        "nameHe": "וויוורק הרצליה",
        "nameEn": "WeWork Herzliya",
        "address": "Herzliya Pituach, Herzliya",
        "latitude": 32.1616,
        "longitude": 34.8103,
        "priceRange": "high",
        "placeType": "coworking",
        "categoryLabel": "מתחם עבודה בתשלום",
        "description": "מתחם עבודה משותף בתשלום, מתאים לעבודה מקצועית, פגישות וצוותים קטנים.",
        "searchAliases": ["WeWork", "וויוורק", "Herzliya", "הרצליה", "coworking", "חלל עבודה"],
    },
    {
        "venueId": "manual-wework-tel-aviv-midtown",
        "name": "WeWork Midtown Tel Aviv",
        "nameHe": "וויוורק מידטאון תל אביב",
        "nameEn": "WeWork Midtown Tel Aviv",
        "address": "Midtown area, Tel Aviv",
        "latitude": 32.0744,
        "longitude": 34.7935,
        "priceRange": "high",
        "placeType": "coworking",
        "categoryLabel": "מתחם עבודה בתשלום",
        "description": "מתחם עבודה משותף בתשלום באזור מרכזי בתל אביב.",
        "searchAliases": ["WeWork", "וויוורק", "Midtown", "מידטאון", "Tel Aviv", "תל אביב"],
    },
    {
        "venueId": "manual-wework-ramat-gan",
        "name": "WeWork Ramat Gan",
        "nameHe": "וויוורק רמת גן",
        "nameEn": "WeWork Ramat Gan",
        "address": "Ramat Gan business district",
        "latitude": 32.0840,
        "longitude": 34.8032,
        "priceRange": "high",
        "placeType": "coworking",
        "categoryLabel": "מתחם עבודה בתשלום",
        "description": "מתחם עבודה בתשלום באזור הבורסה/רמת גן, מתאים לעבודה עסקית ופגישות.",
        "searchAliases": ["WeWork", "וויוורק", "Ramat Gan", "רמת גן", "בורסה", "Bursa"],
    },
    {
        "venueId": "manual-mindspace-herzliya",
        "name": "Mindspace Herzliya",
        "nameHe": "מיינדספייס הרצליה",
        "nameEn": "Mindspace Herzliya",
        "address": "Herzliya Pituach, Herzliya",
        "latitude": 32.1627,
        "longitude": 34.8092,
        "priceRange": "high",
        "placeType": "coworking",
        "categoryLabel": "מתחם עבודה בתשלום",
        "description": "מתחם עבודה משותף בתשלום, מתאים לעובדים עצמאיים, סטארטאפים וצוותים.",
        "searchAliases": ["Mindspace", "מיינדספייס", "Herzliya", "הרצליה", "coworking"],
    },
    {
        "venueId": "manual-mindspace-ramat-gan",
        "name": "Mindspace Ramat Gan",
        "nameHe": "מיינדספייס רמת גן",
        "nameEn": "Mindspace Ramat Gan",
        "address": "Ramat Gan business district",
        "latitude": 32.0836,
        "longitude": 34.8002,
        "priceRange": "high",
        "placeType": "coworking",
        "categoryLabel": "מתחם עבודה בתשלום",
        "description": "מתחם עבודה בתשלום באזור עסקי מרכזי, מתאים לעבודה שוטפת ופגישות.",
        "searchAliases": ["Mindspace", "מיינדספייס", "Ramat Gan", "רמת גן", "בורסה"],
    },
    {
        "venueId": "manual-urban-place-tel-aviv",
        "name": "Urban Place Tel Aviv",
        "nameHe": "אורבן פלייס תל אביב",
        "nameEn": "Urban Place Tel Aviv",
        "address": "Central Tel Aviv",
        "latitude": 32.0626,
        "longitude": 34.7703,
        "priceRange": "high",
        "placeType": "coworking",
        "categoryLabel": "מתחם עבודה בתשלום",
        "description": "מתחם עבודה משותף בתשלום, מתאים לעבודה משרדית ופגישות.",
        "searchAliases": ["Urban Place", "אורבן פלייס", "Tel Aviv", "תל אביב"],
    },
    {
        "venueId": "manual-urban-place-jerusalem",
        "name": "Urban Place Jerusalem",
        "nameHe": "אורבן פלייס ירושלים",
        "nameEn": "Urban Place Jerusalem",
        "address": "Central Jerusalem",
        "latitude": 31.7894,
        "longitude": 35.2030,
        "priceRange": "high",
        "placeType": "coworking",
        "categoryLabel": "מתחם עבודה בתשלום",
        "description": "מתחם עבודה משותף בתשלום בירושלים, מתאים לעבודה מקצועית ולפגישות.",
        "searchAliases": ["Urban Place", "אורבן פלייס", "Jerusalem", "ירושלים"],
    },
    {
        "venueId": "manual-regus-haifa-matam",
        "name": "Regus Matam Haifa",
        "nameHe": "רג׳ס מתם חיפה",
        "nameEn": "Regus Matam Haifa",
        "address": "Matam Park, Haifa",
        "latitude": 32.7866,
        "longitude": 34.9587,
        "priceRange": "high",
        "placeType": "coworking",
        "categoryLabel": "מתחם עבודה בתשלום",
        "description": "מתחם עבודה ומשרדים גמישים בתשלום, מתאים לעבודה מקצועית באזור מתם.",
        "searchAliases": ["Regus", "רג׳ס", "Matam", "מתם", "Haifa", "חיפה"],
    },

    # =========================
    # Academic / libraries
    # =========================
    {
        "venueId": "manual-ariel-university-library",
        "name": "Ariel University Library",
        "nameHe": "ספריית אוניברסיטת אריאל",
        "nameEn": "Ariel University Library",
        "address": "Ariel University, Ariel",
        "latitude": 32.1065,
        "longitude": 35.2092,
        "priceRange": "low",
        "placeType": "academic",
        "categoryLabel": "ספרייה / קמפוס",
        "description": "מקום שקט וזול יחסית לעבודה ולמידה, מתאים במיוחד לסטודנטים.",
        "searchAliases": ["Ariel University", "אוניברסיטת אריאל", "Library", "ספרייה", "Ariel", "אריאל"],
    },
    {
        "venueId": "manual-tel-aviv-university-library",
        "name": "Tel Aviv University Library",
        "nameHe": "ספריית אוניברסיטת תל אביב",
        "nameEn": "Tel Aviv University Library",
        "address": "Tel Aviv University, Tel Aviv",
        "latitude": 32.1133,
        "longitude": 34.8044,
        "priceRange": "low",
        "placeType": "academic",
        "categoryLabel": "ספרייה / קמפוס",
        "description": "סביבת עבודה שקטה ללמידה, מחקר ועבודה אישית.",
        "searchAliases": ["Tel Aviv University", "אוניברסיטת תל אביב", "Library", "ספרייה", "Tel Aviv"],
    },
    {
        "venueId": "manual-reichman-university-library",
        "name": "Reichman University Library",
        "nameHe": "ספריית אוניברסיטת רייכמן",
        "nameEn": "Reichman University Library",
        "address": "Reichman University, Herzliya",
        "latitude": 32.1769,
        "longitude": 34.8359,
        "priceRange": "low",
        "placeType": "academic",
        "categoryLabel": "ספרייה / קמפוס",
        "description": "סביבת עבודה אקדמית ושקטה יחסית, מתאימה ללמידה ולעבודה ממושכת.",
        "searchAliases": ["Reichman", "רייכמן", "IDC", "Herzliya", "הרצליה", "Library", "ספרייה"],
    },
    {
        "venueId": "manual-bar-ilan-university-library",
        "name": "Bar-Ilan University Library",
        "nameHe": "ספריית אוניברסיטת בר אילן",
        "nameEn": "Bar-Ilan University Library",
        "address": "Bar-Ilan University, Ramat Gan",
        "latitude": 32.0687,
        "longitude": 34.8433,
        "priceRange": "low",
        "placeType": "academic",
        "categoryLabel": "ספרייה / קמפוס",
        "description": "מרחב שקט יחסית ללמידה ולעבודה אישית באזור רמת גן.",
        "searchAliases": ["Bar Ilan", "בר אילן", "Ramat Gan", "רמת גן", "Library", "ספרייה"],
    },
    {
        "venueId": "manual-technion-library",
        "name": "Technion Library",
        "nameHe": "ספריית הטכניון",
        "nameEn": "Technion Library",
        "address": "Technion, Haifa",
        "latitude": 32.7779,
        "longitude": 35.0217,
        "priceRange": "low",
        "placeType": "academic",
        "categoryLabel": "ספרייה / קמפוס",
        "description": "סביבת לימוד ועבודה אקדמית, מתאימה לסטודנטים ולעבודה שקטה.",
        "searchAliases": ["Technion", "טכניון", "Haifa", "חיפה", "Library", "ספרייה"],
    },

    # =========================
    # Laptop-friendly cafes
    # =========================
    {
        "venueId": "manual-cafe-aroma-kfar-saba",
        "name": "Aroma Kfar Saba",
        "nameHe": "ארומה כפר סבא",
        "nameEn": "Aroma Kfar Saba",
        "address": "Kfar Saba",
        "latitude": 32.1782,
        "longitude": 34.9076,
        "priceRange": "medium",
        "placeType": "cafe",
        "categoryLabel": "בית קפה לעבודה",
        "description": "בית קפה שיכול להתאים לעבודה קצרה עם לפטופ או לפגישה לא פורמלית.",
        "searchAliases": ["Aroma", "ארומה", "Kfar Saba", "כפר סבא", "cafe", "בית קפה"],
    },
    {
        "venueId": "manual-cafe-aroma-herzliya",
        "name": "Aroma Herzliya",
        "nameHe": "ארומה הרצליה",
        "nameEn": "Aroma Herzliya",
        "address": "Herzliya",
        "latitude": 32.1663,
        "longitude": 34.8433,
        "priceRange": "medium",
        "placeType": "cafe",
        "categoryLabel": "בית קפה לעבודה",
        "description": "בית קפה לעבודה קלילה, מתאים לפגישות קצרות או עבודה עם לפטופ.",
        "searchAliases": ["Aroma", "ארומה", "Herzliya", "הרצליה", "cafe", "בית קפה"],
    },
    {
        "venueId": "manual-cafe-tel-aviv-center",
        "name": "Laptop Friendly Cafe Tel Aviv",
        "nameHe": "בית קפה לעבודה בתל אביב",
        "nameEn": "Laptop Friendly Cafe Tel Aviv",
        "address": "Central Tel Aviv",
        "latitude": 32.0780,
        "longitude": 34.7810,
        "priceRange": "medium",
        "placeType": "cafe",
        "categoryLabel": "בית קפה לעבודה",
        "description": "בית קפה כללי לדמו, מתאים לעבודה קלילה ולפגישות לא פורמליות.",
        "searchAliases": ["Cafe", "קפה", "בית קפה", "Tel Aviv", "תל אביב", "laptop"],
    },
]


def decimal_number(value):
    return Decimal(str(value))


def build_item(raw):
    now = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    place_type = raw.get("placeType", "coworking")

    if place_type == "academic":
        noise_level = "low"
        default_price = "low"
    elif place_type == "cafe":
        noise_level = "medium"
        default_price = "medium"
    else:
        noise_level = "medium"
        default_price = "high"

    return {
        "venueId": raw["venueId"],
        "name": raw["name"],
        "nameHe": raw.get("nameHe", ""),
        "nameEn": raw.get("nameEn", ""),
        "searchAliases": raw.get("searchAliases", []),
        "address": raw["address"],
        "latitude": decimal_number(raw["latitude"]),
        "longitude": decimal_number(raw["longitude"]),
        "openingHours": "Not specified",
        "priceRange": raw.get("priceRange", default_price),
        "wifiQuality": "high",
        "noiseLevel": noise_level,
        "hasPowerOutlets": True,
        "description": raw.get("description", ""),
        "categoryLabel": raw.get("categoryLabel", ""),
        "imageUrls": [],
        "averageRating": Decimal("0"),
        "currentCrowdLevel": "reasonable",
        "isActive": True,
        "source": "manual_seed",
        "sourceId": raw["venueId"],
        "placeType": place_type,
        "createdAt": now,
        "updatedAt": now,
    }


def main():
    dynamodb = boto3.resource("dynamodb", region_name=REGION)
    table = dynamodb.Table(TABLE_NAME)

    inserted = 0

    with table.batch_writer(overwrite_by_pkeys=["venueId"]) as batch:
        for raw in KNOWN_PLACES:
            batch.put_item(Item=build_item(raw))
            inserted += 1

    print(f"Inserted/updated manual places: {inserted}")


if __name__ == "__main__":
    main()
