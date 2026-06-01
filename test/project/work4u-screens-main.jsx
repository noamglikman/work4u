// work4u-screens-main.jsx — Home/Map, Filter sheet, Venue profile. Exports to window.
const { useState: useStateM, useRef: useRefM, useEffect: useEffectM } = React;

// ── Stylised map ────────────────────────────────────────────
function MapCanvas({ venues, onPin, selected }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--w4-map)', overflow: 'hidden' }}>
      {/* parks */}
      <div style={{ position: 'absolute', top: '8%', insetInlineStart: '6%', width: 95, height: 80, borderRadius: 18, background: 'var(--w4-map-park)', opacity: 0.9 }} />
      <div style={{ position: 'absolute', bottom: '14%', insetInlineEnd: '8%', width: 120, height: 70, borderRadius: 18, background: 'var(--w4-map-park)', opacity: 0.9 }} />
      {/* water */}
      <div style={{ position: 'absolute', top: '-6%', insetInlineEnd: '-12%', width: 180, height: 200, borderRadius: '50%', background: 'var(--w4-map-water)', opacity: 0.8 }} />
      {/* roads */}
      {[18, 44, 70].map((t, i) => <div key={'h'+i} style={{ position: 'absolute', top: t + '%', left: 0, right: 0, height: 13, background: 'var(--w4-map-road)' }} />)}
      {[26, 58, 82].map((l, i) => <div key={'v'+i} style={{ position: 'absolute', insetInlineStart: l + '%', top: 0, bottom: 0, width: 13, background: 'var(--w4-map-road)' }} />)}
      {/* building blocks */}
      {[[10,34,40,26],[55,8,30,22],[64,60,30,26],[8,72,34,18],[38,68,40,22]].map((b,i) => (
        <div key={'b'+i} style={{ position: 'absolute', top: b[0]+'%', insetInlineStart: b[1]+'%', width: b[2]+'%', height: b[3]+'%', background: 'rgba(0,0,0,0.04)', borderRadius: 8 }} />
      ))}
      {/* user location */}
      <div style={{ position: 'absolute', top: '52%', insetInlineStart: '46%', transform: 'translate(-50%,-50%)' }}>
        <div style={{ width: 18, height: 18, borderRadius: 999, background: 'var(--w4-accent)', border: '3px solid #fff', boxShadow: '0 0 0 6px color-mix(in srgb, var(--w4-accent) 22%, transparent), 0 2px 6px rgba(0,0,0,0.25)' }} />
      </div>
      {/* pins */}
      {venues.map(v => {
        const o = W4U_OCC[v.occ];
        const on = selected === v.id;
        return (
          <button key={v.id} onClick={() => onPin(v.id)} style={{
            position: 'absolute', top: v.lat + '%', insetInlineStart: v.lng + '%',
            transform: `translate(-50%,-100%) scale(${on ? 1.12 : 1})`, transformOrigin: 'bottom center',
            border: 'none', background: 'none', cursor: 'pointer', padding: 0,
            transition: 'transform .2s cubic-bezier(.2,.9,.3,1.3)', zIndex: on ? 6 : 4,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50% 50% 50% 4px', transform: 'rotate(45deg)',
              background: o.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: on ? '3px solid #fff' : '2.5px solid #fff',
            }}>
              <span style={{ transform: 'rotate(-45deg)', fontSize: 17 }}>{v.emoji}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── Home / Dashboard ────────────────────────────────────────
function HomeScreen({ go, openSheet, openVenue, venues, isAdmin, query, setQuery }) {
  const [selected, setSelected] = useStateM(null);
  const sel = venues.find(v => v.id === selected);

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Map fills the area */}
      <MapCanvas venues={venues} onPin={setSelected} selected={selected} />

      {/* Top floating bar */}
      <div style={{ position: 'absolute', top: 0, insetInline: 0, padding: '54px 16px 10px', zIndex: 10 }}>
        {isAdmin && (
          <div onClick={() => openSheet('admin')} style={{
            display: 'flex', alignItems: 'center', gap: 8, background: 'var(--w4-text)', color: 'var(--w4-bg)',
            padding: '9px 14px', borderRadius: 12, marginBottom: 10, fontSize: 13.5, fontWeight: 700,
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)', cursor: 'pointer',
          }}>
            <Icon name="sliders" size={17} /> <span style={{ flex: 1 }}>מצב מנהל · ניהול מתחמים</span>
            <Icon name="plus" size={17} />
          </div>
        )}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 9, background: 'var(--w4-surface)', borderRadius: 14, padding: '12px 15px', boxShadow: 'var(--w4-shadow)' }}>
            <Icon name="search" size={20} style={{ color: 'var(--w4-faint)' }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="חיפוש מקום, שכונה או עיר…" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 15, color: 'var(--w4-text)', minWidth: 0 }} />
          </div>
          <button onClick={() => openSheet('filter')} style={{ width: 48, border: 'none', background: 'var(--w4-surface)', borderRadius: 14, boxShadow: 'var(--w4-shadow)', cursor: 'pointer', color: 'var(--w4-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="filter" size={22} />
          </button>
        </div>
      </div>

      {/* Recenter chip */}
      <button style={{ position: 'absolute', insetInlineEnd: 16, bottom: 280, width: 46, height: 46, borderRadius: 14, border: 'none', background: 'var(--w4-surface)', boxShadow: 'var(--w4-shadow)', color: 'var(--w4-accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9 }}>
        <Icon name="location" size={21} />
      </button>

      {/* Selected pin preview */}
      {sel && (
        <div key={sel.id} onClick={() => openVenue(sel.id)} style={{
          position: 'absolute', insetInline: 16, bottom: 256, zIndex: 11, cursor: 'pointer',
          background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', boxShadow: 'var(--w4-shadow)',
          padding: 10, display: 'flex', gap: 12, alignItems: 'center', animation: 'w4pop .25s cubic-bezier(.2,.9,.3,1.2)',
        }}>
          <div style={{ width: 60, height: 60, borderRadius: 13, overflow: 'hidden', flexShrink: 0 }}><Photo color={sel.photo} emoji={sel.emoji} h={60} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15.5 }}>{sel.name}</div>
            <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', margin: '2px 0 6px' }}>{sel.area} · {sel.dist}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><OccPill occ={sel.occ} size="sm" /><span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12.5, fontWeight: 700, color: 'var(--w4-warn)' }}><Icon name="star" size={13} fill="var(--w4-warn)" stroke="var(--w4-warn)" sw={1.4} />{sel.rating}</span></div>
          </div>
          <Icon name="chevron" size={20} style={{ color: 'var(--w4-faint)', transform: 'scaleX(-1)' }} />
        </div>
      )}

      {/* Recommendations bottom sheet */}
      <div style={{ position: 'absolute', insetInline: 0, bottom: 0, zIndex: 8, background: 'var(--w4-bg)', borderRadius: '24px 24px 0 0', boxShadow: '0 -8px 26px rgba(0,0,0,0.10)', paddingBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 9 }}><div style={{ width: 38, height: 5, borderRadius: 999, background: 'var(--w4-border)' }} /></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <Icon name="spark" size={19} style={{ color: 'var(--w4-accent)' }} fill="var(--w4-accent)" stroke="var(--w4-accent)" sw={1.2} />
            <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>מומלצים עבורך</span>
          </div>
          <span style={{ fontSize: 12.5, color: 'var(--w4-muted)', fontWeight: 600 }}>{venues.length} מתחמים</span>
        </div>

        {venues.length === 0 ? (
          <div style={{ padding: '24px 24px 30px', textAlign: 'center' }}>
            <div style={{ fontSize: 30, marginBottom: 6 }}>🔍</div>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--w4-muted)', lineHeight: 1.5 }}>לא נמצאו מתחמי עבודה<br/>העונים על דרישות הסינון הנוכחיות שלך</div>
            <div style={{ marginTop: 14 }}><W4Button size="sm" variant="soft" onClick={() => openSheet('filter')}>שינוי סינון</W4Button></div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 13, overflowX: 'auto', padding: '4px 18px 16px', scrollbarWidth: 'none' }}>
            {venues.map(v => (
              <div key={v.id} onClick={() => openVenue(v.id)} style={{ width: 188, flexShrink: 0, background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', overflow: 'hidden', boxShadow: 'var(--w4-shadow-sm)', cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <Photo color={v.photo} emoji={v.emoji} h={92} />
                  <div style={{ position: 'absolute', top: 8, insetInlineEnd: 8 }}><OccPill occ={v.occ} size="sm" /></div>
                </div>
                <div style={{ padding: '10px 12px 13px' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--w4-muted)', margin: '2px 0 9px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.area} · {v.dist}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 13, fontWeight: 700, color: 'var(--w4-warn)' }}><Icon name="star" size={14} fill="var(--w4-warn)" stroke="var(--w4-warn)" sw={1.4} />{v.rating}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: 'var(--w4-muted)' }}>
                      <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center', fontSize: 12, fontWeight: 600 }}><Icon name="wifi" size={14} />{v.wifi}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 700 }}>{v.price}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Filter side sheet ───────────────────────────────────────
function FilterSheet({ close, filters, setFilters, apply }) {
  const set = (k, v) => setFilters(f => ({ ...f, [k]: v }));
  const radiusLabel = filters.radius >= 10 ? '10+ ק״מ' : filters.radius + ' ק״מ';

  const Toggle = ({ label, k, icon }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 0' }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--w4-accent-soft)', color: 'var(--w4-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={icon} size={18} /></div>
      <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{label}</div>
      <button onClick={() => set(k, !filters[k])} style={{ width: 48, height: 29, borderRadius: 999, border: 'none', cursor: 'pointer', position: 'relative', background: filters[k] ? 'var(--w4-accent)' : 'var(--w4-surface-2)', transition: 'background .2s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 3, insetInlineStart: filters[k] ? 22 : 3, width: 23, height: 23, borderRadius: 999, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'inset-inline-start .2s' }} />
      </button>
    </div>
  );

  return (
    <SheetShell side close={close} title="סינון מתקדם">
      <p style={{ fontSize: 13.5, color: 'var(--w4-muted)', margin: '0 0 18px', lineHeight: 1.5 }}>שינוי זמני של החיפוש — לא משנה את הפרופיל הקבוע שלך.</p>

      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>רדיוס חיפוש</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--w4-accent)' }}>{radiusLabel}</span>
        </div>
        <input type="range" min="1" max="10" step="1" value={filters.radius} onChange={e => set('radius', +e.target.value)}
          style={{ width: '100%', accentColor: 'var(--w4-accent)' }} />
      </div>

      <div style={{ height: 1, background: 'var(--w4-border)', margin: '14px 0' }} />
      <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--w4-muted)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 2 }}>סינוני עבודה</div>
      <Toggle label="סביבה שקטה" k="quiet" icon="noise" />
      <Toggle label="שקעי חשמל זמינים" k="power" icon="power" />
      <Toggle label="אינטרנט מהיר" k="wifi" icon="wifi" />
      <Toggle label="פתוח עכשיו" k="open" icon="clock" />

      <div style={{ height: 1, background: 'var(--w4-border)', margin: '14px 0' }} />
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>טווח מחירים</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {['הכל','₪','₪₪','₪₪₪'].map(p => (
          <button key={p} onClick={() => set('price', p)} style={{ flex: 1, padding: '11px 0', borderRadius: 'var(--w4-radius-sm)', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14.5, fontWeight: 700, background: filters.price === p ? 'var(--w4-accent)' : 'var(--w4-surface-2)', color: filters.price === p ? 'var(--w4-on-accent)' : 'var(--w4-text)' }}>{p}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
        <W4Button variant="neutral" onClick={() => setFilters({ radius: 5, quiet: false, power: false, wifi: false, open: false, price: 'הכל' })}>איפוס</W4Button>
        <W4Button full onClick={apply}>הצג תוצאות</W4Button>
      </div>
    </SheetShell>
  );
}

// ── Generic sliding sheet shell ─────────────────────────────
function SheetShell({ children, close, title, side }) {
  const anim = side ? 'w4slidex' : 'w4slideup';
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 70 }}>
      <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(20,12,6,0.45)', animation: 'w4fade .25s ease' }} />
      <div style={{
        position: 'absolute', insetInlineStart: 0, top: 0, bottom: 0, width: '86%', maxWidth: 360,
        background: 'var(--w4-bg)', boxShadow: '0 0 40px rgba(0,0,0,0.3)',
        animation: `${anim} .3s cubic-bezier(.2,.9,.3,1)`, display: 'flex', flexDirection: 'column',
        borderStartEndRadius: 26, borderEndEndRadius: 26,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '54px 20px 12px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>{title}</h2>
          <button onClick={close} style={{ width: 36, height: 36, borderRadius: 11, border: 'none', background: 'var(--w4-surface-2)', cursor: 'pointer', color: 'var(--w4-text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={20} /></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 28px' }}>{children}</div>
      </div>
    </div>
  );
}

// ── Load forecast graph ─────────────────────────────────────
function ForecastGraph({ data, nowIdx }) {
  const max = Math.max(...data);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 110, direction: 'ltr' }}>
        {data.map((val, i) => {
          const isNow = i === nowIdx;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
              <div title={W4U_HOURS[i] + ':00'} style={{
                width: '100%', maxWidth: 14, height: `${(val / max) * 100}%`, borderRadius: 5,
                background: isNow ? 'var(--w4-accent)' : 'color-mix(in srgb, var(--w4-accent) 26%, transparent)',
                transition: 'height .5s cubic-bezier(.2,.9,.3,1)', position: 'relative',
              }}>
                {isNow && <span style={{ position: 'absolute', top: -17, insetInlineStart: '50%', transform: 'translateX(-50%)', fontSize: 9.5, fontWeight: 800, color: 'var(--w4-accent)', whiteSpace: 'nowrap' }}>עכשיו</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 6, direction: 'ltr' }}>
        {data.map((_, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: i === nowIdx ? 'var(--w4-accent)' : 'var(--w4-faint)', fontWeight: i === nowIdx ? 800 : 500 }}>
            {i % 2 === 0 ? W4U_HOURS[i] : ''}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Venue profile ───────────────────────────────────────────
function VenueScreen({ go, v, openModal, nowIdx = 6 }) {
  if (!v) return null;
  const wifiLabel = ['', 'חלש', 'בינוני', 'סביר', 'טוב', 'מצוין'][v.wifi];
  const noiseLabel = ['', 'שקט מאוד', 'שקט', 'בינוני', 'רועש', 'רועש מאוד'][v.noise];
  const gallery = [v.photo, '#A88B6B', '#7E8B72', '#9A7B86'];

  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', background: 'var(--w4-bg)' }}>
      {/* gallery */}
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}>
          {gallery.map((c, i) => (
            <div key={i} style={{ minWidth: '100%', scrollSnapAlign: 'start' }}><Photo color={c} emoji={i === 0 ? v.emoji : undefined} h={250} label={i === 0 ? 'gallery · Amazon S3' : `photo ${i+1}`} /></div>
          ))}
        </div>
        <button onClick={() => go('home', 'back')} style={{ position: 'absolute', top: 54, insetInlineStart: 16, width: 42, height: 42, borderRadius: 13, border: 'none', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', cursor: 'pointer', color: '#2E2319', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}><Icon name="back" size={22} /></button>
        <div style={{ position: 'absolute', bottom: 12, insetInlineStart: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
          {gallery.map((_, i) => <span key={i} style={{ width: i === 0 ? 18 : 6, height: 6, borderRadius: 999, background: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)' }} />)}
        </div>
      </div>

      {/* content card overlapping gallery */}
      <div style={{ background: 'var(--w4-bg)', borderRadius: '24px 24px 0 0', marginTop: -22, position: 'relative', padding: '20px 20px 110px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 25, fontWeight: 800, margin: '0 0 5px', letterSpacing: '-0.02em' }}>{v.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--w4-muted)', fontSize: 14 }}>
              <Icon name="pin" size={15} /><span>{v.area} · {v.dist}</span>
            </div>
          </div>
          <div style={{ textAlign: 'center', background: 'var(--w4-surface)', borderRadius: 14, padding: '8px 13px', boxShadow: 'var(--w4-shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--w4-warn)', fontWeight: 800, fontSize: 18 }}><Icon name="star" size={17} fill="var(--w4-warn)" stroke="var(--w4-warn)" sw={1.4} />{v.rating}</div>
            <div style={{ fontSize: 11, color: 'var(--w4-muted)', fontWeight: 600 }}>{v.reviews} ביקורות</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0' }}>
          <OccPill occ={v.occ} />
          <span style={{ fontSize: 13, color: 'var(--w4-muted)', fontWeight: 500 }}>עומס נוכחי לפי הקהילה</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
          {v.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>

        <p style={{ fontSize: 14.5, color: 'var(--w4-text)', lineHeight: 1.6, margin: '0 0 20px', opacity: 0.88 }}>{v.blurb}</p>

        {/* forecast */}
        <div style={{ background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', padding: '16px 16px 14px', boxShadow: 'var(--w4-shadow-sm)', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 18 }}>
            <Icon name="clock" size={18} style={{ color: 'var(--w4-accent)' }} />
            <span style={{ fontSize: 15.5, fontWeight: 800 }}>תחזית עומס לפי שעה</span>
          </div>
          <ForecastGraph data={v.forecast} nowIdx={nowIdx} />
        </div>

        {/* specs */}
        <div style={{ background: 'var(--w4-surface)', borderRadius: 'var(--w4-radius)', padding: '6px 16px', boxShadow: 'var(--w4-shadow-sm)' }}>
          <SpecRow icon="wifi" label="איכות אינטרנט" value={wifiLabel} accent />
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <SpecRow icon="power" label="שקעי חשמל" value={v.power} />
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <SpecRow icon="noise" label="רמת רעש" value={noiseLabel} />
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <SpecRow icon="chair" label="ישיבה" value={v.seats} />
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <SpecRow icon="clock" label="שעות פעילות" value={v.hours} />
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <SpecRow icon="shekel" label="טווח מחירים" value={v.price} />
        </div>
      </div>

      {/* bottom CTA */}
      <div style={{ position: 'absolute', insetInline: 0, bottom: 0, padding: '12px 20px 26px', background: 'linear-gradient(to top, var(--w4-bg) 70%, transparent)', display: 'flex', gap: 10 }}>
        <W4Button variant="soft" onClick={() => openModal('rating')} icon="star">דרג</W4Button>
        <W4Button full icon="pin">פתח בניווט</W4Button>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, FilterSheet, SheetShell, VenueScreen, ForecastGraph, MapCanvas });
