# Work4U — Code Walkthrough

This document explains how the Work4U code works in practice: which frontend files call which API functions, how requests reach AWS, how Lambda functions read and write data, and how the response returns back to the UI.

---

## 1. Big Picture: Request Flow

The main flow in Work4U is:

User action in React
↓
Frontend state changes
↓
API function is called
↓
HTTP request is sent to API Gateway
↓
API Gateway invokes a Lambda function
↓
Lambda reads or writes DynamoDB / S3
↓
Lambda returns JSON
↓
Frontend maps the API response into UI objects
↓
React renders the result

Example:

A user opens the home page and searches for venues nearby.

Flow:

App.tsx
↓
buildVenueQuery
↓
useVenues
↓
api.venues.list
↓
http.ts
↓
GET /venues
↓
API Gateway
↓
Venues Lambda
↓
DynamoDB Work4U_Venues
↓
JSON response
↓
mappers.ts
↓
Home.tsx
↓
VenueListCard + MapCanvas

---

## 2. App.tsx — Main Frontend Controller

File:

frontend/src/App.tsx

This is the main controller of the frontend.

It manages:

* Current screen
* Authentication state
* Admin state
* Search text
* Filters
* Selected venue
* Current location
* Manual search location
* Loaded venues
* Admin dialogs
* Rating modal
* Smart push notification

Important states:

screen
Determines which screen is currently shown.

filters
Stores the selected filters such as radius, price, Wi-Fi, quiet environment and power outlet requirement.

search
Stores the search text typed by the user.

selectedVenueId
Stores the venue that was selected by the user.

searchLocationId
Stores whether the user selected current location or a manual location.

location
Comes from useGeolocation and represents the current browser location when available.

effectiveLocation
The location actually used for searching. It can be either the current browser location or a manually selected location.

---

## 3. Authentication Flow

Authentication is handled by AWS Cognito.

Relevant frontend files:

* frontend/src/context/AuthContext
* frontend/src/api/auth.ts
* frontend/src/config/amplify.ts

Relevant backend file:

* backend/shared/auth.py

Flow:

User enters email and password
↓
Frontend sends login request to Cognito
↓
Cognito validates the credentials
↓
Cognito returns tokens
↓
Frontend stores authentication state
↓
API requests include an Authorization header
↓
API Gateway / Lambda can identify the user

Important idea:

The frontend does not manage passwords itself. Password validation is handled by Cognito.

---

## 4. Environment Configuration

Frontend environment variables are stored in:

frontend/.env

Important variables:

VITE_USE_MOCK
Controls whether the frontend uses mock data or the real API.

VITE_API_BASE_URL
The API Gateway base URL.

VITE_AWS_REGION
The AWS region.

VITE_COGNITO_USER_POOL_ID
The Cognito User Pool ID.

VITE_COGNITO_USER_POOL_CLIENT_ID
The Cognito App Client ID.

VITE_S3_BUCKET
The S3 bucket used for venue images.

These variables are read by:

frontend/src/config/env.ts

The frontend should not hardcode AWS resource IDs directly inside components. It should read them through the environment configuration.

---

## 5. API Layer in the Frontend

The frontend API layer is split into two main files:

frontend/src/api/live.ts
Defines logical API actions such as venues.list, venues.get, ratings.create and preferences.get.

frontend/src/api/http.ts
Handles the actual HTTP request.

The purpose of this separation is to keep components clean.

Instead of writing fetch directly inside React components, the component calls:

api.venues.list(query)

Then live.ts calls http.ts, and http.ts sends the real network request.

---

## 6. How HTTP Requests Work

File:

frontend/src/api/http.ts

Responsibilities:

* Build the full URL
* Add query parameters
* Add Authorization token when needed
* Send the request using fetch
* Parse the JSON response
* Throw ApiError if the response failed

Example:

api.venues.list(query)
↓
http.get("/venues", query)
↓
https://jwo0c83srb.execute-api.us-east-1.amazonaws.com/dev/venues?...
↓
API Gateway

This keeps the rest of the frontend independent from the exact API Gateway URL.

---

## 7. Loading Venues

Relevant frontend files:

* frontend/src/App.tsx
* frontend/src/hooks/useVenues.ts
* frontend/src/lib/filters.ts
* frontend/src/lib/mappers.ts
* frontend/src/screens/Home.tsx
* frontend/src/components/VenueListCard.tsx
* frontend/src/components/MapCanvas.tsx

Relevant backend file:

* backend/lambdas/venues/app.py

Flow:

App.tsx holds filters, search and location.
↓
buildVenueQuery creates an API query object.
↓
useVenues sends the query to the API.
↓
api.venues.list calls GET /venues.
↓
API Gateway invokes the Venues Lambda.
↓
The Lambda reads venues from DynamoDB.
↓
The Lambda returns venue data.
↓
mappers.ts converts API data into frontend view data.
↓
Home.tsx displays the venues.

---

## 8. buildVenueQuery

File:

frontend/src/lib/filters.ts

This file converts UI filter state into API query parameters.

Examples of filters:

* radiusKm
* priceRange
* wifiQuality
* quietEnvironment
* needPowerOutlet
* open now
* search text
* latitude
* longitude

The API does not need to know how the UI is built. It only receives a clean query object.

---

## 9. useVenues Hook

File:

frontend/src/hooks/useVenues.ts

This hook is responsible for loading venues.

It receives:

* query
* location
* enabled flag

It returns:

* venues
* loading
* error
* reload

The hook also maps raw API results into view models by using mapper functions.

This is important because React screens should not deal directly with backend field names.

---

## 10. Mappers

File:

frontend/src/lib/mappers.ts

The backend returns API models such as VenueSummary and VenueDetail.

The UI needs view models such as VenuePreview and VenueView.

The mapper converts fields such as:

venueId → id
latitude / longitude → lat / lng
priceRange / averageCoffeePrice → priceLabel
wifiQuality → display label
noiseLevel → display label
distanceKm → distanceLabel
imageUrls → display image

The mapper is also responsible for creating UI-friendly labels and tags.

---

## 11. Distance and Coordinates

File:

frontend/src/lib/geo.ts

This file contains location-related logic.

It includes:

* LatLng type
* Default location
* Distance calculation
* Map projection helper

Distance is calculated based on the user's location and the venue location.

The result is used to show labels such as:

500 m
2.4 km

It is also used to sort or filter nearby venues.

---

## 12. Current Location

File:

frontend/src/hooks/useGeolocation.ts

This hook uses the browser Geolocation API:

navigator.geolocation.getCurrentPosition

It is responsible for:

* Checking if geolocation is available
* Checking if the site runs in a secure context
* Asking the browser for the user's location
* Returning location status
* Returning an error if location is blocked or unavailable

Important note:

Current location works properly only when the site is served over HTTPS or localhost.

That is why we added CloudFront HTTPS.

---

## 13. Manual Location

File:

frontend/src/lib/searchLocations.ts

This file contains predefined locations in Israel.

The user can choose a manual location instead of using browser geolocation.

This is useful when:

* The browser blocks location
* The user wants to search in another city
* The user wants predictable demo behavior

App.tsx decides whether to use:

* Current browser location
* Manual selected location

The selected value becomes effectiveLocation.

---

## 14. Home Screen

File:

frontend/src/screens/Home.tsx

The Home screen displays:

* Search input
* Filters
* Venue list
* Map
* Loading state
* Empty state
* Current location button
* Selected venue state

It receives venues from App.tsx.

Home does not directly call DynamoDB or Lambda. It only displays data and triggers frontend events.

---

## 15. Venue Cards

File:

frontend/src/components/VenueListCard.tsx

This component displays a single venue in the list.

It usually shows:

* Venue name
* Address
* Distance
* Tags
* Coffee price
* Wi-Fi information
* Noise information
* Power outlet information
* Image or icon

The card receives a VenuePreview object. It does not know about DynamoDB or API Gateway.

---

## 16. MapCanvas

File:

frontend/src/components/MapCanvas.tsx

This component displays the custom Work4U map.

It receives:

* venues
* selected venue
* user location
* onPin callback

It projects real latitude and longitude coordinates into map positions.

This is not Google Maps. It is a custom visual map created for the app.

---

## 17. Venue Details Page

File:

frontend/src/screens/Venue.tsx

This screen is opened when the user selects a venue.

It loads detailed venue information using:

useVenue(venueId, location)

The page displays:

* Name
* Images
* Address
* Opening hours
* Wi-Fi
* Noise level
* Power outlets
* Coffee price
* Description
* Navigation link
* Rating option

The navigation link can open Google Maps directions using the venue coordinates.

---

## 18. Backend Structure

Backend code is located under:

backend/lambdas

Main Lambda folders:

* venues
* admin
* ratings
* preferences
* learning
* auth_triggers

Shared backend code:

* backend/shared/response.py
* backend/shared/auth.py

The backend is deployed using AWS SAM and CloudFormation from:

infrastructure/template.yaml

---

## 19. API Gateway and Lambda

API Gateway receives HTTP requests from the frontend.

It routes each request to the correct Lambda.

Examples:

GET /venues
→ Venues Lambda

GET /venues/{venueId}
→ Venues Lambda

POST /admin/venues
→ Admin Lambda

PUT /admin/venues/{venueId}
→ Admin Lambda

DELETE /admin/venues/{venueId}
→ Admin Lambda

POST /ratings
→ Ratings Lambda

GET /preferences
→ Preferences Lambda

POST /learning
→ Learning Lambda

The route definitions are managed in:

infrastructure/template.yaml

---

## 20. Venues Lambda

File:

backend/lambdas/venues/app.py

Responsibilities:

* Handle GET /venues
* Handle GET /venues/{venueId}
* Handle OPTIONS requests
* Read venue data from DynamoDB
* Return venue summaries and venue details

The Venues Lambda reads from:

Work4U_Venues

It returns data to the frontend through API Gateway.

---

## 21. Admin Lambda

File:

backend/lambdas/admin/app.py

Responsibilities:

* Create a venue
* Update a venue
* Soft delete a venue
* Create presigned upload URLs for images
* Validate which fields are allowed to be edited

The Admin Lambda is used by:

frontend/src/components/dialogs/AdminVenuesDialog.tsx

Admin updates are saved in DynamoDB.

---

## 22. Admin Venue Dialog

File:

frontend/src/components/dialogs/AdminVenuesDialog.tsx

This is the main admin UI for venue management.

It allows the admin to:

* Load all venues
* Search venues
* Open an edit form
* Edit operational fields
* Upload images
* Remove images from display
* Save changes
* Remove a venue from the public list

Important flow:

Admin opens venue management
↓
api.venues.list loads venues
↓
Admin clicks Edit
↓
api.venues.get loads full details
↓
Admin changes fields
↓
saveEdit sends update
↓
Admin Lambda updates DynamoDB
↓
Frontend reloads venues

---

## 23. Image Upload Flow

Images are stored in S3.

The frontend does not upload images through Lambda directly. Instead, it uses a presigned URL.

Flow:

Admin chooses an image
↓
Frontend asks backend for an upload URL
↓
Admin Lambda creates a presigned S3 URL
↓
Frontend uploads the image directly to S3
↓
Frontend saves the image URL in DynamoDB
↓
The image appears on the website

This is better than sending the whole image through Lambda because it is faster and more scalable.

---

## 24. Removing Images

The admin panel supports removing an image from display.

Current behavior:

* The image URL is removed from imageUrls in DynamoDB.
* The image no longer appears on the website.
* The physical file may still remain in S3.

Future improvement:

Add a backend endpoint that also deletes the physical S3 object.

---

## 25. Ratings

Frontend file:

frontend/src/components/dialogs/RatingModal.tsx

Backend file:

backend/lambdas/ratings/app.py

DynamoDB table:

Work4U_Ratings

Users can submit ratings such as:

* Crowd level
* Wi-Fi rating
* Noise rating

This information can be used later to improve venue recommendations.

---

## 26. Preferences

Frontend screen:

frontend/src/screens/Preferences.tsx

Backend file:

backend/lambdas/preferences/app.py

DynamoDB table:

Work4U_UserPreferences

Preferences store what the user cares about, for example:

* Strong Wi-Fi
* Quiet environment
* Power outlet
* Price range
* Seat type

The idea is that future recommendations can be personalized based on these preferences.

---

## 27. Learning

Backend file:

backend/lambdas/learning/app.py

DynamoDB table:

Work4U_UserLearning

This feature records simple user behavior such as searches or interactions.

In App.tsx, search terms are recorded after a delay. This prevents sending a request for every single character typed by the user.

This is a foundation for future recommendation logic.

---

## 28. Shared Response Logic

File:

backend/shared/response.py

This file provides common response helpers.

Responsibilities:

* Return success responses in a consistent format
* Return error responses in a consistent format
* Add CORS headers
* Convert DynamoDB Decimal values to JSON-safe numbers

Typical response format:

{
"ok": true,
"data": ...
}

or:

{
"ok": false,
"message": "..."
}

---

## 29. Shared Auth Logic

File:

backend/shared/auth.py

This file contains authentication helper logic.

It helps the backend understand:

* Who is the current user
* What user ID is associated with the request
* Whether the user is authenticated
* Whether the user is an admin

---

## 30. DynamoDB Tables

Main tables:

Work4U_Venues
Stores all venues.

Work4U_Ratings
Stores user ratings.

Work4U_UserPreferences
Stores user preferences.

Work4U_UserLearning
Stores behavior and learning events.

Each Lambda reads or writes only the table relevant to its domain.

---

## 31. Coffee Price Script

File:

scripts/update_coffee_prices.py

Purpose:

The app originally showed the same coffee price for many venues. That looked unrealistic.

The script estimates an average coffee price based on:

* Region in Israel
* Venue type
* Venue ID

It updates fields such as:

* averageCoffeePrice
* coffeePriceSource
* coffeePriceUpdatedAt
* priceRange

The calculation is deterministic, so the same venue receives the same price every time.

---

## 32. S3 and CloudFront Frontend Deployment

Frontend build output:

frontend/dist

Frontend S3 bucket:

work4u-frontend-prod-005311909587-us-east-1

CloudFront distribution:

E11QEQKPML3717

CloudFront domain:

https://d2naweiqyo4hkm.cloudfront.net

Deployment flow:

npm run build
↓
Upload dist files to S3
↓
Upload index.html with no-cache headers
↓
Create CloudFront invalidation
↓
Users receive the new version

---

## 33. Backend Deployment

Backend deployment uses AWS SAM.

Build command:

sam build --template-file infrastructure/template.yaml

Deploy command:

sam deploy --template-file .aws-sam/build/template.yaml --stack-name work4u-dev --capabilities CAPABILITY_IAM --region us-east-1 --resolve-s3 --no-confirm-changeset --no-fail-on-empty-changeset

SAM packages the Lambda code, uploads artifacts to S3, and updates the CloudFormation stack.

---

## 34. CORS

CORS allows the browser frontend to call the backend API.

CORS is configured in:

* infrastructure/template.yaml
* backend/shared/response.py

Important headers:

Access-Control-Allow-Origin
Access-Control-Allow-Headers
Access-Control-Allow-Methods

If OPTIONS works but GET returns 401, the issue is usually authentication, not CORS.

When moving from the S3 website URL to the CloudFront URL, the user may need to log in again because localStorage is different per domain.

---

## 35. Common Debug Commands

Check AWS identity:

aws sts get-caller-identity

List DynamoDB tables:

aws dynamodb list-tables

Check CloudFront:

aws cloudfront get-distribution --id E11QEQKPML3717 --query "Distribution.{DomainName:DomainName,Status:Status}" --output table

Test CORS preflight:

curl -i -X OPTIONS "https://jwo0c83srb.execute-api.us-east-1.amazonaws.com/dev/venues" -H "Origin: https://d2naweiqyo4hkm.cloudfront.net" -H "Access-Control-Request-Method: GET" -H "Access-Control-Request-Headers: authorization,content-type"

Check HTTPS in browser console:

window.isSecureContext

Check geolocation in browser console:

navigator.geolocation.getCurrentPosition(
p => console.log(p.coords.latitude, p.coords.longitude),
e => console.error(e)
)

---

## 36. How to Explain the Code Flow in One Minute

The user opens the React app through CloudFront HTTPS. React checks authentication through Cognito and loads the home screen. App.tsx builds a venue query based on filters, search text and location. The useVenues hook calls the API layer, which sends a request to API Gateway. API Gateway invokes the relevant Lambda function. The Lambda reads data from DynamoDB and returns JSON. The frontend mapper converts the raw API data into UI-friendly view models, and the Home screen renders venue cards and map pins.

---

## 37. Key Ideas to Remember

React is responsible for UI and state.

API Gateway is the public backend entry point.

Lambda contains backend logic.

DynamoDB stores the application data.

Cognito handles authentication.

S3 stores static frontend files and venue images.

CloudFront provides HTTPS and caching.

Mappers separate backend data shape from frontend display shape.

Hooks separate data loading logic from UI components.

The admin panel updates DynamoDB through backend APIs, not directly.

---

## 38. Future Improvements

Possible future improvements:

* Add Google Places enrichment
* Add a custom domain
* Add a full admin dashboard
* Physically delete removed images from S3
* Improve recommendation logic
* Add more automated tests
* Improve empty-state UX
* Add better analytics for user behavior
* Improve venue ranking based on ratings and preferences

---

## Favorites and Daily Venue Ratings

Work4U separates between two different star concepts:

### 1. Favorite Star

The favorite star is personal for each logged-in user.

When a user clicks the favorite star near a venue, the venue ID is saved inside the user's preferences under the field:

favoriteVenueIds

This data is stored in the DynamoDB table:

Work4U_UserPreferences

This means that favorites are private and user-specific. If User A marks a venue as favorite, User B will not see it as favorite unless User B also marks it.

Frontend flow:

User clicks favorite star  
↓  
Home.tsx toggleFavorite  
↓  
api.preferences.save  
↓  
POST /preferences  
↓  
Preferences Lambda  
↓  
DynamoDB Work4U_UserPreferences  
↓  
Frontend reloads preferences  
↓  
The star remains selected after refresh  

Relevant files:

- frontend/src/screens/Home.tsx
- frontend/src/components/VenueListCard.tsx
- frontend/src/hooks/usePreferences.ts
- frontend/src/types/api.ts
- backend/lambdas/preferences/app.py

---

### 2. Public Venue Rating Stars

The rating stars are public and represent the general rating of the venue.

When a user submits a rating or report, the rating is saved in:

Work4U_Ratings

Then the Ratings Lambda recalculates the venue's average rating and updates:

- Work4U_Venues.averageRating
- Work4U_Venues.ratingCount

This means that once a venue rating changes, all users can see the updated public venue rating, even if they personally did not rate the venue.

Rating flow:

User submits rating  
↓  
POST /ratings  
↓  
Ratings Lambda  
↓  
Save rating in Work4U_Ratings  
↓  
Recalculate venue average rating  
↓  
Update Work4U_Venues.averageRating  
↓  
Frontend reloads venues  
↓  
Updated rating appears for all users  

Relevant files:

- frontend/src/components/dialogs/RatingModal.tsx
- frontend/src/components/VenueListCard.tsx
- backend/lambdas/ratings/app.py
- backend/lambdas/venues/app.py

---

### 3. One Rating Per User Per Venue Per Day

To prevent one user from influencing the public rating too many times in the same day, Work4U limits ratings using this rule:

A user can rate the same venue only once per day.

If the same user visits the same venue on another day, they can submit a new rating again.

Each rating stores a date field:

ratingDate = YYYY-MM-DD

The date is calculated using Israel time:

Asia/Jerusalem

Before creating a new rating, the Ratings Lambda checks whether the same user already rated the same venue on the same date.

If a duplicate rating is detected, the API returns:

DUPLICATE_RESOURCE

This keeps the venue rating more reliable while still allowing users to rate a place again when they visit it on a different day.

