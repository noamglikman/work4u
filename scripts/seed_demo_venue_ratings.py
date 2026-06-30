import os
import random
from decimal import Decimal

import boto3


TABLE_NAME = os.environ.get("VENUES_TABLE", "Work4U_Venues")
APPLY = os.environ.get("APPLY") == "1"

# דירוגים יפים להצגה, אבל לא מושלמים מדי
MIN_RATING = 3.7
MAX_RATING = 4.9

MIN_COUNT = 12
MAX_COUNT = 96


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


def demo_values_for_venue(venue):
    """
    Stable random: each venue gets a random-looking rating,
    but it stays the same if you run the script again.
    """
    venue_id = str(venue.get("venueId", ""))
    rnd = random.Random(venue_id)

    rating = round(rnd.uniform(MIN_RATING, MAX_RATING), 1)
    count = rnd.randint(MIN_COUNT, MAX_COUNT)

    return rating, count


def main():
    venues = scan_all()

    active_venues = [
        venue for venue in venues
        if venue.get("isActive", True) is not False
    ]

    print(f"Total venues in table: {len(venues)}")
    print(f"Active venues to update: {len(active_venues)}")
    print(f"Mode: {'APPLY - updating DynamoDB' if APPLY else 'DRY RUN - no updates'}")

    for venue in active_venues[:20]:
        rating, count = demo_values_for_venue(venue)
        print(
            venue.get("venueId"),
            "|",
            venue.get("name"),
            "| rating:",
            rating,
            "| count:",
            count,
        )

    if not APPLY:
        print("\nDry run only. To really update DynamoDB, run:")
        print("VENUES_TABLE=Work4U_Venues APPLY=1 python3 scripts/seed_demo_venue_ratings.py")
        return

    updated = 0

    for venue in active_venues:
        venue_id = venue.get("venueId")

        if not venue_id:
            continue

        rating, count = demo_values_for_venue(venue)

        table.update_item(
            Key={"venueId": venue_id},
            UpdateExpression="SET averageRating = :rating, ratingCount = :count",
            ExpressionAttributeValues={
                ":rating": Decimal(str(rating)),
                ":count": count,
            },
        )

        updated += 1

    print(f"\nDone. Updated demo ratings for {updated} venues.")


if __name__ == "__main__":
    main()
