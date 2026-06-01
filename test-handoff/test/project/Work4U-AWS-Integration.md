# Work4U — מדריך חיבור ל-AWS Backend

מסמך זה ממפה כל מסך בפרוטוטייפ לשירות ה-AWS הרלוונטי מתוך אפיון ה-UI, ומסביר היכן בדיוק להחליף את ה-mock data בקריאות אמת.

---

## 1. ארכיטקטורה כללית

```
[React Frontend]  ──►  Amazon Cognito        (הזדהות + קבוצת הרשאת Admin)
        │
        ├──────────►  API Gateway  ──►  Lambda  ──►  DynamoDB   (פרופיל, מתחמים, דירוגים)
        │
        └──────────►  Amazon S3                       (גלריית תמונות מתחמים)
```

- **Cognito** — User Pool לניהול משתמשים; קבוצה (`admin`) קובעת אם מוצג סרגל המנהל.
- **API Gateway + Lambda** — כל פעולת קריאה/כתיבה לנתונים עוברת דרך REST API מאובטח ב-JWT של Cognito.
- **DynamoDB** — טבלאות: `Users`, `Venues`, `Reports` (דיווחי עומס/דירוג).
- **S3** — bucket לתמונות מתחמים; הקליינט מעלה ישירות עם Presigned URL.

---

## 2. התקנת SDK

```bash
npm install aws-amplify
# או, ל-SDK נקודתי:
npm install @aws-sdk/client-cognito-identity-provider @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

מומלץ **AWS Amplify** — הוא עוטף Cognito + API Gateway + S3 בקריאות פשוטות. הקובץ `work4u-api.js` (מצורף) בנוי כשכבת abstraction אחת שאפשר לממש מעליה גם Amplify וגם SDK גולמי.

הגדרת Amplify (פעם אחת, ב-entry point):
```js
import { Amplify } from 'aws-amplify';
Amplify.configure({
  Auth: { Cognito: {
    userPoolId: 'us-east-1_XXXX',
    userPoolClientId: 'XXXX',
  }},
  API: { REST: { Work4U: { endpoint: 'https://xxxx.execute-api.us-east-1.amazonaws.com/prod' }}},
  Storage: { S3: { bucket: 'work4u-venue-photos', region: 'us-east-1' }},
});
```

---

## 3. מיפוי מסך → שירות → היכן בקוד

| מסך / פעולה | קובץ בפרוטוטייפ | היום (mock) | להחליף ל- |
|---|---|---|---|
| **התחברות** | `work4u-web-auth.jsx` → `WebLogin.submit()` | `setAdminMode(asAdmin)` + `go('home')` | `signIn()` מול Cognito; קריאת קבוצות מה-JWT לקביעת `isAdmin` |
| **הרשמה** | `work4u-web-auth.jsx` → `WebSignup.submit()` | בדיקת regex מקומית | `signUp()` + `confirmSignUp()` ב-Cognito |
| **שחזור סיסמה** | `work4u-web-extra.jsx` → `ForgotDialog` | toast בלבד | `resetPassword()` ב-Cognito |
| **שמירת העדפות** | `work4u-web-auth.jsx` → `WebPrefs` (כפתור שמירה) | `setPrefs` ב-state | `PUT /users/me/prefs` (API Gateway→Lambda→DynamoDB) |
| **רשימת מתחמים / מפה** | `work4u-web-app.jsx` → `wFilter(W4U_VENUES, …)` | מערך קבוע `W4U_VENUES` | `GET /venues?lat=&lng=&radius=&filters=` (Lambda מריץ שאילתת geo + מנוע ההמלצות) |
| **פרופיל מתחם** | `work4u-web-main.jsx` → `WebVenue` | אובייקט מתוך `W4U_VENUES` | `GET /venues/{id}` ; תמונות מ-S3 ; `forecast` מחושב ב-Lambda מ-`Reports` |
| **דיווח/דירוג קהילתי** | `work4u-screens-extra.jsx` → `RatingModal.submit()` → `onSubmit` | `setHistory([...])` | `POST /reports` עם timestamp → DynamoDB (`Reports`) |
| **היסטוריית דירוגים** | `work4u-web-extra.jsx` → `WebHistory` | `W4U_HISTORY` | `GET /users/me/reports` ; מחיקה → `DELETE /reports/{id}` |
| **הוספת מתחם (מנהל)** | `work4u-web-extra.jsx` → `WebAdminDialog.publish()` | toast בלבד | העלאת תמונות ל-S3 (Presigned) → `POST /venues` (Lambda + בדיקת קבוצת admin) |
| **התראת Push חכמה** | `work4u-web-app.jsx` → `useEffect` של `push` | timer של 4 שניות | Geofencing + SNS / Web Push; טריגר כשה-GPS מזהה שהות במתחם |

---

## 4. נקודות חיבור קונקרטיות בקוד

כל הקריאות ל-data מרוכזות במקומות מעטים, כך שהמעבר ל-API ממוקד:

1. **`work4u-web-app.jsx`** — ה-`App` מחזיק את כל ה-state (`venues`, `history`, `prefs`, `isAdmin`). החליפו את האתחול מ-`W4U_VENUES`/`W4U_HISTORY` ל-`useEffect` שטוען מה-API:
   ```js
   useEffect(() => { api.listVenues(filters, location).then(setVenues); }, [filters]);
   ```
2. **`submitRating()`** (ב-`App`) — כבר מקבל `{venueId, occ, wifi, noise}`. הוסיפו `await api.postReport(payload)` לפני עדכון ה-state האופטימי.
3. **`setAdminMode`** — במקום toggle ידני, קבעו לפי `(await fetchAuthSession()).tokens.idToken.payload['cognito:groups']`.

> **חשוב:** שכבת ה-UI לא צריכה שינוי — הקומפוננטות מקבלות data דרך props. כל החיווט נכנס ל-`work4u-web-app.jsx` + מודול `work4u-api.js`.

---

## 5. מודל הנתונים המוצע (DynamoDB)

**Venues** — PK: `venueId` · שדות: `name, area, lat, lng, price, wifi, noise, power, hours, seats, tags[], photos[]` (מפתחות S3).
**Reports** — PK: `venueId`, SK: `timestamp` · שדות: `userId, occ, wifi, noise`. GSI על `userId` להיסטוריה אישית.
**Users** — PK: `userId` (sub מ-Cognito) · שדות: `prefs{quiet,power,wifi,seat,price}`.

`occupancy` נוכחי ו-`forecast` מחושבים ב-Lambda מתוך אגרגציה של `Reports` ב-X השעות האחרונות.

---

## 6. אבטחה (חובה)
- כל endpoint ב-API Gateway מאחורי **Cognito Authorizer** (JWT).
- פעולות מנהל (`POST /venues`) בודקות ב-Lambda שה-`cognito:groups` כולל `admin` — לא לסמוך על ה-frontend.
- S3 uploads רק דרך **Presigned URLs** קצרי-מועד; ה-bucket לא ציבורי לכתיבה.
```
