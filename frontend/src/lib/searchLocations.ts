import type { LatLng } from './geo';

export interface SearchLocationOption {
  id: string;
  label: string;
  location: LatLng | null;
}

export const SEARCH_LOCATIONS: SearchLocationOption[] = [
  {
    id: "current",
    label: "המיקום הנוכחי שלי",
    location: null,
  },
  {
    id: "manual-ariel",
    label: "אריאל / Ariel",
    location: { lat: 32.104300, lng: 35.173300 },
  },
  {
    id: "manual-kfar-saba",
    label: "כפר סבא / Kfar Saba",
    location: { lat: 32.178200, lng: 34.907600 },
  },
  {
    id: "manual-raanana",
    label: "רעננה / Ra'anana",
    location: { lat: 32.184800, lng: 34.871300 },
  },
  {
    id: "manual-petah-tikva",
    label: "פתח תקווה / Petah Tikva",
    location: { lat: 32.087100, lng: 34.887800 },
  },
  {
    id: "manual-tel-aviv",
    label: "תל אביב / Tel Aviv",
    location: { lat: 32.085300, lng: 34.781800 },
  },
  {
    id: "manual-jerusalem",
    label: "ירושלים / Jerusalem",
    location: { lat: 31.768300, lng: 35.213700 },
  },
  {
    id: "manual-haifa",
    label: "חיפה / Haifa",
    location: { lat: 32.794000, lng: 34.989600 },
  },
  {
    id: "manual-beer-sheva",
    label: "באר שבע / Beer Sheva",
    location: { lat: 31.252900, lng: 34.791500 },
  },
  {
    id: "dalmanutha-933115861",
    label: "Dalmanutha",
    location: { lat: 32.871367, lng: 35.548984 },
  },
  {
    id: "kfar-bin-nun-278473068",
    label: "Kfar Bin Nun",
    location: { lat: 31.862469, lng: 34.947186 },
  },
  {
    id: "migdal-haemeq-861332387",
    label: "Migdal Haemeq",
    location: { lat: 32.681469, lng: 35.244185 },
  },
  {
    id: "א-זידאנה-אל-נסאסרה-158939140",
    label: "א-זידאנה אל נסאסרה",
    location: { lat: 31.368316, lng: 34.739657 },
  },
  {
    id: "א-טייבה-א-זועביה-278478347",
    label: "א-טייבה א-זועביה / Taiyiba in Galilee",
    location: { lat: 32.603212, lng: 35.444796 },
  },
  {
    id: "א-טייבה-א-זועביה-614217402",
    label: "א-טייבה א-זועביה / Taiyiba in Galilee",
    location: { lat: 32.603394, lng: 35.446020 },
  },
  {
    id: "א-נווקיר-613780656",
    label: "א-נווקיר / al-Nawaqir",
    location: { lat: 33.090881, lng: 35.213963 },
  },
  {
    id: "אבו-ג-אמדה-4713049832",
    label: "אבו ג'אמדה / Abu Jamada",
    location: { lat: 31.165499, lng: 34.980370 },
  },
  {
    id: "אבו-ג-ווייעד-1076985592",
    label: "אבו ג'ווייעד / Abu Juwayid",
    location: { lat: 31.180425, lng: 35.072348 },
  },
  {
    id: "אבו-ג-ווייעד-92879601",
    label: "אבו ג'ווייעד / Abu Juwayid",
    location: { lat: 31.180513, lng: 35.072703 },
  },
  {
    id: "אבו-גוש-222030040",
    label: "אבו גוש / Abu Ghosh",
    location: { lat: 31.806353, lng: 35.108865 },
  },
  {
    id: "אבו-גוש-621200972",
    label: "אבו גוש / Abu Gosh",
    location: { lat: 31.807218, lng: 35.109744 },
  },
  {
    id: "אבו-דיס-8488389",
    label: "אבו דיס / Abu Dis",
    location: { lat: 31.760086, lng: 35.262935 },
  },
  {
    id: "אבו-ליבדה-1537184145",
    label: "אבו ליבדה / Abu Libdeh",
    location: { lat: 31.972051, lng: 34.845673 },
  },
  {
    id: "אבו-סנאן-278470076",
    label: "אבו סנאן / Abu Sinan",
    location: { lat: 32.958648, lng: 35.171660 },
  },
  {
    id: "אבו-סנאן-614168660",
    label: "אבו סנאן / Abu Sinan",
    location: { lat: 32.959490, lng: 35.167200 },
  },
  {
    id: "אבו-סנינא-3630219973",
    label: "אבו סנינא / Abu Sneneh",
    location: { lat: 32.183706, lng: 34.955769 },
  },
  {
    id: "אבו-סנינא-866595569",
    label: "אבו סנינא / Abu Sneneh",
    location: { lat: 32.183478, lng: 34.955747 },
  },
  {
    id: "אבו-סריחאן-432757887",
    label: "אבו סריחאן",
    location: { lat: 31.263533, lng: 34.883132 },
  },
  {
    id: "אבו-עיסא-432756411",
    label: "אבו עיסא",
    location: { lat: 31.297838, lng: 34.892352 },
  },
  {
    id: "אבו-עמאר-4944470650",
    label: "אבו עמאר / Abu Amar",
    location: { lat: 31.137378, lng: 34.953260 },
  },
  {
    id: "אבו-עמאר-7270160",
    label: "אבו עמאר / Abu Amar",
    location: { lat: 31.142709, lng: 34.937749 },
  },
  {
    id: "אבו-עמר-4713049830",
    label: "אבו עמר / Abu Amar",
    location: { lat: 31.185749, lng: 34.965177 },
  },
  {
    id: "אבו-עפאש-599589100",
    label: "אבו עפאש / Abu Afash",
    location: { lat: 31.160548, lng: 34.807398 },
  },
  {
    id: "אבו-עפאש-92481611",
    label: "אבו עפאש / Abu Afash",
    location: { lat: 31.156110, lng: 34.808810 },
  },
  {
    id: "אבו-עשיבה-4944470649",
    label: "אבו עשיבה / Abu Asiba",
    location: { lat: 31.124934, lng: 34.958711 },
  },
  {
    id: "אבו-קורינאת-1075521385",
    label: "אבו קורינאת / Abu Kuraynat",
    location: { lat: 31.102038, lng: 34.952999 },
  },
  {
    id: "אבו-קרינאת-13186291028",
    label: "אבו קרינאת / Abu Quraynat",
    location: { lat: 31.145731, lng: 34.971630 },
  },
  {
    id: "אבו-ראשד-4944474336",
    label: "אבו ראשד / Abu Rashd",
    location: { lat: 31.103477, lng: 34.990758 },
  },
  {
    id: "אבו-רוקייק-1076997401",
    label: "אבו רוקייק / Abu Rukayk",
    location: { lat: 31.259846, lng: 34.863821 },
  },
  {
    id: "אבו-רוקייק-92880152",
    label: "אבו רוקייק / Abu Rukayk",
    location: { lat: 31.259872, lng: 34.864080 },
  },
  {
    id: "אבו-תלול-4867904270",
    label: "אבו תלול / Abu Tlul Al Shahbi",
    location: { lat: 31.186196, lng: 34.912801 },
  },
  {
    id: "אבו-קרינאת-7266581",
    label: "אבו-קרינאת / Abu Quraynat",
    location: { lat: 31.141442, lng: 34.963589 },
  },
  {
    id: "אבטליון-278474559",
    label: "אבטליון / Avtalion",
    location: { lat: 32.836180, lng: 35.350270 },
  },
  {
    id: "אבטליון-966002359",
    label: "אבטליון / Avtalion",
    location: { lat: 32.836412, lng: 35.349553 },
  },
  {
    id: "אביאל-278473224",
    label: "אביאל / Aviel",
    location: { lat: 32.532510, lng: 34.993391 },
  },
  {
    id: "אביאל-84844214",
    label: "אביאל / Aviel",
    location: { lat: 32.532311, lng: 34.992415 },
  },
  {
    id: "אביבים-331876670",
    label: "אביבים / Avivim",
    location: { lat: 33.088678, lng: 35.472938 },
  },
  {
    id: "אביבים-690149011",
    label: "אביבים / Avivim",
    location: { lat: 33.088866, lng: 35.472489 },
  },
  {
    id: "אביגדור-278473499",
    label: "אביגדור / Avigdor",
    location: { lat: 31.710946, lng: 34.743575 },
  },
  {
    id: "אביגדור-636951078",
    label: "אביגדור / Avigdor",
    location: { lat: 31.709852, lng: 34.744183 },
  },
  {
    id: "אביחיל-278455770",
    label: "אביחיל / Avihayil",
    location: { lat: 32.350232, lng: 34.871735 },
  },
  {
    id: "אביחיל-94521238",
    label: "אביחיל / Avihayil",
    location: { lat: 32.351107, lng: 34.871676 },
  },
  {
    id: "אביטל-278476507",
    label: "אביטל / Avital",
    location: { lat: 32.557856, lng: 35.306355 },
  },
  {
    id: "אביטל-617494971",
    label: "אביטל / Avital",
    location: { lat: 32.557493, lng: 35.307446 },
  },
  {
    id: "אביעזר-278470442",
    label: "אביעזר / Aviezer",
    location: { lat: 31.681189, lng: 35.017721 },
  },
  {
    id: "אביעזר-92021302",
    label: "אביעזר / Aviezer",
    location: { lat: 31.681742, lng: 35.015664 },
  },
  {
    id: "אבירים-411899180",
    label: "אבירים / Abirim",
    location: { lat: 33.038647, lng: 35.287140 },
  },
  {
    id: "אבירים-681613132",
    label: "אבירים / Abirim",
    location: { lat: 33.038884, lng: 35.288376 },
  },
  {
    id: "אבן-יהודה-246250334",
    label: "אבן יהודה / Even Yehuda",
    location: { lat: 32.272485, lng: 34.886767 },
  },
  {
    id: "אבן-יהודה-698890745",
    label: "אבן יהודה / Even Yehuda",
    location: { lat: 32.271459, lng: 34.884815 },
  },
  {
    id: "אבן-מנחם-278477167",
    label: "אבן מנחם / Even Menahem",
    location: { lat: 33.073611, lng: 35.294138 },
  },
  {
    id: "אבן-מנחם-689948552",
    label: "אבן מנחם / Even Menahem",
    location: { lat: 33.074831, lng: 35.292938 },
  },
  {
    id: "אבן-ספיר-278476513",
    label: "אבן ספיר / Even Sappir",
    location: { lat: 31.762981, lng: 35.135119 },
  },
  {
    id: "אבן-ספיר-894555879",
    label: "אבן ספיר / Even Sappir",
    location: { lat: 31.763627, lng: 35.135146 },
  },
  {
    id: "אבן-שמואל-278475597",
    label: "אבן שמואל / Even Shemuel",
    location: { lat: 31.574894, lng: 34.764331 },
  },
  {
    id: "אבן-שמואל-826482498",
    label: "אבן שמואל / Even Shemuel",
    location: { lat: 31.574977, lng: 34.766086 },
  },
  {
    id: "אבני-איתן-12597720703",
    label: "אבני איתן / Avnay Eitan",
    location: { lat: 32.824638, lng: 35.766734 },
  },
  {
    id: "אבני-איתן-91449693",
    label: "אבני איתן / Avnay Eitan",
    location: { lat: 32.824609, lng: 35.765817 },
  },
  {
    id: "אבשלום-340065444",
    label: "אבשלום / Avshalom",
    location: { lat: 31.195093, lng: 34.330788 },
  },
  {
    id: "אבשלום-711327436",
    label: "אבשלום / Avshalom",
    location: { lat: 31.194693, lng: 34.330685 },
  },
  {
    id: "אדירים-275589901",
    label: "אדירים / Adirim",
    location: { lat: 32.549073, lng: 35.271168 },
  },
  {
    id: "אדירים-617494235",
    label: "אדירים / Adirim",
    location: { lat: 32.549278, lng: 35.272143 },
  },
  {
    id: "אדמה-7055695490",
    label: "אדמה / Adama",
    location: { lat: 32.973151, lng: 35.215808 },
  },
  {
    id: "אדמה-958008200",
    label: "אדמה / Adama",
    location: { lat: 32.972895, lng: 35.215762 },
  },
  {
    id: "אדמית-278477145",
    label: "אדמית / Adamit",
    location: { lat: 33.079586, lng: 35.210254 },
  },
  {
    id: "אדמית-915965753",
    label: "אדמית / Adamit",
    location: { lat: 33.079514, lng: 35.208824 },
  },
  {
    id: "אדרת-275589898",
    label: "אדרת / Aderet",
    location: { lat: 31.659743, lng: 34.995688 },
  },
  {
    id: "אדרת-82628251",
    label: "אדרת / Aderet",
    location: { lat: 31.660335, lng: 34.994872 },
  },
  {
    id: "אודים-278477333",
    label: "אודים / Udim",
    location: { lat: 32.264771, lng: 34.846933 },
  },
  {
    id: "אודים-700785769",
    label: "אודים / Udim",
    location: { lat: 32.265532, lng: 34.849691 },
  },
  {
    id: "אודם-1657258955",
    label: "אודם / Odem",
    location: { lat: 33.194374, lng: 35.748314 },
  },
  {
    id: "אודם-821433015",
    label: "אודם / Odem",
    location: { lat: 33.193679, lng: 35.749990 },
  },
  {
    id: "אוהד-603908651",
    label: "אוהד / Ohad",
    location: { lat: 31.237743, lng: 34.430454 },
  },
  {
    id: "אוהד-82487540",
    label: "אוהד / Ohad",
    location: { lat: 31.237548, lng: 34.431820 },
  },
  {
    id: "אום-אל-גנם-614214760",
    label: "אום אל גנם / Umm al-Ghanam",
    location: { lat: 32.676424, lng: 35.395425 },
  },
  {
    id: "אום-אל-קוטוף-278477386",
    label: "אום אל קוטוף / Umm al-Qutuf",
    location: { lat: 32.468056, lng: 35.058889 },
  },
  {
    id: "אום-אל-קוטוף-92001539",
    label: "אום אל קוטוף / Umm al-Qutuf",
    location: { lat: 32.469431, lng: 35.056366 },
  },
  {
    id: "אום-אל-פחם-278477604",
    label: "אום אל-פחם / Umm al-Fahm",
    location: { lat: 32.515839, lng: 35.152491 },
  },
  {
    id: "אום-אל-פחם-85788281",
    label: "אום אל-פחם / Umm al-Fahm",
    location: { lat: 32.521618, lng: 35.150578 },
  },
  {
    id: "אום-בטין-1075584516",
    label: "אום בטין / Um Batin",
    location: { lat: 31.275764, lng: 34.883866 },
  },
  {
    id: "אום-בטין-92737508",
    label: "אום בטין / Um Batin",
    location: { lat: 31.277725, lng: 34.882849 },
  },
  {
    id: "אום-מיתנאן-4944470648",
    label: "אום מיתנאן / Umm Mitnan",
    location: { lat: 31.126238, lng: 34.969257 },
  },
  {
    id: "אום-סהלי-698224714",
    label: "אום סהלי / Um-E' Skhali",
    location: { lat: 32.787125, lng: 35.172828 },
  },
  {
    id: "אום-רתאם-4867882301",
    label: "אום רתאם / Um Rattam",
    location: { lat: 31.116439, lng: 35.021409 },
  },
  {
    id: "אומן-278477221",
    label: "אומן / Merkaz Omen",
    location: { lat: 32.564116, lng: 35.242224 },
  },
  {
    id: "אומן-617491536",
    label: "אומן / Merkaz Omen",
    location: { lat: 32.563235, lng: 35.242654 },
  },
  {
    id: "אומץ-6579919006",
    label: "אומץ / Ometz",
    location: { lat: 32.371522, lng: 34.996191 },
  },
  {
    id: "אומץ-700671120",
    label: "אומץ / Ometz",
    location: { lat: 32.370384, lng: 34.994077 },
  },
  {
    id: "אופקים-278474639",
    label: "אופקים / Ofakim",
    location: { lat: 31.312583, lng: 34.620854 },
  },
  {
    id: "אופקים-749369975",
    label: "אופקים / Ofakim",
    location: { lat: 31.306827, lng: 34.625528 },
  },
  {
    id: "אור-הגנוז-616551838",
    label: "אור הגנוז / Or HaGanuz",
    location: { lat: 33.005163, lng: 35.445893 },
  },
  {
    id: "אור-הגנוז-350315169",
    label: "אור הגנוז / Or Haganuz",
    location: { lat: 33.005079, lng: 35.447507 },
  },
  {
    id: "אור-הנר-278478167",
    label: "אור הנר / Or HaNer",
    location: { lat: 31.557559, lng: 34.600053 },
  },
  {
    id: "אור-הנר-92380278",
    label: "אור הנר / Or HaNer",
    location: { lat: 31.557239, lng: 34.600513 },
  },
  {
    id: "אור-יהודה-196332841",
    label: "אור יהודה / Or Yehuda",
    location: { lat: 32.027004, lng: 34.862990 },
  },
  {
    id: "אור-יהודה-94715099",
    label: "אור יהודה / Or Yehuda",
    location: { lat: 32.029964, lng: 34.852866 },
  },
  {
    id: "אור-עקיבא-246264595",
    label: "אור עקיבא / Or Akiva",
    location: { lat: 32.509015, lng: 34.919568 },
  },
  {
    id: "אור-עקיבא-79309903",
    label: "אור עקיבא / Or Akiva",
    location: { lat: 32.502946, lng: 34.920408 },
  },
  {
    id: "אורה-278474357",
    label: "אורה / Ora",
    location: { lat: 31.752747, lng: 35.153499 },
  },
  {
    id: "אורה-94708940",
    label: "אורה / Ora",
    location: { lat: 31.753507, lng: 35.152484 },
  },
  {
    id: "אורות-278478045",
    label: "אורות / Orot",
    location: { lat: 31.740721, lng: 34.734914 },
  },
  {
    id: "אורות-92032513",
    label: "אורות / Orot",
    location: { lat: 31.742059, lng: 34.733282 },
  },
  {
    id: "אורטל-300165824",
    label: "אורטל / Ortal",
    location: { lat: 33.085239, lng: 35.759431 },
  },
  {
    id: "אורטל-92005678",
    label: "אורטל / Ortal",
    location: { lat: 33.085263, lng: 35.761974 },
  },
  {
    id: "אורים-275232511",
    label: "אורים / Urim",
    location: { lat: 31.304167, lng: 34.521977 },
  },
  {
    id: "אורים-82512062",
    label: "אורים / Urim",
    location: { lat: 31.303670, lng: 34.522571 },
  },
  {
    id: "אורנים-278476457",
    label: "אורנים / Oranim",
    location: { lat: 32.711677, lng: 35.107958 },
  },
  {
    id: "אורנים-91373745",
    label: "אורנים / Oranim",
    location: { lat: 32.712134, lng: 35.108812 },
  },
  {
    id: "אורנית-6743241",
    label: "אורנית / Oranit",
    location: { lat: 32.130607, lng: 34.996514 },
  },
  {
    id: "אושה-275232531",
    label: "אושה / Usha",
    location: { lat: 32.795519, lng: 35.114402 },
  },
  {
    id: "אושה-94525297",
    label: "אושה / Usha",
    location: { lat: 32.796166, lng: 35.114893 },
  },
  {
    id: "אזור-278473203",
    label: "אזור / Azor",
    location: { lat: 32.028209, lng: 34.802593 },
  },
  {
    id: "אזור-83262175",
    label: "אזור / Azor",
    location: { lat: 32.023578, lng: 34.807136 },
  },
  {
    id: "אחוזם-278476395",
    label: "אחוזם / Ahuzam",
    location: { lat: 31.552225, lng: 34.770696 },
  },
  {
    id: "אחוזם-705458424",
    label: "אחוזם / Ahuzam",
    location: { lat: 31.553296, lng: 34.770137 },
  },
  {
    id: "אחוזת-ברק-691192491",
    label: "אחוזת ברק / Ahuzat Barak",
    location: { lat: 32.641844, lng: 35.338753 },
  },
  {
    id: "אחוזת-ברק-584708950",
    label: "אחוזת ברק / Ahuzat Barak",
    location: { lat: 32.643473, lng: 35.337484 },
  },
  {
    id: "אחיהוד-278478649",
    label: "אחיהוד / Ahihud",
    location: { lat: 32.908312, lng: 35.172384 },
  },
  {
    id: "אחיהוד-91928254",
    label: "אחיהוד / Ahihud",
    location: { lat: 32.907210, lng: 35.174046 },
  },
  {
    id: "אחיטוב-278473517",
    label: "אחיטוב / Ahituv",
    location: { lat: 32.387327, lng: 34.991411 },
  },
  {
    id: "אחיטוב-700673461",
    label: "אחיטוב / Ahituv",
    location: { lat: 32.388012, lng: 34.989602 },
  },
  {
    id: "אחיסמך-278470767",
    label: "אחיסמך / Ahisamakh",
    location: { lat: 31.935556, lng: 34.908056 },
  },
  {
    id: "אחיסמך-586410850",
    label: "אחיסמך / Ahisamakh",
    location: { lat: 31.935725, lng: 34.906513 },
  },
  {
    id: "אחיעזר-278478074",
    label: "אחיעזר / Ahiezer",
    location: { lat: 31.981108, lng: 34.871673 },
  },
  {
    id: "אחיעזר-589701023",
    label: "אחיעזר / Ahiezer",
    location: { lat: 31.981186, lng: 34.870552 },
  },
  {
    id: "אטרש-1077027122",
    label: "אטרש / Atrash",
    location: { lat: 31.254053, lng: 34.968438 },
  },
  {
    id: "אטרש-92885029",
    label: "אטרש / Atrash",
    location: { lat: 31.253165, lng: 34.967533 },
  },
  {
    id: "איבטין-278474100",
    label: "איבטין / Ibtin",
    location: { lat: 32.760781, lng: 35.113189 },
  },
  {
    id: "איבטין-615242117",
    label: "איבטין / Ibtin",
    location: { lat: 32.761331, lng: 35.116147 },
  },
  {
    id: "איבים-278470753",
    label: "איבים / Ibbim",
    location: { lat: 31.533293, lng: 34.610074 },
  },
  {
    id: "איבים-56238713",
    label: "איבים / Ibbim",
    location: { lat: 31.533040, lng: 34.610277 },
  },
  {
    id: "איבתאן-278474184",
    label: "איבתאן / Ibtan",
    location: { lat: 32.365568, lng: 35.047244 },
  },
  {
    id: "איבתאן-83621579",
    label: "איבתאן / Ibthan",
    location: { lat: 32.366592, lng: 35.044589 },
  },
  {
    id: "אייל-278478186",
    label: "אייל / Eyal",
    location: { lat: 32.211376, lng: 34.978997 },
  },
  {
    id: "אייל-89347662",
    label: "אייל / Eyal",
    location: { lat: 32.210035, lng: 34.979028 },
  },
  {
    id: "איילת-השחר-278477019",
    label: "איילת השחר / Ayelet HaShahar",
    location: { lat: 33.021598, lng: 35.575952 },
  },
  {
    id: "איילת-השחר-81808024",
    label: "איילת השחר / Ayelet HaShahar",
    location: { lat: 33.024172, lng: 35.577169 },
  },
  {
    id: "איכסל-278477273",
    label: "איכסל / Iksal",
    location: { lat: 32.681584, lng: 35.323977 },
  },
  {
    id: "איכסל-610603457",
    label: "איכסל / Iksal",
    location: { lat: 32.682204, lng: 35.325819 },
  },
  {
    id: "אילון-695235428",
    label: "אילון / Ayalon",
    location: { lat: 33.064468, lng: 35.217048 },
  },
  {
    id: "אילון-278478262",
    label: "אילון / Eilon",
    location: { lat: 33.063346, lng: 35.219747 },
  },
  {
    id: "אילות-278476355",
    label: "אילות / Eilot",
    location: { lat: 29.581244, lng: 34.962663 },
  },
  {
    id: "אילות-786248425",
    label: "אילות / Eilot",
    location: { lat: 29.581603, lng: 34.962890 },
  },
  {
    id: "אילניה-278473309",
    label: "אילניה / Ilaniya",
    location: { lat: 32.754961, lng: 35.407472 },
  },
  {
    id: "אילניה-82162815",
    label: "אילניה / Ilaniya",
    location: { lat: 32.755099, lng: 35.405654 },
  },
  {
    id: "אילת-27132996",
    label: "אילת / Eilat",
    location: { lat: 29.556935, lng: 34.949795 },
  },
  {
    id: "אילת-963432388",
    label: "אילת / Eilat",
    location: { lat: 29.554022, lng: 34.942053 },
  },
  {
    id: "אינתיצאר-612787289",
    label: "אינתיצאר / Intisar",
    location: { lat: 32.990903, lng: 35.309800 },
  },
  {
    id: "אירוס-3164178670",
    label: "אירוס / Iris",
    location: { lat: 31.928452, lng: 34.775910 },
  },
  {
    id: "אירוס-128273213",
    label: "אירוס / Iris",
    location: { lat: 31.928814, lng: 34.776023 },
  },
  {
    id: "איתן-278474584",
    label: "איתן / Eitan",
    location: { lat: 31.572842, lng: 34.748722 },
  },
  {
    id: "איתן-705462276",
    label: "איתן / Eitan",
    location: { lat: 31.571462, lng: 34.748723 },
  },
  {
    id: "איתנים-8307131112",
    label: "איתנים / Eitanim",
    location: { lat: 31.779043, lng: 35.095001 },
  },
  {
    id: "איתנים-92342853",
    label: "איתנים / Eitanim",
    location: { lat: 31.778696, lng: 35.095636 },
  },
  {
    id: "אל-ביאר-1068786954",
    label: "אל ביאר / Al Bayar",
    location: { lat: 32.514680, lng: 35.115881 },
  },
  {
    id: "אל-ביאר-92001542",
    label: "אל ביאר / Al Bayar",
    location: { lat: 32.514289, lng: 35.114622 },
  },
  {
    id: "אל-ג-רג-אווי-92481603",
    label: "אל ג'רג'אווי / Al Jarjawi",
    location: { lat: 31.147446, lng: 34.825046 },
  },
  {
    id: "אל-דנפירי-599590033",
    label: "אל דנפירי / Al Danfiri",
    location: { lat: 31.131539, lng: 34.816402 },
  },
  {
    id: "אל-דנפירי-14358680",
    label: "אל דנפירי / Al Danfiri",
    location: { lat: 31.131559, lng: 34.814827 },
  },
  {
    id: "אל-ולידי-599588524",
    label: "אל ולידי / Al Walidi",
    location: { lat: 31.177852, lng: 34.815343 },
  },
  {
    id: "אל-ולידי-92481631",
    label: "אל ולידי / Al Walidi",
    location: { lat: 31.177470, lng: 34.813900 },
  },
  {
    id: "אל-מהדי-4944497660",
    label: "אל מהדי / El Mahdi",
    location: { lat: 31.105768, lng: 35.021725 },
  },
  {
    id: "אל-סייד-7220890418",
    label: "אל סייד / A-Sayid",
    location: { lat: 31.283261, lng: 34.913020 },
  },
  {
    id: "אל-סייד-92913325",
    label: "אל סייד / Al Sayyid",
    location: { lat: 31.281215, lng: 34.913883 },
  },
  {
    id: "אל-סירה-4867802905",
    label: "אל סירה / Al Sirah",
    location: { lat: 31.236969, lng: 35.022744 },
  },
  {
    id: "אל-ע-ול-4944471686",
    label: "אל ע'ול / Al Ghul",
    location: { lat: 31.124264, lng: 34.996487 },
  },
  {
    id: "אל-עביד-4727250747",
    label: "אל עביד / Al-Abid",
    location: { lat: 31.366880, lng: 34.861805 },
  },
  {
    id: "אל-עביד-298809634",
    label: "אל עביד / Al-Abid",
    location: { lat: 31.366458, lng: 34.862201 },
  },
  {
    id: "אל-עזי-3067401962",
    label: "אל עזי / Al-Ghazi",
    location: { lat: 31.718924, lng: 34.814270 },
  },
  {
    id: "אל-עמראני-4713049831",
    label: "אל עמראני / Al Amrani",
    location: { lat: 31.167880, lng: 34.968508 },
  },
  {
    id: "אל-עריאן-1068786992",
    label: "אל עריאן / Al Aryan",
    location: { lat: 32.497922, lng: 35.125578 },
  },
  {
    id: "אל-עריאן-85788159",
    label: "אל עריאן / Al Aryan",
    location: { lat: 32.497868, lng: 35.125137 },
  },
  {
    id: "אל-באט-4867772940",
    label: "אל-באט / Al Bat",
    location: { lat: 31.270483, lng: 35.033216 },
  },
  {
    id: "אל-בחירה-4867816233",
    label: "אל-בחירה / Al Bhirah",
    location: { lat: 31.217611, lng: 35.089542 },
  },
  {
    id: "אל-בקאר-4868030045",
    label: "אל-בקאר / Al Bgar",
    location: { lat: 30.848957, lng: 34.736289 },
  },
  {
    id: "אל-בקיעה-495239773",
    label: "אל-בקיעה / Al Bqea'ah",
    location: { lat: 31.307826, lng: 35.251238 },
  },
  {
    id: "אל-זערורה-4867786202",
    label: "אל-זערורה / Al Za'arurah",
    location: { lat: 31.237758, lng: 35.117802 },
  },
  {
    id: "אל-זרנוק-4867898792",
    label: "אל-זרנוק / Al Zarnug",
    location: { lat: 31.204006, lng: 34.925206 },
  },
  {
    id: "אל-חומרה-7266487",
    label: "אל-חומרה / Al Humrah",
    location: { lat: 31.265212, lng: 35.073277 },
  },
  {
    id: "אל-מד-בח-7266495",
    label: "אל-מד'בח / Al Madbah",
    location: { lat: 31.178309, lng: 34.953289 },
  },
  {
    id: "אל-מזרעה-495018100",
    label: "אל-מזרעה / Al Mazra'ah",
    location: { lat: 31.133303, lng: 35.048056 },
  },
  {
    id: "אל-מכימן-4867591665",
    label: "אל-מכימן / Al Mkiman",
    location: { lat: 31.296865, lng: 34.855499 },
  },
  {
    id: "אל-סדיר-4867894499",
    label: "אל-סדיר / Al Sdir",
    location: { lat: 31.169769, lng: 34.989543 },
  },
  {
    id: "אל-סיר-4867924265",
    label: "אל-סיר / Al Sir",
    location: { lat: 31.196902, lng: 34.806708 },
  },
  {
    id: "אל-ע-רא-4867609849",
    label: "אל-ע'רא / Al Gharrah",
    location: { lat: 31.237025, lng: 34.965035 },
  },
  {
    id: "אל-עראקיב-4867585330",
    label: "אל-עראקיב / Al Arakib",
    location: { lat: 31.322370, lng: 34.749172 },
  },
  {
    id: "אל-עראקיב-3921214991",
    label: "אל-עראקיב / al-Araqeeb",
    location: { lat: 31.346172, lng: 34.779700 },
  },
  {
    id: "אל-פורעה-4867855456",
    label: "אל-פורעה / Al Fur'ah",
    location: { lat: 31.233960, lng: 35.143701 },
  },
  {
    id: "אל-קטמאת-4867875319",
    label: "אל-קטמאת / Al Gatamat",
    location: { lat: 31.173094, lng: 35.094961 },
  },
  {
    id: "אל-רום-1657260022",
    label: "אל-רום / El Rom",
    location: { lat: 33.179646, lng: 35.772122 },
  },
  {
    id: "אל-רום-91408677",
    label: "אל-רום / El Rom",
    location: { lat: 33.180231, lng: 35.771565 },
  },
  {
    id: "אלומה-654139745",
    label: "אלומה / Aluma",
    location: { lat: 31.652036, lng: 34.742672 },
  },
  {
    id: "אלומה-763094860",
    label: "אלומה / Aluma",
    location: { lat: 31.651829, lng: 34.742691 },
  },
  {
    id: "אלומות-278477065",
    label: "אלומות / Alumot",
    location: { lat: 32.706986, lng: 35.546284 },
  },
  {
    id: "אלומות-915003385",
    label: "אלומות / Alumot",
    location: { lat: 32.708100, lng: 35.546523 },
  },
  {
    id: "אלון-הגליל-495955375",
    label: "אלון הגליל / Alon HaGalil",
    location: { lat: 32.757119, lng: 35.219980 },
  },
  {
    id: "אלון-הגליל-967222323",
    label: "אלון הגליל / Alon HaGalil",
    location: { lat: 32.757175, lng: 35.218746 },
  },
  {
    id: "אלוני-אבא-610907341",
    label: "אלוני אבא / Allone Abba",
    location: { lat: 32.729363, lng: 35.170821 },
  },
  {
    id: "אלוני-אבא-278478291",
    label: "אלוני אבא / Alonei Abba",
    location: { lat: 32.731016, lng: 35.171364 },
  },
  {
    id: "אלוני-הבשן-581222365",
    label: "אלוני הבשן / Alonei HaBashan",
    location: { lat: 33.044134, lng: 35.839240 },
  },
  {
    id: "אלוני-הבשן-802132319",
    label: "אלוני הבשן / Alonei HaBashan",
    location: { lat: 33.044527, lng: 35.838388 },
  },
  {
    id: "אלוני-יצחק-84844778",
    label: "אלוני יצחק / Allonay Yizhaq",
    location: { lat: 32.510311, lng: 35.004500 },
  },
  {
    id: "אלוני-יצחק-278469728",
    label: "אלוני יצחק / Allone Yizhaq",
    location: { lat: 32.510611, lng: 35.003597 },
  },
  {
    id: "אלונים-278473962",
    label: "אלונים / Alonim",
    location: { lat: 32.719909, lng: 35.144694 },
  },
  {
    id: "אלונים-996019636",
    label: "אלונים / Alonim",
    location: { lat: 32.720078, lng: 35.144484 },
  },
  {
    id: "אלי-עד-91449722",
    label: "אלי עד / Elli-ad",
    location: { lat: 32.805201, lng: 35.734176 },
  },
  {
    id: "אלי-עד-289310661",
    label: "אלי עד / Elliad",
    location: { lat: 32.804691, lng: 35.734174 },
  },
  {
    id: "אליאב-2162592991",
    label: "אליאב / Eliav",
    location: { lat: 31.529931, lng: 34.931480 },
  },
  {
    id: "אליאב-909135098",
    label: "אליאב / Eliav",
    location: { lat: 31.529537, lng: 34.929865 },
  },
  {
    id: "אליכין-80420588",
    label: "אליכין / Elyachin",
    location: { lat: 32.407805, lng: 34.924931 },
  },
  {
    id: "אליכין-278473013",
    label: "אליכין / Elyakhin",
    location: { lat: 32.407953, lng: 34.924873 },
  },
  {
    id: "אליפז-429882224",
    label: "אליפז / Elifaz",
    location: { lat: 29.796429, lng: 35.011940 },
  },
  {
    id: "אליפז-617410591",
    label: "אליפז / Elifaz",
    location: { lat: 29.796941, lng: 35.011912 },
  },
  {
    id: "אליפלט-278472503",
    label: "אליפלט / Elifelet",
    location: { lat: 32.948027, lng: 35.547389 },
  },
  {
    id: "אליפלט-92005250",
    label: "אליפלט / Elifelet",
    location: { lat: 32.947831, lng: 35.547902 },
  },
  {
    id: "אליקים-278469957",
    label: "אליקים / Elyakim",
    location: { lat: 32.632738, lng: 35.067051 },
  },
  {
    id: "אליקים-88519914",
    label: "אליקים / Elyakim",
    location: { lat: 32.631627, lng: 35.067190 },
  },
  {
    id: "אלישיב-278475757",
    label: "אלישיב / Elyashiv",
    location: { lat: 32.380254, lng: 34.909222 },
  },
  {
    id: "אלישיב-80418471",
    label: "אלישיב / Elyashiv",
    location: { lat: 32.380646, lng: 34.909909 },
  },
  {
    id: "אלישמע-278477236",
    label: "אלישמע / Elishama",
    location: { lat: 32.151960, lng: 34.927908 },
  },
  {
    id: "אלישמע-616785338",
    label: "אלישמע / Elishama",
    location: { lat: 32.152433, lng: 34.927498 },
  },
  {
    id: "אלמגור-278473250",
    label: "אלמגור / Almagor",
    location: { lat: 32.913942, lng: 35.603248 },
  },
  {
    id: "אלמגור-92005303",
    label: "אלמגור / Almagor",
    location: { lat: 32.913773, lng: 35.603087 },
  },
  {
    id: "אלעד-389991575",
    label: "אלעד / Elad",
    location: { lat: 32.050066, lng: 34.952152 },
  },
  {
    id: "אלעד-28826017",
    label: "אלעד / Elad",
    location: { lat: 32.051510, lng: 34.956300 },
  },
  {
    id: "אלקוש-278477228",
    label: "אלקוש / Elqosh",
    location: { lat: 33.034164, lng: 35.324174 },
  },
  {
    id: "אלקוש-690022265",
    label: "אלקוש / Elqosh",
    location: { lat: 33.033417, lng: 35.323497 },
  },
  {
    id: "אמונים-278477274",
    label: "אמונים / Emunim",
    location: { lat: 31.745337, lng: 34.676988 },
  },
  {
    id: "אמונים-699576410",
    label: "אמונים / Emunim",
    location: { lat: 31.743772, lng: 34.676060 },
  },
  {
    id: "אמירים-278474476",
    label: "אמירים / Amirim",
    location: { lat: 32.937496, lng: 35.449997 },
  },
  {
    id: "אמירים-616548433",
    label: "אמירים / Amirim",
    location: { lat: 32.938306, lng: 35.449036 },
  },
  {
    id: "אמנון-372902583",
    label: "אמנון / Amnun",
    location: { lat: 32.904348, lng: 35.570509 },
  },
  {
    id: "אמנון-90524404",
    label: "אמנון / Amnun",
    location: { lat: 32.905552, lng: 35.573005 },
  },
  {
    id: "אמציה-278477282",
    label: "אמציה / Amazya",
    location: { lat: 31.532467, lng: 34.914307 },
  },
  {
    id: "אמציה-91731407",
    label: "אמציה / Amazya",
    location: { lat: 31.532175, lng: 34.914736 },
  },
  {
    id: "אניעם-495939438",
    label: "אניעם / Aniam",
    location: { lat: 32.956871, lng: 35.739762 },
  },
  {
    id: "אניעם-92005677",
    label: "אניעם / Aniam",
    location: { lat: 32.957263, lng: 35.741174 },
  },
  {
    id: "אעצם-1077230520",
    label: "אעצם / Aazem",
    location: { lat: 31.294537, lng: 34.901081 },
  },
  {
    id: "אפיק-1656011600",
    label: "אפיק / Afik",
    location: { lat: 32.778842, lng: 35.701330 },
  },
  {
    id: "אפיק-91667896",
    label: "אפיק / Afik",
    location: { lat: 32.778858, lng: 35.701569 },
  },
  {
    id: "אפיקים-278474378",
    label: "אפיקים / Afikim",
    location: { lat: 32.681369, lng: 35.578332 },
  },
  {
    id: "אפיקים-642173362",
    label: "אפיקים / Afikim",
    location: { lat: 32.680530, lng: 35.576791 },
  },
  {
    id: "אפק-275589907",
    label: "אפק / Afek",
    location: { lat: 32.840165, lng: 35.127891 },
  },
  {
    id: "אפק-91370121",
    label: "אפק / Afek",
    location: { lat: 32.839340, lng: 35.126755 },
  },
  {
    id: "ארבל-10285674412",
    label: "ארבל / Arbel",
    location: { lat: 32.812079, lng: 35.483928 },
  },
  {
    id: "ארבל-618045228",
    label: "ארבל / Arbel",
    location: { lat: 32.812781, lng: 35.482726 },
  },
  {
    id: "ארז-278476260",
    label: "ארז / Erez",
    location: { lat: 31.560500, lng: 34.566631 },
  },
  {
    id: "ארז-92380281",
    label: "ארז / Erez",
    location: { lat: 31.560639, lng: 34.566087 },
  },
  {
    id: "ארסוף-4708450087",
    label: "ארסוף / Arsuf",
    location: { lat: 32.214127, lng: 34.816815 },
  },
  {
    id: "ארסוף-85392469",
    label: "ארסוף / Arsuf",
    location: { lat: 32.213741, lng: 34.816478 },
  },
  {
    id: "ארסוף-קדם-8922654099",
    label: "ארסוף קדם / Arsuf Kedem",
    location: { lat: 32.206018, lng: 34.820678 },
  },
  {
    id: "ארסוף-קדם-85321343",
    label: "ארסוף קדם / Arsuf Kedem",
    location: { lat: 32.204400, lng: 34.820273 },
  },
  {
    id: "אשבול-278478521",
    label: "אשבול / Eshbol",
    location: { lat: 31.447502, lng: 34.666435 },
  },
  {
    id: "אשבול-665837697",
    label: "אשבול / Eshbol",
    location: { lat: 31.447274, lng: 34.665097 },
  },
  {
    id: "אשבל-479349409",
    label: "אשבל / Eshbal",
    location: { lat: 32.876801, lng: 35.304974 },
  },
  {
    id: "אשבל-13625093625",
    label: "אשבל / Eshbal",
    location: { lat: 32.876962, lng: 35.305436 },
  },
  {
    id: "אשבל-668559788",
    label: "אשבל / Eshbal",
    location: { lat: 32.876352, lng: 35.304629 },
  },
  {
    id: "אשדוד-196303399",
    label: "אשדוד / Ashdod",
    location: { lat: 31.797731, lng: 34.652992 },
  },
  {
    id: "אשדוד-1380013",
    label: "אשדוד / Ashdod",
    location: { lat: 31.812990, lng: 34.659535 },
  },
  {
    id: "אשדוד-18438173",
    label: "אשדוד / Ashdod",
    location: { lat: 31.794689, lng: 34.645359 },
  },
  {
    id: "אשדות-יעקב-איחוד-278474097",
    label: "אשדות יעקב איחוד / Ashdot Yaakov Ihud",
    location: { lat: 32.658163, lng: 35.581143 },
  },
  {
    id: "אשדות-יעקב-איחוד-641997839",
    label: "אשדות יעקב איחוד / Ashdot Yaakov Ihud",
    location: { lat: 32.657474, lng: 35.579167 },
  },
  {
    id: "אשדות-יעקב-מאוחד-278475692",
    label: "אשדות יעקב מאוחד / Ashdot Yaakov Meuhad",
    location: { lat: 32.662065, lng: 35.582001 },
  },
  {
    id: "אשדות-יעקב-מאוחד-641997831",
    label: "אשדות יעקב מאוחד / Ashdot Yaakov Meuhad",
    location: { lat: 32.662506, lng: 35.583766 },
  },
  {
    id: "אשחר-278477728",
    label: "אשחר / Eshchar",
    location: { lat: 32.885117, lng: 35.300189 },
  },
  {
    id: "אשחר-967359366",
    label: "אשחר / Eshchar",
    location: { lat: 32.886147, lng: 35.300520 },
  },
  {
    id: "אשל-הנשיא-968128829",
    label: "אשל הנשיא",
    location: { lat: 31.326013, lng: 34.697832 },
  },
  {
    id: "אשל-הנשיא-278475586",
    label: "אשל הנשיא / Eshel HaNasi",
    location: { lat: 31.325341, lng: 34.697785 },
  },
  {
    id: "אשלים-278473111",
    label: "אשלים / Ashalim",
    location: { lat: 30.963891, lng: 34.700274 },
  },
  {
    id: "אשלים-967544264",
    label: "אשלים / Ashalim",
    location: { lat: 30.964389, lng: 34.698994 },
  },
  {
    id: "אשקלון-278476881",
    label: "אשקלון / Ashkelon",
    location: { lat: 31.665319, lng: 34.565044 },
  },
  {
    id: "אשקלון-1213129792",
    label: "אשקלון / Ashkelon",
    location: { lat: 31.674146, lng: 34.577192 },
  },
  {
    id: "אשרת-1129399070",
    label: "אשרת / Oshrat",
    location: { lat: 32.971733, lng: 35.156496 },
  },
  {
    id: "אשרת-968091698",
    label: "אשרת / Oshrat",
    location: { lat: 32.971491, lng: 35.157248 },
  },
  {
    id: "אשתאול-82628857",
    label: "אשתאול / Eshta'ol",
    location: { lat: 31.780971, lng: 35.009744 },
  },
  {
    id: "אשתאול-278476456",
    label: "אשתאול / Eshtaol",
    location: { lat: 31.780195, lng: 35.009788 },
  },
  {
    id: "ב-ית-ז-י-יד-783900830",
    label: "בֵּית זַיִיד / Beit Zaid",
    location: { lat: 32.702046, lng: 35.130804 },
  },
  {
    id: "באט-אל-סראיעה-4867785197",
    label: "באט אל-סראיעה / Bat Al Saraya'ah",
    location: { lat: 31.259319, lng: 35.025128 },
  },
  {
    id: "באקה-אל-גרביה-278372186",
    label: "באקה אל-גרביה / Baqa al Gharbiyya",
    location: { lat: 32.419714, lng: 35.042831 },
  },
  {
    id: "באקה-אל-גרביה-85787867",
    label: "באקה אל-גרביה / Baqa al Gharbiyya",
    location: { lat: 32.416914, lng: 35.040938 },
  },
  {
    id: "באר-אורה-278476306",
    label: "באר אורה / Beer Ora",
    location: { lat: 29.710175, lng: 34.986604 },
  },
  {
    id: "באר-גנים-1317200446",
    label: "באר גנים / Be'er Ganim",
    location: { lat: 31.700046, lng: 34.610653 },
  },
  {
    id: "באר-גנים-117322322",
    label: "באר גנים / Beer Ganim",
    location: { lat: 31.700661, lng: 34.608009 },
  },
  {
    id: "באר-טוביה-278476852",
    label: "באר טוביה / Beer Tuvia",
    location: { lat: 31.733876, lng: 34.726290 },
  },
  {
    id: "באר-טוביה-92032512",
    label: "באר טוביה / Beer Tuvya",
    location: { lat: 31.733563, lng: 34.720130 },
  },
  {
    id: "באר-יעקב-245976052",
    label: "באר יעקב / Beer Yaakov",
    location: { lat: 31.944353, lng: 34.839865 },
  },
  {
    id: "באר-יעקב-548353223",
    label: "באר יעקב / Beer Yaaqov",
    location: { lat: 31.941641, lng: 34.839174 },
  },
  {
    id: "באר-מילכה-970308195",
    label: "באר מילכה / Be'er Milka",
    location: { lat: 30.932846, lng: 34.407041 },
  },
  {
    id: "באר-מילכה-83365456",
    label: "באר מילכה / Be'er Milka",
    location: { lat: 30.933337, lng: 34.406519 },
  },
  {
    id: "באר-מנוחה-278475925",
    label: "באר מנוחה / Beer Menuha",
    location: { lat: 30.307571, lng: 35.135270 },
  },
  {
    id: "באר-שבע-738723480",
    label: "באר שבע / Beersheba",
    location: { lat: 31.245744, lng: 34.792518 },
  },
  {
    id: "באר-שבע-675627797",
    label: "באר-שבע / Be'er Sheva",
    location: { lat: 31.250524, lng: 34.788877 },
  },
  {
    id: "בארות-יצחק-278478591",
    label: "בארות יצחק / Be'erot Yitzhak",
    location: { lat: 32.039366, lng: 34.910911 },
  },
  {
    id: "בארות-יצחק-616290951",
    label: "בארות יצחק / Beerot Yizhaq",
    location: { lat: 32.041236, lng: 34.910333 },
  },
  {
    id: "בארותיים-278371787",
    label: "בארותיים / Be'erotaim",
    location: { lat: 32.321889, lng: 34.982891 },
  },
  {
    id: "בארותיים-84676534",
    label: "בארותיים / Be'erotaim",
    location: { lat: 32.321518, lng: 34.983233 },
  },
  {
    id: "בארי-278475463",
    label: "בארי / Beeri",
    location: { lat: 31.424162, lng: 34.491116 },
  },
  {
    id: "בארי-38918700",
    label: "בארי / Beeri",
    location: { lat: 31.424173, lng: 34.490961 },
  },
  {
    id: "בוסתן-הגליל-278473724",
    label: "בוסתן הגליל / Bustan HaGalil",
    location: { lat: 32.950523, lng: 35.081779 },
  },
  {
    id: "בוסתן-הגליל-609305475",
    label: "בוסתן הגליל / Bustan HaGalil",
    location: { lat: 32.951295, lng: 35.083132 },
  },
  {
    id: "בוקעאתא-1657261912",
    label: "בוקעאתא / Buq'atha",
    location: { lat: 33.200760, lng: 35.777989 },
  },
  {
    id: "בוקעאתא-602253097",
    label: "בוקעאתא / Buq'atha",
    location: { lat: 33.200871, lng: 35.779421 },
  },
  {
    id: "בורגתה-278371891",
    label: "בורגתה / Burgata",
    location: { lat: 32.326473, lng: 34.962913 },
  },
  {
    id: "בורגתה-79322883",
    label: "בורגתה / Burgata",
    location: { lat: 32.325246, lng: 34.962363 },
  },
  {
    id: "בחן-705953678",
    label: "בחן / Bachan",
    location: { lat: 32.351334, lng: 35.020070 },
  },
  {
    id: "בחן-278472755",
    label: "בחן / Bahan",
    location: { lat: 32.351007, lng: 35.019131 },
  },
  {
    id: "בטחה-707396589",
    label: "בטחה / Bitcha",
    location: { lat: 31.334956, lng: 34.633223 },
  },
  {
    id: "בטחה-278470324",
    label: "בטחה / Bitha",
    location: { lat: 31.334280, lng: 34.634492 },
  },
  {
    id: "ביאדה-1068786999",
    label: "ביאדה / Bayada",
    location: { lat: 32.556735, lng: 35.165852 },
  },
  {
    id: "ביאדה-92001538",
    label: "ביאדה / Bayada",
    location: { lat: 32.557710, lng: 35.165701 },
  },
  {
    id: "ביצרון-278473126",
    label: "ביצרון / Bitzaron",
    location: { lat: 31.795053, lng: 34.739279 },
  },
  {
    id: "ביצרון-92387601",
    label: "ביצרון / Bitzaron",
    location: { lat: 31.796494, lng: 34.731818 },
  },
  {
    id: "ביר-א-סיכה-83621588",
    label: "ביר א-סיכה / Bir a Sika",
    location: { lat: 32.364501, lng: 35.031529 },
  },
  {
    id: "ביר-א-סיכה-278477874",
    label: "ביר א-סיכה / Bir es Sikka",
    location: { lat: 32.364086, lng: 35.031597 },
  },
  {
    id: "ביר-אל-חמאם-4867604104",
    label: "ביר אל חמאם / Bir Al Hamam",
    location: { lat: 31.231474, lng: 34.900397 },
  },
  {
    id: "ביר-אל-מכסור-278473559",
    label: "ביר אל מכסור / Bir al-Maksur",
    location: { lat: 32.775665, lng: 35.221691 },
  },
  {
    id: "ביר-אל-מכסור-615253165",
    label: "ביר אל מכסור / Bir al-Maksur",
    location: { lat: 32.777903, lng: 35.222622 },
  },
  {
    id: "ביר-אל-משאש-4867897933",
    label: "ביר אל-משאש / Bir Al Mshash",
    location: { lat: 31.194702, lng: 34.954377 },
  },
  {
    id: "ביר-הדאג-1075632005",
    label: "ביר הדאג' / Bir Hadaj",
    location: { lat: 31.026263, lng: 34.703102 },
  },
  {
    id: "ביר-הדאג-3974414",
    label: "ביר הדאג' / Bir Hadaj",
    location: { lat: 31.030379, lng: 34.716045 },
  },
  {
    id: "ביריה-278474399",
    label: "ביריה / Birya",
    location: { lat: 32.977588, lng: 35.500649 },
  },
  {
    id: "ביריה-969477827",
    label: "ביריה / Birya",
    location: { lat: 32.978776, lng: 35.500003 },
  },
  {
    id: "בית-אורן-278473938",
    label: "בית אורן / Beit Oren",
    location: { lat: 32.730556, lng: 35.005556 },
  },
  {
    id: "בית-אורן-638800169",
    label: "בית אורן / Beit Oren",
    location: { lat: 32.730553, lng: 35.004049 },
  },
  {
    id: "בית-אלעזרי-278473955",
    label: "בית אלעזרי / Beit Elazari",
    location: { lat: 31.846084, lng: 34.803053 },
  },
  {
    id: "בית-אלעזרי-385852065",
    label: "בית אלעזרי / Beit Elazari",
    location: { lat: 31.844432, lng: 34.802232 },
  },
  {
    id: "בית-אלפא-278477069",
    label: "בית אלפא / Beit Alfa",
    location: { lat: 32.516000, lng: 35.431286 },
  },
  {
    id: "בית-אלפא-81373846",
    label: "בית אלפא / Beit Alpha",
    location: { lat: 32.517011, lng: 35.432306 },
  },
  {
    id: "בית-ג-מל-5593461170",
    label: "בית ג'מל / Beit Jamal",
    location: { lat: 31.724844, lng: 34.976149 },
  },
  {
    id: "בית-ג-ן-278476247",
    label: "בית ג'ן / Beit Jann",
    location: { lat: 32.964474, lng: 35.378143 },
  },
  {
    id: "בית-ג-ן-612069157",
    label: "בית ג'ן / Beit Jann",
    location: { lat: 32.965369, lng: 35.376340 },
  },
  {
    id: "בית-גוברין-278477420",
    label: "בית גוברין / Beit Guvrin",
    location: { lat: 31.612319, lng: 34.896416 },
  },
  {
    id: "בית-גוברין-6232909",
    label: "בית גוברין / Beit Guvrin",
    location: { lat: 31.612564, lng: 34.896732 },
  },
  {
    id: "בית-גמליאל-278474198",
    label: "בית גמליאל / Beit Gamliel",
    location: { lat: 31.855360, lng: 34.762636 },
  },
  {
    id: "בית-גמליאל-7184219",
    label: "בית גמליאל / Beit Gamliel",
    location: { lat: 31.858219, lng: 34.761574 },
  },
  {
    id: "בית-דגן-278477130",
    label: "בית דגן / Beit Dagan",
    location: { lat: 32.001945, lng: 34.830163 },
  },
  {
    id: "בית-דגן-800289869",
    label: "בית דגן / Beit Dagan",
    location: { lat: 31.999114, lng: 34.830406 },
  },
  {
    id: "בית-הגדי-278475589",
    label: "בית הגדי / Beit HaGaddi",
    location: { lat: 31.423909, lng: 34.606739 },
  },
  {
    id: "בית-הגדי-651936228",
    label: "בית הגדי / Beit HaGaddi",
    location: { lat: 31.424735, lng: 34.607805 },
  },
  {
    id: "בית-הלוי-278473941",
    label: "בית הלוי / Beit HaLevi",
    location: { lat: 32.353505, lng: 34.931254 },
  },
  {
    id: "בית-הלוי-700671797",
    label: "בית הלוי / Beit HaLevi",
    location: { lat: 32.354562, lng: 34.931464 },
  },
  {
    id: "בית-הלל-278473946",
    label: "בית הלל / Beit Hillel",
    location: { lat: 33.208301, lng: 35.606928 },
  },
  {
    id: "בית-הלל-578895080",
    label: "בית הלל / Beit Hillel",
    location: { lat: 33.208091, lng: 35.604399 },
  },
  {
    id: "בית-העמק-278478072",
    label: "בית העמק / Beit HaEmek",
    location: { lat: 32.970492, lng: 35.146137 },
  },
  {
    id: "בית-העמק-97588619",
    label: "בית העמק / Beit HaEmek",
    location: { lat: 32.971488, lng: 35.144878 },
  },
  {
    id: "בית-השיטה-278476254",
    label: "בית השיטה / Beit HaShita",
    location: { lat: 32.551077, lng: 35.438218 },
  },
  {
    id: "בית-השיטה-615781053",
    label: "בית השיטה / Beit HaShita",
    location: { lat: 32.551133, lng: 35.439919 },
  },
  {
    id: "בית-זייד-7325053792",
    label: "בית זייד / Beit Zaid",
    location: { lat: 32.702147, lng: 35.131291 },
  },
  {
    id: "בית-זית-892358974",
    label: "בית זית / Beit Zayit",
    location: { lat: 31.782289, lng: 35.161660 },
  },
  {
    id: "בית-זית-278477865",
    label: "בית זית / Bet Zayit",
    location: { lat: 31.782581, lng: 35.159325 },
  },
  {
    id: "בית-זרע-278478917",
    label: "בית זרע / Beit Zera",
    location: { lat: 32.688291, lng: 35.573367 },
  },
  {
    id: "בית-זרע-642173367",
    label: "בית זרע / Beit Zera",
    location: { lat: 32.688212, lng: 35.573493 },
  },
  {
    id: "בית-חלקיה-707231779",
    label: "בית חלקיה / Beit Chilkiya",
    location: { lat: 31.792946, lng: 34.811399 },
  },
  {
    id: "בית-חלקיה-278475798",
    label: "בית חלקיה / Beit Hilkia",
    location: { lat: 31.792675, lng: 34.810805 },
  },
  {
    id: "בית-חנן-278477954",
    label: "בית חנן / Beit Hanan",
    location: { lat: 31.933758, lng: 34.774008 },
  },
  {
    id: "בית-חנן-705372319",
    label: "בית חנן / Beit Hanan",
    location: { lat: 31.934712, lng: 34.772574 },
  },
  {
    id: "בית-חנניה-278478181",
    label: "בית חנניה / Beit Hananya",
    location: { lat: 32.528262, lng: 34.925030 },
  },
  {
    id: "בית-חנניה-84678880",
    label: "בית חנניה / Beit Hananya",
    location: { lat: 32.528069, lng: 34.925476 },
  },
  {
    id: "בית-חרות-278456504",
    label: "בית חרות / Beit Herut",
    location: { lat: 32.375848, lng: 34.874136 },
  },
  {
    id: "בית-חרות-80417761",
    label: "בית חרות / Beit Herut",
    location: { lat: 32.375334, lng: 34.873496 },
  },
  {
    id: "בית-חשמונאי-278474498",
    label: "בית חשמונאי / Beit Hashmonai",
    location: { lat: 31.888013, lng: 34.919009 },
  },
  {
    id: "בית-חשמונאי-969609777",
    label: "בית חשמונאי / Beit Hashmonay",
    location: { lat: 31.888935, lng: 34.918769 },
  },
  {
    id: "בית-יהושע-246250328",
    label: "בית יהושע / Beit Yehoshua",
    location: { lat: 32.259292, lng: 34.866002 },
  },
  {
    id: "בית-יהושע-698914649",
    label: "בית יהושע / Beit Yehoshua",
    location: { lat: 32.261016, lng: 34.865516 },
  },
  {
    id: "בית-יוסף-278473130",
    label: "בית יוסף / Beit Yosef",
    location: { lat: 32.558813, lng: 35.552315 },
  },
  {
    id: "בית-יוסף-617401754",
    label: "בית יוסף / Beit Yosef",
    location: { lat: 32.559724, lng: 35.551414 },
  },
  {
    id: "בית-ינאי-278470116",
    label: "בית ינאי / Beit Yanai",
    location: { lat: 32.377527, lng: 34.862963 },
  },
  {
    id: "בית-ינאי-80415423",
    label: "בית ינאי / Beit Yanai",
    location: { lat: 32.377323, lng: 34.862521 },
  },
  {
    id: "בית-יצחק-שער-חפר-1098056076",
    label: "בית יצחק - שער חפר / Beit Yizhaq - Shaar Hefer",
    location: { lat: 32.334565, lng: 34.890545 },
  },
  {
    id: "בית-יצחק-שער-חפר-94521046",
    label: "בית יצחק - שער חפר / Beit Yizhaq - Shaar Hefer",
    location: { lat: 32.333994, lng: 34.890690 },
  },
  {
    id: "בית-לחם-הגלילית-610903176",
    label: "בית לחם הגלילית / Beit Lehem HaGelilit",
    location: { lat: 32.735038, lng: 35.192084 },
  },
  {
    id: "בית-לחם-הגלילית-278473076",
    label: "בית לחם הגלילית / Bethlehem of Galilee",
    location: { lat: 32.734556, lng: 35.189056 },
  },
  {
    id: "בית-מאיר-246826967",
    label: "בית מאיר / Beit Meir",
    location: { lat: 31.793883, lng: 35.036083 },
  },
  {
    id: "בית-מאיר-87353071",
    label: "בית מאיר / Beit Meir",
    location: { lat: 31.794270, lng: 35.037717 },
  },
  {
    id: "בית-נחמיה-278477751",
    label: "בית נחמיה / Beit Nehemia",
    location: { lat: 31.975811, lng: 34.955084 },
  },
  {
    id: "בית-נחמיה-639486665",
    label: "בית נחמיה / Beit Nehemya",
    location: { lat: 31.977401, lng: 34.954583 },
  },
  {
    id: "בית-ניר-278474916",
    label: "בית ניר / Beit Nir",
    location: { lat: 31.647293, lng: 34.874131 },
  },
  {
    id: "בית-ניר-82627709",
    label: "בית ניר / Beit Nir",
    location: { lat: 31.648388, lng: 34.873663 },
  },
  {
    id: "בית-נקופה-278473353",
    label: "בית נקופה / Beit Neqofa",
    location: { lat: 31.802857, lng: 35.125269 },
  },
  {
    id: "בית-נקופה-897897992",
    label: "בית נקופה / Beit Neqofa",
    location: { lat: 31.804740, lng: 35.125578 },
  },
  {
    id: "בית-ספר-חקלאי-עין-כרם-8307131111",
    label: "בית ספר חקלאי עין כרם / Ein Kerem Agricultural School",
    location: { lat: 31.778755, lng: 35.153190 },
  },
  {
    id: "בית-עובד-896575077",
    label: "בית עובד / Beit Oved",
    location: { lat: 31.921867, lng: 34.773993 },
  },
  {
    id: "בית-עובד-278475623",
    label: "בית עובד / Bet Oved",
    location: { lat: 31.921288, lng: 34.773789 },
  },
  {
    id: "בית-עוזיאל-278477181",
    label: "בית עוזיאל / Beit Uziel",
    location: { lat: 31.869397, lng: 34.905170 },
  },
  {
    id: "בית-עוזיאל-587310355",
    label: "בית עוזיאל / Beit Uziel",
    location: { lat: 31.870499, lng: 34.904630 },
  },
  {
    id: "בית-עזרא-278475598",
    label: "בית עזרא / Beit Ezra",
    location: { lat: 31.736631, lng: 34.656377 },
  },
  {
    id: "בית-עזרא-699207871",
    label: "בית עזרא / Beit Ezra",
    location: { lat: 31.737014, lng: 34.654678 },
  },
  {
    id: "בית-עריף-278478301",
    label: "בית עריף / Beit Arif",
    location: { lat: 31.991635, lng: 34.933807 },
  },
  {
    id: "בית-עריף-587830323",
    label: "בית עריף / Beit Arif",
    location: { lat: 31.995037, lng: 34.934939 },
  },
  {
    id: "בית-פלט-4867898793",
    label: "בית פלט / Bait Pelet",
    location: { lat: 31.192881, lng: 34.919620 },
  },
  {
    id: "בית-פלט-4713049829",
    label: "בית פלט / Beit Pelt",
    location: { lat: 31.185885, lng: 34.935753 },
  },
  {
    id: "בית-קמה-278473960",
    label: "בית קמה / Beit Kama",
    location: { lat: 31.447541, lng: 34.762287 },
  },
  {
    id: "בית-קמה-665835876",
    label: "בית קמה / Beit Kama",
    location: { lat: 31.447650, lng: 34.761060 },
  },
  {
    id: "בית-קשת-278475759",
    label: "בית קשת / Beit Keshet",
    location: { lat: 32.718419, lng: 35.395474 },
  },
  {
    id: "בית-קשת-618609023",
    label: "בית קשת / Beit Keshet",
    location: { lat: 32.718127, lng: 35.394178 },
  },
  {
    id: "בית-רבן-גבעת-וושינגטון-278472965",
    label: "בית רבן - גבעת וושינגטון / Bet Rabban - Givat Washington",
    location: { lat: 31.816850, lng: 34.728124 },
  },
  {
    id: "בית-רבן-גבעת-וושינגטון-92387387",
    label: "בית רבן - גבעת וושינגטון / Bet Rabban - Givat Washington",
    location: { lat: 31.816982, lng: 34.728748 },
  },
  {
    id: "בית-רימון-278473029",
    label: "בית רימון / Beit Rimmon",
    location: { lat: 32.781947, lng: 35.327784 },
  },
  {
    id: "בית-רימון-91560513",
    label: "בית רימון / Beit Rimmon",
    location: { lat: 32.780302, lng: 35.327824 },
  },
  {
    id: "בית-שאן-278473514",
    label: "בית שאן / Beit Shean",
    location: { lat: 32.496752, lng: 35.497302 },
  },
  {
    id: "בית-שאן-629652796",
    label: "בית שאן / Beit Shean",
    location: { lat: 32.495959, lng: 35.497208 },
  },
  {
    id: "בית-שיקמה-278476359",
    label: "בית שיקמה / Beit Shikma",
    location: { lat: 31.637479, lng: 34.610456 },
  },
  {
    id: "בית-שמש-316019781",
    label: "בית שמש / Beit Shemesh",
    location: { lat: 31.746214, lng: 34.988683 },
  },
  {
    id: "בית-שמש-1379449",
    label: "בית שמש / Beit Shemesh",
    location: { lat: 31.731312, lng: 34.987129 },
  },
  {
    id: "בית-שערים-278476512",
    label: "בית שערים / Beit Shearim",
    location: { lat: 32.696167, lng: 35.179498 },
  },
  {
    id: "בית-שערים-617006466",
    label: "בית שערים / Beit Shearim",
    location: { lat: 32.696496, lng: 35.176577 },
  },
  {
    id: "בית-שקמה-698866240",
    label: "בית שקמה / Beit Shikma",
    location: { lat: 31.636575, lng: 34.608542 },
  },
  {
    id: "ביתן-אהרן-278473908",
    label: "ביתן אהרן / Bitan Aharon",
    location: { lat: 32.366038, lng: 34.869300 },
  },
  {
    id: "ביתן-אהרן-80423868",
    label: "ביתן אהרן / Bitan Aharon",
    location: { lat: 32.365654, lng: 34.868967 },
  },
  {
    id: "בלפוריה-278477358",
    label: "בלפוריה / Balfouriyya",
    location: { lat: 32.630290, lng: 35.297068 },
  },
  {
    id: "בלפוריה-617080987",
    label: "בלפוריה / Balfouriyya",
    location: { lat: 32.630335, lng: 35.295958 },
  },
  {
    id: "בן-זכאי-278477101",
    label: "בן זכאי / Ben Zakkay",
    location: { lat: 31.856884, lng: 34.729583 },
  },
  {
    id: "בן-זכאי-406822716",
    label: "בן זכאי / Ben Zakkay",
    location: { lat: 31.856212, lng: 34.728749 },
  },
  {
    id: "בן-עמי-696905232",
    label: "בן עמי / Ben Ami",
    location: { lat: 33.006733, lng: 35.122856 },
  },
  {
    id: "בן-עמי-278476383",
    label: "בן עמי / Ben Ammi",
    location: { lat: 33.004219, lng: 35.124178 },
  },
  {
    id: "בן-שמן-278473977",
    label: "בן שמן / Ben Shemen",
    location: { lat: 31.952279, lng: 34.921944 },
  },
  {
    id: "בן-שמן-586652593",
    label: "בן שמן / Ben Shemen",
    location: { lat: 31.952003, lng: 34.923397 },
  },
  {
    id: "בני-ברק-277528108",
    label: "בני ברק / Bnei Brak",
    location: { lat: 32.087390, lng: 34.832438 },
  },
  {
    id: "בני-ברק-1382817",
    label: "בני ברק / Bnei Brak",
    location: { lat: 32.088718, lng: 34.835359 },
  },
  {
    id: "בני-דקלים-908422157",
    label: "בני דקלים / Bney Dekalim",
    location: { lat: 31.519197, lng: 34.918122 },
  },
  {
    id: "בני-דקלים-1344828075",
    label: "בני דקלים / Bney Dkalim",
    location: { lat: 31.517485, lng: 34.919914 },
  },
  {
    id: "בני-דרום-278477765",
    label: "בני דרום / Bnei Darom",
    location: { lat: 31.820663, lng: 34.691576 },
  },
  {
    id: "בני-דרום-92388055",
    label: "בני דרום / Bnei Darom",
    location: { lat: 31.819778, lng: 34.692197 },
  },
  {
    id: "בני-דרור-278477136",
    label: "בני דרור / Bney Dror",
    location: { lat: 32.261862, lng: 34.900238 },
  },
  {
    id: "בני-דרור-79317077",
    label: "בני דרור / Bney Dror",
    location: { lat: 32.262311, lng: 34.898952 },
  },
  {
    id: "בני-יהודה-803214697",
    label: "בני יהודה / Bnay Yehuda",
    location: { lat: 32.797901, lng: 35.689616 },
  },
  {
    id: "בני-יהודה-1656011601",
    label: "בני יהודה / Bnei Yehuda",
    location: { lat: 32.798415, lng: 35.690215 },
  },
  {
    id: "בני-נצרים-119779014",
    label: "בני נצרים / Bnay Netzarim",
    location: { lat: 31.141734, lng: 34.315061 },
  },
  {
    id: "בני-נצרים-1344853177",
    label: "בני נצרים / Bnei Netzarim",
    location: { lat: 31.140986, lng: 34.314730 },
  },
  {
    id: "בני-עטרות-278473953",
    label: "בני עטרות / Bnei Atarot",
    location: { lat: 32.023564, lng: 34.911872 },
  },
  {
    id: "בני-עטרות-590229549",
    label: "בני עטרות / Bnei Atarot",
    location: { lat: 32.023415, lng: 34.915056 },
  },
  {
    id: "בני-עי-ש-278472981",
    label: "בני עי\"ש / Bnei Aish",
    location: { lat: 31.789195, lng: 34.760599 },
  },
  {
    id: "בני-עי-ש-630771626",
    label: "בני עי\"ש / Bnei Aish",
    location: { lat: 31.788601, lng: 34.759369 },
  },
  {
    id: "בני-ציון-82883927",
    label: "בני ציון / Bnay Zion",
    location: { lat: 32.218848, lng: 34.868954 },
  },
  {
    id: "בני-ציון-278475682",
    label: "בני ציון / Bnei Zion",
    location: { lat: 32.220359, lng: 34.868671 },
  },
  {
    id: "בני-ראם-82284914",
    label: "בני ראם / Bnay Re'em",
    location: { lat: 31.768976, lng: 34.791525 },
  },
  {
    id: "בני-ראם-278476480",
    label: "בני ראם / Bnei Reem",
    location: { lat: 31.769785, lng: 34.790650 },
  },
  {
    id: "בניה-278475581",
    label: "בניה / Benaya",
    location: { lat: 31.843498, lng: 34.753611 },
  },
  {
    id: "בניה-84014276",
    label: "בניה / Bnaya",
    location: { lat: 31.843772, lng: 34.750728 },
  },
  {
    id: "בנימינה-278478579",
    label: "בנימינה / Binyamina",
    location: { lat: 32.520289, lng: 34.943586 },
  },
  {
    id: "בנימינה-935948186",
    label: "בנימינה / Binyamina",
    location: { lat: 32.520406, lng: 34.945312 },
  },
  {
    id: "בסמת-טבעון-278478706",
    label: "בסמת טבעון / Basmat Tab'un",
    location: { lat: 32.736228, lng: 35.154650 },
  },
  {
    id: "בסמת-טבעון-698626709",
    label: "בסמת טבעון / Basmat Tabun",
    location: { lat: 32.736564, lng: 35.155820 },
  },
  {
    id: "בעינה-נג-ידת-278478116",
    label: "בעינה נג'ידת / Bu'eine Nujeidat",
    location: { lat: 32.805626, lng: 35.364674 },
  },
  {
    id: "בעינה-נג-ידת-612365629",
    label: "בעינה נג'ידת / Bueina Najidat",
    location: { lat: 32.807628, lng: 35.369327 },
  },
  {
    id: "בענה-278478216",
    label: "בענה / Bi'ina",
    location: { lat: 32.928059, lng: 35.272169 },
  },
  {
    id: "בענה-614173564",
    label: "בענה / Bi'na",
    location: { lat: 32.927970, lng: 35.271630 },
  },
  {
    id: "בצרה-268703637",
    label: "בצרה / Bazra",
    location: { lat: 32.214324, lng: 34.877992 },
  },
  {
    id: "בצרה-82883926",
    label: "בצרה / Bazra",
    location: { lat: 32.212320, lng: 34.877509 },
  },
  {
    id: "בצת-650594084",
    label: "בצת / Betzet",
    location: { lat: 33.071108, lng: 35.132375 },
  },
  {
    id: "בצת-278477171",
    label: "בצת / Bezet",
    location: { lat: 33.070845, lng: 35.136107 },
  },
  {
    id: "בקוע-278470600",
    label: "בקוע / Bkoa",
    location: { lat: 31.829428, lng: 34.927040 },
  },
  {
    id: "בקוע-124774273",
    label: "בקוע / Bkoa",
    location: { lat: 31.828561, lng: 34.924477 },
  },
  {
    id: "בר-גיורא-278478609",
    label: "בר גיורא / Bar Giyora",
    location: { lat: 31.729821, lng: 35.072653 },
  },
  {
    id: "בר-גיורא-87308164",
    label: "בר גיורא / Bar Giyyora",
    location: { lat: 31.729719, lng: 35.071437 },
  },
  {
    id: "בר-יוחאי-350315721",
    label: "בר יוחאי / Bar Yohai",
    location: { lat: 32.997003, lng: 35.448117 },
  },
  {
    id: "בר-יוחאי-971608333",
    label: "בר יוחאי / Bar Yohai",
    location: { lat: 32.997104, lng: 35.448517 },
  },
  {
    id: "ברור-חיל-278472977",
    label: "ברור חיל / Beror Hayil",
    location: { lat: 31.559790, lng: 34.649156 },
  },
  {
    id: "ברור-חיל-92088603",
    label: "ברור חיל / Beror Hayil",
    location: { lat: 31.558718, lng: 34.648202 },
  },
  {
    id: "ברוש-278473083",
    label: "ברוש / Brosh",
    location: { lat: 31.370654, lng: 34.635086 },
  },
  {
    id: "ברוש-711025850",
    label: "ברוש / Brosh",
    location: { lat: 31.370000, lng: 34.632540 },
  },
  {
    id: "ברטעה-278476968",
    label: "ברטעה / Barta`a",
    location: { lat: 32.474336, lng: 35.090335 },
  },
  {
    id: "ברכיה-278474337",
    label: "ברכיה / Berekhya",
    location: { lat: 31.667826, lng: 34.626820 },
  },
  {
    id: "ברכיה-698782864",
    label: "ברכיה / Birkiya",
    location: { lat: 31.670937, lng: 34.624469 },
  },
  {
    id: "ברעם-278474853",
    label: "ברעם / Bar'am",
    location: { lat: 33.059084, lng: 35.433945 },
  },
  {
    id: "ברעם-690152383",
    label: "ברעם / Baram",
    location: { lat: 33.057570, lng: 35.434432 },
  },
  {
    id: "ברק-278474239",
    label: "ברק / Barak",
    location: { lat: 32.542467, lng: 35.265381 },
  },
  {
    id: "ברק-617494236",
    label: "ברק / Barak",
    location: { lat: 32.542325, lng: 35.264607 },
  },
  {
    id: "ברקאי-278471497",
    label: "ברקאי / Barkai",
    location: { lat: 32.475134, lng: 35.030025 },
  },
  {
    id: "ברקאי-84676241",
    label: "ברקאי / Barkai",
    location: { lat: 32.474884, lng: 35.028676 },
  },
  {
    id: "ברקת-278478012",
    label: "ברקת / Bareket",
    location: { lat: 32.018853, lng: 34.943779 },
  },
  {
    id: "ברקת-616766395",
    label: "ברקת / Bareket",
    location: { lat: 32.015907, lng: 34.945340 },
  },
  {
    id: "בת-הדר-1098494151",
    label: "בת הדר / Bat Hadar",
    location: { lat: 31.646519, lng: 34.596033 },
  },
  {
    id: "בת-הדר-94581935",
    label: "בת הדר / Bat Hadar",
    location: { lat: 31.646144, lng: 34.596171 },
  },
  {
    id: "בת-חן-278455785",
    label: "בת חן / Bat Hen",
    location: { lat: 32.360269, lng: 34.872328 },
  },
  {
    id: "בת-חן-972527559",
    label: "בת חן / Bat Hen",
    location: { lat: 32.360087, lng: 34.872453 },
  },
  {
    id: "בת-חפר-278371783",
    label: "בת חפר / Bat Hefer",
    location: { lat: 32.334502, lng: 35.012351 },
  },
  {
    id: "בת-חפר-65014576",
    label: "בת חפר / Bat Hefer",
    location: { lat: 32.333213, lng: 35.012907 },
  },
  {
    id: "בת-ים-278478190",
    label: "בת ים / Bat Yam",
    location: { lat: 32.015456, lng: 34.750528 },
  },
  {
    id: "בת-ים-1382458",
    label: "בת ים / Bat Yam",
    location: { lat: 32.013123, lng: 34.745345 },
  },
  {
    id: "בת-ים-3412670",
    label: "בת ים / Bat Yam",
    location: { lat: 32.015526, lng: 34.748738 },
  },
  {
    id: "בת-שלמה-278474391",
    label: "בת שלמה / Bat Shlomo",
    location: { lat: 32.599439, lng: 35.002952 },
  },
  {
    id: "בת-שלמה-82223206",
    label: "בת שלמה / Bat Shlomo",
    location: { lat: 32.600133, lng: 35.003737 },
  },
  {
    id: "ג-וליס-278478799",
    label: "ג'וליס / Julis",
    location: { lat: 32.943062, lng: 35.186943 },
  },
  {
    id: "ג-וליס-614164928",
    label: "ג'וליס / Julis",
    location: { lat: 32.942858, lng: 35.183348 },
  },
  {
    id: "ג-לג-וליה-278477247",
    label: "ג'לג'וליה / Jaljulya",
    location: { lat: 32.152285, lng: 34.953654 },
  },
  {
    id: "ג-לג-וליה-604726446",
    label: "ג'לג'וליה / Jaljulya",
    location: { lat: 32.151782, lng: 34.954733 },
  },
  {
    id: "ג-נאביב-1077051472",
    label: "ג'נאביב / Janabib",
    location: { lat: 31.287399, lng: 35.108210 },
  },
  {
    id: "ג-נאביב-92890484",
    label: "ג'נאביב / Janabib",
    location: { lat: 31.287254, lng: 35.108374 },
  },
  {
    id: "ג-סר-א-זרקא-616185207",
    label: "ג'סר א-זרקא / Jisr az-Zarqa",
    location: { lat: 32.537732, lng: 34.910542 },
  },
  {
    id: "ג-ש-278473372",
    label: "ג'ש / Gish (Gush Halav)",
    location: { lat: 33.024374, lng: 35.445884 },
  },
  {
    id: "ג-ש-613796284",
    label: "ג'ש / Jish",
    location: { lat: 33.023919, lng: 35.447572 },
  },
  {
    id: "גאולי-תימן-278473629",
    label: "גאולי תימן / Geuley Teiman",
    location: { lat: 32.392084, lng: 34.901208 },
  },
  {
    id: "גאולי-תימן-664699230",
    label: "גאולי תימן / Geullay Taiman",
    location: { lat: 32.391732, lng: 34.901275 },
  },
  {
    id: "גאולים-278371308",
    label: "גאולים / Geulim",
    location: { lat: 32.296245, lng: 34.947401 },
  },
  {
    id: "גאולים-700126396",
    label: "גאולים / Geulim",
    location: { lat: 32.299560, lng: 34.946466 },
  },
  {
    id: "גאליה-278473940",
    label: "גאליה / Ge'alya",
    location: { lat: 31.884685, lng: 34.764843 },
  },
  {
    id: "גאליה-274759499",
    label: "גאליה / Ge'alya",
    location: { lat: 31.884323, lng: 34.766878 },
  },
  {
    id: "גבולות-278476039",
    label: "גבולות / Gvulot",
    location: { lat: 31.211113, lng: 34.465247 },
  },
  {
    id: "גבולות-82487534",
    label: "גבולות / Gvulot",
    location: { lat: 31.210207, lng: 34.465292 },
  },
  {
    id: "גבים-278472664",
    label: "גבים / Gevim",
    location: { lat: 31.506739, lng: 34.599177 },
  },
  {
    id: "גבים-92392932",
    label: "גבים / Gevim",
    location: { lat: 31.506403, lng: 34.598486 },
  },
  {
    id: "גבע-3997288401",
    label: "גבע / Geva",
    location: { lat: 32.566336, lng: 35.371549 },
  },
  {
    id: "גבע-1005534338",
    label: "גבע / Geva",
    location: { lat: 32.566408, lng: 35.372755 },
  },
  {
    id: "גבע-כרמל-637958976",
    label: "גבע כרמל / Geva Carmel",
    location: { lat: 32.662756, lng: 34.953393 },
  },
  {
    id: "גבע-כרמל-278476856",
    label: "גבע כרמל / Geva Karmel",
    location: { lat: 32.663623, lng: 34.954969 },
  },
  {
    id: "גבעולים-278475997",
    label: "גבעולים / Givolim",
    location: { lat: 31.396371, lng: 34.591514 },
  },
  {
    id: "גבעולים-711034638",
    label: "גבעולים / Givolim",
    location: { lat: 31.396571, lng: 34.591055 },
  },
  {
    id: "גבעות-בר-606009272",
    label: "גבעות בר / Givot Bar",
    location: { lat: 31.355626, lng: 34.759223 },
  },
  {
    id: "גבעות-בר-93226102",
    label: "גבעות בר / Givot Bar",
    location: { lat: 31.356095, lng: 34.758906 },
  },
  {
    id: "גבעות-עדן-1746668655",
    label: "גבעות עדן / Geva'ot Eden",
    location: { lat: 31.660579, lng: 35.015721 },
  },
  {
    id: "גבעת-אבני-278623455",
    label: "גבעת אבני / Givat Avni",
    location: { lat: 32.774457, lng: 35.438371 },
  },
  {
    id: "גבעת-אבני-611889993",
    label: "גבעת אבני / Givat Avni",
    location: { lat: 32.774645, lng: 35.438259 },
  },
  {
    id: "גבעת-אלה-486304575",
    label: "גבעת אלה / Givat Ela",
    location: { lat: 32.720848, lng: 35.244895 },
  },
  {
    id: "גבעת-אלה-611889731",
    label: "גבעת אלה / Givat Ela",
    location: { lat: 32.721141, lng: 35.244279 },
  },
  {
    id: "גבעת-אלונים-5977830576",
    label: "גבעת אלונים / Givat Alonim",
    location: { lat: 32.815323, lng: 35.139272 },
  },
  {
    id: "גבעת-ברנר-408402956",
    label: "גבעת ברנר / Givat Brenner",
    location: { lat: 31.867521, lng: 34.800491 },
  },
  {
    id: "גבעת-ברנר-91439466",
    label: "גבעת ברנר / Givat Brenner",
    location: { lat: 31.867677, lng: 34.801724 },
  },
  {
    id: "גבעת-השלושה-278473605",
    label: "גבעת השלושה / Givat HaShlosha",
    location: { lat: 32.098089, lng: 34.921147 },
  },
  {
    id: "גבעת-השלושה-83457998",
    label: "גבעת השלושה / Givat HaShlosha",
    location: { lat: 32.098124, lng: 34.920699 },
  },
  {
    id: "גבעת-וולפסון-71320285",
    label: "גבעת וולפסון / Givat Wolfson",
    location: { lat: 32.720666, lng: 35.016199 },
  },
  {
    id: "גבעת-ח-ן-278474424",
    label: "גבעת ח\"ן / Givat Hen",
    location: { lat: 32.168593, lng: 34.876063 },
  },
  {
    id: "גבעת-ח-ן-91039154",
    label: "גבעת ח\"ן / Givat Hen",
    location: { lat: 32.167060, lng: 34.874209 },
  },
  {
    id: "גבעת-חביבה-84675875",
    label: "גבעת חביבה / Givat Haviva",
    location: { lat: 32.457484, lng: 35.021719 },
  },
  {
    id: "גבעת-חיים-איחוד-434306573",
    label: "גבעת חיים (איחוד) / Givat Haim",
    location: { lat: 32.400277, lng: 34.933050 },
  },
  {
    id: "גבעת-חיים-איחוד-80420577",
    label: "גבעת חיים (איחוד) / Givat Haim (Ichood)",
    location: { lat: 32.399772, lng: 34.932469 },
  },
  {
    id: "גבעת-חיים-מאוחד-83149836",
    label: "גבעת חיים (מאוחד) / Givat Haim (Me'uchad)",
    location: { lat: 32.391918, lng: 34.931602 },
  },
  {
    id: "גבעת-חיים-מאוחד-278475684",
    label: "גבעת חיים (מאוחד) / Givat Hayyim (Meuhad)",
    location: { lat: 32.391852, lng: 34.931902 },
  },
  {
    id: "גבעת-יואב-1656011612",
    label: "גבעת יואב / Givat Yoav",
    location: { lat: 32.796762, lng: 35.681303 },
  },
  {
    id: "גבעת-יואב-803215258",
    label: "גבעת יואב / Givat Yoav",
    location: { lat: 32.797481, lng: 35.680704 },
  },
  {
    id: "גבעת-יערים-1643318944",
    label: "גבעת יערים / Givat Yearim",
    location: { lat: 31.785994, lng: 35.092569 },
  },
  {
    id: "גבעת-יערים-92342848",
    label: "גבעת יערים / Givat Yearim",
    location: { lat: 31.787280, lng: 35.092519 },
  },
  {
    id: "גבעת-ישעיהו-278474382",
    label: "גבעת ישעיהו / Giv'at Yeshayahu",
    location: { lat: 31.670215, lng: 34.946293 },
  },
  {
    id: "גבעת-ישעיהו-620390674",
    label: "גבעת ישעיהו / Givat Yeshayahu",
    location: { lat: 31.670226, lng: 34.950109 },
  },
  {
    id: "גבעת-כח-278478793",
    label: "גבעת כח / Giv'at Koah",
    location: { lat: 32.030278, lng: 34.936667 },
  },
  {
    id: "גבעת-כח-616288891",
    label: "גבעת כח / Givat Koach",
    location: { lat: 32.030747, lng: 34.936303 },
  },
  {
    id: "גבעת-ניל-י-278477075",
    label: "גבעת ניל\"י / Givat Nili",
    location: { lat: 32.547269, lng: 35.042343 },
  },
  {
    id: "גבעת-ניל-י-705096770",
    label: "גבעת ניל\"י / Givat Nili",
    location: { lat: 32.548009, lng: 35.042498 },
  },
  {
    id: "גבעת-עדה-278477080",
    label: "גבעת עדה / Givat Ada",
    location: { lat: 32.516720, lng: 35.003552 },
  },
  {
    id: "גבעת-עדה-952098644",
    label: "גבעת עדה / Givat Ada",
    location: { lat: 32.520748, lng: 35.005547 },
  },
  {
    id: "גבעת-עוז-278476964",
    label: "גבעת עוז / Givat Oz",
    location: { lat: 32.555893, lng: 35.198627 },
  },
  {
    id: "גבעת-עוז-85788279",
    label: "גבעת עוז / Givat Oz",
    location: { lat: 32.555401, lng: 35.198459 },
  },
  {
    id: "גבעת-שמואל-3997917865",
    label: "גבעת שמואל / Givat Shmuel",
    location: { lat: 32.076946, lng: 34.852466 },
  },
  {
    id: "גבעת-שמואל-16123578",
    label: "גבעת שמואל / Givat Shmuel",
    location: { lat: 32.077907, lng: 34.851676 },
  },
  {
    id: "גבעת-שמש-8307131113",
    label: "גבעת שמש / Givat Shemesh",
    location: { lat: 31.774962, lng: 34.951570 },
  },
  {
    id: "גבעת-שפירא-278478611",
    label: "גבעת שפירא / Givat Shapira",
    location: { lat: 32.357862, lng: 34.876276 },
  },
  {
    id: "גבעת-שפירא-84654112",
    label: "גבעת שפירא / Givat Shapira",
    location: { lat: 32.357317, lng: 34.876043 },
  },
  {
    id: "גבעתי-278476983",
    label: "גבעתי / Givati",
    location: { lat: 31.734005, lng: 34.679305 },
  },
  {
    id: "גבעתי-699210645",
    label: "גבעתי / Givati",
    location: { lat: 31.732903, lng: 34.680655 },
  },
  {
    id: "גבעתיים-277528109",
    label: "גבעתיים / Givatayim",
    location: { lat: 32.072961, lng: 34.811328 },
  },
  {
    id: "גבעתיים-1382923",
    label: "גבעתיים / Givatayim",
    location: { lat: 32.070152, lng: 34.809298 },
  },
  {
    id: "גברעם-278476492",
    label: "גברעם / Gvaram",
    location: { lat: 31.590945, lng: 34.611503 },
  },
  {
    id: "גברעם-705445681",
    label: "גברעם / Gvaram",
    location: { lat: 31.591960, lng: 34.612550 },
  },
  {
    id: "גבת-278477055",
    label: "גבת / Gvat",
    location: { lat: 32.674725, lng: 35.210777 },
  },
  {
    id: "גבת-91376406",
    label: "גבת / Gvat",
    location: { lat: 32.674490, lng: 35.212384 },
  },
  {
    id: "גדות-3078967477",
    label: "גדות / Gadot",
    location: { lat: 33.018070, lng: 35.618921 },
  },
  {
    id: "גדות-165013865",
    label: "גדות / Gadot",
    location: { lat: 33.018047, lng: 35.619039 },
  },
  {
    id: "גדיש-278476399",
    label: "גדיש / Gadish",
    location: { lat: 32.558850, lng: 35.244895 },
  },
  {
    id: "גדיש-617491529",
    label: "גדיש / Gadish",
    location: { lat: 32.559349, lng: 35.244838 },
  },
  {
    id: "גדעונה-278474374",
    label: "גדעונה / Gidona",
    location: { lat: 32.548748, lng: 35.359246 },
  },
  {
    id: "גדעונה-973485198",
    label: "גדעונה / Gidona",
    location: { lat: 32.548475, lng: 35.359294 },
  },
  {
    id: "גדרה-404159318",
    label: "גדרה / Gedera",
    location: { lat: 31.811775, lng: 34.780388 },
  },
  {
    id: "גדרה-61589299",
    label: "גדרה / Gedera",
    location: { lat: 31.811287, lng: 34.779376 },
  },
  {
    id: "גונן-278473512",
    label: "גונן / Gonen",
    location: { lat: 33.123876, lng: 35.646287 },
  },
  {
    id: "גונן-81808323",
    label: "גונן / Gonen",
    location: { lat: 33.122993, lng: 35.645797 },
  },
  {
    id: "גורן-278473954",
    label: "גורן / Goren",
    location: { lat: 33.056393, lng: 35.236992 },
  },
  {
    id: "גורן-692533098",
    label: "גורן / Goren",
    location: { lat: 33.056670, lng: 35.239009 },
  },
  {
    id: "גזית-278475592",
    label: "גזית / Gazit",
    location: { lat: 32.638214, lng: 35.446739 },
  },
  {
    id: "גזית-641221521",
    label: "גזית / Gazit",
    location: { lat: 32.637889, lng: 35.447142 },
  },
  {
    id: "גזר-11757562659",
    label: "גזר / Gezer",
    location: { lat: 31.877007, lng: 34.920853 },
  },
  {
    id: "גזר-588488455",
    label: "גזר / Gezer",
    location: { lat: 31.876215, lng: 34.920831 },
  },
  {
    id: "גיאה-278477147",
    label: "גיאה / Gea",
    location: { lat: 31.627557, lng: 34.602416 },
  },
  {
    id: "גיאה-698854834",
    label: "גיאה / Gea",
    location: { lat: 31.627202, lng: 34.604103 },
  },
  {
    id: "גיבתון-278478624",
    label: "גיבתון / Gibton",
    location: { lat: 31.888821, lng: 34.799484 },
  },
  {
    id: "גיבתון-43962646",
    label: "גיבתון / Gibton",
    location: { lat: 31.888815, lng: 34.800327 },
  },
  {
    id: "גיזו-1730307308",
    label: "גיזו / Gizo",
    location: { lat: 31.804120, lng: 34.938085 },
  },
  {
    id: "גיזו-82629040",
    label: "גיזו / Gizo",
    location: { lat: 31.804968, lng: 34.938733 },
  },
  {
    id: "גילון-732597776",
    label: "גילון / Gilon",
    location: { lat: 32.902903, lng: 35.235462 },
  },
  {
    id: "גילון-974634568",
    label: "גילון / Gilon",
    location: { lat: 32.904025, lng: 35.237509 },
  },
  {
    id: "גילעם-278476830",
    label: "גילעם / Gilam",
    location: { lat: 32.820569, lng: 35.138943 },
  },
  {
    id: "גילעם-91370028",
    label: "גילעם / Gilam",
    location: { lat: 32.821131, lng: 35.139259 },
  },
  {
    id: "גילת-278478533",
    label: "גילת / Gilat",
    location: { lat: 31.329171, lng: 34.651651 },
  },
  {
    id: "גילת-707398172",
    label: "גילת / Gilat",
    location: { lat: 31.328528, lng: 34.652564 },
  },
  {
    id: "גינדל-4540011471",
    label: "גינדל / Gindal",
    location: { lat: 31.132813, lng: 35.012195 },
  },
  {
    id: "גינוסר-278478439",
    label: "גינוסר / Ginosar",
    location: { lat: 32.847640, lng: 35.523626 },
  },
  {
    id: "גינוסר-91562899",
    label: "גינוסר / Ginosar",
    location: { lat: 32.847365, lng: 35.523650 },
  },
  {
    id: "גינתון-278473789",
    label: "גינתון / Ginaton",
    location: { lat: 31.962313, lng: 34.913939 },
  },
  {
    id: "גינתון-587832040",
    label: "גינתון / Ginaton",
    location: { lat: 31.962936, lng: 34.914296 },
  },
  {
    id: "גיתה-1255386590",
    label: "גיתה / Gita",
    location: { lat: 32.967248, lng: 35.249074 },
  },
  {
    id: "גיתה-687080717",
    label: "גיתה / Gita",
    location: { lat: 32.967477, lng: 35.248400 },
  },
  {
    id: "גלאון-3582412950",
    label: "גלאון / Galon",
    location: { lat: 31.634059, lng: 34.849032 },
  },
  {
    id: "גלאון-82627687",
    label: "גלאון / Galon",
    location: { lat: 31.633593, lng: 34.848502 },
  },
  {
    id: "גליל-ים-246231901",
    label: "גליל ים / Glil Yam",
    location: { lat: 32.156880, lng: 34.829987 },
  },
  {
    id: "גליל-ים-94713250",
    label: "גליל ים / Glil Yam",
    location: { lat: 32.157241, lng: 34.831085 },
  },
  {
    id: "גלעד-670221227",
    label: "גלעד / Gilad",
    location: { lat: 32.557279, lng: 35.075713 },
  },
  {
    id: "גלעד-84678540",
    label: "גלעד / Gilad",
    location: { lat: 32.556929, lng: 35.076011 },
  },
  {
    id: "גמזו-278476233",
    label: "גמזו / Gimzo",
    location: { lat: 31.927673, lng: 34.941891 },
  },
  {
    id: "גמזו-701284752",
    label: "גמזו / Gimzo",
    location: { lat: 31.929586, lng: 34.941396 },
  },
  {
    id: "גן-הדרום-278476622",
    label: "גן הדרום / Gan HaDarom",
    location: { lat: 31.803614, lng: 34.699799 },
  },
  {
    id: "גן-הדרום-92387603",
    label: "גן הדרום / Gan HaDarom",
    location: { lat: 31.805037, lng: 34.700958 },
  },
  {
    id: "גן-השומרון-278470476",
    label: "גן השומרון / Gan HaShomron",
    location: { lat: 32.463909, lng: 34.998449 },
  },
  {
    id: "גן-השומרון-68706853",
    label: "גן השומרון / Gan HaShomron",
    location: { lat: 32.463030, lng: 34.998275 },
  },
  {
    id: "גן-השרון-84531089",
    label: "גן השרון / Gan HaSharon",
    location: { lat: 32.188418, lng: 34.907487 },
  },
  {
    id: "גן-חיים-9336946706",
    label: "גן חיים / Gan Haim",
    location: { lat: 32.195098, lng: 34.905481 },
  },
  {
    id: "גן-חיים-79317297",
    label: "גן חיים / Gan Haim",
    location: { lat: 32.194900, lng: 34.905149 },
  },
  {
    id: "גן-יאשיה-278372016",
    label: "גן יאשיה / Gan Yoshiah",
    location: { lat: 32.350669, lng: 34.995402 },
  },
  {
    id: "גן-יאשיה-83621571",
    label: "גן יאשיה / Gan Yoshiya",
    location: { lat: 32.350185, lng: 34.993113 },
  },
  {
    id: "גן-יבנה-278477943",
    label: "גן יבנה / Gan Yavne",
    location: { lat: 31.787109, lng: 34.709663 },
  },
  {
    id: "גן-יבנה-34888958",
    label: "גן יבנה / Gan Yavne",
    location: { lat: 31.787870, lng: 34.705410 },
  },
  {
    id: "גן-נר-495981365",
    label: "גן נר / Gan Ner",
    location: { lat: 32.530869, lng: 35.339112 },
  },
  {
    id: "גן-נר-81641264",
    label: "גן נר / Gan Ner",
    location: { lat: 32.531110, lng: 35.337611 },
  },
  {
    id: "גן-שורק-278475588",
    label: "גן שורק / Gan Soreq",
    location: { lat: 31.944731, lng: 34.759921 },
  },
  {
    id: "גן-שורק-705372317",
    label: "גן שורק / Gan Soreq",
    location: { lat: 31.945075, lng: 34.761668 },
  },
  {
    id: "גן-שלמה-קבוצת-שילר-278475110",
    label: "גן שלמה (קבוצת שילר) / Gan Shlomo (Kvutzat Shiller)",
    location: { lat: 31.877708, lng: 34.798271 },
  },
  {
    id: "גן-שלמה-קבוצת-שילר-103318861",
    label: "גן שלמה (קבוצת שילר) / Gan Shlomo (Kvutzat Shiller)",
    location: { lat: 31.878257, lng: 34.798570 },
  },
  {
    id: "גן-שמואל-278477283",
    label: "גן שמואל / Gan Shemuel",
    location: { lat: 32.451832, lng: 34.949855 },
  },
  {
    id: "גן-שמואל-19401931",
    label: "גן שמואל / Gan Shmuel",
    location: { lat: 32.452222, lng: 34.951669 },
  },
  {
    id: "גנות-11627216572",
    label: "גנות / Ganot",
    location: { lat: 32.018991, lng: 34.826702 },
  },
  {
    id: "גנות-401241636",
    label: "גנות / Ganot",
    location: { lat: 32.018175, lng: 34.829273 },
  },
  {
    id: "גנות-הדר-278478607",
    label: "גנות הדר / Gannot Hadar",
    location: { lat: 32.319506, lng: 34.900140 },
  },
  {
    id: "גנות-הדר-79315344",
    label: "גנות הדר / Gannot Hadar",
    location: { lat: 32.320002, lng: 34.899505 },
  },
  {
    id: "גני-הדר-503520386",
    label: "גני הדר / Ganei Hadar",
    location: { lat: 31.879259, lng: 34.853040 },
  },
  {
    id: "גני-הדר-91439460",
    label: "גני הדר / Ganei Hadar",
    location: { lat: 31.878466, lng: 34.854045 },
  },
  {
    id: "גני-טל-816439020",
    label: "גני טל / Ganay Tal",
    location: { lat: 31.788211, lng: 34.791905 },
  },
  {
    id: "גני-טל-1317216363",
    label: "גני טל / Ganei Tal",
    location: { lat: 31.788688, lng: 34.791191 },
  },
  {
    id: "גני-יהודה-278432310",
    label: "גני יהודה / Ganay Yehuda",
    location: { lat: 32.040345, lng: 34.877319 },
  },
  {
    id: "גני-יהודה-17693088",
    label: "גני יהודה / Ganei Yehuda",
    location: { lat: 32.041269, lng: 34.875063 },
  },
  {
    id: "גני-יוחנן-711021250",
    label: "גני יוחנן / Ganay Yohanan",
    location: { lat: 31.857284, lng: 34.839608 },
  },
  {
    id: "גני-יוחנן-1014267170",
    label: "גני יוחנן / Ganei Yohanan",
    location: { lat: 31.860290, lng: 34.840736 },
  },
  {
    id: "גני-מודיעין-753695917",
    label: "גני מודיעין / Ganei Modi'in",
    location: { lat: 31.929087, lng: 35.016947 },
  },
  {
    id: "גני-עם-278473199",
    label: "גני עם / Ganei Am",
    location: { lat: 32.151417, lng: 34.901730 },
  },
  {
    id: "גני-עם-93181549",
    label: "גני עם / Ganei Am",
    location: { lat: 32.151353, lng: 34.901460 },
  },
  {
    id: "גני-תקווה-278470092",
    label: "גני תקווה / Ganei Tikva",
    location: { lat: 32.060426, lng: 34.876095 },
  },
  {
    id: "גני-תקווה-83991673",
    label: "גני תקווה / Ganei Tikva",
    location: { lat: 32.061243, lng: 34.874816 },
  },
  {
    id: "גניגר-4276178378",
    label: "גניגר / Ginegar",
    location: { lat: 32.664260, lng: 35.256944 },
  },
  {
    id: "גניגר-91376396",
    label: "גניגר / Ginegar",
    location: { lat: 32.663857, lng: 35.257583 },
  },
  {
    id: "געש-278476934",
    label: "געש / Gaash",
    location: { lat: 32.228888, lng: 34.823480 },
  },
  {
    id: "געש-31979041",
    label: "געש / Gaash",
    location: { lat: 32.228819, lng: 34.824357 },
  },
  {
    id: "געתון-278474597",
    label: "געתון / Gaaton",
    location: { lat: 33.005712, lng: 35.213750 },
  },
  {
    id: "געתון-687011000",
    label: "געתון / Gaaton",
    location: { lat: 33.006145, lng: 35.215344 },
  },
  {
    id: "גפן-278474405",
    label: "גפן / Gefen",
    location: { lat: 31.740481, lng: 34.879230 },
  },
  {
    id: "גפן-82628389",
    label: "גפן / Gefen",
    location: { lat: 31.741392, lng: 34.877943 },
  },
  {
    id: "גרופית-278476936",
    label: "גרופית / Grofit",
    location: { lat: 29.941716, lng: 35.064205 },
  },
  {
    id: "גרופית-617415294",
    label: "גרופית / Grofit",
    location: { lat: 29.940768, lng: 35.064372 },
  },
  {
    id: "גרנות-הגליל-1145971337",
    label: "גרנות הגליל / Grannot HaGalil",
    location: { lat: 33.059537, lng: 35.249645 },
  },
  {
    id: "גרנות-הגליל-691220711",
    label: "גרנות הגליל / Grannot Hagalil",
    location: { lat: 33.059284, lng: 35.250269 },
  },
  {
    id: "גשור-91951318",
    label: "גשור / Geshoor",
    location: { lat: 32.817408, lng: 35.719079 },
  },
  {
    id: "גשור-300161007",
    label: "גשור / Geshur",
    location: { lat: 32.819180, lng: 35.716008 },
  },
  {
    id: "גשר-278469681",
    label: "גשר / Gesher",
    location: { lat: 32.620652, lng: 35.552081 },
  },
  {
    id: "גשר-641594349",
    label: "גשר / Gesher",
    location: { lat: 32.620768, lng: 35.551552 },
  },
  {
    id: "גשר-הזיו-278473297",
    label: "גשר הזיו / Gesher HaZiv",
    location: { lat: 33.039468, lng: 35.110981 },
  },
  {
    id: "גשר-הזיו-74200088",
    label: "גשר הזיו / Gesher HaZiv",
    location: { lat: 33.039554, lng: 35.111260 },
  },
  {
    id: "גת-278476842",
    label: "גת / Gat",
    location: { lat: 31.626862, lng: 34.795109 },
  },
  {
    id: "גת-82627620",
    label: "גת / Gat",
    location: { lat: 31.627656, lng: 34.794197 },
  },
  {
    id: "גת-611987391",
    label: "גת / Gat",
    location: { lat: 31.701485, lng: 34.850172 },
  },
  {
    id: "גת-612043018",
    label: "גת / Gat city apron",
    location: { lat: 31.706155, lng: 34.847243 },
  },
  {
    id: "גת-רימון-278476403",
    label: "גת רימון / Gat Rimmon",
    location: { lat: 32.067442, lng: 34.880512 },
  },
  {
    id: "גת-רימון-616296800",
    label: "גת רימון / Gat Rimmon",
    location: { lat: 32.068356, lng: 34.879385 },
  },
  {
    id: "גת-שמנים-5325157775",
    label: "גת שמנים / Gethsemane",
    location: { lat: 31.779350, lng: 35.240198 },
  },
  {
    id: "ג-דיידה-מכר-278476032",
    label: "ג׳דיידה-מכר / Jadeida-Makr",
    location: { lat: 32.929535, lng: 35.146728 },
  },
  {
    id: "ג-דיידה-מכר-614163702",
    label: "ג׳דיידה-מכר / Jadeida-Makr",
    location: { lat: 32.930690, lng: 35.147231 },
  },
  {
    id: "ג-סר-א-זרקא-278473497",
    label: "ג׳סר א־זרקא / Jisr az Zarqa",
    location: { lat: 32.537562, lng: 34.913220 },
  },
  {
    id: "ג-ת-278477541",
    label: "ג׳ת / Jatt",
    location: { lat: 32.973664, lng: 35.232850 },
  },
  {
    id: "ג-ת-613806627",
    label: "ג׳ת / Jatt",
    location: { lat: 32.973911, lng: 35.229988 },
  },
  {
    id: "ג-ת-278473025",
    label: "ג’ת / Jatt",
    location: { lat: 32.398807, lng: 35.037543 },
  },
  {
    id: "ג-ת-83622136",
    label: "ג’ת / Jatt",
    location: { lat: 32.399157, lng: 35.036505 },
  },
  {
    id: "דאחיה-7266496",
    label: "דאחיה / D'hiyah",
    location: { lat: 31.427629, lng: 34.771819 },
  },
  {
    id: "דבורה-275283321",
    label: "דבורה / Dvora",
    location: { lat: 32.553108, lng: 35.263511 },
  },
  {
    id: "דבורה-617494233",
    label: "דבורה / Dvora",
    location: { lat: 32.553100, lng: 35.264614 },
  },
  {
    id: "דבוריה-278478869",
    label: "דבוריה / Daburia",
    location: { lat: 32.692779, lng: 35.371604 },
  },
  {
    id: "דבוריה-614214439",
    label: "דבוריה / Daburia",
    location: { lat: 32.690038, lng: 35.371491 },
  },
  {
    id: "דביר-275283317",
    label: "דביר / Dvir",
    location: { lat: 31.413474, lng: 34.823263 },
  },
  {
    id: "דביר-91731401",
    label: "דביר / Dvir",
    location: { lat: 31.412992, lng: 34.824096 },
  },
  {
    id: "דברת-278470736",
    label: "דברת / Dovrat",
    location: { lat: 32.647945, lng: 35.350518 },
  },
  {
    id: "דברת-584708938",
    label: "דברת / Dovrat",
    location: { lat: 32.648300, lng: 35.349857 },
  },
  {
    id: "דגניה-א-278473115",
    label: "דגניה א' / Deganya Alef",
    location: { lat: 32.708479, lng: 35.574858 },
  },
  {
    id: "דגניה-א-642173393",
    label: "דגניה א' / Deganya Alef",
    location: { lat: 32.707393, lng: 35.574754 },
  },
  {
    id: "דגניה-ב-642173379",
    label: "דגניה ב' / Deganya B",
    location: { lat: 32.699515, lng: 35.575485 },
  },
  {
    id: "דגניה-ב-278469696",
    label: "דגניה ב' / Deganya Bet",
    location: { lat: 32.699920, lng: 35.574709 },
  },
  {
    id: "דהמש-8268222569",
    label: "דהמש / Dahmash",
    location: { lat: 31.943675, lng: 34.867081 },
  },
  {
    id: "דוב-ב-278474943",
    label: "דוב״ב / Dovev",
    location: { lat: 33.052457, lng: 35.407487 },
  },
  {
    id: "דוב-ב-690458202",
    label: "דוב״ב / Dovev",
    location: { lat: 33.052125, lng: 35.406429 },
  },
  {
    id: "דור-278473561",
    label: "דור / Dor",
    location: { lat: 32.607567, lng: 34.923046 },
  },
  {
    id: "דור-93181136",
    label: "דור / Dor",
    location: { lat: 32.607155, lng: 34.923160 },
  },
  {
    id: "דורות-278473235",
    label: "דורות / Dorot",
    location: { lat: 31.506606, lng: 34.645993 },
  },
  {
    id: "דורות-92391902",
    label: "דורות / Dorot",
    location: { lat: 31.505661, lng: 34.645672 },
  },
  {
    id: "דחי-278477531",
    label: "דחי / Dahi",
    location: { lat: 32.620399, lng: 35.344995 },
  },
  {
    id: "דחי-94522023",
    label: "דחי / Dahi",
    location: { lat: 32.621205, lng: 35.343880 },
  },
  {
    id: "דימונה-275283306",
    label: "דימונה / Dimona",
    location: { lat: 31.068661, lng: 35.036648 },
  },
  {
    id: "דימונה-881912991",
    label: "דימונה / Dimona",
    location: { lat: 31.070857, lng: 35.036845 },
  },
  {
    id: "דיר-אל-אסד-278476858",
    label: "דיר אל אסד / Deir al Asad",
    location: { lat: 32.934772, lng: 35.266828 },
  },
  {
    id: "דיר-אל-אסד-614173565",
    label: "דיר אל אסד / Deir al Asad",
    location: { lat: 32.936490, lng: 35.267772 },
  },
  {
    id: "דיר-חנא-278474092",
    label: "דיר חנא / Deir Hanna",
    location: { lat: 32.862504, lng: 35.366661 },
  },
  {
    id: "דיר-חנא-609970189",
    label: "דיר חנא / Deir Hanna",
    location: { lat: 32.862795, lng: 35.366364 },
  },
  {
    id: "דישון-275283309",
    label: "דישון / Dishon",
    location: { lat: 33.081324, lng: 35.517520 },
  },
  {
    id: "דישון-690152382",
    label: "דישון / Dishon",
    location: { lat: 33.081407, lng: 35.517142 },
  },
  {
    id: "דליה-278477137",
    label: "דליה / Daliya",
    location: { lat: 32.589315, lng: 35.075825 },
  },
  {
    id: "דליה-82198881",
    label: "דליה / Daliya",
    location: { lat: 32.589365, lng: 35.073966 },
  },
  {
    id: "דלית-אל-כרמל-278476860",
    label: "דלית אל-כרמל / Daliyat al-Karmel",
    location: { lat: 32.692239, lng: 35.048279 },
  },
  {
    id: "דלית-אל-כרמל-60356145",
    label: "דלית אל-כרמל / Daliyat al-Karmel",
    location: { lat: 32.696381, lng: 35.051706 },
  },
  {
    id: "דלתון-278473124",
    label: "דלתון / Dalton",
    location: { lat: 33.016671, lng: 35.489191 },
  },
  {
    id: "דלתון-616552916",
    label: "דלתון / Dalton",
    location: { lat: 33.016999, lng: 35.485968 },
  },
  {
    id: "דמיידה-615257323",
    label: "דמיידה / Dmeida",
    location: { lat: 32.815362, lng: 35.227970 },
  },
  {
    id: "דמיידה-498235821",
    label: "דמיידה / Dmeide",
    location: { lat: 32.815462, lng: 35.227134 },
  },
  {
    id: "דן-278474014",
    label: "דן / Dan",
    location: { lat: 33.240091, lng: 35.653088 },
  },
  {
    id: "דן-87167982",
    label: "דן / Dan",
    location: { lat: 33.239902, lng: 35.653346 },
  },
  {
    id: "דפנה-278473113",
    label: "דפנה / Dafna",
    location: { lat: 33.230371, lng: 35.639263 },
  },
  {
    id: "דפנה-87167832",
    label: "דפנה / Dafna",
    location: { lat: 33.229662, lng: 35.637584 },
  },
  {
    id: "דקל-340065262",
    label: "דקל / Dekel",
    location: { lat: 31.194067, lng: 34.347862 },
  },
  {
    id: "דקל-711326324",
    label: "דקל / Dekel",
    location: { lat: 31.195342, lng: 34.343736 },
  },
  {
    id: "דריג-את-1075567954",
    label: "דריג'את / Drijat",
    location: { lat: 31.300590, lng: 35.075374 },
  },
  {
    id: "דריג-את-94520463",
    label: "דריג'את / Drijat",
    location: { lat: 31.300719, lng: 35.076126 },
  },
  {
    id: "האון-278474811",
    label: "האון / HaOn",
    location: { lat: 32.726981, lng: 35.623641 },
  },
  {
    id: "האון-91667205",
    label: "האון / HaOn",
    location: { lat: 32.727269, lng: 35.623775 },
  },
  {
    id: "הבונים-278477488",
    label: "הבונים / HaBonim",
    location: { lat: 32.637188, lng: 34.932800 },
  },
  {
    id: "הבונים-79686773",
    label: "הבונים / HaBonim",
    location: { lat: 32.635836, lng: 34.933363 },
  },
  {
    id: "הגושרים-278478639",
    label: "הגושרים / HaGoshrim",
    location: { lat: 33.221126, lng: 35.623075 },
  },
  {
    id: "הגושרים-87167739",
    label: "הגושרים / HaGoshrim",
    location: { lat: 33.220514, lng: 35.621333 },
  },
  {
    id: "הדסים-278478723",
    label: "הדסים / Hadassim",
    location: { lat: 32.286207, lng: 34.885079 },
  },
  {
    id: "הדר-עם-278472745",
    label: "הדר עם / Hadar Am",
    location: { lat: 32.349084, lng: 34.900565 },
  },
  {
    id: "הדר-עם-94521048",
    label: "הדר עם / Hadar Am",
    location: { lat: 32.349262, lng: 34.901517 },
  },
  {
    id: "הוד-השרון-246845741",
    label: "הוד השרון / Hod HaSharon",
    location: { lat: 32.156197, lng: 34.893035 },
  },
  {
    id: "הוד-השרון-90998117",
    label: "הוד השרון / Hod HaSharon",
    location: { lat: 32.150160, lng: 34.898436 },
  },
  {
    id: "הודיה-698782869",
    label: "הודיה / Hodaya",
    location: { lat: 31.673851, lng: 34.642914 },
  },
  {
    id: "הודיה-278471606",
    label: "הודיה / Hodiyya",
    location: { lat: 31.675649, lng: 34.639840 },
  },
  {
    id: "הוואשלה-1077075650",
    label: "הוואשלה / Hawashila",
    location: { lat: 31.093368, lng: 34.977379 },
  },
  {
    id: "הוואשלה-92894566",
    label: "הוואשלה / Hawashila",
    location: { lat: 31.093176, lng: 34.980285 },
  },
  {
    id: "הוזייל-1077113980",
    label: "הוזייל / Abu Wadi",
    location: { lat: 31.414894, lng: 34.760993 },
  },
  {
    id: "הושעיה-2298087495",
    label: "הושעיה / Hoshaya",
    location: { lat: 32.758570, lng: 35.293291 },
  },
  {
    id: "הושעיה-618620679",
    label: "הושעיה / Hoshaya",
    location: { lat: 32.758649, lng: 35.292888 },
  },
  {
    id: "הזורע-278475887",
    label: "הזורע / HaZorea",
    location: { lat: 32.643792, lng: 35.120646 },
  },
  {
    id: "הזורע-15260061",
    label: "הזורע / HaZorea",
    location: { lat: 32.642772, lng: 35.119745 },
  },
  {
    id: "הזורעים-278477345",
    label: "הזורעים / HaZorim",
    location: { lat: 32.745714, lng: 35.503188 },
  },
  {
    id: "הזורעים-617894334",
    label: "הזורעים / HaZorim",
    location: { lat: 32.746165, lng: 35.501314 },
  },
  {
    id: "החותרים-278478456",
    label: "החותרים / HaHoterim",
    location: { lat: 32.751498, lng: 34.956780 },
  },
  {
    id: "החותרים-79306537",
    label: "החותרים / Hachotrim",
    location: { lat: 32.751993, lng: 34.957598 },
  },
  {
    id: "היובל-563962111",
    label: "היובל / Hayovel",
    location: { lat: 31.887734, lng: 34.826090 },
  },
  {
    id: "היוגב-278474294",
    label: "היוגב / HaYogev",
    location: { lat: 32.611425, lng: 35.205660 },
  },
  {
    id: "היוגב-616793311",
    label: "היוגב / HaYogev",
    location: { lat: 32.609421, lng: 35.203762 },
  },
  {
    id: "הכפר-הירוק-94715506",
    label: "הכפר הירוק / HaKfar HaYarok",
    location: { lat: 32.134525, lng: 34.827677 },
  },
  {
    id: "המעפיל-278478781",
    label: "המעפיל / HaMaapil",
    location: { lat: 32.378332, lng: 34.983979 },
  },
  {
    id: "המעפיל-83039452",
    label: "המעפיל / HaMaapil",
    location: { lat: 32.377743, lng: 34.983206 },
  },
  {
    id: "הסוללים-278469713",
    label: "הסוללים / HaSolelim",
    location: { lat: 32.751099, lng: 35.238324 },
  },
  {
    id: "הסוללים-91312309",
    label: "הסוללים / HaSolelim",
    location: { lat: 32.750947, lng: 35.236912 },
  },
  {
    id: "העוגן-3059957257",
    label: "העוגן / HaOgen",
    location: { lat: 32.361942, lng: 34.923161 },
  },
  {
    id: "העוגן-83803605",
    label: "העוגן / HaOgen",
    location: { lat: 32.361664, lng: 34.923795 },
  },
  {
    id: "הר-אדר-760004577",
    label: "הר אדר / Har Adar",
    location: { lat: 31.826296, lng: 35.130047 },
  },
  {
    id: "הר-דב-11067229296",
    label: "הר דב / Shebaa Farms",
    location: { lat: 33.279367, lng: 35.684730 },
  },
  {
    id: "הר-הבית-5862584",
    label: "הר הבית / Temple Mount",
    location: { lat: 31.777982, lng: 35.235627 },
  },
  {
    id: "הר-חלוץ-278477775",
    label: "הר חלוץ / Har Haluz",
    location: { lat: 32.950674, lng: 35.312192 },
  },
  {
    id: "הר-חלוץ-616539449",
    label: "הר חלוץ / Har Haluz",
    location: { lat: 32.949937, lng: 35.312651 },
  },
  {
    id: "הר-נחום-91563709",
    label: "הר נחום / Mount of Beatitudes",
    location: { lat: 32.881789, lng: 35.556499 },
  },
  {
    id: "הר-עמשא-605985669",
    label: "הר עמשא / Har Amasa",
    location: { lat: 31.342617, lng: 35.102189 },
  },
  {
    id: "הר-עמשא-94520462",
    label: "הר עמשא / Har Amasa",
    location: { lat: 31.342084, lng: 35.099847 },
  },
  {
    id: "הראל-4349860703",
    label: "הראל / Harel",
    location: { lat: 31.809380, lng: 34.949078 },
  },
  {
    id: "הראל-82629016",
    label: "הראל / Harel",
    location: { lat: 31.809298, lng: 34.949768 },
  },
  {
    id: "הרדוף-429882161",
    label: "הרדוף / Harduf",
    location: { lat: 32.764112, lng: 35.172832 },
  },
  {
    id: "הרדוף-698621918",
    label: "הרדוף / Harduf",
    location: { lat: 32.763372, lng: 35.173923 },
  },
  {
    id: "הרצליה-278470198",
    label: "הרצליה / Herzliya",
    location: { lat: 32.165625, lng: 34.846902 },
  },
  {
    id: "הרצליה-60363615",
    label: "הרצליה / Herzliya",
    location: { lat: 32.170252, lng: 34.828088 },
  },
  {
    id: "הרצליה-1382820",
    label: "הרצליה / Herzliya",
    location: { lat: 32.173471, lng: 34.826106 },
  },
  {
    id: "הררית-278474093",
    label: "הררית / Hararit",
    location: { lat: 32.845785, lng: 35.369171 },
  },
  {
    id: "הררית-91561028",
    label: "הררית / Hararit",
    location: { lat: 32.845790, lng: 35.368991 },
  },
  {
    id: "התמר-711052844",
    label: "התמר / HaTamar",
    location: { lat: 31.435019, lng: 34.534038 },
  },
  {
    id: "ואדי-אל-חמאם-614211455",
    label: "ואדי אל-חמאם / Hamaam",
    location: { lat: 32.829802, lng: 35.488976 },
  },
  {
    id: "ואדי-אל-חמאם-596768537",
    label: "ואדי אל-חמאם / Hamam",
    location: { lat: 32.829555, lng: 35.490398 },
  },
  {
    id: "ואדי-אל-משאש-8242302350",
    label: "ואדי אל-משאש / Havat MaShash",
    location: { lat: 31.081028, lng: 34.847777 },
  },
  {
    id: "ואדי-אל-משאש-495018654",
    label: "ואדי אל-משאש / Wadi Al Mshash",
    location: { lat: 31.081089, lng: 34.847433 },
  },
  {
    id: "ואדי-אריכא-7456854856",
    label: "ואדי אריכא / Wadi Ariha",
    location: { lat: 30.686894, lng: 34.782779 },
  },
  {
    id: "ואדי-אריכא-333555550",
    label: "ואדי אריכא / Wadi Ariha",
    location: { lat: 30.684699, lng: 34.786834 },
  },
  {
    id: "ורדון-605952283",
    label: "ורדון / Vardon",
    location: { lat: 31.663529, lng: 34.782192 },
  },
  {
    id: "ורדון-631942211",
    label: "ורדון / Vardon",
    location: { lat: 31.663426, lng: 34.780409 },
  },
  {
    id: "זבארגה-1077150046",
    label: "זבארגה / Zabarigha",
    location: { lat: 31.237783, lng: 35.026957 },
  },
  {
    id: "זבדיאל-278477411",
    label: "זבדיאל / Zavdiel",
    location: { lat: 31.658429, lng: 34.759748 },
  },
  {
    id: "זבדיאל-637642621",
    label: "זבדיאל / Zavdiel",
    location: { lat: 31.658963, lng: 34.760699 },
  },
  {
    id: "זבידאת-1370510078",
    label: "זבידאת / Zabidat",
    location: { lat: 32.732541, lng: 35.133147 },
  },
  {
    id: "זוהר-278477594",
    label: "זוהר / Zohar",
    location: { lat: 31.595648, lng: 34.693704 },
  },
  {
    id: "זוהר-705435044",
    label: "זוהר / Zohar",
    location: { lat: 31.595439, lng: 34.693319 },
  },
  {
    id: "זיאדנה-1077113895",
    label: "זיאדנה / Ziyadna",
    location: { lat: 31.413504, lng: 34.774471 },
  },
  {
    id: "זימרת-278478250",
    label: "זימרת / Zimrat",
    location: { lat: 31.447275, lng: 34.552330 },
  },
  {
    id: "זימרת-13431652",
    label: "זימרת / Zimrat",
    location: { lat: 31.447576, lng: 34.553301 },
  },
  {
    id: "זיקים-278477197",
    label: "זיקים / Zikim",
    location: { lat: 31.609373, lng: 34.522147 },
  },
  {
    id: "זיקים-92380270",
    label: "זיקים / Zikim",
    location: { lat: 31.608895, lng: 34.520749 },
  },
  {
    id: "זיתן-278470149",
    label: "זיתן / Zeitan",
    location: { lat: 31.975392, lng: 34.891423 },
  },
  {
    id: "זיתן-589692264",
    label: "זיתן / Zeitan",
    location: { lat: 31.975833, lng: 34.889396 },
  },
  {
    id: "זכרון-יעקב-278477631",
    label: "זכרון יעקב / Zikhron Yaakov",
    location: { lat: 32.571159, lng: 34.952997 },
  },
  {
    id: "זכרון-יעקב-3681233",
    label: "זכרון יעקב / Zikhron Yaakov",
    location: { lat: 32.572981, lng: 34.952897 },
  },
  {
    id: "זכריה-278474077",
    label: "זכריה / Zecharya",
    location: { lat: 31.709791, lng: 34.944079 },
  },
  {
    id: "זכריה-82628335",
    label: "זכריה / Zecharya",
    location: { lat: 31.709466, lng: 34.944610 },
  },
  {
    id: "זלפה-278474021",
    label: "זלפה / Zalafa",
    location: { lat: 32.547894, lng: 35.184588 },
  },
  {
    id: "זלפה-92001541",
    label: "זלפה / Zalafa",
    location: { lat: 32.549213, lng: 35.183659 },
  },
  {
    id: "זמן-מדבר-3568527627",
    label: "זמן מדבר / Zman Midbar",
    location: { lat: 31.280231, lng: 35.242143 },
  },
  {
    id: "זנוח-620416627",
    label: "זנוח / Zanoach",
    location: { lat: 31.731967, lng: 34.998785 },
  },
  {
    id: "זנוח-246827006",
    label: "זנוח / Zanoah",
    location: { lat: 31.731566, lng: 35.000732 },
  },
  {
    id: "זרועה-603945205",
    label: "זרועה / Zrua",
    location: { lat: 31.459377, lng: 34.623508 },
  },
  {
    id: "זרועה-665838793",
    label: "זרועה / Zrua",
    location: { lat: 31.458601, lng: 34.624375 },
  },
  {
    id: "זרזיר-429882206",
    label: "זרזיר / Zarzir",
    location: { lat: 32.727427, lng: 35.213355 },
  },
  {
    id: "זרזיר-614298509",
    label: "זרזיר / Zarzir",
    location: { lat: 32.727233, lng: 35.215934 },
  },
  {
    id: "זרחיה-636996453",
    label: "זרחיה / Zerahaya",
    location: { lat: 31.682142, lng: 34.746459 },
  },
  {
    id: "זרחיה-278477039",
    label: "זרחיה / Zerahya",
    location: { lat: 31.680684, lng: 34.745507 },
  },
  {
    id: "זרעית-278473911",
    label: "זרעית / Zarit",
    location: { lat: 33.099643, lng: 35.288645 },
  },
  {
    id: "זרעית-689955306",
    label: "זרעית / Zarit",
    location: { lat: 33.100052, lng: 35.288402 },
  },
  {
    id: "ח-אשם-זאנה-4867901428",
    label: "ח'אשם זאנה / Khashim Zannih",
    location: { lat: 31.202641, lng: 34.883070 },
  },
  {
    id: "ח-ראיב-אום-א-לחם-766666954",
    label: "ח'ראיב אום א-לחם / Kharayib Umm al Lahim",
    location: { lat: 31.839275, lng: 35.094377 },
  },
  {
    id: "ח-רבת-אל-ווטן-4867606076",
    label: "ח'רבת אל-ווטן / Khirbat Al Wattan",
    location: { lat: 31.255360, lng: 34.923779 },
  },
  {
    id: "חבצלת-563961995",
    label: "חבצלת / HaVatselet",
    location: { lat: 31.875555, lng: 34.816429 },
  },
  {
    id: "חבצלת-השרון-278477251",
    label: "חבצלת השרון / Havazelet HaSharon",
    location: { lat: 32.361050, lng: 34.861690 },
  },
  {
    id: "חבצלת-השרון-80424096",
    label: "חבצלת השרון / Havazelet HaSharon",
    location: { lat: 32.360583, lng: 34.862503 },
  },
  {
    id: "חבר-278474490",
    label: "חבר / Hever",
    location: { lat: 32.548713, lng: 35.264330 },
  },
  {
    id: "חבר-617494234",
    label: "חבר / Hever",
    location: { lat: 32.547727, lng: 35.264219 },
  },
  {
    id: "חג-אג-רה-429882177",
    label: "חג'אג'רה / Hajajira",
    location: { lat: 32.745529, lng: 35.197569 },
  },
  {
    id: "חגור-278475098",
    label: "חגור / Hagor",
    location: { lat: 32.137568, lng: 34.948166 },
  },
  {
    id: "חגור-616783600",
    label: "חגור / Hagor",
    location: { lat: 32.137813, lng: 34.946795 },
  },
  {
    id: "חגלה-278470217",
    label: "חגלה / Hogla",
    location: { lat: 32.387516, lng: 34.925731 },
  },
  {
    id: "חגלה-83149837",
    label: "חגלה / Hogla",
    location: { lat: 32.387602, lng: 34.925201 },
  },
  {
    id: "חד-נס-364532454",
    label: "חד נס / Chad Ness",
    location: { lat: 32.932160, lng: 35.639978 },
  },
  {
    id: "חד-נס-1652312950",
    label: "חד נס / Had Nes",
    location: { lat: 32.928396, lng: 35.642971 },
  },
  {
    id: "חדיד-278476970",
    label: "חדיד / Hadid",
    location: { lat: 31.968246, lng: 34.933733 },
  },
  {
    id: "חדיד-587828584",
    label: "חדיד / Hadid",
    location: { lat: 31.968480, lng: 34.930727 },
  },
  {
    id: "חדרה-1475317050",
    label: "חדרה / Hadera",
    location: { lat: 32.436990, lng: 34.919826 },
  },
  {
    id: "חדרה-584728447",
    label: "חדרה / Hadera",
    location: { lat: 32.437236, lng: 34.918324 },
  },
  {
    id: "חוג-ייראת-92892562",
    label: "חוג'ייראת / Hujairat",
    location: { lat: 32.835017, lng: 35.289164 },
  },
  {
    id: "חוואלד-615241519",
    label: "חוואלד / Chawalid",
    location: { lat: 32.770240, lng: 35.136711 },
  },
  {
    id: "חוואלד-1077157373",
    label: "חוואלד / Khawaled",
    location: { lat: 32.770768, lng: 35.136013 },
  },
  {
    id: "חוות-אלה-צדק-119776067",
    label: "חוות אלה (צדק)",
    location: { lat: 31.443480, lng: 34.897954 },
  },
  {
    id: "חוות-הר-שמש-8409902859",
    label: "חוות הר שמש / Sun Mountain Farm",
    location: { lat: 31.392576, lng: 34.842824 },
  },
  {
    id: "חוות-השומר-278474102",
    label: "חוות השומר / Havat HaShomer",
    location: { lat: 32.758041, lng: 35.403839 },
  },
  {
    id: "חולדה-278470023",
    label: "חולדה / Hulda",
    location: { lat: 31.831114, lng: 34.882812 },
  },
  {
    id: "חולדה-580589360",
    label: "חולדה / Hulda",
    location: { lat: 31.831585, lng: 34.882969 },
  },
  {
    id: "חולון-196307269",
    label: "חולון / Holon",
    location: { lat: 32.019312, lng: 34.780408 },
  },
  {
    id: "חולון-1382460",
    label: "חולון / Holon",
    location: { lat: 32.013697, lng: 34.785026 },
  },
  {
    id: "חולית-340065026",
    label: "חולית / Holit",
    location: { lat: 31.231873, lng: 34.326510 },
  },
  {
    id: "חולית-82487677",
    label: "חולית / Holit",
    location: { lat: 31.232461, lng: 34.325926 },
  },
  {
    id: "חולתה-580973974",
    label: "חולתה / Chulatta",
    location: { lat: 33.051549, lng: 35.609928 },
  },
  {
    id: "חולתה-278475053",
    label: "חולתה / Hulata",
    location: { lat: 33.051112, lng: 35.609162 },
  },
  {
    id: "חוסן-278474134",
    label: "חוסן / Hosen",
    location: { lat: 32.997575, lng: 35.297986 },
  },
  {
    id: "חוסן-614133976",
    label: "חוסן / Hossen",
    location: { lat: 32.998586, lng: 35.296188 },
  },
  {
    id: "חוסנייה-1075639654",
    label: "חוסנייה / Hussniyya",
    location: { lat: 32.899381, lng: 35.321526 },
  },
  {
    id: "חוסנייה-613811523",
    label: "חוסנייה / Hussniyya",
    location: { lat: 32.901117, lng: 35.320974 },
  },
  {
    id: "חופית-278456505",
    label: "חופית / Hofit",
    location: { lat: 32.385659, lng: 34.875551 },
  },
  {
    id: "חופית-80417972",
    label: "חופית / Hofit",
    location: { lat: 32.385935, lng: 34.875028 },
  },
  {
    id: "חוקוק-278476811",
    label: "חוקוק / Hukok",
    location: { lat: 32.880038, lng: 35.494456 },
  },
  {
    id: "חוקוק-666674899",
    label: "חוקוק / Huqoq",
    location: { lat: 32.880455, lng: 35.494966 },
  },
  {
    id: "חורבת-בקר-5629595177",
    label: "חורבת בקר / Horvat Bakar",
    location: { lat: 31.362841, lng: 34.746925 },
  },
  {
    id: "חורה-558575432",
    label: "חורה / Hura",
    location: { lat: 31.297247, lng: 34.937906 },
  },
  {
    id: "חורה-605927545",
    label: "חורה / Hura",
    location: { lat: 31.298579, lng: 34.934851 },
  },
  {
    id: "חורפיש-278477829",
    label: "חורפיש / Hurfeish",
    location: { lat: 33.017370, lng: 35.346955 },
  },
  {
    id: "חורפיש-613793676",
    label: "חורפיש / Hurfeish",
    location: { lat: 33.017656, lng: 35.345869 },
  },
  {
    id: "חורשים-278477718",
    label: "חורשים / Khorashim",
    location: { lat: 32.137215, lng: 34.970697 },
  },
  {
    id: "חורשים-94531219",
    label: "חורשים / Khorashim",
    location: { lat: 32.138241, lng: 34.970469 },
  },
  {
    id: "חזון-278473692",
    label: "חזון / Hazon",
    location: { lat: 32.906772, lng: 35.394977 },
  },
  {
    id: "חזון-613826713",
    label: "חזון / Hazon",
    location: { lat: 32.905257, lng: 35.393926 },
  },
  {
    id: "חיבת-ציון-80420600",
    label: "חיבת ציון / Chibat Zion",
    location: { lat: 32.398841, lng: 34.913922 },
  },
  {
    id: "חיבת-ציון-278477962",
    label: "חיבת ציון / Hibbat Ziyyon",
    location: { lat: 32.398787, lng: 34.912017 },
  },
  {
    id: "חילף-615624660",
    label: "חילף / Hilf",
    location: { lat: 32.745690, lng: 35.148863 },
  },
  {
    id: "חילף-1100530883",
    label: "חילף / Hilf-Tabash",
    location: { lat: 32.747186, lng: 35.148650 },
  },
  {
    id: "חיספין-1652312951",
    label: "חיספין / Chispin",
    location: { lat: 32.845073, lng: 35.792836 },
  },
  {
    id: "חיספין-818551032",
    label: "חיספין / Chispin",
    location: { lat: 32.846100, lng: 35.793103 },
  },
  {
    id: "חלץ-278477193",
    label: "חלץ / Heletz",
    location: { lat: 31.577429, lng: 34.657533 },
  },
  {
    id: "חלץ-705444264",
    label: "חלץ / Heletz",
    location: { lat: 31.577449, lng: 34.657399 },
  },
  {
    id: "חמ-ד-מושב-401242681",
    label: "חמ\"ד (מושב) / Hemed",
    location: { lat: 32.018935, lng: 34.838011 },
  },
  {
    id: "חמ-ד-11575460879",
    label: "חמ\"ד / Hemed",
    location: { lat: 32.019045, lng: 34.841227 },
  },
  {
    id: "חמדון-1075734032",
    label: "חמדון / Hamdon",
    location: { lat: 32.884924, lng: 35.364688 },
  },
  {
    id: "חמדון-667948756",
    label: "חמדון / Hamdoon",
    location: { lat: 32.885118, lng: 35.364491 },
  },
  {
    id: "חמדיה-278477161",
    label: "חמדיה / Hamadya",
    location: { lat: 32.520104, lng: 35.520376 },
  },
  {
    id: "חמדיה-641623651",
    label: "חמדיה / Hamadya",
    location: { lat: 32.519709, lng: 35.519856 },
  },
  {
    id: "חמדת-ימים-278473663",
    label: "חמדת ימים / Hemdat Yamim",
    location: { lat: 32.948895, lng: 35.424530 },
  },
  {
    id: "חמדת-ימים-91566409",
    label: "חמדת ימים / Hemdat Yamim",
    location: { lat: 32.949056, lng: 35.424740 },
  },
  {
    id: "חניאל-278371892",
    label: "חניאל / Haniel",
    location: { lat: 32.332135, lng: 34.948582 },
  },
  {
    id: "חניאל-79322854",
    label: "חניאל / Haniel",
    location: { lat: 32.333319, lng: 34.949220 },
  },
  {
    id: "חניתה-278473602",
    label: "חניתה / Hanita",
    location: { lat: 33.087411, lng: 35.173347 },
  },
  {
    id: "חניתה-724737623",
    label: "חניתה / Hanita",
    location: { lat: 33.088218, lng: 35.174680 },
  },
  {
    id: "חנתון-290390596",
    label: "חנתון / Hanaton",
    location: { lat: 32.782608, lng: 35.245855 },
  },
  {
    id: "חנתון-91467018",
    label: "חנתון / Hanaton",
    location: { lat: 32.783801, lng: 35.245331 },
  },
  {
    id: "חפץ-חיים-278475022",
    label: "חפץ חיים / Hafetz Haim",
    location: { lat: 31.788823, lng: 34.800044 },
  },
  {
    id: "חפץ-חיים-82284859",
    label: "חפץ חיים / Hafetz Haim",
    location: { lat: 31.789065, lng: 34.801194 },
  },
  {
    id: "חפציבה-81373863",
    label: "חפציבה / Cheftziba",
    location: { lat: 32.518864, lng: 35.424374 },
  },
  {
    id: "חפציבה-276900354",
    label: "חפציבה / Haftsiba",
    location: { lat: 32.518167, lng: 35.425832 },
  },
  {
    id: "חצב-278475238",
    label: "חצב / Hatsav",
    location: { lat: 31.779270, lng: 34.769363 },
  },
  {
    id: "חצב-630767011",
    label: "חצב / Hatsav",
    location: { lat: 31.781417, lng: 34.769317 },
  },
  {
    id: "חצבה-2188338096",
    label: "חצבה / Hatseva",
    location: { lat: 30.767716, lng: 35.279625 },
  },
  {
    id: "חצבה-60256743",
    label: "חצבה / Hatseva",
    location: { lat: 30.770462, lng: 35.280515 },
  },
  {
    id: "חצור-אשדוד-278471173",
    label: "חצור אשדוד / Hazor Ashdod",
    location: { lat: 31.773093, lng: 34.721018 },
  },
  {
    id: "חצור-אשדוד-20354179",
    label: "חצור אשדוד / Hazor Ashdod",
    location: { lat: 31.773060, lng: 34.720575 },
  },
  {
    id: "חצור-הגלילית-278474273",
    label: "חצור הגלילית / Hatzor HaGlilit",
    location: { lat: 32.979170, lng: 35.543327 },
  },
  {
    id: "חצור-הגלילית-744604591",
    label: "חצור הגלילית / Hatzor HaGlilit",
    location: { lat: 32.984428, lng: 35.542065 },
  },
  {
    id: "חצרים-278473173",
    label: "חצרים / Hatzerim",
    location: { lat: 31.240410, lng: 34.715074 },
  },
  {
    id: "חצרים-93890374",
    label: "חצרים / Hatzerim",
    location: { lat: 31.239252, lng: 34.713713 },
  },
  {
    id: "חרב-לאת-80420581",
    label: "חרב לאת / Cherev Le'at",
    location: { lat: 32.402090, lng: 34.919612 },
  },
  {
    id: "חרב-לאת-278476465",
    label: "חרב לאת / Herev Le'et",
    location: { lat: 32.401272, lng: 34.917098 },
  },
  {
    id: "חרוצים-278473757",
    label: "חרוצים / Harutzim",
    location: { lat: 32.227502, lng: 34.864108 },
  },
  {
    id: "חרוצים-82883928",
    label: "חרוצים / Haruzim",
    location: { lat: 32.227834, lng: 34.864461 },
  },
  {
    id: "חרות-268703641",
    label: "חרות / Herut",
    location: { lat: 32.240297, lng: 34.915005 },
  },
  {
    id: "חרות-701255002",
    label: "חרות / Herut",
    location: { lat: 32.240120, lng: 34.914535 },
  },
  {
    id: "חריש-661437345",
    label: "חריש / Harish",
    location: { lat: 32.459640, lng: 35.051084 },
  },
  {
    id: "חריש-884844365",
    label: "חריש / Harish",
    location: { lat: 32.461486, lng: 35.049457 },
  },
  {
    id: "חרשים-278473538",
    label: "חרשים / Harashim",
    location: { lat: 32.956967, lng: 35.327979 },
  },
  {
    id: "חרשים-683922126",
    label: "חרשים / Harashim",
    location: { lat: 32.956602, lng: 35.327596 },
  },
  {
    id: "טבאש-527376751",
    label: "טבאש / Tabbash",
    location: { lat: 32.747365, lng: 35.171458 },
  },
  {
    id: "טבח-ה-366507249",
    label: "טבח'ה / Tabgha",
    location: { lat: 32.873249, lng: 35.549925 },
  },
  {
    id: "טבחה-91563715",
    label: "טבחה / Tabgha",
    location: { lat: 32.872808, lng: 35.550594 },
  },
  {
    id: "טבריה-278473513",
    label: "טבריה / Tiberias",
    location: { lat: 32.793852, lng: 35.532857 },
  },
  {
    id: "טבריה-786195800",
    label: "טבריה / Tiberias",
    location: { lat: 32.786995, lng: 35.521590 },
  },
  {
    id: "טובא-זנגריה-614207915",
    label: "טובא זנגריה / Tuba Zangaria",
    location: { lat: 32.966256, lng: 35.587953 },
  },
  {
    id: "טובא-זנגריה-278473727",
    label: "טובא זנגריה / Tuba Zangariya",
    location: { lat: 32.966320, lng: 35.594424 },
  },
  {
    id: "טורעאן-4911527519",
    label: "טורעאן / Tur'an",
    location: { lat: 32.777271, lng: 35.372522 },
  },
  {
    id: "טורעאן-612372887",
    label: "טורעאן / Turan",
    location: { lat: 32.776654, lng: 35.374985 },
  },
  {
    id: "טייבה-246258161",
    label: "טייבה / Taibe",
    location: { lat: 32.267125, lng: 35.008903 },
  },
  {
    id: "טירה-2285639757",
    label: "טירה / Tira",
    location: { lat: 32.234686, lng: 34.954455 },
  },
  {
    id: "טירה-604402902",
    label: "טירה / Tira",
    location: { lat: 32.233037, lng: 34.954610 },
  },
  {
    id: "טירת-יהודה-278478353",
    label: "טירת יהודה / Tirat Yehuda",
    location: { lat: 32.014065, lng: 34.933380 },
  },
  {
    id: "טירת-יהודה-616763453",
    label: "טירת יהודה / Tirat Yehuda",
    location: { lat: 32.013131, lng: 34.934480 },
  },
  {
    id: "טירת-כרמל-278474505",
    label: "טירת כרמל / Tirat Karmel",
    location: { lat: 32.761383, lng: 34.971551 },
  },
  {
    id: "טירת-כרמל-490104132",
    label: "טירת כרמל / Tirat Karmel",
    location: { lat: 32.761575, lng: 34.971586 },
  },
  {
    id: "טירת-צבי-278477694",
    label: "טירת צבי / Tirat Tsvi",
    location: { lat: 32.421858, lng: 35.527971 },
  },
  {
    id: "טירת-שלום-278473172",
    label: "טירת שלום / Tirat Shalom",
    location: { lat: 31.909318, lng: 34.785443 },
  },
  {
    id: "טל-אור-278476351",
    label: "טל אור / Tal Or",
    location: { lat: 31.352080, lng: 34.497104 },
  },
  {
    id: "טל-אור-82487879",
    label: "טל אור / Tal Or",
    location: { lat: 31.352079, lng: 34.497614 },
  },
  {
    id: "טל-שחר-601247627",
    label: "טל שחר / Tal Shachar",
    location: { lat: 31.804999, lng: 34.902738 },
  },
  {
    id: "טל-שחר-278476843",
    label: "טל שחר / Tal Shahar",
    location: { lat: 31.805060, lng: 34.902212 },
  },
  {
    id: "טל-אל-812224858",
    label: "טל-אל / Tal El",
    location: { lat: 32.927262, lng: 35.177255 },
  },
  {
    id: "טל-אל-609300093",
    label: "טל-אל / Tal El",
    location: { lat: 32.926060, lng: 35.178610 },
  },
  {
    id: "טללים-278478399",
    label: "טללים / Tlalim",
    location: { lat: 30.991906, lng: 34.770073 },
  },
  {
    id: "טללים-82487457",
    label: "טללים / Tlallim",
    location: { lat: 30.991979, lng: 34.770955 },
  },
  {
    id: "טמרה-278473700",
    label: "טמרה / Tamra",
    location: { lat: 32.634350, lng: 35.404253 },
  },
  {
    id: "טמרה-278478660",
    label: "טמרה / Tamra",
    location: { lat: 32.853488, lng: 35.197875 },
  },
  {
    id: "טמרה-612743885",
    label: "טמרה / Tamra",
    location: { lat: 32.854802, lng: 35.193529 },
  },
  {
    id: "טמרה-614216533",
    label: "טמרה / Tamra",
    location: { lat: 32.634034, lng: 35.404332 },
  },
  {
    id: "טפחות-278477435",
    label: "טפחות / Tefahot",
    location: { lat: 32.868428, lng: 35.423810 },
  },
  {
    id: "טפחות-667576224",
    label: "טפחות / Tefahot",
    location: { lat: 32.869386, lng: 35.422578 },
  },
  {
    id: "יבול-340065551",
    label: "יבול / Yevul",
    location: { lat: 31.188780, lng: 34.320398 },
  },
  {
    id: "יבול-711330229",
    label: "יבול / Yevul",
    location: { lat: 31.188690, lng: 34.317822 },
  },
  {
    id: "יבנאל-34621632",
    label: "יבנאל / Yavneel",
    location: { lat: 32.705456, lng: 35.505262 },
  },
  {
    id: "יבנאל-617895812",
    label: "יבנאל / Yavneel",
    location: { lat: 32.708709, lng: 35.500209 },
  },
  {
    id: "יבנה-278478617",
    label: "יבנה / Yavne",
    location: { lat: 31.876886, lng: 34.738297 },
  },
  {
    id: "יבנה-45782327",
    label: "יבנה / Yavne",
    location: { lat: 31.878839, lng: 34.736438 },
  },
  {
    id: "יגור-278477052",
    label: "יגור / Yagur",
    location: { lat: 32.742857, lng: 35.078133 },
  },
  {
    id: "יגל-278473657",
    label: "יגל / Yagel",
    location: { lat: 31.987041, lng: 34.880608 },
  },
  {
    id: "יגל-589697530",
    label: "יגל / Yaggel",
    location: { lat: 31.988255, lng: 34.878915 },
  },
  {
    id: "יד-בנימין-278476000",
    label: "יד בנימין / Yad Binyamin",
    location: { lat: 31.797840, lng: 34.821612 },
  },
  {
    id: "יד-בנימין-580879025",
    label: "יד בנימין / Yad Binyamin",
    location: { lat: 31.797108, lng: 34.821932 },
  },
  {
    id: "יד-השמונה-6127950145",
    label: "יד השמונה / Yad HaShmona",
    location: { lat: 31.809472, lng: 35.090196 },
  },
  {
    id: "יד-השמונה-621194521",
    label: "יד השמונה / Yad HaShmona",
    location: { lat: 31.809138, lng: 35.089391 },
  },
  {
    id: "יד-חנה-278371781",
    label: "יד חנה / Yad Hanna",
    location: { lat: 32.325516, lng: 35.006100 },
  },
  {
    id: "יד-חנה-83038990",
    label: "יד חנה / Yad Hanna",
    location: { lat: 32.326260, lng: 35.005841 },
  },
  {
    id: "יד-מרדכי-278478204",
    label: "יד מרדכי / Yad Mordechay",
    location: { lat: 31.588677, lng: 34.559000 },
  },
  {
    id: "יד-נתן-278469765",
    label: "יד נתן / Yad Natan",
    location: { lat: 31.652882, lng: 34.705505 },
  },
  {
    id: "יד-נתן-705421775",
    label: "יד נתן / Yad Natan",
    location: { lat: 31.652450, lng: 34.705920 },
  },
  {
    id: "יד-רמב-ם-278477425",
    label: "יד רמב\"ם / Yad Rambam",
    location: { lat: 31.899372, lng: 34.900746 },
  },
  {
    id: "יד-רמב-ם-588483272",
    label: "יד רמב\"ם / Yad Rambam",
    location: { lat: 31.900634, lng: 34.901240 },
  },
  {
    id: "יהוד-מונוסון-278432306",
    label: "יהוד מונוסון / Yehud Monosson",
    location: { lat: 32.033176, lng: 34.890753 },
  },
  {
    id: "יהוד-מונוסון-16756348",
    label: "יהוד מונוסון / Yehud Monosson",
    location: { lat: 32.032498, lng: 34.886361 },
  },
  {
    id: "יהל-278477072",
    label: "יהל / Yahel",
    location: { lat: 30.081942, lng: 35.128769 },
  },
  {
    id: "יהל-617416834",
    label: "יהל / Yahel",
    location: { lat: 30.082498, lng: 35.129024 },
  },
  {
    id: "יובלים-278478680",
    label: "יובלים / Yuvalim",
    location: { lat: 32.877505, lng: 35.270563 },
  },
  {
    id: "יובלים-676543511",
    label: "יובלים / Yuvalim",
    location: { lat: 32.878217, lng: 35.270803 },
  },
  {
    id: "יודפת-278469762",
    label: "יודפת / Yodfat",
    location: { lat: 32.837237, lng: 35.271554 },
  },
  {
    id: "יודפת-676642081",
    label: "יודפת / Yodfat",
    location: { lat: 32.837546, lng: 35.272753 },
  },
  {
    id: "יונתן-6767259739",
    label: "יונתן / Yonatan",
    location: { lat: 32.938471, lng: 35.794963 },
  },
  {
    id: "יונתן-92005691",
    label: "יונתן / Yonatan",
    location: { lat: 32.937032, lng: 35.793965 },
  },
  {
    id: "יוקנעם-המושבה-94542157",
    label: "יוקנעם המושבה / Yokne'am (Moshava)",
    location: { lat: 32.657264, lng: 35.114911 },
  },
  {
    id: "יוקנעם-המושבה-563338605",
    label: "יוקנעם המושבה / Yoqneam HaMoshava",
    location: { lat: 32.653841, lng: 35.114766 },
  },
  {
    id: "יוקנעם-עילית-632580316",
    label: "יוקנעם עילית / Yokneam Illit",
    location: { lat: 32.649028, lng: 35.091865 },
  },
  {
    id: "יוקנעם-עילית-278477073",
    label: "יוקנעם עילית / Yoqneam Illit",
    location: { lat: 32.648060, lng: 35.094355 },
  },
  {
    id: "יושיביה-1842606229",
    label: "יושיביה / Yoshivya",
    location: { lat: 31.443548, lng: 34.609145 },
  },
  {
    id: "יושיביה-680733775",
    label: "יושיביה / Yoshivya",
    location: { lat: 31.443329, lng: 34.607938 },
  },
  {
    id: "יזרעאל-278474703",
    label: "יזרעאל / Yizra'el",
    location: { lat: 32.562351, lng: 35.321340 },
  },
  {
    id: "יזרעאל-81374645",
    label: "יזרעאל / Yizra'el",
    location: { lat: 32.563676, lng: 35.320920 },
  },
  {
    id: "יזרעם-278476393",
    label: "יזרעם / Yizream",
    location: { lat: 31.442820, lng: 34.572902 },
  },
  {
    id: "יחד-429882182",
    label: "יחד / Yahad",
    location: { lat: 32.845569, lng: 35.360563 },
  },
  {
    id: "יחד-91561040",
    label: "יחד / Yahad",
    location: { lat: 32.844983, lng: 35.363677 },
  },
  {
    id: "יחיעם-278472470",
    label: "יחיעם / Yehiam",
    location: { lat: 32.996715, lng: 35.220451 },
  },
  {
    id: "יחיעם-687011355",
    label: "יחיעם / Yehiam",
    location: { lat: 32.997393, lng: 35.219491 },
  },
  {
    id: "יטבתה-278475585",
    label: "יטבתה / Yotvata",
    location: { lat: 29.895920, lng: 35.059622 },
  },
  {
    id: "יטבתה-842802407",
    label: "יטבתה / Yotvata",
    location: { lat: 29.896273, lng: 35.059318 },
  },
  {
    id: "יישוב-בדואי-194435782",
    label: "יישוב בדואי / Beduin village",
    location: { lat: 31.244575, lng: 35.258502 },
  },
  {
    id: "יכיני-680733124",
    label: "יכיני / Yachini",
    location: { lat: 31.482535, lng: 34.600487 },
  },
  {
    id: "יכיני-278477957",
    label: "יכיני / Yakhini",
    location: { lat: 31.483223, lng: 34.600086 },
  },
  {
    id: "ימה-144384399",
    label: "ימה / Yama",
    location: { lat: 32.368615, lng: 35.030389 },
  },
  {
    id: "ימה-278473042",
    label: "ימה / Yamma",
    location: { lat: 32.368364, lng: 35.030288 },
  },
  {
    id: "ימין-אורד-90830157",
    label: "ימין אורד / Yemin Ord",
    location: { lat: 32.702085, lng: 34.989107 },
  },
  {
    id: "ימין-אורד-278476181",
    label: "ימין אורד / Yemin Orde",
    location: { lat: 32.701656, lng: 34.989777 },
  },
  {
    id: "ינוב-278371306",
    label: "ינוב / Yanuv",
    location: { lat: 32.306055, lng: 34.950462 },
  },
  {
    id: "ינוב-700127667",
    label: "ינוב / Yanuv",
    location: { lat: 32.306449, lng: 34.948926 },
  },
  {
    id: "ינוח-613803058",
    label: "ינוח / Yanuach",
    location: { lat: 32.984066, lng: 35.249207 },
  },
  {
    id: "ינוח-278476931",
    label: "ינוח / Yanuh",
    location: { lat: 32.983671, lng: 35.251911 },
  },
  {
    id: "ינון-278470472",
    label: "ינון / Yinon",
    location: { lat: 31.742916, lng: 34.779518 },
  },
  {
    id: "ינון-601727764",
    label: "ינון / Yinon",
    location: { lat: 31.742619, lng: 34.782485 },
  },
  {
    id: "יסוד-המעלה-954189275",
    label: "יסוד המעלה / Yesood Hama'alla",
    location: { lat: 33.057107, lng: 35.600899 },
  },
  {
    id: "יסוד-המעלה-278478059",
    label: "יסוד המעלה / Yesud HaMaala",
    location: { lat: 33.057381, lng: 35.603016 },
  },
  {
    id: "יסודות-13008830101",
    label: "יסודות / Yesodot",
    location: { lat: 31.814932, lng: 34.866165 },
  },
  {
    id: "יסודות-580628759",
    label: "יסודות / Yesodot",
    location: { lat: 31.816187, lng: 34.863998 },
  },
  {
    id: "יסעור-278476474",
    label: "יסעור / Yasur",
    location: { lat: 32.901094, lng: 35.166347 },
  },
  {
    id: "יעד-475499382",
    label: "יעד / Ya'ad",
    location: { lat: 32.878260, lng: 35.243568 },
  },
  {
    id: "יעד-90969779",
    label: "יעד / Ya'ad",
    location: { lat: 32.879432, lng: 35.242885 },
  },
  {
    id: "יעל-278477095",
    label: "יעל / Yael",
    location: { lat: 32.551924, lng: 35.307900 },
  },
  {
    id: "יעל-617494980",
    label: "יעל / Yael",
    location: { lat: 32.552120, lng: 35.308081 },
  },
  {
    id: "יעף-388389137",
    label: "יעף / Yaaf",
    location: { lat: 32.268341, lng: 34.965916 },
  },
  {
    id: "יעף-93459815",
    label: "יעף / Yaaf",
    location: { lat: 32.267893, lng: 34.966421 },
  },
  {
    id: "יערה-278478097",
    label: "יערה / Yaara",
    location: { lat: 33.067421, lng: 35.185848 },
  },
  {
    id: "יערה-692623822",
    label: "יערה / Yaara",
    location: { lat: 33.067261, lng: 35.184710 },
  },
  {
    id: "יפיע-610600186",
    label: "יפיע / Yafia",
    location: { lat: 32.684237, lng: 35.273692 },
  },
  {
    id: "יפיע-נצרת-278478700",
    label: "יפיע נצרת / Yafia",
    location: { lat: 32.686592, lng: 35.277213 },
  },
  {
    id: "יפעת-617460633",
    label: "יפעת / Ifat",
    location: { lat: 32.675475, lng: 35.224381 },
  },
  {
    id: "יפעת-278473132",
    label: "יפעת / Yifat",
    location: { lat: 32.677197, lng: 35.223873 },
  },
  {
    id: "יפתח-278476405",
    label: "יפתח / Yiftah",
    location: { lat: 33.128614, lng: 35.551947 },
  },
  {
    id: "יפתח-579016864",
    label: "יפתח / Yiftah",
    location: { lat: 33.128106, lng: 35.550819 },
  },
  {
    id: "יציץ-589206810",
    label: "יציץ / Yatzitz",
    location: { lat: 31.863521, lng: 34.860210 },
  },
  {
    id: "יציץ-278474841",
    label: "יציץ / Yaziz",
    location: { lat: 31.862343, lng: 34.862954 },
  },
  {
    id: "יקום-278476975",
    label: "יקום / Yakum",
    location: { lat: 32.248573, lng: 34.842087 },
  },
  {
    id: "יקום-30678665",
    label: "יקום / Yaqum",
    location: { lat: 32.248099, lng: 34.842354 },
  },
  {
    id: "יראון-278477901",
    label: "יראון / Yir'on",
    location: { lat: 33.077784, lng: 35.455753 },
  },
  {
    id: "יראון-690149009",
    label: "יראון / Yir'on",
    location: { lat: 33.076801, lng: 35.455213 },
  },
  {
    id: "ירדנה-278473082",
    label: "ירדנה / Yardena",
    location: { lat: 32.564439, lng: 35.564577 },
  },
  {
    id: "ירדנה-617404172",
    label: "ירדנה / Yardena",
    location: { lat: 32.564579, lng: 35.564264 },
  },
  {
    id: "ירוחם-703467383",
    label: "ירוחם / Yerocham",
    location: { lat: 30.986997, lng: 34.932298 },
  },
  {
    id: "ירוחם-739191371",
    label: "ירוחם / Yerucham",
    location: { lat: 30.988803, lng: 34.925097 },
  },
  {
    id: "ירחיב-83812502",
    label: "ירחיב / Yarchiv",
    location: { lat: 32.154044, lng: 34.968818 },
  },
  {
    id: "ירחיב-278470623",
    label: "ירחיב / Yarhiv",
    location: { lat: 32.153146, lng: 34.968308 },
  },
  {
    id: "ירכא-278478610",
    label: "ירכא / Yarka",
    location: { lat: 32.954887, lng: 35.208790 },
  },
  {
    id: "ירכא-614167042",
    label: "ירכא / Yarka",
    location: { lat: 32.956304, lng: 35.203238 },
  },
  {
    id: "ירקונה-11580612127",
    label: "ירקונה / Yarkona",
    location: { lat: 32.145984, lng: 34.898798 },
  },
  {
    id: "ירקונה-92481055",
    label: "ירקונה / Yarkona",
    location: { lat: 32.144722, lng: 34.898564 },
  },
  {
    id: "ישוב-בדואי-358902755",
    label: "ישוב בדואי",
    location: { lat: 31.002034, lng: 34.934906 },
  },
  {
    id: "ישוב-בדואי-4452296248",
    label: "ישוב בדואי / Bedouin Settlement",
    location: { lat: 30.985363, lng: 34.961833 },
  },
  {
    id: "ישוב-בדואי-1550362639",
    label: "ישוב בדואי / Bedouin village",
    location: { lat: 31.275673, lng: 35.283565 },
  },
  {
    id: "ישע-278477535",
    label: "ישע / Yesha",
    location: { lat: 31.246415, lng: 34.403254 },
  },
  {
    id: "ישע-82487634",
    label: "ישע / Yesha",
    location: { lat: 31.248418, lng: 34.401367 },
  },
  {
    id: "ישעי-278475059",
    label: "ישעי / Yishi",
    location: { lat: 31.751637, lng: 34.965419 },
  },
  {
    id: "ישעי-82628523",
    label: "ישעי / Yishi",
    location: { lat: 31.750985, lng: 34.964948 },
  },
  {
    id: "ישרש-278477166",
    label: "ישרש / Yashresh",
    location: { lat: 31.915785, lng: 34.849927 },
  },
  {
    id: "ישרש-72249046",
    label: "ישרש / Yashresh",
    location: { lat: 31.915492, lng: 34.846875 },
  },
  {
    id: "יתד-340065420",
    label: "יתד / Yated",
    location: { lat: 31.205960, lng: 34.327436 },
  },
  {
    id: "יתד-711326312",
    label: "יתד / Yatted",
    location: { lat: 31.206637, lng: 34.326931 },
  },
  {
    id: "כאבול-278477045",
    label: "כאבול / Kabul",
    location: { lat: 32.867701, lng: 35.210055 },
  },
  {
    id: "כאבול-615162006",
    label: "כאבול / Kabul",
    location: { lat: 32.868591, lng: 35.208628 },
  },
  {
    id: "כאוכב-אבו-אל-היג-א-275957492",
    label: "כאוכב אבו אל-היג'א / Kaukab Abu al-Hija",
    location: { lat: 32.830919, lng: 35.249483 },
  },
  {
    id: "כאוכב-אבו-אל-היג-א-613835109",
    label: "כאוכב אבו אל-היג'א / Kaukab Abu al-Hija",
    location: { lat: 32.831038, lng: 35.249154 },
  },
  {
    id: "כברי-278478040",
    label: "כברי / Kabri",
    location: { lat: 33.021499, lng: 35.148501 },
  },
  {
    id: "כברי-691217345",
    label: "כברי / Kabri",
    location: { lat: 33.021593, lng: 35.149534 },
  },
  {
    id: "כדורי-5846856511",
    label: "כדורי / Kaduri",
    location: { lat: 32.703902, lng: 35.406668 },
  },
  {
    id: "כדיתה-4212977081",
    label: "כדיתה / Kaddita",
    location: { lat: 33.006618, lng: 35.466773 },
  },
  {
    id: "כדיתה-689494720",
    label: "כדיתה / Kaditta",
    location: { lat: 33.005649, lng: 35.464551 },
  },
  {
    id: "כוחלה-7266465",
    label: "כוחלה / Kuchla",
    location: { lat: 31.292485, lng: 35.056478 },
  },
  {
    id: "כוחלה-4867951512",
    label: "כוחלה / Kuhlih",
    location: { lat: 31.285373, lng: 35.057474 },
  },
  {
    id: "כוכב-יאיר-צור-יגאל-389458395",
    label: "כוכב יאיר צור יגאל / Kochav Yair Tzur Yigal",
    location: { lat: 32.220163, lng: 34.993953 },
  },
  {
    id: "כוכב-יאיר-צור-יגאל-701624127",
    label: "כוכב יאיר צור יגאל / Kochav Yair Tzur Yigal",
    location: { lat: 32.220246, lng: 34.994985 },
  },
  {
    id: "כוכב-מיכאל-278476997",
    label: "כוכב מיכאל / Kokhav Michael",
    location: { lat: 31.627486, lng: 34.667089 },
  },
  {
    id: "כוכב-מיכאל-705438273",
    label: "כוכב מיכאל / Kokhav Michael",
    location: { lat: 31.629967, lng: 34.669446 },
  },
  {
    id: "כורזים-372902939",
    label: "כורזים / Korazim",
    location: { lat: 32.910980, lng: 35.552661 },
  },
  {
    id: "כורזים-91563713",
    label: "כורזים / Korazim",
    location: { lat: 32.910153, lng: 35.550723 },
  },
  {
    id: "כחל-91562897",
    label: "כחל / Kachal",
    location: { lat: 32.890038, lng: 35.511251 },
  },
  {
    id: "כחל-288691435",
    label: "כחל / Kahal",
    location: { lat: 32.891318, lng: 35.510711 },
  },
  {
    id: "כיסופים-278474561",
    label: "כיסופים / Kisufim",
    location: { lat: 31.374161, lng: 34.399449 },
  },
  {
    id: "כיסופים-897748805",
    label: "כיסופים / Kisufim",
    location: { lat: 31.374986, lng: 34.398573 },
  },
  {
    id: "כיסרא-278477519",
    label: "כיסרא / Kisra",
    location: { lat: 32.962869, lng: 35.302151 },
  },
  {
    id: "כיסרא-615158550",
    label: "כיסרא / Kisra",
    location: { lat: 32.965648, lng: 35.302953 },
  },
  {
    id: "כישור-429882328",
    label: "כישור / Kishor",
    location: { lat: 32.945775, lng: 35.249538 },
  },
  {
    id: "כישור-688161843",
    label: "כישור / Kishor",
    location: { lat: 32.946292, lng: 35.249534 },
  },
  {
    id: "כליל-429882160",
    label: "כליל / Klil",
    location: { lat: 32.985530, lng: 35.200478 },
  },
  {
    id: "כליל-687065415",
    label: "כליל / Klil",
    location: { lat: 32.985375, lng: 35.200585 },
  },
  {
    id: "כלנית-610271979",
    label: "כלנית / Kalanit",
    location: { lat: 32.874424, lng: 35.455017 },
  },
  {
    id: "כלנית-278474430",
    label: "כלנית / Kallanit",
    location: { lat: 32.874993, lng: 35.452771 },
  },
  {
    id: "כמאנה-8244338547",
    label: "כמאנה / Kamanneh",
    location: { lat: 32.908702, lng: 35.336498 },
  },
  {
    id: "כמאנה-668363132",
    label: "כמאנה / Kamanneh",
    location: { lat: 32.908385, lng: 35.339402 },
  },
  {
    id: "כמאנה-מזרחית-611890542",
    label: "כמאנה מזרחית / East Kamanneh",
    location: { lat: 32.910147, lng: 35.353275 },
  },
  {
    id: "כמאנה-מזרחית-2009043905",
    label: "כמאנה מזרחית / Eastern Kamana",
    location: { lat: 32.908531, lng: 35.354557 },
  },
  {
    id: "כמאנה-מערבית-1075674328",
    label: "כמאנה מערבית / West Kamanneh",
    location: { lat: 32.909085, lng: 35.339842 },
  },
  {
    id: "כמהין-970299572",
    label: "כמהין / Kmehin",
    location: { lat: 30.910014, lng: 34.431027 },
  },
  {
    id: "כמהין-83365029",
    label: "כמהין / Kmehin",
    location: { lat: 30.910248, lng: 34.431652 },
  },
  {
    id: "כמון-278469942",
    label: "כמון / Kammon",
    location: { lat: 32.911389, lng: 35.361256 },
  },
  {
    id: "כמון-611890541",
    label: "כמון / Kamon",
    location: { lat: 32.911538, lng: 35.359954 },
  },
  {
    id: "כנות-278476495",
    label: "כנות / Kannot",
    location: { lat: 31.802640, lng: 34.752375 },
  },
  {
    id: "כנות-92387602",
    label: "כנות / Kannot",
    location: { lat: 31.802901, lng: 34.751823 },
  },
  {
    id: "כנף-300162809",
    label: "כנף / Kanaf",
    location: { lat: 32.870027, lng: 35.698271 },
  },
  {
    id: "כנף-90573978",
    label: "כנף / Kanaf",
    location: { lat: 32.870196, lng: 35.697806 },
  },
  {
    id: "כנרת-מושבה-278476067",
    label: "כנרת מושבה / Kinneret",
    location: { lat: 32.723199, lng: 35.564440 },
  },
  {
    id: "כנרת-מושבה-642538977",
    label: "כנרת מושבה / Kinneret Moshava",
    location: { lat: 32.722262, lng: 35.563875 },
  },
  {
    id: "כסיפה-599556920",
    label: "כסיפה / Kuseife",
    location: { lat: 31.246537, lng: 35.093057 },
  },
  {
    id: "כסיפה-58533605",
    label: "כסיפה / Kuseife",
    location: { lat: 31.245247, lng: 35.091726 },
  },
  {
    id: "כסלון-1643319096",
    label: "כסלון / Kesalon",
    location: { lat: 31.774086, lng: 35.049233 },
  },
  {
    id: "כסלון-92342913",
    label: "כסלון / Kesalon",
    location: { lat: 31.774132, lng: 35.049871 },
  },
  {
    id: "כעביה-טבאש-חג-אג-רה-527376442",
    label: "כעביה טבאש חג'אג'רה / Ka'abiyye-Tabbash-Hajajre",
    location: { lat: 32.748854, lng: 35.184097 },
  },
  {
    id: "כעביה-טבאש-חג-אג-רה-94795130",
    label: "כעביה טבאש חג'אג'רה / Kaabiye Tabesh Hajajira",
    location: { lat: 32.752524, lng: 35.183609 },
  },
  {
    id: "כעביה-צפון-527376792",
    label: "כעביה צפון / Kaabiye North",
    location: { lat: 32.757616, lng: 35.182960 },
  },
  {
    id: "כפר-אבו-עיסא-1302563000",
    label: "כפר אבו עיסא",
    location: { lat: 32.395024, lng: 34.901784 },
  },
  {
    id: "כפר-אביב-278476499",
    label: "כפר אביב / Kfar Aviv",
    location: { lat: 31.831816, lng: 34.721337 },
  },
  {
    id: "כפר-אביב-84014302",
    label: "כפר אביב / Kfar Aviv",
    location: { lat: 31.831687, lng: 34.722083 },
  },
  {
    id: "כפר-אוריה-275232508",
    label: "כפר אוריה / Kfar Uriya",
    location: { lat: 31.791995, lng: 34.946572 },
  },
  {
    id: "כפר-אוריה-580636472",
    label: "כפר אוריה / Kfar Uriya",
    location: { lat: 31.792736, lng: 34.947247 },
  },
  {
    id: "כפר-אחים-601834248",
    label: "כפר אחים / Kfar Achim",
    location: { lat: 31.745051, lng: 34.756825 },
  },
  {
    id: "כפר-אחים-278476765",
    label: "כפר אחים / Kfar Ahim",
    location: { lat: 31.744829, lng: 34.756398 },
  },
  {
    id: "כפר-ביאליק-93302244",
    label: "כפר ביאליק / Kefar Bialik",
    location: { lat: 32.819534, lng: 35.088501 },
  },
  {
    id: "כפר-ביאליק-278478573",
    label: "כפר ביאליק / Kfar Bialik",
    location: { lat: 32.820393, lng: 35.086913 },
  },
  {
    id: "כפר-ביל-ו-278470138",
    label: "כפר ביל\"ו / Kfar Bilu",
    location: { lat: 31.877482, lng: 34.820314 },
  },
  {
    id: "כפר-ביל-ו-83027308",
    label: "כפר ביל\"ו / Kfar Bilu",
    location: { lat: 31.876954, lng: 34.821054 },
  },
  {
    id: "כפר-ביל-ו-ב-407969018",
    label: "כפר ביל\"ו ב׳ / Kfar Bilu B",
    location: { lat: 31.871034, lng: 34.827668 },
  },
  {
    id: "כפר-ביל-ו-ב-1004464696",
    label: "כפר ביל״ו ב׳ / Kfar Bilu B",
    location: { lat: 31.871420, lng: 34.827917 },
  },
  {
    id: "כפר-בלום-275283320",
    label: "כפר בלום / Kfar Blum",
    location: { lat: 33.172366, lng: 35.610122 },
  },
  {
    id: "כפר-בלום-582895558",
    label: "כפר בלום / Kfar Blum",
    location: { lat: 33.173317, lng: 35.609516 },
  },
  {
    id: "כפר-בן-נון-588959989",
    label: "כפר בן-נון / Kfar Bin Nun",
    location: { lat: 31.861950, lng: 34.947623 },
  },
  {
    id: "כפר-ברא-69358412",
    label: "כפר ברא / Kafr Bara",
    location: { lat: 32.131299, lng: 34.970773 },
  },
  {
    id: "כפר-ברא-278475566",
    label: "כפר ברא / Kfar Bara",
    location: { lat: 32.131092, lng: 34.970331 },
  },
  {
    id: "כפר-ברוך-617002570",
    label: "כפר ברוך / Kfar Barooch",
    location: { lat: 32.645751, lng: 35.190496 },
  },
  {
    id: "כפר-ברוך-278474024",
    label: "כפר ברוך / Kfar Baruch",
    location: { lat: 32.646018, lng: 35.193007 },
  },
  {
    id: "כפר-גדעון-278478099",
    label: "כפר גדעון / Kfar Gideon",
    location: { lat: 32.642983, lng: 35.291583 },
  },
  {
    id: "כפר-גדעון-617066740",
    label: "כפר גדעון / Kfar Gideon",
    location: { lat: 32.643405, lng: 35.291372 },
  },
  {
    id: "כפר-גלים-79306534",
    label: "כפר גלים / Kfar Galim",
    location: { lat: 32.766559, lng: 34.958725 },
  },
  {
    id: "כפר-גלים-278477819",
    label: "כפר גלים / Kfar Gallim",
    location: { lat: 32.766582, lng: 34.959331 },
  },
  {
    id: "כפר-גליקסון-278477169",
    label: "כפר גליקסון / Kefar Glickson",
    location: { lat: 32.504959, lng: 35.004799 },
  },
  {
    id: "כפר-גליקסון-84844779",
    label: "כפר גליקסון / Kefar Glickson",
    location: { lat: 32.506416, lng: 35.005150 },
  },
  {
    id: "כפר-גלעדי-3058564252",
    label: "כפר גלעדי / Kfar Giladi",
    location: { lat: 33.241784, lng: 35.574961 },
  },
  {
    id: "כפר-גלעדי-838963992",
    label: "כפר גלעדי / Kfar Giladi",
    location: { lat: 33.242557, lng: 35.575237 },
  },
  {
    id: "כפר-דניאל-275283313",
    label: "כפר דניאל / Kfar Daniel",
    location: { lat: 31.933300, lng: 34.932622 },
  },
  {
    id: "כפר-דניאל-589089613",
    label: "כפר דניאל / Kfar Daniel",
    location: { lat: 31.933281, lng: 34.932298 },
  },
  {
    id: "כפר-האורנים-93325284",
    label: "כפר האורנים / Kfar HaOranim",
    location: { lat: 31.919615, lng: 35.037495 },
  },
  {
    id: "כפר-החורש-618477927",
    label: "כפר החורש / Kefar HaHoresh",
    location: { lat: 32.701657, lng: 35.273550 },
  },
  {
    id: "כפר-החורש-278475603",
    label: "כפר החורש / Kfar HaHoresh",
    location: { lat: 32.701332, lng: 35.274190 },
  },
  {
    id: "כפר-המכבי-94525296",
    label: "כפר המכבי / Kefar HaMaccabi",
    location: { lat: 32.790079, lng: 35.115391 },
  },
  {
    id: "כפר-המכבי-278474012",
    label: "כפר המכבי / Kfar HaMaccabi",
    location: { lat: 32.791063, lng: 35.114900 },
  },
  {
    id: "כפר-הנגיד-385731794",
    label: "כפר הנגיד / Kefar HaNagid",
    location: { lat: 31.887506, lng: 34.749014 },
  },
  {
    id: "כפר-הנגיד-278473961",
    label: "כפר הנגיד / Kfar HaNagid",
    location: { lat: 31.886691, lng: 34.749558 },
  },
  {
    id: "כפר-הנוער-בן-שמן-278478483",
    label: "כפר הנוער בן שמן / Ben Shemen Youth village",
    location: { lat: 31.959343, lng: 34.929261 },
  },
  {
    id: "כפר-הנוער-בן-שמן-83598519",
    label: "כפר הנוער בן שמן / Ben Shemen Youth village",
    location: { lat: 31.959565, lng: 34.928935 },
  },
  {
    id: "כפר-הנוער-הדתי-278477647",
    label: "כפר הנוער הדתי / Kfar HaNoar HaDati",
    location: { lat: 32.742671, lng: 35.101404 },
  },
  {
    id: "כפר-הנוער-הדתי-698760498",
    label: "כפר הנוער הדתי / Kfar HaNoar HaDati",
    location: { lat: 32.742812, lng: 35.101427 },
  },
  {
    id: "כפר-הנוער-מאיר-שפיה-957277383",
    label: "כפר הנוער מאיר שפיה / Meir Shefeya Youth Village",
    location: { lat: 32.591454, lng: 34.970910 },
  },
  {
    id: "כפר-הנוער-מאיר-שפיה-277024873",
    label: "כפר הנוער מאיר שפיה / Meir Shfeya Youth Village",
    location: { lat: 32.590794, lng: 34.970645 },
  },
  {
    id: "כפר-הנוקדים-3568331220",
    label: "כפר הנוקדים / Kfar Hanokdim",
    location: { lat: 31.305305, lng: 35.269288 },
  },
  {
    id: "כפר-הנשיא-278477159",
    label: "כפר הנשיא / Kfar HaNasi",
    location: { lat: 32.974888, lng: 35.603828 },
  },
  {
    id: "כפר-הנשיא-616335330",
    label: "כפר הנשיא / Kfar HaNasi",
    location: { lat: 32.975227, lng: 35.602333 },
  },
  {
    id: "כפר-הס-278473186",
    label: "כפר הס / Kfar Hess",
    location: { lat: 32.245780, lng: 34.933975 },
  },
  {
    id: "כפר-הס-79675557",
    label: "כפר הס / Kfar Hess",
    location: { lat: 32.245824, lng: 34.933339 },
  },
  {
    id: "כפר-הרא-ה-80418849",
    label: "כפר הרא״ה / Kfar Haro'e",
    location: { lat: 32.389720, lng: 34.912064 },
  },
  {
    id: "כפר-הרא-ה-278477163",
    label: "כפר הרא״ה / Kfar Haro'eh",
    location: { lat: 32.389751, lng: 34.911853 },
  },
  {
    id: "כפר-הרי-ף-278476506",
    label: "כפר הרי״ף / Kfar HaRif",
    location: { lat: 31.746333, lng: 34.792464 },
  },
  {
    id: "כפר-הרי-ף-707229592",
    label: "כפר הרי״ף / Kfar HaRif",
    location: { lat: 31.744203, lng: 34.794157 },
  },
  {
    id: "כפר-ויתקין-275232523",
    label: "כפר ויתקין / Kfar Vitkin",
    location: { lat: 32.380936, lng: 34.875192 },
  },
  {
    id: "כפר-ויתקין-80417973",
    label: "כפר ויתקין / Kfar Vitkin",
    location: { lat: 32.380946, lng: 34.874492 },
  },
  {
    id: "כפר-ורבורג-275232515",
    label: "כפר ורבורג / Kfar Warburg",
    location: { lat: 31.719964, lng: 34.724181 },
  },
  {
    id: "כפר-ורבורג-92032509",
    label: "כפר ורבורג / Kfar Warburg",
    location: { lat: 31.719665, lng: 34.726182 },
  },
  {
    id: "כפר-ורדים-278473797",
    label: "כפר ורדים / Kfar Vradim",
    location: { lat: 32.997251, lng: 35.272534 },
  },
  {
    id: "כפר-ורדים-612073289",
    label: "כפר ורדים / Kfar Vradim",
    location: { lat: 32.995903, lng: 35.267504 },
  },
  {
    id: "כפר-זוהרים-8307131114",
    label: "כפר זוהרים / Kfar Zoharim",
    location: { lat: 31.621712, lng: 34.924892 },
  },
  {
    id: "כפר-זיתים-618045229",
    label: "כפר זיתים / Kefar Zetim",
    location: { lat: 32.811423, lng: 35.462579 },
  },
  {
    id: "כפר-זיתים-278478701",
    label: "כפר זיתים / Kfar Zetim",
    location: { lat: 32.810658, lng: 35.463787 },
  },
  {
    id: "כפר-חב-ד-947249690",
    label: "כפר חב\"ד / Kefar Habad",
    location: { lat: 31.990448, lng: 34.851245 },
  },
  {
    id: "כפר-חב-ד-278476467",
    label: "כפר חב\"ד / Kfar Habad",
    location: { lat: 31.988579, lng: 34.847370 },
  },
  {
    id: "כפר-חושן-278478685",
    label: "כפר חושן / Kfar Hoshen",
    location: { lat: 33.010847, lng: 35.438665 },
  },
  {
    id: "כפר-חושן-616552651",
    label: "כפר חושן / Kfar Hoshen",
    location: { lat: 33.010787, lng: 35.438848 },
  },
  {
    id: "כפר-חיטים-618047902",
    label: "כפר חיטים / Kefar Hittim",
    location: { lat: 32.800303, lng: 35.502666 },
  },
  {
    id: "כפר-חיטים-278476835",
    label: "כפר חיטים / Kfar Hitim",
    location: { lat: 32.799344, lng: 35.501049 },
  },
  {
    id: "כפר-חיים-90647172",
    label: "כפר חיים / Kfar Haim",
    location: { lat: 32.354043, lng: 34.899908 },
  },
  {
    id: "כפר-חיים-278370160",
    label: "כפר חיים / Kfar Hayyim",
    location: { lat: 32.353982, lng: 34.900142 },
  },
  {
    id: "כפר-חנניה-278476189",
    label: "כפר חנניה / Kfar Hananya",
    location: { lat: 32.916109, lng: 35.424146 },
  },
  {
    id: "כפר-חנניה-616542425",
    label: "כפר חנניה / Kfar Hananya",
    location: { lat: 32.915577, lng: 35.423107 },
  },
  {
    id: "כפר-חסידים-549201637",
    label: "כפר חסידים / Kefar Hasidim",
    location: { lat: 32.749696, lng: 35.090918 },
  },
  {
    id: "כפר-חסידים-278474110",
    label: "כפר חסידים / Kfar Hassidim",
    location: { lat: 32.751948, lng: 35.093552 },
  },
  {
    id: "כפר-חרוב-13294105857",
    label: "כפר חרוב / Kfar Haruv",
    location: { lat: 32.763180, lng: 35.664043 },
  },
  {
    id: "כפר-חרוב-5596366",
    label: "כפר חרוב / Kfar Haruv",
    location: { lat: 32.762355, lng: 35.664661 },
  },
  {
    id: "כפר-טרומן-275232533",
    label: "כפר טרומן / Kfar Truman",
    location: { lat: 31.980556, lng: 34.921667 },
  },
  {
    id: "כפר-טרומן-587828581",
    label: "כפר טרומן / Kfar Truman",
    location: { lat: 31.979491, lng: 34.923763 },
  },
  {
    id: "כפר-יאסיף-278474386",
    label: "כפר יאסיף / Kafr Yasif",
    location: { lat: 32.953307, lng: 35.165698 },
  },
  {
    id: "כפר-יאסיף-614168322",
    label: "כפר יאסיף / Kafr Yasif",
    location: { lat: 32.953309, lng: 35.164822 },
  },
  {
    id: "כפר-ידידיה-278476384",
    label: "כפר ידידיה / Kfar Yedidya",
    location: { lat: 32.344942, lng: 34.900020 },
  },
  {
    id: "כפר-ידידיה-94521050",
    label: "כפר ידידיה / Kfar Yedidya",
    location: { lat: 32.345532, lng: 34.898183 },
  },
  {
    id: "כפר-יהושע-275232507",
    label: "כפר יהושע / Kfar Yehoshua",
    location: { lat: 32.682059, lng: 35.152251 },
  },
  {
    id: "כפר-יהושע-616794755",
    label: "כפר יהושע / Kfar Yehoshua",
    location: { lat: 32.683645, lng: 35.152060 },
  },
  {
    id: "כפר-יובל-3058564253",
    label: "כפר יובל / Kfar Yuval",
    location: { lat: 33.247418, lng: 35.597492 },
  },
  {
    id: "כפר-יובל-581402542",
    label: "כפר יובל / Kfar Yuval",
    location: { lat: 33.246005, lng: 35.597241 },
  },
  {
    id: "כפר-יונה-278476989",
    label: "כפר יונה / Kfar Yona",
    location: { lat: 32.314504, lng: 34.932117 },
  },
  {
    id: "כפר-יונה-889476754",
    label: "כפר יונה / Kfar Yona",
    location: { lat: 32.316496, lng: 34.935819 },
  },
  {
    id: "כפר-יחזקאל-275232521",
    label: "כפר יחזקאל / Kfar Yehezkel",
    location: { lat: 32.568286, lng: 35.362408 },
  },
  {
    id: "כפר-יחזקאל-229144319",
    label: "כפר יחזקאל / Kfar Yehezkel",
    location: { lat: 32.566619, lng: 35.358666 },
  },
  {
    id: "כפר-יעבץ-93462306",
    label: "כפר יעבץ / Kfar Ya'abez",
    location: { lat: 32.274134, lng: 34.964819 },
  },
  {
    id: "כפר-יעבץ-275232512",
    label: "כפר יעבץ / Kfar Yabez",
    location: { lat: 32.273819, lng: 34.966859 },
  },
  {
    id: "כפר-כמא-614212188",
    label: "כפר כמא / Kafr Kama",
    location: { lat: 32.721126, lng: 35.440808 },
  },
  {
    id: "כפר-כמא-2550244021",
    label: "כפר כמא / Kfar Kama",
    location: { lat: 32.721053, lng: 35.440770 },
  },
  {
    id: "כפר-כנא-610617017",
    label: "כפר כנא / Kaffer Kana",
    location: { lat: 32.744967, lng: 35.344277 },
  },
  {
    id: "כפר-כנא-278477555",
    label: "כפר כנא / Kfar Kanna",
    location: { lat: 32.745986, lng: 35.339802 },
  },
  {
    id: "כפר-מונש-278371303",
    label: "כפר מונש / Kfar Monash",
    location: { lat: 32.347535, lng: 34.916224 },
  },
  {
    id: "כפר-מונש-700672525",
    label: "כפר מונש / Kfar Monash",
    location: { lat: 32.345642, lng: 34.914597 },
  },
  {
    id: "כפר-מימון-278470432",
    label: "כפר מימון / Kfar Maymon",
    location: { lat: 31.430805, lng: 34.536385 },
  },
  {
    id: "כפר-מימון-824594881",
    label: "כפר מימון / Kfar Maymon",
    location: { lat: 31.430726, lng: 34.536546 },
  },
  {
    id: "כפר-מיסר-614216534",
    label: "כפר מיסר / Kafr Misr",
    location: { lat: 32.645370, lng: 35.423023 },
  },
  {
    id: "כפר-מיסר-278475923",
    label: "כפר מיסר / Kfar Misr",
    location: { lat: 32.645247, lng: 35.422855 },
  },
  {
    id: "כפר-מל-ל-278477439",
    label: "כפר מל\"ל / Kfar Malal",
    location: { lat: 32.167059, lng: 34.893476 },
  },
  {
    id: "כפר-מל-ל-94531215",
    label: "כפר מל\"ל / Kfar Malal",
    location: { lat: 32.168036, lng: 34.893770 },
  },
  {
    id: "כפר-מנדא-3401598170",
    label: "כפר מנדא / Kafr Manda",
    location: { lat: 32.811409, lng: 35.259756 },
  },
  {
    id: "כפר-מנדא-612359438",
    label: "כפר מנדא / Kafr Manda",
    location: { lat: 32.809130, lng: 35.260395 },
  },
  {
    id: "כפר-מנחם-278473293",
    label: "כפר מנחם / Kfar Menachem",
    location: { lat: 31.730977, lng: 34.835231 },
  },
  {
    id: "כפר-מנחם-681313585",
    label: "כפר מנחם / Kfar Menachem",
    location: { lat: 31.730874, lng: 34.833727 },
  },
  {
    id: "כפר-מסריק-246849928",
    label: "כפר מסריק / Kfar Masarik",
    location: { lat: 32.891059, lng: 35.100113 },
  },
  {
    id: "כפר-מסריק-91370913",
    label: "כפר מסריק / Kfar Masarik",
    location: { lat: 32.890279, lng: 35.099324 },
  },
  {
    id: "כפר-מעש-9594240",
    label: "כפר מעש / Kfar Ma'as",
    location: { lat: 32.063917, lng: 34.887940 },
  },
  {
    id: "כפר-מעש-278474135",
    label: "כפר מעש / Kfar Maas",
    location: { lat: 32.065187, lng: 34.887464 },
  },
  {
    id: "כפר-מרדכי-278473725",
    label: "כפר מרדכי / Kfar Mordechai",
    location: { lat: 31.831086, lng: 34.756179 },
  },
  {
    id: "כפר-מרדכי-84014231",
    label: "כפר מרדכי / Kfar Mordechay",
    location: { lat: 31.831718, lng: 34.756209 },
  },
  {
    id: "כפר-מרדכי-443859453",
    label: "כפר מרדכי / Kfar Mordechay",
    location: { lat: 31.830603, lng: 34.749046 },
  },
  {
    id: "כפר-נופש-רקפת-1385107849",
    label: "כפר נופש רקפת",
    location: { lat: 32.856346, lng: 35.261894 },
  },
  {
    id: "כפר-נחום-278476459",
    label: "כפר נחום / Capernahum",
    location: { lat: 32.880734, lng: 35.575426 },
  },
  {
    id: "כפר-נטר-278477112",
    label: "כפר נטר / Kfar Netter",
    location: { lat: 32.279642, lng: 34.876960 },
  },
  {
    id: "כפר-נטר-698890741",
    label: "כפר נטר / Kfar Netter",
    location: { lat: 32.273934, lng: 34.871172 },
  },
  {
    id: "כפר-סאלד-366025826",
    label: "כפר סאלד / Kfar Sold",
    location: { lat: 33.194539, lng: 35.657431 },
  },
  {
    id: "כפר-סאלד-278476840",
    label: "כפר סאלד / Kfar Szold",
    location: { lat: 33.194688, lng: 35.657851 },
  },
  {
    id: "כפר-סומיע-612787206",
    label: "כפר סומיע / Kafr Sumei",
    location: { lat: 32.981004, lng: 35.307411 },
  },
  {
    id: "כפר-סומיע-278475994",
    label: "כפר סומיע / Kfar Sumei",
    location: { lat: 32.980299, lng: 35.307203 },
  },
  {
    id: "כפר-סירקין-246255485",
    label: "כפר סירקין / Kfar Sirkin",
    location: { lat: 32.077738, lng: 34.923507 },
  },
  {
    id: "כפר-סירקין-94330163",
    label: "כפר סירקין / Kfar Sirkin",
    location: { lat: 32.077860, lng: 34.923098 },
  },
  {
    id: "כפר-עבודה-278474120",
    label: "כפר עבודה / Kfar Avoda",
    location: { lat: 32.256947, lng: 34.942093 },
  },
  {
    id: "כפר-עבודה-94719203",
    label: "כפר עבודה / Kfar Avoda",
    location: { lat: 32.257536, lng: 34.941040 },
  },
  {
    id: "כפר-עזה-278471165",
    label: "כפר עזה / Kfar Azza",
    location: { lat: 31.483335, lng: 34.533322 },
  },
  {
    id: "כפר-עזה-92392943",
    label: "כפר עזה / Kfar Azza",
    location: { lat: 31.483325, lng: 34.533455 },
  },
  {
    id: "כפר-פינס-278475696",
    label: "כפר פינס / Kfar Pines",
    location: { lat: 32.483889, lng: 35.003444 },
  },
  {
    id: "כפר-פינס-84676236",
    label: "כפר פינס / Kfar Pines",
    location: { lat: 32.484879, lng: 35.002182 },
  },
  {
    id: "כפר-קאסם-69358409",
    label: "כפר קאסם / Kafr Kasim",
    location: { lat: 32.115071, lng: 34.976623 },
  },
  {
    id: "כפר-קאסם-278478127",
    label: "כפר קאסם / Kfar Kasim",
    location: { lat: 32.115201, lng: 34.975261 },
  },
  {
    id: "כפר-קיש-1033580962",
    label: "כפר קיש / Kfar Kish",
    location: { lat: 32.666361, lng: 35.448794 },
  },
  {
    id: "כפר-קיש-641305175",
    label: "כפר קיש / Kfar Kish",
    location: { lat: 32.667048, lng: 35.449055 },
  },
  {
    id: "כפר-קרע-84882742",
    label: "כפר קרע / Kafar Karra",
    location: { lat: 32.504125, lng: 35.049216 },
  },
  {
    id: "כפר-קרע-278473398",
    label: "כפר קרע / Kfar Kara",
    location: { lat: 32.502991, lng: 35.050500 },
  },
  {
    id: "כפר-רופין-278470559",
    label: "כפר רופין / Kfar Ruppin",
    location: { lat: 32.458163, lng: 35.556773 },
  },
  {
    id: "כפר-רופין-81373593",
    label: "כפר רופין / Kfar Ruppin",
    location: { lat: 32.457754, lng: 35.556627 },
  },
  {
    id: "כפר-רות-337260408",
    label: "כפר רות / Kfar Ruth",
    location: { lat: 31.910747, lng: 35.035768 },
  },
  {
    id: "כפר-רות-93325285",
    label: "כפר רות / Kfar Ruth",
    location: { lat: 31.910184, lng: 35.035094 },
  },
  {
    id: "כפר-רפאל-831255892",
    label: "כפר רפאל / Kfar Refael",
    location: { lat: 31.258776, lng: 34.748038 },
  },
  {
    id: "כפר-רפאל-94721069",
    label: "כפר רפאל / Kfar Refael",
    location: { lat: 31.258725, lng: 34.747936 },
  },
  {
    id: "כפר-שמאי-278469859",
    label: "כפר שמאי / Kfar Shammay",
    location: { lat: 32.957417, lng: 35.457903 },
  },
  {
    id: "כפר-שמאי-616549082",
    label: "כפר שמאי / Kfar Shammay",
    location: { lat: 32.956645, lng: 35.458830 },
  },
  {
    id: "כפר-שמואל-278471104",
    label: "כפר שמואל / Kfar Shmuel",
    location: { lat: 31.889136, lng: 34.932806 },
  },
  {
    id: "כפר-שמואל-588480530",
    label: "כפר שמואל / Kfar Shmuel",
    location: { lat: 31.889892, lng: 34.932916 },
  },
  {
    id: "כפר-שמריהו-278476048",
    label: "כפר שמריהו / Kfar Shmaryahu",
    location: { lat: 32.185367, lng: 34.819775 },
  },
  {
    id: "כפר-שמריהו-86342235",
    label: "כפר שמריהו / Kfar Shmaryahu",
    location: { lat: 32.186967, lng: 34.821596 },
  },
  {
    id: "כפר-תבור-278473207",
    label: "כפר תבור / Kfar Tavor",
    location: { lat: 32.687805, lng: 35.420420 },
  },
  {
    id: "כפר-תבור-911844998",
    label: "כפר תבור / Kfar Tavor",
    location: { lat: 32.689970, lng: 35.422287 },
  },
  {
    id: "כפר-תקווה-278478734",
    label: "כפר תקווה / Kfar Tikva",
    location: { lat: 32.701364, lng: 35.114529 },
  },
  {
    id: "כפר-תקווה-784198892",
    label: "כפר תקווה / Kfar Tikva",
    location: { lat: 32.701567, lng: 35.115764 },
  },
  {
    id: "כרי-דשא-278477663",
    label: "כרי דשא / Karay Deshe",
    location: { lat: 32.864236, lng: 35.538511 },
  },
  {
    id: "כרי-דשא-91563720",
    label: "כרי דשא / Karay Deshe",
    location: { lat: 32.866182, lng: 35.538552 },
  },
  {
    id: "כרי-נעמן-278477120",
    label: "כרי נעמן / Karay Naaman",
    location: { lat: 32.881165, lng: 35.099109 },
  },
  {
    id: "כרכום-331344785",
    label: "כרכום / Karkom",
    location: { lat: 32.929333, lng: 35.608563 },
  },
  {
    id: "כרכום-882456248",
    label: "כרכום / Karkom",
    location: { lat: 32.930100, lng: 35.608078 },
  },
  {
    id: "כרכור-5568650845",
    label: "כרכור / Karkour",
    location: { lat: 31.346474, lng: 34.767320 },
  },
  {
    id: "כרם-בן-זמרה-278475707",
    label: "כרם בן זמרה / Kerem Ben Zimra",
    location: { lat: 33.038886, lng: 35.468049 },
  },
  {
    id: "כרם-בן-זמרה-689501723",
    label: "כרם בן זמרה / Kerem Ben Zimra",
    location: { lat: 33.038301, lng: 35.466711 },
  },
  {
    id: "כרם-בן-שמן-1052998067",
    label: "כרם בן שמן / Kerem Ben Shemen",
    location: { lat: 31.958828, lng: 34.933908 },
  },
  {
    id: "כרם-מהר-ל-278478124",
    label: "כרם מהר\"ל / Kerem Maharal",
    location: { lat: 32.646121, lng: 34.989962 },
  },
  {
    id: "כרם-מהר-ל-93324714",
    label: "כרם מהר\"ל / Kerem Maharal",
    location: { lat: 32.646332, lng: 34.991447 },
  },
  {
    id: "כרם-שלום-278478498",
    label: "כרם שלום / Kerem Shalom",
    location: { lat: 31.227710, lng: 34.283954 },
  },
  {
    id: "כרם-שלום-30062718",
    label: "כרם שלום / Kerem Shalom",
    location: { lat: 31.227501, lng: 34.283971 },
  },
  {
    id: "כרמי-יוסף-1698696614",
    label: "כרמי יוסף / Karmei Yosef",
    location: { lat: 31.846965, lng: 34.920470 },
  },
  {
    id: "כרמי-יוסף-587311094",
    label: "כרמי יוסף / Karmei Yosef",
    location: { lat: 31.847436, lng: 34.919518 },
  },
  {
    id: "כרמי-קטיף-9705793812",
    label: "כרמי קטיף / Karmay Katif",
    location: { lat: 31.537243, lng: 34.912677 },
  },
  {
    id: "כרמיאל-278478620",
    label: "כרמיאל / Karmiel",
    location: { lat: 32.915910, lng: 35.293429 },
  },
  {
    id: "כרמיה-1710530036",
    label: "כרמיה / Karmia",
    location: { lat: 31.605351, lng: 34.543018 },
  },
  {
    id: "כרמים-1657282941",
    label: "כרמים / Kramim",
    location: { lat: 31.335627, lng: 34.919009 },
  },
  {
    id: "כרמים-638024033",
    label: "כרמים / Kramim",
    location: { lat: 31.333903, lng: 34.918712 },
  },
  {
    id: "כרמית-2430832701",
    label: "כרמית / Karmit",
    location: { lat: 31.331599, lng: 34.893533 },
  },
  {
    id: "כרמית-706414432",
    label: "כרמית / Karmit",
    location: { lat: 31.332261, lng: 34.894124 },
  },
  {
    id: "לב-יתיר-1746685176",
    label: "לב יתיר / Lev Yatir",
    location: { lat: 31.347515, lng: 35.060582 },
  },
  {
    id: "לבון-429882157",
    label: "לבון / Lavon",
    location: { lat: 32.942455, lng: 35.287103 },
  },
  {
    id: "לבון-665929003",
    label: "לבון / Lavon",
    location: { lat: 32.943886, lng: 35.286659 },
  },
  {
    id: "לביא-278478740",
    label: "לביא / Lavi",
    location: { lat: 32.787225, lng: 35.441666 },
  },
  {
    id: "לביא-618040008",
    label: "לביא / Lavi",
    location: { lat: 32.788565, lng: 35.441547 },
  },
  {
    id: "להב-278477804",
    label: "להב / Lahav",
    location: { lat: 31.379421, lng: 34.870106 },
  },
  {
    id: "להב-91731397",
    label: "להב / Lahav",
    location: { lat: 31.379257, lng: 34.869013 },
  },
  {
    id: "להבות-הבשן-278478487",
    label: "להבות הבשן / Lahavot HaBashan",
    location: { lat: 33.140618, lng: 35.646246 },
  },
  {
    id: "להבות-הבשן-366150732",
    label: "להבות הבשן / Lahavot Habashan",
    location: { lat: 33.140690, lng: 35.647406 },
  },
  {
    id: "להבות-חביבה-278372133",
    label: "להבות חביבה / Lehavot Chaviva",
    location: { lat: 32.395873, lng: 35.010391 },
  },
  {
    id: "להבות-חביבה-83150180",
    label: "להבות חביבה / Lehavot Chaviva",
    location: { lat: 32.394733, lng: 35.009642 },
  },
  {
    id: "להבים-353022551",
    label: "להבים / Lehavim",
    location: { lat: 31.370323, lng: 34.813689 },
  },
  {
    id: "להבים-706497245",
    label: "להבים / Lehavim",
    location: { lat: 31.367001, lng: 34.812883 },
  },
  {
    id: "לוד-278473689",
    label: "לוד / Lod",
    location: { lat: 31.948901, lng: 34.888486 },
  },
  {
    id: "לוד-17944628",
    label: "לוד / Lod",
    location: { lat: 31.949638, lng: 34.892122 },
  },
  {
    id: "לוזית-278477650",
    label: "לוזית / Luzit",
    location: { lat: 31.687795, lng: 34.887738 },
  },
  {
    id: "לוזית-82627728",
    label: "לוזית / Luzit",
    location: { lat: 31.686379, lng: 34.886817 },
  },
  {
    id: "לוחמי-הגטאות-246850505",
    label: "לוחמי הגטאות / Lohamei HaGetaot",
    location: { lat: 32.962851, lng: 35.097375 },
  },
  {
    id: "לוחמי-הגטאות-91929622",
    label: "לוחמי הגטאות / Lohamei HaGetaot",
    location: { lat: 32.963824, lng: 35.098465 },
  },
  {
    id: "לוטם-275547485",
    label: "לוטם / Lotem",
    location: { lat: 32.881739, lng: 35.358497 },
  },
  {
    id: "לוטם-4091308",
    label: "לוטם / Lotem",
    location: { lat: 32.882656, lng: 35.359220 },
  },
  {
    id: "לוטן-429882256",
    label: "לוטן / Lotan",
    location: { lat: 29.986781, lng: 35.088644 },
  },
  {
    id: "לוטן-60206111",
    label: "לוטן / Lotan",
    location: { lat: 29.987369, lng: 35.087554 },
  },
  {
    id: "ליבנים-496123157",
    label: "ליבנים / Livnim",
    location: { lat: 32.863942, lng: 35.493574 },
  },
  {
    id: "ליבנים-610027889",
    label: "ליבנים / Livnim",
    location: { lat: 32.863943, lng: 35.495547 },
  },
  {
    id: "לימן-278476093",
    label: "לימן / Liman",
    location: { lat: 33.059503, lng: 35.113028 },
  },
  {
    id: "לימן-696569389",
    label: "לימן / Liman",
    location: { lat: 33.060492, lng: 35.114537 },
  },
  {
    id: "לכיש-3653809945",
    label: "לכיש / Lakhish",
    location: { lat: 31.560898, lng: 34.841069 },
  },
  {
    id: "לכיש-705456832",
    label: "לכיש / Lakhish",
    location: { lat: 31.561680, lng: 34.839743 },
  },
  {
    id: "לפיד-337254307",
    label: "לפיד / Lapid",
    location: { lat: 31.917553, lng: 35.031940 },
  },
  {
    id: "לפיד-93325282",
    label: "לפיד / Lapid",
    location: { lat: 31.917172, lng: 35.032647 },
  },
  {
    id: "לפידות-278472853",
    label: "לפידות / Lappidot",
    location: { lat: 32.959238, lng: 35.262060 },
  },
  {
    id: "לפידות-687896355",
    label: "לפידות / Lappidot",
    location: { lat: 32.958831, lng: 35.262050 },
  },
  {
    id: "לקיה-1077209317",
    label: "לקיה / Lakiya",
    location: { lat: 31.324666, lng: 34.866118 },
  },
  {
    id: "מאור-278470482",
    label: "מאור / Maor",
    location: { lat: 32.423924, lng: 35.006394 },
  },
  {
    id: "מאור-83150183",
    label: "מאור / Maor",
    location: { lat: 32.424982, lng: 35.006958 },
  },
  {
    id: "מבוא-ביתר-92659604",
    label: "מבוא ביתר / Mevo Beitar",
    location: { lat: 31.721943, lng: 35.106640 },
  },
  {
    id: "מבוא-ביתר-278476238",
    label: "מבוא ביתר / Mevo Betar",
    location: { lat: 31.722720, lng: 35.107119 },
  },
  {
    id: "מבוא-חמה-91667905",
    label: "מבוא חמה / Mevo Chama",
    location: { lat: 32.738993, lng: 35.655594 },
  },
  {
    id: "מבוא-חמה-289309596",
    label: "מבוא חמה / Mevo Hama",
    location: { lat: 32.736346, lng: 35.655613 },
  },
  {
    id: "מבוא-מודיעים-278474384",
    label: "מבוא מודיעים / Mevo Modiim",
    location: { lat: 31.934494, lng: 34.987169 },
  },
  {
    id: "מבועים-278471767",
    label: "מבועים / Mabbuim",
    location: { lat: 31.449273, lng: 34.654750 },
  },
  {
    id: "מבועים-665838276",
    label: "מבועים / Mabbuim",
    location: { lat: 31.449019, lng: 34.655318 },
  },
  {
    id: "מבטחים-82487630",
    label: "מבטחים / Mivtachim",
    location: { lat: 31.239711, lng: 34.408147 },
  },
  {
    id: "מבטחים-274607819",
    label: "מבטחים / Mivtahim",
    location: { lat: 31.241756, lng: 34.407267 },
  },
  {
    id: "מבקיעים-17763479",
    label: "מבקיעים / Mavki'im",
    location: { lat: 31.622111, lng: 34.577246 },
  },
  {
    id: "מבקיעים-278473375",
    label: "מבקיעים / Mavkiim",
    location: { lat: 31.622156, lng: 34.577120 },
  },
  {
    id: "מבשרת-ציון-632206546",
    label: "מבשרת ציון / Mevaseret Tsiyon",
    location: { lat: 31.805720, lng: 35.152731 },
  },
  {
    id: "מבשרת-ציון-626005966",
    label: "מבשרת ציון / Mevaseret Tsiyon",
    location: { lat: 31.803950, lng: 35.154424 },
  },
  {
    id: "מג-ד-אל-כרום-278473200",
    label: "מג'ד אל-כרום / Majd al Kurum",
    location: { lat: 32.922577, lng: 35.257950 },
  },
  {
    id: "מג-ד-אל-כרום-614171409",
    label: "מג'ד אל-כרום / Majd al Kurum",
    location: { lat: 32.922060, lng: 35.253879 },
  },
  {
    id: "מג-דל-שמס-2866107524",
    label: "מג'דל שמס / Majdal Shams",
    location: { lat: 33.268429, lng: 35.769371 },
  },
  {
    id: "מג-דל-שמס-602728607",
    label: "מג'דל שמס / Majdal Shams",
    location: { lat: 33.267937, lng: 35.768203 },
  },
  {
    id: "מגאר-278471174",
    label: "מגאר / Maghar",
    location: { lat: 32.886944, lng: 35.406944 },
  },
  {
    id: "מגאר-610025764",
    label: "מגאר / Maghar",
    location: { lat: 32.885825, lng: 35.413763 },
  },
  {
    id: "מגדים-278474401",
    label: "מגדים / Megadim",
    location: { lat: 32.729031, lng: 34.961951 },
  },
  {
    id: "מגדים-638714976",
    label: "מגדים / Megadim",
    location: { lat: 32.729126, lng: 34.957915 },
  },
  {
    id: "מגדל-278478737",
    label: "מגדל / Migdal",
    location: { lat: 32.838715, lng: 35.499363 },
  },
  {
    id: "מגדל-619416476",
    label: "מגדל / Migdal",
    location: { lat: 32.840761, lng: 35.500816 },
  },
  {
    id: "מגדל-העמק-278473526",
    label: "מגדל העמק / Migdal HaEmeq",
    location: { lat: 32.676574, lng: 35.241324 },
  },
  {
    id: "מגדל-העמק-7809413",
    label: "מגדל העמק / Migdal HaEmeq",
    location: { lat: 32.681469, lng: 35.244185 },
  },
  {
    id: "מגידו-5941459532",
    label: "מגידו / Megiddo",
    location: { lat: 32.578691, lng: 35.180694 },
  },
  {
    id: "מגידו-92001671",
    label: "מגידו / Megiddo",
    location: { lat: 32.579886, lng: 35.179887 },
  },
  {
    id: "מגל-278478586",
    label: "מגל / Magal",
    location: { lat: 32.385220, lng: 35.035158 },
  },
  {
    id: "מגל-83622131",
    label: "מגל / Magal",
    location: { lat: 32.385724, lng: 35.033207 },
  },
  {
    id: "מגן-278477993",
    label: "מגן / Maggen",
    location: { lat: 31.299068, lng: 34.428925 },
  },
  {
    id: "מגן-82487820",
    label: "מגן / Maggen",
    location: { lat: 31.301052, lng: 34.428638 },
  },
  {
    id: "מגן-שאול-278478725",
    label: "מגן שאול / Magen Shaul",
    location: { lat: 32.520679, lng: 35.306731 },
  },
  {
    id: "מגן-שאול-81641391",
    label: "מגן שאול / Magen Shaul",
    location: { lat: 32.520993, lng: 35.306762 },
  },
  {
    id: "מגשימים-278475584",
    label: "מגשימים / Magshimim",
    location: { lat: 32.047035, lng: 34.899314 },
  },
  {
    id: "מגשימים-616769738",
    label: "מגשימים / Magshimim",
    location: { lat: 32.047225, lng: 34.898444 },
  },
  {
    id: "מדרך-עוז-278475336",
    label: "מדרך עוז / Midrach Oz",
    location: { lat: 32.595469, lng: 35.160305 },
  },
  {
    id: "מדרך-עוז-83543187",
    label: "מדרך עוז / Midrach Oz",
    location: { lat: 32.597129, lng: 35.158304 },
  },
  {
    id: "מדרשת-בן-גוריון-7446977302",
    label: "מדרשת בן גוריון / Midreshet Ben-Gurion",
    location: { lat: 30.851593, lng: 34.782576 },
  },
  {
    id: "מדרשת-בן-גוריון-907737243",
    label: "מדרשת בן גוריון / Midreshet Ben-Gurion",
    location: { lat: 30.852797, lng: 34.782687 },
  },
  {
    id: "מודיעין-מכבים-רעות-246843698",
    label: "מודיעין-מכבים-רעות / Modiin-Maccabim-Reut",
    location: { lat: 31.908574, lng: 35.006930 },
  },
  {
    id: "מודיעין-מכבים-רעות-553466211",
    label: "מודיעין-מכבים-רעות / Modiin-Maccabim-Reut",
    location: { lat: 31.898846, lng: 35.006416 },
  },
  {
    id: "מולדה-4867937789",
    label: "מולדה / Moladah",
    location: { lat: 31.258231, lng: 34.982420 },
  },
  {
    id: "מולדת-12811183219",
    label: "מולדת / Moledet",
    location: { lat: 32.586077, lng: 35.440131 },
  },
  {
    id: "מולדת-617168119",
    label: "מולדת / Moledet",
    location: { lat: 32.586153, lng: 35.441999 },
  },
  {
    id: "מוסמוס-278470039",
    label: "מוסמוס / Musmus",
    location: { lat: 32.542929, lng: 35.155096 },
  },
  {
    id: "מוסמוס-92001545",
    label: "מוסמוס / Musmus",
    location: { lat: 32.543512, lng: 35.156261 },
  },
  {
    id: "מועאוויה-85788276",
    label: "מועאוויה / Muawiya",
    location: { lat: 32.530962, lng: 35.103982 },
  },
  {
    id: "מועויה-278477099",
    label: "מועויה / Muawiya",
    location: { lat: 32.530405, lng: 35.101252 },
  },
  {
    id: "מוצא-278478198",
    label: "מוצא / Motza",
    location: { lat: 31.792790, lng: 35.168506 },
  },
  {
    id: "מוצא-94725566",
    label: "מוצא / Motza",
    location: { lat: 31.792736, lng: 35.168942 },
  },
  {
    id: "מוצא-עילית-278476410",
    label: "מוצא עילית / Motza Illit",
    location: { lat: 31.793494, lng: 35.156563 },
  },
  {
    id: "מוצא-עילית-94725567",
    label: "מוצא עילית / Moza Illit",
    location: { lat: 31.794079, lng: 35.156942 },
  },
  {
    id: "מוקיבלה-615379910",
    label: "מוקיבלה / Muqeibila",
    location: { lat: 32.513826, lng: 35.294795 },
  },
  {
    id: "מוקיבלה-278475572",
    label: "מוקיבלה / Muqeible",
    location: { lat: 32.514021, lng: 35.297633 },
  },
  {
    id: "מורן-278471466",
    label: "מורן / Moran",
    location: { lat: 32.921571, lng: 35.393461 },
  },
  {
    id: "מורן-616541708",
    label: "מורן / Moran",
    location: { lat: 32.919343, lng: 35.394625 },
  },
  {
    id: "מורשת-1060079697",
    label: "מורשת / Moreshet",
    location: { lat: 32.826805, lng: 35.232876 },
  },
  {
    id: "מורשת-563057095",
    label: "מורשת / Moreshet",
    location: { lat: 32.826790, lng: 35.233320 },
  },
  {
    id: "מושב-מרחביה-85788557",
    label: "מושב מרחביה / Moshav Merhavia",
    location: { lat: 32.604285, lng: 35.317120 },
  },
  {
    id: "מושב-מרחביה-278474081",
    label: "מושב מרחביה / Moshav Merhavya",
    location: { lat: 32.602452, lng: 35.315960 },
  },
  {
    id: "מושיירפה-278474036",
    label: "מושיירפה / Musheirifa",
    location: { lat: 32.552907, lng: 35.154280 },
  },
  {
    id: "מושיירפה-92001543",
    label: "מושיירפה / Musheirifa",
    location: { lat: 32.553424, lng: 35.155627 },
  },
  {
    id: "מזור-278476963",
    label: "מזור / Mazor",
    location: { lat: 32.052304, lng: 34.923418 },
  },
  {
    id: "מזור-616290954",
    label: "מזור / Mazor",
    location: { lat: 32.051186, lng: 34.925942 },
  },
  {
    id: "מזכרת-בתיה-267609808",
    label: "מזכרת בתיה / Mazkeret Batya",
    location: { lat: 31.851438, lng: 34.841164 },
  },
  {
    id: "מזכרת-בתיה-86885446",
    label: "מזכרת בתיה / Mazkeret Batya",
    location: { lat: 31.848484, lng: 34.845236 },
  },
  {
    id: "מזרע-278477089",
    label: "מזרע / Mizra",
    location: { lat: 32.650976, lng: 35.286109 },
  },
  {
    id: "מזרע-85789179",
    label: "מזרע / Mizra",
    location: { lat: 32.651024, lng: 35.286580 },
  },
  {
    id: "מזרעה-278477067",
    label: "מזרעה / Mazra'a",
    location: { lat: 32.983303, lng: 35.098342 },
  },
  {
    id: "מזרעה-91929048",
    label: "מזרעה / Mazra'a",
    location: { lat: 32.984640, lng: 35.102548 },
  },
  {
    id: "מחניים-278470468",
    label: "מחניים / Mahanayim",
    location: { lat: 32.988641, lng: 35.570735 },
  },
  {
    id: "מחניים-81807739",
    label: "מחניים / Mahanayim",
    location: { lat: 32.988804, lng: 35.571785 },
  },
  {
    id: "מחסיה-93326433",
    label: "מחסיה / Machseya",
    location: { lat: 31.748042, lng: 35.006560 },
  },
  {
    id: "מחסיה-278474449",
    label: "מחסיה / Mahseya",
    location: { lat: 31.748168, lng: 35.007352 },
  },
  {
    id: "מטולה-3058579969",
    label: "מטולה / Metula",
    location: { lat: 33.279981, lng: 35.577945 },
  },
  {
    id: "מטולה-717602462",
    label: "מטולה / Metula",
    location: { lat: 33.278984, lng: 35.576272 },
  },
  {
    id: "מטולה-1378949",
    label: "מטולה / Metula",
    location: { lat: 33.269166, lng: 35.576606 },
  },
  {
    id: "מטע-278474516",
    label: "מטע / Mata",
    location: { lat: 31.716931, lng: 35.061570 },
  },
  {
    id: "מטע-92659601",
    label: "מטע / Mata",
    location: { lat: 31.717426, lng: 35.062225 },
  },
  {
    id: "מי-עמי-85788160",
    label: "מי עמי / May Ami",
    location: { lat: 32.504837, lng: 35.147366 },
  },
  {
    id: "מי-עמי-278478122",
    label: "מי עמי / Mei Ami",
    location: { lat: 32.504666, lng: 35.146509 },
  },
  {
    id: "מיטב-275295942",
    label: "מיטב / Meitav",
    location: { lat: 32.545738, lng: 35.301291 },
  },
  {
    id: "מיטב-617497619",
    label: "מיטב / Meitav",
    location: { lat: 32.546249, lng: 35.300727 },
  },
  {
    id: "מייסר-1248813273",
    label: "מייסר / Meisar",
    location: { lat: 32.445104, lng: 35.040488 },
  },
  {
    id: "מייסר-108932426",
    label: "מייסר / Meisar",
    location: { lat: 32.444905, lng: 35.042364 },
  },
  {
    id: "מילצ-ן-563962007",
    label: "מילצ'ן / Milchen",
    location: { lat: 31.882177, lng: 34.812760 },
  },
  {
    id: "מיצר-300161573",
    label: "מיצר / Meitsar",
    location: { lat: 32.768685, lng: 35.736981 },
  },
  {
    id: "מיצר-91667898",
    label: "מיצר / Meitsar",
    location: { lat: 32.769887, lng: 35.735342 },
  },
  {
    id: "מירב-413529027",
    label: "מירב / Meirav",
    location: { lat: 32.453387, lng: 35.421538 },
  },
  {
    id: "מירב-617454942",
    label: "מירב / Meirav",
    location: { lat: 32.452858, lng: 35.421675 },
  },
  {
    id: "מירון-275295949",
    label: "מירון / Meron",
    location: { lat: 32.988641, lng: 35.440278 },
  },
  {
    id: "מירון-938784093",
    label: "מירון / Meron",
    location: { lat: 32.987465, lng: 35.439100 },
  },
  {
    id: "מישר-275295951",
    label: "מישר / Meishar",
    location: { lat: 31.817535, lng: 34.753122 },
  },
  {
    id: "מישר-84014201",
    label: "מישר / Meishar",
    location: { lat: 31.818921, lng: 34.754913 },
  },
  {
    id: "מיתר-536507510",
    label: "מיתר / Meitar",
    location: { lat: 31.327085, lng: 34.938439 },
  },
  {
    id: "מיתר-724040810",
    label: "מיתר / Meitar",
    location: { lat: 31.328024, lng: 34.938844 },
  },
  {
    id: "מכחול-1075567824",
    label: "מכחול / Makchul",
    location: { lat: 31.288314, lng: 35.075389 },
  },
  {
    id: "מכחול-94520461",
    label: "מכחול / Makchul",
    location: { lat: 31.287951, lng: 35.075429 },
  },
  {
    id: "מכמורת-278477004",
    label: "מכמורת / Michmoret",
    location: { lat: 32.406277, lng: 34.872900 },
  },
  {
    id: "מכמורת-801041047",
    label: "מכמורת / Michmoret",
    location: { lat: 32.404849, lng: 34.872839 },
  },
  {
    id: "מכמנים-278478278",
    label: "מכמנים / Michmannim",
    location: { lat: 32.906111, lng: 35.328760 },
  },
  {
    id: "מכמנים-668362735",
    label: "מכמנים / Michmannim",
    location: { lat: 32.906841, lng: 35.327292 },
  },
  {
    id: "מלאה-278476089",
    label: "מלאה / Mle'a",
    location: { lat: 32.563464, lng: 35.235960 },
  },
  {
    id: "מלאה-617491533",
    label: "מלאה / Mle'a",
    location: { lat: 32.563269, lng: 35.237128 },
  },
  {
    id: "מלילות-711034641",
    label: "מלילות / Melillot",
    location: { lat: 31.388658, lng: 34.595108 },
  },
  {
    id: "מלילות-275547483",
    label: "מלילות / Melilot",
    location: { lat: 31.390010, lng: 34.595927 },
  },
  {
    id: "מלכיה-275283329",
    label: "מלכיה / Malkiya",
    location: { lat: 33.099249, lng: 35.511699 },
  },
  {
    id: "מלכיה-579045347",
    label: "מלכיה / Malkiya",
    location: { lat: 33.098366, lng: 35.512116 },
  },
  {
    id: "מלכישוע-1379164999",
    label: "מלכישוע / Malkishua",
    location: { lat: 32.438527, lng: 35.413007 },
  },
  {
    id: "מלכישוע-119047865",
    label: "מלכישוע / Malkishua",
    location: { lat: 32.438835, lng: 35.413040 },
  },
  {
    id: "מנוחה-278470723",
    label: "מנוחה / Menuha",
    location: { lat: 31.656516, lng: 34.776699 },
  },
  {
    id: "מנוחה-631942217",
    label: "מנוחה / Menuha",
    location: { lat: 31.656398, lng: 34.777014 },
  },
  {
    id: "מנוף-483441038",
    label: "מנוף / Manof",
    location: { lat: 32.854134, lng: 35.236771 },
  },
  {
    id: "מנוף-91245311",
    label: "מנוף / Manof",
    location: { lat: 32.853580, lng: 35.236352 },
  },
  {
    id: "מנות-278478210",
    label: "מנות / Manot",
    location: { lat: 33.038364, lng: 35.194692 },
  },
  {
    id: "מנות-681622518",
    label: "מנות / Manot",
    location: { lat: 33.038293, lng: 35.194802 },
  },
  {
    id: "מנחמיה-275547480",
    label: "מנחמיה / Menahamiya",
    location: { lat: 32.667022, lng: 35.555587 },
  },
  {
    id: "מנחמיה-642217398",
    label: "מנחמיה / Menahamiya",
    location: { lat: 32.668439, lng: 35.555496 },
  },
  {
    id: "מנרה-278474109",
    label: "מנרה / Manara",
    location: { lat: 33.195939, lng: 35.544608 },
  },
  {
    id: "מנרה-87166765",
    label: "מנרה / Manara",
    location: { lat: 33.197108, lng: 35.544578 },
  },
  {
    id: "מנשייה-זבדה-527377941",
    label: "מנשייה זבדה / Manshiya Zabda",
    location: { lat: 32.706101, lng: 35.192161 },
  },
  {
    id: "מנשייה-זבדה-615243306",
    label: "מנשייה זבדה / Manshiya Zabda",
    location: { lat: 32.705398, lng: 35.193704 },
  },
  {
    id: "מסד-278478098",
    label: "מסד / Massad",
    location: { lat: 32.843339, lng: 35.422942 },
  },
  {
    id: "מסד-618060437",
    label: "מסד / Massad",
    location: { lat: 32.843810, lng: 35.424537 },
  },
  {
    id: "מסדה-278473078",
    label: "מסדה / Massada",
    location: { lat: 32.683069, lng: 35.598794 },
  },
  {
    id: "מסדה-641997847",
    label: "מסדה / Massada",
    location: { lat: 32.683176, lng: 35.598254 },
  },
  {
    id: "מסילות-275295944",
    label: "מסילות / Mesilot",
    location: { lat: 32.495833, lng: 35.475000 },
  },
  {
    id: "מסילות-629192247",
    label: "מסילות / Mesilot",
    location: { lat: 32.494882, lng: 35.474844 },
  },
  {
    id: "מסילת-ציון-907028108",
    label: "מסילת ציון / Mesilat Zion",
    location: { lat: 31.801151, lng: 35.012017 },
  },
  {
    id: "מסילת-ציון-275295953",
    label: "מסילת ציון / Messilat Zion",
    location: { lat: 31.801806, lng: 35.011525 },
  },
  {
    id: "מסלול-275589919",
    label: "מסלול / Maslul",
    location: { lat: 31.325342, lng: 34.588581 },
  },
  {
    id: "מסלול-707431113",
    label: "מסלול / Maslul",
    location: { lat: 31.323478, lng: 34.589349 },
  },
  {
    id: "מסעדה-404335599",
    label: "מסעדה / Mas'ade",
    location: { lat: 33.231214, lng: 35.757483 },
  },
  {
    id: "מסעדה-602268053",
    label: "מסעדה / Mas'ade",
    location: { lat: 33.229452, lng: 35.754393 },
  },
  {
    id: "מעברות-90645812",
    label: "מעברות / Ma'abarot",
    location: { lat: 32.363513, lng: 34.904922 },
  },
  {
    id: "מעברות-278477009",
    label: "מעברות / Maabarot",
    location: { lat: 32.363946, lng: 34.904691 },
  },
  {
    id: "מעגלים-711038728",
    label: "מעגלים / Ma'agalim",
    location: { lat: 31.396598, lng: 34.598926 },
  },
  {
    id: "מעגלים-278473939",
    label: "מעגלים / Maagalim",
    location: { lat: 31.397404, lng: 34.598318 },
  },
  {
    id: "מעגן-331350973",
    label: "מעגן / Maagan",
    location: { lat: 32.706731, lng: 35.601079 },
  },
  {
    id: "מעגן-914243618",
    label: "מעגן / Maagan",
    location: { lat: 32.707155, lng: 35.601131 },
  },
  {
    id: "מעגן-מיכאל-246264593",
    label: "מעגן מיכאל / Maagan Michael",
    location: { lat: 32.555321, lng: 34.916657 },
  },
  {
    id: "מעגן-מיכאל-79687731",
    label: "מעגן מיכאל / Maagan Michael",
    location: { lat: 32.555358, lng: 34.916150 },
  },
  {
    id: "מעוז-חיים-81373536",
    label: "מעוז חיים / Maoz Haim",
    location: { lat: 32.493366, lng: 35.550378 },
  },
  {
    id: "מעוז-חיים-278475697",
    label: "מעוז חיים / Maoz Hayim",
    location: { lat: 32.493380, lng: 35.551265 },
  },
  {
    id: "מעוז-ציון-626766553",
    label: "מעוז ציון / Maoz Zion",
    location: { lat: 31.792513, lng: 35.142111 },
  },
  {
    id: "מעוז-ציון-278473189",
    label: "מעוז ציון / Maoz Ziyyon",
    location: { lat: 31.793785, lng: 35.143410 },
  },
  {
    id: "מעונה-278476419",
    label: "מעונה / Meona",
    location: { lat: 33.016707, lng: 35.259739 },
  },
  {
    id: "מעונה-613790168",
    label: "מעונה / Meona",
    location: { lat: 33.016430, lng: 35.259406 },
  },
  {
    id: "מעיין-ברוך-3058564254",
    label: "מעיין ברוך / Ma'ayan Baruch",
    location: { lat: 33.239800, lng: 35.607876 },
  },
  {
    id: "מעיין-ברוך-87167258",
    label: "מעיין ברוך / Maayan Baruch",
    location: { lat: 33.240217, lng: 35.607636 },
  },
  {
    id: "מעיין-צבי-278473048",
    label: "מעיין צבי / Ma'ayan Tzvi",
    location: { lat: 32.568324, lng: 34.940075 },
  },
  {
    id: "מעיין-צבי-82224468",
    label: "מעיין צבי / Ma'ayan Tzvi",
    location: { lat: 32.567344, lng: 34.940543 },
  },
  {
    id: "מעיליא-278473510",
    label: "מעיליא / Miilya",
    location: { lat: 33.028063, lng: 35.258330 },
  },
  {
    id: "מעיליא-613786842",
    label: "מעיליא / Miilya",
    location: { lat: 33.028040, lng: 35.255587 },
  },
  {
    id: "מעלה-גלבוע-278474514",
    label: "מעלה גלבוע / Maale Gilboa",
    location: { lat: 32.478017, lng: 35.417498 },
  },
  {
    id: "מעלה-גלבוע-3119813",
    label: "מעלה גלבוע / Maale Gilboa",
    location: { lat: 32.476047, lng: 35.418937 },
  },
  {
    id: "מעלה-גמלא-289314823",
    label: "מעלה גמלא / Maale Gamla",
    location: { lat: 32.889926, lng: 35.684851 },
  },
  {
    id: "מעלה-גמלא-90607664",
    label: "מעלה גמלא / Maale Gamla",
    location: { lat: 32.887954, lng: 35.684010 },
  },
  {
    id: "מעלה-החמישה-227474990",
    label: "מעלה החמישה / Maale HaHamisha",
    location: { lat: 31.817486, lng: 35.111594 },
  },
  {
    id: "מעלה-החמישה-92342114",
    label: "מעלה החמישה / Maale HaHamisha",
    location: { lat: 31.818751, lng: 35.108090 },
  },
  {
    id: "מעלה-צביה-91933474",
    label: "מעלה צביה / Ma'alle Zeviya",
    location: { lat: 32.889837, lng: 35.331324 },
  },
  {
    id: "מעלה-צביה-278471166",
    label: "מעלה צביה / Ma'alle Zviya",
    location: { lat: 32.889455, lng: 35.330624 },
  },
  {
    id: "מעלות-תרשיחא-278477967",
    label: "מעלות תרשיחא / Maalot Tarshiha",
    location: { lat: 33.015739, lng: 35.275967 },
  },
  {
    id: "מעלות-תרשיחא-13525864",
    label: "מעלות תרשיחא / Maalot Tarshiha",
    location: { lat: 33.014464, lng: 35.276696 },
  },
  {
    id: "מענית-278478536",
    label: "מענית / Maanit",
    location: { lat: 32.456013, lng: 35.028081 },
  },
  {
    id: "מענית-84675860",
    label: "מענית / Maanit",
    location: { lat: 32.456839, lng: 35.028275 },
  },
  {
    id: "מפלסים-278473537",
    label: "מפלסים / Mefallesim",
    location: { lat: 31.502679, lng: 34.562123 },
  },
  {
    id: "מפלסים-92392969",
    label: "מפלסים / Mefalsim",
    location: { lat: 31.501739, lng: 34.564163 },
  },
  {
    id: "מצובה-278475152",
    label: "מצובה / Matsuva",
    location: { lat: 33.062944, lng: 35.157097 },
  },
  {
    id: "מצובה-691037106",
    label: "מצובה / Matsuva",
    location: { lat: 33.063019, lng: 35.157187 },
  },
  {
    id: "מצליח-407306193",
    label: "מצליח / Matzliah",
    location: { lat: 31.907505, lng: 34.873993 },
  },
  {
    id: "מצליח-278474698",
    label: "מצליח / Mazliah",
    location: { lat: 31.906180, lng: 34.871779 },
  },
  {
    id: "מצפה-278477267",
    label: "מצפה / Mizpa",
    location: { lat: 32.790272, lng: 35.508541 },
  },
  {
    id: "מצפה-618036505",
    label: "מצפה / Mizpa",
    location: { lat: 32.790669, lng: 35.509209 },
  },
  {
    id: "מצפה-אביב-667021140",
    label: "מצפה אביב / Mitzpe Aviv",
    location: { lat: 32.836909, lng: 35.202072 },
  },
  {
    id: "מצפה-אביב-19428147",
    label: "מצפה אביב / Mitzpe Aviv",
    location: { lat: 32.835057, lng: 35.201845 },
  },
  {
    id: "מצפה-אילן-739370332",
    label: "מצפה אילן / Mitzpe Ilan",
    location: { lat: 32.461529, lng: 35.069181 },
  },
  {
    id: "מצפה-הילה-349908000",
    label: "מצפה הילה / Mitzpe Hila",
    location: { lat: 33.035827, lng: 35.244340 },
  },
  {
    id: "מצפה-הילה-613783600",
    label: "מצפה הילה / Mitzpe Hila",
    location: { lat: 33.036531, lng: 35.244194 },
  },
  {
    id: "מצפה-נטופה-840176497",
    label: "מצפה נטופה / Mitzpe Netofa",
    location: { lat: 32.802917, lng: 35.384640 },
  },
  {
    id: "מצפה-נטופה-616665507",
    label: "מצפה נטופה / Mitzpe Netofa",
    location: { lat: 32.802382, lng: 35.387073 },
  },
  {
    id: "מצפה-רמון-278478389",
    label: "מצפה רמון / Mitspe Ramon",
    location: { lat: 30.611969, lng: 34.801217 },
  },
  {
    id: "מצפה-רמון-702433488",
    label: "מצפה רמון / Mitzpe Ramon",
    location: { lat: 30.612449, lng: 34.799875 },
  },
  {
    id: "מצר-275585097",
    label: "מצר / Metzer",
    location: { lat: 32.440429, lng: 35.047679 },
  },
  {
    id: "מצר-83150185",
    label: "מצר / Metzer",
    location: { lat: 32.440514, lng: 35.048308 },
  },
  {
    id: "מקמאן-7684693761",
    label: "מקמאן",
    location: { lat: 32.792268, lng: 35.224908 },
  },
  {
    id: "מרג-ה-278477773",
    label: "מרג'ה / Marja",
    location: { lat: 32.358567, lng: 35.040561 },
  },
  {
    id: "מרג-ה-83621585",
    label: "מרג'ה / Marja",
    location: { lat: 32.356856, lng: 35.040672 },
  },
  {
    id: "מרגליות-14231401",
    label: "מרגליות / Margaliyot",
    location: { lat: 33.214341, lng: 35.545038 },
  },
  {
    id: "מרגליות-278477827",
    label: "מרגליות / Margaliyyot",
    location: { lat: 33.214805, lng: 35.544486 },
  },
  {
    id: "מרום-גולן-300163928",
    label: "מרום גולן / Merom Golan",
    location: { lat: 33.132119, lng: 35.777316 },
  },
  {
    id: "מרום-גולן-91449716",
    label: "מרום גולן / Merom Golan",
    location: { lat: 33.133171, lng: 35.777094 },
  },
  {
    id: "מרחב-עם-702610059",
    label: "מרחב עם / Merchav Am",
    location: { lat: 30.889165, lng: 34.829102 },
  },
  {
    id: "מרחב-עם-666283754",
    label: "מרחב עם / Merhav Am",
    location: { lat: 30.888619, lng: 34.828885 },
  },
  {
    id: "מרכז-שפירא-278473683",
    label: "מרכז שפירא / Merkaz Shapira",
    location: { lat: 31.695184, lng: 34.707125 },
  },
  {
    id: "מרכז-שפירא-439046618",
    label: "מרכז שפירא / Merkaz Shapira",
    location: { lat: 31.694890, lng: 34.709169 },
  },
  {
    id: "משאבי-שדה-278473560",
    label: "משאבי שדה / Mashabei Sadeh",
    location: { lat: 31.003268, lng: 34.786124 },
  },
  {
    id: "משאבי-שדה-82487456",
    label: "משאבי שדה / Mashabei Sadeh",
    location: { lat: 31.004251, lng: 34.786494 },
  },
  {
    id: "משאיח-א-סעדיה-884014951",
    label: "משאיח א סעדיה / Mash'ikh al Sa'dia",
    location: { lat: 32.742243, lng: 35.158499 },
  },
  {
    id: "משאיח-א-סעדיה-615626581",
    label: "משאיח א סעדיה / Mashayekh al Sadiyya",
    location: { lat: 32.742360, lng: 35.157261 },
  },
  {
    id: "משגב-דב-278473047",
    label: "משגב דב / Misgav Dov",
    location: { lat: 31.819884, lng: 34.738569 },
  },
  {
    id: "משגב-דב-84014216",
    label: "משגב דב / Misgav Dov",
    location: { lat: 31.819646, lng: 34.739573 },
  },
  {
    id: "משגב-עם-275589917",
    label: "משגב עם / Misgav Am",
    location: { lat: 33.247788, lng: 35.548667 },
  },
  {
    id: "משגב-עם-87167119",
    label: "משגב עם / Misgav Am",
    location: { lat: 33.247672, lng: 35.548712 },
  },
  {
    id: "משהד-278473121",
    label: "משהד / Mashhad",
    location: { lat: 32.740200, lng: 35.324513 },
  },
  {
    id: "משהד-610621603",
    label: "משהד / Mashhad",
    location: { lat: 32.740449, lng: 35.324083 },
  },
  {
    id: "משואות-יצחק-278473905",
    label: "משואות יצחק / Masuot Yitzhak",
    location: { lat: 31.702345, lng: 34.689867 },
  },
  {
    id: "משואות-יצחק-92241338",
    label: "משואות יצחק / Masuot Yitzhak",
    location: { lat: 31.702948, lng: 34.691448 },
  },
  {
    id: "משמר-איילון-588956578",
    label: "משמר איילון / Mishmar Ayalon",
    location: { lat: 31.871622, lng: 34.944232 },
  },
  {
    id: "משמר-איילון-278470136",
    label: "משמר איילון / Mishmar Ayyalon",
    location: { lat: 31.871946, lng: 34.944792 },
  },
  {
    id: "משמר-דוד-278476979",
    label: "משמר דוד / Mishmar David",
    location: { lat: 31.822483, lng: 34.900926 },
  },
  {
    id: "משמר-דוד-580599564",
    label: "משמר דוד / Mishmar David",
    location: { lat: 31.823042, lng: 34.901235 },
  },
  {
    id: "משמר-הירדן-278478379",
    label: "משמר הירדן / Mishmar HaYarden",
    location: { lat: 33.005566, lng: 35.600273 },
  },
  {
    id: "משמר-הירדן-81807627",
    label: "משמר הירדן / Mishmar HaYarden",
    location: { lat: 33.004722, lng: 35.599927 },
  },
  {
    id: "משמר-הנגב-278477188",
    label: "משמר הנגב / Mishmar HaNegev",
    location: { lat: 31.364128, lng: 34.718680 },
  },
  {
    id: "משמר-הנגב-897718801",
    label: "משמר הנגב / Mishmar HaNegev",
    location: { lat: 31.364865, lng: 34.717773 },
  },
  {
    id: "משמר-העמק-278475875",
    label: "משמר העמק / Mishmar HaEmek",
    location: { lat: 32.610582, lng: 35.142197 },
  },
  {
    id: "משמר-העמק-92001669",
    label: "משמר העמק / Mishmar HaEmek",
    location: { lat: 32.610099, lng: 35.143874 },
  },
  {
    id: "משמר-השבעה-11581883632",
    label: "משמר השבעה / Mishmar HaShiv'a",
    location: { lat: 32.009162, lng: 34.823385 },
  },
  {
    id: "משמר-השבעה-401073955",
    label: "משמר השבעה / Mishmar HaShiv'a",
    location: { lat: 32.010266, lng: 34.824497 },
  },
  {
    id: "משמר-השרון-278370164",
    label: "משמר השרון / Mishmar HaSharon",
    location: { lat: 32.356479, lng: 34.903359 },
  },
  {
    id: "משמר-השרון-90646409",
    label: "משמר השרון / Mishmar Hasharon",
    location: { lat: 32.357140, lng: 34.904615 },
  },
  {
    id: "משמרות-274607839",
    label: "משמרות / Mishmarot",
    location: { lat: 32.487475, lng: 34.985039 },
  },
  {
    id: "משמרות-84868212",
    label: "משמרות / Mishmarot",
    location: { lat: 32.488548, lng: 34.983522 },
  },
  {
    id: "משמרת-268703640",
    label: "משמרת / Mishmeret",
    location: { lat: 32.227979, lng: 34.922049 },
  },
  {
    id: "משמרת-79317254",
    label: "משמרת / Mishmeret",
    location: { lat: 32.227751, lng: 34.919462 },
  },
  {
    id: "משען-278473948",
    label: "משען / Mashen",
    location: { lat: 31.657644, lng: 34.623778 },
  },
  {
    id: "משען-698854233",
    label: "משען / Mishan",
    location: { lat: 31.657071, lng: 34.623969 },
  },
  {
    id: "מתן-370399997",
    label: "מתן / Matan",
    location: { lat: 32.156143, lng: 34.974280 },
  },
  {
    id: "מתן-768076495",
    label: "מתן / Matan",
    location: { lat: 32.156835, lng: 34.972557 },
  },
  {
    id: "מתת-415538096",
    label: "מתת / Matat",
    location: { lat: 33.041544, lng: 35.359830 },
  },
  {
    id: "מתת-690029882",
    label: "מתת / Matat",
    location: { lat: 33.040810, lng: 35.357624 },
  },
  {
    id: "נאות-גולן-1656011615",
    label: "נאות גולן / Neot Golan",
    location: { lat: 32.786706, lng: 35.692970 },
  },
  {
    id: "נאות-גולן-91667902",
    label: "נאות גולן / Neot Golan",
    location: { lat: 32.787126, lng: 35.691891 },
  },
  {
    id: "נאות-הכיכר-278474104",
    label: "נאות הכיכר / Neot HaKikar",
    location: { lat: 30.933003, lng: 35.377236 },
  },
  {
    id: "נאות-הכיכר-13621645649",
    label: "נאות הכיכר / Neot HaKikar",
    location: { lat: 30.933120, lng: 35.377841 },
  },
  {
    id: "נאות-מרדכי-582913183",
    label: "נאות מרדכי / Ne'ot Mordekhay",
    location: { lat: 33.160016, lng: 35.597207 },
  },
  {
    id: "נאות-מרדכי-278475683",
    label: "נאות מרדכי / Neot Mordekhay",
    location: { lat: 33.160576, lng: 35.596577 },
  },
  {
    id: "נאות-סמדר-278476861",
    label: "נאות סמדר / Neot Smadar",
    location: { lat: 30.048644, lng: 35.025735 },
  },
  {
    id: "נאות-סמדר-60206114",
    label: "נאות סמדר / Neot Smadar",
    location: { lat: 30.049521, lng: 35.027499 },
  },
  {
    id: "נבטים-275589911",
    label: "נבטים / Nevatim",
    location: { lat: 31.222537, lng: 34.880798 },
  },
  {
    id: "נבטים-701265554",
    label: "נבטים / Nevatim",
    location: { lat: 31.223506, lng: 34.880267 },
  },
  {
    id: "נבטים-920663129",
    label: "נבטים / Nevatim",
    location: { lat: 31.224193, lng: 34.881477 },
  },
  {
    id: "נגבה-278470492",
    label: "נגבה / Negba",
    location: { lat: 31.662329, lng: 34.682749 },
  },
  {
    id: "נגבה-92088626",
    label: "נגבה / Negba",
    location: { lat: 31.660466, lng: 34.683985 },
  },
  {
    id: "נהורה-278478516",
    label: "נהורה / Nehora",
    location: { lat: 31.622694, lng: 34.704690 },
  },
  {
    id: "נהורה-705435043",
    label: "נהורה / Nehora",
    location: { lat: 31.622931, lng: 34.705345 },
  },
  {
    id: "נהלל-278478010",
    label: "נהלל / Nahalal",
    location: { lat: 32.690063, lng: 35.196849 },
  },
  {
    id: "נהלל-617008655",
    label: "נהלל / Nahalal",
    location: { lat: 32.690493, lng: 35.197581 },
  },
  {
    id: "נהריה-140377675",
    label: "נהריה / Nahariyya",
    location: { lat: 33.006306, lng: 35.094558 },
  },
  {
    id: "נהריה-866867420",
    label: "נהריה / Nahariyya",
    location: { lat: 33.015260, lng: 35.097383 },
  },
  {
    id: "נוב-1652312952",
    label: "נוב / Nov",
    location: { lat: 32.832269, lng: 35.783189 },
  },
  {
    id: "נוב-91951312",
    label: "נוב / Nov",
    location: { lat: 32.833043, lng: 35.783543 },
  },
  {
    id: "נוגה-278478702",
    label: "נוגה / Noga",
    location: { lat: 31.625215, lng: 34.695305 },
  },
  {
    id: "נוגה-701301422",
    label: "נוגה / Noga",
    location: { lat: 31.623889, lng: 34.694706 },
  },
  {
    id: "נוה-אילן-278470439",
    label: "נוה אילן / Neve Ilan",
    location: { lat: 31.809242, lng: 35.078888 },
  },
  {
    id: "נוה-אילן-764567137",
    label: "נוה אילן / Neve Ilan",
    location: { lat: 31.808183, lng: 35.081178 },
  },
  {
    id: "נוה-איתמר-31980753",
    label: "נוה איתמר / Neve Itamar",
    location: { lat: 32.326580, lng: 34.874712 },
  },
  {
    id: "נוה-ימין-278474418",
    label: "נוה ימין / Neve Yamin",
    location: { lat: 32.171883, lng: 34.938795 },
  },
  {
    id: "נוה-ימין-700788358",
    label: "נוה ימין / Neve Yamin",
    location: { lat: 32.171236, lng: 34.940398 },
  },
  {
    id: "נוה-שלום-487108814",
    label: "נוה שלום / Neve Shalom-Wahat Al-Salam",
    location: { lat: 31.817507, lng: 34.978191 },
  },
  {
    id: "נוה-שלום-93326435",
    label: "נוה שלום / Neve Shalom-Wahat Al-Salam",
    location: { lat: 31.818244, lng: 34.978215 },
  },
  {
    id: "נווה-1344853185",
    label: "נווה / Navve",
    location: { lat: 31.162078, lng: 34.330061 },
  },
  {
    id: "נווה-119779017",
    label: "נווה / Navve",
    location: { lat: 31.161697, lng: 34.329704 },
  },
  {
    id: "נווה-אור-278477891",
    label: "נווה אור / Neve Ur",
    location: { lat: 32.588650, lng: 35.553149 },
  },
  {
    id: "נווה-אור-641561990",
    label: "נווה אור / Neve Ur",
    location: { lat: 32.588100, lng: 35.554006 },
  },
  {
    id: "נווה-אטי-ב-1652291739",
    label: "נווה אטי\"ב / Neve Ativ",
    location: { lat: 33.261958, lng: 35.740786 },
  },
  {
    id: "נווה-אטי-ב-818736401",
    label: "נווה אטי\"ב / Neve Ativ",
    location: { lat: 33.261534, lng: 35.741576 },
  },
  {
    id: "נווה-איתן-278477872",
    label: "נווה איתן / Neve Eitan",
    location: { lat: 32.492063, lng: 35.532786 },
  },
  {
    id: "נווה-איתן-81373469",
    label: "נווה איתן / Neve Eitan",
    location: { lat: 32.491889, lng: 35.532369 },
  },
  {
    id: "נווה-זוהר-278477627",
    label: "נווה זוהר / Neve Zohar",
    location: { lat: 31.152902, lng: 35.365301 },
  },
  {
    id: "נווה-זוהר-71267983",
    label: "נווה זוהר / Neve Zohar",
    location: { lat: 31.152801, lng: 35.364592 },
  },
  {
    id: "נווה-זיו-349907206",
    label: "נווה זיו / Neve Ziv",
    location: { lat: 33.027586, lng: 35.183495 },
  },
  {
    id: "נווה-זיו-691214799",
    label: "נווה זיו / Neve Ziv",
    location: { lat: 33.027788, lng: 35.179517 },
  },
  {
    id: "נווה-חריף-278475998",
    label: "נווה חריף / Neve Harif",
    location: { lat: 30.038953, lng: 35.035870 },
  },
  {
    id: "נווה-חריף-82659185",
    label: "נווה חריף / Neve Harif",
    location: { lat: 30.039247, lng: 35.036142 },
  },
  {
    id: "נווה-ים-246264545",
    label: "נווה ים / Neve Yam",
    location: { lat: 32.679161, lng: 34.931809 },
  },
  {
    id: "נווה-ים-54149082",
    label: "נווה ים / Neve Yam",
    location: { lat: 32.678725, lng: 34.931739 },
  },
  {
    id: "נווה-ירק-278476003",
    label: "נווה ירק / Neve Yaraq",
    location: { lat: 32.133324, lng: 34.924235 },
  },
  {
    id: "נווה-ירק-616784246",
    label: "נווה ירק / Neve Yaraq",
    location: { lat: 32.132320, lng: 34.924277 },
  },
  {
    id: "נווה-מבטח-84014655",
    label: "נווה מבטח / Neve Mivtach",
    location: { lat: 31.806417, lng: 34.740393 },
  },
  {
    id: "נווה-מבטח-278473254",
    label: "נווה מבטח / Neve Mivtah",
    location: { lat: 31.805924, lng: 34.741025 },
  },
  {
    id: "נווה-מיכאל-278475805",
    label: "נווה מיכאל / Neve Michael",
    location: { lat: 31.672977, lng: 35.005912 },
  },
  {
    id: "נווה-מיכאל-92021299",
    label: "נווה מיכאל / Neve Michael",
    location: { lat: 31.673344, lng: 35.007278 },
  },
  {
    id: "נווה-עמיאל-278478712",
    label: "נווה עמיאל / Neve Ammiel",
    location: { lat: 32.702205, lng: 35.137383 },
  },
  {
    id: "נווה-עמיאל-617460629",
    label: "נווה עמיאל / Neve Ammiel",
    location: { lat: 32.701454, lng: 35.137889 },
  },
  {
    id: "נועם-278469795",
    label: "נועם / Noam",
    location: { lat: 31.566910, lng: 34.789097 },
  },
  {
    id: "נועם-705461381",
    label: "נועם / Noam",
    location: { lat: 31.566793, lng: 34.789150 },
  },
  {
    id: "נוף-איילון-829832975",
    label: "נוף איילון / Nof Ayalon",
    location: { lat: 31.870521, lng: 34.989658 },
  },
  {
    id: "נוף-איילון-751797981",
    label: "נוף איילון / Nof Ayalon",
    location: { lat: 31.868674, lng: 34.989108 },
  },
  {
    id: "נוף-הגליל-214022033",
    label: "נוף הגליל / Nof HaGalil",
    location: { lat: 32.702306, lng: 35.318322 },
  },
  {
    id: "נוף-הגליל-610612251",
    label: "נוף הגליל / Nof HaGalil",
    location: { lat: 32.709934, lng: 35.329873 },
  },
  {
    id: "נופית-527446771",
    label: "נופית / Nofit",
    location: { lat: 32.758616, lng: 35.147350 },
  },
  {
    id: "נופית-772193624",
    label: "נופית / Nofit",
    location: { lat: 32.759688, lng: 35.144712 },
  },
  {
    id: "נופך-278477482",
    label: "נופך / Nofekh",
    location: { lat: 32.043557, lng: 34.920728 },
  },
  {
    id: "נופך-616290929",
    label: "נופך / Nofekh",
    location: { lat: 32.043005, lng: 34.920545 },
  },
  {
    id: "נורדיה-278476371",
    label: "נורדיה / Nordia",
    location: { lat: 32.314780, lng: 34.896182 },
  },
  {
    id: "נורדיה-79315339",
    label: "נורדיה / Nordia",
    location: { lat: 32.314783, lng: 34.896431 },
  },
  {
    id: "נורית-278477851",
    label: "נורית / Nurit",
    location: { lat: 32.542654, lng: 35.356039 },
  },
  {
    id: "נורית-786140348",
    label: "נורית / Nurit",
    location: { lat: 32.541909, lng: 35.355476 },
  },
  {
    id: "נח-ל-שיטים-91938943",
    label: "נח\"ל שיטים / Nahal Shittim",
    location: { lat: 30.176933, lng: 35.016453 },
  },
  {
    id: "נחושה-278477914",
    label: "נחושה / Nehusha",
    location: { lat: 31.628791, lng: 34.952284 },
  },
  {
    id: "נחושה-82628031",
    label: "נחושה / Nehusha",
    location: { lat: 31.628175, lng: 34.954205 },
  },
  {
    id: "נחל-עוז-278476070",
    label: "נחל עוז / Nahal Oz",
    location: { lat: 31.472407, lng: 34.498211 },
  },
  {
    id: "נחל-עוז-92392967",
    label: "נחל עוז / Nahal Oz",
    location: { lat: 31.472718, lng: 34.498333 },
  },
  {
    id: "נחלה-278478828",
    label: "נחלה / Nahala",
    location: { lat: 31.657961, lng: 34.794982 },
  },
  {
    id: "נחלה-602249027",
    label: "נחלה / Nahala",
    location: { lat: 31.658876, lng: 34.794158 },
  },
  {
    id: "נחלים-589920171",
    label: "נחלים / Nechalim",
    location: { lat: 32.057588, lng: 34.911737 },
  },
  {
    id: "נחלים-246255486",
    label: "נחלים / Nehalim",
    location: { lat: 32.058972, lng: 34.913650 },
  },
  {
    id: "נחם-278473288",
    label: "נחם / Naham",
    location: { lat: 31.766574, lng: 35.003950 },
  },
  {
    id: "נחם-82628846",
    label: "נחם / Naham",
    location: { lat: 31.766184, lng: 35.002963 },
  },
  {
    id: "נחף-278478505",
    label: "נחף / Nahf",
    location: { lat: 32.934569, lng: 35.317630 },
  },
  {
    id: "נחשולים-5457706",
    label: "נחשולים / Nachsholim",
    location: { lat: 32.614107, lng: 34.921287 },
  },
  {
    id: "נחשולים-246264590",
    label: "נחשולים / Nahsholim",
    location: { lat: 32.613848, lng: 34.920630 },
  },
  {
    id: "נחשון-278476992",
    label: "נחשון / Nahshon",
    location: { lat: 31.830965, lng: 34.955921 },
  },
  {
    id: "נחשון-93326430",
    label: "נחשון / Nahshon",
    location: { lat: 31.830903, lng: 34.954508 },
  },
  {
    id: "נחשונים-616781620",
    label: "נחשונים / Nachshonim",
    location: { lat: 32.060469, lng: 34.949099 },
  },
  {
    id: "נחשונים-271920581",
    label: "נחשונים / Nahshonim",
    location: { lat: 32.061455, lng: 34.949253 },
  },
  {
    id: "נטועה-429882155",
    label: "נטועה / Netua",
    location: { lat: 33.064942, lng: 35.323312 },
  },
  {
    id: "נטועה-690014825",
    label: "נטועה / Netua",
    location: { lat: 33.064552, lng: 35.322653 },
  },
  {
    id: "נטור-91951316",
    label: "נטור / Nattoor",
    location: { lat: 32.854454, lng: 35.750628 },
  },
  {
    id: "נטור-300162020",
    label: "נטור / Natur",
    location: { lat: 32.853805, lng: 35.751462 },
  },
  {
    id: "נטע-1344828157",
    label: "נטע / Neta",
    location: { lat: 31.477848, lng: 34.926642 },
  },
  {
    id: "נטעים-274607830",
    label: "נטעים / Netaim",
    location: { lat: 31.944444, lng: 34.774444 },
  },
  {
    id: "נטעים-705372321",
    label: "נטעים / Netaim",
    location: { lat: 31.944516, lng: 34.776439 },
  },
  {
    id: "נטף-597757951",
    label: "נטף / Nataf",
    location: { lat: 31.832013, lng: 35.067999 },
  },
  {
    id: "נטף-85840459",
    label: "נטף / Nataf",
    location: { lat: 31.833075, lng: 35.067829 },
  },
  {
    id: "ניין-278476928",
    label: "ניין / Nein",
    location: { lat: 32.630727, lng: 35.348869 },
  },
  {
    id: "ניין-614217669",
    label: "ניין / Nein",
    location: { lat: 32.631581, lng: 35.348728 },
  },
  {
    id: "ניצן-278478451",
    label: "ניצן / Nitzan",
    location: { lat: 31.739942, lng: 34.631816 },
  },
  {
    id: "ניצן-123260555",
    label: "ניצן / Nitzan",
    location: { lat: 31.739409, lng: 34.633526 },
  },
  {
    id: "ניצן-ב-1375201367",
    label: "ניצן ב׳ / Nitzan Bet",
    location: { lat: 31.736119, lng: 34.635969 },
  },
  {
    id: "ניצן-ב-123260553",
    label: "ניצן ב׳ / Nitzan Bet",
    location: { lat: 31.736245, lng: 34.636469 },
  },
  {
    id: "ניצנה-278473205",
    label: "ניצנה / Nitsana",
    location: { lat: 30.886323, lng: 34.421866 },
  },
  {
    id: "ניצנה-92402840",
    label: "ניצנה / Nitsana",
    location: { lat: 30.885371, lng: 34.422238 },
  },
  {
    id: "ניצני-סיני-278474507",
    label: "ניצני סיני / Nitzanei Sinai",
    location: { lat: 30.903912, lng: 34.396893 },
  },
  {
    id: "ניצני-סיני-83365544",
    label: "ניצני סיני / Nitzanei Sinai",
    location: { lat: 30.903957, lng: 34.397890 },
  },
  {
    id: "ניצני-עוז-278371570",
    label: "ניצני עוז / Nitzaney Oz",
    location: { lat: 32.305486, lng: 35.004886 },
  },
  {
    id: "ניצני-עוז-700664802",
    label: "ניצני עוז / Nitzaney Oz",
    location: { lat: 32.306373, lng: 35.002874 },
  },
  {
    id: "ניצנים-278477600",
    label: "ניצנים / Nitsanim",
    location: { lat: 31.716832, lng: 34.634187 },
  },
  {
    id: "ניצנים-580236398",
    label: "ניצנים / Nitsanim",
    location: { lat: 31.717182, lng: 34.635432 },
  },
  {
    id: "ניר-אליהו-278474220",
    label: "ניר אליהו / Nir Eliyahu",
    location: { lat: 32.197386, lng: 34.948359 },
  },
  {
    id: "ניר-אליהו-84531815",
    label: "ניר אליהו / Nir Eliyahu",
    location: { lat: 32.197061, lng: 34.948950 },
  },
  {
    id: "ניר-בנים-278477959",
    label: "ניר בנים / Nir Banim",
    location: { lat: 31.671722, lng: 34.754245 },
  },
  {
    id: "ניר-בנים-636996793",
    label: "ניר בנים / Nir Banim",
    location: { lat: 31.672372, lng: 34.754532 },
  },
  {
    id: "ניר-גלים-278476844",
    label: "ניר גלים / Nir Gallim",
    location: { lat: 31.824473, lng: 34.681947 },
  },
  {
    id: "ניר-גלים-92388057",
    label: "ניר גלים / Nir Gallim",
    location: { lat: 31.824474, lng: 34.683966 },
  },
  {
    id: "ניר-דוד-278471194",
    label: "ניר דוד / Nir David",
    location: { lat: 32.502737, lng: 35.456750 },
  },
  {
    id: "ניר-דוד-178754809",
    label: "ניר דוד / Nir David",
    location: { lat: 32.503388, lng: 35.457815 },
  },
  {
    id: "ניר-ח-ן-278477277",
    label: "ניר ח״ן / Nir Hen",
    location: { lat: 31.608443, lng: 34.714508 },
  },
  {
    id: "ניר-ח-ן-705427702",
    label: "ניר ח״ן / Nir Hen",
    location: { lat: 31.609525, lng: 34.714855 },
  },
  {
    id: "ניר-יפה-617491535",
    label: "ניר יפה / Nir Yafe",
    location: { lat: 32.569513, lng: 35.244687 },
  },
  {
    id: "ניר-יפה-278470122",
    label: "ניר יפה / Nir Yafeh",
    location: { lat: 32.569629, lng: 35.245298 },
  },
  {
    id: "ניר-יצחק-82487672",
    label: "ניר יצחק / Nir Yitzhak",
    location: { lat: 31.236851, lng: 34.357305 },
  },
  {
    id: "ניר-יצחק-278475769",
    label: "ניר יצחק / Nir Yizhak",
    location: { lat: 31.237857, lng: 34.357789 },
  },
  {
    id: "ניר-ישראל-278477064",
    label: "ניר ישראל / Nir Yisrael",
    location: { lat: 31.687342, lng: 34.636415 },
  },
  {
    id: "ניר-ישראל-630772880",
    label: "ניר ישראל / Nir Yisrael",
    location: { lat: 31.688209, lng: 34.635653 },
  },
  {
    id: "ניר-משה-278478506",
    label: "ניר משה / Nir Moshe",
    location: { lat: 31.477270, lng: 34.629974 },
  },
  {
    id: "ניר-משה-680732217",
    label: "ניר משה / Nir Moshe",
    location: { lat: 31.477096, lng: 34.631001 },
  },
  {
    id: "ניר-עוז-278470720",
    label: "ניר עוז / Nir Oz",
    location: { lat: 31.309598, lng: 34.400815 },
  },
  {
    id: "ניר-עוז-82487824",
    label: "ניר עוז / Nir Oz",
    location: { lat: 31.309873, lng: 34.401046 },
  },
  {
    id: "ניר-עם-278476380",
    label: "ניר עם / Nir Am",
    location: { lat: 31.519314, lng: 34.580762 },
  },
  {
    id: "ניר-עם-92392972",
    label: "ניר עם / Nir Am",
    location: { lat: 31.519046, lng: 34.580252 },
  },
  {
    id: "ניר-עציון-278478537",
    label: "ניר עציון / Nir Etzion",
    location: { lat: 32.697584, lng: 34.993606 },
  },
  {
    id: "ניר-עציון-142058780",
    label: "ניר עציון / Nir Etzion",
    location: { lat: 32.697774, lng: 34.992179 },
  },
  {
    id: "ניר-עקיבא-278477303",
    label: "ניר עקיבא / Nir Aqiva",
    location: { lat: 31.469544, lng: 34.645470 },
  },
  {
    id: "ניר-עקיבא-680731698",
    label: "ניר עקיבא / Nir Aqiva",
    location: { lat: 31.470826, lng: 34.648817 },
  },
  {
    id: "ניר-צבי-278478430",
    label: "ניר צבי / Nir Tzvi",
    location: { lat: 31.951381, lng: 34.860972 },
  },
  {
    id: "ניר-צבי-586650213",
    label: "ניר צבי / Nir Tzvi",
    location: { lat: 31.951929, lng: 34.863394 },
  },
  {
    id: "נירים-278477983",
    label: "נירים / Nirim",
    location: { lat: 31.335199, lng: 34.395000 },
  },
  {
    id: "נירים-30043468",
    label: "נירים / Nirim",
    location: { lat: 31.334849, lng: 34.396047 },
  },
  {
    id: "נירית-370400000",
    label: "נירית / Nirit",
    location: { lat: 32.146608, lng: 34.984395 },
  },
  {
    id: "נירית-766888542",
    label: "נירית / Nirit",
    location: { lat: 32.146726, lng: 34.984318 },
  },
  {
    id: "נמרוד-1652294180",
    label: "נמרוד / Nimrod",
    location: { lat: 33.245209, lng: 35.751027 },
  },
  {
    id: "נמרוד-94729927",
    label: "נמרוד / Nimrod",
    location: { lat: 33.245453, lng: 35.751230 },
  },
  {
    id: "נס-הרים-274607804",
    label: "נס הרים / Nes Harim",
    location: { lat: 31.744462, lng: 35.057958 },
  },
  {
    id: "נס-הרים-87309334",
    label: "נס הרים / Nes Harim",
    location: { lat: 31.744490, lng: 35.057558 },
  },
  {
    id: "נס-עמים-91929054",
    label: "נס עמים / Nes Amim",
    location: { lat: 32.966225, lng: 35.121024 },
  },
  {
    id: "נס-עמים-274607813",
    label: "נס עמים / Nes Ammim",
    location: { lat: 32.965671, lng: 35.121147 },
  },
  {
    id: "נס-ציונה-202433223",
    label: "נס ציונה / Ness Ziona",
    location: { lat: 31.929558, lng: 34.799061 },
  },
  {
    id: "נס-ציונה-38283881",
    label: "נס ציונה / Ness Ziona",
    location: { lat: 31.923209, lng: 34.793930 },
  },
  {
    id: "נס-ציונה-82991026",
    label: "נס ציונה / Ness Ziona",
    location: { lat: 31.931108, lng: 34.799185 },
  },
  {
    id: "נעורה-278476809",
    label: "נעורה / Na'ura",
    location: { lat: 32.614016, lng: 35.390348 },
  },
  {
    id: "נעורה-614217133",
    label: "נעורה / Ne'ora",
    location: { lat: 32.613985, lng: 35.391184 },
  },
  {
    id: "נען-275232536",
    label: "נען / Naan",
    location: { lat: 31.883755, lng: 34.857089 },
  },
  {
    id: "נען-580616957",
    label: "נען / Naan",
    location: { lat: 31.883889, lng: 34.858726 },
  },
  {
    id: "נצאצרה-1077222704",
    label: "נצאצרה / Nasasra",
    location: { lat: 31.242973, lng: 35.030224 },
  },
  {
    id: "נצאצרה-92911228",
    label: "נצאצרה / Nazazra",
    location: { lat: 31.244714, lng: 35.034197 },
  },
  {
    id: "נצר-חזני-1317216364",
    label: "נצר חזני / Netzer Hazani",
    location: { lat: 31.821613, lng: 34.862480 },
  },
  {
    id: "נצר-חזני-815839083",
    label: "נצר חזני / Netzer Hazani",
    location: { lat: 31.820549, lng: 34.862504 },
  },
  {
    id: "נצר-סרני-945299853",
    label: "נצר סרני / Netzer Sereni",
    location: { lat: 31.923098, lng: 34.823998 },
  },
  {
    id: "נצר-סרני-81044843",
    label: "נצר סרני / Netzer Sereni",
    location: { lat: 31.924149, lng: 34.824315 },
  },
  {
    id: "נצרת-278477461",
    label: "נצרת / Nazareth",
    location: { lat: 32.706630, lng: 35.304816 },
  },
  {
    id: "נצרת-17394564",
    label: "נצרת / Nazareth",
    location: { lat: 32.701669, lng: 35.292879 },
  },
  {
    id: "נשר-275585093",
    label: "נשר / Nesher",
    location: { lat: 32.770880, lng: 35.038125 },
  },
  {
    id: "נשר-70812848",
    label: "נשר / Nesher",
    location: { lat: 32.771850, lng: 35.041804 },
  },
  {
    id: "נתיב-הל-ה-278473412",
    label: "נתיב הל\"ה / Netiv Ha'Lamed-He",
    location: { lat: 31.688560, lng: 34.982335 },
  },
  {
    id: "נתיב-הל-ה-446953010",
    label: "נתיב הל\"ה / Netiv HaLamed He",
    location: { lat: 31.688087, lng: 34.981561 },
  },
  {
    id: "נתיב-העשרה-631419468",
    label: "נתיב העשרה / Netiv HaAsara",
    location: { lat: 31.571680, lng: 34.539549 },
  },
  {
    id: "נתיב-העשרה-92380267",
    label: "נתיב העשרה / Netiv HaAsara",
    location: { lat: 31.571905, lng: 34.540347 },
  },
  {
    id: "נתיב-השיירה-278477715",
    label: "נתיב השיירה / Netiv HaShayyara",
    location: { lat: 32.992825, lng: 35.135517 },
  },
  {
    id: "נתיב-השיירה-687858390",
    label: "נתיב השיירה / Netiv HaShayyara",
    location: { lat: 32.994610, lng: 35.135930 },
  },
  {
    id: "נתיבות-278478336",
    label: "נתיבות / Netivot",
    location: { lat: 31.421355, lng: 34.588425 },
  },
  {
    id: "נתיבות-663436505",
    label: "נתיבות / Netivot",
    location: { lat: 31.425043, lng: 34.583955 },
  },
  {
    id: "נתניה-1683129849",
    label: "נתניה / Netanya",
    location: { lat: 32.328618, lng: 34.856625 },
  },
  {
    id: "נתניה-7155961",
    label: "נתניה / Netanya",
    location: { lat: 32.310461, lng: 34.862121 },
  },
  {
    id: "סאג-ור-278474079",
    label: "סאג׳ור / Sajur",
    location: { lat: 32.941989, lng: 35.342198 },
  },
  {
    id: "סאג-ור-614177093",
    label: "סאג׳ור / Sajur",
    location: { lat: 32.942010, lng: 35.344774 },
  },
  {
    id: "סאסא-278473081",
    label: "סאסא / Sasa",
    location: { lat: 33.026907, lng: 35.394990 },
  },
  {
    id: "סאסא-583730091",
    label: "סאסא / Sasa",
    location: { lat: 33.027446, lng: 35.395525 },
  },
  {
    id: "סביון-8281800632",
    label: "סביון / Savyon",
    location: { lat: 32.047537, lng: 34.879917 },
  },
  {
    id: "סביון-93181412",
    label: "סביון / Savyon",
    location: { lat: 32.048329, lng: 34.878732 },
  },
  {
    id: "סגולה-278476387",
    label: "סגולה / Segula",
    location: { lat: 31.669726, lng: 34.779153 },
  },
  {
    id: "סגולה-631942212",
    label: "סגולה / Segula",
    location: { lat: 31.670344, lng: 34.779956 },
  },
  {
    id: "סוואווין-4867907758",
    label: "סוואווין / Swawin",
    location: { lat: 31.184505, lng: 34.880549 },
  },
  {
    id: "סוואעד-חמירה-1075655419",
    label: "סוואעד חמירה / Suweid Hamira",
    location: { lat: 32.767399, lng: 35.168200 },
  },
  {
    id: "סוואעד-חמירה-614296877",
    label: "סוואעד חמירה / Suweid Hamira",
    location: { lat: 32.767173, lng: 35.167746 },
  },
  {
    id: "סולם-278477861",
    label: "סולם / Sulam",
    location: { lat: 32.606186, lng: 35.333889 },
  },
  {
    id: "סולם-85788558",
    label: "סולם / Sulam",
    location: { lat: 32.606253, lng: 35.334400 },
  },
  {
    id: "סופה-340064964",
    label: "סופה / Sufa",
    location: { lat: 31.236514, lng: 34.342642 },
  },
  {
    id: "סופה-82487675",
    label: "סופה / Sufa",
    location: { lat: 31.235822, lng: 34.341396 },
  },
  {
    id: "סח-נין-16390731",
    label: "סח'נין / Sakhnin",
    location: { lat: 32.864570, lng: 35.300234 },
  },
  {
    id: "סייד-1075533400",
    label: "סייד / Sayyid",
    location: { lat: 31.281191, lng: 34.931759 },
  },
  {
    id: "סייד-92913326",
    label: "סייד / Sayyid",
    location: { lat: 31.280596, lng: 34.932059 },
  },
  {
    id: "סכנין-278475752",
    label: "סכנין / Sakhnin",
    location: { lat: 32.863805, lng: 35.302318 },
  },
  {
    id: "סלים-278477278",
    label: "סלים / Salim",
    location: { lat: 32.542256, lng: 35.199275 },
  },
  {
    id: "סלים-85788278",
    label: "סלים / Salim",
    location: { lat: 32.543848, lng: 35.199545 },
  },
  {
    id: "סלמה-278476873",
    label: "סלמה / Sallama",
    location: { lat: 32.893650, lng: 35.369905 },
  },
  {
    id: "סלמה-610265842",
    label: "סלמה / Sallama",
    location: { lat: 32.892101, lng: 35.370431 },
  },
  {
    id: "סמר-429882226",
    label: "סמר / Samar",
    location: { lat: 29.833374, lng: 35.022744 },
  },
  {
    id: "סמר-617413951",
    label: "סמר / Samar",
    location: { lat: 29.833857, lng: 35.022046 },
  },
  {
    id: "סנדלה-278475565",
    label: "סנדלה / Sandala",
    location: { lat: 32.523123, lng: 35.323772 },
  },
  {
    id: "סנדלה-81641305",
    label: "סנדלה / Sandala",
    location: { lat: 32.522547, lng: 35.323381 },
  },
  {
    id: "סנסנה-732444769",
    label: "סנסנה / Sansana",
    location: { lat: 31.363675, lng: 34.902108 },
  },
  {
    id: "סעד-278477056",
    label: "סעד / Saad",
    location: { lat: 31.470029, lng: 34.535535 },
  },
  {
    id: "סעד-92392960",
    label: "סעד / Saad",
    location: { lat: 31.470404, lng: 34.533741 },
  },
  {
    id: "סעווה-4867761457",
    label: "סעווה / Sa'wah",
    location: { lat: 31.270226, lng: 34.961332 },
  },
  {
    id: "סער-278473976",
    label: "סער / Saar",
    location: { lat: 33.029365, lng: 35.109324 },
  },
  {
    id: "סער-74194134",
    label: "סער / Saar",
    location: { lat: 33.029536, lng: 35.110034 },
  },
  {
    id: "ספיר-278476801",
    label: "ספיר / Sapir",
    location: { lat: 30.614095, lng: 35.184641 },
  },
  {
    id: "ספיר-60134938",
    label: "ספיר / Sapir",
    location: { lat: 30.613640, lng: 35.184310 },
  },
  {
    id: "סרעיאה-1075467314",
    label: "סרעיאה / Sarayea",
    location: { lat: 31.262123, lng: 34.969640 },
  },
  {
    id: "סרעיאה-92885022",
    label: "סרעיאה / Sarayea",
    location: { lat: 31.260351, lng: 34.965396 },
  },
  {
    id: "סתריה-275589913",
    label: "סתריה / Sitria",
    location: { lat: 31.891883, lng: 34.844046 },
  },
  {
    id: "סתריה-407327830",
    label: "סתריה / Sitriya",
    location: { lat: 31.890408, lng: 34.844016 },
  },
  {
    id: "ע-ג-ר-4672294477",
    label: "ע'ג'ר / Ghajar",
    location: { lat: 33.272173, lng: 35.623911 },
  },
  {
    id: "ע-זה-4867867786",
    label: "ע'זה / Ghazzah",
    location: { lat: 31.212968, lng: 35.131170 },
  },
  {
    id: "עארה-275585096",
    label: "עארה / 'Ara",
    location: { lat: 32.505951, lng: 35.078758 },
  },
  {
    id: "עארה-84677293",
    label: "עארה / Arra",
    location: { lat: 32.506750, lng: 35.077792 },
  },
  {
    id: "עבדה-4867942081",
    label: "עבדה / Abdih",
    location: { lat: 30.752198, lng: 34.776471 },
  },
  {
    id: "עבדה-305370038",
    label: "עבדה / Abdih",
    location: { lat: 30.751710, lng: 34.775870 },
  },
  {
    id: "עבדה-333553991",
    label: "עבדה / Abdih",
    location: { lat: 30.808983, lng: 34.753562 },
  },
  {
    id: "עבדה-7456857402",
    label: "עבדה / Avdat",
    location: { lat: 30.809602, lng: 34.756086 },
  },
  {
    id: "עבדון-278473557",
    label: "עבדון / Avdon",
    location: { lat: 33.047945, lng: 35.179437 },
  },
  {
    id: "עבדון-691036302",
    label: "עבדון / Avdon",
    location: { lat: 33.047843, lng: 35.178426 },
  },
  {
    id: "עברון-278478349",
    label: "עברון / Evron",
    location: { lat: 32.992601, lng: 35.100203 },
  },
  {
    id: "עברון-74284019",
    label: "עברון / Evron",
    location: { lat: 32.991326, lng: 35.101568 },
  },
  {
    id: "עגור-344227581",
    label: "עגור / Agur",
    location: { lat: 31.697105, lng: 34.912921 },
  },
  {
    id: "עגור-82627912",
    label: "עגור / Agur",
    location: { lat: 31.697600, lng: 34.912261 },
  },
  {
    id: "עדי-1066632916",
    label: "עדי / Adi",
    location: { lat: 32.781891, lng: 35.173627 },
  },
  {
    id: "עדי-620866868",
    label: "עדי / Adi",
    location: { lat: 32.782961, lng: 35.174393 },
  },
  {
    id: "עדי-נגב-נחלת-ערן-5816326325",
    label: "עדי נגב - נחלת ערן / Adi Negev - Nahalat Eran",
    location: { lat: 31.315525, lng: 34.594597 },
  },
  {
    id: "עדנים-278477781",
    label: "עדנים / Adanim",
    location: { lat: 32.138295, lng: 34.908274 },
  },
  {
    id: "עדנים-92481057",
    label: "עדנים / Adanim",
    location: { lat: 32.139407, lng: 34.908135 },
  },
  {
    id: "עווג-אן-7266553",
    label: "עווג'אן / A'wajan",
    location: { lat: 31.305051, lng: 34.837395 },
  },
  {
    id: "עוזה-278470452",
    label: "עוזה / Uza",
    location: { lat: 31.592477, lng: 34.764954 },
  },
  {
    id: "עוזה-707227396",
    label: "עוזה / Uza",
    location: { lat: 31.593400, lng: 34.763252 },
  },
  {
    id: "עוזיר-278477856",
    label: "עוזיר / Uzeir",
    location: { lat: 32.790070, lng: 35.327175 },
  },
  {
    id: "עוזיר-91560518",
    label: "עוזיר / Uzeir",
    location: { lat: 32.790562, lng: 35.323967 },
  },
  {
    id: "עולש-278473382",
    label: "עולש / Olesh",
    location: { lat: 32.331711, lng: 34.986218 },
  },
  {
    id: "עולש-79322895",
    label: "עולש / Olesh",
    location: { lat: 32.332516, lng: 34.984869 },
  },
  {
    id: "עומר-278477903",
    label: "עומר / Omer",
    location: { lat: 31.265936, lng: 34.847616 },
  },
  {
    id: "עומר-927202144",
    label: "עומר / Omer",
    location: { lat: 31.267792, lng: 34.850015 },
  },
  {
    id: "עופר-278477516",
    label: "עופר / Ofer",
    location: { lat: 32.622089, lng: 34.982803 },
  },
  {
    id: "עופר-81774941",
    label: "עופר / Ofer",
    location: { lat: 32.622507, lng: 34.981775 },
  },
  {
    id: "עוצם-278475763",
    label: "עוצם / Otzem",
    location: { lat: 31.636650, lng: 34.702558 },
  },
  {
    id: "עוצם-701300005",
    label: "עוצם / Otzem",
    location: { lat: 31.638244, lng: 34.703968 },
  },
  {
    id: "עוקבי-1077230535",
    label: "עוקבי / Ukbi",
    location: { lat: 31.284420, lng: 34.929955 },
  },
  {
    id: "עוקבי-92913324",
    label: "עוקבי / Ukbi",
    location: { lat: 31.284071, lng: 34.929570 },
  },
  {
    id: "עזאזמה-599588460",
    label: "עזאזמה / Azazme",
    location: { lat: 31.162751, lng: 34.818384 },
  },
  {
    id: "עזוז-274596911",
    label: "עזוז / Ezuz",
    location: { lat: 30.791667, lng: 34.472222 },
  },
  {
    id: "עזוז-92403352",
    label: "עזוז / Ezuz",
    location: { lat: 30.792180, lng: 34.472132 },
  },
  {
    id: "עזר-587104607",
    label: "עזר / Ezer",
    location: { lat: 31.736507, lng: 34.671447 },
  },
  {
    id: "עזר-699214832",
    label: "עזר / Ezer",
    location: { lat: 31.736651, lng: 34.670685 },
  },
  {
    id: "עזריאל-275595065",
    label: "עזריאל / Azri'el",
    location: { lat: 32.262909, lng: 34.971208 },
  },
  {
    id: "עזריאל-83012775",
    label: "עזריאל / Azriel",
    location: { lat: 32.261117, lng: 34.970208 },
  },
  {
    id: "עזריה-278473717",
    label: "עזריה / Azarya",
    location: { lat: 31.890499, lng: 34.911568 },
  },
  {
    id: "עזריה-588485711",
    label: "עזריה / Azarya",
    location: { lat: 31.890428, lng: 34.908131 },
  },
  {
    id: "עזריקם-275595064",
    label: "עזריקם / Azriqam",
    location: { lat: 31.753771, lng: 34.694902 },
  },
  {
    id: "עזריקם-92029216",
    label: "עזריקם / Azriqam",
    location: { lat: 31.750571, lng: 34.696579 },
  },
  {
    id: "עיבלין-278477272",
    label: "עיבלין / Ibilin",
    location: { lat: 32.820917, lng: 35.191330 },
  },
  {
    id: "עיבלין-615165297",
    label: "עיבלין / Ibilin",
    location: { lat: 32.823481, lng: 35.189635 },
  },
  {
    id: "עידן-598664248",
    label: "עידן / Idan",
    location: { lat: 30.806034, lng: 35.299403 },
  },
  {
    id: "עידן-60263090",
    label: "עידן / Idan",
    location: { lat: 30.806353, lng: 35.299854 },
  },
  {
    id: "עיינות-274607811",
    label: "עיינות / Ayanot",
    location: { lat: 31.915950, lng: 34.767791 },
  },
  {
    id: "עיינות-84843007",
    label: "עיינות / Ayanot",
    location: { lat: 31.915575, lng: 34.767933 },
  },
  {
    id: "עילבון-278477432",
    label: "עילבון / Ilabun",
    location: { lat: 32.834923, lng: 35.401105 },
  },
  {
    id: "עילבון-610269842",
    label: "עילבון / Ilabun",
    location: { lat: 32.837165, lng: 35.404490 },
  },
  {
    id: "עין-א-סהלה-7200224",
    label: "עין א סהלה / Ein As-Sahla",
    location: { lat: 32.488459, lng: 35.120067 },
  },
  {
    id: "עין-א-דיסה-12652237737",
    label: "עין א-דיסה / Ein ad-Disa",
    location: { lat: 33.217417, lng: 35.686223 },
  },
  {
    id: "עין-איברהים-278473108",
    label: "עין איברהים / Ein Ibrahim",
    location: { lat: 32.535632, lng: 35.146172 },
  },
  {
    id: "עין-איברהים-92001536",
    label: "עין איברהים / Ein Ibrahim",
    location: { lat: 32.535684, lng: 35.144169 },
  },
  {
    id: "עין-איילה-637953447",
    label: "עין איילה / Ein Ayala",
    location: { lat: 32.628659, lng: 34.943896 },
  },
  {
    id: "עין-איילה-278476392",
    label: "עין איילה / Ein Ayyala",
    location: { lat: 32.628733, lng: 34.945402 },
  },
  {
    id: "עין-אל-אסד-278474301",
    label: "עין אל אסד / Ein al-Asad",
    location: { lat: 32.940294, lng: 35.401005 },
  },
  {
    id: "עין-אל-אסד-613797868",
    label: "עין אל אסד / Ein al-Asad",
    location: { lat: 32.939658, lng: 35.399118 },
  },
  {
    id: "עין-אל-סהלה-1068786994",
    label: "עין אל-סהלה / Ein as-Sahla",
    location: { lat: 32.490466, lng: 35.117079 },
  },
  {
    id: "עין-בוקק-278473301",
    label: "עין בוקק / Ein Bokek",
    location: { lat: 31.201383, lng: 35.363884 },
  },
  {
    id: "עין-גב-278477456",
    label: "עין גב / Ein Gev",
    location: { lat: 32.781112, lng: 35.638885 },
  },
  {
    id: "עין-גב-90578202",
    label: "עין גב / Ein Gev",
    location: { lat: 32.783505, lng: 35.638229 },
  },
  {
    id: "עין-גדי-278478136",
    label: "עין גדי / Ein Gedi",
    location: { lat: 31.452396, lng: 35.384824 },
  },
  {
    id: "עין-גדי-92400378",
    label: "עין גדי / Ein Gedi",
    location: { lat: 31.452607, lng: 35.384218 },
  },
  {
    id: "עין-גנים-563962073",
    label: "עין גנים / Ein Ganim",
    location: { lat: 31.881944, lng: 34.815599 },
  },
  {
    id: "עין-דור-278474123",
    label: "עין דור / Ein Dor",
    location: { lat: 32.656252, lng: 35.417043 },
  },
  {
    id: "עין-דור-641202419",
    label: "עין דור / Ein Dor",
    location: { lat: 32.657426, lng: 35.417651 },
  },
  {
    id: "עין-הבשור-601555741",
    label: "עין הבשור / Ein HaBsor",
    location: { lat: 31.280566, lng: 34.443763 },
  },
  {
    id: "עין-הבשור-82487766",
    label: "עין הבשור / Ein HaBsor",
    location: { lat: 31.281169, lng: 34.442358 },
  },
  {
    id: "עין-הוד-276683127",
    label: "עין הוד / Ein Hod",
    location: { lat: 32.700502, lng: 34.982596 },
  },
  {
    id: "עין-הוד-90830123",
    label: "עין הוד / Ein Hod",
    location: { lat: 32.699066, lng: 34.982992 },
  },
  {
    id: "עין-החורש-278478282",
    label: "עין החורש / Ein HaHoresh",
    location: { lat: 32.386319, lng: 34.940027 },
  },
  {
    id: "עין-החורש-83149835",
    label: "עין החורש / Ein HaHoresh",
    location: { lat: 32.385789, lng: 34.939752 },
  },
  {
    id: "עין-המפרץ-278477361",
    label: "עין המפרץ / Ein HaMifratz",
    location: { lat: 32.903615, lng: 35.096112 },
  },
  {
    id: "עין-המפרץ-91370915",
    label: "עין המפרץ / Ein Hamifratz",
    location: { lat: 32.903806, lng: 35.096628 },
  },
  {
    id: "עין-הנציב-94712878",
    label: "עין הנציב / Ein HaNatsiv",
    location: { lat: 32.469989, lng: 35.502284 },
  },
  {
    id: "עין-הנציב-278478104",
    label: "עין הנציב / Ein HaNatziv",
    location: { lat: 32.469760, lng: 35.501484 },
  },
  {
    id: "עין-העמק-278473618",
    label: "עין העמק / Ein HaEmek",
    location: { lat: 32.629013, lng: 35.085394 },
  },
  {
    id: "עין-העמק-704967090",
    label: "עין העמק / Ein HaEmek",
    location: { lat: 32.628295, lng: 35.084245 },
  },
  {
    id: "עין-השופט-278477536",
    label: "עין השופט / Ein HaShofet",
    location: { lat: 32.595767, lng: 35.100035 },
  },
  {
    id: "עין-השופט-94519259",
    label: "עין השופט / Ein HaShofet",
    location: { lat: 32.593795, lng: 35.101463 },
  },
  {
    id: "עין-השלושה-278472750",
    label: "עין השלושה / Ein HaShlosha",
    location: { lat: 31.351350, lng: 34.400966 },
  },
  {
    id: "עין-השלושה-30043472",
    label: "עין השלושה / Ein Hashlosha",
    location: { lat: 31.351001, lng: 34.402791 },
  },
  {
    id: "עין-ורד-278477155",
    label: "עין ורד / Ein Vered",
    location: { lat: 32.265318, lng: 34.931760 },
  },
  {
    id: "עין-ורד-83037451",
    label: "עין ורד / Ein Vered",
    location: { lat: 32.263768, lng: 34.932167 },
  },
  {
    id: "עין-זיוון-728623422",
    label: "עין זיוון / Ein Zivan",
    location: { lat: 33.096282, lng: 35.796197 },
  },
  {
    id: "עין-זיוון-92005676",
    label: "עין זיוון / Ein Zivan",
    location: { lat: 33.096821, lng: 35.796078 },
  },
  {
    id: "עין-חוד-280680120",
    label: "עין חוד / Ein Hawd",
    location: { lat: 32.691535, lng: 34.999530 },
  },
  {
    id: "עין-חוד-91619918",
    label: "עין חוד / Ein Hawd",
    location: { lat: 32.691378, lng: 34.999792 },
  },
  {
    id: "עין-חצבה-278471690",
    label: "עין חצבה / Ein Hatseva",
    location: { lat: 30.798283, lng: 35.246398 },
  },
  {
    id: "עין-חצבה-92652408",
    label: "עין חצבה / Ein Hatseva",
    location: { lat: 30.798047, lng: 35.246010 },
  },
  {
    id: "עין-חרוד-278478791",
    label: "עין חרוד / Ein Harod",
    location: { lat: 32.559218, lng: 35.393578 },
  },
  {
    id: "עין-חרוד-641640393",
    label: "עין חרוד / Ein Harod",
    location: { lat: 32.558536, lng: 35.391593 },
  },
  {
    id: "עין-יהב-278478478",
    label: "עין יהב / Ein Yahav",
    location: { lat: 30.656902, lng: 35.238175 },
  },
  {
    id: "עין-יהב-60199776",
    label: "עין יהב / Ein Yahav",
    location: { lat: 30.658476, lng: 35.236795 },
  },
  {
    id: "עין-יעקב-278471508",
    label: "עין יעקב / Ein Yaaqov",
    location: { lat: 33.009548, lng: 35.229292 },
  },
  {
    id: "עין-יעקב-687010725",
    label: "עין יעקב / Ein Yaaqov",
    location: { lat: 33.009793, lng: 35.230562 },
  },
  {
    id: "עין-כרמל-278477559",
    label: "עין כרמל / Ein Carmel",
    location: { lat: 32.677009, lng: 34.953122 },
  },
  {
    id: "עין-כרמל-19873505",
    label: "עין כרמל / Ein Carmel",
    location: { lat: 32.677118, lng: 34.953247 },
  },
  {
    id: "עין-מאהל-278477205",
    label: "עין מאהל / Ein Mahel",
    location: { lat: 32.723323, lng: 35.352732 },
  },
  {
    id: "עין-מאהל-610614229",
    label: "עין מאהל / Ein Mahil",
    location: { lat: 32.721372, lng: 35.352711 },
  },
  {
    id: "עין-נקובא-597748353",
    label: "עין נקובא / Ein Nakuba",
    location: { lat: 31.793619, lng: 35.119127 },
  },
  {
    id: "עין-נקובא-627529272",
    label: "עין נקובא / Ein Nakuba",
    location: { lat: 31.793840, lng: 35.120731 },
  },
  {
    id: "עין-עירון-278478125",
    label: "עין עירון / Ein Iron",
    location: { lat: 32.483507, lng: 35.009892 },
  },
  {
    id: "עין-עירון-84676234",
    label: "עין עירון / Ein Iron",
    location: { lat: 32.483664, lng: 35.009519 },
  },
  {
    id: "עין-צורים-278473546",
    label: "עין צורים / Ein Zurim",
    location: { lat: 31.694054, lng: 34.720088 },
  },
  {
    id: "עין-צורים-616353075",
    label: "עין צורים / Ein Zurim",
    location: { lat: 31.695237, lng: 34.720222 },
  },
  {
    id: "עין-קנייא-2866107525",
    label: "עין קנייא / Ein Qiniyye",
    location: { lat: 33.236028, lng: 35.731055 },
  },
  {
    id: "עין-קנייא-602731111",
    label: "עין קנייא / Ein Qiniyye",
    location: { lat: 33.236392, lng: 35.731589 },
  },
  {
    id: "עין-ראפה-278474023",
    label: "עין ראפה / Ein Rafa",
    location: { lat: 31.790173, lng: 35.116274 },
  },
  {
    id: "עין-ראפה-627529274",
    label: "עין ראפה / Ein Rafa",
    location: { lat: 31.790613, lng: 35.113649 },
  },
  {
    id: "עין-שמר-278475149",
    label: "עין שמר / Ein Shemer",
    location: { lat: 32.462922, lng: 35.007371 },
  },
  {
    id: "עין-שמר-68706852",
    label: "עין שמר / Ein Shemer",
    location: { lat: 32.463882, lng: 35.008215 },
  },
  {
    id: "עין-שריד-3058016005",
    label: "עין שריד / Ein Sarid",
    location: { lat: 32.274121, lng: 34.935372 },
  },
  {
    id: "עין-שריד-31959057",
    label: "עין שריד / Ein Sarid",
    location: { lat: 32.273645, lng: 34.935924 },
  },
  {
    id: "עין-תמר-605993556",
    label: "עין תמר / Ein Tamar",
    location: { lat: 30.943309, lng: 35.374735 },
  },
  {
    id: "עין-תמר-92653504",
    label: "עין תמר / Ein Tamar",
    location: { lat: 30.943299, lng: 35.374590 },
  },
  {
    id: "עינת-278477062",
    label: "עינת / Einat",
    location: { lat: 32.082777, lng: 34.939431 },
  },
  {
    id: "עינת-616781613",
    label: "עינת / Einat",
    location: { lat: 32.082580, lng: 34.939360 },
  },
  {
    id: "עיר-אובות-4726035535",
    label: "עיר אובות / Ir Ovot",
    location: { lat: 30.811780, lng: 35.246985 },
  },
  {
    id: "עכברה-278477403",
    label: "עכברה / Akbara",
    location: { lat: 32.940811, lng: 35.495341 },
  },
  {
    id: "עכברה-616560049",
    label: "עכברה / Akbara",
    location: { lat: 32.939969, lng: 35.494878 },
  },
  {
    id: "עכו-278473852",
    label: "עכו / Acre",
    location: { lat: 32.928173, lng: 35.075638 },
  },
  {
    id: "עכו-816183676",
    label: "עכו / Acre",
    location: { lat: 32.915559, lng: 35.081540 },
  },
  {
    id: "עלוט-615247302",
    label: "עלוט / Aloot",
    location: { lat: 32.718278, lng: 35.262144 },
  },
  {
    id: "עלוט-278478575",
    label: "עלוט / Ilut",
    location: { lat: 32.716385, lng: 35.259434 },
  },
  {
    id: "עלומים-278476358",
    label: "עלומים / Alumim",
    location: { lat: 31.452130, lng: 34.513715 },
  },
  {
    id: "עלומים-55264850",
    label: "עלומים / Alumim",
    location: { lat: 31.453238, lng: 34.514419 },
  },
  {
    id: "עלמה-278475643",
    label: "עלמה / Alma",
    location: { lat: 33.052128, lng: 35.498807 },
  },
  {
    id: "עלמה-696237387",
    label: "עלמה / Alma",
    location: { lat: 33.051471, lng: 35.498991 },
  },
  {
    id: "עמוקה-951558658",
    label: "עמוקה / Amuka",
    location: { lat: 32.997967, lng: 35.524250 },
  },
  {
    id: "עמוקה-92005138",
    label: "עמוקה / Amuka",
    location: { lat: 32.998261, lng: 35.525006 },
  },
  {
    id: "עמינדב-278471399",
    label: "עמינדב / Aminadav",
    location: { lat: 31.751130, lng: 35.141994 },
  },
  {
    id: "עמינדב-94708944",
    label: "עמינדב / Aminadav",
    location: { lat: 31.752158, lng: 35.141597 },
  },
  {
    id: "עמיעד-278474193",
    label: "עמיעד / Amiad",
    location: { lat: 32.926299, lng: 35.541231 },
  },
  {
    id: "עמיעד-681628953",
    label: "עמיעד / Amiad",
    location: { lat: 32.927912, lng: 35.540705 },
  },
  {
    id: "עמיעוז-278469676",
    label: "עמיעוז / Amioz",
    location: { lat: 31.248310, lng: 34.413975 },
  },
  {
    id: "עמיעוז-82487628",
    label: "עמיעוז / Amioz",
    location: { lat: 31.247968, lng: 34.412808 },
  },
  {
    id: "עמיקם-332218653",
    label: "עמיקם / Amikam",
    location: { lat: 32.563865, lng: 35.020477 },
  },
  {
    id: "עמיקם-84677992",
    label: "עמיקם / Amikam",
    location: { lat: 32.564450, lng: 35.020508 },
  },
  {
    id: "עמיר-278473656",
    label: "עמיר / Amir",
    location: { lat: 33.178772, lng: 35.620776 },
  },
  {
    id: "עמיר-582897658",
    label: "עמיר / Amir",
    location: { lat: 33.177788, lng: 35.621143 },
  },
  {
    id: "עמקה-278477037",
    label: "עמקה / Amka",
    location: { lat: 32.979244, lng: 35.164267 },
  },
  {
    id: "עמקה-687047033",
    label: "עמקה / Amqa",
    location: { lat: 32.980061, lng: 35.163106 },
  },
  {
    id: "ענבר-5989167249",
    label: "ענבר / Inbar",
    location: { lat: 32.910140, lng: 35.422626 },
  },
  {
    id: "עספיא-94521958",
    label: "עספיא",
    location: { lat: 32.719190, lng: 35.064561 },
  },
  {
    id: "עספיא-278476926",
    label: "עספיא / Isfiya",
    location: { lat: 32.715204, lng: 35.067101 },
  },
  {
    id: "עפולה-278477139",
    label: "עפולה / Afula",
    location: { lat: 32.607559, lng: 35.289086 },
  },
  {
    id: "עפולה-25662403",
    label: "עפולה / Afula",
    location: { lat: 32.609912, lng: 35.288881 },
  },
  {
    id: "עצמון-שגב-278475007",
    label: "עצמון שגב / Atsmon",
    location: { lat: 32.865982, lng: 35.251205 },
  },
  {
    id: "עצמון-שגב-91245188",
    label: "עצמון שגב / Atsmon-Segev",
    location: { lat: 32.865614, lng: 35.252139 },
  },
  {
    id: "עקדה-278478360",
    label: "עקדה / Akkada",
    location: { lat: 32.541837, lng: 35.170135 },
  },
  {
    id: "עקדה-85788277",
    label: "עקדה / Akkada",
    location: { lat: 32.541603, lng: 35.170301 },
  },
  {
    id: "עראבה-278471532",
    label: "עראבה / Arraba",
    location: { lat: 32.848626, lng: 35.335827 },
  },
  {
    id: "עראבה-609972028",
    label: "עראבה / Arraba",
    location: { lat: 32.851170, lng: 35.336550 },
  },
  {
    id: "עראמשה-613779604",
    label: "עראמשה / Aramsha",
    location: { lat: 33.088609, lng: 35.225971 },
  },
  {
    id: "ערב-א-נעים-614206800",
    label: "ערב א-נעים / Arab Al Naim",
    location: { lat: 32.887541, lng: 35.290334 },
  },
  {
    id: "ערב-א-נעים-479349406",
    label: "ערב א-נעים / Arab al-Na'im",
    location: { lat: 32.887876, lng: 35.289556 },
  },
  {
    id: "ערב-אל-מוריסאת-1075734036",
    label: "ערב אל מוריסאת / Arab Al Mureisat",
    location: { lat: 32.890688, lng: 35.365675 },
  },
  {
    id: "ערב-אל-מוריסאת-667958663",
    label: "ערב אל מוריסאת / Arab Al Mureisat",
    location: { lat: 32.890436, lng: 35.365252 },
  },
  {
    id: "ערב-אל-עראמשה-1075746669",
    label: "ערב אל עראמשה / Arab al-Aramsha",
    location: { lat: 33.090825, lng: 35.213583 },
  },
  {
    id: "ערב-אל-עראמשה-429882201",
    label: "ערב אל עראמשה / Arab al-Aramshe",
    location: { lat: 33.088569, lng: 35.226504 },
  },
  {
    id: "ערד-275585094",
    label: "ערד / Arad",
    location: { lat: 31.261220, lng: 35.214581 },
  },
  {
    id: "ערד-578097471",
    label: "ערד / Arad",
    location: { lat: 31.258805, lng: 35.213332 },
  },
  {
    id: "ערוגות-278474309",
    label: "ערוגות / Arugot",
    location: { lat: 31.734687, lng: 34.770878 },
  },
  {
    id: "ערוגות-636670603",
    label: "ערוגות / Arugot",
    location: { lat: 31.736583, lng: 34.771859 },
  },
  {
    id: "ערערה-278476869",
    label: "ערערה / Ar'ara",
    location: { lat: 32.496551, lng: 35.095558 },
  },
  {
    id: "ערערה-84883082",
    label: "ערערה / Arrara",
    location: { lat: 32.498059, lng: 35.097205 },
  },
  {
    id: "ערערה-בנגב-599556378",
    label: "ערערה בנגב / Ar'arat an-Naqab",
    location: { lat: 31.159508, lng: 35.023046 },
  },
  {
    id: "ערערה-בנגב-58533822",
    label: "ערערה בנגב / Ar'arat an-Naqab",
    location: { lat: 31.154308, lng: 35.023165 },
  },
  {
    id: "עשרת-278477066",
    label: "עשרת / Aseret",
    location: { lat: 31.824795, lng: 34.745580 },
  },
  {
    id: "עשרת-84014597",
    label: "עשרת / Aseret",
    location: { lat: 31.824385, lng: 34.745889 },
  },
  {
    id: "עתיר-1077259656",
    label: "עתיר / Atir",
    location: { lat: 31.324457, lng: 35.027320 },
  },
  {
    id: "עתלית-246264514",
    label: "עתלית / Atlit",
    location: { lat: 32.690712, lng: 34.942274 },
  },
  {
    id: "עתלית-638012766",
    label: "עתלית / Atlit",
    location: { lat: 32.693412, lng: 34.942401 },
  },
  {
    id: "פארן-278476839",
    label: "פארן / Paran",
    location: { lat: 30.362613, lng: 35.153897 },
  },
  {
    id: "פארן-60130883",
    label: "פארן / Paran",
    location: { lat: 30.362566, lng: 35.155311 },
  },
  {
    id: "פדויים-707236045",
    label: "פדויים / Pduim",
    location: { lat: 31.327506, lng: 34.611550 },
  },
  {
    id: "פדויים-278470002",
    label: "פדויים / Pduyim",
    location: { lat: 31.327701, lng: 34.612047 },
  },
  {
    id: "פדיה-278472979",
    label: "פדיה / Pedaya",
    location: { lat: 31.858078, lng: 34.882110 },
  },
  {
    id: "פדיה-587307635",
    label: "פדיה / Pedaya",
    location: { lat: 31.857612, lng: 34.881892 },
  },
  {
    id: "פוריה-נווה-עובד-278476829",
    label: "פוריה - נווה עובד / Poria – Neve Oved",
    location: { lat: 32.743666, lng: 35.537617 },
  },
  {
    id: "פוריה-נווה-עובד-643357738",
    label: "פוריה - נווה עובד / Poriyya Neve Oved",
    location: { lat: 32.742923, lng: 35.537243 },
  },
  {
    id: "פוריה-כפר-עבודה-278477053",
    label: "פוריה כפר עבודה / Poria – Kfar Avoda",
    location: { lat: 32.718770, lng: 35.547407 },
  },
  {
    id: "פוריה-כפר-עבודה-643364396",
    label: "פוריה כפר עבודה / Poriyya Kefar Avoda",
    location: { lat: 32.719232, lng: 35.546908 },
  },
  {
    id: "פוריה-עילית-278477215",
    label: "פוריה עילית / Poria Illit",
    location: { lat: 32.732232, lng: 35.545722 },
  },
  {
    id: "פוריה-עילית-643364385",
    label: "פוריה עילית / Poriyya Ilit",
    location: { lat: 32.729259, lng: 35.545535 },
  },
  {
    id: "פוריידיס-278470479",
    label: "פוריידיס / Fureidis",
    location: { lat: 32.598824, lng: 34.954232 },
  },
  {
    id: "פוריידיס-195638505",
    label: "פוריידיס / Fureidis",
    location: { lat: 32.597251, lng: 34.953993 },
  },
  {
    id: "פורת-278474177",
    label: "פורת / Porat",
    location: { lat: 32.276274, lng: 34.949472 },
  },
  {
    id: "פורת-616757882",
    label: "פורת / Porat",
    location: { lat: 32.276496, lng: 34.950936 },
  },
  {
    id: "פטיש-278473882",
    label: "פטיש / Patish",
    location: { lat: 31.327385, lng: 34.560272 },
  },
  {
    id: "פטיש-687850602",
    label: "פטיש / Patish",
    location: { lat: 31.327600, lng: 34.559809 },
  },
  {
    id: "פלך-686808320",
    label: "פלך / Pelech",
    location: { lat: 32.933525, lng: 35.233553 },
  },
  {
    id: "פלך-476150365",
    label: "פלך / Pelekh",
    location: { lat: 32.933877, lng: 35.233568 },
  },
  {
    id: "פלמחים-94531841",
    label: "פלמחים / Palmachim",
    location: { lat: 31.933530, lng: 34.706159 },
  },
  {
    id: "פלמחים-278475630",
    label: "פלמחים / Palmahim",
    location: { lat: 31.933412, lng: 34.707259 },
  },
  {
    id: "פסוטה-278470236",
    label: "פסוטה / Fassuta",
    location: { lat: 33.048437, lng: 35.310025 },
  },
  {
    id: "פסוטה-612380769",
    label: "פסוטה / Fassuta",
    location: { lat: 33.047303, lng: 35.309759 },
  },
  {
    id: "פעמי-תש-ז-278477929",
    label: "פעמי תש\"ז / Pa'ame Tashaz",
    location: { lat: 31.438157, lng: 34.693007 },
  },
  {
    id: "פעמי-תש-ז-665704046",
    label: "פעמי תש\"ז / Pa'ame Tashaz",
    location: { lat: 31.439452, lng: 34.691825 },
  },
  {
    id: "פקיעין-612786637",
    label: "פקיעין / Al Buqei`a",
    location: { lat: 32.977586, lng: 35.334244 },
  },
  {
    id: "פקיעין-278477460",
    label: "פקיעין / Pekiin",
    location: { lat: 32.977238, lng: 35.333989 },
  },
  {
    id: "פקיעין-החדשה-612786635",
    label: "פקיעין החדשה / New Peqiin",
    location: { lat: 32.983953, lng: 35.323230 },
  },
  {
    id: "פקיעין-החדשה-278478588",
    label: "פקיעין החדשה / Peki'in HaHadasha",
    location: { lat: 32.983018, lng: 35.322760 },
  },
  {
    id: "פקיעין-מערבית-278477395",
    label: "פקיעין מערבית / Buqeia El Gharbiya",
    location: { lat: 32.991662, lng: 35.309728 },
  },
  {
    id: "פרדס-חנה-כרכור-267616938",
    label: "פרדס חנה-כרכור / Pardes Hana-Karkur",
    location: { lat: 32.474996, lng: 34.975139 },
  },
  {
    id: "פרדס-חנה-כרכור-680602164",
    label: "פרדס חנה-כרכור / Pardes Hana-Karkur",
    location: { lat: 32.475196, lng: 34.974889 },
  },
  {
    id: "פרדסיה-278476520",
    label: "פרדסיה / Pardesiya",
    location: { lat: 32.307035, lng: 34.909772 },
  },
  {
    id: "פרדסיה-769095005",
    label: "פרדסיה / Pardesiyya",
    location: { lat: 32.307801, lng: 34.909647 },
  },
  {
    id: "פרוד-278477816",
    label: "פרוד / Parod",
    location: { lat: 32.933333, lng: 35.433330 },
  },
  {
    id: "פרוד-616548426",
    label: "פרוד / Parod",
    location: { lat: 32.932303, lng: 35.433080 },
  },
  {
    id: "פרזון-278477481",
    label: "פרזון / Prazon",
    location: { lat: 32.545412, lng: 35.311162 },
  },
  {
    id: "פרזון-617497636",
    label: "פרזון / Prazon",
    location: { lat: 32.545356, lng: 35.310689 },
  },
  {
    id: "פרי-גן-340065176",
    label: "פרי גן / Pri Gan",
    location: { lat: 31.222855, lng: 34.352875 },
  },
  {
    id: "פרי-גן-711322985",
    label: "פרי גן / Pri Gan",
    location: { lat: 31.222658, lng: 34.355435 },
  },
  {
    id: "פתחיה-278473040",
    label: "פתחיה / Petahia",
    location: { lat: 31.867584, lng: 34.886288 },
  },
  {
    id: "פתחיה-587307637",
    label: "פתחיה / Petahya",
    location: { lat: 31.868397, lng: 34.885494 },
  },
  {
    id: "צאלים-278473555",
    label: "צאלים / Tseelim",
    location: { lat: 31.203663, lng: 34.533839 },
  },
  {
    id: "צאלים-82487485",
    label: "צאלים / Tseelim",
    location: { lat: 31.203333, lng: 34.534646 },
  },
  {
    id: "צבעון-3396751212",
    label: "צבעון / Tziv'on",
    location: { lat: 33.025941, lng: 35.416598 },
  },
  {
    id: "צבעון-689450593",
    label: "צבעון / Tziv'on",
    location: { lat: 33.025458, lng: 35.415950 },
  },
  {
    id: "צובה-278476497",
    label: "צובה / Tzuba",
    location: { lat: 31.782677, lng: 35.120700 },
  },
  {
    id: "צובה-50779828",
    label: "צובה / Zova",
    location: { lat: 31.782887, lng: 35.119466 },
  },
  {
    id: "צוחר-603909036",
    label: "צוחר / Tsohar",
    location: { lat: 31.236099, lng: 34.427073 },
  },
  {
    id: "צוחר-82487565",
    label: "צוחר / Tsohar",
    location: { lat: 31.235551, lng: 34.424773 },
  },
  {
    id: "צופית-278469801",
    label: "צופית / Tsofit",
    location: { lat: 32.191830, lng: 34.923101 },
  },
  {
    id: "צופית-84530820",
    label: "צופית / Tsofit",
    location: { lat: 32.192715, lng: 34.921221 },
  },
  {
    id: "צופר-278478491",
    label: "צופר / Zofar",
    location: { lat: 30.558623, lng: 35.180143 },
  },
  {
    id: "צופר-617418487",
    label: "צופר / Zofar",
    location: { lat: 30.560178, lng: 35.180353 },
  },
  {
    id: "צוקי-ים-278455792",
    label: "צוקי ים / Tzukei Yam",
    location: { lat: 32.361348, lng: 34.858683 },
  },
  {
    id: "צוקי-ים-80424097",
    label: "צוקי ים / Zukey Yam",
    location: { lat: 32.360734, lng: 34.858284 },
  },
  {
    id: "צוקים-93441852",
    label: "צוקים / Tzukim",
    location: { lat: 30.490746, lng: 35.166407 },
  },
  {
    id: "צוקים-4619022516",
    label: "צוקים / Zukim",
    location: { lat: 30.491024, lng: 35.165864 },
  },
  {
    id: "צור-הדסה-278473024",
    label: "צור הדסה / Tzur Hadassa",
    location: { lat: 31.715695, lng: 35.094831 },
  },
  {
    id: "צור-הדסה-696928569",
    label: "צור הדסה / Zur Hadassa",
    location: { lat: 31.715198, lng: 35.094758 },
  },
  {
    id: "צור-יצחק-882256994",
    label: "צור יצחק / Tsur Izhak",
    location: { lat: 32.241365, lng: 34.999176 },
  },
  {
    id: "צור-יצחק-387516699",
    label: "צור יצחק / Tzur Yitzhak",
    location: { lat: 32.241240, lng: 34.998382 },
  },
  {
    id: "צור-משה-278478669",
    label: "צור משה / Zur Moshe",
    location: { lat: 32.297807, lng: 34.913546 },
  },
  {
    id: "צור-משה-700118910",
    label: "צור משה / Zur Moshe",
    location: { lat: 32.296912, lng: 34.912844 },
  },
  {
    id: "צור-נתן-278478407",
    label: "צור נתן / Tsur Natan",
    location: { lat: 32.240709, lng: 35.013883 },
  },
  {
    id: "צור-נתן-882353960",
    label: "צור נתן / Tsur Natan",
    location: { lat: 32.240976, lng: 35.012569 },
  },
  {
    id: "צוריאל-278469875",
    label: "צוריאל / Tzuriel",
    location: { lat: 33.005995, lng: 35.314119 },
  },
  {
    id: "צוריאל-91939560",
    label: "צוריאל / Zuriel",
    location: { lat: 33.006189, lng: 35.313482 },
  },
  {
    id: "צורית-278477119",
    label: "צורית / Tzurit",
    location: { lat: 32.903068, lng: 35.252375 },
  },
  {
    id: "צורית-974612570",
    label: "צורית / Zurit",
    location: { lat: 32.902986, lng: 35.253139 },
  },
  {
    id: "צורן-278371315",
    label: "צורן / Zoran",
    location: { lat: 32.288103, lng: 34.945052 },
  },
  {
    id: "צורן-550321233",
    label: "צורן / Zoran",
    location: { lat: 32.290415, lng: 34.943925 },
  },
  {
    id: "ציפורי-278473735",
    label: "ציפורי / Zippori",
    location: { lat: 32.744308, lng: 35.278119 },
  },
  {
    id: "ציפורי-620398923",
    label: "ציפורי / Zippori",
    location: { lat: 32.746408, lng: 35.278500 },
  },
  {
    id: "צלפון-278470340",
    label: "צלפון / Tslafon",
    location: { lat: 31.804126, lng: 34.932746 },
  },
  {
    id: "צלפון-82629066",
    label: "צלפון / Tslafon",
    location: { lat: 31.804640, lng: 34.930452 },
  },
  {
    id: "צפריה-11583591885",
    label: "צפריה / Tzafria",
    location: { lat: 32.005256, lng: 34.855097 },
  },
  {
    id: "צפריה-406044843",
    label: "צפריה / Tzafria",
    location: { lat: 32.003191, lng: 34.855805 },
  },
  {
    id: "צפרירים-278476870",
    label: "צפרירים / Tzafririm",
    location: { lat: 31.660045, lng: 34.944377 },
  },
  {
    id: "צפרירים-119773190",
    label: "צפרירים / Zafririm",
    location: { lat: 31.660120, lng: 34.943123 },
  },
  {
    id: "צפת-278478605",
    label: "צפת / Safed",
    location: { lat: 32.964630, lng: 35.502451 },
  },
  {
    id: "צפת-11127243",
    label: "צפת / Safed",
    location: { lat: 32.966553, lng: 35.509196 },
  },
  {
    id: "צרופה-278470080",
    label: "צרופה / Tzrufa",
    location: { lat: 32.648237, lng: 34.948048 },
  },
  {
    id: "צרופה-637958968",
    label: "צרופה / Tzrufa",
    location: { lat: 32.648653, lng: 34.946083 },
  },
  {
    id: "צרעה-278473734",
    label: "צרעה / Tzora",
    location: { lat: 31.762739, lng: 34.968624 },
  },
  {
    id: "צרעה-82628775",
    label: "צרעה / Tzora",
    location: { lat: 31.762929, lng: 34.969760 },
  },
  {
    id: "קבועה-1077250123",
    label: "קבועה / Kabua",
    location: { lat: 31.225189, lng: 35.217123 },
  },
  {
    id: "קבועה-92914637",
    label: "קבועה / Kabua",
    location: { lat: 31.224983, lng: 35.216874 },
  },
  {
    id: "קבוצת-יבנה-275295946",
    label: "קבוצת יבנה / Qevuzat Yavne",
    location: { lat: 31.813822, lng: 34.719062 },
  },
  {
    id: "קבוצת-יבנה-92015913",
    label: "קבוצת יבנה / Qevuzat Yavne",
    location: { lat: 31.815436, lng: 34.721463 },
  },
  {
    id: "קבוצת-כנרת-278478114",
    label: "קבוצת כנרת / Kinneret Kvutsa",
    location: { lat: 32.713873, lng: 35.562525 },
  },
  {
    id: "קבוצת-כנרת-91665057",
    label: "קבוצת כנרת / Kinneret Kvutza",
    location: { lat: 32.713537, lng: 35.562233 },
  },
  {
    id: "קדימה-268703644",
    label: "קדימה / Kadima",
    location: { lat: 32.276446, lng: 34.912544 },
  },
  {
    id: "קדימה-920686206",
    label: "קדימה / Kadima",
    location: { lat: 32.277035, lng: 34.912688 },
  },
  {
    id: "קדמה-278475612",
    label: "קדמה / Kedma",
    location: { lat: 31.700744, lng: 34.775135 },
  },
  {
    id: "קדמה-92390974",
    label: "קדמה / Kedma",
    location: { lat: 31.701349, lng: 34.775537 },
  },
  {
    id: "קדמת-צבי-1654111436",
    label: "קדמת צבי / Kidmat Tzvi",
    location: { lat: 33.029737, lng: 35.697029 },
  },
  {
    id: "קדמת-צבי-92005681",
    label: "קדמת צבי / Kidmat Tzvi",
    location: { lat: 33.030582, lng: 35.697307 },
  },
  {
    id: "קדרון-278473386",
    label: "קדרון / Kidron",
    location: { lat: 31.815099, lng: 34.797659 },
  },
  {
    id: "קדרון-385734090",
    label: "קדרון / Kidron",
    location: { lat: 31.815397, lng: 34.793567 },
  },
  {
    id: "קדרים-278470164",
    label: "קדרים / Kadarim",
    location: { lat: 32.898422, lng: 35.473746 },
  },
  {
    id: "קדרים-91562334",
    label: "קדרים / Kaddarim",
    location: { lat: 32.899723, lng: 35.472571 },
  },
  {
    id: "קודייראת-א-צאנע-92915202",
    label: "קודייראת א צאנע / Kudayrat Al Sana",
    location: { lat: 31.294451, lng: 35.107562 },
  },
  {
    id: "קוואעין-92915473",
    label: "קוואעין / Kawain",
    location: { lat: 31.323870, lng: 35.027140 },
  },
  {
    id: "קוממיות-278473758",
    label: "קוממיות / Komemiyut",
    location: { lat: 31.661965, lng: 34.729770 },
  },
  {
    id: "קוממיות-705393675",
    label: "קוממיות / Komemiyut",
    location: { lat: 31.662128, lng: 34.730426 },
  },
  {
    id: "קורנית-278477451",
    label: "קורנית / Koranit",
    location: { lat: 32.843628, lng: 35.251320 },
  },
  {
    id: "קורנית-82662678",
    label: "קורנית / Koranit",
    location: { lat: 32.843232, lng: 35.253263 },
  },
  {
    id: "קטורה-428001914",
    label: "קטורה / Ketura",
    location: { lat: 29.969639, lng: 35.061049 },
  },
  {
    id: "קטורה-617415871",
    label: "קטורה / Ketura",
    location: { lat: 29.969709, lng: 35.061496 },
  },
  {
    id: "קיבוץ-מרחביה-278475615",
    label: "קיבוץ מרחביה / Kibbuts Merhavya",
    location: { lat: 32.605147, lng: 35.307671 },
  },
  {
    id: "קיבוץ-מרחביה-770589968",
    label: "קיבוץ מרחביה / Kibbutz Merhavya",
    location: { lat: 32.604971, lng: 35.308286 },
  },
  {
    id: "קיסריה-60512868",
    label: "קיסריה / Caesarea",
    location: { lat: 32.511497, lng: 34.905786 },
  },
  {
    id: "קיסריה-741875442",
    label: "קיסריה / Caesarea",
    location: { lat: 32.505888, lng: 34.907823 },
  },
  {
    id: "קלחים-278475578",
    label: "קלחים / Klachim",
    location: { lat: 31.450591, lng: 34.678096 },
  },
  {
    id: "קלחים-665836985",
    label: "קלחים / Klachim",
    location: { lat: 31.449262, lng: 34.676796 },
  },
  {
    id: "קלנסווה-278371482",
    label: "קלנסווה / Kalanswa",
    location: { lat: 32.284860, lng: 34.980170 },
  },
  {
    id: "קלנסווה-603129130",
    label: "קלנסווה / Kalanswa",
    location: { lat: 32.286218, lng: 34.974251 },
  },
  {
    id: "קלע-אלון-502853465",
    label: "קלע אלון / Kella Alon",
    location: { lat: 33.130770, lng: 35.682533 },
  },
  {
    id: "קלע-אלון-963896430",
    label: "קלע אלון / Kella Alon",
    location: { lat: 33.131614, lng: 35.683668 },
  },
  {
    id: "קציר-661441525",
    label: "קציר / Katzir",
    location: { lat: 32.488630, lng: 35.101689 },
  },
  {
    id: "קציר-742214502",
    label: "קציר / Katzir",
    location: { lat: 32.484374, lng: 35.103054 },
  },
  {
    id: "קצר-א-סיר-92894559",
    label: "קצר א סיר / Kasr a Sir",
    location: { lat: 31.078383, lng: 34.983821 },
  },
  {
    id: "קצר-א-סיר-599556533",
    label: "קצר א סיר / Qasr al-Sir",
    location: { lat: 31.079374, lng: 34.984880 },
  },
  {
    id: "קצרין-1654111437",
    label: "קצרין / Katzrin",
    location: { lat: 32.992026, lng: 35.687700 },
  },
  {
    id: "קצרין-3014958",
    label: "קצרין / Katzrin",
    location: { lat: 32.991162, lng: 35.687364 },
  },
  {
    id: "קריית-אונו-278432314",
    label: "קריית אונו / Kiryat Ono",
    location: { lat: 32.059169, lng: 34.859430 },
  },
  {
    id: "קריית-ביאליק-314588232",
    label: "קריית ביאליק / Kiryat Bialik",
    location: { lat: 32.829478, lng: 35.085701 },
  },
  {
    id: "קריית-ביאליק-1133936650",
    label: "קריית ביאליק / Qiryat Bialik",
    location: { lat: 32.828581, lng: 35.084491 },
  },
  {
    id: "קריית-גת-275547482",
    label: "קריית גת / Kiryat Gat",
    location: { lat: 31.609400, lng: 34.771198 },
  },
  {
    id: "קריית-טבעון-278476455",
    label: "קריית טבעון / Kiryat Tivon",
    location: { lat: 32.716154, lng: 35.126841 },
  },
  {
    id: "קריית-טבעון-7690719998",
    label: "קריית טבעון / Kiryat Tivon",
    location: { lat: 32.733204, lng: 35.145339 },
  },
  {
    id: "קריית-טבעון-784238369",
    label: "קריית טבעון / Kiryat Tivon",
    location: { lat: 32.727974, lng: 35.135328 },
  },
  {
    id: "קריית-טבעון-18333529",
    label: "קריית טבעון / Qiryat Tivon",
    location: { lat: 32.710888, lng: 35.122860 },
  },
  {
    id: "קריית-ים-278477129",
    label: "קריית ים / Kiryat Yam",
    location: { lat: 32.850223, lng: 35.070324 },
  },
  {
    id: "קריית-ים-94528943",
    label: "קריית ים / Kiryat Yam",
    location: { lat: 32.847739, lng: 35.072444 },
  },
  {
    id: "קריית-מאיר-5886923924",
    label: "קריית מאיר / Kiryat Meir",
    location: { lat: 32.078974, lng: 34.782312 },
  },
  {
    id: "קריית-מוצקין-278474647",
    label: "קריית מוצקין / Kiryat Motzkin",
    location: { lat: 32.836375, lng: 35.075211 },
  },
  {
    id: "קריית-מוצקין-94527877",
    label: "קריית מוצקין / Kiryat Motzkin",
    location: { lat: 32.841717, lng: 35.081877 },
  },
  {
    id: "קריית-ענבים-897996165",
    label: "קריית ענבים / Kiryat Anavim",
    location: { lat: 31.810822, lng: 35.117576 },
  },
  {
    id: "קריית-ענבים-278476851",
    label: "קריית ענבים / Qiryat Anavim",
    location: { lat: 31.810017, lng: 35.120339 },
  },
  {
    id: "קרית-אונו-84620736",
    label: "קרית אונו / Kiryat Ono",
    location: { lat: 32.058153, lng: 34.852579 },
  },
  {
    id: "קרית-אתא-94525727",
    label: "קרית אתא / Kiryat Ata",
    location: { lat: 32.804278, lng: 35.113157 },
  },
  {
    id: "קרית-אתא-246849113",
    label: "קרית אתא / Qiryat Ata",
    location: { lat: 32.811585, lng: 35.116375 },
  },
  {
    id: "קרית-גת-25650651",
    label: "קרית גת / Kiryat Gat",
    location: { lat: 31.607216, lng: 34.772687 },
  },
  {
    id: "קרית-ההגנה-563962115",
    label: "קרית ההגנה / Kiriyat HaHagana",
    location: { lat: 31.886241, lng: 34.830162 },
  },
  {
    id: "קרית-יערים-222030051",
    label: "קרית יערים / Kiryat Yearim",
    location: { lat: 31.803513, lng: 35.101255 },
  },
  {
    id: "קרית-יערים-620895229",
    label: "קרית יערים / Kiryat Yearim",
    location: { lat: 31.803813, lng: 35.099295 },
  },
  {
    id: "קרית-מלאכי-275547478",
    label: "קרית מלאכי / Kiryat Malachi",
    location: { lat: 31.731602, lng: 34.744614 },
  },
  {
    id: "קרית-מלאכי-13427903",
    label: "קרית מלאכי / Kiryat Malachi",
    location: { lat: 31.731076, lng: 34.745689 },
  },
  {
    id: "קרית-עקרון-275283315",
    label: "קרית עקרון / Kiryat Ekron",
    location: { lat: 31.860786, lng: 34.823337 },
  },
  {
    id: "קרית-עקרון-61899868",
    label: "קרית עקרון / Kiryat Ekron",
    location: { lat: 31.861310, lng: 34.823240 },
  },
  {
    id: "קרית-שמונה-278475691",
    label: "קרית שמונה / Kiryat Shmona",
    location: { lat: 33.207473, lng: 35.570783 },
  },
  {
    id: "קרית-שמונה-578640475",
    label: "קרית שמונה / Kiryat Shmona",
    location: { lat: 33.212135, lng: 35.572814 },
  },
  {
    id: "קשכר-נבארי-1077256690",
    label: "קשכר נבארי / Kishkar Nabari",
    location: { lat: 31.298622, lng: 35.120706 },
  },
  {
    id: "קשכר-נבארי-92915203",
    label: "קשכר נבארי / Kishkar Nabari",
    location: { lat: 31.296640, lng: 35.117562 },
  },
  {
    id: "קשת-495939594",
    label: "קשת / Keshet",
    location: { lat: 32.980733, lng: 35.808586 },
  },
  {
    id: "קשת-835482970",
    label: "קשת / Keshet",
    location: { lat: 32.981348, lng: 35.807938 },
  },
  {
    id: "ראמה-278475159",
    label: "ראמה / Rama",
    location: { lat: 32.937972, lng: 35.367566 },
  },
  {
    id: "ראמה-614203627",
    label: "ראמה / ar-Rama",
    location: { lat: 32.938048, lng: 35.367316 },
  },
  {
    id: "ראס-אל-עין-648730319",
    label: "ראס אל-עין / Ras Al Ein",
    location: { lat: 32.915720, lng: 35.372944 },
  },
  {
    id: "ראס-אל-עין-1075774341",
    label: "ראס אל-עין / Ras al-Ein",
    location: { lat: 32.915804, lng: 35.372665 },
  },
  {
    id: "ראס-עלי-1100530828",
    label: "ראס עלי / Ras Ali",
    location: { lat: 32.772120, lng: 35.154229 },
  },
  {
    id: "ראס-עלי-615241514",
    label: "ראס עלי / Ras Ali",
    location: { lat: 32.771242, lng: 35.154830 },
  },
  {
    id: "ראש-הנקרה-383405266",
    label: "ראש הנקרה / Rosh HaNikra",
    location: { lat: 33.085748, lng: 35.115082 },
  },
  {
    id: "ראש-הנקרה-650788981",
    label: "ראש הנקרה / Rosh Hanikra",
    location: { lat: 33.086479, lng: 35.115766 },
  },
  {
    id: "ראש-העין-246255482",
    label: "ראש העין / Rosh HaAyin",
    location: { lat: 32.095293, lng: 34.953322 },
  },
  {
    id: "ראש-העין-62081132",
    label: "ראש העין / Rosh HaAyin",
    location: { lat: 32.094516, lng: 34.963443 },
  },
  {
    id: "ראש-פינה-275957491",
    label: "ראש פינה / Rosh Pina",
    location: { lat: 32.968215, lng: 35.543824 },
  },
  {
    id: "ראש-פינה-696713262",
    label: "ראש פינה / Rosh Pina",
    location: { lat: 32.965448, lng: 35.542835 },
  },
  {
    id: "ראשון-לציון-196353200",
    label: "ראשון לציון / Rishon LeZion",
    location: { lat: 31.963571, lng: 34.810115 },
  },
  {
    id: "ראשון-לציון-385023487",
    label: "ראשון לציון / Rishon LeZion",
    location: { lat: 31.971251, lng: 34.788998 },
  },
  {
    id: "רבדים-278473536",
    label: "רבדים / Revadim",
    location: { lat: 31.773047, lng: 34.815308 },
  },
  {
    id: "רבדים-82284957",
    label: "רבדים / Revadim",
    location: { lat: 31.772854, lng: 34.815818 },
  },
  {
    id: "רביבים-4767689650",
    label: "רביבים / Revivim",
    location: { lat: 31.043163, lng: 34.720702 },
  },
  {
    id: "רביבים-82487469",
    label: "רביבים / Revivim",
    location: { lat: 31.042741, lng: 34.722421 },
  },
  {
    id: "רביד-496127466",
    label: "רביד / Ravid",
    location: { lat: 32.851585, lng: 35.463426 },
  },
  {
    id: "רביד-618063142",
    label: "רביד / Ravid",
    location: { lat: 32.851612, lng: 35.463245 },
  },
  {
    id: "רגבה-278472738",
    label: "רגבה / Regba",
    location: { lat: 32.977964, lng: 35.099671 },
  },
  {
    id: "רגבה-91929064",
    label: "רגבה / Regba",
    location: { lat: 32.976974, lng: 35.099416 },
  },
  {
    id: "רגבים-278476353",
    label: "רגבים / Regavim",
    location: { lat: 32.524095, lng: 35.034543 },
  },
  {
    id: "רגבים-84677292",
    label: "רגבים / Regavim",
    location: { lat: 32.524453, lng: 35.034646 },
  },
  {
    id: "רהט-280115936",
    label: "רהט / Rahat",
    location: { lat: 31.393364, lng: 34.754678 },
  },
  {
    id: "רווחה-278475571",
    label: "רווחה / Revaha",
    location: { lat: 31.649513, lng: 34.731709 },
  },
  {
    id: "רווחה-705413775",
    label: "רווחה / Revaha",
    location: { lat: 31.649371, lng: 34.734611 },
  },
  {
    id: "רוויה-278473918",
    label: "רוויה / Revaya",
    location: { lat: 32.449246, lng: 35.472721 },
  },
  {
    id: "רוויה-704963470",
    label: "רוויה / Revaya",
    location: { lat: 32.448681, lng: 35.473100 },
  },
  {
    id: "רוחמה-278470613",
    label: "רוחמה / Ruhama",
    location: { lat: 31.497111, lng: 34.706697 },
  },
  {
    id: "רוחמה-92391904",
    label: "רוחמה / Ruhama",
    location: { lat: 31.497389, lng: 34.706887 },
  },
  {
    id: "רומאנה-1027298330",
    label: "רומאנה / Rumana",
    location: { lat: 32.788197, lng: 35.311164 },
  },
  {
    id: "רומאנה-91560514",
    label: "רומאנה / Rummana",
    location: { lat: 32.787910, lng: 35.310885 },
  },
  {
    id: "רומת-היב-278476027",
    label: "רומת היב / Rumat al-Heib",
    location: { lat: 32.778483, lng: 35.305222 },
  },
  {
    id: "רומת-היב-91560512",
    label: "רומת היב / Rumat al-Heib",
    location: { lat: 32.778663, lng: 35.302398 },
  },
  {
    id: "רוסתום-1299696831",
    label: "רוסתום",
    location: { lat: 32.344936, lng: 35.025594 },
  },
  {
    id: "רח-מה-4943887319",
    label: "רח'מה / Al-Rahma",
    location: { lat: 31.008649, lng: 34.955717 },
  },
  {
    id: "רח-מה-358902754",
    label: "רח'מה / Al-Rahma",
    location: { lat: 31.009012, lng: 34.956829 },
  },
  {
    id: "רחוב-655262589",
    label: "רחוב / Rechov",
    location: { lat: 32.450634, lng: 35.489028 },
  },
  {
    id: "רחוב-278478175",
    label: "רחוב / Rehov",
    location: { lat: 32.449711, lng: 35.490025 },
  },
  {
    id: "רחובות-278477509",
    label: "רחובות / Rehovot",
    location: { lat: 31.895253, lng: 34.810562 },
  },
  {
    id: "רחובות-971975185",
    label: "רחובות / Rehovot",
    location: { lat: 31.892084, lng: 34.801965 },
  },
  {
    id: "ריחאנייה-278477495",
    label: "ריחאנייה / Reihania",
    location: { lat: 33.048203, lng: 35.487285 },
  },
  {
    id: "ריחאנייה-614207214",
    label: "ריחאנייה / Reihania",
    location: { lat: 33.049415, lng: 35.486979 },
  },
  {
    id: "ריינה-278473054",
    label: "ריינה / Reineh",
    location: { lat: 32.723612, lng: 35.312492 },
  },
  {
    id: "ריינה-610619805",
    label: "ריינה / Reineh",
    location: { lat: 32.721293, lng: 35.310667 },
  },
  {
    id: "רינתיה-278473913",
    label: "רינתיה / Rinatya",
    location: { lat: 32.043333, lng: 34.931667 },
  },
  {
    id: "רינתיה-616290941",
    label: "רינתיה / Rinnatya",
    location: { lat: 32.044850, lng: 34.928674 },
  },
  {
    id: "רכסים-278469703",
    label: "רכסים / Rekhasim",
    location: { lat: 32.750956, lng: 35.101359 },
  },
  {
    id: "רכסים-617465681",
    label: "רכסים / Rekhasim",
    location: { lat: 32.751019, lng: 35.102000 },
  },
  {
    id: "רם-און-278472436",
    label: "רם און / Ram On",
    location: { lat: 32.527238, lng: 35.259032 },
  },
  {
    id: "רם-און-617082292",
    label: "רם און / Ram On",
    location: { lat: 32.527873, lng: 35.259858 },
  },
  {
    id: "רמאללה-316511713",
    label: "רמאללה / Ramallah",
    location: { lat: 31.897858, lng: 35.197166 },
  },
  {
    id: "רמות-1652312953",
    label: "רמות / Ramot",
    location: { lat: 32.849801, lng: 35.666747 },
  },
  {
    id: "רמות-90576911",
    label: "רמות / Ramot",
    location: { lat: 32.848695, lng: 35.666744 },
  },
  {
    id: "רמות-השבים-274596904",
    label: "רמות השבים / Ramot HaShavim",
    location: { lat: 32.166174, lng: 34.886043 },
  },
  {
    id: "רמות-השבים-13011512",
    label: "רמות השבים / Ramot HaShavim",
    location: { lat: 32.167565, lng: 34.885976 },
  },
  {
    id: "רמות-מאיר-274596931",
    label: "רמות מאיר / Ramot Meir",
    location: { lat: 31.874564, lng: 34.855815 },
  },
  {
    id: "רמות-מאיר-589206813",
    label: "רמות מאיר / Ramot Meir",
    location: { lat: 31.873985, lng: 34.856130 },
  },
  {
    id: "רמות-מנשה-278474873",
    label: "רמות מנשה / Ramot Menashe",
    location: { lat: 32.597884, lng: 35.057645 },
  },
  {
    id: "רמות-מנשה-82234044",
    label: "רמות מנשה / Ramot Menashe",
    location: { lat: 32.596838, lng: 35.057460 },
  },
  {
    id: "רמות-נפתלי-278469898",
    label: "רמות נפתלי / Ramot Naftali",
    location: { lat: 33.102297, lng: 35.553117 },
  },
  {
    id: "רמות-נפתלי-696235053",
    label: "רמות נפתלי / Ramot Naftali",
    location: { lat: 33.101740, lng: 35.552903 },
  },
  {
    id: "רמלה-278476781",
    label: "רמלה / Ramla",
    location: { lat: 31.927999, lng: 34.862347 },
  },
  {
    id: "רמלה-9691188",
    label: "רמלה / Ramla",
    location: { lat: 31.926181, lng: 34.860183 },
  },
  {
    id: "רמת-ארבל-13340183041",
    label: "רמת ארבל / Ramat Arbel",
    location: { lat: 32.839646, lng: 35.433929 },
  },
  {
    id: "רמת-גן-1697981331",
    label: "רמת גן / Ramat Gan",
    location: { lat: 32.068687, lng: 34.824681 },
  },
  {
    id: "רמת-גן-1382493",
    label: "רמת גן / Ramat Gan",
    location: { lat: 32.070834, lng: 34.826859 },
  },
  {
    id: "רמת-דוד-278478658",
    label: "רמת דוד / Ramat David",
    location: { lat: 32.677570, lng: 35.203903 },
  },
  {
    id: "רמת-דוד-91376417",
    label: "רמת דוד / Ramat David",
    location: { lat: 32.678370, lng: 35.203655 },
  },
  {
    id: "רמת-הדסה-278477141",
    label: "רמת הדסה / Ramat Hadassa",
    location: { lat: 32.729218, lng: 35.146103 },
  },
  {
    id: "רמת-הכובש-278477244",
    label: "רמת הכובש / Ramat HaKovesh",
    location: { lat: 32.215264, lng: 34.939331 },
  },
  {
    id: "רמת-הכובש-84530833",
    label: "רמת הכובש / Ramat HaKovesh",
    location: { lat: 32.218244, lng: 34.937362 },
  },
  {
    id: "רמת-השופט-278473007",
    label: "רמת השופט / Ramat HaShofet",
    location: { lat: 32.611976, lng: 35.094939 },
  },
  {
    id: "רמת-השופט-82225730",
    label: "רמת השופט / Ramat HaShofet",
    location: { lat: 32.610839, lng: 35.096542 },
  },
  {
    id: "רמת-השרון-278478765",
    label: "רמת השרון / Ramat HaSharon",
    location: { lat: 32.143128, lng: 34.838085 },
  },
  {
    id: "רמת-השרון-7109927",
    label: "רמת השרון / Ramat HaSharon",
    location: { lat: 32.138687, lng: 34.838213 },
  },
  {
    id: "רמת-טראמפ-6553028871",
    label: "רמת טראמפ / Ramat Trump",
    location: { lat: 33.132610, lng: 35.690627 },
  },
  {
    id: "רמת-טראמפ-963930952",
    label: "רמת טראמפ / Trump Heights",
    location: { lat: 33.132667, lng: 35.691093 },
  },
  {
    id: "רמת-יוחנן-278473310",
    label: "רמת יוחנן / Ramat Yahanan",
    location: { lat: 32.792504, lng: 35.121385 },
  },
  {
    id: "רמת-יוחנן-94525299",
    label: "רמת יוחנן / Ramat Yohanan",
    location: { lat: 32.792117, lng: 35.122489 },
  },
  {
    id: "רמת-ישי-278470497",
    label: "רמת ישי / Ramat Yishai",
    location: { lat: 32.702492, lng: 35.165243 },
  },
  {
    id: "רמת-ישי-617004754",
    label: "רמת ישי / Ramat Yishai",
    location: { lat: 32.701424, lng: 35.165075 },
  },
  {
    id: "רמת-מגשימים-1652312954",
    label: "רמת מגשימים / Ramat Magshimim",
    location: { lat: 32.844029, lng: 35.807384 },
  },
  {
    id: "רמת-מגשימים-91449686",
    label: "רמת מגשימים / Ramat Magshimim",
    location: { lat: 32.845401, lng: 35.808042 },
  },
  {
    id: "רמת-צבי-278475709",
    label: "רמת צבי / Ramat Zevi",
    location: { lat: 32.591506, lng: 35.414525 },
  },
  {
    id: "רמת-צבי-617166749",
    label: "רמת צבי / Ramat Zvi",
    location: { lat: 32.590193, lng: 35.413799 },
  },
  {
    id: "רמת-רזיאל-1643320145",
    label: "רמת רזיאל / Ramat Razi'el",
    location: { lat: 31.773659, lng: 35.073760 },
  },
  {
    id: "רמת-רזיאל-92342914",
    label: "רמת רזיאל / Ramat Raziel",
    location: { lat: 31.774282, lng: 35.073592 },
  },
  {
    id: "רמת-רחל-278472877",
    label: "רמת רחל / Ramat Rahel",
    location: { lat: 31.738710, lng: 35.218345 },
  },
  {
    id: "רמת-רחל-94172207",
    label: "רמת רחל / Ramat Rahel",
    location: { lat: 31.739293, lng: 35.218354 },
  },
  {
    id: "רנן-278478214",
    label: "רנן / Ranen",
    location: { lat: 31.337792, lng: 34.600463 },
  },
  {
    id: "רנן-707428926",
    label: "רנן / Ranen",
    location: { lat: 31.337228, lng: 34.601793 },
  },
  {
    id: "רעים-278477512",
    label: "רעים / Reim",
    location: { lat: 31.384804, lng: 34.458590 },
  },
  {
    id: "רעים-82487918",
    label: "רעים / Reim",
    location: { lat: 31.385336, lng: 34.460026 },
  },
  {
    id: "רעננה-348385591",
    label: "רעננה / Raanana",
    location: { lat: 32.186024, lng: 34.867836 },
  },
  {
    id: "רעננה-10550854",
    label: "רעננה / Raanana",
    location: { lat: 32.187339, lng: 34.866843 },
  },
  {
    id: "רקפת-278477001",
    label: "רקפת / Rakefet",
    location: { lat: 32.854722, lng: 35.264292 },
  },
  {
    id: "רקפת-90644778",
    label: "רקפת / Rakefet",
    location: { lat: 32.855143, lng: 35.264253 },
  },
  {
    id: "רשפון-5645750066",
    label: "רשפון / Rishpon",
    location: { lat: 32.199555, lng: 34.824437 },
  },
  {
    id: "רשפון-13881610",
    label: "רשפון / Rishpon",
    location: { lat: 32.200994, lng: 34.824665 },
  },
  {
    id: "רשפים-278476962",
    label: "רשפים / Reshafim",
    location: { lat: 32.481853, lng: 35.477544 },
  },
  {
    id: "רשפים-81373818",
    label: "רשפים / Reshafim",
    location: { lat: 32.481285, lng: 35.477307 },
  },
  {
    id: "רתמים-1075631885",
    label: "רתמים / Rettamim",
    location: { lat: 31.053926, lng: 34.690428 },
  },
  {
    id: "רתמים-136899221",
    label: "רתמים / Rettamim",
    location: { lat: 31.054530, lng: 34.689458 },
  },
  {
    id: "שאר-ישוב-278476381",
    label: "שאר ישוב / Shaar Yashuv",
    location: { lat: 33.227209, lng: 35.646336 },
  },
  {
    id: "שאר-ישוב-721156389",
    label: "שאר ישוב / Shaar Yashuv",
    location: { lat: 33.226122, lng: 35.647085 },
  },
  {
    id: "שבי-דרום-4996911641",
    label: "שבי דרום / Shavey Darom",
    location: { lat: 31.465595, lng: 34.635826 },
  },
  {
    id: "שבי-דרום-753302132",
    label: "שבי דרום / Shavey Darom",
    location: { lat: 31.465706, lng: 34.634821 },
  },
  {
    id: "שבי-ציון-278478246",
    label: "שבי ציון / Shave Ziyyon",
    location: { lat: 32.980597, lng: 35.083294 },
  },
  {
    id: "שבי-ציון-612078695",
    label: "שבי ציון / Shavei Zion",
    location: { lat: 32.979955, lng: 35.084020 },
  },
  {
    id: "שבלי-אום-אל-גנם-278477287",
    label: "שבלי - אום אל-גנם / Umm al-Ghanam",
    location: { lat: 32.675849, lng: 35.391868 },
  },
  {
    id: "שגב-שלום-599577806",
    label: "שגב שלום / Shaqib al-Salam",
    location: { lat: 31.200876, lng: 34.840087 },
  },
  {
    id: "שגב-שלום-14358679",
    label: "שגב שלום / Shaqib al-Salam",
    location: { lat: 31.194348, lng: 34.838760 },
  },
  {
    id: "שדה-אילן-4035316294",
    label: "שדה אילן / Sde Ilan",
    location: { lat: 32.749332, lng: 35.422610 },
  },
  {
    id: "שדה-אילן-617977369",
    label: "שדה אילן / Sde Ilan",
    location: { lat: 32.749259, lng: 35.424790 },
  },
  {
    id: "שדה-אליהו-81373644",
    label: "שדה אליהו / Sde Eliyahoo",
    location: { lat: 32.440811, lng: 35.514079 },
  },
  {
    id: "שדה-אליהו-278472891",
    label: "שדה אליהו / Sde Eliyahu",
    location: { lat: 32.440533, lng: 35.514992 },
  },
  {
    id: "שדה-אליעזר-278469683",
    label: "שדה אליעזר / Sde Eliezer",
    location: { lat: 33.045887, lng: 35.564125 },
  },
  {
    id: "שדה-אליעזר-696625484",
    label: "שדה אליעזר / Sde Eliezer",
    location: { lat: 33.045026, lng: 35.564361 },
  },
  {
    id: "שדה-בוקר-278469889",
    label: "שדה בוקר / Sde Boker",
    location: { lat: 30.873739, lng: 34.792595 },
  },
  {
    id: "שדה-בוקר-91941218",
    label: "שדה בוקר / Sde Boker",
    location: { lat: 30.873567, lng: 34.793768 },
  },
  {
    id: "שדה-דוד-278472608",
    label: "שדה דוד / Sde David",
    location: { lat: 31.576626, lng: 34.684642 },
  },
  {
    id: "שדה-דוד-705440247",
    label: "שדה דוד / Sde David",
    location: { lat: 31.576333, lng: 34.683810 },
  },
  {
    id: "שדה-ורבורג-278478053",
    label: "שדה ורבורג / Sde Warburg",
    location: { lat: 32.209387, lng: 34.904808 },
  },
  {
    id: "שדה-ורבורג-93476442",
    label: "שדה ורבורג / Sde Warburg",
    location: { lat: 32.206613, lng: 34.903920 },
  },
  {
    id: "שדה-יואב-278477323",
    label: "שדה יואב / Sde Yoav",
    location: { lat: 31.645731, lng: 34.676957 },
  },
  {
    id: "שדה-יואב-92088585",
    label: "שדה יואב / Sde Yoav",
    location: { lat: 31.644572, lng: 34.677055 },
  },
  {
    id: "שדה-יעקב-278478667",
    label: "שדה יעקב / Sde Yaakov",
    location: { lat: 32.697424, lng: 35.141750 },
  },
  {
    id: "שדה-יעקב-617460618",
    label: "שדה יעקב / Sde Yaakov",
    location: { lat: 32.695823, lng: 35.143080 },
  },
  {
    id: "שדה-יצחק-278372134",
    label: "שדה יצחק / Sde Itzchak",
    location: { lat: 32.405119, lng: 34.993816 },
  },
  {
    id: "שדה-יצחק-700674004",
    label: "שדה יצחק / Sde Yitzchak",
    location: { lat: 32.405195, lng: 34.992982 },
  },
  {
    id: "שדה-משה-278470495",
    label: "שדה משה / Sde Moshe",
    location: { lat: 31.610198, lng: 34.802663 },
  },
  {
    id: "שדה-משה-587766510",
    label: "שדה משה / Sde Moshe",
    location: { lat: 31.611030, lng: 34.801448 },
  },
  {
    id: "שדה-נחום-9764603751",
    label: "שדה נחום / Sde Nahum",
    location: { lat: 32.527130, lng: 35.481641 },
  },
  {
    id: "שדה-נחום-641623510",
    label: "שדה נחום / Sde Nahum",
    location: { lat: 32.526828, lng: 35.481643 },
  },
  {
    id: "שדה-נחמיה-582899233",
    label: "שדה נחמיה / Sde Nehemya",
    location: { lat: 33.186741, lng: 35.624641 },
  },
  {
    id: "שדה-נחמיה-278478005",
    label: "שדה נחמיה / Sede Nehemia",
    location: { lat: 33.186906, lng: 35.624507 },
  },
  {
    id: "שדה-ניצן-603910024",
    label: "שדה ניצן / Sde Nitzan",
    location: { lat: 31.228496, lng: 34.417408 },
  },
  {
    id: "שדה-ניצן-82487550",
    label: "שדה ניצן / Sde Nitzan",
    location: { lat: 31.229655, lng: 34.419215 },
  },
  {
    id: "שדה-עוזיהו-278475677",
    label: "שדה עוזיהו / Sde Uziyahu",
    location: { lat: 31.757580, lng: 34.678469 },
  },
  {
    id: "שדה-עוזיהו-699216066",
    label: "שדה עוזיהו / Sde Uziyyahu",
    location: { lat: 31.756753, lng: 34.677659 },
  },
  {
    id: "שדה-צבי-278474407",
    label: "שדה צבי / Sde Zvi",
    location: { lat: 31.448540, lng: 34.713287 },
  },
  {
    id: "שדה-צבי-665835875",
    label: "שדה צבי / Sde Zvi",
    location: { lat: 31.449043, lng: 34.712255 },
  },
  {
    id: "שדות-ים-195281667",
    label: "שדות ים / S'dot Yam",
    location: { lat: 32.492159, lng: 34.893305 },
  },
  {
    id: "שדות-ים-93903087",
    label: "שדות ים / Sdot Yam",
    location: { lat: 32.492076, lng: 34.894036 },
  },
  {
    id: "שדות-מיכה-278471091",
    label: "שדות מיכה / Sdot Micha",
    location: { lat: 31.721476, lng: 34.920637 },
  },
  {
    id: "שדות-מיכה-82628347",
    label: "שדות מיכה / Sdot Micha",
    location: { lat: 31.721348, lng: 34.921124 },
  },
  {
    id: "שדי-אברהם-711324462",
    label: "שדי אברהם / Sde Avraham",
    location: { lat: 31.211596, lng: 34.336839 },
  },
  {
    id: "שדי-אברהם-340065381",
    label: "שדי אברהם / Sdei Avraham",
    location: { lat: 31.212127, lng: 34.335848 },
  },
  {
    id: "שדי-חמד-278477546",
    label: "שדי חמד / Seday Hemed",
    location: { lat: 32.159844, lng: 34.943545 },
  },
  {
    id: "שדי-חמד-83812049",
    label: "שדי חמד / Seday Hemed",
    location: { lat: 32.159670, lng: 34.943425 },
  },
  {
    id: "שדי-תרומות-704965322",
    label: "שדי תרומות / Sday Trumot",
    location: { lat: 32.440815, lng: 35.485632 },
  },
  {
    id: "שדי-תרומות-278474186",
    label: "שדי תרומות / Sdei Trumot",
    location: { lat: 32.441356, lng: 35.485437 },
  },
  {
    id: "שדמה-278477316",
    label: "שדמה / Shdema",
    location: { lat: 31.833075, lng: 34.740375 },
  },
  {
    id: "שדמה-84014252",
    label: "שדמה / Shdema",
    location: { lat: 31.831669, lng: 34.740792 },
  },
  {
    id: "שדמות-דבורה-278477047",
    label: "שדמות דבורה / Shadmot Dvora",
    location: { lat: 32.695493, lng: 35.437447 },
  },
  {
    id: "שדמות-דבורה-618279457",
    label: "שדמות דבורה / Shadmot Dvora",
    location: { lat: 32.696810, lng: 35.435492 },
  },
  {
    id: "שדרות-278474577",
    label: "שדרות / Sderot",
    location: { lat: 31.526474, lng: 34.596970 },
  },
  {
    id: "שדרות-13481563",
    label: "שדרות / Sderot",
    location: { lat: 31.531258, lng: 34.594678 },
  },
  {
    id: "שואבה-278473037",
    label: "שואבה / Shoeva",
    location: { lat: 31.799156, lng: 35.079089 },
  },
  {
    id: "שואבה-92342851",
    label: "שואבה / Shoeva",
    location: { lat: 31.797441, lng: 35.078798 },
  },
  {
    id: "שובה-278470137",
    label: "שובה / Shuva",
    location: { lat: 31.450014, lng: 34.545434 },
  },
  {
    id: "שובה-711052179",
    label: "שובה / Shuva",
    location: { lat: 31.451478, lng: 34.544849 },
  },
  {
    id: "שובל-278475065",
    label: "שובל / Shoval",
    location: { lat: 31.414318, lng: 34.743767 },
  },
  {
    id: "שובל-25690306",
    label: "שובל / Shoval",
    location: { lat: 31.413521, lng: 34.742428 },
  },
  {
    id: "שוהם-333111665",
    label: "שוהם / Shoham",
    location: { lat: 32.000484, lng: 34.946542 },
  },
  {
    id: "שוהם-13424224",
    label: "שוהם / Shoham",
    location: { lat: 31.996824, lng: 34.942522 },
  },
  {
    id: "שומרה-278477459",
    label: "שומרה / Shomera",
    location: { lat: 33.081809, lng: 35.284182 },
  },
  {
    id: "שומרה-689948646",
    label: "שומרה / Shomera",
    location: { lat: 33.084687, lng: 35.284843 },
  },
  {
    id: "שומריה-353023797",
    label: "שומריה / Shomriya",
    location: { lat: 31.431770, lng: 34.885779 },
  },
  {
    id: "שומריה-91731410",
    label: "שומריה / Shomriya",
    location: { lat: 31.432337, lng: 34.885254 },
  },
  {
    id: "שומרת-91929620",
    label: "שומרת / Shomrat",
    location: { lat: 32.950788, lng: 35.095854 },
  },
  {
    id: "שוקדה-278476960",
    label: "שוקדה / Shokeda",
    location: { lat: 31.421667, lng: 34.525382 },
  },
  {
    id: "שוקדה-711053975",
    label: "שוקדה / Shokeda",
    location: { lat: 31.422447, lng: 34.523944 },
  },
  {
    id: "שורש-246826338",
    label: "שורש / Shoresh",
    location: { lat: 31.797483, lng: 35.065132 },
  },
  {
    id: "שורש-913067347",
    label: "שורש / Shoresh",
    location: { lat: 31.798429, lng: 35.064820 },
  },
  {
    id: "שורשים-278476458",
    label: "שורשים / Shorashim",
    location: { lat: 32.892723, lng: 35.259907 },
  },
  {
    id: "שורשים-91305531",
    label: "שורשים / Shorashim",
    location: { lat: 32.893809, lng: 35.259894 },
  },
  {
    id: "שושנת-העמקים-32498047",
    label: "שושנת העמקים / Shoshanat HaAmakim",
    location: { lat: 32.354270, lng: 34.856724 },
  },
  {
    id: "שזור-278474981",
    label: "שזור / Shezor",
    location: { lat: 32.932735, lng: 35.353502 },
  },
  {
    id: "שזור-668354906",
    label: "שזור / Shezor",
    location: { lat: 32.932230, lng: 35.352287 },
  },
  {
    id: "שחר-278478434",
    label: "שחר / Shahar",
    location: { lat: 31.618406, lng: 34.724064 },
  },
  {
    id: "שחר-705427698",
    label: "שחר / Shahar",
    location: { lat: 31.618307, lng: 34.725887 },
  },
  {
    id: "שחרות-429882264",
    label: "שחרות / Shaharut",
    location: { lat: 29.903692, lng: 34.999220 },
  },
  {
    id: "שחרות-91938049",
    label: "שחרות / Shaharut",
    location: { lat: 29.904694, lng: 34.999910 },
  },
  {
    id: "שיבולים-603936329",
    label: "שיבולים / Shibolim",
    location: { lat: 31.395980, lng: 34.608935 },
  },
  {
    id: "שיבלי-278476277",
    label: "שיבלי / Shibli",
    location: { lat: 32.693722, lng: 35.396001 },
  },
  {
    id: "שיבלי-614215616",
    label: "שיבלי / Shibli",
    location: { lat: 32.691007, lng: 35.397084 },
  },
  {
    id: "שיזף-1746673099",
    label: "שיזף / Sheizaf",
    location: { lat: 31.001651, lng: 34.765484 },
  },
  {
    id: "שיטים-278474413",
    label: "שיטים / Shittim",
    location: { lat: 30.176767, lng: 35.016484 },
  },
  {
    id: "שייח-דנון-278470447",
    label: "שייח דנון / Sheikh Dannun",
    location: { lat: 32.994318, lng: 35.147921 },
  },
  {
    id: "שייח-דנון-613808241",
    label: "שייח דנון / Sheikh Dannun",
    location: { lat: 32.993575, lng: 35.148247 },
  },
  {
    id: "שילת-337277140",
    label: "שילת / Shilat",
    location: { lat: 31.920561, lng: 35.017319 },
  },
  {
    id: "שילת-93325283",
    label: "שילת / Shilat",
    location: { lat: 31.920054, lng: 35.018621 },
  },
  {
    id: "שכונת-דור-צעיר-13207657855",
    label: "שכונת דור צעיר",
    location: { lat: 31.485651, lng: 34.531124 },
  },
  {
    id: "שכונת-החלוץ-13352105807",
    label: "שכונת החלוץ",
    location: { lat: 31.312370, lng: 34.402528 },
  },
  {
    id: "שכונת-הרחבה-575206191",
    label: "שכונת הרחבה",
    location: { lat: 32.844727, lng: 35.804508 },
  },
  {
    id: "שכנות-ההרחבה-13207657856",
    label: "שכנות ההרחבה",
    location: { lat: 31.481759, lng: 34.527932 },
  },
  {
    id: "שכניה-278474128",
    label: "שכניה / Shekhanya",
    location: { lat: 32.848733, lng: 35.246984 },
  },
  {
    id: "שכניה-82808825",
    label: "שכניה / Shekhanya",
    location: { lat: 32.848826, lng: 35.246250 },
  },
  {
    id: "שלווה-274596901",
    label: "שלווה / Shalva",
    location: { lat: 31.563520, lng: 34.768043 },
  },
  {
    id: "שלווה-705460058",
    label: "שלווה / Shalva",
    location: { lat: 31.564681, lng: 34.767789 },
  },
  {
    id: "שלוחות-81373804",
    label: "שלוחות / Shluchot",
    location: { lat: 32.471888, lng: 35.481539 },
  },
  {
    id: "שלוחות-278474393",
    label: "שלוחות / Shluhot",
    location: { lat: 32.471847, lng: 35.481937 },
  },
  {
    id: "שלומי-349922181",
    label: "שלומי / Shlomi",
    location: { lat: 33.076050, lng: 35.148584 },
  },
  {
    id: "שלומי-649666438",
    label: "שלומי / Shlomi",
    location: { lat: 33.075424, lng: 35.147452 },
  },
  {
    id: "שלומית-4859975154",
    label: "שלומית / Shlomit",
    location: { lat: 31.168526, lng: 34.303580 },
  },
  {
    id: "שלפים-6443092850",
    label: "שלפים / Shelafim",
    location: { lat: 32.476300, lng: 35.477229 },
  },
  {
    id: "שמיר-278475660",
    label: "שמיר / Shamir",
    location: { lat: 33.163887, lng: 35.659172 },
  },
  {
    id: "שמיר-366025827",
    label: "שמיר / Shamir",
    location: { lat: 33.165665, lng: 35.660084 },
  },
  {
    id: "שמרת-246850504",
    label: "שמרת / Shomrat",
    location: { lat: 32.950478, lng: 35.096523 },
  },
  {
    id: "שמשית-486305013",
    label: "שמשית / Shimshit",
    location: { lat: 32.732825, lng: 35.247236 },
  },
  {
    id: "שמשית-611889457",
    label: "שמשית / Shimshit",
    location: { lat: 32.733081, lng: 35.246797 },
  },
  {
    id: "שני-1080455114",
    label: "שני / Shani",
    location: { lat: 31.356277, lng: 35.069281 },
  },
  {
    id: "שני-ליבנה-825807896",
    label: "שני ליבנה / Shani Livne",
    location: { lat: 31.355581, lng: 35.069859 },
  },
  {
    id: "שניר-331347646",
    label: "שניר / Snir",
    location: { lat: 33.241003, lng: 35.678195 },
  },
  {
    id: "שניר-87168407",
    label: "שניר / Snir",
    location: { lat: 33.241515, lng: 35.677920 },
  },
  {
    id: "שעב-278476404",
    label: "שעב / Sha'ab",
    location: { lat: 32.890593, lng: 35.238376 },
  },
  {
    id: "שעב-688153440",
    label: "שעב / Shaab",
    location: { lat: 32.889235, lng: 35.236170 },
  },
  {
    id: "שעל-300165737",
    label: "שעל / Shaal",
    location: { lat: 33.116637, lng: 35.718715 },
  },
  {
    id: "שעל-94530861",
    label: "שעל / Shaal",
    location: { lat: 33.116638, lng: 35.717734 },
  },
  {
    id: "שעלבים-278474292",
    label: "שעלבים / Sha'alvim",
    location: { lat: 31.869963, lng: 34.983902 },
  },
  {
    id: "שעלבים-751796141",
    label: "שעלבים / Shaalvim",
    location: { lat: 31.871420, lng: 34.983235 },
  },
  {
    id: "שער-אפרים-278476005",
    label: "שער אפרים / Shaar Efraim",
    location: { lat: 32.288980, lng: 34.997442 },
  },
  {
    id: "שער-אפרים-83012777",
    label: "שער אפרים / Shaar Efraim",
    location: { lat: 32.288898, lng: 34.997472 },
  },
  {
    id: "שער-הגולן-278477616",
    label: "שער הגולן / Shaar HaGolan",
    location: { lat: 32.685814, lng: 35.604288 },
  },
  {
    id: "שער-הגולן-641997842",
    label: "שער הגולן / Shaar HaGolan",
    location: { lat: 32.687181, lng: 35.603795 },
  },
  {
    id: "שער-העמקים-278469743",
    label: "שער העמקים / Shaar HaAmaqim",
    location: { lat: 32.723050, lng: 35.113106 },
  },
  {
    id: "שער-העמקים-15607709",
    label: "שער העמקים / Shaar HaAmaqim",
    location: { lat: 32.723070, lng: 35.113287 },
  },
  {
    id: "שפיים-31979029",
    label: "שפיים / Shefayim",
    location: { lat: 32.216827, lng: 34.823456 },
  },
  {
    id: "שפיים-2138826969",
    label: "שפיים / Shfayim",
    location: { lat: 32.216919, lng: 34.824819 },
  },
  {
    id: "שפיר-1110108543",
    label: "שפיר / Shafir",
    location: { lat: 31.697056, lng: 34.728425 },
  },
  {
    id: "שפיר-616353055",
    label: "שפיר / Shafir",
    location: { lat: 31.696749, lng: 34.729195 },
  },
  {
    id: "שפר-278475092",
    label: "שפר / Shefer",
    location: { lat: 32.943318, lng: 35.435428 },
  },
  {
    id: "שפר-616548419",
    label: "שפר / Shefer",
    location: { lat: 32.943000, lng: 35.436458 },
  },
  {
    id: "שפרעם-246849053",
    label: "שפרעם / Shefaram",
    location: { lat: 32.804577, lng: 35.172387 },
  },
  {
    id: "שפרעם-610277984",
    label: "שפרעם / Shefaram",
    location: { lat: 32.806354, lng: 35.172639 },
  },
  {
    id: "שקף-388328349",
    label: "שקף / Shekef",
    location: { lat: 31.515671, lng: 34.937798 },
  },
  {
    id: "שקף-91731390",
    label: "שקף / Shekef",
    location: { lat: 31.514649, lng: 34.936287 },
  },
  {
    id: "שרונה-278473804",
    label: "שרונה / Sharona",
    location: { lat: 32.725446, lng: 35.466951 },
  },
  {
    id: "שרונה-617978979",
    label: "שרונה / Sharona",
    location: { lat: 32.725767, lng: 35.468308 },
  },
  {
    id: "שריגים-לי-און-9566372117",
    label: "שריגים (לי־און) / Sarigim (Li-On)",
    location: { lat: 31.677034, lng: 34.935797 },
  },
  {
    id: "שריגים-לי-און-446957470",
    label: "שריגים (לי־און) / Sarigim (Li-On)",
    location: { lat: 31.676715, lng: 34.934758 },
  },
  {
    id: "שריד-278476412",
    label: "שריד / Sarid",
    location: { lat: 32.664174, lng: 35.224994 },
  },
  {
    id: "שריד-91376408",
    label: "שריד / Sarid",
    location: { lat: 32.663410, lng: 35.226333 },
  },
  {
    id: "שרשרת-408515458",
    label: "שרשרת / Sharsheret",
    location: { lat: 31.404637, lng: 34.604116 },
  },
  {
    id: "שרשרת-711042928",
    label: "שרשרת / Sharsheret",
    location: { lat: 31.404405, lng: 34.602717 },
  },
  {
    id: "שתולה-278469639",
    label: "שתולה / Shetula",
    location: { lat: 33.084763, lng: 35.314314 },
  },
  {
    id: "שתולה-689949888",
    label: "שתולה / Shetula",
    location: { lat: 33.085428, lng: 35.315168 },
  },
  {
    id: "שתולים-278478026",
    label: "שתולים / Shetulim",
    location: { lat: 31.771956, lng: 34.683597 },
  },
  {
    id: "שתולים-92011979",
    label: "שתולים / Shetulim",
    location: { lat: 31.773818, lng: 34.683427 },
  },
  {
    id: "תאשור-278478089",
    label: "תאשור / Teashur",
    location: { lat: 31.371871, lng: 34.643707 },
  },
  {
    id: "תאשור-711025852",
    label: "תאשור / Teashur",
    location: { lat: 31.372707, lng: 34.644437 },
  },
  {
    id: "תדהר-278477652",
    label: "תדהר / Tidhar",
    location: { lat: 31.379004, lng: 34.628454 },
  },
  {
    id: "תדהר-711030099",
    label: "תדהר / Tidhar",
    location: { lat: 31.379681, lng: 34.627335 },
  },
  {
    id: "תובל-278478402",
    label: "תובל / Tuval",
    location: { lat: 32.929074, lng: 35.244788 },
  },
  {
    id: "תובל-682943899",
    label: "תובל / Tuval",
    location: { lat: 32.929039, lng: 35.246492 },
  },
  {
    id: "תושייה-711052845",
    label: "תושייה / Tushiya",
    location: { lat: 31.433717, lng: 34.541075 },
  },
  {
    id: "תושייה-278478007",
    label: "תושייה / Tushiyya",
    location: { lat: 31.433237, lng: 34.541181 },
  },
  {
    id: "תימורים-278477102",
    label: "תימורים / Timorim",
    location: { lat: 31.716092, lng: 34.761340 },
  },
  {
    id: "תימורים-605385136",
    label: "תימורים / Timorim",
    location: { lat: 31.715340, lng: 34.758539 },
  },
  {
    id: "תירוש-278478458",
    label: "תירוש / Tirosh",
    location: { lat: 31.750842, lng: 34.886100 },
  },
  {
    id: "תירוש-82628438",
    label: "תירוש / Tirosh",
    location: { lat: 31.750649, lng: 34.885555 },
  },
  {
    id: "תל-אביב-יפו-278472603",
    label: "תל אביב–יפו / Tel Aviv",
    location: { lat: 32.085300, lng: 34.781806 },
  },
  {
    id: "תל-יוסף-278474961",
    label: "תל יוסף / Tel Yosseph",
    location: { lat: 32.556108, lng: 35.399652 },
  },
  {
    id: "תל-יוסף-641640392",
    label: "תל יוסף / Tel Yosseph",
    location: { lat: 32.555718, lng: 35.400137 },
  },
  {
    id: "תל-יצחק-246250331",
    label: "תל יצחק / Tel Izhak",
    location: { lat: 32.256003, lng: 34.869339 },
  },
  {
    id: "תל-יצחק-79317166",
    label: "תל יצחק / Tel Izhak",
    location: { lat: 32.251090, lng: 34.871202 },
  },
  {
    id: "תל-מונד-278476871",
    label: "תל מונד / Tel Mond",
    location: { lat: 32.253647, lng: 34.918539 },
  },
  {
    id: "תל-מונד-944395365",
    label: "תל מונד / Tel Mond",
    location: { lat: 32.253162, lng: 34.917294 },
  },
  {
    id: "תל-עדשים-278477802",
    label: "תל עדשים / Tel Adashim",
    location: { lat: 32.656296, lng: 35.302408 },
  },
  {
    id: "תל-עדשים-617074249",
    label: "תל עדשים / Tel Adashim",
    location: { lat: 32.656243, lng: 35.303198 },
  },
  {
    id: "תל-ערד-8242302352",
    label: "תל ערד / Tel A'rad",
    location: { lat: 31.291900, lng: 35.145287 },
  },
  {
    id: "תל-ערד-495013775",
    label: "תל ערד / Tel A'rad",
    location: { lat: 31.290624, lng: 35.145567 },
  },
  {
    id: "תל-קציר-331350794",
    label: "תל קציר / Tel Katzir",
    location: { lat: 32.705190, lng: 35.617822 },
  },
  {
    id: "תל-קציר-366030654",
    label: "תל קציר / Tel Katzir",
    location: { lat: 32.705840, lng: 35.617702 },
  },
  {
    id: "תל-שבע-599579503",
    label: "תל שבע / Tal as-Sabi",
    location: { lat: 31.245649, lng: 34.857768 },
  },
  {
    id: "תל-תאומים-1829446449",
    label: "תל תאומים / Tel Te'omim",
    location: { lat: 32.442419, lng: 35.496448 },
  },
  {
    id: "תל-תאומים-705090372",
    label: "תל תאומים / Tel Te'omim",
    location: { lat: 32.441980, lng: 35.496177 },
  },
  {
    id: "תל-אלמלח-4867792022",
    label: "תל-אלמלח / Tal Al Malah",
    location: { lat: 31.231942, lng: 35.003776 },
  },
  {
    id: "תלמי-אליהו-82487548",
    label: "תלמי אליהו / Talmay Eliyahu",
    location: { lat: 31.229055, lng: 34.428866 },
  },
  {
    id: "תלמי-אליהו-603909648",
    label: "תלמי אליהו / Talmei Eliyahu",
    location: { lat: 31.230028, lng: 34.429478 },
  },
  {
    id: "תלמי-אלעזר-1643343571",
    label: "תלמי אלעזר / Talmay Elazar",
    location: { lat: 32.443165, lng: 34.973735 },
  },
  {
    id: "תלמי-אלעזר-93443585",
    label: "תלמי אלעזר / Talmay Elazar",
    location: { lat: 32.444651, lng: 34.978348 },
  },
  {
    id: "תלמי-ביל-ו-665698939",
    label: "תלמי ביל״ו / Talmay Bilu",
    location: { lat: 31.437383, lng: 34.645416 },
  },
  {
    id: "תלמי-ביל-ו-278478163",
    label: "תלמי ביל״ו / Talme Bilu",
    location: { lat: 31.437703, lng: 34.645481 },
  },
  {
    id: "תלמי-יוסף-340065187",
    label: "תלמי יוסף / Talmei Yosef",
    location: { lat: 31.200527, lng: 34.363828 },
  },
  {
    id: "תלמי-יוסף-711322984",
    label: "תלמי יוסף / Talmei Yosef",
    location: { lat: 31.199679, lng: 34.361020 },
  },
  {
    id: "תלמי-יחיאל-278474905",
    label: "תלמי יחיאל / Talmei Yehiel",
    location: { lat: 31.753729, lng: 34.763998 },
  },
  {
    id: "תלמי-יחיאל-636948953",
    label: "תלמי יחיאל / Talmei Yehiel",
    location: { lat: 31.753817, lng: 34.762754 },
  },
  {
    id: "תלמי-יפה-278477628",
    label: "תלמי יפה / Talmei Yafe",
    location: { lat: 31.616858, lng: 34.613289 },
  },
  {
    id: "תלמי-יפה-698866645",
    label: "תלמי יפה / Talmei Yafe",
    location: { lat: 31.617463, lng: 34.613438 },
  },
  {
    id: "תלמים-278473849",
    label: "תלמים / Tlamim",
    location: { lat: 31.563558, lng: 34.672081 },
  },
  {
    id: "תלמים-705443206",
    label: "תלמים / Tlamim",
    location: { lat: 31.565742, lng: 34.671920 },
  },
  {
    id: "תמרת-278473231",
    label: "תמרת / Timrat",
    location: { lat: 32.703808, lng: 35.225307 },
  },
  {
    id: "תמרת-619226504",
    label: "תמרת / Timrat",
    location: { lat: 32.703551, lng: 35.225758 },
  },
  {
    id: "תנובות-278477672",
    label: "תנובות / Tnuvot",
    location: { lat: 32.305202, lng: 34.962067 },
  },
  {
    id: "תנובות-700126397",
    label: "תנובות / Tnuvot",
    location: { lat: 32.304979, lng: 34.962406 },
  },
  {
    id: "תעוז-278478015",
    label: "תעוז / Taoz",
    location: { lat: 31.802037, lng: 34.974458 },
  },
  {
    id: "תעוז-82628949",
    label: "תעוז / Taoz",
    location: { lat: 31.801058, lng: 34.973800 },
  },
  {
    id: "תפרח-699580454",
    label: "תפרח / Tifrach",
    location: { lat: 31.325969, lng: 34.676644 },
  },
  {
    id: "תפרח-278478289",
    label: "תפרח / Tifrah",
    location: { lat: 31.326514, lng: 34.677459 },
  },
  {
    id: "תקומה-278469864",
    label: "תקומה / Tkuma",
    location: { lat: 31.448560, lng: 34.577572 },
  },
  {
    id: "תקומה-711050274",
    label: "תקומה / Tkuma",
    location: { lat: 31.450548, lng: 34.580062 },
  },
  {
    id: "תראבין-א-צאנע-1075467496",
    label: "תראבין א-צאנע / Tarabin",
    location: { lat: 31.280533, lng: 34.873703 },
  },
  {
    id: "תראבין-א-צאנע-92737512",
    label: "תראבין א-צאנע / Tarabin",
    location: { lat: 31.281382, lng: 34.874353 },
  },
  {
    id: "תראבין-א-צאנע-1075537606",
    label: "תראבין א-צאנע / Tarabin as-Sana",
    location: { lat: 31.342845, lng: 34.735550 },
  },
  {
    id: "תראבין-א-צאנע-7266570",
    label: "תראבין א-צאנע / Tirabin al-Sana",
    location: { lat: 31.343612, lng: 34.740420 },
  },
  {
    id: "תרום-278469866",
    label: "תרום / Tarum",
    location: { lat: 31.782567, lng: 34.981509 },
  },
  {
    id: "תרום-82628888",
    label: "תרום / Tarum",
    location: { lat: 31.783237, lng: 34.982465 },
  },
  {
    id: "location-8242302351",
    label: "المزرة",
    location: { lat: 31.150338, lng: 35.080532 },
  },
  {
    id: "location-798887233",
    label: "سيح الهشيمة",
    location: { lat: 30.735000, lng: 35.293889 },
  },
  {
    id: "location-5629595132",
    label: "قرى بدوية جنوب رهط",
    location: { lat: 31.367364, lng: 34.748126 },
  },
  {
    id: "location-798852442",
    label: "مخاضة أم توتة",
    location: { lat: 32.583333, lng: 35.566667 },
  },
  {
    id: "location-802901819",
    label: "وادي الدخل",
    location: { lat: 30.931111, lng: 35.394722 },
  },
  {
    id: "location-798853401",
    label: "وادي نهر اليرموك",
    location: { lat: 32.632224, lng: 35.567522 },
  },
];

export type SearchLocationId = (typeof SEARCH_LOCATIONS)[number]['id'];


function normalizeSearchLocationLabel(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[״"']/g, '')
    .replace(/[־–—-]/g, ' ')
    .replace(/\s+/g, ' ');
}

function dedupeSearchLocations<T extends { label: string }>(locations: T[]): T[] {
  const seen = new Set<string>();

  return locations.filter((location) => {
    const key = normalizeSearchLocationLabel(location.label);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}


export const DEDUPED_SEARCH_LOCATIONS = dedupeSearchLocations(SEARCH_LOCATIONS);

export function getSearchLocationById(id: string): SearchLocationOption {
  return DEDUPED_SEARCH_LOCATIONS.find((option) => option.id === id) ?? SEARCH_LOCATIONS[0];
}
