import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from 'react';
import { api, ApiError } from '../../api';
import { useToast } from '../../context/ToastContext';
import type { NoiseLevel, PriceRange, VenueDetail, VenueSummary, WifiQuality } from '../../types/api';
import { Button, Icon } from '../ui';
import { Dialog } from './Dialog';

interface AdminVenuesDialogProps {
  close: () => void;
  onChanged?: () => void;
}

type EditForm = {
  openingHours: string;
  priceRange: PriceRange;
  wifiQuality: WifiQuality;
  noiseLevel: NoiseLevel;
  hasPowerOutlets: boolean;
  description: string;
  website: string;
  phone: string;
  email: string;
  accessNote: string;
};

const PRICE_OPTIONS: PriceRange[] = ['low', 'medium', 'high'];
const WIFI_OPTIONS: WifiQuality[] = ['low', 'medium', 'high'];
const NOISE_OPTIONS: NoiseLevel[] = ['low', 'medium', 'high'];

export function AdminVenuesDialog({ close, onChanged }: AdminVenuesDialogProps) {
  const { toast } = useToast();

  const [venues, setVenues] = useState<VenueSummary[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [err, setErr] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [editingVenue, setEditingVenue] = useState<VenueDetail | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);
  const [editFiles, setEditFiles] = useState<File[]>([]);
  const [removedImageUrls, setRemovedImageUrls] = useState<string[]>([]);
  const [savingEdit, setSavingEdit] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    setErr('');
    setSuccessMsg('');

    try {
      const result = await api.venues.list({});
      setVenues(result);
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : 'טעינת המקומות נכשלה');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return venues;

    return venues.filter((v) => {
      const text = [
        v.name,
        v.address,
        (v as any).placeType,
        (v as any).categoryLabel,
        (v as any).source,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return text.includes(q);
    });
  }, [venues, search]);

  const openEdit = async (venue: VenueSummary) => {
    setBusyId(venue.venueId);
    setErr('');
    setSuccessMsg('');

    try {
      const detail = await api.venues.get(venue.venueId);

      setEditingVenue(detail);
      setEditFiles([]);
      setRemovedImageUrls([]);

      setEditForm({
        openingHours: detail.openingHours ?? '',
        priceRange: detail.priceRange,
        wifiQuality: detail.wifiQuality,
        noiseLevel: detail.noiseLevel,
        hasPowerOutlets: detail.hasPowerOutlets,
        description: detail.description ?? '',
        website: ((detail as any).website ?? '').trim(),
        phone: ((detail as any).phone ?? '').trim(),
        email: ((detail as any).email ?? '').trim(),
        accessNote: ((detail as any).accessNote ?? '').trim(),
      });
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : 'טעינת פרטי המקום נכשלה');
    } finally {
      setBusyId(null);
    }
  };

  const closeEdit = () => {
    setEditingVenue(null);
    setEditForm(null);
    setEditFiles([]);
    setRemovedImageUrls([]);
  };

  const setEdit = <K extends keyof EditForm>(key: K, value: EditForm[K]) => {
    setEditForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const onPickFiles = (list: FileList | null) => {
    if (!list) return;

    setEditFiles((prev) => [...prev, ...Array.from(list)].slice(0, 4));
  };

  const saveEdit = async () => {
    if (!editingVenue || !editForm) return;

    setSavingEdit(true);
    setErr('');

    try {
      const uploadedUrls: string[] = [];

      for (const file of editFiles) {
        uploadedUrls.push(await api.storage.uploadVenuePhoto(editingVenue.venueId, file));
      }

      const existingImages = getVenueImages(editingVenue);

      const keptExistingImages = existingImages.filter(
        (url) => !removedImageUrls.includes(url)
      );

      const imageUrls = [...keptExistingImages, ...uploadedUrls]
        .filter(Boolean)
        .slice(0, 8);

      await api.venues.update(editingVenue.venueId, {
        openingHours: editForm.openingHours,
        priceRange: editForm.priceRange,
        wifiQuality: editForm.wifiQuality,
        noiseLevel: editForm.noiseLevel,
        hasPowerOutlets: editForm.hasPowerOutlets,
        description: editForm.description,
        imageUrls,
        mainImageUrl: imageUrls[0] ?? '',
        website: editForm.website,
        phone: editForm.phone,
        email: editForm.email,
        accessNote: editForm.accessNote,
      } as any);

      await load();
      onChanged?.();
      closeEdit();

      const message = 'השינויים נשמרו בהצלחה';
      setSuccessMsg(message);
      toast(message, 'success');

      window.setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : 'שמירת העריכה נכשלה');
    } finally {
      setSavingEdit(false);
    }
  };

  const removeVenue = async (venue: VenueSummary) => {
    const ok = window.confirm(
      `למחוק את המקום "${venue.name}" מהתצוגה למשתמשים?\n\nהמחיקה היא רכה: המקום יסומן כלא פעיל ולא יוצג למשתמשים.`
    );

    if (!ok) return;

    setBusyId(venue.venueId);
    setErr('');

    try {
      await api.venues.remove(venue.venueId);
      setVenues((prev) => prev.filter((v) => v.venueId !== venue.venueId));
      onChanged?.();

      const message = 'המקום הוסר מהתצוגה למשתמשים';
      setSuccessMsg(message);
      toast(message, 'success');

      window.setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : 'מחיקת המקום נכשלה');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Dialog close={close} width={1040}>
      <div
        dir="rtl"
        style={{
          background: '#F7F0E6',
          borderRadius: 'var(--w4-radius)',
          overflow: 'hidden',
          boxShadow: 'var(--w4-shadow-lg)',
          border: '1px solid rgba(117, 84, 54, 0.14)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 18,
            padding: '24px 28px 18px',
            borderBottom: '1px solid rgba(117, 84, 54, 0.14)',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.52), rgba(238,222,203,0.48))',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                borderRadius: 999,
                background: 'rgba(191, 92, 47, 0.11)',
                color: 'var(--w4-accent)',
                fontSize: 12,
                fontWeight: 900,
                marginBottom: 8,
              }}
            >
              <Icon name="sliders" size={15} />
              פאנל מנהל
            </div>

            <h2
              style={{
                fontSize: 24,
                fontWeight: 950,
                margin: 0,
                letterSpacing: '-0.03em',
                color: 'var(--w4-text)',
              }}
            >
              ניהול מקומות במערכת
            </h2>

            <div
              style={{
                fontSize: 13.5,
                color: 'var(--w4-muted)',
                marginTop: 7,
                fontWeight: 650,
                lineHeight: 1.55,
              }}
            >
              צפייה, מחיקה ועריכה של פרטים משתנים. שם, כתובת ומיקום נשארים קבועים כדי לשמור על אמינות הנתונים.
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="סגירת ניהול מקומות"
            style={{
              width: 42,
              height: 42,
              borderRadius: 16,
              border: '1px solid rgba(117, 84, 54, 0.14)',
              background: 'rgba(255,255,255,0.66)',
              cursor: 'pointer',
              color: 'var(--w4-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 22px rgba(38, 27, 17, 0.08)',
            }}
          >
            <Icon name="x" size={22} />
          </button>
        </div>

        <div style={{ padding: 26 }}>
          {successMsg && (
            <div
              style={{
                background: '#E7F8ED',
                color: '#157347',
                padding: '12px 14px',
                borderRadius: 16,
                fontSize: 13.5,
                fontWeight: 900,
                marginBottom: 14,
                border: '1px solid rgba(21, 115, 71, 0.18)',
              }}
            >
              {successMsg}
            </div>
          )}

          {err && (
            <div
              style={{
                background: '#FCE8E6',
                color: '#B42318',
                padding: '12px 14px',
                borderRadius: 16,
                fontSize: 13.5,
                fontWeight: 900,
                marginBottom: 14,
                border: '1px solid rgba(180, 35, 24, 0.18)',
              }}
            >
              {err}
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 14,
              alignItems: 'center',
              marginBottom: 18,
            }}
          >
            <label style={{ display: 'block' }}>
              <div style={adminLabelStyle}>חיפוש מקום</div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="חיפוש לפי שם, כתובת, סוג מקום או מקור"
                style={adminInputStyle}
              />
            </label>

            <div
              style={{
                alignSelf: 'end',
                minHeight: 46,
                padding: '0 16px',
                borderRadius: 16,
                background: 'rgba(255,255,255,0.58)',
                border: '1px solid rgba(117, 84, 54, 0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--w4-muted)',
                fontSize: 13,
                fontWeight: 900,
                whiteSpace: 'nowrap',
              }}
            >
              {filtered.length} מקומות
            </div>
          </div>

          <div
            style={{
              maxHeight: '56vh',
              overflow: 'auto',
              paddingInlineEnd: 4,
              display: 'grid',
              gap: 12,
            }}
          >
            {loading ? (
              <EmptyState title="טוען מקומות…" text="רשימת המקומות נטענת מהמערכת." />
            ) : filtered.length === 0 ? (
              <EmptyState title="לא נמצאו מקומות" text="נסה לחפש בשם אחר או לנקות את שורת החיפוש." />
            ) : (
              filtered.map((venue) => {
                const imageUrl = getVenueImage(venue);
                const categoryLabel =
                  (venue as any).categoryLabel || (venue as any).placeType || (venue as any).source || 'מקום';
                const isBusy = busyId === venue.venueId;

                return (
                  <div
                    key={venue.venueId}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '86px 1fr auto',
                      gap: 16,
                      alignItems: 'center',
                      padding: 14,
                      borderRadius: 22,
                      background: 'rgba(255,255,255,0.64)',
                      border: '1px solid rgba(117, 84, 54, 0.12)',
                      boxShadow: '0 10px 24px rgba(38, 27, 17, 0.05)',
                    }}
                  >
                    <div
                      style={{
                        width: 86,
                        height: 70,
                        borderRadius: 18,
                        overflow: 'hidden',
                        background:
                          'linear-gradient(135deg, rgba(191, 92, 47, 0.18), rgba(238, 222, 203, 0.72))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--w4-accent)',
                        fontSize: 26,
                        fontWeight: 950,
                      }}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        venue.name?.slice(0, 1) || 'W'
                      )}
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          flexWrap: 'wrap',
                          marginBottom: 6,
                        }}
                      >
                        <h3
                          style={{
                            margin: 0,
                            fontSize: 17,
                            fontWeight: 950,
                            color: 'var(--w4-text)',
                            letterSpacing: '-0.02em',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: 420,
                          }}
                        >
                          {venue.name}
                        </h3>

                        <span style={chipStyle}>{categoryLabel}</span>
                      </div>

                      <div
                        style={{
                          color: 'var(--w4-muted)',
                          fontSize: 13,
                          fontWeight: 700,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {venue.address || 'אין כתובת'}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          gap: 8,
                          flexWrap: 'wrap',
                          marginTop: 9,
                        }}
                      >
                        <span style={adminMetaChipStyle}>ID: {venue.venueId}</span>

                        {(venue as any).rating !== undefined && (
                          <span style={adminMetaChipStyle}>דירוג: {(venue as any).rating}</span>
                        )}

                        {(venue as any).distanceKm !== undefined && (
                          <span style={adminMetaChipStyle}>מרחק: {(venue as any).distanceKm} ק״מ</span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button variant="soft" icon="sliders" onClick={() => openEdit(venue)} disabled={isBusy}>
                        {isBusy ? 'טוען…' : 'ערוך'}
                      </Button>

                      <Button variant="neutral" icon="x" onClick={() => removeVenue(venue)} disabled={isBusy}>
                        {isBusy ? 'מוחק…' : 'מחק'}
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {editingVenue && editForm && (
          <EditVenueOverlay
            editingVenue={editingVenue}
            editForm={editForm}
            editFiles={editFiles}
            removedImageUrls={removedImageUrls}
            setRemovedImageUrls={setRemovedImageUrls}
            savingEdit={savingEdit}
            fileInput={fileInput}
            closeEdit={closeEdit}
            setEdit={setEdit}
            onPickFiles={onPickFiles}
            saveEdit={saveEdit}
          />
        )}
      </div>
    </Dialog>
  );
}

function EditVenueOverlay({
  editingVenue,
  editForm,
  editFiles,
  removedImageUrls,
  setRemovedImageUrls,
  savingEdit,
  fileInput,
  closeEdit,
  setEdit,
  onPickFiles,
  saveEdit,
}: {
  editingVenue: VenueDetail;
  editForm: EditForm;
  editFiles: File[];
  removedImageUrls: string[];
  setRemovedImageUrls: Dispatch<SetStateAction<string[]>>;
  savingEdit: boolean;
fileInput: RefObject<HTMLInputElement>;
  closeEdit: () => void;
  setEdit: <K extends keyof EditForm>(key: K, value: EditForm[K]) => void;
  onPickFiles: (list: FileList | null) => void;
  saveEdit: () => void;
}) {
  const currentImages = getVenueImages(editingVenue).filter(
    (url) => !removedImageUrls.includes(url)
  );

  return (
    <div
      dir="rtl"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(32, 25, 18, 0.52)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: 'min(860px, 96vw)',
          maxHeight: '92vh',
          background: '#F8F1E8',
          borderRadius: 28,
          boxShadow: '0 24px 80px rgba(38, 27, 17, 0.28)',
          border: '1px solid rgba(117, 84, 54, 0.16)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '22px 28px 18px',
            borderBottom: '1px solid rgba(117, 84, 54, 0.16)',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.48), rgba(238,222,203,0.48))',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 18,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                borderRadius: 999,
                background: 'rgba(191, 92, 47, 0.11)',
                color: 'var(--w4-accent)',
                fontSize: 12,
                fontWeight: 900,
                marginBottom: 10,
              }}
            >
              <Icon name="sliders" size={15} />
              עריכת מקום
            </div>

            <h3
              style={{
                margin: 0,
                fontSize: 26,
                lineHeight: 1.15,
                fontWeight: 950,
                color: 'var(--w4-text)',
                letterSpacing: '-0.03em',
              }}
            >
              {editingVenue.name}
            </h3>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 10,
                color: 'var(--w4-muted)',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <span style={adminMetaChipStyle}>{editingVenue.address || 'אין כתובת'}</span>
              <span style={adminMetaChipStyle}>שם, כתובת ומיקום נעולים לעריכה</span>
            </div>
          </div>

          <button
            type="button"
            onClick={closeEdit}
            aria-label="סגירת חלון עריכה"
            style={{
              width: 42,
              height: 42,
              flex: '0 0 auto',
              borderRadius: 16,
              border: '1px solid rgba(117, 84, 54, 0.14)',
              background: 'rgba(255,255,255,0.62)',
              cursor: 'pointer',
              color: 'var(--w4-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 22px rgba(38, 27, 17, 0.08)',
            }}
          >
            <Icon name="x" size={22} />
          </button>
        </div>

        <div
          style={{
            padding: 24,
            overflow: 'auto',
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 18,
          }}
        >
          <SectionCard title="תנאי עבודה" subtitle="המידע המרכזי שמשפיע על התאמת המקום לעבודה או למידה.">
            <div style={{ display: 'grid', gap: 16 }}>
              <AdminTextField
                label="שעות פעילות"
                value={editForm.openingHours}
                onChange={(v) => setEdit('openingHours', v)}
                placeholder="לדוגמה: 08:00-22:00"
              />

              <OptionGroup
                title="מחיר"
                options={PRICE_OPTIONS}
                value={editForm.priceRange}
                labels={{ low: 'נמוך', medium: 'בינוני', high: 'גבוה' }}
                onChange={(v) => setEdit('priceRange', v as PriceRange)}
              />

              <OptionGroup
                title="איכות Wi-Fi"
                options={WIFI_OPTIONS}
                value={editForm.wifiQuality}
                labels={{ low: 'נמוכה', medium: 'בינונית', high: 'גבוהה' }}
                onChange={(v) => setEdit('wifiQuality', v as WifiQuality)}
              />

              <OptionGroup
                title="רמת רעש"
                options={NOISE_OPTIONS}
                value={editForm.noiseLevel}
                labels={{ low: 'שקט', medium: 'בינוני', high: 'רועש' }}
                onChange={(v) => setEdit('noiseLevel', v as NoiseLevel)}
              />

              <div>
                <div style={adminLabelStyle}>שקעי חשמל</div>

                <button
                  type="button"
                  onClick={() => setEdit('hasPowerOutlets', !editForm.hasPowerOutlets)}
                  style={{
                    width: '100%',
                    minHeight: 48,
                    padding: '0 16px',
                    borderRadius: 16,
                    border: editForm.hasPowerOutlets
                      ? '1px solid rgba(191, 92, 47, 0.42)'
                      : '1px solid rgba(117, 84, 54, 0.16)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    fontWeight: 900,
                    background: editForm.hasPowerOutlets
                      ? 'linear-gradient(135deg, #BF5C2F, #A94D28)'
                      : 'rgba(255,255,255,0.62)',
                    color: editForm.hasPowerOutlets ? '#fff' : 'var(--w4-text)',
                    boxShadow: editForm.hasPowerOutlets ? '0 10px 24px rgba(191, 92, 47, 0.22)' : 'none',
                  }}
                >
                  {editForm.hasPowerOutlets ? 'יש שקעים זמינים' : 'אין מידע / אין שקעים'}
                </button>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="פרטי קשר" subtitle="מידע שיוצג למשתמשים בעמוד המקום.">
            <div style={{ display: 'grid', gap: 14 }}>
              <AdminTextField
                label="אתר"
                value={editForm.website}
                onChange={(v) => setEdit('website', v)}
                placeholder="https://example.com"
              />

              <AdminTextField
                label="טלפון"
                value={editForm.phone}
                onChange={(v) => setEdit('phone', v)}
                placeholder="03-0000000"
              />

              <AdminTextField
                label="אימייל"
                value={editForm.email}
                onChange={(v) => setEdit('email', v)}
                placeholder="info@example.com"
              />

              <AdminTextField
                label="הערת כניסה / תשלום"
                value={editForm.accessNote}
                onChange={(v) => setEdit('accessNote', v)}
                placeholder="לדוגמה: כניסה בתשלום, מומלץ לבדוק זמינות"
              />
            </div>
          </SectionCard>

          <div style={{ gridColumn: '1 / -1' }}>
            <SectionCard title="תיאור למשתמש" subtitle="טקסט קצר וברור שיעזור להבין למי המקום מתאים.">
              <AdminTextArea
                label="תיאור"
                value={editForm.description}
                onChange={(v) => setEdit('description', v)}
                placeholder="לדוגמה: מקום שקט יחסית, מתאים לסטודנטים, עם שולחנות עבודה וישיבה ממושכת."
              />
            </SectionCard>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <SectionCard title="תמונות" subtitle="ניתן להסיר תמונות קיימות או להוסיף עד 4 תמונות חדשות.">
              {currentImages.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={adminLabelStyle}>תמונות קיימות</div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                      gap: 12,
                    }}
                  >
                    {currentImages.map((url) => (
                      <div
                        key={url}
                        style={{
                          position: 'relative',
                          height: 96,
                          borderRadius: 18,
                          overflow: 'hidden',
                          border: '1px solid rgba(117, 84, 54, 0.16)',
                          background: 'rgba(255,255,255,0.7)',
                          boxShadow: '0 10px 22px rgba(38, 27, 17, 0.08)',
                        }}
                      >
                        <img
                          src={url}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setRemovedImageUrls((prev) =>
                              prev.includes(url) ? prev : [...prev, url]
                            )
                          }
                          title="הסר תמונה מהתצוגה"
                          aria-label="הסר תמונה מהתצוגה"
                          style={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            width: 32,
                            height: 32,
                            borderRadius: 999,
                            border: 'none',
                            background: 'rgba(180, 35, 24, 0.94)',
                            color: '#fff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 21,
                            fontWeight: 950,
                            lineHeight: 1,
                            boxShadow: '0 8px 18px rgba(0,0,0,0.24)',
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', marginTop: 9, fontWeight: 700 }}>
                    לחיצה על × תסיר את התמונה מהתצוגה לאחר שמירת השינויים.
                  </div>
                </div>
              )}

              {getVenueImages(editingVenue).length > 0 && currentImages.length === 0 && (
                <div
                  style={{
                    marginBottom: 16,
                    padding: 14,
                    borderRadius: 16,
                    background: 'rgba(252, 232, 230, 0.65)',
                    color: '#B42318',
                    fontSize: 13,
                    fontWeight: 850,
                    border: '1px solid rgba(180, 35, 24, 0.16)',
                  }}
                >
                  כל התמונות הקיימות סומנו להסרה. לחץ שמירת שינויים כדי לעדכן את המקום.
                </div>
              )}

              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={(e) => onPickFiles(e.target.files)}
              />

              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                style={{
                  width: '100%',
                  padding: 22,
                  borderRadius: 20,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  border: '2px dashed rgba(191, 92, 47, 0.35)',
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.68), rgba(238,222,203,0.28))',
                  color: 'var(--w4-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 16,
                    background: 'rgba(191, 92, 47, 0.11)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--w4-accent)',
                  }}
                >
                  <Icon name="upload" size={23} />
                </span>

                <span style={{ fontSize: 14, fontWeight: 900, color: 'var(--w4-text)' }}>
                  {editFiles.length ? `${editFiles.length} תמונות חדשות יתווספו למקום` : 'בחירת תמונות להעלאה'}
                </span>
              </button>

              <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', marginTop: 10 }}>
                התמונות נשמרות ב־Amazon S3. במסך הזה ההסרה מוחקת את הקישור מה־DynamoDB, ולכן התמונה מפסיקה להופיע באתר.
              </div>
            </SectionCard>
          </div>
        </div>

        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(117, 84, 54, 0.16)',
            background: 'rgba(248, 241, 232, 0.96)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ color: 'var(--w4-muted)', fontSize: 12.5, fontWeight: 700 }}>
            השינויים יוצגו למשתמשים לאחר שמירה.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button variant="neutral" onClick={closeEdit}>
              ביטול
            </Button>

            <Button icon="check" onClick={saveEdit} disabled={savingEdit}>
              {savingEdit ? 'שומר…' : 'שמירת שינויים'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        background: 'rgba(255,255,255,0.64)',
        border: '1px solid rgba(117, 84, 54, 0.14)',
        borderRadius: 22,
        padding: 18,
        boxShadow: '0 12px 28px rgba(38, 27, 17, 0.06)',
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <h4
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 950,
            color: 'var(--w4-text)',
          }}
        >
          {title}
        </h4>

        {subtitle && (
          <div
            style={{
              marginTop: 4,
              fontSize: 12.5,
              lineHeight: 1.55,
              color: 'var(--w4-muted)',
              fontWeight: 650,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {children}
    </section>
  );
}

function AdminTextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label style={{ display: 'block' }}>
      <div style={adminLabelStyle}>{label}</div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={adminInputStyle}
      />
    </label>
  );
}

function AdminTextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label style={{ display: 'block' }}>
      <div style={adminLabelStyle}>{label}</div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        style={{
          ...adminInputStyle,
          minHeight: 112,
          resize: 'vertical',
          lineHeight: 1.65,
          paddingTop: 14,
        }}
      />
    </label>
  );
}

function OptionGroup({
  title,
  options,
  value,
  labels,
  onChange,
}: {
  title: string;
  options: string[];
  value: string;
  labels: Record<string, string>;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <div style={adminLabelStyle}>{title}</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${options.length}, 1fr)`,
          gap: 8,
          padding: 5,
          borderRadius: 18,
          background: 'rgba(238, 222, 203, 0.44)',
          border: '1px solid rgba(117, 84, 54, 0.12)',
        }}
      >
        {options.map((option) => {
          const selected = value === option;

          return (
            <button
              type="button"
              key={option}
              onClick={() => onChange(option)}
              style={{
                minHeight: 40,
                padding: '0 10px',
                borderRadius: 14,
                border: selected ? '1px solid rgba(191, 92, 47, 0.45)' : '1px solid transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 13.5,
                fontWeight: 900,
                background: selected
                  ? 'linear-gradient(135deg, #BF5C2F, #A94D28)'
                  : 'rgba(255,255,255,0.52)',
                color: selected ? '#fff' : 'var(--w4-text)',
                boxShadow: selected ? '0 8px 18px rgba(191, 92, 47, 0.22)' : 'none',
                transition: '0.16s ease',
              }}
            >
              {labels[option] ?? option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div
      style={{
        padding: 30,
        borderRadius: 22,
        background: 'rgba(255,255,255,0.56)',
        border: '1px solid rgba(117, 84, 54, 0.12)',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 17, fontWeight: 950, color: 'var(--w4-text)', marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13.5, color: 'var(--w4-muted)', fontWeight: 700 }}>{text}</div>
    </div>
  );
}

function getVenueImage(venue: VenueSummary): string {
  return getVenueImages(venue as any)[0] ?? '';
}

function getVenueImages(venue: any): string[] {
  const images: string[] = [];

  if (typeof venue.mainImageUrl === 'string' && venue.mainImageUrl.trim()) {
    images.push(venue.mainImageUrl.trim());
  }

  if (typeof venue.imageUrl === 'string' && venue.imageUrl.trim()) {
    images.push(venue.imageUrl.trim());
  }

  if (Array.isArray(venue.imageUrls)) {
    for (const url of venue.imageUrls) {
      if (typeof url === 'string' && url.trim()) {
        images.push(url.trim());
      }
    }
  }

  return Array.from(new Set(images));
}

const adminLabelStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  color: 'var(--w4-text)',
  marginBottom: 7,
};

const adminInputStyle: CSSProperties = {
  width: '100%',
  minHeight: 46,
  borderRadius: 16,
  border: '1px solid rgba(117, 84, 54, 0.16)',
  background: 'rgba(255,255,255,0.72)',
  color: 'var(--w4-text)',
  padding: '0 14px',
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 700,
  outline: 'none',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
  boxSizing: 'border-box',
};

const adminMetaChipStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 10px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.58)',
  border: '1px solid rgba(117, 84, 54, 0.12)',
  color: 'var(--w4-muted)',
  fontSize: 12,
  fontWeight: 800,
};

const chipStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 999,
  padding: '4px 8px',
  background: 'var(--w4-surface-2)',
  color: 'var(--w4-muted)',
  fontSize: 12,
  fontWeight: 700,
};