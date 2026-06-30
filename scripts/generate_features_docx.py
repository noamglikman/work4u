#!/usr/bin/env python3
"""Generate the corrected, complete Features & Use Cases document for Work4U.

Produces a Hebrew RTL Word file (raw OOXML, stdlib only -- no python-docx
required) plus a markdown mirror, both from the same FEATURES source of truth.

The content is validated against the actual implementation (backend Lambdas,
frontend screens, infrastructure/template-prod.yaml) and covers ALL features
of the product per assignment section 05 -- not only the original proposal.
"""
from __future__ import annotations

import html
import textwrap
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
DOCX_PATH = DOCS / "Work4U_Features_and_Use_Cases.docx"
MD_PATH = DOCS / "features-and-use-cases.md"


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def clean(value: str) -> str:
    return textwrap.dedent(value).strip()


# --------------------------------------------------------------------------- #
# OOXML helpers (RTL Hebrew), ported from scripts/generate_admin_guide_docx.py
# --------------------------------------------------------------------------- #
def r(text: str, bold: bool = False) -> str:
    bold_xml = "<w:b/>" if bold else ""
    return (
        f"<w:r><w:rPr><w:rtl/>{bold_xml}</w:rPr>"
        f'<w:t xml:space="preserve">{esc(text)}</w:t></w:r>'
    )


def p(
    text: str = "",
    style: str | None = None,
    *,
    bold: bool = False,
    align: str = "right",
    spacing_after: int = 140,
    page_break: bool = False,
) -> str:
    style_xml = f'<w:pStyle w:val="{style}"/>' if style else ""
    break_xml = '<w:r><w:br w:type="page"/></w:r>' if page_break else ""
    return clean(f"""
    <w:p>
      <w:pPr>
        {style_xml}
        <w:bidi/>
        <w:jc w:val="{align}"/>
        <w:spacing w:after="{spacing_after}"/>
      </w:pPr>
      {break_xml}
      {r(text, bold=bold) if text else ""}
    </w:p>
    """)


def kv_line(label: str, value: str, spacing_after: int = 220) -> str:
    """A single paragraph with a bold label run followed by a normal value run."""
    return clean(f"""
    <w:p>
      <w:pPr><w:bidi/><w:jc w:val="right"/><w:spacing w:after="{spacing_after}"/></w:pPr>
      {r(label, bold=True)}{r(value)}
    </w:p>
    """)


def step(n: int, text: str) -> str:
    """A numbered scenario step (manual numbering so each feature restarts at 1)."""
    return clean(f"""
    <w:p>
      <w:pPr><w:bidi/><w:jc w:val="right"/><w:spacing w:after="60"/><w:ind w:right="360"/></w:pPr>
      {r(f"{n}. {text}")}
    </w:p>
    """)


def heading(text: str, level: int = 1) -> str:
    return p(text, style=f"Heading{level}", bold=True, spacing_after=120)


def page_break() -> str:
    return p(page_break=True, spacing_after=0)


# --------------------------------------------------------------------------- #
# Content -- single source of truth for both the DOCX and the markdown mirror
# --------------------------------------------------------------------------- #
INTRO = [
    "מסמך זה מרכז את הרשימה המלאה והמעודכנת של כלל ה-Features (תרחישי שימוש) של מערכת Work4U, "
    "ומתאר עבור כל אחד מהם מה קורה בפועל. הרשימה אומתה מול המימוש האמיתי (פונקציות Lambda בצד השרת, "
    "מסכי ה-Frontend ותבנית התשתית infrastructure/template-prod.yaml) ולכן היא משקפת את המוצר כפי שמומש.",
    "בהתאם לדרישת סעיף 05, הרשימה כוללת את כל הפיצ'רים של הפרויקט ולא רק את אלה שהופיעו בהצעה (סעיף 01). "
    "כל Feature ממוספר, ולצד כל אחד מצוין 'מימוש בקוד' שממפה אותו לקבצים ולנקודות הקצה (Endpoints) הרלוונטיים.",
]

PROPOSAL_FEATURES = [
    {
        "num": "01",
        "title": "הזדהות, הרשמה וניהול הרשאות",
        "desc": [
            "משתמש חדש נדרש ליצור חשבון כדי לגשת למערכת, תוך הפרדה בין משתמש רגיל למנהל מערכת. "
            "האימות מתבצע מול Amazon Cognito, ותפקיד המשתמש נקבע לפי קבוצת ההרשאה שלו.",
        ],
        "steps": [
            "המשתמש מזין כתובת אימייל וסיסמה במסך ההרשמה, או מתחבר אם הוא כבר רשום.",
            "המערכת שולחת בקשת אימות לשירות ניהול המשתמשים Amazon Cognito (User Pool).",
            "בהרשמה, טריגר PreSignUp (AutoConfirmSignUp) מאשר את החשבון אוטומטית בסביבת ההדגמה.",
            "לאחר אימות הנתונים, Cognito מנפיק אסימון אבטחה (JWT) שנשמר בלקוח ומצורף לכל בקשה עתידית.",
            "תפקיד המשתמש (Users או Admins) נקבע מקבוצות ה-Cognito המשוקפות ב-claims של ה-JWT.",
            "המשתמש מועבר למסך הבית. למנהל מתווספים בסרגל העליון כפתורי ניהול נוספים (הוספת מתחם, ניהול מקומות).",
        ],
        "impl": "backend/lambdas/auth_triggers/app.py · Cognito (template-prod.yaml) · frontend AuthContext.tsx, Login.tsx, Signup.tsx.",
    },
    {
        "num": "02",
        "title": "פרופיל והעדפות עבודה מותאמות אישית",
        "desc": [
            "לכל משתמש פרופיל הכולל העדפות עבודה: סביבה שקטה, צורך בשקעי חשמל, אינטרנט מהיר, סוג ישיבה מועדף וטווח מחירים. "
            "המערכת משתמשת במידע זה כדי להתאים ולדרג תוצאות באופן אוטומטי בכל חיפוש.",
            "הערת דיוק: איתותי ההתאמה שמשתתפים בפועל בחישוב הציון בשרת הם מחיר, איכות Wi-Fi, סביבה שקטה ושקעים. "
            "סוג הישיבה נשמר בפרופיל ומוצג למשתמש, אך כרגע אינו משתתף בחישוב ההתאמה בצד השרת.",
        ],
        "steps": [
            "המשתמש נכנס לאזור 'העדפות עבודה' ומסמן את הדרישות וההעדפות שלו.",
            "הנתונים נשלחים בבקשת POST /preferences דרך API Gateway אל פונקציית Lambda.",
            "המערכת שומרת את ההעדפות ב-Amazon DynamoDB (טבלת Work4U_UserPreferences) תחת רשומת המשתמש.",
            "בכל חיפוש עתידי, ה-Frontend מזריק את ההעדפות כפרמטרים, ופונקציית Venues משתמשת בהן כאיתותי דירוג (match score).",
            "התוצאות ממוינות כך שמתחמים התואמים את ההעדפות מקבלים ציון גבוה יותר ומופיעים ראשונים.",
        ],
        "impl": "backend/lambdas/preferences/app.py · calculate_match_score ב-venues/app.py · frontend Preferences.tsx, usePreferences.ts.",
    },
    {
        "num": "03",
        "title": "חיפוש והתאמת מתחמים מבוססת מיקום",
        "desc": [
            "המשתמש מחפש מקום עבודה קרוב המותאם לצרכיו, תוך שימוש במנגנון ההתאמה החכם ובסינון לפי רדיוס ממיקומו.",
        ],
        "steps": [
            "האפליקציה מבקשת הרשאת מיקום (GPS) ושולחת את הקואורדינטות ל-API. כשל או דחיית הרשאה אינם חוסמים — נעשית נפילה למיקום ברירת מחדל.",
            "פונקציית Venues מסננת את המתחמים לפי רדיוס חיפוש (radiusKm) סביב מיקום המשתמש, בעזרת חישוב מרחק Haversine.",
            "הפונקציה שולפת מ-DynamoDB את כל מתחמי העבודה הפעילים (isActive) שברדיוס.",
            "המערכת מצליבה את נתוני המתחמים עם פרופיל ההעדפות (Feature 02) ועם פרופיל הלמידה (Feature 07) לחישוב ציון התאמה.",
            "מוחזרת רשימה ממוינת לפי ציון התאמה ומרחק, והמתחמים מוצגים למשתמש במפה אינטראקטיבית וברשימה.",
        ],
        "impl": "backend/lambdas/venues/app.py (get_all_venues, apply_filters_and_rank, haversine_km) · frontend Home.tsx, MapCanvas.tsx, useGeolocation.ts, useVenues.ts.",
    },
    {
        "num": "04",
        "title": "פרופיל מתחם עבודה",
        "desc": [
            "כל מתחם כולל מידע רלוונטי לעבודה מרחוק: איכות Wi-Fi, זמינות שקעים, רמת רעש, שעות פעילות, מחירים, תגיות מאפיינים "
            "וגרף תחזית עומס לפי שעה. המידע מוצג בצורה ברורה כדי שהמשתמש יבין מראש אם המקום מתאים לצרכיו.",
            "הערת דיוק: 'איכות Wi-Fi' היא ערך קטגורי (נמוך / בינוני / גבוה) ולא מהירות נמדדת, ו'שקעים' הוא חיווי זמינות "
            "(hasPowerOutlets) ולא ספירת שקעים בפועל.",
        ],
        "steps": [
            "המשתמש לוחץ על מתחם שהוצג בתוצאות החיפוש (במפה או ברשימה).",
            "נשלחת בקשת GET /venues/{venueId} למשיכת כלל המידע על המתחם, כולל תמונות מ-Amazon S3.",
            "מוצג מסך פרופיל מתחם הכולל: דירוג כולל, תגית עומס נוכחי, איכות Wi-Fi, זמינות שקעים, רמת רעש, שעות פעילות ומחירים.",
            "הנתונים מוצגים בפורמט ויזואלי ברור (כולל גלריית תמונות וגרף תחזית) המאפשר קבלת החלטה מושכלת טרם ההגעה.",
        ],
        "impl": "backend/lambdas/venues/app.py (get_venue_by_id) · Amazon S3 · frontend Venue.tsx, ForecastGraph.tsx.",
    },
    {
        "num": "05",
        "title": "מערכת דירוגים וחיווי קהילתי בזמן אמת",
        "desc": [
            "המשתמשים מדרגים מתחמים ומדווחים בזמן אמת על עומס נוכחי, איכות אינטרנט ורמת רעש. כל דיווח נשמר עם חותמת זמן "
            "ותאריך, ממוצע הדירוג של המתחם מחושב מחדש, והמידע המעודכן זמין מיד לכלל משתמשי הפלטפורמה. (תצוגת תחזית העומס לפי שעה מתוארת ב-Feature 06.)",
            "הערת דיוק: רמת העומס (crowdLevel) נאספת ונשמרת בכל דיווח, אך כרגע אינה מצטברת אוטומטית לחיווי העומס המוצג; "
            "ממוצע הדירוג הציבורי מחושב מדירוגי ה-Wi-Fi והרעש.",
        ],
        "steps": [
            "המשתמש פותח את פרופיל המתחם ולוחץ 'דרג' (או נכנס לדירוג דרך באנר ההתראה החכמה שמופיע במסך הבית).",
            "בחלון הדירוג הוא בוחר רמת עומס (פנוי / סביר / עמוס מאוד) ומדרג את איכות ה-Wi-Fi ואת רמת השקט (1–5).",
            "הנתונים נשלחים בבקשת POST /ratings יחד עם חותמת זמן (createdAt) ותאריך (ratingDate).",
            "המערכת שומרת את הדירוג ב-DynamoDB (טבלת Work4U_Ratings) ומחשבת מחדש את averageRating ו-ratingCount של המתחם.",
            "הדירוג המעודכן זמין מיד לכל הצופים במתחם. נאכף כלל: דירוג אחד למתחם ליום לכל משתמש.",
        ],
        "impl": "backend/lambdas/ratings/app.py (submit_rating, recalculate_venue_rating) · frontend RatingModal.tsx, PushCard.tsx.",
    },
    {
        "num": "06",
        "title": "תצוגת תחזית עומסים",
        "desc": [
            "במסך פרופיל המתחם מוצג גרף תחזית עומס לפי שעות היום, שנועד לעזור למשתמש להעריך את העומס הצפוי לפני הגעתו.",
            "מצב נוכחי: התחזית מוצגת מתוך שדה forecast השמור על רשומת המתחם; אם אין שדה כזה, השרת מחזיר תחזית ברירת מחדל "
            "(09:00 פנוי, 12:00 סביר, 18:00 עמוס). ניתוח אלגוריתמי של הדירוגים הקהילתיים לפי יום ושעה (Feature 05) לבניית "
            "תחזית דינמית הוא הרחבה מתוכננת ואינו ממומש בשלב זה.",
        ],
        "steps": [
            "המשתמש נכנס למסך פרופיל המתחם (כחלק מ-Feature 04).",
            "השרת מצרף לרשומת המתחם את שדה forecast, או תחזית ברירת מחדל אם השדה חסר.",
            "ה-Frontend מצייר גרף/חיווי ויזואלי של רמת העומס הצפויה לפי שעה.",
            "(הרחבה עתידית) אלגוריתם ינתח את דיווחי העבר לפי יום ושעה ויחליף את ברירת המחדל בתחזית מבוססת נתונים.",
        ],
        "impl": "backend/lambdas/venues/app.py (get_venue_by_id, build_default_forecast) · frontend ForecastGraph.tsx.",
    },
    {
        "num": "07",
        "title": "המלצות חכמות ממנוע למידה",
        "desc": [
            "המערכת מציעה למשתמש מתחמים המותאמים לטעמו, על בסיס היסטוריית השימוש שלו: חיפושים, פתיחת מתחמים ודירוגים. "
            "מנוע הלמידה צובר ניקוד העדפה לכל קטגוריית מקום ומשתפר עם הצטברות הנתונים.",
            "הערת דיוק: המנגנון הוא ניקוד היוריסטי של זיקה לקטגוריות (categoryScores), ולא מודל למידת מכונה.",
        ],
        "steps": [
            "פעולות המשתמש (search / open_venue / rating) נשלחות בבקשת POST /learning/event.",
            "פונקציית Learning מעדכנת פרופיל ניקוד קטגוריות ומונחי חיפוש בטבלת Work4U_UserLearning.",
            "בכל טעינת מתחמים, פונקציית Venues קוראת את פרופיל הלמידה ומוסיפה learningScore לציון ההתאמה.",
            "רשימת 'מומלצים עבורך' מוצגת בראש סרגל הצד במסך הבית, ממוינת לפי ההתאמה.",
            "הבחירות החדשות של המשתמש מזינות חזרה את הניקוד, כך שההמלצות מתחדדות לאורך זמן.",
        ],
        "impl": "backend/lambdas/learning/app.py · calculate_learning_score ב-venues/app.py · UserLearning table (template-prod.yaml).",
    },
]

ADDED_FEATURES = [
    {
        "num": "08",
        "title": "ניהול מתחמים (מנהל): הוספה, עריכה ומחיקה רכה",
        "desc": [
            "למנהל ממשק לניהול קטלוג המתחמים: הוספת מתחם חדש, עריכת פרטים תפעוליים, ומחיקה רכה. הפעולות נגישות רק לקבוצת Admins.",
        ],
        "steps": [
            "המנהל לוחץ 'הוספת מתחם' או 'ניהול מקומות' בסרגל העליון (מוצגים רק למנהל).",
            "הוספה: מילוי טופס עם שדות חובה (שם, כתובת, שעות פעילות) ופרטים נוספים, ושליחת POST /admin/venues.",
            "עריכה: עדכון שעות, מחיר, איכות Wi-Fi, רעש, שקעים, תיאור, פרטי קשר ותמונות בבקשת PUT /admin/venues/{venueId} (שם, כתובת ומיקום נעולים לעריכה).",
            "מחיקה רכה: DELETE /admin/venues/{venueId} מסמן isActive=false ומסיר את המתחם מתצוגת המשתמשים בלי מחיקה פיזית.",
            "הרשאת המנהל נאכפת בצד השרת לפי claims של Cognito, ולא רק באמצעות הסתרת כפתורים בלקוח.",
        ],
        "impl": "backend/lambdas/admin/app.py (create_venue, update_venue, disable_venue) · frontend AdminDialog.tsx, AdminVenuesDialog.tsx.",
    },
    {
        "num": "09",
        "title": "העלאת תמונות מתחם ל-S3 דרך Presigned URL",
        "desc": [
            "העלאת תמונות מתחם מתבצעת ישירות מהדפדפן אל Amazon S3 באמצעות URL חתום קצר-מועד, בלי שהבייטים עוברים דרך Lambda.",
        ],
        "steps": [
            "המנהל בוחר תמונות בטופס הוספת/עריכת מתחם.",
            "הלקוח מבקש POST /admin/venues/{venueId}/images/upload-url.",
            "פונקציית Admin מייצרת presigned PUT URL בתוקף קצר (כ-15 דקות) ומחזירה אותו יחד עם ה-URL הציבורי העתידי של התמונה.",
            "הדפדפן מעלה את בייטי התמונה ישירות ל-S3 באמצעות ה-URL החתום.",
            "ה-URL הציבורי נשמר על רשומת המתחם ומוצג בגלריה.",
        ],
        "impl": "backend/lambdas/admin/app.py (generate_upload_url) · Amazon S3 · frontend api/live.ts.",
    },
    {
        "num": "10",
        "title": "מועדפים (Favorites)",
        "desc": [
            "המשתמש יכול לסמן מתחמים כמועדפים (אייקון לב) לגישה מהירה. המועדפים נשמרים בפרופיל המשתמש.",
        ],
        "steps": [
            "בכרטיס המתחם, המשתמש לוחץ על אייקון הלב כדי להוסיף או להסיר מהמועדפים.",
            "רשימת favoriteVenueIds מתעדכנת ונשמרת עם פרופיל המשתמש ב-DynamoDB.",
            "מספר המועדפים מוצג כסטטיסטיקה במסך הפרופיל האישי (Feature 13).",
        ],
        "impl": "frontend VenueListCard.tsx, types/api.ts (favoriteVenueIds) · נשמר עם UserPreferences.",
    },
    {
        "num": "11",
        "title": "היסטוריית דירוגים וניהולם",
        "desc": [
            "מסך 'הדירוגים שלי' מציג את כל הדיווחים שהמשתמש שלח, עם אפשרות מחיקה. עדכון דירוג קיים נתמך ב-API (עריכה מה-UI היא הרחבה עתידית).",
        ],
        "steps": [
            "המשתמש נכנס ל'הדירוגים שלי' מהסרגל העליון.",
            "נטענת רשימת הדירוגים בבקשת GET /ratings/my (שאילתה יעילה דרך ה-GSI userId-index).",
            "לכל פריט מוצגים: שם המתחם, תאריך, רמת עומס, דירוג Wi-Fi /5 ורעש /5, וכפתור מחיקה.",
            "מחיקה: DELETE /ratings/{ratingId} (מותרת לבעל הדירוג; מנהל יכול למחוק כל דירוג), ומפעילה חישוב מחדש של ממוצע המתחם.",
            "עדכון דירוג נתמך בצד השרת בבקשת PUT /ratings/{ratingId}.",
        ],
        "impl": "backend/lambdas/ratings/app.py (get_my_ratings, delete_rating, update_rating) · frontend History.tsx, useRatings.ts.",
    },
    {
        "num": "12",
        "title": "שחזור ואיפוס סיסמה",
        "desc": [
            "תהליך דו-שלבי לאיפוס סיסמה מול Amazon Cognito, נגיש מקישור 'שכחתי סיסמה' במסך ההתחברות.",
        ],
        "steps": [
            "במסך ההתחברות, המשתמש לוחץ 'שכחתי סיסמה'.",
            "שלב 1: הזנת כתובת אימייל ושליחת קוד איפוס (Cognito forgotPassword).",
            "שלב 2: הזנת הקוד שהתקבל יחד עם סיסמה חדשה ואישורה (confirmForgotPassword).",
            "בהצלחה, המשתמש מוחזר למסך ההתחברות עם הסיסמה החדשה.",
        ],
        "impl": "frontend ForgotDialog.tsx, api/auth.ts · Amazon Cognito.",
    },
    {
        "num": "13",
        "title": "פרופיל אישי, סטטיסטיקות והתנתקות",
        "desc": [
            "מסך פרופיל אישי המציג את פרטי החשבון, תג מנהל לבעלי הרשאה, סטטיסטיקות שימוש, קיצורים להגדרות ויציאה מהמערכת.",
        ],
        "steps": [
            "המשתמש נכנס לפרופיל מאייקון האווטאר בסרגל העליון.",
            "מוצגים שם, אימייל, תג 'מנהל' לבעלי הרשאה, וסטטיסטיקות (דיווחים, מועדפים).",
            "שורות פעולה: 'העדפות עבודה' (מעבר לעריכת Feature 02), 'התראות חכמות' ו'אודות Work4U'.",
            "כפתור 'התנתקות' מבצע signOut מול Cognito ומחזיר את המשתמש למסך ההתחברות.",
        ],
        "impl": "frontend Profile.tsx, AuthContext.tsx.",
    },
    {
        "num": "14",
        "title": "ניווט למתחם וטיפול במיקום",
        "desc": [
            "פתיחת ניווט חיצוני למתחם, וטיפול חיני (non-blocking) בהרשאת המיקום של הדפדפן.",
        ],
        "steps": [
            "במסך פרופיל המתחם, כפתור 'פתח בניווט' פותח את Google Maps עם יעד לקואורדינטות המתחם.",
            "אם הרשאת ה-GPS נדחית או אינה זמינה (או אין HTTPS), המערכת אינה נחסמת ונופלת למיקום ברירת מחדל.",
            "המשתמש יכול לבחור 'אזור חיפוש' ידני כתחליף ל-GPS.",
        ],
        "impl": "frontend Venue.tsx (navigate), useGeolocation.ts, Home.tsx (בורר אזור חיפוש), lib/searchLocations.ts.",
    },
    {
        "num": "15",
        "title": "התאמת ממשק (ערכת נושא)",
        "desc": [
            "פאנל הגדרות מראה המאפשר למשתמש להתאים אישית את ערכת הנושא, צבע ההדגשה והגופן של הממשק.",
        ],
        "steps": [
            "המשתמש פותח את פאנל המראה הצף.",
            "בוחר ערכת נושא, צבע הדגשה וגופן.",
            "ThemeContext מעדכן את משתני ה-CSS הגלובליים והממשק מתעדכן מיידית.",
        ],
        "impl": "frontend AppearanceSettings.tsx, ThemeContext.tsx, lib/theme.ts.",
    },
]

CLOSING = [
    "הערה לדרישת סעיף 05: לצד תיעוד המיפוי במסמך זה ('מימוש בקוד'), מומלץ להוסיף בראש קבצי הקוד המרכזיים הערה "
    "המציינת איזה Feature הקוד מממש, לדוגמה: # Feature 08 - ניהול מתחמים (מנהל). כך מתקיים החיבור הדו-כיווני "
    "בין תרחיש השימוש לבין הקוד שמממש אותו.",
]


def feature_block(feature: dict) -> list[str]:
    parts: list[str] = []
    parts.append(heading(f'Feature {feature["num"]}  {feature["title"]}', 2))
    for paragraph in feature["desc"]:
        parts.append(p(paragraph, spacing_after=120))
    parts.append(p("מה קורה בפועל:", bold=True, spacing_after=80))
    for index, text in enumerate(feature["steps"], start=1):
        parts.append(step(index, text))
    parts.append(kv_line("מימוש בקוד: ", feature["impl"]))
    return parts


def document_body() -> str:
    parts: list[str] = []
    parts.append(p("Work4U", style="Title", bold=True, align="center", spacing_after=60))
    parts.append(p("Features & Use Cases — פיצ'רים ותרחישי שימוש", style="Subtitle", bold=True, align="center", spacing_after=80))
    parts.append(p("רשימה מלאה ומעודכנת, מאומתת מול המימוש בפועל", align="center", spacing_after=320))

    parts.append(heading("על המסמך", 1))
    for paragraph in INTRO:
        parts.append(p(paragraph))

    parts.append(heading("פיצ'רים מתיאור הפרויקט (הצעה — סעיף 01)", 1))
    for feature in PROPOSAL_FEATURES:
        parts.extend(feature_block(feature))

    parts.append(page_break())
    parts.append(heading("פיצ'רים נוספים שמומשו במערכת", 1))
    parts.append(p(
        "הפיצ'רים הבאים אינם מופיעים בתיאור ההצעה המקורי אך מומשו בפועל במוצר, "
        "ולכן הם נכללים ברשימה בהתאם לדרישה שהיא תכלול את כל ה-Features.",
    ))
    for feature in ADDED_FEATURES:
        parts.extend(feature_block(feature))

    parts.append(heading("הערת סיכום", 1))
    for paragraph in CLOSING:
        parts.append(p(paragraph))

    return "\n".join(parts)


# --------------------------------------------------------------------------- #
# Markdown mirror
# --------------------------------------------------------------------------- #
def markdown_text() -> str:
    lines: list[str] = []
    lines.append("# Work4U — Features & Use Cases (פיצ'רים ותרחישי שימוש)")
    lines.append("")
    lines.append("> רשימה מלאה ומעודכנת, מאומתת מול המימוש בפועל. גרסת Word: docs/Work4U_Features_and_Use_Cases.docx")
    lines.append("")
    lines.append("## על המסמך")
    lines.append("")
    for paragraph in INTRO:
        lines.append(paragraph)
        lines.append("")

    def emit(title: str, features: list[dict]) -> None:
        lines.append(f"## {title}")
        lines.append("")
        for feature in features:
            lines.append(f'### Feature {feature["num"]} — {feature["title"]}')
            lines.append("")
            for paragraph in feature["desc"]:
                lines.append(paragraph)
                lines.append("")
            lines.append("**מה קורה בפועל:**")
            lines.append("")
            for index, text in enumerate(feature["steps"], start=1):
                lines.append(f"{index}. {text}")
            lines.append("")
            lines.append(f'**מימוש בקוד:** {feature["impl"]}')
            lines.append("")

    emit("פיצ'רים מתיאור הפרויקט (הצעה — סעיף 01)", PROPOSAL_FEATURES)
    lines.append("פיצ'רים נוספים שמומשו במערכת (מעבר להצעה המקורית):")
    lines.append("")
    emit("פיצ'רים נוספים שמומשו במערכת", ADDED_FEATURES)

    lines.append("## הערת סיכום")
    lines.append("")
    for paragraph in CLOSING:
        lines.append(paragraph)
        lines.append("")

    return "\n".join(lines).strip() + "\n"


# --------------------------------------------------------------------------- #
# Packaging (text-only docx)
# --------------------------------------------------------------------------- #
def styles_xml() -> str:
    return clean("""
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
      <w:docDefaults>
        <w:rPrDefault>
          <w:rPr>
            <w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>
            <w:sz w:val="24"/>
            <w:szCs w:val="24"/>
            <w:rtl/>
          </w:rPr>
        </w:rPrDefault>
        <w:pPrDefault>
          <w:pPr><w:bidi/><w:jc w:val="right"/></w:pPr>
        </w:pPrDefault>
      </w:docDefaults>
      <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
        <w:name w:val="Normal"/>
        <w:qFormat/>
        <w:pPr><w:bidi/><w:jc w:val="right"/></w:pPr>
        <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="24"/><w:szCs w:val="24"/><w:rtl/></w:rPr>
      </w:style>
      <w:style w:type="paragraph" w:styleId="Title">
        <w:name w:val="Title"/>
        <w:qFormat/>
        <w:pPr><w:bidi/><w:jc w:val="center"/></w:pPr>
        <w:rPr><w:b/><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="52"/><w:szCs w:val="52"/><w:color w:val="2F7D68"/><w:rtl/></w:rPr>
      </w:style>
      <w:style w:type="paragraph" w:styleId="Subtitle">
        <w:name w:val="Subtitle"/>
        <w:qFormat/>
        <w:pPr><w:bidi/><w:jc w:val="center"/></w:pPr>
        <w:rPr><w:b/><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="32"/><w:szCs w:val="32"/><w:rtl/></w:rPr>
      </w:style>
      <w:style w:type="paragraph" w:styleId="Heading1">
        <w:name w:val="heading 1"/>
        <w:basedOn w:val="Normal"/>
        <w:next w:val="Normal"/>
        <w:qFormat/>
        <w:pPr><w:bidi/><w:jc w:val="right"/><w:spacing w:before="260" w:after="160"/></w:pPr>
        <w:rPr><w:b/><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="34"/><w:szCs w:val="34"/><w:color w:val="2F7D68"/><w:rtl/></w:rPr>
      </w:style>
      <w:style w:type="paragraph" w:styleId="Heading2">
        <w:name w:val="heading 2"/>
        <w:basedOn w:val="Normal"/>
        <w:next w:val="Normal"/>
        <w:qFormat/>
        <w:pPr><w:bidi/><w:jc w:val="right"/><w:spacing w:before="200" w:after="100"/></w:pPr>
        <w:rPr><w:b/><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="28"/><w:szCs w:val="28"/><w:color w:val="2D2926"/><w:rtl/></w:rPr>
      </w:style>
    </w:styles>
    """)


def content_types_xml() -> str:
    return clean("""
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
      <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
      <Default Extension="xml" ContentType="application/xml"/>
      <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
      <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
      <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
      <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
      <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
    </Types>
    """)


def document_xml(body: str) -> str:
    return clean(f"""
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w:document
      xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
      xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
      xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
      xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
      mc:Ignorable="w14">
      <w:body>
        {body}
        <w:sectPr>
          <w:bidi/>
          <w:pgSz w:w="11906" w:h="16838"/>
          <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/>
          <w:cols w:space="708"/>
          <w:docGrid w:linePitch="360"/>
        </w:sectPr>
      </w:body>
    </w:document>
    """)


def make_docx() -> None:
    DOCS.mkdir(parents=True, exist_ok=True)
    MD_PATH.write_text(markdown_text(), encoding="utf-8")
    body = document_body()

    with zipfile.ZipFile(DOCX_PATH, "w", compression=zipfile.ZIP_DEFLATED) as docx:
        docx.writestr("[Content_Types].xml", content_types_xml())
        docx.writestr(
            "_rels/.rels",
            clean("""
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
              <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
              <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
              <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
            </Relationships>
            """),
        )
        docx.writestr(
            "docProps/core.xml",
            clean("""
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
              <dc:title>Work4U - Features and Use Cases</dc:title>
              <dc:creator>Work4U</dc:creator>
              <cp:lastModifiedBy>Work4U</cp:lastModifiedBy>
              <dcterms:created xsi:type="dcterms:W3CDTF">2026-06-30T00:00:00Z</dcterms:created>
              <dcterms:modified xsi:type="dcterms:W3CDTF">2026-06-30T00:00:00Z</dcterms:modified>
            </cp:coreProperties>
            """),
        )
        docx.writestr(
            "docProps/app.xml",
            clean("""
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">
              <Application>Work4U</Application>
            </Properties>
            """),
        )
        docx.writestr(
            "word/_rels/document.xml.rels",
            clean("""
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
              <Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
              <Relationship Id="rIdSettings" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
            </Relationships>
            """),
        )
        docx.writestr("word/document.xml", document_xml(body))
        docx.writestr("word/styles.xml", styles_xml())
        docx.writestr(
            "word/settings.xml",
            clean("""
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
              <w:defaultTabStop w:val="708"/>
            </w:settings>
            """),
        )


def main() -> None:
    make_docx()
    print(DOCX_PATH)
    print(MD_PATH)


if __name__ == "__main__":
    main()
