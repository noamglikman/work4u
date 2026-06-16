# Work4U — הסבר מערכת לצוות

מטרת המסמך הזה היא להסביר בצורה ברורה איך פרויקט Work4U עובד מקצה לקצה: מה המשתמש רואה, איך הפרונט מחובר ל־AWS, איך הנתונים עוברים בין React, API Gateway, Lambda ו־DynamoDB, ואיך מבצעים build ו־deploy.

---

## 1. מה זה Work4U?

Work4U היא אפליקציית Web שעוזרת למשתמשים למצוא מקום מתאים לעבוד או ללמוד ממנו.

במקום לחפש רק “בית קפה קרוב”, המערכת מנסה למצוא מקום שמתאים לעבודה לפי תנאים כמו:

* מיקום נוכחי או מיקום ידני
* מרחק מהמקום
* איכות Wi-Fi
* רמת רעש
* זמינות שקעי חשמל
* מחיר / מחיר קפה ממוצע
* שעות פעילות
* דירוגים ופידבק ממשתמשים

---

## 2. הארכיטקטורה הכללית

המערכת בנויה כ־Serverless Web Application על AWS.

הזרימה הכללית:

User Browser
↓
CloudFront HTTPS
↓
S3 bucket שמחזיק את קבצי React
↓
React App בדפדפן
↓
API Gateway
↓
Lambda Functions
↓
DynamoDB

רכיבים נוספים:

* Cognito — התחברות והרשאות
* S3 Images Bucket — שמירת תמונות של מקומות
* CloudFront — HTTPS ו־CDN
* DynamoDB — שמירת מקומות, דירוגים, העדפות ולמידת משתמש

אין בפרויקט שרת EC2 שאנחנו מנהלות ידנית. רוב הרכיבים הם שירותים מנוהלים של AWS.

---

## 3. רכיבי AWS המרכזיים

### S3 — אחסון הפרונט

ה־frontend נבנה לקבצים סטטיים ונשמר ב־S3 bucket:

work4u-frontend-prod-005311909587-us-east-1

### CloudFront — HTTPS

CloudFront יושב מעל S3 ומגיש את האתר ב־HTTPS:

https://d2naweiqyo4hkm.cloudfront.net

זה חשוב כי פיצ׳רים כמו “מיקום נוכחי” דורשים אתר מאובטח.

### API Gateway

API Gateway הוא שער הכניסה ל־backend. הפרונט שולח אליו בקשות כמו:

* GET /venues
* GET /venues/{venueId}
* POST /ratings
* GET /preferences
* PUT /admin/venues/{venueId}

### Lambda

כל פעולה ב־backend רצה כ־Lambda function. אין שרת backend שרץ תמיד.

### DynamoDB

הנתונים נשמרים בטבלאות:

* Work4U_Venues
* Work4U_Ratings
* Work4U_UserPreferences
* Work4U_UserLearning

### Cognito

Cognito מנהל משתמשים, התחברות והרשאות. אחרי login המשתמש מקבל token, והפרונט שולח אותו ל־API בבקשות מוגנות.

---

## 4. מבנה הפרויקט

work4u/

* frontend/ — React + Vite frontend
* backend/ — קוד ה־Lambda
* infrastructure/ — תשתית AWS ב־SAM / CloudFormation
* scripts/ — סקריפטים לעדכון דאטה
* docs/ — תיעוד
* backups/ — גיבויים מקומיים, לא מעלים לגיט
* .aws-sam/ — תוצרי build של SAM

---

## 5. קבצי frontend חשובים

* frontend/src/App.tsx — הקובץ המרכזי שמנהל מסכים, פילטרים, מיקום וטעינת מקומות
* frontend/src/screens/Home.tsx — מסך הבית
* frontend/src/screens/Venue.tsx — עמוד פרטי מקום
* frontend/src/components/VenueListCard.tsx — כרטיס מקום ברשימה
* frontend/src/components/MapCanvas.tsx — המפה הגרפית
* frontend/src/components/dialogs/AdminVenuesDialog.tsx — פאנל ניהול מקומות
* frontend/src/hooks/useVenues.ts — טעינת מקומות מה־API
* frontend/src/hooks/useGeolocation.ts — מיקום נוכחי
* frontend/src/lib/filters.ts — בניית query לפי פילטרים
* frontend/src/lib/mappers.ts — המרת נתוני API לנתוני תצוגה
* frontend/src/lib/geo.ts — מרחקים וקואורדינטות
* frontend/src/api/http.ts — קריאות HTTP
* frontend/src/api/live.ts — פעולות API נוחות
* frontend/src/config/env.ts — קריאת משתני סביבה

---

## 6. קבצי backend חשובים

* backend/lambdas/venues/app.py — מקומות
* backend/lambdas/admin/app.py — פעולות מנהל
* backend/lambdas/ratings/app.py — דירוגים
* backend/lambdas/preferences/app.py — העדפות משתמש
* backend/lambdas/learning/app.py — למידת התנהגות בסיסית
* backend/shared/response.py — תשובות JSON ו־CORS
* backend/shared/auth.py — עזרי Authentication והרשאות

---

## 7. איך נטענים מקומות באתר?

הזרימה:

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
DynamoDB Work4U_Venues
↓
JSON response
↓
toVenuePreview
↓
Home + VenueListCard + MapCanvas

כלומר React לא קורא ישירות ל־DynamoDB. הוא תמיד עובר דרך API Gateway ו־Lambda.

---

## 8. איך עובד מיקום נוכחי?

הקובץ המרכזי:

frontend/src/hooks/useGeolocation.ts

הוא משתמש ב־browser API:

navigator.geolocation.getCurrentPosition

בעיה שהייתה:
האתר היה על HTTP ולכן הדפדפן חסם מיקום. בנוסף, אם המיקום נכשל, המערכת נשארה על ברירת מחדל של תל אביב.

התיקון:
העברנו את האתר ל־HTTPS דרך CloudFront, ושיפרנו את ההתנהגות כך שלא יוצגו תוצאות מתל אביב כאילו זה המיקום הנוכחי.

---

## 9. איך עובד פאנל ניהול מקומות?

הקובץ המרכזי:

frontend/src/components/dialogs/AdminVenuesDialog.tsx

הפאנל מאפשר למנהל:

* לראות רשימת מקומות
* לחפש מקום
* לערוך Wi-Fi, רעש, שקעים, מחיר, שעות ותיאור
* להוסיף אתר, טלפון ואימייל
* להוסיף תמונות
* להסיר תמונות מהתצוגה
* למחוק מקום מהתצוגה

העדכון נשלח ל־Admin Lambda, ומשם נשמר ב־DynamoDB.

---

## 10. איך תמונות עובדות?

התמונות נשמרות ב־S3 bucket נפרד:

work4u-venue-images-005311909587-us-east-1

הזרימה:

Admin selects image
↓
Frontend asks backend for upload URL
↓
Admin Lambda creates presigned URL
↓
Frontend uploads image directly to S3
↓
Frontend saves image URL in DynamoDB
↓
Frontend displays image

מחיקת תמונה מהתצוגה מסירה את ה־URL מתוך imageUrls. זה לא בהכרח מוחק פיזית את הקובץ מ־S3.

---

## 11. מחיר קפה ממוצע

הוספנו סקריפט:

scripts/update_coffee_prices.py

המטרה הייתה למנוע מצב שכל המקומות מציגים אותו מחיר קפה.

הסקריפט מחשב מחיר לפי:

* אזור בארץ
* סוג מקום
* מזהה מקום

השדות שנוספו ל־DynamoDB:

* averageCoffeePrice
* coffeePriceSource
* coffeePriceUpdatedAt
* priceRange

הפרונט מציג מחיר לפי averageCoffeePrice אם הוא קיים.

---

## 12. איך עושים build לפרונט?

מתיקיית הפרונט:

cd ~/projects/work4u/frontend
npm run build

התוצר נוצר בתיקייה:

frontend/dist

---

## 13. איך מעלים frontend ל־S3 ו־CloudFront?

cd ~/projects/work4u/frontend

aws s3 sync ./dist/ s3://work4u-frontend-prod-005311909587-us-east-1 --delete

aws s3 cp ./dist/index.html s3://work4u-frontend-prod-005311909587-us-east-1/index.html --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html"

aws cloudfront create-invalidation --distribution-id E11QEQKPML3717 --paths "/*"

---

## 14. איך עושים build ל־backend?

cd ~/projects/work4u

sam build --template-file infrastructure/template.yaml

---

## 15. איך עושים deploy ל־backend?

cd ~/projects/work4u

sam deploy --template-file .aws-sam/build/template.yaml --stack-name work4u-dev --capabilities CAPABILITY_IAM --region us-east-1 --resolve-s3 --no-confirm-changeset --no-fail-on-empty-changeset

---

## 16. בדיקות שימושיות

בדיקת זהות AWS:

aws sts get-caller-identity

בדיקת טבלאות:

aws dynamodb list-tables

בדיקת CloudFront:

aws cloudfront get-distribution --id E11QEQKPML3717 --query "Distribution.{DomainName:DomainName,Status:Status}" --output table

בדיקת HTTPS בדפדפן:

window.isSecureContext

בדיקת מיקום בדפדפן:

navigator.geolocation.getCurrentPosition(
p => console.log(p.coords.latitude, p.coords.longitude),
e => console.error(e)
)

---

## 17. משפט הסבר קצר לפרויקט

Work4U היא אפליקציית Serverless למציאת מקום מתאים לעבודה או למידה לפי מיקום, העדפות ותנאי עבודה כמו Wi-Fi, שקט, שקעים ומחיר. הפרונט כתוב ב־React ומוגש דרך S3 ו־CloudFront HTTPS, הבקשות עוברות דרך API Gateway ל־Lambda, והנתונים נשמרים ב־DynamoDB עם Cognito לניהול משתמשים והרשאות.

---

## 18. דברים לשיפור בהמשך

* חיבור ל־Google Places
* דומיין אישי
* Dashboard למנהל
* מחיקה פיזית של תמונות מ־S3
* המלצות חכמות יותר
* בדיקות אוטומטיות
* שיפור UX כשאין מקומות בטווח
