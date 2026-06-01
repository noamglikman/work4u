// components/ui/Icon.tsx — simple line-glyph icon set (ported from work4u-ui.jsx).

import type { CSSProperties, ReactNode } from 'react';

export type IconName =
  | 'search'
  | 'pin'
  | 'wifi'
  | 'power'
  | 'noise'
  | 'star'
  | 'chair'
  | 'shekel'
  | 'back'
  | 'filter'
  | 'home'
  | 'user'
  | 'list'
  | 'plus'
  | 'camera'
  | 'clock'
  | 'bell'
  | 'check'
  | 'x'
  | 'edit'
  | 'trash'
  | 'chevron'
  | 'eye'
  | 'eyeoff'
  | 'map'
  | 'coffee'
  | 'upload'
  | 'sliders'
  | 'location'
  | 'spark';

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: string;
  fill?: string;
  sw?: number;
  style?: CSSProperties;
}

export function Icon({
  name,
  size = 22,
  stroke = 'currentColor',
  fill = 'none',
  sw = 1.8,
  style,
}: IconProps) {
  const P = {
    fill,
    stroke,
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const paths: Record<IconName, ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" {...P} />
        <path d="M20 20l-3.5-3.5" {...P} />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" {...P} />
        <circle cx="12" cy="9" r="2.6" {...P} />
      </>
    ),
    wifi: (
      <>
        <path d="M2.5 8.5a16 16 0 0119 0M5.5 12a11 11 0 0113 0M8.5 15.5a6 6 0 017 0" {...P} />
        <circle cx="12" cy="19" r="1" fill={stroke} stroke="none" />
      </>
    ),
    power: <path d="M9 3v6M15 3v6M6 9h12v2a6 6 0 01-12 0V9zM12 17v4" {...P} />,
    noise: (
      <>
        <path d="M4 9v6h4l5 4V5L8 9H4z" {...P} />
        <path d="M17 8.5a5 5 0 010 7" {...P} />
      </>
    ),
    star: (
      <path
        d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z"
        {...P}
      />
    ),
    chair: <path d="M6 4v7h12V4M6 11l-1 5M18 11l1 5M7 16h10M9 20v-4M15 20v-4" {...P} />,
    shekel: <path d="M6 6v9a3 3 0 003 3M6 6h6a3 3 0 013 3v9M18 18V9" {...P} />,
    back: <path d="M9 5l7 7-7 7" {...P} />,
    filter: <path d="M4 6h16M7 12h10M10 18h4" {...P} />,
    home: <path d="M4 11l8-7 8 7M6 9.5V20h12V9.5" {...P} />,
    user: (
      <>
        <circle cx="12" cy="8" r="3.6" {...P} />
        <path d="M5 20a7 7 0 0114 0" {...P} />
      </>
    ),
    list: (
      <>
        <path d="M8 6h12M8 12h12M8 18h12" {...P} />
        <circle cx="4" cy="6" r="1" fill={stroke} stroke="none" />
        <circle cx="4" cy="12" r="1" fill={stroke} stroke="none" />
        <circle cx="4" cy="18" r="1" fill={stroke} stroke="none" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" {...P} />,
    camera: (
      <>
        <path d="M4 8h3l1.5-2h7L17 8h3v11H4V8z" {...P} />
        <circle cx="12" cy="13" r="3.4" {...P} />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" {...P} />
        <path d="M12 7.5V12l3 2" {...P} />
      </>
    ),
    bell: (
      <>
        <path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" {...P} />
        <path d="M10 20a2 2 0 004 0" {...P} />
      </>
    ),
    check: <path d="M5 12.5l4.5 4.5L19 7" {...P} />,
    x: <path d="M6 6l12 12M18 6L6 18" {...P} />,
    edit: <path d="M5 19h14M7 15l9.5-9.5a2 2 0 113 3L10 18l-4 1 1-4z" {...P} />,
    trash: <path d="M5 7h14M9 7V5h6v2M7 7l1 12h8l1-12" {...P} />,
    chevron: <path d="M9 6l6 6-6 6" {...P} />,
    eye: (
      <>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" {...P} />
        <circle cx="12" cy="12" r="3" {...P} />
      </>
    ),
    eyeoff: (
      <>
        <path
          d="M4 4l16 16M9.5 9.6A3 3 0 0014.4 14M7 7.3C4.3 8.9 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.6 0 3-.4 4.3-1M11 5.6c.3 0 .7-.1 1-.1 6 0 9.5 6.5 9.5 6.5s-.8 1.4-2.2 2.9"
          {...P}
        />
      </>
    ),
    map: (
      <>
        <path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z" {...P} />
        <path d="M9 4v14M15 6v14" {...P} />
      </>
    ),
    coffee: (
      <path
        d="M5 9h12v4a5 5 0 01-10 0V9zM17 10h2a2 2 0 010 4h-2M7 4c0 1-1 1-1 2M11 4c0 1-1 1-1 2"
        {...P}
      />
    ),
    upload: <path d="M12 16V4M8 8l4-4 4 4M5 16v3a1 1 0 001 1h12a1 1 0 001-1v-3" {...P} />,
    sliders: (
      <>
        <path d="M5 7h9M18 7h1M5 17h1M10 17h9" {...P} />
        <circle cx="16" cy="7" r="2" {...P} />
        <circle cx="8" cy="17" r="2" {...P} />
      </>
    ),
    location: (
      <>
        <circle cx="12" cy="12" r="3" {...P} />
        <path d="M12 2v3M12 19v3M22 12h-3M5 12H2" {...P} />
      </>
    ),
    spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" {...P} />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
      {paths[name] ?? null}
    </svg>
  );
}
