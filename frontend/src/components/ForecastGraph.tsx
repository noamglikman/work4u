// components/ForecastGraph.tsx — hourly crowd forecast bars (ported from
// work4u-screens-main.jsx). Renders whatever the backend returns: each bar's
// height is derived from its crowdLevel (see lib/labels.CROWD_HEIGHT), so it
// works with the contract's 3-point forecast or a richer hourly one.

import type { ForecastBar } from '../types/view';

interface ForecastGraphProps {
  data: ForecastBar[];
  nowIdx: number;
}

export function ForecastGraph({ data, nowIdx }: ForecastGraphProps) {
  if (data.length === 0) {
    return (
      <div style={{ fontSize: 13.5, color: 'var(--w4-muted)', padding: '8px 0' }}>
        אין עדיין מספיק דיווחים לתחזית עומס.
      </div>
    );
  }
  const max = Math.max(...data.map((d) => d.value), 1);
  // Label density: show every bar's hour when sparse, every 2nd when dense.
  const labelStep = data.length > 8 ? 2 : 1;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 110, direction: 'ltr' }}>
        {data.map((bar, i) => {
          const isNow = i === nowIdx;
          return (
            <div
              key={bar.hour + i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '100%',
              }}
            >
              <div
                title={`${bar.hour}`}
                style={{
                  width: '100%',
                  maxWidth: 14,
                  height: `${(bar.value / max) * 100}%`,
                  borderRadius: 5,
                  background: isNow
                    ? 'var(--w4-accent)'
                    : 'color-mix(in srgb, var(--w4-accent) 26%, transparent)',
                  transition: 'height .5s cubic-bezier(.2,.9,.3,1)',
                  position: 'relative',
                }}
              >
                {isNow && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -17,
                      insetInlineStart: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 9.5,
                      fontWeight: 800,
                      color: 'var(--w4-accent)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    עכשיו
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 6, direction: 'ltr' }}>
        {data.map((bar, i) => (
          <div
            key={bar.hour + i}
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 9,
              color: i === nowIdx ? 'var(--w4-accent)' : 'var(--w4-faint)',
              fontWeight: i === nowIdx ? 800 : 500,
            }}
          >
            {i % labelStep === 0 ? bar.hourShort : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
