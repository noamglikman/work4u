// work4u-web-auth.jsx — web Login, SignUp, Preferences. Exports to window.
const { useState: useWA } = React;

function AuthBrand() {
  return (
    <div className="w4-auth-brand" style={{
      position: 'relative', overflow: 'hidden', color: 'var(--w4-on-accent)',
      background: 'linear-gradient(150deg, var(--w4-accent), var(--w4-accent-2))',
      padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ position: 'absolute', top: -120, insetInlineEnd: -100, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', bottom: -90, insetInlineStart: -70, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 800, direction: 'ltr' }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="coffee" size={26} stroke="#FFF8F2" sw={1.9} /></div>
        Work4U
      </div>
      <div style={{ position: 'relative' }}>
        <h2 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 16px' }}>מקום העבודה המושלם נמצא במרחק לחיצה</h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, opacity: 0.92, maxWidth: 420 }}>בתי קפה וחללי עבודה מותאמים בדיוק להעדפות שלך — שקט, שקעים, אינטרנט מהיר ותחזית עומס בזמן אמת.</p>
        <div style={{ display: 'flex', gap: 26, marginTop: 34 }}>
          {[['1,200+','מתחמים'],['18K','דירוגים'],['4.7★','דירוג ממוצע']].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontSize: 26, fontWeight: 800 }}>{n}</div>
              <div style={{ fontSize: 13.5, opacity: 0.85 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative', fontSize: 13, opacity: 0.7 }}>© 2026 Work4U · לעבוד מכל מקום</div>
    </div>
  );
}

function FormWrap({ children }) {
  return (
    <div className="w4-auth-form" style={{ background: 'var(--w4-bg)' }}>
      <div style={{ width: '100%', maxWidth: 410 }}>{children}</div>
    </div>
  );
}

// ── Login ───────────────────────────────────────────────────
function WebLogin({ go, toast, setAdminMode, openForgot }) {
  const [email, setEmail] = useWA('');
  const [pw, setPw] = useWA('');
  const [showPw, setShowPw] = useWA(false);
  const [err, setErr] = useWA('');
  const [asAdmin, setAsAdmin] = useWA(false);

  const submit = () => {
    if (!email.trim() || !pw.trim()) { setErr('שגיאה: שם המשתמש או הסיסמה אינם נכונים, אנא נסה שנית'); return; }
    setErr(''); setAdminMode(asAdmin);
    toast('התחברת בהצלחה, מועבר למסך הבית', 'success');
    setTimeout(() => go('home'), 650);
  };

  return (
    <div className="w4-auth">
      <FormWrap>
        <div style={{ marginBottom: 30 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>ברוכים השבים 👋</h1>
          <p style={{ fontSize: 15.5, color: 'var(--w4-muted)', margin: 0, lineHeight: 1.5 }}>התחברו כדי למצוא את מקום העבודה שלכם להיום.</p>
        </div>
        {err && <div style={{ background: 'var(--w4-danger-soft)', color: 'var(--w4-danger)', padding: '12px 14px', borderRadius: 'var(--w4-radius-sm)', fontSize: 13.5, fontWeight: 600, marginBottom: 18, lineHeight: 1.45 }}>{err}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <W4Field label="כתובת אימייל" value={email} onChange={setEmail} type="email" placeholder="name@work4u.co.il" />
          <W4Field label="סיסמה" value={pw} onChange={setPw} type={showPw ? 'text' : 'password'} placeholder="••••••••" trailing={showPw ? 'eyeoff' : 'eye'} onTrailing={() => setShowPw(s => !s)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 12 }}>
          <button onClick={openForgot} style={{ border: 'none', background: 'none', color: 'var(--w4-accent)', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', padding: 2, whiteSpace: 'nowrap' }}>שכחתי סיסמה</button>
        </div>
        <div style={{ display: 'flex', gap: 8, background: 'var(--w4-surface-2)', padding: 5, borderRadius: 999, marginTop: 22 }}>
          {[['user','משתמש'],['admin','מנהל']].map(([k,l]) => {
            const on = (k === 'admin') === asAdmin;
            return <button key={k} onClick={() => setAsAdmin(k === 'admin')} style={{ flex: 1, border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '10px 0', borderRadius: 999, fontSize: 14, fontWeight: 700, background: on ? 'var(--w4-surface)' : 'transparent', color: on ? 'var(--w4-accent)' : 'var(--w4-muted)', boxShadow: on ? 'var(--w4-shadow-sm)' : 'none', transition: 'all .15s' }}>{l}</button>;
          })}
        </div>
        <div style={{ marginTop: 22 }}><W4Button full onClick={submit}>התחברות</W4Button></div>
        <div style={{ marginTop: 26, textAlign: 'center', fontSize: 14.5, color: 'var(--w4-muted)' }}>
          משתמש חדש?{' '}
          <button onClick={() => go('signup')} style={{ border: 'none', background: 'none', color: 'var(--w4-accent)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14.5 }}>הרשמה</button>
        </div>
      </FormWrap>
      <AuthBrand />
    </div>
  );
}

// ── Sign Up ─────────────────────────────────────────────────
function WebSignup({ go, toast }) {
  const [email, setEmail] = useWA('');
  const [pw, setPw] = useWA('');
  const [pw2, setPw2] = useWA('');
  const [showPw, setShowPw] = useWA(false);
  const [errs, setErrs] = useWA({});

  const submit = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'יש להזין כתובת אימייל תקינה';
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw)) e.pw = 'שגיאה: הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה ומספר';
    if (pw2 !== pw || !pw2) e.pw2 = 'הסיסמאות אינן תואמות';
    setErrs(e);
    if (Object.keys(e).length) return;
    toast('החשבון נוצר בהצלחה! בוא נגדיר את סביבת העבודה שלך', 'success');
    setTimeout(() => go('prefs'), 750);
  };

  return (
    <div className="w4-auth">
      <FormWrap>
        <div style={{ marginBottom: 26 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>יצירת חשבון</h1>
          <p style={{ fontSize: 15.5, color: 'var(--w4-muted)', margin: 0, lineHeight: 1.5 }}>הצטרפו לקהילת העובדים החכמים של Work4U.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <W4Field label="כתובת אימייל" value={email} onChange={setEmail} type="email" placeholder="name@work4u.co.il" error={errs.email} />
          <W4Field label="סיסמה" value={pw} onChange={setPw} type={showPw ? 'text' : 'password'} placeholder="לפחות 8 תווים, אות גדולה ומספר" trailing={showPw ? 'eyeoff' : 'eye'} onTrailing={() => setShowPw(s => !s)} error={errs.pw} />
          <W4Field label="אימות סיסמה" value={pw2} onChange={setPw2} type={showPw ? 'text' : 'password'} placeholder="הקלידו את הסיסמה שוב" error={errs.pw2} />
        </div>
        <div style={{ marginTop: 24 }}><W4Button full onClick={submit}>צור חשבון</W4Button></div>
        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14.5, color: 'var(--w4-muted)' }}>
          כבר רשומים?{' '}
          <button onClick={() => go('login')} style={{ border: 'none', background: 'none', color: 'var(--w4-accent)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14.5 }}>התחברו</button>
        </div>
      </FormWrap>
      <AuthBrand />
    </div>
  );
}

// ── Preferences (centered card) ─────────────────────────────
function WebPrefs({ go, toast, prefs, setPrefs, onboarding = true }) {
  const set = (k, v) => setPrefs(p => ({ ...p, [k]: v }));
  const ToggleRow = ({ icon, label, sub, k }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '15px 0' }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--w4-accent-soft)', color: 'var(--w4-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={icon} size={20} /></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15.5, fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', marginTop: 1 }}>{sub}</div>}
      </div>
      <button onClick={() => set(k, !prefs[k])} style={{ width: 50, height: 30, borderRadius: 999, border: 'none', cursor: 'pointer', position: 'relative', background: prefs[k] ? 'var(--w4-accent)' : 'var(--w4-surface-2)', transition: 'background .2s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 3, insetInlineStart: prefs[k] ? 23 : 3, width: 24, height: 24, borderRadius: 999, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'inset-inline-start .2s' }} />
      </button>
    </div>
  );
  const Card = ({ title, children }) => (
    <div style={{ background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', padding: '6px 20px 14px', boxShadow: 'var(--w4-shadow-sm)' }}>
      {title && <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--w4-muted)', textTransform: 'uppercase', letterSpacing: '0.03em', padding: '16px 0 4px' }}>{title}</div>}
      {children}
    </div>
  );
  const seatOpts = ['ספה נוחה', 'שולחן עבודה', 'בר', 'חדר שקט'];
  const priceOpts = ['₪', '₪₪', '₪₪₪'];

  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '40px 24px 60px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>{onboarding ? 'נגדיר את ההעדפות שלך' : 'פרופיל והעדפות'}</h1>
        <p style={{ fontSize: 15.5, color: 'var(--w4-muted)', margin: 0, lineHeight: 1.5 }}>נתאים עבורך אוטומטית את התוצאות הטובות ביותר.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card title="סביבת עבודה">
          <ToggleRow icon="noise" label="סביבה שקטה" sub="עדיפות למקומות עם רעש נמוך" k="quiet" />
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <ToggleRow icon="power" label="צורך בשקעי חשמל" sub="להציג רק מקומות עם שקעים זמינים" k="power" />
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <ToggleRow icon="wifi" label="אינטרנט מהיר חובה" sub="Wi-Fi איכותי ויציב" k="wifi" />
        </Card>
        <Card title="סוג ישיבה מועדף">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, padding: '14px 0 18px' }}>
            {seatOpts.map(s => <Tag key={s} active={prefs.seat === s} onClick={() => set('seat', s)}>{s}</Tag>)}
          </div>
        </Card>
        <Card title="טווח מחירים">
          <div style={{ display: 'flex', gap: 10, padding: '14px 0 18px' }}>
            {priceOpts.map(p => (
              <button key={p} onClick={() => set('price', p)} style={{ flex: 1, padding: '14px 0', borderRadius: 'var(--w4-radius-sm)', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, transition: 'all .15s', background: prefs.price === p ? 'var(--w4-accent)' : 'var(--w4-surface-2)', color: prefs.price === p ? 'var(--w4-on-accent)' : 'var(--w4-text)' }}>{p}</button>
            ))}
          </div>
        </Card>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
        {!onboarding && <W4Button variant="neutral" onClick={() => go('home')}>ביטול</W4Button>}
        <W4Button onClick={() => { toast('הפרופיל האישי שלך עודכן בהצלחה! התוצאות יותאמו עבורך אוטומטית', 'success'); setTimeout(() => go('home'), 700); }} style={{ minWidth: 200 }}>
          {onboarding ? 'שמור פרופיל והמשך' : 'שמור שינויים'}
        </W4Button>
      </div>
    </div>
  );
}

Object.assign(window, { WebLogin, WebSignup, WebPrefs, AuthBrand });
