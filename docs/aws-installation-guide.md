# Work4U - מדריך התקנה לחשבון AWS נקי

מסמך זה מגדיר את תהליך ההתקנה של Work4U בחשבון AWS נקי. סביבת היעד הראשית
היא AWS Learner Lab באמצעות AWS CloudShell.

## 1. מבנה הפרויקט

```text
backend/                  קוד מקור של AWS Lambda בפייתון
frontend/                 אפליקציית React + Vite + TypeScript
infrastructure/           תבניות AWS SAM/CloudFormation
openapi/                  חוזה OpenAPI של ה-API
scripts/                  סקריפטים לפריסה, בנייה, טעינת נתונים, מחיקה ואריזה
docs/                     תיעוד טכני ותיעוד מסירה
```

## 2. משאבי AWS שנוצרים בפריסה

הפריסה יוצרת את המשאבים הבאים:

- Amazon Cognito User Pool ו-User Pool Client.
- קבוצות Cognito:
  - `Users`
  - `Admins`
- API Gateway REST API עם stage בשם `dev`.
- פונקציות Lambda:
  - `Work4U-AutoConfirmSignUpFunction`
  - `Work4U-PreferencesFunction`
  - `Work4U-VenuesFunction`
  - `Work4U-RatingsFunction`
  - `Work4U-AdminFunction`
  - `Work4U-LearningFunction`
- טבלאות DynamoDB:
  - `Work4U_UserPreferences`
  - `Work4U_Venues`
  - `Work4U_Ratings`
  - `Work4U_UserLearning`
- דלי S3 לתמונות מתחמים:
  - `work4u-venue-images-<account-id>-<region>`

## 3. דרישות מקדימות

יש להריץ את ההתקנה מתוך AWS CloudShell בחשבון היעד.

כלים נדרשים בסביבת ההתקנה:

- AWS CLI
- AWS SAM CLI
- Node.js
- npm
- Python 3
- zip או תמיכת Python zipfile

בדיקת כלים:

```bash
aws --version
sam --version
node --version
npm --version
python3 --version
```

בדיקת חשבון AWS פעיל:

```bash
aws sts get-caller-identity
```

יש להמשיך רק אם הפקודה מחזירה את חשבון ה-AWS שבו רוצים להתקין את המערכת.

## 4. העברת הפרויקט לסביבת ההתקנה

### אפשרות א' - התקנה מקובץ ZIP

יש להעלות את `Work4U-source-delivery.zip` ל-CloudShell ולהריץ:

```bash
unzip Work4U-source-delivery.zip
cd Work4U-source-delivery
```

### אפשרות ב' - התקנה מ-Git

יש להשתמש באפשרות זו רק לאחר שניתנה הרשאת קריאה ל-Repository.

```bash
git clone https://github.com/noamglikman/work4u.git
cd work4u
```

מנקודה זו כל הפקודות מורצות משורש הפרויקט.

## 5. בחירת תבנית פריסה

עבור AWS Learner Lab יש להשתמש בתבנית:

```text
infrastructure/template.yaml
```

תבנית זו משתמשת ב-Role קיים בשם:

```text
LabRole
```

עבור חשבון AWS רגיל ניתן להשתמש בתבנית:

```text
infrastructure/template-prod.yaml
```

פריסה עם התבנית לחשבון AWS רגיל:

```bash
TEMPLATE=infrastructure/template-prod.yaml bash scripts/deploy-backend.sh
```

ערכי ברירת מחדל:

```text
Stack name: work4u
Region:     us-east-1
Template:   infrastructure/template.yaml
```

שינוי שם stack או region:

```bash
STACK_NAME=work4u-test AWS_REGION=us-east-1 bash scripts/deploy-backend.sh
```

## 6. פריסת backend

יש להריץ:

```bash
bash scripts/deploy-backend.sh
```

הסקריפט מבצע:

```text
בדיקת זהות AWS
SAM build
SAM deploy
ייצוא Outputs מ-CloudFormation
```

קובץ פלט שנוצר:

```text
docs/aws-outputs.generated.md
```

הקובץ כולל:

- `ApiBaseUrl`
- `UserPoolId`
- `UserPoolClientId`
- `VenueImagesBucketName`
- שמות טבלאות DynamoDB

## 7. יצירת קובץ סביבה ל-frontend

יש להריץ לאחר סיום פריסת ה-backend:

```bash
bash scripts/write-frontend-env.sh
```

קובץ שנוצר:

```text
frontend/.env
```

מפתחות צפויים:

```bash
VITE_USE_MOCK=false
VITE_API_BASE_URL=<api-gateway-url>
VITE_AWS_REGION=us-east-1
VITE_COGNITO_USER_POOL_ID=<user-pool-id>
VITE_COGNITO_USER_POOL_CLIENT_ID=<user-pool-client-id>
VITE_S3_BUCKET=<venue-images-bucket>
```

יש לבנות את ה-frontend רק לאחר יצירת הקובץ הזה.

## 8. טעינת נתוני התחלה

יש להריץ:

```bash
bash scripts/seed-data.sh
```

הסקריפט מכניס נתוני מתחמים התחלתיים לטבלה:

```text
Work4U_Venues
```

סקריפט המקור:

```text
scripts/seed_known_workspaces.py
```

## 9. בניית frontend

יש להריץ:

```bash
bash scripts/build-frontend.sh
```

הסקריפט מבצע:

```text
npm ci
npm run typecheck
npm run smoke
npm run build
```

תוצר הבנייה:

```text
frontend/dist/
```

## 10. פרסום frontend

תוצר האתר הסטטי נמצא ב:

```text
frontend/dist/
```

יש לפרסם את תוכן התיקייה באחת מאפשרויות האירוח הנתמכות בחשבון היעד:

- AWS Amplify Hosting
- S3 Static Website Hosting
- CloudFront מעל S3
- כל שירות אירוח static files אחר

בפרסום ל-S3 או CloudFront יש להעלות את תוכן `frontend/dist/`, ולא את תיקיית
`frontend/` עצמה.

## 11. יצירת משתמשים

### משתמש רגיל

1. פותחים את האתר שפורסם.
2. נרשמים עם אימייל וסיסמה.
3. מתחברים למערכת.

### משתמש מנהל

1. יוצרים משתמש או נרשמים דרך האתר.
2. מוסיפים את המשתמש לקבוצת Cognito בשם `Admins`:

```bash
aws cognito-idp admin-add-user-to-group \
  --user-pool-id <UserPoolId> \
  --username <email> \
  --group-name Admins \
  --region us-east-1
```

3. מתנתקים מהמערכת.
4. מתחברים מחדש.

## 12. בדיקות לאחר התקנה

### בדיקת CloudFormation

```bash
aws cloudformation describe-stacks \
  --stack-name work4u \
  --region us-east-1
```

תוצאה תקינה:

```text
StackStatus: CREATE_COMPLETE או UPDATE_COMPLETE
```

### בדיקות frontend

```bash
cd frontend
npm run typecheck
npm run smoke
npm run build
```

### בדיקות פונקציונליות

יש לוודא את התרחישים הבאים:

- הרשמת משתמש.
- התחברות משתמש.
- טעינת רשימת מתחמים.
- פתיחת עמוד מתחם.
- שמירת העדפות.
- שליחת דירוג.
- כניסת משתמש מנהל לאזור ניהול.
- יצירת מתחם על ידי מנהל.
- עדכון מתחם על ידי מנהל.
- מחיקת מתחם על ידי מנהל.
- יצירת כתובת העלאת תמונה על ידי מנהל.

## 13. פקודות תחזוקה

### פריסה מחדש של backend

```bash
bash scripts/deploy-backend.sh
```

### יצירה מחדש של קובץ סביבת frontend

```bash
bash scripts/write-frontend-env.sh
```

### בנייה מחדש של frontend

```bash
bash scripts/build-frontend.sh
```

### טעינת נתוני מתחמים מחדש

```bash
bash scripts/seed-data.sh
```

### צפייה בקבוצות לוגים של Lambda

```bash
aws logs describe-log-groups --region us-east-1
```

## 14. מחיקת סביבת בדיקה

יש להריץ רק כאשר סביבת הבדיקה צריכה להימחק.

```bash
bash scripts/delete-stack.sh
```

הפקודה מוחקת את ה-CloudFormation stack ואת המשאבים שמנוהלים על ידו, כולל
טבלאות DynamoDB שנוצרו בפריסה.

## 15. פתרון תקלות

### `AccessDenied` בזמן פריסה

יש לבדוק:

- סשן AWS Learner Lab פעיל.
- CloudShell פתוח מהחשבון הנכון.
- `aws sts get-caller-identity` מחזיר את החשבון הצפוי.
- בפריסת Learner Lab משתמשים ב-`infrastructure/template.yaml`.

### `LabRole does not exist`

יש לבצע אחת מהפעולות הבאות:

- להפעיל את AWS Learner Lab ולפרוס מחדש.
- בחשבון AWS רגיל לפרוס עם `infrastructure/template-prod.yaml`.

### האתר משתמש ב-mock data

יש לבדוק:

- `frontend/.env` קיים.
- `VITE_USE_MOCK=false`.
- `VITE_API_BASE_URL` מכיל את כתובת API Gateway שנפרסה.
- ה-frontend נבנה מחדש לאחר יצירת `frontend/.env`.

### רשימת המתחמים ריקה

יש להריץ:

```bash
bash scripts/seed-data.sh
```

לאחר מכן יש לוודא שקיימות רשומות בטבלת:

```text
Work4U_Venues
```

### פעולות מנהל לא זמינות

יש לבדוק:

- המשתמש קיים ב-Cognito User Pool.
- המשתמש נמצא בקבוצת `Admins`.
- המשתמש התנתק והתחבר מחדש לאחר ההוספה לקבוצה.

## 16. יצירת ZIP למסירה

יש להריץ לפני מסירה:

```bash
bash scripts/package-release.sh
```

תוצר:

```text
dist/Work4U-source-delivery.zip
```

ה-ZIP כולל:

- קוד מקור של Lambda.
- קוד מקור של frontend.
- תבניות תשתית AWS.
- חוזה OpenAPI.
- סקריפטים להתקנה ולתחזוקה.
- תיעוד טכני.
- מדריך משתמש ומדריך מנהל.

ה-ZIP לא כולל:

- `.git`
- `.vscode`
- `.idea`
- `node_modules`
- `.aws-sam`
- `dist`
- `build`
- `.env`
- `.DS_Store`
- `*.Zone.Identifier`
- קבצי Office זמניים התואמים ל-`~$*`

## 17. גישה ל-Repository

Repository:

```text
https://github.com/noamglikman/work4u.git
```

יש לתת לצוות הטכני או לבודק הרשאת קריאה לפני המסירה.
