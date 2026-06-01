// screens/Preferences.tsx — onboarding + edit of the user's workspace preferences.
// Form state is the API-contract shape (UserPreferencesInput); the toggles/chips
// just map enum values to Hebrew. Saving calls POST /preferences.

import { useEffect, useState, type ReactNode } from 'react';
import { ApiError } from '../api';
import { usePreferences } from '../hooks/usePreferences';
import { useToast } from '../context/ToastContext';
import type { Navigate } from '../types/nav';
import type { PriceRange, UserPreferencesInput } from '../types/api';
import { PRICE_LABEL, SEAT_LABEL, SEAT_OPTIONS } from '../lib/labels';
import { Button, Icon, Tag } from '../components/ui';
import type { IconName } from '../components/ui';

const FALLBACK: UserPreferencesInput = {
  quietEnvironment: true,
  needPowerOutlet: true,
  wifiQuality: 'high',
  preferredSeatType: 'table',
  priceRange: 'medium',
};

const PRICE_OPTIONS: PriceRange[] = ['low', 'medium', 'high'];

export function Preferences({ go, onboarding }: { go: Navigate; onboarding: boolean }) {
  const { preferences, loading, saving, save } = usePreferences();
  const { toast } = useToast();
  const [form, setForm] = useState<UserPreferencesInput>(FALLBACK);

  useEffect(() => {
    if (preferences) {
      setForm({
        quietEnvironment: preferences.quietEnvironment,
        needPowerOutlet: preferences.needPowerOutlet,
        wifiQuality: preferences.wifiQuality,
        preferredSeatType: preferences.preferredSeatType,
        priceRange: preferences.priceRange,
      });
    }
  }, [preferences]);

  const set = <K extends keyof UserPreferencesInput>(k: K, v: UserPreferencesInput[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const onSave = async () => {
    try {
      await save(form);
      toast('הפרופיל האישי שלך עודכן בהצלחה! התוצאות יותאמו עבורך אוטומטית', 'success');
      setTimeout(() => go('home'), 600);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'שמירת ההעדפות נכשלה', 'danger');
    }
  };

  const fastWifi = form.wifiQuality === 'high';

  const ToggleRow = ({
    icon,
    label,
    sub,
    value,
    onToggle,
  }: {
    icon: IconName;
    label: string;
    sub?: string;
    value: boolean;
    onToggle: () => void;
  }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '15px 0' }}>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          background: 'var(--w4-accent-soft)',
          color: 'var(--w4-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15.5, fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ fontSize: 12.5, color: 'var(--w4-muted)', marginTop: 1 }}>{sub}</div>}
      </div>
      <button
        onClick={onToggle}
        style={{
          width: 50,
          height: 30,
          borderRadius: 999,
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          background: value ? 'var(--w4-accent)' : 'var(--w4-surface-2)',
          transition: 'background .2s',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            insetInlineStart: value ? 23 : 3,
            width: 24,
            height: 24,
            borderRadius: 999,
            background: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transition: 'inset-inline-start .2s',
          }}
        />
      </button>
    </div>
  );

  const Card = ({ title, children }: { title?: string; children: ReactNode }) => (
    <div
      style={{
        background: 'var(--w4-surface)',
        borderRadius: 'var(--w4-radius)',
        padding: '6px 20px 14px',
        boxShadow: 'var(--w4-shadow-sm)',
      }}
    >
      {title && (
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: 'var(--w4-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            padding: '16px 0 4px',
          }}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  );

  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '40px 24px 60px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          {onboarding ? 'נגדיר את ההעדפות שלך' : 'פרופיל והעדפות'}
        </h1>
        <p style={{ fontSize: 15.5, color: 'var(--w4-muted)', margin: 0, lineHeight: 1.5 }}>
          נתאים עבורך אוטומטית את התוצאות הטובות ביותר.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          opacity: loading ? 0.55 : 1,
          transition: 'opacity .2s',
        }}
      >
        <Card title="סביבת עבודה">
          <ToggleRow
            icon="noise"
            label="סביבה שקטה"
            sub="עדיפות למקומות עם רעש נמוך"
            value={form.quietEnvironment}
            onToggle={() => set('quietEnvironment', !form.quietEnvironment)}
          />
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <ToggleRow
            icon="power"
            label="צורך בשקעי חשמל"
            sub="להציג רק מקומות עם שקעים זמינים"
            value={form.needPowerOutlet}
            onToggle={() => set('needPowerOutlet', !form.needPowerOutlet)}
          />
          <div style={{ height: 1, background: 'var(--w4-border)' }} />
          <ToggleRow
            icon="wifi"
            label="אינטרנט מהיר חובה"
            sub="Wi-Fi איכותי ויציב"
            value={fastWifi}
            onToggle={() => set('wifiQuality', fastWifi ? 'medium' : 'high')}
          />
        </Card>

        <Card title="סוג ישיבה מועדף">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, padding: '14px 0 18px' }}>
            {SEAT_OPTIONS.map((s) => (
              <Tag
                key={s}
                active={form.preferredSeatType === s}
                onClick={() => set('preferredSeatType', s)}
              >
                {SEAT_LABEL[s]}
              </Tag>
            ))}
          </div>
        </Card>

        <Card title="טווח מחירים">
          <div style={{ display: 'flex', gap: 10, padding: '14px 0 18px' }}>
            {PRICE_OPTIONS.map((p) => (
              <button
                key={p}
                onClick={() => set('priceRange', p)}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  borderRadius: 'var(--w4-radius-sm)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 16,
                  fontWeight: 700,
                  transition: 'all .15s',
                  background: form.priceRange === p ? 'var(--w4-accent)' : 'var(--w4-surface-2)',
                  color: form.priceRange === p ? 'var(--w4-on-accent)' : 'var(--w4-text)',
                }}
              >
                {PRICE_LABEL[p]}
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
        {!onboarding && (
          <Button variant="neutral" onClick={() => go('home')}>
            ביטול
          </Button>
        )}
        <Button onClick={onSave} disabled={saving} style={{ minWidth: 200 }}>
          {saving ? 'שומר…' : onboarding ? 'שמור פרופיל והמשך' : 'שמור שינויים'}
        </Button>
      </div>
    </div>
  );
}
