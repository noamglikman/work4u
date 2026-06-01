// work4u-web-app.jsx — web App controller, routing, theme, tweaks.
const { useState: useW, useEffect: useWEff, useRef: useWRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "coffee",
  "accent": "#BC6038",
  "font": "rubik",
  "smartPush": true
}/*EDITMODE-END*/;

const WFONTS = { rubik: "'Rubik', system-ui, sans-serif", assistant: "'Assistant', system-ui, sans-serif", heebo: "'Heebo', system-ui, sans-serif" };

function wFilter(venues, f, query) {
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

// web push banner (top-right)
function PushCard({ venue, onOpen, onClose }) {
  if (!venue) return null;
  return (
    <div style={{ position: 'fixed', top: 78, insetInlineEnd: 22, zIndex: 88, width: 340, maxWidth: '90vw', animation: 'wdrop .4s cubic-bezier(.2,.9,.3,1.3)' }}>
      <div onClick={onOpen} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--w4-surface)', borderRadius: 18, padding: '13px 15px', boxShadow: '0 14px 38px rgba(0,0,0,0.22)', cursor: 'pointer', border: '1px solid var(--w4-border)' }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--w4-accent)', color: 'var(--w4-on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="bell" size={22} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, marginBottom: 1 }}>Work4U</div>
          <div style={{ fontSize: 13, lineHeight: 1.4 }}>ביקרת ב<strong>{venue.name}</strong>? ספר לנו איך היה!</div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ border: 'none', background: 'none', color: 'var(--w4-faint)', cursor: 'pointer', padding: 2, alignSelf: 'flex-start' }}><Icon name="x" size={18} /></button>
      </div>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useW('login');
  const [isAdmin, setIsAdmin] = useW(false);
  const [prefs, setPrefs] = useW({ quiet: true, power: true, wifi: true, seat: 'שולחן עבודה', price: '₪₪' });
  const [filters, setFilters] = useW({ radius: 5, quiet: false, power: false, wifi: false, open: false, price: 'הכל' });
  const [query, setQuery] = useW('');
  const [overlay, setOverlay] = useW(null);   // 'forgot' | 'admin'
  const [modal, setModal] = useW(null);        // 'rating'
  const [venueId, setVenueId] = useW(null);
  const [toast, setToast] = useW(null);
  const [history, setHistory] = useW(window.W4U_HISTORY.slice());
  const [push, setPush] = useW(null);
  const pushedOnce = useWRef(false);
  const toastTimer = useWRef(null);

  const theme = window.W4U_THEMES[t.theme] || window.W4U_THEMES.coffee;
  const go = (s) => { setScreen(s); if (s !== 'venue') window.scrollTo(0, 0); };
  const showToast = (msg, tone = 'default') => { setToast({ msg, tone, id: Date.now() }); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(null), 2800); };
  const openVenue = (id) => { setVenueId(id); go('venue'); };

  useWEff(() => {
    if (screen === 'home' && t.smartPush && !isAdmin && !pushedOnce.current) {
      const tmr = setTimeout(() => { setPush(window.W4U_VENUES[0]); pushedOnce.current = true; }, 4200);
      return () => clearTimeout(tmr);
    }
  }, [screen, t.smartPush, isAdmin]);

  const nowIdx = Math.max(0, Math.min(13, new Date().getHours() - 8));
  const visible = wFilter(window.W4U_VENUES, filters, query);
  const venue = window.W4U_VENUES.find(v => v.id === venueId);

  const submitRating = ({ venueId, occ, wifi, noise }) => {
    const d = new Date();
    const date = `${d.getDate()} ב${['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'][d.getMonth()]} ${d.getFullYear()}`;
    setHistory(h => [{ id: 'h' + Date.now(), venueId, date, occ, wifi, noise }, ...h]);
  };

  const rootVars = {
    ...theme.vars,
    '--w4-accent': t.accent,
    '--w4-accent-2': `color-mix(in srgb, ${t.accent} 80%, #2a1208)`,
    '--w4-accent-soft': `color-mix(in srgb, ${t.accent} 15%, var(--w4-surface))`,
    '--w4-on-accent': '#FFF8F2',
    fontFamily: WFONTS[t.font] || WFONTS.rubik,
  };

  const isAuth = screen === 'login' || screen === 'signup';

  let content = null;
  if (screen === 'login') content = <WebLogin go={go} toast={showToast} setAdminMode={setIsAdmin} openForgot={() => setOverlay('forgot')} />;
  else if (screen === 'signup') content = <WebSignup go={go} toast={showToast} />;
  else if (screen === 'prefs') content = <WebPrefs go={go} toast={showToast} prefs={prefs} setPrefs={setPrefs} onboarding />;
  else if (screen === 'prefs-edit') content = <WebPrefs go={go} toast={showToast} prefs={prefs} setPrefs={setPrefs} onboarding={false} />;
  else if (screen === 'home') content = <WebHome go={go} openVenue={openVenue} venues={visible} query={query} setQuery={setQuery} filters={filters} setFilters={setFilters} />;
  else if (screen === 'venue') content = <WebVenue go={go} v={venue} openModal={setModal} nowIdx={nowIdx} />;
  else if (screen === 'history') content = <WebHistory history={history} venues={window.W4U_VENUES} openVenue={openVenue} toast={showToast} onDelete={(id) => setHistory(h => h.filter(x => x.id !== id))} />;
  else if (screen === 'profile') content = <WebProfile go={go} isAdmin={isAdmin} prefs={prefs} history={history} toast={showToast} />;

  const fillHeight = screen === 'home';

  return (
    <React.Fragment>
      <div style={{ ...rootVars, background: 'var(--w4-bg)', color: 'var(--w4-text)', direction: 'rtl', minHeight: '100vh', height: fillHeight ? '100vh' : undefined, display: 'flex', flexDirection: 'column', overflow: fillHeight ? 'hidden' : undefined }}>
        {isAuth ? content : (
          <React.Fragment>
            <WebHeader screen={screen} go={go} isAdmin={isAdmin} openAdmin={() => setOverlay('admin')} />
            <main style={{ flex: 1, overflowY: fillHeight ? 'hidden' : 'auto' }}>{content}</main>
          </React.Fragment>
        )}

        <PushCard venue={push} onOpen={() => { setVenueId(push.id); setPush(null); setModal('rating'); }} onClose={() => setPush(null)} />
        {overlay === 'forgot' && <ForgotDialog close={() => setOverlay(null)} toast={showToast} />}
        {overlay === 'admin' && <WebAdminDialog close={() => setOverlay(null)} toast={showToast} />}
        {modal === 'rating' && venue && <div style={{ position: 'fixed', inset: 0, zIndex: 85 }}><RatingModal venue={venue} close={() => setModal(null)} toast={showToast} onSubmit={submitRating} /></div>}
        <WebToast toast={toast} />
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

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
