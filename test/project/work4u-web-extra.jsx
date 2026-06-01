// work4u-web-extra.jsx — WebHistory, WebProfile, WebAdminDialog, ForgotDialog, WebToast.
const { useState: useWE } = React;

// ── Toast ───────────────────────────────────────────────────
function WebToast({ toast }) {
  if (!toast) return null;
  const c = { default: ['var(--w4-text)','var(--w4-bg)'], success: ['var(--w4-success)','#fff'], danger: ['var(--w4-danger)','#fff'] }[toast.tone || 'default'];
  return (
    <div style={{ position: 'fixed', top: 78, insetInlineStart: '50%', transform: 'translateX(-50%)', zIndex: 90, display: 'flex', alignItems: 'center', gap: 10, background: c[0], color: c[1], padding: '13px 18px', borderRadius: 14, boxShadow: '0 12px 34px rgba(0,0,0,0.25)', fontSize: 14.5, fontWeight: 600, animation: 'wdrop .3s cubic-bezier(.2,.9,.3,1.2)', maxWidth: '90vw' }}>
      {toast.tone === 'success' && <Icon name="check" size={19} sw={2.4} />}
      {toast.tone === 'danger' && <Icon name="x" size={19} sw={2.4} />}
      <span>{toast.msg}</span>
    </div>
  );
}

// ── Generic centered dialog ─────────────────────────────────
function Dialog({ children, close, width = 480 }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 85, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(20,12,6,0.5)', animation: 'wfade .2s ease' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: width, maxHeight: '90vh', overflowY: 'auto', background: 'var(--w4-bg)', borderRadius: 22, boxShadow: '0 24px 60px rgba(0,0,0,0.4)', animation: 'wpop .25s cubic-bezier(.2,.9,.3,1.2)' }}>{children}</div>
    </div>
  );
}

// ── Forgot password ─────────────────────────────────────────
function ForgotDialog({ close, toast }) {
  const [email, setEmail] = useWE('');
  return (
    <Dialog close={close} width={440}>
      <div style={{ padding: 26 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h2 style={{ fontSize: 21, fontWeight: 800, margin: 0 }}>שחזור סיסמה</h2>
          <button onClick={close} style={{ width: 36, height: 36, borderRadius: 11, border: 'none', background: 'var(--w4-surface-2)', cursor: 'pointer', color: 'var(--w4-text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={20} /></button>
        </div>
        <p style={{ fontSize: 14, color: 'var(--w4-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>הזינו את כתובת האימייל ונשלח לכם קישור לאיפוס הסיסמה.</p>
        <W4Field label="כתובת אימייל" value={email} onChange={setEmail} type="email" placeholder="name@work4u.co.il" autoFocus />
        <div style={{ marginTop: 20 }}><W4Button full onClick={() => { close(); toast('קישור לאיפוס נשלח לאימייל שלך', 'success'); }}>שלח קישור איפוס</W4Button></div>
      </div>
    </Dialog>
  );
}

// ── Admin dialog ────────────────────────────────────────────
function WebAdminDialog({ close, toast, onPublish }) {
  const [f, setF] = useWE({ name: '', address: '', hours: '', price: '₪₪' });
  const [photos, setPhotos] = useWE(0);
  const [err, setErr] = useWE('');
  const set = (k, v) => setF(s => ({ ...s, [k]: v }));
  const publish = () => {
    if (!f.name.trim() || !f.address.trim() || !f.hours.trim()) { setErr('שגיאה: לא ניתן לפרסם את המתחם. חסרים שדות חובה קריטיים'); return; }
    setErr(''); onPublish && onPublish(f); close();
    setTimeout(() => toast('המתחם החדש נוסף בהצלחה למסד הנתונים ועודכן במערכת', 'success'), 60);
  };
  return (
    <Dialog close={close} width={560}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 26px 14px', borderBottom: '1px solid var(--w4-border)' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--w4-accent)', letterSpacing: '0.04em' }}>פאנל מנהל</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: '2px 0 0', letterSpacing: '-0.02em' }}>הוספת מתחם חדש</h2>
        </div>
        <button onClick={close} style={{ width: 38, height: 38, borderRadius: 12, border: 'none', background: 'var(--w4-surface-2)', cursor: 'pointer', color: 'var(--w4-text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={21} /></button>
      </div>
      <div style={{ padding: 26 }}>
        {err && <div style={{ background: 'var(--w4-danger-soft)', color: 'var(--w4-danger)', padding: '12px 14px', borderRadius: 'var(--w4-radius-sm)', fontSize: 13.5, fontWeight: 700, marginBottom: 18, lineHeight: 1.45 }}>{err}</div>}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
          <div style={{ gridColumn: 'span 2' }}><W4Field label="שם המתחם *" value={f.name} onChange={v => set('name', v)} placeholder="לדוגמה: מרחב סלון" error={err && !f.name.trim() ? 'שדה חובה' : ''} /></div>
          <div style={{ gridColumn: 'span 2' }}><W4Field label="כתובת *" value={f.address} onChange={v => set('address', v)} placeholder="רחוב, מספר, עיר" error={err && !f.address.trim() ? 'שדה חובה' : ''} /></div>
          <W4Field label="שעות פעילות *" value={f.hours} onChange={v => set('hours', v)} placeholder="08:00–22:00" error={err && !f.hours.trim() ? 'שדה חובה' : ''} />
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--w4-muted)', marginBottom: 7, paddingInlineStart: 2 }}>מחירון</div>
            <div style={{ display: 'flex', gap: 8 }}>{['₪','₪₪','₪₪₪'].map(p => <button key={p} onClick={() => set('price', p)} style={{ flex: 1, padding: '13px 0', borderRadius: 'var(--w4-radius-sm)', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, background: f.price === p ? 'var(--w4-accent)' : 'var(--w4-surface-2)', color: f.price === p ? 'var(--w4-on-accent)' : 'var(--w4-text)' }}>{p}</button>)}</div>
          </div>
        </div>
        <div style={{ marginTop: 15 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--w4-muted)', marginBottom: 7, paddingInlineStart: 2 }}>תמונות</div>
          <button onClick={() => setPhotos(p => Math.min(p + 1, 4))} style={{ width: '100%', padding: 20, borderRadius: 'var(--w4-radius)', cursor: 'pointer', fontFamily: 'inherit', border: '2px dashed var(--w4-border)', background: 'var(--w4-surface)', color: 'var(--w4-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Icon name="upload" size={26} style={{ color: 'var(--w4-accent)' }} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>{photos ? `${photos} תמונות הועלו ל-Amazon S3` : 'העלאת תמונות ל-Amazon S3'}</span>
          </button>
          {photos > 0 && <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>{Array.from({ length: photos }).map((_, i) => <div key={i} style={{ width: 56, height: 56, borderRadius: 11, overflow: 'hidden' }}><Photo color={['#C98A5A','#6E8E74','#B5613F','#7E7AA0'][i]} h={56} /></div>)}</div>}
        </div>
      </div>
      <div style={{ padding: '0 26px 24px', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <W4Button variant="neutral" onClick={close}>ביטול</W4Button>
        <W4Button icon="check" onClick={publish}>פרסם מתחם במערכת</W4Button>
      </div>
    </Dialog>
  );
}

// ── History page ────────────────────────────────────────────
function WebHistory({ history, venues, openVenue, toast, onDelete }) {
  const rows = history.map(h => ({ ...h, venue: venues.find(v => v.id === h.venueId) })).filter(r => r.venue);
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '36px 24px 60px' }}>
      <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 4px', letterSpacing: '-0.02em' }}>הדירוגים שלי</h1>
      <p style={{ fontSize: 15, color: 'var(--w4-muted)', margin: '0 0 24px' }}>{rows.length} דיווחים שתרמת לקהילה</p>
      {rows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '70px 20px', color: 'var(--w4-muted)' }}><div style={{ fontSize: 34, marginBottom: 8 }}>⭐️</div><div style={{ fontSize: 15, fontWeight: 600 }}>עוד לא דירגת מתחמים</div></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rows.map(r => (
            <div key={r.id} style={{ background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', padding: 14, boxShadow: 'var(--w4-shadow-sm)', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div onClick={() => openVenue(r.venue.id)} style={{ width: 64, height: 64, borderRadius: 13, overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}><Photo color={r.venue.photo} emoji={r.venue.emoji} h={64} /></div>
              <div onClick={() => openVenue(r.venue.id)} style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{r.venue.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', margin: '2px 0 8px' }}>{r.date} · {r.venue.area}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <OccPill occ={r.occ} size="sm" />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12.5, color: 'var(--w4-muted)', fontWeight: 600 }}><Icon name="wifi" size={14} />{r.wifi}/5</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12.5, color: 'var(--w4-muted)', fontWeight: 600 }}><Icon name="noise" size={14} />{r.noise}/5</span>
                </div>
              </div>
              <button onClick={() => { onDelete(r.id); toast('הדירוג נמחק', 'default'); }} style={{ width: 38, height: 38, borderRadius: 11, border: 'none', background: 'var(--w4-surface-2)', cursor: 'pointer', color: 'var(--w4-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="trash" size={18} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Profile page ────────────────────────────────────────────
function WebProfile({ go, isAdmin, prefs, history, toast }) {
  const summary = () => { const o = []; if (prefs.quiet) o.push('שקט'); if (prefs.power) o.push('שקעים'); if (prefs.wifi) o.push('Wi-Fi מהיר'); if (prefs.price) o.push(prefs.price); return o.length ? o.join(' · ') : 'לא הוגדרו'; };
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '36px 24px 60px' }}>
      <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 22px', letterSpacing: '-0.02em' }}>הפרופיל שלי</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', padding: 20, boxShadow: 'var(--w4-shadow-sm)', marginBottom: 16 }}>
        <div style={{ width: 66, height: 66, borderRadius: 999, background: 'var(--w4-accent)', color: 'var(--w4-on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800 }}>נ</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 19, fontWeight: 800 }}>נועה לוי {isAdmin && <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--w4-accent)', background: 'var(--w4-accent-soft)', padding: '2px 8px', borderRadius: 999, marginInlineStart: 4 }}>מנהל</span>}</div>
          <div style={{ fontSize: 14, color: 'var(--w4-muted)', direction: 'ltr', textAlign: 'right' }}>noa@work4u.co.il</div>
        </div>
        <W4Button variant="outline" size="sm" onClick={() => go('login')}>התנתקות</W4Button>
      </div>
      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
        {[['דיווחים', history.length], ['מועדפים', 3], ['נקודות', 240]].map(([l, n]) => (
          <div key={l} style={{ flex: 1, background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius-sm)', padding: '18px 8px', textAlign: 'center', boxShadow: 'var(--w4-shadow-sm)' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--w4-accent)' }}>{n}</div>
            <div style={{ fontSize: 13, color: 'var(--w4-muted)', fontWeight: 600 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', boxShadow: 'var(--w4-shadow-sm)', overflow: 'hidden' }}>
        {[
          { icon: 'sliders', label: 'העדפות עבודה', sub: summary(), onClick: () => go('prefs-edit') },
          { icon: 'bell', label: 'התראות חכמות', sub: 'מופעל · לפי מיקום' },
          { icon: 'coffee', label: 'אודות Work4U', sub: 'גרסה 1.0 · web' },
        ].map((row, i, arr) => (
          <div key={row.label} onClick={row.onClick} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '16px 18px', cursor: row.onClick ? 'pointer' : 'default', borderBottom: i < arr.length - 1 ? '1px solid var(--w4-border)' : 'none' }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--w4-accent-soft)', color: 'var(--w4-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={row.icon} size={19} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15.5, fontWeight: 600 }}>{row.label}</div>
              <div style={{ fontSize: 13, color: 'var(--w4-muted)' }}>{row.sub}</div>
            </div>
            {row.onClick && <Icon name="chevron" size={18} style={{ color: 'var(--w4-faint)', transform: 'scaleX(-1)' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { WebToast, Dialog, ForgotDialog, WebAdminDialog, WebHistory, WebProfile });
