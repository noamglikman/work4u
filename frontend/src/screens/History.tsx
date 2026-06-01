// screens/History.tsx — the user's rating history (ported from WebHistory).
// Backed by GET /ratings/my; delete is optimistic via useRatings.

import { ApiError } from '../api';
import { useRatings } from '../hooks/useRatings';
import { useToast } from '../context/ToastContext';
import { Icon, OccPill, Photo } from '../components/ui';

export function History({ openVenue }: { openVenue: (id: string) => void }) {
  const { ratings, loading, error, remove } = useRatings();
  const { toast } = useToast();

  const onDelete = async (id: string) => {
    try {
      await remove(id);
      toast('הדירוג נמחק', 'default');
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'מחיקת הדירוג נכשלה', 'danger');
    }
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '36px 24px 60px' }}>
      <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
        הדירוגים שלי
      </h1>
      <p style={{ fontSize: 15, color: 'var(--w4-muted)', margin: '0 0 24px' }}>
        {loading ? 'טוען…' : `${ratings.length} דיווחים שתרמת לקהילה`}
      </p>

      {error ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--w4-danger)' }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>{error}</div>
        </div>
      ) : !loading && ratings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '70px 20px', color: 'var(--w4-muted)' }}>
          <div style={{ fontSize: 34, marginBottom: 8 }}>⭐️</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>עוד לא דירגת מתחמים</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, opacity: loading ? 0.5 : 1 }}>
          {ratings.map((r) => (
            <div
              key={r.ratingId}
              style={{
                background: 'var(--w4-surface)',
                borderRadius: 'var(--w4-radius)',
                padding: 14,
                boxShadow: 'var(--w4-shadow-sm)',
                display: 'flex',
                gap: 14,
                alignItems: 'center',
              }}
            >
              <div
                onClick={() => openVenue(r.venueId)}
                style={{ width: 64, height: 64, borderRadius: 13, overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}
              >
                <Photo color={r.accent} emoji={r.emoji} h={64} />
              </div>
              <div onClick={() => openVenue(r.venueId)} style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{r.venueName || 'מתחם'}</div>
                <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', margin: '2px 0 8px' }}>
                  {r.dateLabel}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <OccPill occ={r.crowdLevel} size="sm" />
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 12.5,
                      color: 'var(--w4-muted)',
                      fontWeight: 600,
                    }}
                  >
                    <Icon name="wifi" size={14} />
                    {r.wifiRating}/5
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 12.5,
                      color: 'var(--w4-muted)',
                      fontWeight: 600,
                    }}
                  >
                    <Icon name="noise" size={14} />
                    {r.noiseRating}/5
                  </span>
                </div>
              </div>
              <button
                onClick={() => onDelete(r.ratingId)}
                title="מחיקת דירוג"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  border: 'none',
                  background: 'var(--w4-surface-2)',
                  cursor: 'pointer',
                  color: 'var(--w4-danger)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name="trash" size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
