# Work4U - תיעוד טכני למפתחים ולתחזוקה

מסמך זה מיועד למפתחים שיקבלו את מערכת Work4U לאחר המסירה ויצטרכו להבין,
להתקין, לתחזק ולהרחיב אותה. המסמך נכתב עבור מפתח שמכיר תכנות ו-AWS, ולכן
הוא מתמקד בארכיטקטורה, רכיבי AWS, ממשקי API, מבני נתונים ותהליכי תחזוקה.

## 1. ארכיטקטורה

Work4U היא מערכת Serverless על AWS.

| תחום | מיקום בפרויקט | אחריות |
| --- | --- | --- |
| Frontend | `frontend/` | אפליקציית React + Vite + TypeScript |
| Backend | `backend/lambdas/` | handlers של AWS Lambda בפייתון |
| קוד backend משותף | `backend/shared/` | עזרי אימות, הרשאות ופורמט תשובות |
| IaC | `infrastructure/template.yaml` | תבנית SAM/CloudFormation עבור AWS Learner Lab |
| IaC לחשבון רגיל | `infrastructure/template-prod.yaml` | תבנית שיוצרת הרשאות IAM מתאימות |
| חוזה API | `openapi/work4u-api.openapi.yaml` | מפרט OpenAPI/Swagger |
| Scripts | `scripts/` | פריסה, טעינת נתונים, בנייה, מחיקה ואריזה |

שירותי AWS המרכזיים:

- API Gateway חושף את ממשקי ה-REST.
- Cognito מנהל משתמשים, התחברות, קבוצות והרשאות.
- Lambda מממש את שירותי ה-backend.
- DynamoDB שומר מקומות, דירוגים, העדפות ופרופיל למידה אישי.
- S3 שומר תמונות של מקומות ויכול לשמש גם לאירוח frontend סטטי.

זרימת קריאה טיפוסית:

```text
Browser
React Frontend
API Gateway
Lambda
DynamoDB / S3
JSON Response
React UI
```

## 2. קונפיגורציה

משתני סביבה של פונקציות ה-Lambda:

| משתנה | בשימוש על ידי | משמעות |
| --- | --- | --- |
| `PREFERENCES_TABLE` | Preferences | טבלת העדפות משתמשים |
| `VENUES_TABLE` | Venues, Ratings, Admin | טבלת מקומות |
| `RATINGS_TABLE` | Ratings | טבלת דירוגים |
| `USER_LEARNING_TABLE` | Venues, Learning | טבלת פרופיל למידה אישי |
| `IMAGES_BUCKET` | Admin | דלי S3 לתמונות מקומות |

משתני ה-frontend נוצרים על ידי `scripts/write-frontend-env.sh` בתוך
`frontend/.env`:

| משתנה | משמעות |
| --- | --- |
| `VITE_USE_MOCK` | `false` לעבודה מול AWS, `true` לעבודה מול mock מקומי |
| `VITE_API_BASE_URL` | כתובת הבסיס של API Gateway |
| `VITE_AWS_REGION` | אזור AWS |
| `VITE_COGNITO_USER_POOL_ID` | מזהה Cognito User Pool |
| `VITE_COGNITO_USER_POOL_CLIENT_ID` | מזהה Cognito App Client |

## 3. אימות, הרשאות ופורמט תשובות

כל נתיבי ה-API שנפרסים מוגנים על ידי Cognito Authorizer המוגדר ב-
`infrastructure/template.yaml`.

כל קריאת API מה-frontend נשלחת עם הכותרות:

```http
Authorization: Bearer <cognito-id-token>
Content-Type: application/json
```

שליפת המשתמש הנוכחי ובדיקת הרשאות מנהל נמצאות ב-`backend/shared/auth.py`.

- משתמש רגיל נמצא בקבוצת Cognito בשם `Users`.
- מנהל נמצא בקבוצת Cognito בשם `Admins`.
- Endpoint שמיועד למנהל בלבד מחזיר `403 FORBIDDEN` למשתמש שאינו מנהל.

כל תשובות ה-Lambda נבנות דרך `backend/shared/response.py`.

פורמט הצלחה:

```json
{ "success": true, "ok": true, "message": "...", "data": {} }
```

פורמט שגיאה:

```json
{ "success": false, "ok": false, "message": "...", "errorCode": "VALIDATION_ERROR" }
```

קודי HTTP נפוצים: `200`, `201`, `400`, `401`, `403`, `404`, `405`, `409`,
`500`.

קודי שגיאה נפוצים: `UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_ERROR`,
`NOT_FOUND`, `DUPLICATE_RESOURCE`, `METHOD_NOT_ALLOWED`, `SERVER_ERROR`.

## 4. טיפוסי נתונים משותפים

הטיפוסים הקנוניים בצד ה-frontend נמצאים ב-`frontend/src/types/api.ts`.

| טיפוס | ערכים |
| --- | --- |
| `PriceRange` | `low`, `medium`, `high` |
| `PriceRangeFilter` | `low`, `medium`, `high`, `any` |
| `WifiQuality` | `low`, `medium`, `high` |
| `NoiseLevel` | `low`, `medium`, `high` |
| `SeatType` | `table`, `sofa`, `bar`, `any` |
| `CrowdLevel` | `free`, `reasonable`, `crowded` |
| `UserRole` | `USER`, `ADMIN` |

## 5. ממשקי API

כל הממשקים הבאים נחשבים חלק מחוזה המערכת. מפרט פורמלי נוסף נמצא בקובץ
`openapi/work4u-api.openapi.yaml`.

### 5.1 `GET /venues`

Lambda: `backend/lambdas/venues/app.py`  
Frontend: `venues.list()`

מטרה: החזרת רשימת מקומות פעילים, עם תמיכה בסינון, מרחק ודירוג התאמה.

פרמטרים ב-query string:

| שם | טיפוס | חובה | הערות |
| --- | --- | --- | --- |
| `lat` | number | לא | קו רוחב; משמש יחד עם `lng` ו-`radiusKm` |
| `lng` | number | לא | קו אורך; משמש יחד עם `lat` ו-`radiusKm` |
| `radiusKm` | number | לא | סינון קשיח לפי מרחק בקילומטרים |
| `search` | string | לא | חיפוש בשם, aliases, כתובת, תיאור וסוג מקום |
| `priceRange` | string | לא | `low`, `medium`, `high`, `any`; משמש גם לדירוג התאמה |
| `wifiQuality` | string | לא | `low`, `medium`, `high`; משמש לדירוג התאמה |
| `quietEnvironment` | boolean string | לא | `true` או `false`; משמש לדירוג התאמה |
| `needPowerOutlet` | boolean string | לא | `true` או `false`; משמש לדירוג התאמה |

תוצאת `data`: מערך `VenueSummary[]`.

שדות חשובים בתוצאה: `venueId`, `name`, `address`, `latitude`, `longitude`,
`priceRange`, `wifiQuality`, `noiseLevel`, `hasPowerOutlets`, `averageRating`,
`currentCrowdLevel`, `mainImageUrl`, `openingHours`, `distanceKm`,
`matchScore`, `learningScore`.

### 5.2 `GET /venues/{venueId}`

Lambda: `backend/lambdas/venues/app.py`  
Frontend: `venues.get(venueId)`

מטרה: החזרת פרטים מלאים עבור מקום פעיל יחיד.

פרמטרים ב-path:

| שם | טיפוס | חובה |
| --- | --- | --- |
| `venueId` | string | כן |

תוצאת `data`: אובייקט `VenueDetail`, הכולל את שדות `VenueSummary` וגם
`description`, `imageUrls` ו-`forecast`.

אם המקום לא קיים או אינו פעיל, הקריאה מחזירה `404 NOT_FOUND`.

### 5.3 `GET /preferences`

Lambda: `backend/lambdas/preferences/app.py`  
Frontend: `preferences.get()`

מטרה: החזרת העדפות המשתמש המחובר.

פרמטרים: אין.

תוצאת `data`: אובייקט `UserPreferences` או `null`.

שדות: `userId`, `email`, `quietEnvironment`, `needPowerOutlet`,
`wifiQuality`, `preferredSeatType`, `priceRange`, `favoriteVenueIds`,
`updatedAt`.

### 5.4 `POST /preferences`

Lambda: `backend/lambdas/preferences/app.py`  
Frontend: `preferences.save(input)`

מטרה: יצירה או החלפה של העדפות המשתמש המחובר.

Body:

```json
{
  "quietEnvironment": true,
  "needPowerOutlet": true,
  "wifiQuality": "high",
  "preferredSeatType": "table",
  "priceRange": "medium",
  "favoriteVenueIds": ["venue-001"]
}
```

ולידציה:

| שדה | טיפוס / ערכים |
| --- | --- |
| `quietEnvironment` | boolean |
| `needPowerOutlet` | boolean |
| `wifiQuality` | `low`, `medium`, `high` |
| `preferredSeatType` | `table`, `sofa`, `bar`, `any` |
| `priceRange` | `low`, `medium`, `high`, `any` |
| `favoriteVenueIds` | מערך string אופציונלי; מוסרים כפילויות ומוגבל ל-100 ערכים |

תוצאת `data`: אובייקט `UserPreferences` כפי שנשמר.

### 5.5 `GET /ratings/my`

Lambda: `backend/lambdas/ratings/app.py`  
Frontend: `ratings.listMine()`

מטרה: החזרת כל הדירוגים שנוצרו על ידי המשתמש המחובר, מהחדש לישן.

תוצאת `data`: מערך `Rating[]`.

שדות דירוג: `ratingId`, `userId`, `userEmail`, `venueId`, `venueName`,
`ratingDate`, `crowdLevel`, `wifiRating`, `noiseRating`, `comment`,
`createdAt`, `updatedAt`.

### 5.6 `POST /ratings`

Lambda: `backend/lambdas/ratings/app.py`  
Frontend: `ratings.submit(input)`

מטרה: יצירת דירוג עבור מקום ועדכון שדות הסיכום `averageRating` ו-`ratingCount`
ברשומת המקום.

Body:

```json
{
  "venueId": "venue-001",
  "crowdLevel": "reasonable",
  "wifiRating": 5,
  "noiseRating": 4,
  "comment": "Quiet and comfortable"
}
```

ולידציה:

| שדה | טיפוס / ערכים |
| --- | --- |
| `venueId` | string; חייב להצביע על מקום פעיל |
| `crowdLevel` | `free`, `reasonable`, `crowded` |
| `wifiRating` | integer בטווח 1-5 |
| `noiseRating` | integer בטווח 1-5 |
| `comment` | string אופציונלי, עד 500 תווים |

כלל עסקי: משתמש יכול לדרג את אותו מקום פעם אחת בלבד בכל יום קלנדרי לפי שעון
ישראל. ניסיון דירוג כפול באותו יום מחזיר `409 DUPLICATE_RESOURCE`.

תוצאת `data`: אובייקט `Rating` שנוצר.

### 5.7 `PUT /ratings/{ratingId}`

Lambda: `backend/lambdas/ratings/app.py`  
Frontend: `ratings.update(ratingId, input)`

מטרה: עדכון דירוג קיים ועדכון מחדש של סיכום הדירוג במקום.

פרמטר path: `ratingId` מסוג string.

Body:

```json
{
  "crowdLevel": "free",
  "wifiRating": 4,
  "noiseRating": 5,
  "comment": "Updated comment"
}
```

הרשאות: משתמש רגיל יכול לעדכן רק דירוגים שהוא יצר. מנהל יכול לעדכן כל דירוג.

תוצאת `data`: אובייקט `Rating` מעודכן.

### 5.8 `DELETE /ratings/{ratingId}`

Lambda: `backend/lambdas/ratings/app.py`  
Frontend: `ratings.remove(ratingId)`

מטרה: מחיקת דירוג ועדכון מחדש של סיכום הדירוג במקום.

פרמטר path: `ratingId` מסוג string.

הרשאות: משתמש רגיל יכול למחוק רק דירוגים שהוא יצר. מנהל יכול למחוק כל דירוג.

תוצאת `data`:

```json
{ "ratingId": "rating-..." }
```

### 5.9 `GET /learning`

Lambda: `backend/lambdas/learning/app.py`  
Frontend: `learning.get()`

מטרה: החזרת פרופיל הפרסונליזציה של המשתמש המחובר.

תוצאת `data`: אובייקט `UserLearningProfile`.

שדות: `userId`, `categoryScores`, `searchTermScores`, `totalEvents`,
`createdAt`, `updatedAt`.

קטגוריות ברירת מחדל: `cafe`, `coworking`, `library`, `academic`,
`community`, `workspace`.

### 5.10 `POST /learning/event`

Lambda: `backend/lambdas/learning/app.py`  
Frontend: `learning.record(input)`

מטרה: רישום אירוע התנהגות של המשתמש ועדכון ניקודי הפרסונליזציה.

גופי בקשה נתמכים:

```json
{ "type": "search", "searchTerm": "quiet cafe" }
```

```json
{ "type": "open_venue", "venueId": "venue-001", "placeType": "cafe" }
```

```json
{ "type": "rating", "venueId": "venue-001", "placeType": "coworking", "rating": 5 }
```

ולידציה: `type` חייב להיות `search`, `open_venue` או `rating`.

תוצאת `data`: אובייקט `UserLearningProfile` מעודכן.

### 5.11 `POST /admin/venues`

Lambda: `backend/lambdas/admin/app.py`  
Frontend: `venues.create(input)`  
Auth: מנהל בלבד.

מטרה: יצירת מקום חדש.

שדות חובה ב-body: `name`, `address`, `latitude`, `longitude`,
`openingHours`, `priceRange`, `wifiQuality`, `noiseLevel`,
`hasPowerOutlets`.

שדות אופציונליים ב-body: `description`, `imageUrls`, `categoryLabel`,
`accessNote`, `contactNote`, `website`, `phone`, `email`,
`currentCrowdLevel`.

תוצאת `data`: רשומת המקום שנוצרה, כולל שדות שנוצרים בשרת: `venueId`,
`averageRating`, `isActive`, `createdBy`, `createdAt`, `updatedAt`.

### 5.12 `PUT /admin/venues/{venueId}`

Lambda: `backend/lambdas/admin/app.py`  
Frontend: `venues.update(venueId, input)`  
Auth: מנהל בלבד.

מטרה: עדכון שדות ניתנים לעריכה ברשומת מקום.

פרמטר path: `venueId` מסוג string.

שדות ניתנים לעריכה: `openingHours`, `priceRange`, `wifiQuality`,
`noiseLevel`, `hasPowerOutlets`, `description`, `imageUrls`, `amenities`,
`mainImageUrl`, `categoryLabel`, `accessNote`, `contactNote`, `website`,
`phone`, `email`, `currentCrowdLevel`.

שדות שאינם ניתנים לעריכה דרך endpoint זה: `name`, `address`, `latitude`,
`longitude`, `placeType`, `source`.

תוצאת `data`: רשומת המקום המעודכנת.

### 5.13 `DELETE /admin/venues/{venueId}`

Lambda: `backend/lambdas/admin/app.py`  
Frontend: `venues.remove(venueId)`  
Auth: מנהל בלבד.

מטרה: מחיקה לוגית של מקום על ידי עדכון `isActive` ל-`false`.

פרמטר path: `venueId` מסוג string.

תוצאת `data`:

```json
{ "venueId": "venue-001", "isActive": false }
```

### 5.14 `POST /admin/venues/{venueId}/images/upload-url`

Lambda: `backend/lambdas/admin/app.py`  
Frontend: `venues.uploadUrl(...)`, `storage.uploadVenuePhoto(...)`  
Auth: מנהל בלבד.

מטרה: יצירת S3 presigned URL למשך 900 שניות עבור העלאה ישירה של תמונת מקום.

פרמטר path: `venueId` מסוג string.

Body:

```json
{ "fileName": "workspace.jpg", "contentType": "image/jpeg" }
```

ולידציה: `contentType` חייב להתחיל ב-`image/`.

תוצאת `data`:

```json
{
  "uploadUrl": "https://...",
  "imageUrl": "https://<bucket>.s3.amazonaws.com/venues/<venueId>/<file>",
  "objectKey": "venues/<venueId>/<file>"
}
```

תהליך העלאה:

1. ה-frontend מבקש URL חתום מה-backend.
2. ה-frontend מעלה את קובץ התמונה ישירות ל-S3 עם `PUT uploadUrl`.
3. כתובת `imageUrl` נשמרת ברשומת המקום בדינמו.
4. ה-frontend מציג את התמונה מתוך הכתובת שנשמרה.

## 6. Cognito Trigger

Lambda: `backend/lambdas/auth_triggers/app.py`

Trigger: `PreSignUp` של Cognito User Pool.

מטרה: אישור אוטומטי של משתמשי demo וסימון האימייל כמאומת.

הערת Production: בסביבת ייצור אמיתית מומלץ להחליף זאת באימות אימייל רגיל.

## 7. טבלאות DynamoDB

| טבלה | מפתח | מטרה |
| --- | --- | --- |
| `Work4U_Venues` | `venueId` | מטא-דאטה של מקומות, תמונות, שדות סינון, סיכום דירוג ומצב מחיקה לוגית |
| `Work4U_Ratings` | `ratingId` | דירוגים ותגובות משתמשים |
| `Work4U_UserPreferences` | `userId` | העדפות משתמש ורשימת מקומות מועדפים |
| `Work4U_UserLearning` | `userId` | ניקודי פרסונליזציה |

אינדקסים בטבלת `Work4U_Ratings`:

- `userId-index`, partition key בשם `userId`.
- `venueId-index`, partition key בשם `venueId`.

## 8. שכבת ה-API בצד ה-frontend

ה-UI משתמש בממשקי שירות המוגדרים ב-`frontend/src/api/services.ts`.

מימושים:

- `frontend/src/api/live.ts`: adapter לעבודה מול AWS API Gateway.
- `frontend/src/api/mock/store.ts`: adapter לעבודה מקומית עם mock data.

זרימת קריאה:

1. רכיב UI קורא למתודת service.
2. `live.ts` ממפה את הקריאה ל-endpoint REST.
3. `http.ts` מצרף Cognito token ומחלץ את `data` מתוך `{ success, data }`.
4. `frontend/src/lib/mappers.ts` ממיר את נתוני ה-API למודלים נוחים לתצוגה.

הערה: `users.me()` ו-`/users/me` קיימים בחוזה ה-frontend/OpenAPI, אבל ה-SAM
stack הנוכחי אינו פורס את הנתיב הזה. כיום ה-UI מפיק את פרטי המשתמש המחובר
ישירות מ-Cognito דרך `frontend/src/api/auth.ts`.

## 9. Scripts ותהליכי תחזוקה

| Script | מטרה |
| --- | --- |
| `scripts/deploy-backend.sh` | פריסת SAM stack בשם `work4u` |
| `scripts/write-frontend-env.sh` | כתיבת outputs מה-stack אל `frontend/.env` |
| `scripts/seed-data.sh` | טעינת נתוני מקומות התחלתיים |
| `scripts/build-frontend.sh` | התקנת תלויות, בדיקות ובניית Vite |
| `scripts/delete-stack.sh` | מחיקת CloudFormation stack |
| `scripts/package-release.sh` | יצירת ZIP מקור למסירה |

לאחר שינוי backend או infrastructure:

```bash
bash scripts/deploy-backend.sh
bash scripts/write-frontend-env.sh
bash scripts/build-frontend.sh
```

לאחר שינוי frontend בלבד:

```bash
bash scripts/write-frontend-env.sh
bash scripts/build-frontend.sh
aws s3 sync frontend/dist/ s3://$WEB_BUCKET/ --delete
```

יצירת ZIP חדש למסירה:

```bash
bash scripts/package-release.sh
```

## 10. בדיקות איכות

```bash
cd frontend
npm run smoke
npm run typecheck
npm run build
```

או דרך הסקריפט המאוחד:

```bash
bash scripts/build-frontend.sh
```

## 11. הערות תחזוקה

- `GET /venues` מבצע scan לטבלת המקומות ומסנן בתוך Lambda. אם כמות הנתונים
  תגדל משמעותית, יש להוסיף אינדקסים מתאימים או שירות חיפוש.
- `recalculate_venue_rating()` אמור בעתיד להשתמש ישירות ב-`venueId-index`
  במקום לבצע scan עם filter.
- מחיקת מקום היא מחיקה לוגית בלבד: הרשומה נשארת ב-DynamoDB ו-`isActive`
  משתנה ל-`false`.
- כתובות ההעלאה ל-S3 פגות לאחר 900 שניות.
- `infrastructure/template.yaml` משתמש ב-`LabRole` של AWS Learner Lab.
- `infrastructure/template-prod.yaml` מיועד לחשבונות AWS שבהם מותר ל-stack
  ליצור הרשאות IAM.
