import boto3

TABLE_NAME = "Work4U_Venues"
REGION = "us-east-1"

dynamodb = boto3.resource("dynamodb", region_name=REGION)
table = dynamodb.Table(TABLE_NAME)


def get_access_fields(place_type):
    if place_type == "coworking":
        return {
            "categoryLabel": "מתחם עבודה בתשלום",
            "accessNote": "כניסה בתשלום, בדרך כלל לפי מנוי, משרד, עמדה או חדר ישיבות. מומלץ לבדוק זמינות ומחיר מול המקום.",
            "description": "מתחם עבודה משותף בתשלום, מתאים לעבודה מקצועית, פגישות, עבודה בצוותים וחדרי ישיבות.",
            "priceRange": "high",
        }

    if place_type == "academic":
        return {
            "categoryLabel": "ספרייה / קמפוס",
            "accessNote": "לרוב מתאים לסטודנטים או מבקרים בהתאם למדיניות המקום. מומלץ לבדוק שעות פעילות והרשאות כניסה.",
            "description": "סביבת עבודה ולמידה שקטה יחסית, מתאימה לסטודנטים, עבודה אישית ולמידה ממושכת.",
            "priceRange": "low",
        }

    if place_type == "cafe":
        return {
            "categoryLabel": "בית קפה לעבודה",
            "accessNote": "מתאים לעבודה קצרה או פגישה לא פורמלית. ייתכן צורך ברכישה במקום.",
            "description": "בית קפה שיכול להתאים לעבודה עם לפטופ, פגישות קצרות ועבודה קלילה.",
            "priceRange": "medium",
        }

    return {
        "categoryLabel": "מקום עבודה",
        "accessNote": "מומלץ לבדוק זמינות, שעות פעילות ותנאי כניסה מול המקום.",
        "description": "מקום שיכול להתאים לעבודה מחוץ לבית.",
        "priceRange": "medium",
    }


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

    for item in items:
        venue_id = item["venueId"]
        place_type = item.get("placeType", "workspace")
        fields = get_access_fields(place_type)

        table.update_item(
            Key={"venueId": venue_id},
            UpdateExpression="""
                SET categoryLabel = :categoryLabel,
                    accessNote = :accessNote,
                    description = :description,
                    priceRange = :priceRange
            """,
            ExpressionAttributeValues={
                ":categoryLabel": fields["categoryLabel"],
                ":accessNote": fields["accessNote"],
                ":description": fields["description"],
                ":priceRange": fields["priceRange"],
            },
        )

        updated += 1

    print(f"Updated manual places with access notes: {updated}")


if __name__ == "__main__":
    main()
