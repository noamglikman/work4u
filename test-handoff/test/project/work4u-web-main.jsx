// work4u-web-main.jsx — WebHeader, WebHome (map+sidebar), WebVenue, VenueListCard.
const { useState: useWM } = React;

// ── Header ──────────────────────────────────────────────────
function WebHeader({ screen, go, isAdmin, openAdmin }) {
  const Item = ({ to, icon, label }) => {
    const on = screen === to || (to === 'home' && screen === 'venue');
    return (
      <button onClick={() => go(to)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', cursor: 'pointer',
        fontFamily: 'inherit', fontSize: 14.5, fontWeight: 700, padding: '9px 14px', borderRadius: 999,
        background: on ? 'var(--w4-accent-soft)' : 'transparent', color: on ? 'var(--w4-accent)' : 'var(--w4-muted)',
        transition: 'all .15s',
      }}><Icon name={icon} size={18} sw={on ? 2.1 : 1.8} />{label}</button>
    );
  };
  return (
    <header style={{
      height: 64, display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px',
      background: 'color-mix(in srgb, var(--w4-surface) 90%, transparent)',
      backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)',
      borderBottom: '1px solid var(--w4-border)', position: 'sticky', top: 0, zIndex: 30, flexShrink: 0,
    }}>
      <button onClick={() => go('home')} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: 0 }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--w4-accent)', color: 'var(--w4-on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="coffee" size={22} sw={1.9} /></div>
        <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em', direction: 'ltr', color: 'var(--w4-text)' }}>Work<span style={{ color: 'var(--w4-accent)' }}>4U</span></span>
      </button>
      <nav className="w4-nav" style={{ display: 'flex', gap: 4, marginInlineStart: 14 }}>
        <Item to="home" icon="map" label="מפה" />
        <Item to="history" icon="list" label="הדירוגים שלי" />
      </nav>
      <div style={{ flex: 1 }} />
      {isAdmin && <W4Button size="sm" variant="soft" icon="plus" onClick={openAdmin}>הוספת מתחם</W4Button>}
      <button onClick={() => go('profile')} style={{
        width: 40, height: 40, borderRadius: 999, border: '2px solid var(--w4-border)', cursor: 'pointer',
        background: 'var(--w4-accent)', color: 'var(--w4-on-accent)', fontSize: 16, fontWeight: 800, fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>נ</button>
    </header>
  );
}

// ── Venue list card (sidebar) ───────────────────────────────
function VenueListCard({ v, onClick, active }) {
  const [hover, setHover] = useWM(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: 'flex', gap: 12, padding: 10, borderRadius: 'var(--w4-radius)', cursor: 'pointer',
      background: 'var(--w4-surface)', boxShadow: active ? '0 0 0 2px var(--w4-accent), var(--w4-shadow-sm)' : 'var(--w4-shadow-sm)',
      transform: hover ? 'translateY(-2px)' : 'none', transition: 'transform .15s, box-shadow .15s',
    }}>
      <div style={{ width: 76, height: 76, borderRadius: 13, overflow: 'hidden', flexShrink: 0 }}><Photo color={v.photo} emoji={v.emoji} h={76} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0, fontWeight: 700, fontSize: 15.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 13, fontWeight: 700, color: 'var(--w4-warn)', flexShrink: 0 }}><Icon name="star" size={14} fill="var(--w4-warn)" stroke="var(--w4-warn)" sw={1.4} />{v.rating}</span>
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', margin: '2px 0 8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.area} · {v.dist}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <OccPill occ={v.occ} size="sm" />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--w4-muted)' }}>
            <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', fontSize: 12, fontWeight: 600 }}><Icon name="wifi" size={14} />{v.wifi}</span>
            <span style={{ fontSize: 12.5, fontWeight: 700 }}>{v.price}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Home (map + sidebar) ────────────────────────────────────
function WebHome({ go, openVenue, venues, query, setQuery, filters, setFilters }) {
  const [selected, setSelected] = useWM(null);
  const [showAdv, setShowAdv] = useWM(false);
  const setF = (k, v) => setFilters(f => ({ ...f, [k]: v }));
  const chips = [['quiet','שקט','noise'],['power','שקעים','power'],['wifi','Wi-Fi מהיר','wifi'],['open','פתוח עכשיו','clock']];

  return (
    <div className="w4-home-grid">
      {/* Sidebar */}
      <aside className="w4-home-side" style={{ background: 'var(--w4-bg)', borderInlineStart: '1px solid var(--w4-border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid var(--w4-border)' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 3px', letterSpacing: '-0.02em' }}>מומלצים עבורך</h1>
          <p style={{ fontSize: 13, color: 'var(--w4-muted)', margin: '0 0 14px' }}>מותאם להעדפות ולמיקום שלך</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius-sm)', padding: '11px 14px', boxShadow: 'inset 0 0 0 1.5px var(--w4-border)' }}>
            <Icon name="search" size={19} style={{ color: 'var(--w4-faint)' }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="חיפוש מקום, שכונה או עיר…" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 14.5, color: 'var(--w4-text)', minWidth: 0 }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 12 }}>
            {chips.map(([k,l,ic]) => <Tag key={k} icon={ic} active={filters[k]} onClick={() => setF(k, !filters[k])}>{l}</Tag>)}
            <Tag icon="sliders" active={showAdv} onClick={() => setShowAdv(s => !s)}>עוד</Tag>
          </div>
          {showAdv && (
            <div style={{ marginTop: 14, padding: 14, background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius-sm)', boxShadow: 'var(--w4-shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 700 }}>רדיוס חיפוש</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--w4-accent)' }}>{filters.radius >= 10 ? '10+ ק״מ' : filters.radius + ' ק״מ'}</span>
              </div>
              <input type="range" min="1" max="10" value={filters.radius} onChange={e => setF('radius', +e.target.value)} style={{ width: '100%', accentColor: 'var(--w4-accent)' }} />
              <div style={{ fontSize: 13.5, fontWeight: 700, margin: '12px 0 8px' }}>טווח מחירים</div>
              <div style={{ display: 'flex', gap: 7 }}>
                {['הכל','₪','₪₪','₪₪₪'].map(p => <button key={p} onClick={() => setF('price', p)} style={{ flex: 1, padding: '9px 0', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, background: filters.price === p ? 'var(--w4-accent)' : 'var(--w4-surface-2)', color: filters.price === p ? 'var(--w4-on-accent)' : 'var(--w4-text)' }}>{p}</button>)}
              </div>
            </div>
          )}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px 24px' }}>
          <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', fontWeight: 600, marginBottom: 12 }}>{venues.length} מתחמים נמצאו</div>
          {venues.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--w4-muted)' }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>🔍</div>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>לא נמצאו מתחמי עבודה<br/>העונים על דרישות הסינון שלך</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {venues.map(v => <VenueListCard key={v.id} v={v} active={selected === v.id} onClick={() => openVenue(v.id)} />)}
            </div>
          )}
        </div>
      </aside>

      {/* Map */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <MapCanvas venues={venues} onPin={(id) => setSelected(id)} selected={selected} />
        <button style={{ position: 'absolute', insetInlineEnd: 18, bottom: 18, width: 48, height: 48, borderRadius: 14, border: 'none', background: 'var(--w4-surface)', boxShadow: 'var(--w4-shadow)', color: 'var(--w4-accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="location" size={22} />
        </button>
        {selected && (() => {
          const sel = venues.find(v => v.id === selected); if (!sel) return null;
          return (
            <div onClick={() => openVenue(sel.id)} key={sel.id} style={{ position: 'absolute', insetInlineStart: 18, bottom: 18, width: 320, cursor: 'pointer', background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', boxShadow: 'var(--w4-shadow)', padding: 10, display: 'flex', gap: 12, alignItems: 'center', animation: 'wpop .2s ease' }}>
              <div style={{ width: 64, height: 64, borderRadius: 13, overflow: 'hidden', flexShrink: 0 }}><Photo color={sel.photo} emoji={sel.emoji} h={64} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15.5 }}>{sel.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', margin: '2px 0 6px' }}>{sel.area} · {sel.dist}</div>
                <OccPill occ={sel.occ} size="sm" />
              </div>
              <Icon name="chevron" size={20} style={{ color: 'var(--w4-faint)', transform: 'scaleX(-1)' }} />
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ── Venue detail page ───────────────────────────────────────
function WebVenue({ go, v, openModal, nowIdx = 6 }) {
  if (!v) return null;
  const wifiLabel = ['', 'חלש', 'בינוני', 'סביר', 'טוב', 'מצוין'][v.wifi];
  const noiseLabel = ['', 'שקט מאוד', 'שקט', 'בינוני', 'רועש', 'רועש מאוד'][v.noise];
  const gallery = [v.photo, '#A88B6B', '#7E8B72', '#9A7B86'];

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 24px 60px' }}>
      <button onClick={() => go('home')} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'var(--w4-surface)', boxShadow: 'var(--w4-shadow-sm)', borderRadius: 999, padding: '9px 16px 9px 13px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, color: 'var(--w4-text)', marginBottom: 18 }}>
        <Icon name="back" size={18} /> חזרה למפה
      </button>

      {/* gallery */}
      <div className="w4-gallery" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 10, height: 320, marginBottom: 22 }}>
        <div style={{ gridRow: 'span 2', borderRadius: 'var(--w4-radius)', overflow: 'hidden' }}><Photo color={gallery[0]} emoji={v.emoji} h={320} label="gallery · Amazon S3" /></div>
        <div style={{ borderRadius: 'var(--w4-radius)', overflow: 'hidden' }}><Photo color={gallery[1]} h={155} label="photo 2" /></div>
        <div style={{ borderRadius: 'var(--w4-radius)', overflow: 'hidden' }}><Photo color={gallery[2]} h={155} label="photo 3" /></div>
        <div style={{ gridColumn: 'span 2', borderRadius: 'var(--w4-radius)', overflow: 'hidden' }}><Photo color={gallery[3]} h={155} label="photo 4" /></div>
      </div>

      <div className="w4-venue-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 26, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>{v.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--w4-muted)', fontSize: 15 }}><Icon name="pin" size={16} /><span>{v.area} · {v.dist}</span></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--w4-warn)', fontWeight: 800, fontSize: 22, whiteSpace: 'nowrap' }}><Icon name="star" size={20} fill="var(--w4-warn)" stroke="var(--w4-warn)" sw={1.4} />{v.rating} <span style={{ fontSize: 13, color: 'var(--w4-muted)', fontWeight: 600 }}>({v.reviews})</span></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <OccPill occ={v.occ} /><span style={{ fontSize: 13.5, color: 'var(--w4-muted)' }}>עומס נוכחי לפי הקהילה</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>{v.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
          <p style={{ fontSize: 15.5, lineHeight: 1.65, margin: '0 0 24px', opacity: 0.88, maxWidth: 560 }}>{v.blurb}</p>
          <div style={{ background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', padding: '20px 22px 18px', boxShadow: 'var(--w4-shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}><Icon name="clock" size={19} style={{ color: 'var(--w4-accent)' }} /><span style={{ fontSize: 16.5, fontWeight: 800 }}>תחזית עומס לפי שעה</span></div>
            <ForecastGraph data={v.forecast} nowIdx={nowIdx} />
          </div>
        </div>

        <aside style={{ position: 'sticky', top: 84, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', padding: '6px 18px', boxShadow: 'var(--w4-shadow-sm)' }}>
            <SpecRow icon="wifi" label="איכות אינטרנט" value={wifiLabel} accent />
            <div style={{ height: 1, background: 'var(--w4-border)' }} />
            <SpecRow icon="power" label="שקעי חשמל" value={v.power} />
            <div style={{ height: 1, background: 'var(--w4-border)' }} />
            <SpecRow icon="noise" label="רמת רעש" value={noiseLabel} />
            <div style={{ height: 1, background: 'var(--w4-border)' }} />
            <SpecRow icon="chair" label="ישיבה" value={v.seats} />
            <div style={{ height: 1, background: 'var(--w4-border)' }} />
            <SpecRow icon="clock" label="שעות" value={v.hours} />
            <div style={{ height: 1, background: 'var(--w4-border)' }} />
            <SpecRow icon="shekel" label="מחירים" value={v.price} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <W4Button variant="soft" icon="star" onClick={() => openModal('rating')}>דרג</W4Button>
            <W4Button full icon="pin">פתח בניווט</W4Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { WebHeader, WebHome, WebVenue, VenueListCard });
