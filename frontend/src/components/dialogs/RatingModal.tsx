// components/dialogs/RatingModal.tsx — community report (ported from RatingModal).
// Submits POST /ratings with { venueId, crowdLevel, wifiRating, noiseRating }.

import { useState } from 'react';
import { api, ApiError } from '../../api';
import { useToast } from '../../context/ToastContext';
import type { CrowdLevel } from '../../types/api';
import { Button, Icon, Stars } from '../ui';

interface RatingModalProps {
  target: { id: string; name: string; placeType?: string };
  close: () => void;
  onSubmitted?: () => void;
}

const OCC_BUTTONS: Array<{ k: CrowdLevel; label: string; color: string }> = [
  { k: 'free', label: 'פנוי', color: 'var(--w4-success)' },
  { k: 'reasonable', label: 'סביר', color: 'var(--w4-warn)' },
  { k: 'crowded', label: 'עמוס מאוד', color: 'var(--w4-danger)' },
];

export function RatingModal({ target, close, onSubmitted }: RatingModalProps) {
  const { toast } = useToast();
  const [crowd, setCrowd] = useState<CrowdLevel | null>(null);
  const [wifi, setWifi] = useState(0);
  const [noise, setNoise] = useState(0);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    try {
      await api.ratings.submit({
        venueId: target.id,
        crowdLevel: crowd ?? 'reasonable',
        wifiRating: wifi || 4,
        noiseRating: noise || 3,
      });

      const inferredRating = 4;

      await api.learning
        .record({
          type: 'rating',
          venueId: target.id,
          placeType: (target as any).placeType,
          rating: inferredRating,
        })
        .catch(() => {
          // Learning is best-effort and should not block rating submission.
        });

      close();
      onSubmitted?.();
      setTimeout(() => toast('תודה רבה! הדיווח שלך נקלט בהצלחה ועוזר לדייק את התוצאות', 'success'), 60);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'שליחת הדיווח נכשלה', 'danger');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 86,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 22,
      }}
    >
      <div
        onClick={close}
        style={{ position: 'absolute', inset: 0, background: 'rgba(20,12,6,0.5)', animation: 'wfade .25s ease' }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 430,
          background: 'var(--w4-bg)',
          borderRadius: 26,
          padding: 22,
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          animation: 'wpop .3s cubic-bezier(.2,.9,.3,1.3)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 4,
          }}
        >
          <h2 style={{ fontSize: 19, fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.32 }}>
            איך כרגע ב{target.name}?
          </h2>
          <button
            onClick={close}
            style={{
              width: 34,
              height: 34,
              borderRadius: 11,
              border: 'none',
              background: 'var(--w4-surface-2)',
              cursor: 'pointer',
              color: 'var(--w4-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon name="x" size={19} />
          </button>
        </div>
        <p style={{ fontSize: 13.5, color: 'var(--w4-muted)', margin: '4px 0 18px' }}>
          הדיווח שלך מתעדכן מיידית עבור כל הקהילה.
        </p>

        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 9 }}>רמת העומס</div>
        <div style={{ display: 'flex', gap: 9, marginBottom: 20 }}>
          {OCC_BUTTONS.map((b) => {
            const on = crowd === b.k;
            return (
              <button
                key={b.k}
                onClick={() => setCrowd(b.k)}
                style={{
                  flex: 1,
                  padding: '14px 4px',
                  borderRadius: 16,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 13.5,
                  fontWeight: 800,
                  transition: 'all .15s',
                  border: 'none',
                  background: on ? b.color : 'var(--w4-surface)',
                  color: on ? '#fff' : 'var(--w4-text)',
                  boxShadow: on
                    ? `0 6px 16px color-mix(in srgb, ${b.color} 40%, transparent)`
                    : 'var(--w4-shadow-sm)',
                  transform: on ? 'translateY(-2px)' : 'none',
                }}
              >
                {b.label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            background: 'var(--w4-surface)',
            borderRadius: 'var(--w4-radius)',
            padding: '4px 16px',
            boxShadow: 'var(--w4-shadow-sm)',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', padding: '13px 0' }}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flex: 1,
                fontSize: 14.5,
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              <Icon name="wifi" size={19} style={{ color: 'var(--w4-accent)' }} />
              איכות Wi-Fi
            </span>
            <Stars value={wifi} onRate={setWifi} size={22} gap={3} />
          </div>
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', padding: '13px 0' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, fontSize: 14.5, fontWeight: 600 }}>
              <Icon name="noise" size={19} style={{ color: 'var(--w4-accent)' }} />
              רמת שקט
            </span>
            <Stars value={noise} onRate={setNoise} size={22} gap={3} />
          </div>
        </div>

        <Button full onClick={submit} icon="check" disabled={busy}>
          {busy ? 'שולח…' : 'שלח דיווח'}
        </Button>
      </div>
    </div>
  );
}
