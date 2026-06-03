import boto3

TABLE_NAME = "Work4U_Venues"
REGION = "us-east-1"

dynamodb = boto3.resource("dynamodb", region_name=REGION)
table = dynamodb.Table(TABLE_NAME)

BRAND_CONTACTS = {
    "wework": {
        "website": "https://www.wework.co.il/",
        "contactNote": "זהו מתחם עבודה בתשלום. מומלץ לבדוק באתר WeWork זמינות, סוג מנוי, מחיר ופרטי יצירת קשר לפני הגעה.",
        "accessNote": "כניסה בתשלום, בדרך כלל לפי מנוי, עמדה, משרד או חדר ישיבות.",
    },
    "mindspace": {
        "website": "https://www.mindspace.me/",
        "contactNote": "זהו מתחם עבודה בתשלום. מומלץ לבדוק באתר Mindspace זמינות, מחירים ואפשרויות עבודה לפני הגעה.",
        "accessNote": "כניסה בתשלום, בדרך כלל לפי מנוי, עמדה, משרד או חדר ישיבות.",
    },
    "urban": {
        "website": "https://urbanplace.me/locations/",
        "contactNote": "זהו מתחם עבודה בתשלום. מומלץ לבדוק באתר Urban Place זמינות, מחירים ואפשרויות עבודה לפני הגעה.",
        "accessNote": "כניסה בתשלום, בדרך כלל לפי מנוי, עמדה, משרד או חדר ישיבות.",
    },
    "regus": {
        "website": "https://www.regus.com/he/il",
        "contactNote": "זהו מתחם עבודה / משרד גמיש בתשלום. מומלץ לבדוק באתר Regus זמינות, מחיר ותנאי שימוש לפני הגעה.",
        "accessNote": "כניסה בתשלום, בדרך כלל לפי מנוי, עמדה, משרד, משרד יומי או חדר ישיבות.",
    },
    "spaces": {
        "website": "https://www.regus.com/he/il",
        "contactNote": "זהו מתחם עבודה בתשלום. מומלץ לבדוק באתר החברה זמינות, מחיר ותנאי שימוש לפני הגעה.",
        "accessNote": "כניסה בתשלום, בדרך כלל לפי מנוי, עמדה, משרד או חדר ישיבות.",
    },
    "beall": {
        "website": "https://www.be-all.com/",
        "contactNote": "זהו מתחם עבודה בתשלום. מומלץ לבדוק באתר BE ALL זמינות, מחירים ואפשרויות עבודה לפני הגעה.",
        "accessNote": "כניסה בתשלום, בדרך כלל לפי מנוי, עמדה, משרד או חדר ישיבות.",
    },
    "mixer": {
        "website": "https://www.mixer.work/",
        "contactNote": "זהו מתחם עבודה בתשלום. מומלץ לבדוק באתר MIXER זמינות, מחירים ואפשרויות עבודה לפני הגעה.",
        "accessNote": "כניסה בתשלום, בדרך כלל לפי מנוי, עמדה, משרד או חדר ישיבות.",
    },
    "powerball": {
        "website": "",
        "contactNote": "זהו מתחם עבודה בתשלום. פרטי אתר לא זמינים כרגע במערכת, לכן מומלץ לבדוק זמינות ומחירים לפני הגעה.",
        "accessNote": "כניסה בתשלום, בדרך כלל לפי מנוי, עמדה, משרד או חדר ישיבות.",
    },
    "academic": {
        "website": "",
        "contactNote": "מומלץ לבדוק באתר המוסד את שעות הפעילות והרשאות הכניסה.",
        "accessNote": "לרוב מתאים ללמידה או עבודה שקטה, אך ייתכן שחלק מהשירותים זמינים רק לסטודנטים או מורשים.",
    },
    "cafe": {
        "website": "",
        "contactNote": "מומלץ לבדוק שעות פעילות ועומס לפני הגעה.",
        "accessNote": "מתאים לעבודה קצרה או פגישה לא פורמלית. ייתכן צורך ברכישה במקום.",
    },
}

def classify(item):
    text = " ".join([
        str(item.get("venueId", "")),
        str(item.get("name", "")),
        str(item.get("nameHe", "")),
        str(item.get("nameEn", "")),
        " ".join(item.get("searchAliases", [])) if isinstance(item.get("searchAliases"), list) else "",
    ]).lower()

    if "wework" in text or "וויוורק" in text:
        return "wework"
    if "mindspace" in text or "מיינדספייס" in text:
        return "mindspace"
    if "urban" in text or "אורבן" in text:
        return "urban"
    if "regus" in text or "רג" in text:
        return "regus"
    if "spaces" in text or "ספייסס" in text:
        return "spaces"
    if "be all" in text or "beall" in text or "בי אול" in text:
        return "beall"
    if "mixer" in text or "מיקסר" in text:
        return "mixer"
    if "powerball" in text or "פאוורבול" in text:
        return "powerball"

    place_type = str(item.get("placeType", "")).lower()
    if place_type == "academic":
        return "academic"
    if place_type == "cafe":
        return "cafe"

    return None

def main():
    response = table.scan(
        FilterExpression="#src = :src",
        ExpressionAttributeNames={"#src": "source"},
        ExpressionAttributeValues={":src": "manual_seed"},
    )

    items = response.get("Items", [])

    while "LastEvaluatedKey" in response:
        response = table.scan(
            FilterExpression="#src = :src",
            ExpressionAttributeNames={"#src": "source"},
            ExpressionAttributeValues={":src": "manual_seed"},
            ExclusiveStartKey=response["LastEvaluatedKey"],
        )
        items.extend(response.get("Items", []))

    updated = 0
    skipped = 0

    for item in items:
        venue_id = item.get("venueId")
        brand = classify(item)

        if not venue_id or not brand:
            skipped += 1
            continue

        fields = BRAND_CONTACTS[brand]

        table.update_item(
            Key={"venueId": venue_id},
            UpdateExpression="""
                SET website = :website,
                    phone = if_not_exists(phone, :empty),
                    email = if_not_exists(email, :empty),
                    contactNote = :contactNote,
                    accessNote = :accessNote,
                    categoryLabel = :categoryLabel
            """,
            ExpressionAttributeValues={
                ":website": fields["website"],
                ":empty": "",
                ":contactNote": fields["contactNote"],
                ":accessNote": fields["accessNote"],
                ":categoryLabel": (
                    "מתחם עבודה בתשלום"
                    if brand not in {"academic", "cafe"}
                    else ("ספרייה / קמפוס" if brand == "academic" else "בית קפה לעבודה")
                ),
            },
        )

        updated += 1

    print(f"Updated manual places with websites/contact notes: {updated}")
    print(f"Skipped manual places: {skipped}")

if __name__ == "__main__":
    main()
