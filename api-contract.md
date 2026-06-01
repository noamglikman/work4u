# Work4U API Contract

## 1. General Description

Work4U is a cloud-based web application that helps users find suitable workspaces based on location, personal preferences, community ratings, and workspace details.

The system includes two main user roles:

1. Regular User
2. Admin User

The frontend communicates with the backend through API Gateway.  
The backend logic is implemented using AWS Lambda functions.  
Data is stored in DynamoDB.  
Images are stored in Amazon S3.  
Authentication and authorization are handled using Amazon Cognito.

---

## 2. Base URL

During development:

```text
https://{api-id}.execute-api.{region}.amazonaws.com/dev
```

Example:

```text
https://abc123.execute-api.us-east-1.amazonaws.com/dev
```

---

## 3. Authentication

Authentication is handled by Amazon Cognito.

After login, the frontend receives a JWT token from Cognito.

Every protected API request must include the token in the request headers:

```http
Authorization: Bearer <JWT_TOKEN>
```

The backend/API Gateway uses the token to identify:

```text
userId
email
role
```

---

## 4. User Roles

### Regular User

A regular user can:

```text
- Register and log in
- Define personal workspace preferences
- View recommended workspaces
- View workspace details
- Submit ratings and reports
- View rating history
- Edit or delete personal ratings
```

### Admin User

An admin user can do everything a regular user can do, and also:

```text
- Add a new workspace
- Edit existing workspace details
- Upload workspace images
- Delete or disable a workspace
```

---

## 5. Global Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errorCode": "ERROR_CODE"
}
```

---

## 6. Global Error Codes

| Error Code | Meaning |
|---|---|
| `UNAUTHORIZED` | User is not logged in |
| `FORBIDDEN` | User does not have permission |
| `VALIDATION_ERROR` | Missing or invalid input |
| `NOT_FOUND` | Requested resource was not found |
| `SERVER_ERROR` | Internal server error |
| `DUPLICATE_RESOURCE` | Resource already exists |
| `INVALID_LOCATION` | Invalid GPS/location data |

---

# 7. API Endpoints

---

## 7.1 Get Current User Profile

### Endpoint

```http
GET /users/me
```

### Description

Returns the current logged-in user's basic profile.

### Permission

```text
User / Admin
```

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Response Example

```json
{
  "success": true,
  "message": "User profile loaded successfully",
  "data": {
    "userId": "user-123",
    "email": "user@example.com",
    "role": "USER",
    "createdAt": "2026-06-01T10:00:00Z"
  }
}
```

---

## 7.2 Save User Preferences

### Endpoint

```http
POST /preferences
```

### Description

Saves or updates the user's personal workspace preferences.

This endpoint is used after registration and also when the user edits their profile.

### Permission

```text
User / Admin
```

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "quietEnvironment": true,
  "needPowerOutlet": true,
  "wifiQuality": "high",
  "preferredSeatType": "table",
  "priceRange": "medium"
}
```

### Field Explanation

| Field | Type | Required | Description |
|---|---|---|---|
| `quietEnvironment` | boolean | yes | Whether the user prefers a quiet workspace |
| `needPowerOutlet` | boolean | yes | Whether the user needs power outlets |
| `wifiQuality` | string | yes | Desired Wi-Fi quality: `low`, `medium`, `high` |
| `preferredSeatType` | string | yes | Preferred seating type: `table`, `sofa`, `bar`, `any` |
| `priceRange` | string | yes | Preferred price range: `low`, `medium`, `high`, `any` |

### Response Example

```json
{
  "success": true,
  "message": "Preferences saved successfully",
  "data": {
    "userId": "user-123",
    "quietEnvironment": true,
    "needPowerOutlet": true,
    "wifiQuality": "high",
    "preferredSeatType": "table",
    "priceRange": "medium",
    "updatedAt": "2026-06-01T10:30:00Z"
  }
}
```

---

## 7.3 Get User Preferences

### Endpoint

```http
GET /preferences
```

### Description

Returns the saved preferences of the logged-in user.

### Permission

```text
User / Admin
```

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Response Example

```json
{
  "success": true,
  "message": "Preferences loaded successfully",
  "data": {
    "userId": "user-123",
    "quietEnvironment": true,
    "needPowerOutlet": true,
    "wifiQuality": "high",
    "preferredSeatType": "table",
    "priceRange": "medium"
  }
}
```

---

## 7.4 Get Recommended Workspaces

### Endpoint

```http
GET /venues
```

### Description

Returns a list of workspaces based on the user's location, filters, and saved preferences.

This endpoint is used by the main dashboard and map screen.

### Permission

```text
User / Admin
```

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Query Parameters

```http
GET /venues?lat=32.0853&lng=34.7818&radiusKm=5&search=cafe&priceRange=medium
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `lat` | number | no | User latitude |
| `lng` | number | no | User longitude |
| `radiusKm` | number | no | Search radius in kilometers |
| `search` | string | no | Free text search by workspace name or address |
| `priceRange` | string | no | `low`, `medium`, `high`, `any` |
| `wifiQuality` | string | no | `low`, `medium`, `high` |
| `quietEnvironment` | boolean | no | Filter quiet places |
| `needPowerOutlet` | boolean | no | Filter places with outlets |

### Response Example

```json
{
  "success": true,
  "message": "Venues loaded successfully",
  "data": [
    {
      "venueId": "venue-001",
      "name": "Work Cafe Tel Aviv",
      "address": "Dizengoff 100, Tel Aviv",
      "latitude": 32.0853,
      "longitude": 34.7818,
      "priceRange": "medium",
      "wifiQuality": "high",
      "noiseLevel": "medium",
      "hasPowerOutlets": true,
      "averageRating": 4.5,
      "currentCrowdLevel": "reasonable",
      "mainImageUrl": "https://s3.amazonaws.com/work4u-images/venue-001/main.jpg"
    }
  ]
}
```

---

## 7.5 Get Workspace Details

### Endpoint

```http
GET /venues/{venueId}
```

### Description

Returns full details about a specific workspace.

This endpoint is used by the workspace profile screen.

### Permission

```text
User / Admin
```

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `venueId` | string | yes | The ID of the selected workspace |

### Response Example

```json
{
  "success": true,
  "message": "Venue details loaded successfully",
  "data": {
    "venueId": "venue-001",
    "name": "Work Cafe Tel Aviv",
    "address": "Dizengoff 100, Tel Aviv",
    "latitude": 32.0853,
    "longitude": 34.7818,
    "openingHours": "08:00-22:00",
    "priceRange": "medium",
    "wifiQuality": "high",
    "noiseLevel": "medium",
    "hasPowerOutlets": true,
    "description": "A quiet workspace suitable for students and remote workers.",
    "imageUrls": [
      "https://s3.amazonaws.com/work4u-images/venue-001/1.jpg",
      "https://s3.amazonaws.com/work4u-images/venue-001/2.jpg"
    ],
    "averageRating": 4.5,
    "currentCrowdLevel": "reasonable",
    "forecast": [
      {
        "hour": "09:00",
        "crowdLevel": "free"
      },
      {
        "hour": "12:00",
        "crowdLevel": "reasonable"
      },
      {
        "hour": "18:00",
        "crowdLevel": "crowded"
      }
    ]
  }
}
```

---

## 7.6 Submit Workspace Rating

### Endpoint

```http
POST /ratings
```

### Description

Saves a user's rating/report for a workspace.

This endpoint is used by the rating modal/panel.

### Permission

```text
User / Admin
```

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "venueId": "venue-001",
  "crowdLevel": "reasonable",
  "wifiRating": 5,
  "noiseRating": 3,
  "comment": "Good place to work, but a bit noisy during lunch time."
}
```

### Field Explanation

| Field | Type | Required | Description |
|---|---|---|---|
| `venueId` | string | yes | Workspace ID |
| `crowdLevel` | string | yes | `free`, `reasonable`, `crowded` |
| `wifiRating` | number | yes | Rating from 1 to 5 |
| `noiseRating` | number | yes | Rating from 1 to 5 |
| `comment` | string | no | Optional user comment |

### Response Example

```json
{
  "success": true,
  "message": "Rating submitted successfully",
  "data": {
    "ratingId": "rating-789",
    "userId": "user-123",
    "venueId": "venue-001",
    "crowdLevel": "reasonable",
    "wifiRating": 5,
    "noiseRating": 3,
    "comment": "Good place to work, but a bit noisy during lunch time.",
    "createdAt": "2026-06-01T11:00:00Z"
  }
}
```

---

## 7.7 Get My Ratings History

### Endpoint

```http
GET /ratings/my
```

### Description

Returns all ratings submitted by the logged-in user.

This endpoint is used by the rating history screen.

### Permission

```text
User / Admin
```

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Response Example

```json
{
  "success": true,
  "message": "Ratings history loaded successfully",
  "data": [
    {
      "ratingId": "rating-789",
      "venueId": "venue-001",
      "venueName": "Work Cafe Tel Aviv",
      "crowdLevel": "reasonable",
      "wifiRating": 5,
      "noiseRating": 3,
      "comment": "Good place to work.",
      "createdAt": "2026-06-01T11:00:00Z"
    }
  ]
}
```

---

## 7.8 Update My Rating

### Endpoint

```http
PUT /ratings/{ratingId}
```

### Description

Allows a user to update a rating they previously submitted.

### Permission

```text
User / Admin
```

A regular user can only update their own rating.

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ratingId` | string | yes | Rating ID |

### Request Body

```json
{
  "crowdLevel": "crowded",
  "wifiRating": 4,
  "noiseRating": 2,
  "comment": "Updated rating after second visit."
}
```

### Response Example

```json
{
  "success": true,
  "message": "Rating updated successfully",
  "data": {
    "ratingId": "rating-789",
    "updatedAt": "2026-06-01T12:00:00Z"
  }
}
```

---

## 7.9 Delete My Rating

### Endpoint

```http
DELETE /ratings/{ratingId}
```

### Description

Deletes a rating submitted by the logged-in user.

### Permission

```text
User / Admin
```

A regular user can only delete their own rating.

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Response Example

```json
{
  "success": true,
  "message": "Rating deleted successfully",
  "data": {
    "ratingId": "rating-789"
  }
}
```

---

# 8. Admin API Endpoints

---

## 8.1 Create New Workspace

### Endpoint

```http
POST /admin/venues
```

### Description

Creates a new workspace in the system.

This endpoint is available only to admin users.

### Permission

```text
Admin only
```

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "name": "Work Cafe Tel Aviv",
  "address": "Dizengoff 100, Tel Aviv",
  "latitude": 32.0853,
  "longitude": 34.7818,
  "openingHours": "08:00-22:00",
  "priceRange": "medium",
  "wifiQuality": "high",
  "noiseLevel": "medium",
  "hasPowerOutlets": true,
  "description": "A quiet workspace suitable for students and remote workers.",
  "imageUrls": []
}
```

### Response Example

```json
{
  "success": true,
  "message": "Venue created successfully",
  "data": {
    "venueId": "venue-001",
    "createdAt": "2026-06-01T13:00:00Z"
  }
}
```

---

## 8.2 Update Workspace

### Endpoint

```http
PUT /admin/venues/{venueId}
```

### Description

Updates an existing workspace.

This endpoint is available only to admin users.

### Permission

```text
Admin only
```

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "name": "Updated Work Cafe Tel Aviv",
  "address": "Dizengoff 100, Tel Aviv",
  "openingHours": "08:00-23:00",
  "priceRange": "medium",
  "wifiQuality": "high",
  "noiseLevel": "low",
  "hasPowerOutlets": true,
  "description": "Updated workspace description.",
  "imageUrls": [
    "https://s3.amazonaws.com/work4u-images/venue-001/1.jpg"
  ]
}
```

### Response Example

```json
{
  "success": true,
  "message": "Venue updated successfully",
  "data": {
    "venueId": "venue-001",
    "updatedAt": "2026-06-01T13:30:00Z"
  }
}
```

---

## 8.3 Delete Workspace

### Endpoint

```http
DELETE /admin/venues/{venueId}
```

### Description

Deletes or disables a workspace.

Recommended implementation: soft delete using `isActive = false`.

### Permission

```text
Admin only
```

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Response Example

```json
{
  "success": true,
  "message": "Venue disabled successfully",
  "data": {
    "venueId": "venue-001",
    "isActive": false
  }
}
```

---

## 8.4 Generate Upload URL for Workspace Image

### Endpoint

```http
POST /admin/venues/{venueId}/images/upload-url
```

### Description

Generates a pre-signed S3 upload URL for uploading workspace images.

The frontend uses the returned URL to upload the image directly to S3.

### Permission

```text
Admin only
```

### Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "fileName": "main-image.jpg",
  "contentType": "image/jpeg"
}
```

### Response Example

```json
{
  "success": true,
  "message": "Upload URL generated successfully",
  "data": {
    "uploadUrl": "https://s3.amazonaws.com/work4u-images/...",
    "imageUrl": "https://work4u-images.s3.amazonaws.com/venue-001/main-image.jpg"
  }
}
```

---

# 9. Data Models

---

## 9.1 User Model

```json
{
  "userId": "user-123",
  "email": "user@example.com",
  "role": "USER",
  "createdAt": "2026-06-01T10:00:00Z"
}
```

---

## 9.2 User Preferences Model

```json
{
  "userId": "user-123",
  "quietEnvironment": true,
  "needPowerOutlet": true,
  "wifiQuality": "high",
  "preferredSeatType": "table",
  "priceRange": "medium",
  "updatedAt": "2026-06-01T10:30:00Z"
}
```

---

## 9.3 Venue Model

```json
{
  "venueId": "venue-001",
  "name": "Work Cafe Tel Aviv",
  "address": "Dizengoff 100, Tel Aviv",
  "latitude": 32.0853,
  "longitude": 34.7818,
  "openingHours": "08:00-22:00",
  "priceRange": "medium",
  "wifiQuality": "high",
  "noiseLevel": "medium",
  "hasPowerOutlets": true,
  "description": "A quiet workspace suitable for students and remote workers.",
  "imageUrls": [],
  "averageRating": 4.5,
  "currentCrowdLevel": "reasonable",
  "isActive": true,
  "createdAt": "2026-06-01T13:00:00Z",
  "updatedAt": "2026-06-01T13:30:00Z"
}
```

---

## 9.4 Rating Model

```json
{
  "ratingId": "rating-789",
  "userId": "user-123",
  "venueId": "venue-001",
  "crowdLevel": "reasonable",
  "wifiRating": 5,
  "noiseRating": 3,
  "comment": "Good place to work.",
  "createdAt": "2026-06-01T11:00:00Z",
  "updatedAt": "2026-06-01T12:00:00Z"
}
```

---

# 10. DynamoDB Tables Proposal

---

## 10.1 Users Table

Table name:

```text
Work4U_Users
```

Primary key:

```text
userId
```

Fields:

```text
userId
email
role
createdAt
```

---

## 10.2 Preferences Table

Table name:

```text
Work4U_UserPreferences
```

Primary key:

```text
userId
```

Fields:

```text
userId
quietEnvironment
needPowerOutlet
wifiQuality
preferredSeatType
priceRange
updatedAt
```

---

## 10.3 Venues Table

Table name:

```text
Work4U_Venues
```

Primary key:

```text
venueId
```

Fields:

```text
venueId
name
address
latitude
longitude
openingHours
priceRange
wifiQuality
noiseLevel
hasPowerOutlets
description
imageUrls
averageRating
currentCrowdLevel
isActive
createdAt
updatedAt
```

---

## 10.4 Ratings Table

Table name:

```text
Work4U_Ratings
```

Primary key:

```text
ratingId
```

Recommended indexes:

```text
userId-index
venueId-index
```

Fields:

```text
ratingId
userId
venueId
crowdLevel
wifiRating
noiseRating
comment
createdAt
updatedAt
```

---

# 11. Frontend and Backend Agreement

The frontend team and backend team must use the exact same field names.

The project uses camelCase field names.

Correct examples:

```text
quietEnvironment
needPowerOutlet
wifiQuality
preferredSeatType
priceRange
crowdLevel
noiseRating
```

Do not use different versions such as:

```text
quiet_environment
need_power_outlet
wifi
noise
```

---

# 12. Development Order

Recommended implementation order:

```text
1. Create frontend screens with mock data
2. Create Cognito User Pool
3. Connect Login and Signup to Cognito
4. Create DynamoDB tables
5. Create Lambda for saving preferences
6. Create Lambda for reading preferences
7. Create Lambda for venues list
8. Create Lambda for venue details
9. Create Lambda for submitting ratings
10. Create Lambda for rating history
11. Create admin APIs
12. Add S3 image upload
13. Connect frontend to real backend endpoints
14. Test all flows with regular user and admin user
```

---

# 13. Notes

Login and signup are handled mainly by Amazon Cognito and may not require custom backend endpoints.

Admin permissions should be enforced by Cognito groups and checked again in the backend Lambda functions.

All dates should be stored in ISO format:

```text
YYYY-MM-DDTHH:mm:ssZ
```

Example:

```text
2026-06-01T10:30:00Z
```

All protected endpoints must verify the user's identity using the Cognito JWT token.
