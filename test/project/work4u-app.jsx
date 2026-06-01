// work4u-app.jsx — App controller, bottom nav, scaling, tweaks.
// (refresh)
const { useState: useS, useEffect: useE, useRef: useR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "coffee",
  "accent": "#BC6038",
  "font": "rubik",
  "smartPush": true
}/*EDITMODE-END*/;

const FONT_STACKS = {
  rubik: "'Rubik', system-ui, sans-serif",
  assistant: "'Assistant', system-ui, sans-serif",
  heebo: "'Heebo', system-ui, sans-serif",
};

const NAV_H = 66;
const NAV_SCREENS = ['home', 'history', 'profile'];

function filterVenues(venues, f, query) {
  const q = (query || '').trim();
  return venues.filter(v => {
    if (q && !(v.name.includes(q) || v.area.includes(q) || v.tags.some(t => t.includes(q)))) return false;
    if (f.quiet && v.noise > 2) return false;
    if (f.power && v.power.includes('מעט')) return false;
    if (f.wifi && v.wifi < 4) return false;
    if (f.price !== 'הכל' && v.price !== f.price) return false;
    const km = v.dist.includes('ק') ? parseFloat(v.dist) : parseFloat(v.dist) / 1000;
    if (km > f.radius) return false;
    return true;
  });
}

function BottomNav({ screen, go }) {
  const items = [
    { k: 'home', icon: 'map', label: 'מפה' },
    { k: 'history', icon: 'list', label: 'דירוגים' },
    { k: 'profile', icon: 'user', label: 'פרופיל' },
  ];
  return (
    <div style={{
      position: 'absolute', insetInline: 0, bottom: 0, height: NAV_H, zIndex: 40,
      background: 'color-mix(in srgb, var(--w4-surface) 88%, transparent)',
      backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      borderTop: '1px solid var(--w4-border)', display: 'flex', alignItems: 'flex-start',
      paddingTop: 9, paddingBottom: 14,
    }}>
      {items.map(it => {
        const on = screen === it.k;
        return (
          <button key={it.k} onClick={() => go(it.k, screen === 'profile' && it.k === 'home' ? 'back' : 'none')} style={{
            flex: 1, border: 'none', background: 'none', cursor: 'pointer', display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: 3, color: on ? 'var(--w4-accent)' : 'var(--w4-faint)',
            transition: 'color .15s', fontFamily: 'inherit',
          }}>
            <Icon name={it.icon} size={24} sw={on ? 2.2 : 1.8} />
            <span style={{ fontSize: 11, fontWeight: on ? 800 : 600 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [nav, setNav] = useS({ screen: 'login', dir: 'none' });
  const [isAdmin, setIsAdmin] = useS(false);
  const [prefs, setPrefs] = useS({ quiet: true, power: true, wifi: true, seat: 'שולחן עבודה', price: '₪₪' });
  const [filters, setFilters] = useS({ radius: 5, quiet: false, power: false, wifi: false, open: false, price: 'הכל' });
  const [query, setQuery] = useS('');
  const [sheet, setSheet] = useS(null);     // 'forgot' | 'filter' | 'admin'
  const [modal, setModal] = useS(null);      // 'rating'
  const [push, setPush] = useS(null);        // venue object
  const [venueId, setVenueId] = useS(null);
  const [toast, setToast] = useS(null);
  const [history, setHistory] = useS(window.W4U_HISTORY.slice());
  const pushedOnce = useR(false);
  const toastTimer = useR(null);

  const theme = window.W4U_THEMES[t.theme] || window.W4U_THEMES.coffee;
  const go = (screen, dir = 'none') => { setNav({ screen, dir }); };
  const showToast = (msg, tone = 'default') => {
    setToast({ msg, tone, id: Date.now() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };
  const openVenue = (id) => { setVenueId(id); go('venue', 'fwd'); };

  // smart push: once, ~4s after landing on home
  useE(() => {
    if (nav.screen === 'home' && t.smartPush && !isAdmin && !pushedOnce.current) {
      const tmr = setTimeout(() => { setPush(window.W4U_VENUES[0]); pushedOnce.current = true; }, 4200);
      return () => clearTimeout(tmr);
    }
  }, [nav.screen, t.smartPush, isAdmin]);

  // scaling
  const [scale, setScale] = useS(1);
  const W = 402, H = 874;
  useE(() => {
    const fit = () => setScale(Math.min((window.innerWidth - 36) / W, (window.innerHeight - 36) / H, 1.1));
    fit(); window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const nowIdx = Math.max(0, Math.min(13, new Date().getHours() - 8));
  const visibleVenues = filterVenues(window.W4U_VENUES, filters, query);
  const venue = window.W4U_VENUES.find(v => v.id === venueId);
  const navShown = NAV_SCREENS.includes(nav.screen);

  const submitRating = ({ venueId, occ, wifi, noise }) => {
    const d = new Date();
    const date = `${d.getDate()} ב${['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'][d.getMonth()]} ${d.getFullYear()}`;
    setHistory(h => [{ id: 'h' + Date.now(), venueId, date, occ, wifi, noise }, ...h]);
  };

  const enterAnim = { fwd: 'w4enterFwd .32s cubic-bezier(.2,.9,.3,1)', back: 'w4enterBack .32s cubic-bezier(.2,.9,.3,1)', up: 'w4enterUp .32s cubic-bezier(.2,.9,.3,1)', none: 'none' }[nav.dir];

  const rootVars = {
    ...theme.vars,
    '--w4-accent': t.accent,
    '--w4-accent-2': `color-mix(in srgb, ${t.accent} 80%, #2a1208)`,
    '--w4-accent-soft': `color-mix(in srgb, ${t.accent} 15%, var(--w4-surface))`,
    '--w4-on-accent': '#FFF8F2',
    fontFamily: FONT_STACKS[t.font] || FONT_STACKS.rubik,
  };

  let screenEl = null;
  switch (nav.screen) {
    case 'login': screenEl = <LoginScreen go={go} toast={showToast} openSheet={setSheet} setAdminMode={setIsAdmin} />; break;
    case 'signup': screenEl = <SignUpScreen go={go} toast={showToast} />; break;
    case 'prefs': screenEl = <PrefsScreen go={go} toast={showToast} prefs={prefs} setPrefs={setPrefs} onboarding />; break;
    case 'prefs-edit': screenEl = <PrefsScreen go={go} toast={showToast} prefs={prefs} setPrefs={setPrefs} onboarding={false} />; break;
    case 'home': screenEl = <HomeScreen go={go} openSheet={setSheet} openVenue={openVenue} venues={visibleVenues} isAdmin={isAdmin} query={query} setQuery={setQuery} />; break;
    case 'venue': screenEl = <VenueScreen go={go} v={venue} openModal={setModal} nowIdx={nowIdx} />; break;
    case 'history': screenEl = <HistoryScreen history={history} venues={window.W4U_VENUES} openVenue={openVenue} toast={showToast} onDelete={(id) => setHistory(h => h.filter(x => x.id !== id))} />; break;
    case 'profile': screenEl = <ProfileScreen go={go} isAdmin={isAdmin} prefs={prefs} history={history} toast={showToast} />; break;
    default: screenEl = null;
  }

  return (
    <React.Fragment>
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
          <IOSDevice dark={theme.dark}>
            <div style={{ ...rootVars, position: 'relative', height: '100%', overflow: 'hidden', background: 'var(--w4-bg)', color: 'var(--w4-text)', direction: 'rtl', textAlign: 'right' }}>
              {/* screen */}
              <div key={nav.screen} style={{ position: 'absolute', inset: 0, bottom: navShown ? NAV_H : 0, overflowY: nav.screen === 'home' || nav.screen === 'venue' ? 'hidden' : 'auto', animation: enterAnim }}>
                {screenEl}
              </div>

              {navShown && <BottomNav screen={nav.screen} go={go} />}

              {/* push banner */}
              <PushBanner venue={push} onOpen={() => { setVenueId(push.id); setPush(null); setModal('rating'); }} onClose={() => setPush(null)} />

              {/* overlays */}
              {sheet === 'forgot' && <ForgotSheet close={() => setSheet(null)} toast={showToast} />}
              {sheet === 'filter' && <FilterSheet close={() => setSheet(null)} filters={filters} setFilters={setFilters} apply={() => { setSheet(null); showToast(`מציג ${filterVenues(window.W4U_VENUES, filters, query).length} מתחמים מותאמים`, 'default'); }} />}
              {sheet === 'admin' && <AdminPanel close={() => setSheet(null)} toast={showToast} />}
              {modal === 'rating' && venue && <RatingModal venue={venue} close={() => setModal(null)} toast={showToast} onSubmit={submitRating} />}

              <Toast toast={toast} />
            </div>
          </IOSDevice>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="כיוון עיצוב" />
        <TweakRadio label="ערכת צבעים" value={t.theme} options={[{value:'coffee',label:'קפה'},{value:'fresh',label:'בהיר'},{value:'espresso',label:'אספרסו'}]} onChange={v => setTweak('theme', v)} />
        <TweakColor label="צבע אקסנט" value={t.accent} options={['#BC6038','#C2772E','#A1564A','#8C6A45','#6F7F55']} onChange={v => setTweak('accent', v)} />
        <TweakSelect label="גופן" value={t.font} options={[{value:'rubik',label:'Rubik'},{value:'assistant',label:'Assistant'},{value:'heebo',label:'Heebo'}]} onChange={v => setTweak('font', v)} />
        <TweakSection label="התנהגות" />
        <TweakToggle label="התראות חכמות (Push)" value={t.smartPush} onChange={v => setTweak('smartPush', v)} />
        <TweakButton label="הצג התראת דיווח קהילתי" onClick={() => setPush(window.W4U_VENUES[Math.floor(Math.random()*window.W4U_VENUES.length)])} />
      </TweaksPanel>
    </React.Fragment>
  );
}

// Forgot-password sheet (centered modal)
function ForgotSheet({ close, toast }) {
  const [email, setEmail] = useS('');
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 78, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 22 }}>
      <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(20,12,6,0.5)', animation: 'w4fade .25s ease' }} />
      <div style={{ position: 'relative', width: '100%', background: 'var(--w4-bg)', borderRadius: 24, padding: 22, boxShadow: '0 20px 50px rgba(0,0,0,0.35)', animation: 'w4pop .3s cubic-bezier(.2,.9,.3,1.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>שחזור סיסמה</h2>
          <button onClick={close} style={{ width: 34, height: 34, borderRadius: 11, border: 'none', background: 'var(--w4-surface-2)', cursor: 'pointer', color: 'var(--w4-text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={19} /></button>
        </div>
        <p style={{ fontSize: 13.5, color: 'var(--w4-muted)', margin: '0 0 16px', lineHeight: 1.5 }}>הזינו את כתובת האימייל ונשלח לכם קישור לאיפוס הסיסמה.</p>
        <W4Field label="כתובת אימייל" value={email} onChange={setEmail} type="email" placeholder="name@work4u.co.il" autoFocus />
        <div style={{ marginTop: 18 }}>
          <W4Button full onClick={() => { close(); toast('קישור לאיפוס נשלח לאימייל שלך', 'success'); }}>שלח קישור איפוס</W4Button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('stage')).render(<App />);
