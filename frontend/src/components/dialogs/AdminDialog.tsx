// components/dialogs/AdminDialog.tsx — admin "add venue" (ported from WebAdminDialog).
// Publishes via POST /admin/venues, then uploads any selected photos through the
// presigned-URL flow (api.storage) and patches the venue with their URLs.
//
// NOTE: the design form collects name/address/hours/price/photos. The contract's
// VenueInput also requires coordinates + wifi/noise/power/description; we send
// sensible defaults for those here. A fuller admin form (or address geocoding)
// should replace these defaults — they're marked below.

import { useMemo, useRef, useState } from 'react';
import { api, ApiError } from '../../api';
import { useToast } from '../../context/ToastContext';
import type { PriceRange, VenueInput } from '../../types/api';
import { DEFAULT_LOCATION } from '../../lib/geo';
import { PRICE_LABEL } from '../../lib/labels';
import { Button, Field, Icon, Photo } from '../ui';
import { Dialog } from './Dialog';

const PRICE_OPTIONS: PriceRange[] = ['low', 'medium', 'high'];

interface AdminDialogProps {
  close: () => void;
  onPublished?: () => void;
}

export function AdminDialog({ close, onPublished }: AdminDialogProps) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    address: '',
    hours: '',
    price: 'medium' as PriceRange,
    website: '',
    phone: '',
    email: '',
    accessNote: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  const onPickFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)].slice(0, 4));
  };

  const publish = async () => {
    if (!form.name.trim() || !form.address.trim() || !form.hours.trim()) {
      setErr('שגיאה: לא ניתן לפרסם את המתחם. חסרים שדות חובה קריטיים');
      return;
    }
    setErr('');
    setBusy(true);
    try {
      const input: VenueInput = {
        name: form.name.trim(),
        address: form.address.trim(),
        openingHours: form.hours.trim(),
        priceRange: form.price,
        // —— defaults (replace with real inputs / geocoding) ——
        latitude: DEFAULT_LOCATION.lat,
        longitude: DEFAULT_LOCATION.lng,
        wifiQuality: 'medium',
        noiseLevel: 'medium',
        hasPowerOutlets: true,
        description: form.accessNote.trim(),
        imageUrls: [],
        categoryLabel: 'מקום עבודה',
        accessNote: form.accessNote.trim(),
        contactNote: form.website.trim() || form.phone.trim() || form.email.trim()
          ? 'מומלץ לבדוק זמינות, שעות פעילות ותנאי כניסה מול המקום.'
          : '',
        website: form.website.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
      };

      const { venueId } = await api.venues.create(input);

      if (files.length > 0) {
        const imageUrls: string[] = [];
        for (const file of files) {
          imageUrls.push(await api.storage.uploadVenuePhoto(venueId, file));
        }
        await api.venues.update(venueId, { ...input, imageUrls });
      }

      close();
      onPublished?.();
      setTimeout(() => toast('המתחם החדש נוסף בהצלחה למסד הנתונים ועודכן במערכת', 'success'), 60);
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : 'פרסום המתחם נכשל, נסו שוב');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog close={close} width={560}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 26px 14px',
          borderBottom: '1px solid var(--w4-border)',
        }}
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--w4-accent)', letterSpacing: '0.04em' }}>
            פאנל מנהל
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: '2px 0 0', letterSpacing: '-0.02em' }}>
            הוספת מתחם חדש
          </h2>
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
      <div style={{ padding: 26 }}>
        {err && (
          <div
            style={{
              background: 'var(--w4-danger-soft)',
              color: 'var(--w4-danger)',
              padding: '12px 14px',
              borderRadius: 'var(--w4-radius-sm)',
              fontSize: 13.5,
              fontWeight: 700,
              marginBottom: 18,
              lineHeight: 1.45,
            }}
          >
            {err}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
          <div style={{ gridColumn: 'span 2' }}>
            <Field
              label="שם המתחם *"
              value={form.name}
              onChange={(v) => set('name', v)}
              placeholder="לדוגמה: מרחב סלון"
              error={err && !form.name.trim() ? 'שדה חובה' : ''}
            />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <Field
              label="כתובת *"
              value={form.address}
              onChange={(v) => set('address', v)}
              placeholder="רחוב, מספר, עיר"
              error={err && !form.address.trim() ? 'שדה חובה' : ''}
            />
          </div>
          <Field
            label="שעות פעילות *"
            value={form.hours}
            onChange={(v) => set('hours', v)}
            placeholder="08:00-22:00"
            error={err && !form.hours.trim() ? 'שדה חובה' : ''}
          />
          <Field
            label="אתר"
            value={form.website}
            onChange={(v) => set('website', v)}
            placeholder="https://example.com"
          />
          <Field
            label="טלפון"
            value={form.phone}
            onChange={(v) => set('phone', v)}
            placeholder="03-0000000"
          />
          <Field
            label="אימייל"
            value={form.email}
            onChange={(v) => set('email', v)}
            placeholder="info@example.com"
          />
          <div style={{ gridColumn: 'span 2' }}>
            <Field
              label="הערת כניסה / תשלום"
              value={form.accessNote}
              onChange={(v) => set('accessNote', v)}
              placeholder="לדוגמה: כניסה בתשלום, יש לבדוק זמינות מול המקום"
            />
          </div>
          <div>
            <div
              style={{
                fontSize: 13.5,
                fontWeight: 600,
                color: 'var(--w4-muted)',
                marginBottom: 7,
                paddingInlineStart: 2,
              }}
            >
              מחירון
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {PRICE_OPTIONS.map((p) => (
                <button
                  key={p}
                  onClick={() => set('price', p)}
                  style={{
                    flex: 1,
                    padding: '13px 0',
                    borderRadius: 'var(--w4-radius-sm)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 15,
                    fontWeight: 700,
                    background: form.price === p ? 'var(--w4-accent)' : 'var(--w4-surface-2)',
                    color: form.price === p ? 'var(--w4-on-accent)' : 'var(--w4-text)',
                  }}
                >
                  {PRICE_LABEL[p]}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 15 }}>
          <div
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              color: 'var(--w4-muted)',
              marginBottom: 7,
              paddingInlineStart: 2,
            }}
          >
            תמונות
          </div>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => onPickFiles(e.target.files)}
          />
          <button
            onClick={() => fileInput.current?.click()}
            style={{
              width: '100%',
              padding: 20,
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
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              {files.length ? `${files.length} תמונות נבחרו להעלאה ל-Amazon S3` : 'העלאת תמונות ל-Amazon S3'}
            </span>
          </button>
          {previews.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              {previews.map((src, i) => (
                <div key={i} style={{ width: 56, height: 56, borderRadius: 11, overflow: 'hidden' }}>
                  <Photo h={56} src={src} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: '0 26px 24px', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <Button variant="neutral" onClick={close}>
          ביטול
        </Button>
        <Button icon="check" onClick={publish} disabled={busy}>
          {busy ? 'מפרסם…' : 'פרסם מתחם במערכת'}
        </Button>
      </div>
    </Dialog>
  );
}
