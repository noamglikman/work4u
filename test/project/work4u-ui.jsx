// work4u-ui.jsx — icons + shared UI primitives. Exports to window.
const { useState, useEffect, useRef } = React;

// ── Icons (simple line glyphs) ──────────────────────────────
function Icon({ name, size = 22, stroke = 'currentColor', fill = 'none', sw = 1.8, style }) {
  const P = { fill, stroke, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    search:   <><circle cx="11" cy="11" r="7" {...P}/><path d="M20 20l-3.5-3.5" {...P}/></>,
    pin:      <><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" {...P}/><circle cx="12" cy="9" r="2.6" {...P}/></>,
    wifi:     <><path d="M2.5 8.5a16 16 0 0119 0M5.5 12a11 11 0 0113 0M8.5 15.5a6 6 0 017 0" {...P}/><circle cx="12" cy="19" r="1" fill={stroke} stroke="none"/></>,
    power:    <><path d="M9 3v6M15 3v6M6 9h12v2a6 6 0 01-12 0V9zM12 17v4" {...P}/></>,
    noise:    <><path d="M4 9v6h4l5 4V5L8 9H4z" {...P}/><path d="M17 8.5a5 5 0 010 7" {...P}/></>,
    star:     <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" {...P}/>,
    chair:    <><path d="M6 4v7h12V4M6 11l-1 5M18 11l1 5M7 16h10M9 20v-4M15 20v-4" {...P}/></>,
    shekel:   <><path d="M6 6v9a3 3 0 003 3M6 6h6a3 3 0 013 3v9M18 18V9" {...P}/></>,
    back:     <path d="M9 5l7 7-7 7" {...P}/>,
    filter:   <><path d="M4 6h16M7 12h10M10 18h4" {...P}/></>,
    home:     <><path d="M4 11l8-7 8 7M6 9.5V20h12V9.5" {...P}/></>,
    user:     <><circle cx="12" cy="8" r="3.6" {...P}/><path d="M5 20a7 7 0 0114 0" {...P}/></>,
    list:     <><path d="M8 6h12M8 12h12M8 18h12" {...P}/><circle cx="4" cy="6" r="1" fill={stroke} stroke="none"/><circle cx="4" cy="12" r="1" fill={stroke} stroke="none"/><circle cx="4" cy="18" r="1" fill={stroke} stroke="none"/></>,
    plus:     <path d="M12 5v14M5 12h14" {...P}/>,
    camera:   <><path d="M4 8h3l1.5-2h7L17 8h3v11H4V8z" {...P}/><circle cx="12" cy="13" r="3.4" {...P}/></>,
    clock:    <><circle cx="12" cy="12" r="8.5" {...P}/><path d="M12 7.5V12l3 2" {...P}/></>,
    bell:     <><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" {...P}/><path d="M10 20a2 2 0 004 0" {...P}/></>,
    check:    <path d="M5 12.5l4.5 4.5L19 7" {...P}/>,
    x:        <path d="M6 6l12 12M18 6L6 18" {...P}/>,
    edit:     <><path d="M5 19h14M7 15l9.5-9.5a2 2 0 113 3L10 18l-4 1 1-4z" {...P}/></>,
    trash:    <><path d="M5 7h14M9 7V5h6v2M7 7l1 12h8l1-12" {...P}/></>,
    chevron:  <path d="M9 6l6 6-6 6" {...P}/>,
    eye:      <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" {...P}/><circle cx="12" cy="12" r="3" {...P}/></>,
    eyeoff:   <><path d="M4 4l16 16M9.5 9.6A3 3 0 0014.4 14M7 7.3C4.3 8.9 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.6 0 3-.4 4.3-1M11 5.6c.3 0 .7-.1 1-.1 6 0 9.5 6.5 9.5 6.5s-.8 1.4-2.2 2.9" {...P}/></>,
    map:      <><path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z" {...P}/><path d="M9 4v14M15 6v14" {...P}/></>,
    coffee:   <><path d="M5 9h12v4a5 5 0 01-10 0V9zM17 10h2a2 2 0 010 4h-2M7 4c0 1-1 1-1 2M11 4c0 1-1 1-1 2" {...P}/></>,
    upload:   <><path d="M12 16V4M8 8l4-4 4 4M5 16v3a1 1 0 001 1h12a1 1 0 001-1v-3" {...P}/></>,
    sliders:  <><path d="M5 7h9M18 7h1M5 17h1M10 17h9" {...P}/><circle cx="16" cy="7" r="2" {...P}/><circle cx="8" cy="17" r="2" {...P}/></>,
    location: <><circle cx="12" cy="12" r="3" {...P}/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2" {...P}/></>,
    spark:    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" {...P}/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      {paths[name] || null}
    </svg>
  );
}

// ── Button ──────────────────────────────────────────────────
function W4Button({ children, onClick, variant = 'primary', full, disabled, size = 'lg', icon, style }) {
  const [press, setPress] = useState(false);
  const pad = size === 'lg' ? '15px 22px' : size === 'sm' ? '8px 14px' : '12px 18px';
  const fs = size === 'lg' ? 17 : size === 'sm' ? 14 : 15.5;
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    width: full ? '100%' : undefined, padding: pad, fontSize: fs, fontWeight: 600,
    fontFamily: 'inherit', border: 'none', borderRadius: 'var(--w4-radius-sm)',
    cursor: disabled ? 'default' : 'pointer', letterSpacing: '-0.01em',
    transition: 'transform .12s ease, filter .12s ease, background .15s ease',
    transform: press ? 'scale(0.97)' : 'scale(1)', opacity: disabled ? 0.45 : 1,
    boxSizing: 'border-box', WebkitTapHighlightColor: 'transparent', whiteSpace: 'nowrap',
  };
  const variants = {
    primary: { background: 'var(--w4-accent)', color: 'var(--w4-on-accent)', boxShadow: 'var(--w4-shadow-sm)' },
    soft:    { background: 'var(--w4-accent-soft)', color: 'var(--w4-accent)' },
    ghost:   { background: 'transparent', color: 'var(--w4-accent)' },
    neutral: { background: 'var(--w4-surface-2)', color: 'var(--w4-text)' },
    outline: { background: 'transparent', color: 'var(--w4-text)', boxShadow: 'inset 0 0 0 1.5px var(--w4-border)' },
  };
  return (
    <button
      onMouseDown={() => !disabled && setPress(true)}
      onMouseUp={() => setPress(false)} onMouseLeave={() => setPress(false)}
      onClick={() => !disabled && onClick && onClick()}
      style={{ ...base, ...variants[variant], ...style }}>
      {icon && <Icon name={icon} size={fs + 2} />}{children}
    </button>
  );
}

// ── Text field ──────────────────────────────────────────────
function W4Field({ label, value, onChange, type = 'text', placeholder, error, trailing, onTrailing, autoFocus }) {
  const [focus, setFocus] = useState(false);
  return (
    <label style={{ display: 'block' }}>
      {label && <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--w4-muted)', marginBottom: 7, paddingInlineStart: 2 }}>{label}</div>}
      <div style={{
        display: 'flex', alignItems: 'center', background: 'var(--w4-surface)',
        borderRadius: 'var(--w4-radius-sm)', padding: '0 14px',
        boxShadow: error ? 'inset 0 0 0 1.5px var(--w4-danger)' : focus ? 'inset 0 0 0 1.5px var(--w4-accent)' : 'inset 0 0 0 1.5px var(--w4-border)',
        transition: 'box-shadow .15s ease',
      }}>
        <input
          type={type} value={value} placeholder={placeholder} autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            padding: '14px 0', fontSize: 16, fontFamily: 'inherit', color: 'var(--w4-text)',
            minWidth: 0,
          }} />
        {trailing && (
          <button onClick={onTrailing} style={{ border: 'none', background: 'transparent', color: 'var(--w4-faint)', cursor: 'pointer', padding: 4, display: 'flex' }}>
            <Icon name={trailing} size={20} />
          </button>
        )}
      </div>
      {error && <div style={{ fontSize: 12.5, color: 'var(--w4-danger)', marginTop: 6, paddingInlineStart: 2, fontWeight: 500 }}>{error}</div>}
    </label>
  );
}

// ── Stars ───────────────────────────────────────────────────
function Stars({ value = 0, size = 16, onRate, gap = 2 }) {
  return (
    <div style={{ display: 'inline-flex', gap, direction: 'ltr' }}>
      {[1,2,3,4,5].map(n => (
        <span key={n} onClick={onRate ? () => onRate(n) : undefined}
          style={{ cursor: onRate ? 'pointer' : 'default', display: 'flex', color: n <= value ? 'var(--w4-warn)' : 'var(--w4-faint)' }}>
          <Icon name="star" size={size} fill={n <= value ? 'var(--w4-warn)' : 'none'} stroke={n <= value ? 'var(--w4-warn)' : 'var(--w4-faint)'} sw={1.6} />
        </span>
      ))}
    </div>
  );
}

// ── Occupancy pill ──────────────────────────────────────────
function OccPill({ occ, size = 'md' }) {
  const o = W4U_OCC[occ];
  const sm = size === 'sm';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: o.soft, color: o.color, fontWeight: 700,
      fontSize: sm ? 12 : 13, padding: sm ? '4px 9px' : '6px 12px',
      borderRadius: 999, letterSpacing: '-0.01em', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: sm ? 6 : 7, height: sm ? 6 : 7, borderRadius: 999, background: o.color }} />
      {o.label}
    </span>
  );
}

// ── Tag chip ────────────────────────────────────────────────
function Tag({ children, active, onClick, icon }) {
  return (
    <span onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '7px 13px', borderRadius: 999, fontSize: 13.5, fontWeight: 600,
      whiteSpace: 'nowrap', cursor: onClick ? 'pointer' : 'default',
      background: active ? 'var(--w4-accent)' : 'var(--w4-surface-2)',
      color: active ? 'var(--w4-on-accent)' : 'var(--w4-text)',
      transition: 'background .15s, color .15s', letterSpacing: '-0.01em',
    }}>
      {icon && <Icon name={icon} size={15} sw={2} />}{children}
    </span>
  );
}

// ── Toast ───────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const tone = toast.tone || 'default';
  const colors = {
    default: { bg: 'var(--w4-text)', fg: 'var(--w4-bg)' },
    success: { bg: 'var(--w4-success)', fg: '#fff' },
    danger:  { bg: 'var(--w4-danger)', fg: '#fff' },
  }[tone];
  return (
    <div style={{
      position: 'absolute', insetInline: 16, bottom: 92, zIndex: 80,
      display: 'flex', alignItems: 'center', gap: 10,
      background: colors.bg, color: colors.fg, padding: '13px 16px',
      borderRadius: 14, boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
      fontSize: 14.5, fontWeight: 600, animation: 'w4toast .3s cubic-bezier(.2,.9,.3,1.2)',
    }}>
      {toast.tone === 'success' && <Icon name="check" size={19} sw={2.4} />}
      {toast.tone === 'danger' && <Icon name="x" size={19} sw={2.4} />}
      <span style={{ flex: 1 }}>{toast.msg}</span>
    </div>
  );
}

// ── Photo placeholder (striped) ─────────────────────────────
function Photo({ color = '#C98A5A', emoji, h = 150, label, radius = 0 }) {
  return (
    <div style={{
      height: h, borderRadius: radius, position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.16,
        backgroundImage: 'repeating-linear-gradient(45deg, #000 0 2px, transparent 2px 11px)',
      }} />
      {emoji && <span style={{ fontSize: h > 110 ? 46 : 28, position: 'relative', filter: 'saturate(1.1)' }}>{emoji}</span>}
      {label && <span style={{ position: 'absolute', bottom: 8, insetInlineStart: 10, fontSize: 10.5, fontFamily: 'ui-monospace, monospace', color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.25)', padding: '2px 6px', borderRadius: 5 }}>{label}</span>}
    </div>
  );
}

// ── Spec row (icon + label + value) ─────────────────────────
function SpecRow({ icon, label, value, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0' }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--w4-accent-soft)', color: 'var(--w4-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={icon} size={19} />
      </div>
      <div style={{ flex: 1, fontSize: 14.5, color: 'var(--w4-muted)', fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 14.5, fontWeight: 700, color: accent ? 'var(--w4-accent)' : 'var(--w4-text)' }}>{value}</div>
    </div>
  );
}

Object.assign(window, { Icon, W4Button, W4Field, Stars, OccPill, Tag, Toast, Photo, SpecRow });
