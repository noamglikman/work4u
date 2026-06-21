# Work4U - מדריך התקנה טכני לחשבון AWS נקי

המטרה של מדריך זה היא לאפשר לאיש טכני לקחת את קבצי המקור של Work4U, לפרוס את
המערכת בחשבון AWS נקי, להפעיל אותה, לבדוק אותה, ולתחזק אותה.

המדריך נכתב עבור AWS Learner Lab ו-AWS CloudShell. זו הדרך המומלצת כי היא לא
דורשת התקנת AWS CLI או AWS SAM CLI על המחשב האישי.

## 1. מבנה הפרויקט

```text
backend/                  קוד Lambda בפייתון
frontend/                 אתר React + Vite + TypeScript
infrastructure/           קבצי IaC לפריסת AWS
openapi/                  Swagger/OpenAPI של ה-API
scripts/                  סקריפטים להתקנה, build, seed ואריזה
docs/                     מדריכים וקבצי הסבר
```

השירותים שנוצרים ב-AWS:

- Amazon Cognito - התחברות, הרשמה וקבוצות משתמשים.
- Amazon API Gateway - REST API מאובטח באמצעות Cognito JWT.
- AWS Lambda - פונקציות backend.
- Amazon DynamoDB - שמירת מתחמים, העדפות, דירוגים ופרופיל למידה.
- Amazon S3 - שמירת תמונות מתחמים.

## 2. דרישות מקדימות

בדרך המומלצת מתקינים מתוך AWS CloudShell, ולכן על המחשב האישי צריך רק:

- דפדפן.
- גישה ל-AWS Learner Lab או לחשבון AWS.
- קובץ ה-ZIP של הפרויקט או הרשאת קריאה ל-Repository.

בתוך AWS CloudShell כבר זמינים בדרך כלל הכלים הדרושים:

- AWS CLI v2
- AWS SAM CLI
- Node.js ו-npm
- Python 3
- הרשאות AWS פעילות

בדיקה מהירה בתוך CloudShell:

```bash
aws --version
sam --version
node --version
npm --version
python3 --version
```

הערה: אם איש טכני בוחר להתקין מהמחשב האישי ולא מ-CloudShell, עליו להתקין את
AWS CLI, AWS SAM CLI, Node.js, npm ו-Python בעצמו. זו לא הדרך הראשית במדריך.

## 3. AWS Learner Lab ו-CloudShell

אם משתמשים ב-AWS Learner Lab:

1. פותחים את ה-Lab.
2. לוחצים על Start Lab.
3. מחכים שה-Lab יהיה פעיל.
4. לוחצים על AWS כדי לפתוח את AWS Console.
5. פותחים AWS CloudShell מהסרגל העליון של ה-Console.
6. בודקים שהחיבור עובד:

```bash
aws sts get-caller-identity
```

אם הפקודה מחזירה `Account`, `UserId` ו-`Arn`, החיבור תקין.

בדרך CloudShell אין צורך להעתיק AWS CLI credentials למחשב האישי. CloudShell
נפתח בתוך החשבון הפעיל ומשתמש בהרשאות של הסשן הנוכחי.

מקור רשמי של AWS: תיעוד CloudShell מציין ש-AWS CLI, AWS SAM CLI, Node.js/npm,
Python, Git ו-zip/unzip זמינים כחלק מהתוכנות המותקנות מראש בסביבת CloudShell.

## 4. העברת קבצי הפרויקט ל-CloudShell

יש שתי אפשרויות:

אפשרות מומלצת למסירה: מעלים את קובץ ה-ZIP שהוגש.

1. בתוך CloudShell לוחצים Actions.
2. בוחרים Upload file.
3. מעלים את `Work4U-source-delivery.zip`.
4. מריצים:

```bash
unzip Work4U-source-delivery.zip
cd Work4U-source-delivery
```

אפשרות נוספת: משכפלים את ה-Repository, אם ניתנה הרשאת קריאה:

```bash
git clone https://github.com/noamglikman/work4u.git
cd work4u
```

מכאן והלאה כל הפקודות במדריך מורצות משורש תיקיית הפרויקט.

ב-Learner Lab משתמשים בתבנית:

```text
infrastructure/template.yaml
```

התבנית הזו משתמשת ב-IAM Role בשם `LabRole`, כדי להימנע מיצירת Roles חדשים
שבדרך כלל חסומה בסביבות לימוד.

## 5. מה זה IaC ומה הסקריפטים עושים

IaC הוא קיצור של Infrastructure as Code. במקום ליצור ידנית משאבים במסך של AWS,
הפרויקט כולל קובץ YAML שמגדיר את כל התשתית:

```text
infrastructure/template.yaml
```

AWS SAM ו-CloudFormation קוראים את הקובץ הזה ויוצרים את המשאבים באופן אוטומטי.

CloudShell הוא רק המקום שבו מריצים את הפקודות. IaC הוא הקובץ שמגדיר מה AWS
צריך לבנות. הסקריפטים הם מעטפת נוחה שמריצה את הפקודות לפי הסדר.

הסקריפטים תחת `scripts/` עוטפים את הפקודות הארוכות:

- `deploy-backend.sh` - בונה ופורס את תשתית ה-backend.
- `write-frontend-env.sh` - קורא את ה-Outputs מ-CloudFormation ויוצר `frontend/.env`.
- `seed-data.sh` - מכניס נתוני מתחמים התחלתיים ל-DynamoDB.
- `build-frontend.sh` - מתקין תלויות ובונה את האתר.
- `delete-stack.sh` - מוחק את ה-stack בסיום בדיקה.
- `package-release.sh` - יוצר ZIP נקי למסירה.

## 6. פריסת backend ל-AWS

מריצים מתוך CloudShell, משורש הפרויקט:

```bash
bash scripts/deploy-backend.sh
```

ברירת המחדל:

- Stack name: `work4u`
- Region: `us-east-1`
- Template: `infrastructure/template.yaml`

אפשר לשנות:

```bash
STACK_NAME=work4u-test AWS_REGION=us-east-1 bash scripts/deploy-backend.sh
```

בסיום הפריסה הסקריפט יכתוב קובץ:

```text
docs/aws-outputs.generated.md
```

הקובץ כולל ערכים כמו:

- `ApiBaseUrl`
- `UserPoolId`
- `UserPoolClientId`
- `VenueImagesBucketName`
- שמות טבלאות DynamoDB

## 7. יצירת קובץ סביבת frontend

אחרי שה-backend נפרס:

```bash
bash scripts/write-frontend-env.sh
```

הסקריפט יוצר:

```text
frontend/.env
```

עם ערכים בפורמט:

```bash
VITE_USE_MOCK=false
VITE_API_BASE_URL=https://example.execute-api.us-east-1.amazonaws.com/dev
VITE_AWS_REGION=us-east-1
VITE_COGNITO_USER_POOL_ID=us-east-1_example
VITE_COGNITO_USER_POOL_CLIENT_ID=exampleclientid
VITE_S3_BUCKET=work4u-venue-images-example-us-east-1
```

במצב הזה האתר מפסיק לעבוד מול mock data ומתחבר ל-AWS האמיתי.

## 8. הכנסת נתוני התחלה

כדי שהמערכת לא תעלה ריקה:

```bash
bash scripts/seed-data.sh
```

הסקריפט מריץ את:

```text
scripts/seed_known_workspaces.py
```

ומכניס מתחמי עבודה, ספריות ובתי קפה לטבלת:

```text
Work4U_Venues
```

## 9. בניית האתר

```bash
bash scripts/build-frontend.sh
```

התוצר נמצא כאן:

```text
frontend/dist/
```

אפשר לבדוק בתוך CloudShell בעזרת Vite preview, או להוריד את התוצר למחשב:

```bash
cd frontend
npm run preview
```

## 10. פרסום האתר

הפרויקט מספק build סטטי תחת `frontend/dist/`. אפשר לפרסם אותו באחת מהדרכים:

- AWS Amplify Hosting
- S3 Static Website Hosting
- CloudFront מעל S3
- כל שרת static files אחר

ב-AWS Learner Lab הדרך הפשוטה לבדיקה היא לבנות את האתר ב-CloudShell, ואז לפי
צורך להוריד את `frontend/dist/` או להעלות אותו לשירות אירוח סטטי אם ההרשאות
בחשבון מאפשרות זאת.

אם מפרסמים ב-S3/CloudFront, ודאו שהקובץ `frontend/.env` נוצר לפני `npm run build`,
כי Vite מטמיע את ערכי `VITE_*` בזמן הבנייה.

## 11. יצירת משתמש רגיל ומשתמש מנהל

משתמש רגיל:

1. נכנסים לאתר.
2. נרשמים עם אימייל וסיסמה.
3. ה-PreSignUp Lambda מאשרת משתמשים אוטומטית בתבנית Learner Lab.

משתמש מנהל:

1. יוצרים או נרשמים עם משתמש באתר.
2. מוסיפים אותו לקבוצת Cognito בשם `Admins`:

```bash
aws cognito-idp admin-add-user-to-group \
  --user-pool-id <UserPoolId> \
  --username <email> \
  --group-name Admins \
  --region us-east-1
```

3. מתנתקים ומתחברים מחדש כדי לקבל JWT חדש עם ההרשאה.

## 12. בדיקות אחרי התקנה

בדיקת CloudFormation:

```bash
aws cloudformation describe-stacks \
  --stack-name work4u \
  --region us-east-1
```

בדיקת האתר:

1. לפתוח את האתר.
2. להירשם.
3. להתחבר.
4. לראות רשימת מתחמים.
5. לפתוח מתחם.
6. לשמור העדפות.
7. לשלוח דירוג.
8. להתחבר כמנהל ולבדוק הוספת מתחם.

בדיקת frontend:

```bash
cd frontend
npm run typecheck
npm run smoke
npm run build
```

## 13. תחזוקה

עדכון backend:

```bash
bash scripts/deploy-backend.sh
```

עדכון frontend:

```bash
bash scripts/write-frontend-env.sh
bash scripts/build-frontend.sh
```

הוספת נתונים ידנית:

- דרך ממשק מנהל באתר.
- או דרך סקריפטי seed תחת `scripts/`.

בדיקת לוגים:

```bash
aws logs describe-log-groups --region us-east-1
```

## 14. מחיקה בסיום בדיקה

כדי למחוק את המשאבים שנוצרו:

```bash
bash scripts/delete-stack.sh
```

שימו לב: מחיקת ה-stack מוחקת גם טבלאות DynamoDB ונתונים שנוצרו במהלך הבדיקה.

## 15. תקלות נפוצות

`AccessDenied` בזמן deploy:

- ודאו שה-Learner Lab פעיל.
- ודאו שה-credentials עדכניים.
- ודאו שהתבנית היא `infrastructure/template.yaml`.

`LabRole does not exist`:

- חשבון AWS אינו Learner Lab או שה-Lab לא התחיל.
- בחשבון AWS רגיל נסו להשתמש ב-`infrastructure/template-prod.yaml`.

האתר עדיין עובד על mock:

- בדקו ש-`frontend/.env` קיים.
- בדקו ש-`VITE_USE_MOCK=false`.
- הריצו מחדש `npm run build` אחרי שינוי `.env`.

אין מתחמים באתר:

- הריצו `bash scripts/seed-data.sh`.
- בדקו שהטבלה `Work4U_Venues` קיימת.

כפתורי מנהל לא מופיעים:

- ודאו שהמשתמש נמצא בקבוצת Cognito בשם `Admins`.
- התנתקו והתחברו מחדש.

## 16. קבצי מסירה

לפני מסירה ללקוח:

```bash
bash scripts/package-release.sh
```

התוצר:

```text
dist/Work4U-source-delivery.zip
```

ה-ZIP אינו כולל:

- `.git`
- `.vscode`
- `node_modules`
- `.aws-sam`
- תיקיות build מקומיות
- קבצי `Zone.Identifier`
- קבצי זמניים של Office כגון `~$...`

ה-ZIP כן כולל:

- קוד Lambda
- קוד האתר
- IaC
- Swagger/OpenAPI
- סקריפטים
- מדריכי התקנה
- מדריך משתמש ומדריך מנהל
