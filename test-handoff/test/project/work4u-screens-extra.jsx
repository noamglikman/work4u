// work4u-screens-extra.jsx — Rating modal, Push banner, Admin panel, History, Profile.
const { useState: useStateE } = React;

// ── Push notification banner ────────────────────────────────
function PushBanner({ venue, onOpen, onClose }) {
  if (!venue) return null;
  return (
    <div style={{ position: 'absolute', top: 50, insetInline: 12, zIndex: 75, animation: 'w4drop .4s cubic-bezier(.2,.9,.3,1.3)' }}>
      <div onClick={onOpen} style={{
        display: 'flex', alignItems: 'center', gap: 12, background: 'var(--w4-surface)',
        borderRadius: 20, padding: '12px 14px', boxShadow: '0 12px 34px rgba(0,0,0,0.22)', cursor: 'pointer',
        border: '1px solid var(--w4-border)',
      }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--w4-accent)', color: 'var(--w4-on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="bell" size={22} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 1 }}>Work4U</div>
          <div style={{ fontSize: 13, color: 'var(--w4-text)', lineHeight: 1.4 }}>ביקרת ב<strong>{venue.name}</strong>? ספר לנו איך היה כדי שנעניק לך את התוצאות הטובות ביותר!</div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ border: 'none', background: 'none', color: 'var(--w4-faint)', cursor: 'pointer', padding: 2, alignSelf: 'flex-start' }}><Icon name="x" size={18} /></button>
      </div>
    </div>
  );
}

// ── Rating modal (panel 5) ──────────────────────────────────
function RatingModal({ venue, close, toast, onSubmit }) {
  const [occ, setOcc] = useStateE(null);
  const [wifi, setWifi] = useStateE(0);
  const [noise, setNoise] = useStateE(0);

  const submit = () => {
    onSubmit({ venueId: venue.id, occ: occ || 'ok', wifi: wifi || 4, noise: noise || 3 });
    close();
    setTimeout(() => toast('תודה רבה! הדיווח שלך נקלט בהצלחה ועוזר לדייק את התוצאות', 'success'), 60);
  };

  const occBtns = [
    { k: 'free', label: 'פנוי', color: 'var(--w4-success)' },
    { k: 'ok', label: 'סביר', color: 'var(--w4-warn)' },
    { k: 'busy', label: 'עמוס מאוד', color: 'var(--w4-danger)' },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 78, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 22 }}>
      <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(20,12,6,0.5)', animation: 'w4fade .25s ease' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 430, background: 'var(--w4-bg)', borderRadius: 26, padding: 22, boxShadow: '0 20px 50px rgba(0,0,0,0.35)', animation: 'w4pop .3s cubic-bezier(.2,.9,.3,1.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.32 }}>איך כרגע ב{venue.name}?</h2>
          <button onClick={close} style={{ width: 34, height: 34, borderRadius: 11, border: 'none', background: 'var(--w4-surface-2)', cursor: 'pointer', color: 'var(--w4-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="x" size={19} /></button>
        </div>
        <p style={{ fontSize: 13.5, color: 'var(--w4-muted)', margin: '4px 0 18px' }}>הדיווח שלך מתעדכן מיידית עבור כל הקהילה.</p>

        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 9 }}>רמת העומס</div>
        <div style={{ display: 'flex', gap: 9, marginBottom: 20 }}>
          {occBtns.map(b => {
            const on = occ === b.k;
            return (
              <button key={b.k} onClick={() => setOcc(b.k)} style={{
                flex: 1, padding: '14px 4px', borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 13.5, fontWeight: 800, transition: 'all .15s', border: 'none',
                background: on ? b.color : 'var(--w4-surface)', color: on ? '#fff' : 'var(--w4-text)',
                boxShadow: on ? `0 6px 16px color-mix(in srgb, ${b.color} 40%, transparent)` : 'var(--w4-shadow-sm)',
                transform: on ? 'translateY(-2px)' : 'none',
              }}>{b.label}</button>
            );
          })}
        </div>

        <div style={{ background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', padding: '4px 16px', boxShadow: 'var(--w4-shadow-sm)', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '13px 0' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap' }}><Icon name="wifi" size={19} style={{ color: 'var(--w4-accent)' }} />איכות Wi-Fi</span>
            <Stars value={wifi} onRate={setWifi} size={22} gap={3} />
          </div>
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', padding: '13px 0' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, fontSize: 14.5, fontWeight: 600 }}><Icon name="noise" size={19} style={{ color: 'var(--w4-accent)' }} />רמת שקט</span>
            <Stars value={noise} onRate={setNoise} size={22} gap={3} />
          </div>
        </div>

        <W4Button full onClick={submit} icon="check">שלח דיווח</W4Button>
      </div>
    </div>
  );
}

// ── Admin panel (panel 6) — full cover sheet ────────────────
function AdminPanel({ close, toast, onPublish }) {
  const [f, setF] = useStateE({ name: '', address: '', hours: '', price: '₪₪' });
  const [photos, setPhotos] = useStateE(0);
  const [err, setErr] = useStateE('');
  const set = (k, v) => setF(s => ({ ...s, [k]: v }));

  const publish = () => {
    if (!f.name.trim() || !f.address.trim() || !f.hours.trim()) {
      setErr('שגיאה: לא ניתן לפרסם את המתחם. חסרים שדות חובה קריטיים');
      return;
    }
    setErr('');
    onPublish && onPublish(f);
    close();
    setTimeout(() => toast('המתחם החדש נוסף בהצלחה למסד הנתונים ועודכן במערכת', 'success'), 60);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 72, background: 'var(--w4-bg)', animation: 'w4slideup .32s cubic-bezier(.2,.9,.3,1)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 20px 12px', borderBottom: '1px solid var(--w4-border)' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--w4-accent)', letterSpacing: '0.04em' }}>פאנל מנהל</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: '2px 0 0', letterSpacing: '-0.02em' }}>הוספת מתחם חדש</h2>
        </div>
        <button onClick={close} style={{ width: 38, height: 38, borderRadius: 12, border: 'none', background: 'var(--w4-surface-2)', cursor: 'pointer', color: 'var(--w4-text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={21} /></button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 30px' }}>
        {err && <div style={{ background: 'var(--w4-danger-soft)', color: 'var(--w4-danger)', padding: '12px 14px', borderRadius: 'var(--w4-radius-sm)', fontSize: 13.5, fontWeight: 700, marginBottom: 16, lineHeight: 1.45 }}>{err}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <W4Field label="שם המתחם *" value={f.name} onChange={v => set('name', v)} placeholder="לדוגמה: מרחב סלון" error={err && !f.name.trim() ? 'שדה חובה' : ''} />
          <W4Field label="כתובת *" value={f.address} onChange={v => set('address', v)} placeholder="רחוב, מספר, עיר" error={err && !f.address.trim() ? 'שדה חובה' : ''} />
          <W4Field label="שעות פעילות *" value={f.hours} onChange={v => set('hours', v)} placeholder="08:00–22:00" error={err && !f.hours.trim() ? 'שדה חובה' : ''} />

          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--w4-muted)', marginBottom: 7, paddingInlineStart: 2 }}>מחירון</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['₪','₪₪','₪₪₪'].map(p => (
                <button key={p} onClick={() => set('price', p)} style={{ flex: 1, padding: '13px 0', borderRadius: 'var(--w4-radius-sm)', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, background: f.price === p ? 'var(--w4-accent)' : 'var(--w4-surface-2)', color: f.price === p ? 'var(--w4-on-accent)' : 'var(--w4-text)' }}>{p}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--w4-muted)', marginBottom: 7, paddingInlineStart: 2 }}>תמונות</div>
            <button onClick={() => setPhotos(p => Math.min(p + 1, 4))} style={{
              width: '100%', padding: '22px', borderRadius: 'var(--w4-radius)', cursor: 'pointer', fontFamily: 'inherit',
              border: '2px dashed var(--w4-border)', background: 'var(--w4-surface)', color: 'var(--w4-muted)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
              <Icon name="upload" size={26} style={{ color: 'var(--w4-accent)' }} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>{photos ? `${photos} תמונות הועלו ל-Amazon S3` : 'העלאת תמונות ל-Amazon S3'}</span>
            </button>
            {photos > 0 && (
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                {Array.from({ length: photos }).map((_, i) => <div key={i} style={{ width: 56, height: 56, borderRadius: 11, overflow: 'hidden' }}><Photo color={['#C98A5A','#6E8E74','#B5613F','#7E7AA0'][i]} h={56} /></div>)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 20px 26px', borderTop: '1px solid var(--w4-border)' }}>
        <W4Button full onClick={publish} icon="check">פרסם מתחם במערכת</W4Button>
      </div>
    </div>
  );
}

// ── Ratings history (screen 7) ──────────────────────────────
function HistoryScreen({ history, venues, openVenue, toast, onDelete }) {
  const rows = history.map(h => ({ ...h, venue: venues.find(v => v.id === h.venueId) })).filter(r => r.venue);
  return (
    <div style={{ padding: '54px 20px 96px', minHeight: '100%' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>הדירוגים שלי</h1>
      <p style={{ fontSize: 14.5, color: 'var(--w4-muted)', margin: '0 0 20px' }}>{rows.length} דיווחים שתרמת לקהילה</p>

      {rows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--w4-muted)' }}>
          <div style={{ fontSize: 34, marginBottom: 8 }}>⭐️</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>עוד לא דירגת מתחמים</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rows.map(r => (
            <div key={r.id} style={{ background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', padding: 12, boxShadow: 'var(--w4-shadow-sm)', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div onClick={() => openVenue(r.venue.id)} style={{ width: 58, height: 58, borderRadius: 13, overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}><Photo color={r.venue.photo} emoji={r.venue.emoji} h={58} /></div>
              <div onClick={() => openVenue(r.venue.id)} style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}>
                <div style={{ fontWeight: 700, fontSize: 15.5 }}>{r.venue.name}</div>
                <div style={{ fontSize: 12, color: 'var(--w4-muted)', margin: '2px 0 7px' }}>{r.date}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <OccPill occ={r.occ} size="sm" />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, color: 'var(--w4-muted)', fontWeight: 600 }}><Icon name="wifi" size={14} />{r.wifi}/5</span>
                </div>
              </div>
              <button onClick={() => { onDelete(r.id); toast('הדירוג נמחק', 'default'); }} style={{ width: 36, height: 36, borderRadius: 11, border: 'none', background: 'var(--w4-surface-2)', cursor: 'pointer', color: 'var(--w4-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="trash" size={18} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Profile screen ──────────────────────────────────────────
function ProfileScreen({ go, isAdmin, prefs, history, toast }) {
  return (
    <div style={{ padding: '54px 20px 96px', minHeight: '100%' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 20px', letterSpacing: '-0.02em' }}>הפרופיל שלי</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 15, background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', padding: 16, boxShadow: 'var(--w4-shadow-sm)', marginBottom: 16 }}>
        <div style={{ width: 60, height: 60, borderRadius: 999, background: 'var(--w4-accent)', color: 'var(--w4-on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800 }}>נ</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>נועה לוי {isAdmin && <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--w4-accent)', background: 'var(--w4-accent-soft)', padding: '2px 8px', borderRadius: 999, marginInlineStart: 4 }}>מנהל</span>}</div>
          <div style={{ fontSize: 13.5, color: 'var(--w4-muted)', direction: 'ltr', textAlign: 'right' }}>noa@work4u.co.il</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {[['דיווחים', history.length], ['מועדפים', 3], ['נקודות', 240]].map(([l, n]) => (
          <div key={l} style={{ flex: 1, background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius-sm)', padding: '14px 8px', textAlign: 'center', boxShadow: 'var(--w4-shadow-sm)' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--w4-accent)' }}>{n}</div>
            <div style={{ fontSize: 12, color: 'var(--w4-muted)', fontWeight: 600 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', boxShadow: 'var(--w4-shadow-sm)', overflow: 'hidden' }}>
        {[
          { icon: 'sliders', label: 'העדפות עבודה', sub: prefsSummary(prefs), onClick: () => go('prefs-edit', 'fwd') },
          { icon: 'bell', label: 'התראות חכמות', sub: 'מופעל · לפי מיקום' },
          { icon: 'coffee', label: 'אודות Work4U', sub: 'גרסה 1.0' },
        ].map((row, i, arr) => (
          <div key={row.label} onClick={row.onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: row.onClick ? 'pointer' : 'default', borderBottom: i < arr.length - 1 ? '1px solid var(--w4-border)' : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: 'var(--w4-accent-soft)', color: 'var(--w4-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={row.icon} size={19} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15.5, fontWeight: 600 }}>{row.label}</div>
              <div style={{ fontSize: 12.5, color: 'var(--w4-muted)' }}>{row.sub}</div>
            </div>
            <Icon name="chevron" size={18} style={{ color: 'var(--w4-faint)', transform: 'scaleX(-1)' }} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <W4Button full variant="outline" onClick={() => go('login', 'back')}>התנתקות</W4Button>
      </div>
    </div>
  );
}

function prefsSummary(p) {
  const out = [];
  if (p.quiet) out.push('שקט');
  if (p.power) out.push('שקעים');
  if (p.wifi) out.push('Wi-Fi מהיר');
  if (p.price) out.push(p.price);
  return out.length ? out.join(' · ') : 'לא הוגדרו';
}

Object.assign(window, { PushBanner, RatingModal, AdminPanel, HistoryScreen, ProfileScreen });
