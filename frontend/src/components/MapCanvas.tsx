// components/MapCanvas.tsx — stylised map (ported from work4u-screens-main.jsx).
// Real venue coordinates are projected onto the canvas via lib/geo.projectVenues,
// so the decorative map works with live data, not hardcoded percentages.

import { useMemo } from 'react';
import type { VenuePreview } from '../types/view';
import type { LatLng } from '../lib/geo';
import { projectUser, projectVenues } from '../lib/geo';
import { OCC } from '../lib/labels';

interface MapCanvasProps {
  venues: VenuePreview[];
  onPin: (id: string) => void;
  selected: string | null;
  location: LatLng;
}

export function MapCanvas({ venues, onPin, selected, location }: MapCanvasProps) {
  const points = useMemo(
    () => venues.map((v) => ({ id: v.id, lat: v.lat, lng: v.lng })),
    [venues],
  );
  const positions = useMemo(() => projectVenues(points, location), [points, location]);
  const userPoint = useMemo(() => projectUser(points, location), [points, location]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--w4-map)', overflow: 'hidden' }}>
      {/* parks */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          insetInlineStart: '6%',
          width: 95,
          height: 80,
          borderRadius: 18,
          background: 'var(--w4-map-park)',
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '14%',
          insetInlineEnd: '8%',
          width: 120,
          height: 70,
          borderRadius: 18,
          background: 'var(--w4-map-park)',
          opacity: 0.9,
        }}
      />
      {/* water */}
      <div
        style={{
          position: 'absolute',
          top: '-6%',
          insetInlineEnd: '-12%',
          width: 180,
          height: 200,
          borderRadius: '50%',
          background: 'var(--w4-map-water)',
          opacity: 0.8,
        }}
      />
      {/* roads */}
      {[18, 44, 70].map((t, i) => (
        <div
          key={'h' + i}
          style={{
            position: 'absolute',
            top: t + '%',
            left: 0,
            right: 0,
            height: 13,
            background: 'var(--w4-map-road)',
          }}
        />
      ))}
      {[26, 58, 82].map((l, i) => (
        <div
          key={'v' + i}
          style={{
            position: 'absolute',
            insetInlineStart: l + '%',
            top: 0,
            bottom: 0,
            width: 13,
            background: 'var(--w4-map-road)',
          }}
        />
      ))}
      {/* building blocks */}
      {[
        [10, 34, 40, 26],
        [55, 8, 30, 22],
        [64, 60, 30, 26],
        [8, 72, 34, 18],
        [38, 68, 40, 22],
      ].map((b, i) => (
        <div
          key={'b' + i}
          style={{
            position: 'absolute',
            top: b[0] + '%',
            insetInlineStart: b[1] + '%',
            width: b[2] + '%',
            height: b[3] + '%',
            background: 'rgba(0,0,0,0.04)',
            borderRadius: 8,
          }}
        />
      ))}
      {/* user location */}
      <div
        style={{
          position: 'absolute',
          top: userPoint.top + '%',
          insetInlineStart: userPoint.left + '%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: 'var(--w4-accent)',
            border: '3px solid #fff',
            boxShadow:
              '0 0 0 6px color-mix(in srgb, var(--w4-accent) 22%, transparent), 0 2px 6px rgba(0,0,0,0.25)',
          }}
        />
      </div>
      {/* pins */}
      {venues.map((v) => {
        const o = OCC[v.crowdLevel];
        const on = selected === v.id;
        const pos = positions[v.id] ?? { top: 50, left: 50 };
        return (
          <button
            key={v.id}
            onClick={() => onPin(v.id)}
            title={v.name}
            style={{
              position: 'absolute',
              top: pos.top + '%',
              insetInlineStart: pos.left + '%',
              transform: `translate(-50%,-100%) scale(${on ? 1.12 : 1})`,
              transformOrigin: 'bottom center',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'transform .2s cubic-bezier(.2,.9,.3,1.3)',
              zIndex: on ? 6 : 4,
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50% 50% 50% 4px',
                transform: 'rotate(45deg)',
                background: o.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: on ? '3px solid #fff' : '2.5px solid #fff',
              }}
            >
              <span style={{ transform: 'rotate(-45deg)', fontSize: 17 }}>{v.emoji}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
