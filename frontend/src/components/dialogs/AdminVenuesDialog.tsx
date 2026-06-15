import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { api, ApiError } from '../../api';
import { useToast } from '../../context/ToastContext';
import type { NoiseLevel, PriceRange, VenueDetail, VenueSummary, WifiQuality } from '../../types/api';
import { Button, Field, Icon, Photo } from '../ui';
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
      const text = [v.name, v.address, (v as any).placeType, (v as any).categoryLabel, (v as any).source]
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

      const existingImages = Array.isArray(editingVenue.imageUrls) ? editingVenue.imageUrls : [];
      const imageUrls = [...existingImages, ...uploadedUrls].filter(Boolean).slice(0, 8);

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
    <Dialog close={close} width={980}>
      <div
        style={{
          background: '#F7F0E6',
          borderRadius: 'var(--w4-radius)',
          overflow: 'hidden',
          boxShadow: 'var(--w4-shadow-lg)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px 26px 14px',
            borderBottom: '1px solid var(--w4-border)',
            background: '#F7F0E6',
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--w4-accent)', letterSpacing: '0.04em' }}>
              פאנל מנהל
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '2px 0 0', letterSpacing: '-0.02em' }}>
              ניהול מקומות במערכת
            </h2>
            <div style={{ fontSize: 13.5, color: 'var(--w4-muted)', marginTop: 6 }}>
              צפייה, מחיקה ועריכה בסיסית של פרטים משתנים. שם, כתובת ומיקום נשארים קבועים.
            </div>
          </div>

          <button
            onClick={close}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              border: 'none',
              background: 'var(--w4-surface-2)',
              cursor: 'pointer',
              color: 'var(--w4-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="x" size={21} />
          </button>
        </div>

        <div style={{ padding: 26, background: '#F7F0E6' }}>
          {successMsg && (
            <div
              style={{
                background: '#E7F8ED',
                color: '#157347',
                padding: '12px 14px',
                borderRadius: 'var(--w4-radius-sm)',
                fontSize: 13.5,
                fontWeight: 800,
                marginBottom: 16,
                lineHeight: 1.45,
                border: '1px solid #BFE8CC',
              }}
            >
              {successMsg}
            </div>
          )}

          {err && (
            <div
              style={{
                background: 'var(--w4-danger-soft)',
                color: 'var(--w4-danger)',
                padding: '12px 14px',
                borderRadius: 'var(--w4-radius-sm)',
                fontSize: 13.5,
                fontWeight: 700,
                marginBottom: 16,
                lineHeight: 1.45,
              }}
            >
              {err}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="חיפוש לפי שם, כתובת או סוג מקום..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'var(--w4-surface)',
                color: 'var(--w4-text)',
                borderRadius: 'var(--w4-radius-sm)',
                padding: '12px 14px',
                fontFamily: 'inherit',
                fontSize: 14.5,
                fontWeight: 600,
              }}
            />

            <Button variant="neutral" icon="sliders" onClick={load} disabled={loading}>
              רענון
            </Button>
          </div>

          <div style={{ fontSize: 13.5, color: 'var(--w4-muted)', marginBottom: 12 }}>
            {loading ? 'טוען מקומות…' : `${filtered.length} מקומות מוצגים מתוך ${venues.length}`}
          </div>

          <div
            style={{
              maxHeight: 520,
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              paddingInlineEnd: 4,
            }}
          >
            {loading ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--w4-muted)' }}>טוען…</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--w4-muted)' }}>
                לא נמצאו מקומות מתאימים לחיפוש.
              </div>
            ) : (
              filtered.map((venue) => {
                const imageUrl =
                  venue.mainImageUrl ||
                  ((venue as any).imageUrls && Array.isArray((venue as any).imageUrls)
                    ? (venue as any).imageUrls[0]
                    : undefined);

                return (
                  <div
                    key={venue.venueId}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '64px 1fr auto',
                      gap: 14,
                      alignItems: 'center',
                      background: 'var(--w4-surface)',
                      borderRadius: 'var(--w4-radius)',
                      boxShadow: 'var(--w4-shadow-sm)',
                      padding: 10,
                    }}
                  >
                    <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden' }}>
                      <Photo h={64} src={imageUrl} emoji="📍" />
                    </div>

                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 15.5,
                          fontWeight: 800,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {venue.name}
                      </div>

                      <div
                        style={{
                          color: 'var(--w4-muted)',
                          fontSize: 12.5,
                          marginTop: 3,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {venue.address}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 7 }}>
                        <span style={chipStyle}>{(venue as any).placeType || 'workspace'}</span>
                        <span style={chipStyle}>{venue.priceRange}</span>
                        <span style={chipStyle}>{venue.wifiQuality}</span>
                        {venue.hasPowerOutlets && <span style={chipStyle}>שקעים</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button variant="soft" icon="sliders" onClick={() => openEdit(venue)} disabled={busyId === venue.venueId}>
                        ערוך
                      </Button>

                      <Button variant="neutral" icon="x" onClick={() => removeVenue(venue)} disabled={busyId === venue.venueId}>
                        {busyId === venue.venueId ? 'מוחק…' : 'מחק'}
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {editingVenue && editForm && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              background: 'rgba(30, 24, 18, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <div
              style={{
                width: 'min(720px, 96vw)',
                maxHeight: '90vh',
                overflow: 'auto',
                background: '#F7F0E6',
                borderRadius: 'var(--w4-radius)',
                boxShadow: 'var(--w4-shadow-lg)',
              }}
            >
              <div
                style={{
                  padding: '20px 24px 12px',
                  borderBottom: '1px solid var(--w4-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 16,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--w4-accent)' }}>
                    עריכת פרטים משתנים
                  </div>
                  <h3 style={{ margin: '4px 0 4px', fontSize: 22, fontWeight: 900 }}>{editingVenue.name}</h3>
                  <div style={{ color: 'var(--w4-muted)', fontSize: 13.5 }}>{editingVenue.address}</div>
                  <div style={{ color: 'var(--w4-muted)', fontSize: 12.5, marginTop: 5 }}>
                    שם, כתובת, מיקום וסוג מקום אינם ניתנים לעריכה במסך זה.
                  </div>
                </div>

                <button
                  onClick={closeEdit}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    border: 'none',
                    background: 'var(--w4-surface-2)',
                    cursor: 'pointer',
                    color: 'var(--w4-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="x" size={21} />
                </button>
              </div>

              <div style={{ padding: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <Field
                      label="שעות פעילות"
                      value={editForm.openingHours}
                      onChange={(v) => setEdit('openingHours', v)}
                      placeholder="לדוגמה: 08:00-22:00"
                    />
                  </div>

                  <OptionGroup title="מחיר" options={PRICE_OPTIONS} value={editForm.priceRange} labels={{ low: 'נמוך', medium: 'בינוני', high: 'גבוה' }} onChange={(v) => setEdit('priceRange', v as PriceRange)} />
                  <OptionGroup title="איכות Wi-Fi" options={WIFI_OPTIONS} value={editForm.wifiQuality} labels={{ low: 'נמוכה', medium: 'בינונית', high: 'גבוהה' }} onChange={(v) => setEdit('wifiQuality', v as WifiQuality)} />
                  <OptionGroup title="רמת רעש" options={NOISE_OPTIONS} value={editForm.noiseLevel} labels={{ low: 'שקט', medium: 'בינוני', high: 'רועש' }} onChange={(v) => setEdit('noiseLevel', v as NoiseLevel)} />

                  <div>
                    <div style={labelStyle}>שקעי חשמל</div>
                    <button
                      onClick={() => setEdit('hasPowerOutlets', !editForm.hasPowerOutlets)}
                      style={{
                        width: '100%',
                        padding: '13px 0',
                        borderRadius: 'var(--w4-radius-sm)',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: 15,
                        fontWeight: 800,
                        background: editForm.hasPowerOutlets ? 'var(--w4-accent)' : 'var(--w4-surface)',
                        color: editForm.hasPowerOutlets ? 'var(--w4-on-accent)' : 'var(--w4-text)',
                      }}
                    >
                      {editForm.hasPowerOutlets ? 'יש שקעים' : 'אין מידע / אין שקעים'}
                    </button>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <Field label="תיאור" value={editForm.description} onChange={(v) => setEdit('description', v)} placeholder="תיאור קצר למשתמש" />
                  </div>

                  <Field label="אתר" value={editForm.website} onChange={(v) => setEdit('website', v)} placeholder="https://example.com" />
                  <Field label="טלפון" value={editForm.phone} onChange={(v) => setEdit('phone', v)} placeholder="03-0000000" />
                  <Field label="אימייל" value={editForm.email} onChange={(v) => setEdit('email', v)} placeholder="info@example.com" />

                  <div style={{ gridColumn: 'span 2' }}>
                    <Field
                      label="הערת כניסה / תשלום"
                      value={editForm.accessNote}
                      onChange={(v) => setEdit('accessNote', v)}
                      placeholder="לדוגמה: כניסה בתשלום, מומלץ לבדוק זמינות באתר המקום"
                    />
                  </div>
                </div>

                <div style={{ marginTop: 18 }}>
                  <div style={labelStyle}>תמונות</div>
                  <input ref={fileInput} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={(e) => onPickFiles(e.target.files)} />
                  <button
                    onClick={() => fileInput.current?.click()}
                    style={{
                      width: '100%',
                      padding: 18,
                      borderRadius: 'var(--w4-radius)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      border: '2px dashed var(--w4-border)',
                      background: 'var(--w4-surface)',
                      color: 'var(--w4-muted)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Icon name="upload" size={26} style={{ color: 'var(--w4-accent)' }} />
                    <span style={{ fontSize: 14, fontWeight: 700 }}>
                      {editFiles.length ? `${editFiles.length} תמונות חדשות יתווספו למקום` : 'הוספת תמונות למקום'}
                    </span>
                  </button>
                  <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', marginTop: 8 }}>
                    התמונות נשמרות ב־Amazon S3, וב־DynamoDB נשמר רק הקישור לתמונה.
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <Button variant="neutral" onClick={closeEdit}>ביטול</Button>
                <Button icon="check" onClick={saveEdit} disabled={savingEdit}>{savingEdit ? 'שומר…' : 'שמור שינויים'}</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dialog>
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
      <div style={labelStyle}>{title}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            style={{
              flex: 1,
              padding: '13px 0',
              borderRadius: 'var(--w4-radius-sm)',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 800,
              background: value === option ? 'var(--w4-accent)' : 'var(--w4-surface)',
              color: value === option ? 'var(--w4-on-accent)' : 'var(--w4-text)',
            }}
          >
            {labels[option] ?? option}
          </button>
        ))}
      </div>
    </div>
  );
}

const labelStyle: CSSProperties = {
  fontSize: 13.5,
  fontWeight: 700,
  color: 'var(--w4-muted)',
  marginBottom: 7,
  paddingInlineStart: 2,
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
