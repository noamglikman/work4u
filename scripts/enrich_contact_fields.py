import boto3

TABLE_NAME = "Work4U_Venues"
REGION = "us-east-1"

dynamodb = boto3.resource("dynamodb", region_name=REGION)
table = dynamodb.Table(TABLE_NAME)


def defaults_for(place_type):
    if place_type == "coworking":
        return {
            "categoryLabel": "מתחם עבודה בתשלום",
            "accessNote": "כניסה בתשלום, בדרך כלל לפי מנוי, עמדה, משרד או חדר ישיבות. מומלץ לבדוק זמינות ומחיר מול המקום.",
            "contactNote": "למתחמי עבודה מסחריים מומלץ ליצור קשר מראש ולוודא זמינות.",
        }

    if place_type in {"academic", "library"}:
        return {
            "categoryLabel": "ספרייה / קמפוס",
            "accessNote": "לרוב מתאים ללמידה או עבודה שקטה. מומלץ לבדוק שעות פעילות והרשאות כניסה.",
            "contactNote": "ייתכן שחלק מהשירותים זמינים רק לסטודנטים או למבקרים מורשים.",
        }

    if place_type == "cafe":
        return {
            "categoryLabel": "בית קפה לעבודה",
            "accessNote": "מתאים לעבודה קצרה או פגישה לא פורמלית. ייתכן צורך ברכישה במקום.",
            "contactNote": "מומלץ לבדוק שעות פעילות ועומס לפני הגעה.",
        }

    return {
        "categoryLabel": "מקום עבודה",
        "accessNote": "מומלץ לבדוק זמינות, שעות פעילות ותנאי כניסה מול המקום.",
        "contactNote": "פרטי קשר מלאים לא תמיד זמינים במקור הנתונים.",
    }


def main():
    response = table.scan()
    items = response.get("Items", [])

    while "LastEvaluatedKey" in response:
        response = table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        items.extend(response.get("Items", []))

    updated = 0

    for item in items:
        venue_id = item.get("venueId")
        if not venue_id:
            continue

        place_type = item.get("placeType", "workspace")
        values = defaults_for(place_type)

        table.update_item(
            Key={"venueId": venue_id},
            UpdateExpression="""
              SET categoryLabel = if_not_exists(categoryLabel, :categoryLabel),
                  accessNote = if_not_exists(accessNote, :accessNote),
                  contactNote = if_not_exists(contactNote, :contactNote),
                  website = if_not_exists(website, :empty),
                  phone = if_not_exists(phone, :empty),
                  email = if_not_exists(email, :empty)
            """,
            ExpressionAttributeValues={
                ":categoryLabel": values["categoryLabel"],
                ":accessNote": values["accessNote"],
                ":contactNote": values["contactNote"],
                ":empty": "",
            },
        )

        updated += 1

    print(f"Updated venues with contact/access fields: {updated}")


if __name__ == "__main__":
    main()
