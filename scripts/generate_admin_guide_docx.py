#!/usr/bin/env python3
from __future__ import annotations

import html
import textwrap
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
ASSETS = DOCS / "manual-assets"
DOCX_PATH = DOCS / "Work4U_מדריך_מנהל.docx"
MD_PATH = DOCS / "Work4U_מדריך_מנהל.md"


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def clean(value: str) -> str:
    return textwrap.dedent(value).strip()


SVG_STYLE = """
  .bg { fill:#F7F0E6; }
  .panel { fill:#FFFFFF; stroke:#E2D5C6; stroke-width:2; }
  .soft { fill:#EFE4D5; }
  .accent { fill:#2F7D68; }
  .accentSoft { fill:#DCEFE8; }
  .danger { fill:#F6DDDD; }
  .text { fill:#2D2926; font-family: Arial, sans-serif; font-size:28px; font-weight:700; }
  .muted { fill:#736A60; font-family: Arial, sans-serif; font-size:21px; font-weight:600; }
  .small { fill:#736A60; font-family: Arial, sans-serif; font-size:17px; font-weight:600; }
  .white { fill:#FFFFFF; font-family: Arial, sans-serif; font-size:22px; font-weight:800; }
  .label { fill:#2F7D68; font-family: Arial, sans-serif; font-size:17px; font-weight:800; }
  .line { stroke:#CDBEAC; stroke-width:3; fill:none; }
"""


def svg_shell(title: str, body: str, width: int = 1100, height: int = 620) -> str:
    return clean(f"""
    <svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" direction="rtl">
      <defs>
        <style>{SVG_STYLE}</style>
      </defs>
      <rect class="bg" x="0" y="0" width="{width}" height="{height}" rx="28"/>
      <text class="label" x="{width - 42}" y="46" text-anchor="end">{esc(title)}</text>
      {body}
    </svg>
    """)


def write_svg_assets() -> list[dict[str, str]]:
    ASSETS.mkdir(parents=True, exist_ok=True)
    images = [
        {
            "file": "01-admin-login.svg",
            "title": "תמונת מסך לדוגמה 1: כניסה כמנהל",
            "caption": "מסך הכניסה: במצב mock בוחרים 'מנהל'. בסביבת production הרשאת מנהל נקבעת לפי קבוצת Cognito.",
            "svg": svg_shell(
                "כניסה כמנהל",
                """
                <rect class="panel" x="90" y="90" width="430" height="445" rx="26"/>
                <text class="text" x="470" y="145" text-anchor="end">ברוכים השבים</text>
                <text class="small" x="470" y="180" text-anchor="end">התחברו כדי לנהל מקומות עבודה</text>
                <rect class="soft" x="135" y="220" width="330" height="54" rx="12"/>
                <text class="muted" x="440" y="255" text-anchor="end">כתובת אימייל</text>
                <rect class="soft" x="135" y="295" width="330" height="54" rx="12"/>
                <text class="muted" x="440" y="330" text-anchor="end">סיסמה</text>
                <rect class="soft" x="135" y="375" width="330" height="56" rx="28"/>
                <rect class="panel" x="145" y="382" width="150" height="42" rx="21"/>
                <text class="muted" x="220" y="410" text-anchor="middle">מנהל</text>
                <text class="small" x="385" y="410" text-anchor="middle">משתמש</text>
                <rect class="accent" x="135" y="455" width="330" height="56" rx="16"/>
                <text class="white" x="300" y="492" text-anchor="middle">התחברות</text>
                <path class="line" d="M610 210h350M610 285h350M610 360h350"/>
                <text class="text" x="960" y="200" text-anchor="end">1. מזינים פרטי התחברות</text>
                <text class="text" x="960" y="275" text-anchor="end">2. בוחרים מצב מנהל</text>
                <text class="text" x="960" y="350" text-anchor="end">3. לוחצים התחברות</text>
                """,
            ),
        },
        {
            "file": "02-admin-header.svg",
            "title": "תמונת מסך לדוגמה 2: סרגל עליון למנהל",
            "caption": "לאחר התחברות כמנהל מופיעים בסרגל העליון כפתורי 'הוספת מתחם' ו'ניהול מקומות'. למשתמש שאינו מנהל הם מוסתרים.",
            "svg": svg_shell(
                "סרגל עליון למנהל",
                """
                <rect class="panel" x="70" y="105" width="960" height="84" rx="20"/>
                <rect class="accent" x="920" y="126" width="44" height="44" rx="13"/>
                <text class="text" x="890" y="158" text-anchor="end">Work4U</text>
                <rect class="accentSoft" x="690" y="124" width="92" height="48" rx="24"/>
                <text class="label" x="736" y="154" text-anchor="middle">מפה</text>
                <text class="muted" x="600" y="154" text-anchor="middle">הדירוגים שלי</text>
                <rect class="accentSoft" x="230" y="124" width="140" height="48" rx="24"/>
                <text class="label" x="300" y="154" text-anchor="middle">הוספת מתחם</text>
                <rect class="soft" x="80" y="124" width="135" height="48" rx="24"/>
                <text class="muted" x="148" y="154" text-anchor="middle">ניהול מקומות</text>
                <circle class="accent" cx="55" cy="148" r="24"/>
                <text class="white" x="55" y="157" text-anchor="middle">A</text>
                <path class="line" d="M300 190v90M148 190v90"/>
                <text class="text" x="520" y="320" text-anchor="middle">כפתורי הניהול זמינים רק כאשר המשתמש מזוהה כמנהל</text>
                <rect class="accent" x="378" y="360" width="294" height="52" rx="16"/>
                <text class="white" x="525" y="394" text-anchor="middle">פתיחת פעולות מנהל</text>
                """,
            ),
        },
        {
            "file": "03-add-venue.svg",
            "title": "תמונת מסך לדוגמה 3: הוספת מתחם חדש",
            "caption": "חלון הוספת מתחם: ממלאים שדות חובה, פרטי קשר, מחיר ותמונות, ואז מפרסמים את המתחם במערכת.",
            "svg": svg_shell(
                "הוספת מתחם חדש",
                """
                <rect class="panel" x="160" y="80" width="780" height="490" rx="26"/>
                <text class="label" x="880" y="135" text-anchor="end">פאנל מנהל</text>
                <text class="text" x="880" y="175" text-anchor="end">הוספת מתחם חדש</text>
                <rect class="soft" x="220" y="215" width="660" height="52" rx="12"/>
                <text class="muted" x="850" y="249" text-anchor="end">שם המתחם *</text>
                <rect class="soft" x="220" y="285" width="660" height="52" rx="12"/>
                <text class="muted" x="850" y="319" text-anchor="end">כתובת *</text>
                <rect class="soft" x="560" y="355" width="320" height="52" rx="12"/>
                <text class="muted" x="850" y="389" text-anchor="end">שעות פעילות *</text>
                <rect class="soft" x="220" y="355" width="320" height="52" rx="12"/>
                <text class="muted" x="510" y="389" text-anchor="end">אתר</text>
                <rect class="accentSoft" x="620" y="430" width="80" height="48" rx="14"/>
                <text class="label" x="660" y="461" text-anchor="middle">₪</text>
                <rect class="soft" x="520" y="430" width="80" height="48" rx="14"/>
                <text class="muted" x="560" y="461" text-anchor="middle">₪₪</text>
                <rect class="soft" x="420" y="430" width="80" height="48" rx="14"/>
                <text class="muted" x="460" y="461" text-anchor="middle">₪₪₪</text>
                <rect class="soft" x="220" y="430" width="170" height="48" rx="14"/>
                <text class="muted" x="305" y="461" text-anchor="middle">תמונות</text>
                <rect class="accent" x="220" y="505" width="230" height="44" rx="14"/>
                <text class="white" x="335" y="535" text-anchor="middle">פרסם מתחם</text>
                """,
            ),
        },
        {
            "file": "04-manage-venues.svg",
            "title": "תמונת מסך לדוגמה 4: ניהול מקומות במערכת",
            "caption": "חלון ניהול מקומות: מחפשים מקום, מרעננים את הרשימה, עורכים פרטים משתנים או מבצעים מחיקה רכה.",
            "svg": svg_shell(
                "ניהול מקומות במערכת",
                """
                <rect class="panel" x="90" y="82" width="920" height="500" rx="26"/>
                <text class="label" x="950" y="132" text-anchor="end">פאנל מנהל</text>
                <text class="text" x="950" y="170" text-anchor="end">ניהול מקומות במערכת</text>
                <rect class="soft" x="260" y="210" width="680" height="50" rx="14"/>
                <text class="muted" x="910" y="242" text-anchor="end">חיפוש לפי שם, כתובת או סוג מקום...</text>
                <rect class="accentSoft" x="120" y="210" width="120" height="50" rx="14"/>
                <text class="label" x="180" y="242" text-anchor="middle">רענון</text>
                <text class="small" x="940" y="295" text-anchor="end">12 מקומות מוצגים מתוך 12</text>
                <g>
                  <rect class="soft" x="120" y="320" width="820" height="72" rx="16"/>
                  <circle class="accentSoft" cx="895" cy="356" r="28"/>
                  <text class="text" x="850" y="350" text-anchor="end">מרחב סלון</text>
                  <text class="small" x="850" y="375" text-anchor="end">רחוב, מספר, עיר</text>
                  <rect class="accentSoft" x="270" y="334" width="88" height="44" rx="14"/>
                  <text class="label" x="314" y="362" text-anchor="middle">ערוך</text>
                  <rect class="danger" x="170" y="334" width="82" height="44" rx="14"/>
                  <text class="muted" x="211" y="362" text-anchor="middle">מחק</text>
                </g>
                <g>
                  <rect class="soft" x="120" y="410" width="820" height="72" rx="16"/>
                  <circle class="accentSoft" cx="895" cy="446" r="28"/>
                  <text class="text" x="850" y="440" text-anchor="end">קפה עבודה</text>
                  <text class="small" x="850" y="465" text-anchor="end">כתובת לדוגמה</text>
                  <rect class="accentSoft" x="270" y="424" width="88" height="44" rx="14"/>
                  <text class="label" x="314" y="452" text-anchor="middle">ערוך</text>
                  <rect class="danger" x="170" y="424" width="82" height="44" rx="14"/>
                  <text class="muted" x="211" y="452" text-anchor="middle">מחק</text>
                </g>
                """,
            ),
        },
        {
            "file": "05-edit-venue.svg",
            "title": "תמונת מסך לדוגמה 5: עריכת פרטים משתנים",
            "caption": "בעריכה ניתן לשנות פרטים תפעוליים בלבד: שעות, מחיר, Wi-Fi, רעש, שקעים, תיאור, קשר ותמונות.",
            "svg": svg_shell(
                "עריכת פרטים משתנים",
                """
                <rect class="panel" x="165" y="70" width="770" height="510" rx="26"/>
                <text class="label" x="880" y="120" text-anchor="end">עריכת פרטים משתנים</text>
                <text class="text" x="880" y="158" text-anchor="end">מרחב סלון</text>
                <text class="small" x="880" y="188" text-anchor="end">שם, כתובת ומיקום אינם ניתנים לעריכה במסך זה</text>
                <rect class="soft" x="220" y="225" width="660" height="52" rx="12"/>
                <text class="muted" x="850" y="259" text-anchor="end">שעות פעילות</text>
                <rect class="accentSoft" x="700" y="305" width="180" height="48" rx="14"/>
                <text class="label" x="790" y="336" text-anchor="middle">מחיר</text>
                <rect class="accentSoft" x="500" y="305" width="180" height="48" rx="14"/>
                <text class="label" x="590" y="336" text-anchor="middle">Wi-Fi</text>
                <rect class="accentSoft" x="300" y="305" width="180" height="48" rx="14"/>
                <text class="label" x="390" y="336" text-anchor="middle">רעש</text>
                <rect class="soft" x="220" y="380" width="660" height="52" rx="12"/>
                <text class="muted" x="850" y="414" text-anchor="end">תיאור קצר למשתמש</text>
                <rect class="soft" x="220" y="455" width="660" height="52" rx="12"/>
                <text class="muted" x="850" y="489" text-anchor="end">הוספת תמונות למקום</text>
                <rect class="accent" x="220" y="525" width="210" height="44" rx="14"/>
                <text class="white" x="325" y="555" text-anchor="middle">שמור שינויים</text>
                """,
            ),
        },
        {
            "file": "06-admin-flow.svg",
            "title": "שרטוט 1: זרימת עבודת מנהל",
            "caption": "זרימת עבודה מומלצת: כניסה כמנהל, בחירת פעולה, בדיקה לאחר פרסום ושמירת שינוי.",
            "svg": svg_shell(
                "זרימת עבודת מנהל",
                """
                <rect class="panel" x="760" y="135" width="230" height="86" rx="20"/>
                <text class="text" x="875" y="187" text-anchor="middle">כניסה כמנהל</text>
                <path class="line" d="M760 178H635"/>
                <rect class="panel" x="405" y="135" width="230" height="86" rx="20"/>
                <text class="text" x="520" y="187" text-anchor="middle">בחירת פעולה</text>
                <path class="line" d="M405 178H280"/>
                <rect class="panel" x="50" y="135" width="230" height="86" rx="20"/>
                <text class="text" x="165" y="187" text-anchor="middle">הוספה / עריכה</text>
                <path class="line" d="M165 222v85"/>
                <rect class="panel" x="50" y="310" width="230" height="86" rx="20"/>
                <text class="text" x="165" y="362" text-anchor="middle">שמירת שינוי</text>
                <path class="line" d="M280 353h125"/>
                <rect class="panel" x="405" y="310" width="230" height="86" rx="20"/>
                <text class="text" x="520" y="362" text-anchor="middle">בדיקה ברשימה</text>
                <path class="line" d="M635 353h125"/>
                <rect class="panel" x="760" y="310" width="230" height="86" rx="20"/>
                <text class="text" x="875" y="362" text-anchor="middle">סיום / תיקון</text>
                """,
            ),
        },
    ]

    for image in images:
        (ASSETS / image["file"]).write_text(image["svg"], encoding="utf-8")

    return images


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


def bullet(text: str) -> str:
    return clean(f"""
    <w:p>
      <w:pPr>
        <w:pStyle w:val="ListParagraph"/>
        <w:bidi/>
        <w:jc w:val="right"/>
        <w:numPr>
          <w:ilvl w:val="0"/>
          <w:numId w:val="1"/>
        </w:numPr>
        <w:spacing w:after="80"/>
      </w:pPr>
      {r(text)}
    </w:p>
    """)


def heading(text: str, level: int = 1) -> str:
    return p(text, style=f"Heading{level}", bold=True, spacing_after=120)


def page_break() -> str:
    return p(page_break=True, spacing_after=0)


def table(rows: list[list[str]], widths: list[int] | None = None) -> str:
    if widths is None:
        widths = [4200 for _ in rows[0]]
    grid = "".join(f'<w:gridCol w:w="{w}"/>' for w in widths)
    trs = []
    for row_index, row in enumerate(rows):
        cells = []
        for cell_index, cell in enumerate(row):
            shade = '<w:shd w:fill="DCEFE8"/>' if row_index == 0 else ""
            cells.append(clean(f"""
            <w:tc>
              <w:tcPr>
                <w:tcW w:w="{widths[cell_index]}" w:type="dxa"/>
                <w:textDirection w:val="tbRl"/>
                {shade}
              </w:tcPr>
              {p(cell, bold=(row_index == 0), spacing_after=40)}
            </w:tc>
            """))
        trs.append(f"<w:tr>{''.join(cells)}</w:tr>")
    return clean(f"""
    <w:tbl>
      <w:tblPr>
        <w:bidiVisual/>
        <w:tblW w:w="0" w:type="auto"/>
        <w:tblBorders>
          <w:top w:val="single" w:sz="6" w:color="CDBEAC"/>
          <w:left w:val="single" w:sz="6" w:color="CDBEAC"/>
          <w:bottom w:val="single" w:sz="6" w:color="CDBEAC"/>
          <w:right w:val="single" w:sz="6" w:color="CDBEAC"/>
          <w:insideH w:val="single" w:sz="4" w:color="E2D5C6"/>
          <w:insideV w:val="single" w:sz="4" w:color="E2D5C6"/>
        </w:tblBorders>
      </w:tblPr>
      <w:tblGrid>{grid}</w:tblGrid>
      {''.join(trs)}
    </w:tbl>
    """)


def image_block(rel_id: str, caption: str, docpr_id: int, cx: int = 5_700_000, cy: int = 3_210_000) -> str:
    drawing = clean(f"""
    <w:p>
      <w:pPr><w:bidi/><w:jc w:val="center"/><w:spacing w:after="80"/></w:pPr>
      <w:r>
        <w:drawing>
          <wp:inline distT="0" distB="0" distL="0" distR="0">
            <wp:extent cx="{cx}" cy="{cy}"/>
            <wp:effectExtent l="0" t="0" r="0" b="0"/>
            <wp:docPr id="{docpr_id}" name="Work4U illustration {docpr_id}"/>
            <wp:cNvGraphicFramePr>
              <a:graphicFrameLocks noChangeAspect="1"/>
            </wp:cNvGraphicFramePr>
            <a:graphic>
              <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                <pic:pic>
                  <pic:nvPicPr>
                    <pic:cNvPr id="{docpr_id}" name="screenshot-{docpr_id}.svg"/>
                    <pic:cNvPicPr/>
                  </pic:nvPicPr>
                  <pic:blipFill>
                    <a:blip r:embed="{rel_id}"/>
                    <a:stretch><a:fillRect/></a:stretch>
                  </pic:blipFill>
                  <pic:spPr>
                    <a:xfrm>
                      <a:off x="0" y="0"/>
                      <a:ext cx="{cx}" cy="{cy}"/>
                    </a:xfrm>
                    <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
                  </pic:spPr>
                </pic:pic>
              </a:graphicData>
            </a:graphic>
          </wp:inline>
        </w:drawing>
      </w:r>
    </w:p>
    """)
    return drawing + p(caption, style="Caption", align="center", spacing_after=200)


def document_body(images: list[dict[str, str]]) -> tuple[str, str]:
    rels = []
    image_xml = {}
    for index, image in enumerate(images, start=1):
        rel_id = f"rId{index}"
        rels.append(
            f'<Relationship Id="{rel_id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/{image["file"]}"/>'
        )
        image_xml[image["file"]] = image_block(rel_id, f'{image["title"]} - {image["caption"]}', index)

    parts: list[str] = []
    parts.append(p("Work4U", style="Title", bold=True, align="center", spacing_after=80))
    parts.append(p("חוברת הדרכה למנהל המערכת", style="Subtitle", bold=True, align="center", spacing_after=80))
    parts.append(p("סעיפים 07-08: מדריך משתמש ותיעוד מנהל מערכת", align="center", spacing_after=80))
    parts.append(p("גרסה: 1.0 | תאריך: 15.06.2026", align="center", spacing_after=360))
    parts.append(p("המסמך נכתב עבור תפקיד מנהל המערכת בלבד, לפי הדרישה שהחלק המוצג באפליקציה יהיה מסך ותפקוד המנהל. משתמש רגיל אינו מקבל פרק נפרד במסמך זה.", align="center", spacing_after=260))

    parts.append(heading("מטרת המסמך", 1))
    parts.append(p("חוברת זו מרכזת הוראות שימוש מפורטות למנהל מערכת Work4U. היא כוללת הסברים, שרטוטי זרימה ותמונות מסך לדוגמה, כך שמנהל חדש יוכל להפעיל את יכולות הניהול בלי היכרות מוקדמת עם הקוד."))
    parts.append(bullet("סעיף 07 מציג מדריך משתמש מעשי עבור מנהל המשתמש באפליקציה."))
    parts.append(bullet("סעיף 08 מציג חוברת מנהל מערכת נפרדת מבחינת תוכן: הרשאות, תחזוקה, אבטחה ותפעול שוטף."))
    parts.append(bullet("בסביבת הפיתוח ניתן להתחבר כמנהל בעזרת בחירת 'מנהל' במסך הכניסה. בסביבת אמת הרשאת מנהל מגיעה מקבוצת Cognito."))

    parts.append(heading("קהל יעד והרשאות", 1))
    parts.append(table([
        ["נושא", "הנחיה"],
        ["קהל יעד", "מנהל מערכת האחראי על הוספה, עדכון והסרה של מקומות עבודה במערכת Work4U."],
        ["הרשאת גישה", "המשתמש חייב להיות מזוהה כמנהל. בצד השרת נבדקת קבוצת Cognito בשם Admins, Admin או ADMIN."],
        ["תצוגה באפליקציה", "כפתורי הוספת מתחם וניהול מקומות מוצגים רק למנהל. משתמש רגיל לא אמור לראות פעולות ניהול."],
        ["אחריות", "המנהל אחראי להזין מידע נכון, לבדוק שהמקום מופיע ברשימה, ולהימנע ממחיקת מקומות פעילים בטעות."],
    ], [2600, 6500]))

    parts.append(page_break())
    parts.append(heading("07. מדריך משתמש למנהל", 1))
    parts.append(heading("כניסה למערכת כמנהל", 2))
    parts.append(p("פתח את אפליקציית Work4U בדפדפן. במסך הכניסה הזן כתובת אימייל וסיסמה. בסביבת mock בחר באפשרות 'מנהל' לפני הלחיצה על 'התחברות'. בסביבת production אין צורך בבחירה ידנית: אם המשתמש שייך לקבוצת מנהלים, האפליקציה תזהה זאת לאחר ההתחברות."))
    parts.append(image_xml["01-admin-login.svg"])

    parts.append(heading("זיהוי שהתחברת כמנהל", 2))
    parts.append(p("לאחר כניסה מוצלחת מוצג מסך הבית. בסרגל העליון צריכים להופיע שני כפתורי ניהול: 'הוספת מתחם' ו'ניהול מקומות'. אם הכפתורים לא מופיעים, המשתמש אינו מזוהה כמנהל או שההרשאה לא נטענה."))
    parts.append(image_xml["02-admin-header.svg"])

    parts.append(heading("הוספת מתחם חדש", 2))
    parts.append(p("השתמש בפעולה זו כאשר רוצים להוסיף למערכת מקום עבודה חדש, כמו בית קפה, חלל עבודה או מתחם לימוד. לחץ על 'הוספת מתחם' בסרגל העליון. ייפתח חלון שבו ממלאים את פרטי המקום."))
    parts.append(table([
        ["שדה", "חובה", "מה להזין"],
        ["שם המתחם", "כן", "שם ברור כפי שיוצג למשתמשים, לדוגמה: מרחב סלון."],
        ["כתובת", "כן", "רחוב, מספר ועיר. מומלץ להזין כתובת מלאה כדי שהמשתמש יבין היכן המקום."],
        ["שעות פעילות", "כן", "טווח שעות קריא, לדוגמה: 08:00-22:00."],
        ["אתר / טלפון / אימייל", "לא", "פרטי קשר לבדיקת זמינות, הזמנה או תנאי כניסה."],
        ["הערת כניסה / תשלום", "לא", "הבהרות למשתמשים, לדוגמה: כניסה בתשלום או מומלץ להזמין מראש."],
        ["מחירון", "כן", "בחר נמוך, בינוני או גבוה לפי רמת המחיר היחסית."],
        ["תמונות", "לא", "ניתן לבחור עד ארבע תמונות בעת הוספה. התמונות יועלו ל-S3 בסביבת אמת."],
    ], [2200, 1200, 5700]))
    parts.append(image_xml["03-add-venue.svg"])
    parts.append(heading("פרסום המתחם", 2))
    parts.append(bullet("ודא ששדות החובה מלאים: שם, כתובת ושעות פעילות."))
    parts.append(bullet("לחץ על 'פרסם מתחם במערכת'."))
    parts.append(bullet("אם ההוספה הצליחה, החלון נסגר ומוצגת הודעת הצלחה."))
    parts.append(bullet("אם חסר שדה חובה או שיש תקלה בשרת, תוצג הודעת שגיאה בראש החלון."))

    parts.append(heading("ניהול מקומות קיימים", 2))
    parts.append(p("לחץ על 'ניהול מקומות' בסרגל העליון. החלון מציג את רשימת המקומות הפעילים, תיבת חיפוש, כפתור רענון, וספירה של המקומות המוצגים מתוך כלל המקומות שנטענו."))
    parts.append(image_xml["04-manage-venues.svg"])
    parts.append(bullet("כדי למצוא מקום, הקלד שם, כתובת או סוג מקום בשדה החיפוש."))
    parts.append(bullet("כדי לטעון מחדש את הרשימה מהשרת, לחץ על 'רענון'."))
    parts.append(bullet("כדי לשנות מידע תפעולי, לחץ על 'ערוך'."))
    parts.append(bullet("כדי להסיר מקום מתצוגת המשתמשים, לחץ על 'מחק' ואשר את ההודעה."))

    parts.append(heading("עריכת פרטים משתנים", 2))
    parts.append(p("במסך העריכה ניתן לעדכן נתונים שמשתנים לאורך זמן: שעות פעילות, מחיר, איכות Wi-Fi, רמת רעש, זמינות שקעים, תיאור, פרטי קשר, הערת כניסה ותמונות. שם המקום, הכתובת, המיקום וסוג המקום אינם ניתנים לעריכה במסך זה כדי לשמור על עקביות הנתונים."))
    parts.append(image_xml["05-edit-venue.svg"])
    parts.append(bullet("לחץ על 'ערוך' ליד המקום הרצוי."))
    parts.append(bullet("עדכן את השדות הרלוונטיים בלבד. אין חובה לשנות את כל השדות."))
    parts.append(bullet("אם מוסיפים תמונות, הן מתווספות לתמונות הקיימות עד מגבלה של שמונה תמונות למקום."))
    parts.append(bullet("לחץ על 'שמור שינויים'. לאחר שמירה מוצלחת הרשימה נטענת מחדש ומוצגת הודעת הצלחה."))

    parts.append(heading("מחיקה רכה של מקום", 2))
    parts.append(p("מחיקה במערכת היא מחיקה רכה: המקום מסומן כלא פעיל ואינו מוצג למשתמשים, אך הרשומה נשארת ב-DynamoDB לצורכי תחזוקה, בדיקה ושחזור ידני במקרה הצורך. לפני מחיקה ודא שהמקום אכן לא אמור להופיע באפליקציה."))
    parts.append(bullet("לחץ על 'מחק' ליד המקום."))
    parts.append(bullet("קרא את הודעת האישור שמופיעה בדפדפן."))
    parts.append(bullet("אם אתה בטוח, אשר. אם אינך בטוח, בטל את הפעולה."))

    parts.append(heading("תרשים זרימת עבודה", 2))
    parts.append(image_xml["06-admin-flow.svg"])

    parts.append(page_break())
    parts.append(heading("08. חוברת הדרכה למנהל המערכת", 1))
    parts.append(heading("תפקיד מנהל המערכת", 2))
    parts.append(p("מנהל המערכת אחראי על איכות מאגר המקומות ועל תקינות פעולות הניהול. מעבר לשימוש במסכים, עליו להבין כיצד ההרשאות נאכפות, היכן נשמרים הנתונים, ומהן פעולות התחזוקה השוטפות הנדרשות."))
    parts.append(table([
        ["תחום", "אחריות מנהל"],
        ["הרשאות", "לוודא שרק משתמשים מורשים נמצאים בקבוצת המנהלים ב-Cognito."],
        ["נתונים", "לשמור על שמות, כתובות, שעות ופרטי קשר מדויקים ועדכניים."],
        ["תמונות", "להעלות תמונות תקינות ורלוונטיות בלבד, ללא מידע רגיש או הפרת זכויות."],
        ["תקלות", "לזהות הודעות שגיאה, לבדוק הרשאות ולפנות לצוות הפיתוח במקרה של כשל חוזר."],
    ], [2600, 6500]))

    parts.append(heading("מבנה טכני של פעולות מנהל", 2))
    parts.append(bullet("האפליקציה כתובה ב-React + Vite ופועלת בעברית ובכיוון RTL."))
    parts.append(bullet("פעולות המנהל עוברות דרך API Gateway אל Lambda בשם admin."))
    parts.append(bullet("הרשאות מנהל נבדקות בצד השרת באמצעות claims של Cognito, ולא רק באמצעות הסתרת כפתורים בצד הלקוח."))
    parts.append(bullet("נתוני המקומות נשמרים ב-DynamoDB בטבלה Work4U_Venues או בשם המוגדר במשתנה הסביבה VENUES_TABLE."))
    parts.append(bullet("תמונות נשמרות ב-S3 בדלי המוגדר במשתנה IMAGES_BUCKET. למסד הנתונים נשמרים קישורי התמונות."))

    parts.append(heading("ניהול הרשאות מנהלים", 2))
    parts.append(p("בסביבת production, אין להסתמך על בחירה ידנית במסך הכניסה. יש להגדיר את המשתמש בקבוצת Cognito מתאימה. הקוד מזהה את הקבוצות Admins, Admin או ADMIN. מומלץ להשתמש בשם אחיד אחד, למשל Admins, ולתעד כל הוספה או הסרה של מנהל."))
    parts.append(bullet("בעת הוספת מנהל חדש: צור או אתר את המשתמש ב-Cognito User Pool, הוסף אותו לקבוצת Admins, ובקש ממנו להתחבר מחדש."))
    parts.append(bullet("בעת הסרת מנהל: הסר את המשתמש מקבוצת Admins ובקש ממנו לצאת ולהיכנס מחדש כדי שה-token יתעדכן."))
    parts.append(bullet("בדיקה מומלצת: משתמש רגיל לא רואה כפתורי ניהול, ומשתמש מנהל כן רואה אותם."))

    parts.append(heading("פעולות API רלוונטיות למנהל", 2))
    parts.append(table([
        ["פעולה", "נתיב", "תיאור"],
        ["יצירת מקום", "POST /admin/venues", "יוצר רשומת מקום חדשה ומחזיר מזהה מקום."],
        ["עדכון מקום", "PUT /admin/venues/{venueId}", "מעדכן שדות תפעוליים בלבד."],
        ["מחיקת מקום", "DELETE /admin/venues/{venueId}", "מסמן isActive=false ואינו מוחק פיזית את הרשומה."],
        ["העלאת תמונה", "POST /admin/venues/{venueId}/images/upload-url", "יוצר URL חתום ל-15 דקות להעלאה ישירה ל-S3."],
    ], [2100, 3000, 4000]))

    parts.append(heading("תחזוקה שוטפת", 2))
    parts.append(bullet("פעם בשבוע בדוק שמקומות מרכזיים עדיין פעילים וששעות הפעילות נכונות."))
    parts.append(bullet("בדוק מקומות ללא תמונה או עם פרטי קשר חסרים, והשלם במידת האפשר."))
    parts.append(bullet("בדוק שמקומות שנמחקו רכה אינם מופיעים ברשימת המשתמשים."))
    parts.append(bullet("לאחר עדכון משמעותי, פתח את מסך הבית וחפש את המקום כדי לוודא שהשינוי מוצג למשתמשים."))

    parts.append(heading("תקלות נפוצות ופתרון", 2))
    parts.append(table([
        ["בעיה", "סיבה אפשרית", "פתרון"],
        ["כפתורי מנהל לא מופיעים", "המשתמש לא מזוהה כמנהל או שה-token ישן", "בדוק קבוצת Cognito, צא והיכנס מחדש."],
        ["שגיאת Forbidden / 403", "אין הרשאת מנהל בצד השרת", "הוסף את המשתמש לקבוצת Admins או בדוק את claims ב-Cognito."],
        ["לא ניתן לפרסם מתחם", "חסרים שדות חובה", "מלא שם, כתובת ושעות פעילות."],
        ["תמונה לא עולה", "קובץ אינו תמונה, URL חתום פג, או תקלה ב-S3", "בחר קובץ image/*, נסה שוב ובדוק הגדרות IMAGES_BUCKET."],
        ["מקום לא מופיע לאחר שמירה", "רשימה לא נטענה מחדש או שהמקום סומן לא פעיל", "לחץ רענון ובדוק את ערך isActive ב-DynamoDB."],
    ], [2500, 3000, 3600]))

    parts.append(heading("כללי אבטחה ושימוש נכון", 2))
    parts.append(bullet("אין לתת הרשאת מנהל למשתמש שאינו צריך לבצע פעולות תחזוקה."))
    parts.append(bullet("אין להעלות תמונות עם פרטים אישיים, לוחיות רישוי, מסמכים או מידע רגיש."))
    parts.append(bullet("אין לשנות פרטי מקום על סמך מידע לא מאומת. מומלץ לבדוק באתר המקום או מול בעל המקום."))
    parts.append(bullet("לפני מחיקה, ודא שהמקום אינו פעיל או שאינו מתאים יותר למערכת."))
    parts.append(bullet("יש לתעד שינויים משמעותיים במאגר המקומות לפי נהלי הפרויקט."))

    parts.append(heading("נספח: שדות נתוני מקום", 1))
    parts.append(table([
        ["שדה", "משמעות"],
        ["name", "שם המקום כפי שמוצג באפליקציה."],
        ["address", "כתובת המקום."],
        ["openingHours", "שעות פעילות טקסטואליות."],
        ["priceRange", "low, medium או high."],
        ["wifiQuality", "low, medium או high."],
        ["noiseLevel", "low, medium או high."],
        ["hasPowerOutlets", "האם ידוע שיש שקעים זמינים."],
        ["description", "תיאור קצר למשתמש."],
        ["imageUrls / mainImageUrl", "קישורי תמונות שנשמרו אחרי העלאה ל-S3."],
        ["accessNote", "הערת כניסה, תשלום או זמינות."],
        ["website / phone / email", "פרטי קשר."],
        ["isActive", "האם המקום מוצג למשתמשים. מחיקה רכה משנה ערך זה ל-false."],
    ], [2600, 6500]))

    parts.append(heading("סיום", 1))
    parts.append(p("בסיום ההדרכה מנהל המערכת אמור לדעת להתחבר כמנהל, להוסיף מתחם, לנהל מקומות קיימים, לערוך פרטים משתנים, לבצע מחיקה רכה, ולהבין כיצד ההרשאות והנתונים מנוהלים מאחורי הקלעים."))

    body = "\n".join(parts)
    rels_xml = "\n".join(rels)
    return body, rels_xml


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
        <w:rPr><w:b/><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="34"/><w:szCs w:val="34"/><w:rtl/></w:rPr>
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
        <w:pPr><w:bidi/><w:jc w:val="right"/><w:spacing w:before="180" w:after="100"/></w:pPr>
        <w:rPr><w:b/><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="28"/><w:szCs w:val="28"/><w:rtl/></w:rPr>
      </w:style>
      <w:style w:type="paragraph" w:styleId="ListParagraph">
        <w:name w:val="List Paragraph"/>
        <w:basedOn w:val="Normal"/>
        <w:pPr><w:bidi/><w:jc w:val="right"/><w:ind w:right="360"/></w:pPr>
        <w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="24"/><w:szCs w:val="24"/><w:rtl/></w:rPr>
      </w:style>
      <w:style w:type="paragraph" w:styleId="Caption">
        <w:name w:val="Caption"/>
        <w:basedOn w:val="Normal"/>
        <w:pPr><w:bidi/><w:jc w:val="center"/></w:pPr>
        <w:rPr><w:i/><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="20"/><w:szCs w:val="20"/><w:color w:val="736A60"/><w:rtl/></w:rPr>
      </w:style>
    </w:styles>
    """)


def content_types_xml(images: list[dict[str, str]]) -> str:
    return clean("""
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
      <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
      <Default Extension="xml" ContentType="application/xml"/>
      <Default Extension="svg" ContentType="image/svg+xml"/>
      <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
      <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
      <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
      <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
      <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
      <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
    </Types>
    """)


def numbering_xml() -> str:
    return clean("""
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
      <w:abstractNum w:abstractNumId="0">
        <w:multiLevelType w:val="hybridMultilevel"/>
        <w:lvl w:ilvl="0">
          <w:start w:val="1"/>
          <w:numFmt w:val="bullet"/>
          <w:lvlText w:val="•"/>
          <w:lvlJc w:val="right"/>
          <w:pPr>
            <w:bidi/>
            <w:ind w:right="720" w:hanging="360"/>
          </w:pPr>
          <w:rPr>
            <w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial" w:hint="cs"/>
            <w:rtl/>
          </w:rPr>
        </w:lvl>
      </w:abstractNum>
      <w:num w:numId="1">
        <w:abstractNumId w:val="0"/>
      </w:num>
    </w:numbering>
    """)


def document_xml(body: str) -> str:
    return clean(f"""
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w:document
      xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
      xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
      xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
      xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
      xmlns:w10="urn:schemas-microsoft-com:office:word"
      xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
      xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
      xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
      xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk"
      xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"
      xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
      xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
      xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"
      mc:Ignorable="w14 wp14">
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


def markdown_text() -> str:
    return clean("""
    # Work4U - מדריך למנהל מערכת

    מדריך שימוש למנהלים

    ברוכים הבאים ל-Work4U. מדריך זה מיועד למנהל מערכת המשתמש באפליקציה.
    המדריך נכתב בסגנון מדריך המשתמש הקיים, אך בלי טבלאות ובלי צילומי מסך.

    ## מה מנהל יכול לעשות באפליקציה?

    • להתחבר כמנהל.
    • לבדוק בקצרה איך מקום מוצג למשתמשים.
    • להוסיף מתחם חדש.
    • לנהל מקומות קיימים.
    • לערוך פרטי מקום.
    • להוסיף תמונות.
    • להסיר מקום מתצוגת המשתמשים.

    המסמך המלא נמצא בקובץ Word שנוצר מאותו מקור:
    docs/Work4U_מדריך_מנהל.docx
    """)


def document_body_text_only() -> str:
    parts: list[str] = []

    parts.append(p("Work4U - מדריך למנהל מערכת", style="Title", bold=True, align="center", spacing_after=80))
    parts.append(p("מדריך שימוש למנהלים", style="Subtitle", bold=True, align="center", spacing_after=80))
    parts.append(p("גרסה: 1.0 | תאריך: 15.06.2026", align="center", spacing_after=360))

    parts.append(p("ברוכים הבאים ל-Work4U, אפליקציה למציאת מקום עבודה מתאים מחוץ לבית או למשרד. מדריך זה מיועד למנהל מערכת המשתמש באפליקציה כדי לנהל את מאגר המקומות שמוצג למשתמשים."))
    parts.append(p("קיים מדריך משתמש נפרד שמסביר את פעולות המשתמש הרגיל. לכן מדריך זה מתמקד בפעולות המנהל. פעולות כמו חיפוש מקום, פתיחת פרופיל מקום או שימוש במסננים יוזכרו כאן רק כאשר הן עוזרות למנהל לבדוק שהשינוי שביצע מוצג נכון באפליקציה."))
    parts.append(p("המדריך נכתב בסגנון מדריך המשתמש הקיים: הסברים קצרים, פרקים ממוספרים וצעדי פעולה ברורים. אין במסמך טבלאות ואין בו צילומי מסך."))

    parts.append(heading("מה אפשר לעשות כמנהל באפליקציה?", 1))
    parts.append(p("באמצעות Work4U מנהל מערכת יכול:"))
    parts.append(bullet("להתחבר לאפליקציה כמשתמש מנהל."))
    parts.append(bullet("לזהות שכפתורי הניהול מופיעים בסרגל העליון."))
    parts.append(bullet("להוסיף מתחם חדש לאפליקציה."))
    parts.append(bullet("לפתוח מסך ניהול מקומות."))
    parts.append(bullet("לחפש מקום קיים בתוך רשימת הניהול."))
    parts.append(bullet("לערוך פרטים משתנים של מקום."))
    parts.append(bullet("להוסיף תמונות למקום."))
    parts.append(bullet("להסיר מקום מתצוגת המשתמשים."))
    parts.append(bullet("לבדוק לאחר כל שינוי איך המקום מוצג למשתמשים במפה ובפרופיל המקום."))
    parts.append(bullet("לטפל בהודעות שגיאה בסיסיות בזמן פעולות ניהול."))

    parts.append(heading("מבנה האפליקציה למנהל", 1))
    parts.append(p("לאחר התחברות, המנהל רואה את סרגל הניווט העליון של האפליקציה. בסרגל זה ניתן לעבור למפה, לדירוגים שלי ולפרופיל האישי. בנוסף, כאשר המשתמש מזוהה כמנהל, מופיעים כפתורי ניהול מיוחדים: 'הוספת מתחם' ו'ניהול מקומות'."))
    parts.append(p("אם כפתורי הניהול אינם מופיעים, המשתמש אינו מזוהה כמנהל באותו רגע. במקרה כזה אין לבצע פעולות ניהול. יש לצאת מהמערכת, להתחבר מחדש, או לפנות לאחראי המערכת כדי לבדוק את הרשאת המשתמש."))

    parts.append(heading("1. התחברות כמנהל", 1))
    parts.append(p("כאשר פותחים את Work4U, מגיעים למסך ההתחברות. כדי להתחבר כמנהל:"))
    parts.append(bullet("הזינו כתובת אימייל."))
    parts.append(bullet("הזינו סיסמה."))
    parts.append(bullet("אם זו סביבת הדגמה, בחרו במצב 'מנהל'."))
    parts.append(bullet("לחצו על 'התחברות'."))
    parts.append(p("אם הפרטים נכונים, תועברו למסך הבית. במסך הבית בדקו שמופיעים כפתורי הניהול. אם מופיעה הודעת שגיאה, בדקו שהאימייל והסיסמה הוקלדו נכון ונסו שוב."))

    parts.append(heading("2. בדיקה קצרה של תצוגת המשתמש", 1))
    parts.append(p("למנהל יש מדריך משתמש נפרד עבור פעולות רגילות כמו חיפוש, סינון, דירוג וניהול פרופיל. במדריך מנהל אין צורך לפרט אותן שוב. עם זאת, מנהל כן משתמש במסך הבית, במפה, במסננים ובפרופיל המקום כדי לוודא שמקום שהתווסף או נערך מוצג נכון למשתמשים."))
    parts.append(p("לאחר שינוי ניהולי, מומלץ לבצע בדיקה קצרה: לחפש את המקום במסך המפה, לפתוח את פרופיל המקום, לבדוק שהשם והכתובת נכונים, לוודא ששעות הפעילות והמחיר מוצגים כמו שצריך, ולבדוק שהתמונות או ההערות שהוזנו אכן מופיעות."))
    parts.append(bullet("השתמשו בחיפוש כדי למצוא את המקום אחרי הוספה או עריכה."))
    parts.append(bullet("השתמשו במסננים רק כדי לוודא שהמקום מופיע תחת התנאים המתאימים."))
    parts.append(bullet("פתחו את פרופיל המקום כדי לבדוק איך המידע מוצג למשתמש רגיל."))
    parts.append(bullet("אם מצאתם טעות בתצוגה, חזרו למסך ניהול מקומות ותקנו את הפרטים."))

    parts.append(heading("3. הוספת מתחם חדש", 1))
    parts.append(p("הוספת מתחם היא אחת הפעולות המרכזיות של מנהל. משתמשים בה כאשר רוצים להכניס לאפליקציה מקום עבודה חדש. כדי להוסיף מתחם:"))
    parts.append(bullet("לחצו על 'הוספת מתחם' בסרגל העליון."))
    parts.append(bullet("הזינו שם מתחם ברור."))
    parts.append(bullet("הזינו כתובת מלאה ככל האפשר."))
    parts.append(bullet("הזינו שעות פעילות."))
    parts.append(bullet("הוסיפו אתר, טלפון או אימייל אם קיימים."))
    parts.append(bullet("כתבו הערת כניסה או תשלום אם יש תנאי חשוב למשתמשים."))
    parts.append(bullet("בחרו רמת מחיר."))
    parts.append(bullet("הוסיפו תמונות אם יש תמונות מתאימות."))
    parts.append(bullet("לחצו על 'פרסם מתחם במערכת'."))
    parts.append(p("שם המתחם, הכתובת ושעות הפעילות הם שדות חובה. אם אחד מהם חסר, המערכת תציג הודעת שגיאה ולא תפרסם את המקום. לאחר פרסום מוצלח תופיע הודעת הצלחה."))

    parts.append(heading("4. בדיקה לאחר הוספת מתחם", 1))
    parts.append(p("לאחר שמתחם חדש נוסף, חשוב לבדוק שהוא מופיע נכון באפליקציה. כדי לבדוק:"))
    parts.append(bullet("חזרו למסך המפה או פתחו את 'ניהול מקומות'."))
    parts.append(bullet("חפשו את שם המתחם החדש."))
    parts.append(bullet("פתחו את פרופיל המקום."))
    parts.append(bullet("בדקו שהשם, הכתובת, שעות הפעילות, המחיר, התיאור והתמונות מוצגים נכון."))
    parts.append(bullet("אם נמצאה טעות, עברו לעריכת המקום ותקנו אותה."))

    parts.append(heading("5. ניהול מקומות קיימים", 1))
    parts.append(p("מסך 'ניהול מקומות' מאפשר למנהל לראות את המקומות הקיימים במערכת ולבצע בהם פעולות ניהול. כדי לפתוח את המסך, לחצו על 'ניהול מקומות' בסרגל העליון."))
    parts.append(p("במסך זה ניתן לחפש מקום לפי שם, כתובת או סוג מקום. אם הרשימה לא מעודכנת, ניתן ללחוץ על 'רענון'. ליד כל מקום מופיעות פעולות ניהול, בעיקר עריכה ומחיקה."))
    parts.append(p("לפני כל פעולה, ודאו שבחרתם את המקום הנכון. אם קיימים כמה מקומות עם שם דומה, בדקו גם את הכתובת."))

    parts.append(heading("6. עריכת פרטי מקום", 1))
    parts.append(p("כדי לערוך מקום קיים, פתחו את 'ניהול מקומות' ולחצו על 'ערוך' ליד המקום הרצוי. במסך העריכה ניתן לעדכן פרטים שמשתנים לאורך זמן או משפיעים על הדרך שבה המקום מוצג למשתמשים."))
    parts.append(p("ניתן לערוך:"))
    parts.append(bullet("שעות פעילות."))
    parts.append(bullet("טווח מחיר."))
    parts.append(bullet("איכות Wi-Fi."))
    parts.append(bullet("רמת רעש."))
    parts.append(bullet("האם יש שקעי חשמל."))
    parts.append(bullet("תיאור המקום."))
    parts.append(bullet("אתר, טלפון ואימייל."))
    parts.append(bullet("הערת כניסה או תשלום."))
    parts.append(bullet("תמונות נוספות."))
    parts.append(p("שם המקום, הכתובת והמיקום אינם מיועדים לעריכה במסך זה. לאחר עדכון הפרטים, לחצו על 'שמור שינויים'. אם השמירה הצליחה, תופיע הודעת הצלחה והרשימה תתעדכן."))

    parts.append(heading("7. הוספת תמונות למקום", 1))
    parts.append(p("תמונות עוזרות למשתמשים להבין איך נראה המקום לפני שהם מגיעים אליו. ניתן להוסיף תמונות בעת הוספת מתחם חדש או בעת עריכת מקום קיים."))
    parts.append(p("כדי להוסיף תמונות בעריכה:"))
    parts.append(bullet("פתחו את 'ניהול מקומות'."))
    parts.append(bullet("לחצו על 'ערוך' ליד המקום הרצוי."))
    parts.append(bullet("לחצו על אזור העלאת התמונות."))
    parts.append(bullet("בחרו קובצי תמונה מהמחשב."))
    parts.append(bullet("לחצו על 'שמור שינויים'."))
    parts.append(p("מומלץ להעלות תמונות ברורות, רלוונטיות ומכבדות. אין להעלות תמונות שאינן קשורות למקום או תמונות שמציגות מידע פרטי של אנשים."))

    parts.append(heading("8. הסרת מקום מתצוגת המשתמשים", 1))
    parts.append(p("אם מקום נסגר, אינו מתאים יותר לאפליקציה, הוזן בטעות או לא אמור להופיע למשתמשים, ניתן להסיר אותו מתצוגת המשתמשים. כדי להסיר מקום:"))
    parts.append(bullet("פתחו את 'ניהול מקומות'."))
    parts.append(bullet("חפשו את המקום לפי שם או כתובת."))
    parts.append(bullet("ודאו שזה המקום הנכון."))
    parts.append(bullet("לחצו על 'מחק'."))
    parts.append(bullet("קראו את הודעת האישור."))
    parts.append(bullet("אשרו רק אם אתם בטוחים שהמקום צריך להיות מוסר."))
    parts.append(p("לאחר האישור, המקום לא אמור להופיע עוד למשתמשים ברשימת המקומות הרגילה. אם אינכם בטוחים, עדיף לבטל את הפעולה ולבדוק שוב."))

    parts.append(heading("9. זרימת עבודה מומלצת למנהל", 1))
    parts.append(p("כדי לעבוד בצורה מסודרת, מומלץ שכל פעולה ניהולית תתבצע לפי אותה זרימה:"))
    parts.append(bullet("בחרו פעולה: הוספה, עריכה או הסרה."))
    parts.append(bullet("בדקו שאתם עובדים על המקום הנכון."))
    parts.append(bullet("מלאו או עדכנו את הפרטים בצורה ברורה."))
    parts.append(bullet("שמרו את הפעולה."))
    parts.append(bullet("בדקו שהופיעה הודעת הצלחה."))
    parts.append(bullet("חזרו לאפליקציה ובדקו שהשינוי מוצג נכון למשתמשים."))

    parts.append(heading("10. טיפול בהודעות שגיאה", 1))
    parts.append(p("במהלך העבודה ייתכן שתופיע הודעת שגיאה. אם לא ניתן לפרסם מתחם, בדקו קודם ששדות החובה מלאים. אם לא ניתן לשמור עריכה, בדקו שהערכים שהוזנו תקינים ונסו שוב. אם פעולות הניהול אינן מופיעות, בדקו שהתחברתם כמנהל."))
    parts.append(p("כאשר הודעת שגיאה חוזרת כמה פעמים, מומלץ לתעד מה ניסיתם לעשות, באיזה מסך הייתם ומה הייתה ההודעה שהופיעה. כך יהיה קל יותר להבין את הבעיה ולטפל בה."))

    parts.append(heading("11. טיפים לשימוש נכון כמנהל", 1))
    parts.append(bullet("כתבו שמות מקומות בצורה קצרה וברורה."))
    parts.append(bullet("הזינו כתובת מלאה ככל האפשר."))
    parts.append(bullet("בדקו שעות פעילות לפני פרסום או עריכה."))
    parts.append(bullet("השתמשו בהערת כניסה כדי להסביר תשלום, הזמנה מראש או תנאי כניסה."))
    parts.append(bullet("אל תמחקו מקום אם אינכם בטוחים שהוא צריך להיעלם מהאפליקציה."))
    parts.append(bullet("לאחר כל שינוי, בדקו את התוצאה כמו שמשתמש רגיל היה רואה אותה."))

    parts.append(heading("12. תקלות נפוצות", 1))
    parts.append(p("אם לא מצליחים להתחבר, בדקו שהאימייל והסיסמה הוקלדו נכון. אם הסיסמה נשכחה, השתמשו באפשרות 'שכחתי סיסמה'."))
    parts.append(p("אם לא רואים את הכפתור 'הוספת מתחם' או את הכפתור 'ניהול מקומות', כנראה שהמשתמש אינו מחובר כמנהל. נסו לצאת ולהתחבר מחדש. אם הבעיה נמשכת, פנו לאחראי המערכת."))
    parts.append(p("אם מקום לא מופיע בזמן בדיקה במסך הבית, נסו להסיר מסננים או להרחיב את רדיוס החיפוש. בדיקה זו מיועדת רק לווידוא שהמידע שמנהל ערך מוצג למשתמשים."))
    parts.append(p("אם מתחם חדש לא מופיע לאחר פרסום, רעננו את הרשימה וחפשו אותו לפי שם. אם הוא עדיין לא מופיע, נסו לפרסם שוב או בדקו אם הופיעה הודעת שגיאה."))
    parts.append(p("אם תמונה לא נשמרה, ודאו שבחרתם קובץ תמונה תקין ונסו להעלות שוב."))

    parts.append(heading("סיכום", 1))
    parts.append(p("מנהל מערכת ב-Work4U אחראי בעיקר על מאגר המקומות באפליקציה. הדגש במדריך זה הוא על פעולות הניהול: הוספת מתחמים, ניהול מקומות קיימים, עריכת פרטים, הוספת תמונות, הסרת מקומות ובדיקת התוצאה לאחר כל שינוי. פעולות משתמש רגילות מוזכרות רק כאשר הן עוזרות למנהל לוודא שהמידע מוצג נכון למשתמשים."))

    return "\n".join(parts)


def make_docx_text_only() -> None:
    DOCS.mkdir(parents=True, exist_ok=True)
    MD_PATH.write_text(markdown_text() + "\n", encoding="utf-8")
    body = document_body_text_only()

    with zipfile.ZipFile(DOCX_PATH, "w", compression=zipfile.ZIP_DEFLATED) as docx:
        docx.writestr("[Content_Types].xml", content_types_xml([]))
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
              <dc:title>Work4U - חוברת הדרכה למנהל המערכת</dc:title>
              <dc:creator>Codex</dc:creator>
              <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
              <dcterms:created xsi:type="dcterms:W3CDTF">2026-06-15T00:00:00Z</dcterms:created>
              <dcterms:modified xsi:type="dcterms:W3CDTF">2026-06-15T00:00:00Z</dcterms:modified>
            </cp:coreProperties>
            """),
        )
        docx.writestr(
            "docProps/app.xml",
            clean("""
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
              <Application>Codex</Application>
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
              <Relationship Id="rIdNumbering" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
            </Relationships>
            """),
        )
        docx.writestr("word/document.xml", document_xml(body))
        docx.writestr("word/styles.xml", styles_xml())
        docx.writestr("word/numbering.xml", numbering_xml())
        docx.writestr(
            "word/settings.xml",
            clean("""
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
              <w:defaultTabStop w:val="708"/>
              <w:displayBackgroundShape/>
            </w:settings>
            """),
        )


def make_docx(images: list[dict[str, str]]) -> None:
    body, rels = document_body(images)
    DOCS.mkdir(parents=True, exist_ok=True)
    MD_PATH.write_text(markdown_text() + "\n", encoding="utf-8")

    with zipfile.ZipFile(DOCX_PATH, "w", compression=zipfile.ZIP_DEFLATED) as docx:
        docx.writestr("[Content_Types].xml", content_types_xml(images))
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
              <dc:title>Work4U - חוברת הדרכה למנהל המערכת</dc:title>
              <dc:creator>Codex</dc:creator>
              <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
              <dcterms:created xsi:type="dcterms:W3CDTF">2026-06-15T00:00:00Z</dcterms:created>
              <dcterms:modified xsi:type="dcterms:W3CDTF">2026-06-15T00:00:00Z</dcterms:modified>
            </cp:coreProperties>
            """),
        )
        docx.writestr(
            "docProps/app.xml",
            clean("""
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
              <Application>Codex</Application>
            </Properties>
            """),
        )
        docx.writestr(
            "word/_rels/document.xml.rels",
            clean(f"""
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
              {rels}
              <Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
              <Relationship Id="rIdSettings" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
              <Relationship Id="rIdNumbering" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
            </Relationships>
            """),
        )
        docx.writestr("word/document.xml", document_xml(body))
        docx.writestr("word/styles.xml", styles_xml())
        docx.writestr("word/numbering.xml", numbering_xml())
        docx.writestr(
            "word/settings.xml",
            clean("""
            <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
              <w:defaultTabStop w:val="708"/>
              <w:displayBackgroundShape/>
            </w:settings>
            """),
        )
        for image in images:
            docx.write(ASSETS / image["file"], f'word/media/{image["file"]}')


def main() -> None:
    make_docx_text_only()
    print(DOCX_PATH)
    print(MD_PATH)


if __name__ == "__main__":
    main()
