# Work4U — Project Overview for the Team

This document explains how the Work4U project works from end to end: what the user sees, how the React frontend connects to AWS, how data flows through API Gateway, Lambda and DynamoDB, and how we deploy changes.

---

## 1. What is Work4U?

Work4U is a web application that helps users find a suitable place to work or study.

Instead of only searching for a nearby cafe, the system tries to answer a more useful question:

> Where is the best place for me to work right now, based on my location and work preferences?

The system considers:

* Current location or manually selected location
* Distance from the user
* Wi-Fi quality
* Noise level
* Power outlet availability
* Price range / estimated coffee price
* Opening hours
* Venue type
* Ratings and user feedback

---

## 2. High-Level Architecture

Work4U is built as a serverless web application on AWS.

General flow:

User Browser
↓
CloudFront HTTPS
↓
S3 bucket with the React frontend files
↓
React application running in the browser
↓
API Gateway
↓
Lambda functions
↓
DynamoDB

Additional services:

* Cognito — authentication and authorization
* S3 Images Bucket — venue images
* CloudFront — HTTPS and CDN
* DynamoDB — venues, ratings, preferences and user learning data

There is no EC2 server that we manage manually. Most of the system uses managed AWS services.

---

## 3. Main AWS Components

### S3 — Frontend Hosting

The frontend is built into static files and uploaded to the S3 frontend bucket:

work4u-frontend-prod-005311909587-us-east-1

### CloudFront — HTTPS

CloudFront sits in front of the S3 website and serves the app over HTTPS:

https://d2naweiqyo4hkm.cloudfront.net

This is important because browser features such as current location require HTTPS.

### API Gateway

API Gateway is the entry point to the backend.

The frontend sends requests such as:

* GET /venues
* GET /venues/{venueId}
* POST /ratings
* GET /preferences
* PUT /admin/venues/{venueId}

### Lambda

Each backend action runs as a Lambda function. There is no always-running backend server.

### DynamoDB

The main tables are:

* Work4U_Venues
* Work4U_Ratings
* Work4U_UserPreferences
* Work4U_UserLearning

### Cognito

Cognito manages users, login and permissions. After login, the user receives a token, and the frontend sends this token to the API in protected requests.

---

## 4. Project Structure

work4u/

* frontend/ — React + Vite frontend
* backend/ — Lambda source code
* infrastructure/ — AWS SAM / CloudFormation templates
* scripts/ — scripts for importing and updating data
* docs/ — project documentation
* backups/ — local backups, not pushed to Git
* .aws-sam/ — SAM build output

---

## 5. Important Frontend Files

* frontend/src/App.tsx
  The main controller of the frontend. It manages screens, filters, location, selected venue and dialogs.

* frontend/src/screens/Home.tsx
  The home screen. It displays the venue list, filters and map.

* frontend/src/screens/Venue.tsx
  The venue details page.

* frontend/src/components/VenueListCard.tsx
  Displays a single venue card in the list.

* frontend/src/components/MapCanvas.tsx
  Displays the custom map and venue pins.

* frontend/src/components/dialogs/AdminVenuesDialog.tsx
  Admin panel for managing venues.

* frontend/src/hooks/useVenues.ts
  Loads venues from the API.

* frontend/src/hooks/useGeolocation.ts
  Handles current location using the browser geolocation API.

* frontend/src/lib/filters.ts
  Converts UI filters into API query parameters.

* frontend/src/lib/mappers.ts
  Converts API objects into frontend view models.

* frontend/src/lib/geo.ts
  Handles coordinates, distance calculations and map projection.

* frontend/src/api/http.ts
  Sends HTTP requests to the backend.

* frontend/src/api/live.ts
  Defines the live API functions used by the app.

* frontend/src/config/env.ts
  Reads environment variables such as API URL and Cognito IDs.

---

## 6. Important Backend Files

* backend/lambdas/venues/app.py
  Handles venue listing and venue details.

* backend/lambdas/admin/app.py
  Handles admin actions such as creating, updating and deleting venues.

* backend/lambdas/ratings/app.py
  Handles user ratings.

* backend/lambdas/preferences/app.py
  Handles user preferences.

* backend/lambdas/learning/app.py
  Handles basic user behavior learning.

* backend/shared/response.py
  Builds JSON responses and adds CORS headers.

* backend/shared/auth.py
  Contains authentication and authorization helper logic.

---

## 7. How Venues Are Loaded

When the user opens the home screen, the flow is:

App.tsx
↓
buildVenueQuery(filters, search, effectiveLocation)
↓
useVenues(query, location)
↓
api.venues.list(query)
↓
GET /venues
↓
API Gateway
↓
Venues Lambda
↓
DynamoDB table: Work4U_Venues
↓
JSON response
↓
toVenuePreview
↓
Home + VenueListCard + MapCanvas

React never reads directly from DynamoDB. It always goes through API Gateway and Lambda.

---

## 8. How Current Location Works

The main file is:

frontend/src/hooks/useGeolocation.ts

It uses the browser API:

navigator.geolocation.getCurrentPosition

Before the HTTPS change, the site was served through HTTP, so the browser could block current location. Also, when location failed, the app could silently fall back to the default location, which was Tel Aviv.

After the fix:

* The site is served through CloudFront HTTPS.
* The browser can allow geolocation.
* The app does not silently show Tel Aviv results as if they were the user's real current location.
* The user can also choose a manual location.

---

## 9. How the Admin Venue Panel Works

The main file is:

frontend/src/components/dialogs/AdminVenuesDialog.tsx

The admin panel allows an admin to:

* View all venues
* Search venues
* Edit Wi-Fi quality
* Edit noise level
* Edit power outlet availability
* Edit price range and coffee price display
* Edit opening hours
* Edit description
* Add website, phone and email
* Add venue images
* Remove images from display
* Remove a venue from user-facing results

The update is sent to the Admin Lambda, and the Admin Lambda updates DynamoDB.

---

## 10. How Images Work

Venue images are stored in a separate S3 bucket:

work4u-venue-images-005311909587-us-east-1

Image upload flow:

Admin selects image
↓
Frontend asks backend for an upload URL
↓
Admin Lambda creates a presigned URL
↓
Frontend uploads the image directly to S3
↓
Frontend saves the image URL in DynamoDB
↓
Frontend displays the image

Removing an image from the admin panel removes the image URL from `imageUrls`. This removes it from the website display, but it does not necessarily delete the physical file from S3.

---

## 11. Estimated Coffee Price

We added a script:

scripts/update_coffee_prices.py

The goal was to avoid showing the same coffee price for all venues.

The script estimates a coffee price based on:

* Region in Israel
* Venue type
* Venue ID

The fields added to DynamoDB are:

* averageCoffeePrice
* coffeePriceSource
* coffeePriceUpdatedAt
* priceRange

The frontend displays `averageCoffeePrice` when it exists. If it does not exist, the frontend falls back to the older price range label.

---

## 12. Frontend Build

To build the frontend:

cd ~/projects/work4u/frontend
npm run build

The build output is created in:

frontend/dist

---

## 13. Deploying the Frontend to S3 and CloudFront

From the frontend folder:

cd ~/projects/work4u/frontend

aws s3 sync ./dist/ s3://work4u-frontend-prod-005311909587-us-east-1 --delete

aws s3 cp ./dist/index.html s3://work4u-frontend-prod-005311909587-us-east-1/index.html --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html"

aws cloudfront create-invalidation --distribution-id E11QEQKPML3717 --paths "/*"

The CloudFront invalidation is important because CloudFront may continue serving cached files.

---

## 14. Backend Build

From the project root:

cd ~/projects/work4u

sam build --template-file infrastructure/template.yaml

---

## 15. Backend Deploy

From the project root:

cd ~/projects/work4u

sam deploy --template-file .aws-sam/build/template.yaml --stack-name work4u-dev --capabilities CAPABILITY_IAM --region us-east-1 --resolve-s3 --no-confirm-changeset --no-fail-on-empty-changeset

---

## 16. Useful Checks

Check AWS identity:

aws sts get-caller-identity

List DynamoDB tables:

aws dynamodb list-tables

Check CloudFront distribution:

aws cloudfront get-distribution --id E11QEQKPML3717 --query "Distribution.{DomainName:DomainName,Status:Status}" --output table

Check HTTPS in the browser console:

window.isSecureContext

Check geolocation in the browser console:

navigator.geolocation.getCurrentPosition(
p => console.log(p.coords.latitude, p.coords.longitude),
e => console.error(e)
)

---

## 17. Short Project Explanation

Work4U is a serverless web application for finding a suitable place to work or study based on location, user preferences and work conditions such as Wi-Fi, quietness, power outlets and price.

The frontend is written in React and served through S3 and CloudFront HTTPS. Requests go through API Gateway to Lambda functions. Data is stored in DynamoDB, images are stored in S3, and Cognito manages authentication and authorization.

---

## 18. Future Improvements

Possible improvements:

* Connect to Google Places
* Add a custom domain
* Build a manager dashboard
* Physically delete removed images from S3
* Improve personalized recommendations
* Add automated tests
* Improve the empty-state UX when no venues are found nearby
