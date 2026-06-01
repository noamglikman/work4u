// work4u-screens-auth.jsx — Logo, Login, SignUp, Preferences. Exports to window.
const { useState: useStateA } = React;

// ── Logo ────────────────────────────────────────────────────
function Logo({ size = 1, light }) {
  const fg = light ? '#FFF8F2' : 'var(--w4-text)';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 11 * size }}>
      <div style={{
        width: 46 * size, height: 46 * size, borderRadius: 15 * size,
        background: 'var(--w4-accent)', color: 'var(--w4-on-accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'var(--w4-shadow-sm)', flexShrink: 0,
      }}>
        <Icon name="coffee" size={26 * size} sw={1.9} />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 26 * size, fontWeight: 800, letterSpacing: '-0.02em', color: fg, direction: 'ltr' }}>
        Work<span style={{ color: 'var(--w4-accent)' }}>4U</span>
      </div>
    </div>
  );
}

// ── Login ───────────────────────────────────────────────────
function LoginScreen({ go, toast, openSheet, setAdminMode }) {
  const [email, setEmail] = useStateA('');
  const [pw, setPw] = useStateA('');
  const [showPw, setShowPw] = useStateA(false);
  const [err, setErr] = useStateA('');
  const [asAdmin, setAsAdmin] = useStateA(false);

  const submit = () => {
    if (!email.trim() || !pw.trim()) {
      setErr('שגיאה: שם המשתמש או הסיסמה אינם נכונים, אנא נסה שנית');
      return;
    }
    setErr('');
    setAdminMode(asAdmin);
    toast('התחברת בהצלחה, מיד מועבר למסך הבית', 'success');
    setTimeout(() => go('home'), 700);
  };

  return (
    <div style={{ padding: '8px 24px 32px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingTop: 26, paddingBottom: 30 }}><Logo size={1.05} /></div>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em' }}>ברוכים השבים 👋</h1>
        <p style={{ fontSize: 15.5, color: 'var(--w4-muted)', margin: 0, lineHeight: 1.5 }}>התחברו כדי למצוא את מקום העבודה המושלם לכם היום.</p>
      </div>

      {err && (
        <div style={{ background: 'var(--w4-danger-soft)', color: 'var(--w4-danger)', padding: '12px 14px', borderRadius: 'var(--w4-radius-sm)', fontSize: 13.5, fontWeight: 600, marginBottom: 16, lineHeight: 1.45 }}>{err}</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <W4Field label="כתובת אימייל" value={email} onChange={setEmail} type="email" placeholder="name@work4u.co.il" />
        <W4Field label="סיסמה" value={pw} onChange={setPw} type={showPw ? 'text' : 'password'} placeholder="••••••••"
          trailing={showPw ? 'eyeoff' : 'eye'} onTrailing={() => setShowPw(s => !s)} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 12 }}>
        <button onClick={() => openSheet('forgot')} style={{ border: 'none', background: 'none', color: 'var(--w4-accent)', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', padding: 2, whiteSpace: 'nowrap' }}>שכחתי סיסמה</button>
      </div>

      {/* role toggle (demo) */}
      <div style={{ display: 'flex', gap: 8, background: 'var(--w4-surface-2)', padding: 5, borderRadius: 999, marginTop: 22 }}>
        {[['user','משתמש'],['admin','מנהל']].map(([k,l]) => {
          const on = (k === 'admin') === asAdmin;
          return (
            <button key={k} onClick={() => setAsAdmin(k === 'admin')} style={{
              flex: 1, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              padding: '9px 0', borderRadius: 999, fontSize: 14, fontWeight: 700,
              background: on ? 'var(--w4-surface)' : 'transparent',
              color: on ? 'var(--w4-accent)' : 'var(--w4-muted)',
              boxShadow: on ? 'var(--w4-shadow-sm)' : 'none', transition: 'all .15s',
            }}>{l}</button>
          );
        })}
      </div>

      <div style={{ marginTop: 22 }}>
        <W4Button full onClick={submit}>התחברות</W4Button>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 26, textAlign: 'center', fontSize: 14.5, color: 'var(--w4-muted)' }}>
        משתמש חדש?{' '}
        <button onClick={() => go('signup', 'fwd')} style={{ border: 'none', background: 'none', color: 'var(--w4-accent)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14.5 }}>לחץ כאן להרשמה</button>
      </div>
    </div>
  );
}

// ── Sign Up ─────────────────────────────────────────────────
function SignUpScreen({ go, toast }) {
  const [email, setEmail] = useStateA('');
  const [pw, setPw] = useStateA('');
  const [pw2, setPw2] = useStateA('');
  const [showPw, setShowPw] = useStateA(false);
  const [errs, setErrs] = useStateA({});

  const submit = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'יש להזין כתובת אימייל תקינה';
    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw)) e.pw = 'שגיאה: הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה ומספר';
    if (pw2 !== pw || !pw2) e.pw2 = 'הסיסמאות אינן תואמות';
    setErrs(e);
    if (Object.keys(e).length) return;
    toast('החשבון נוצר בהצלחה! בוא נגדיר את סביבת העבודה שלך', 'success');
    setTimeout(() => go('prefs', 'fwd'), 800);
  };

  return (
    <div style={{ padding: '8px 24px 32px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingTop: 26, paddingBottom: 26, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => go('login', 'back')} style={{ border: 'none', background: 'var(--w4-surface-2)', width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--w4-text)' }}>
          <Icon name="back" size={20} />
        </button>
        <Logo />
      </div>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em' }}>יצירת חשבון</h1>
        <p style={{ fontSize: 15.5, color: 'var(--w4-muted)', margin: 0, lineHeight: 1.5 }}>הצטרפו לקהילת העובדים החכמים של Work4U.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <W4Field label="כתובת אימייל" value={email} onChange={setEmail} type="email" placeholder="name@work4u.co.il" error={errs.email} />
        <W4Field label="סיסמה" value={pw} onChange={setPw} type={showPw ? 'text' : 'password'} placeholder="לפחות 8 תווים, אות גדולה ומספר"
          trailing={showPw ? 'eyeoff' : 'eye'} onTrailing={() => setShowPw(s => !s)} error={errs.pw} />
        <W4Field label="אימות סיסמה" value={pw2} onChange={setPw2} type={showPw ? 'text' : 'password'} placeholder="הקלידו את הסיסמה שוב" error={errs.pw2} />
      </div>

      <div style={{ marginTop: 24 }}>
        <W4Button full onClick={submit}>צור חשבון</W4Button>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 24, textAlign: 'center', fontSize: 14.5, color: 'var(--w4-muted)' }}>
        כבר רשומים?{' '}
        <button onClick={() => go('login', 'back')} style={{ border: 'none', background: 'none', color: 'var(--w4-accent)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14.5 }}>התחברו</button>
      </div>
    </div>
  );
}

// ── Preferences ─────────────────────────────────────────────
function PrefsScreen({ go, toast, prefs, setPrefs, onboarding = true }) {
  const set = (k, v) => setPrefs(p => ({ ...p, [k]: v }));
  const toggleTag = (k) => setPrefs(p => ({ ...p, tags: { ...p.tags, [k]: !p.tags[k] } }));

  const ToggleRow = ({ icon, label, sub, k }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0' }}>
      <div style={{ width: 36, height: 36, borderRadius: 11, background: 'var(--w4-accent-soft)', color: 'var(--w4-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={icon} size={20} /></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15.5, fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', marginTop: 1 }}>{sub}</div>}
      </div>
      <button onClick={() => set(k, !prefs[k])} style={{
        width: 50, height: 30, borderRadius: 999, border: 'none', cursor: 'pointer', position: 'relative',
        background: prefs[k] ? 'var(--w4-accent)' : 'var(--w4-surface-2)', transition: 'background .2s', flexShrink: 0,
      }}>
        <span style={{ position: 'absolute', top: 3, insetInlineStart: prefs[k] ? 23 : 3, width: 24, height: 24, borderRadius: 999, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'inset-inline-start .2s' }} />
      </button>
    </div>
  );

  const Card = ({ title, children }) => (
    <div style={{ background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', padding: '4px 16px', boxShadow: 'var(--w4-shadow-sm)' }}>
      {title && <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--w4-muted)', textTransform: 'uppercase', letterSpacing: '0.03em', padding: '14px 0 4px' }}>{title}</div>}
      {children}
    </div>
  );

  const seatOpts = ['ספה נוחה', 'שולחן עבודה', 'בר', 'חדר שקט'];
  const priceOpts = ['₪', '₪₪', '₪₪₪'];

  return (
    <div style={{ padding: '8px 20px 36px', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingTop: 26, paddingBottom: 18 }}>
        {!onboarding && (
          <button onClick={() => go('home', 'back')} style={{ border: 'none', background: 'var(--w4-surface-2)', width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--w4-text)', marginBottom: 16 }}>
            <Icon name="back" size={20} />
          </button>
        )}
        <h1 style={{ fontSize: 27, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em' }}>{onboarding ? 'נגדיר את ההעדפות שלך' : 'פרופיל והעדפות'}</h1>
        <p style={{ fontSize: 15, color: 'var(--w4-muted)', margin: 0, lineHeight: 1.5 }}>נתאים עבורך אוטומטית את התוצאות הטובות ביותר.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card title="סביבת עבודה">
          <ToggleRow icon="noise" label="סביבה שקטה" sub="עדיפות למקומות עם רעש נמוך" k="quiet" />
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <ToggleRow icon="power" label="צורך בשקעי חשמל" sub="להציג רק מקומות עם שקעים זמינים" k="power" />
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <ToggleRow icon="wifi" label="אינטרנט מהיר חובה" sub="Wi-Fi איכותי ויציב" k="wifi" />
        </Card>

        <Card title="סוג ישיבה מועדף">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '12px 0 16px' }}>
            {seatOpts.map(s => <Tag key={s} active={prefs.seat === s} onClick={() => set('seat', s)}>{s}</Tag>)}
          </div>
        </Card>

        <Card title="טווח מחירים">
          <div style={{ display: 'flex', gap: 8, padding: '12px 0 16px' }}>
            {priceOpts.map(p => (
              <button key={p} onClick={() => set('price', p)} style={{
                flex: 1, padding: '13px 0', borderRadius: 'var(--w4-radius-sm)', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 16, fontWeight: 700, transition: 'all .15s',
                background: prefs.price === p ? 'var(--w4-accent)' : 'var(--w4-surface-2)',
                color: prefs.price === p ? 'var(--w4-on-accent)' : 'var(--w4-text)',
              }}>{p}</button>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ marginTop: 22 }}>
        <W4Button full onClick={() => { toast('הפרופיל האישי שלך עודכן בהצלחה! התוצאות יותאמו עבורך אוטומטית', 'success'); setTimeout(() => go('home', onboarding ? 'fwd' : 'back'), 750); }}>
          {onboarding ? 'שמור פרופיל והמשך' : 'שמור שינויים'}
        </W4Button>
      </div>
    </div>
  );
}

Object.assign(window, { Logo, LoginScreen, SignUpScreen, PrefsScreen });
