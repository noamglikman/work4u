import boto3

TABLE_NAME = "Work4U_Venues"
REGION = "us-east-1"

dynamodb = boto3.resource("dynamodb", region_name=REGION)
table = dynamodb.Table(TABLE_NAME)


def should_have_power(venue):
    place_type = str(venue.get("placeType", "")).lower()
    name = str(venue.get("name", "")).lower()
    description = str(venue.get("description", "")).lower()

    if place_type in {"coworking", "library"}:
        return True

    if "coworking" in description or "workspace" in description:
        return True

    if "library" in description:
        return True

    if "ספרייה" in name or "library" in name:
        return True

    return False


def main():
    response = table.scan()
    items = response.get("Items", [])

    while "LastEvaluatedKey" in response:
        response = table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        items.extend(response.get("Items", []))

    updated = 0

    for venue in items:
        venue_id = venue.get("venueId")

        if not venue_id:
            continue

        if should_have_power(venue):
            table.update_item(
                Key={"venueId": venue_id},
                UpdateExpression="SET hasPowerOutlets = :value",
                ExpressionAttributeValues={
                    ":value": True
                }
            )
            updated += 1

    print(f"Updated venues with power outlets: {updated}")


if __name__ == "__main__":
    main()
