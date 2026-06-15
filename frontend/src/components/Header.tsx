// components/Header.tsx — top navigation bar (ported from WebHeader).

import { useAuth } from '../context/AuthContext';
import type { Navigate, Screen } from '../types/nav';
import { Button, Icon, type IconName } from './ui';

interface HeaderProps {
  screen: Screen;
  go: Navigate;
  isAdmin: boolean;
  openAdmin: () => void;
  openAdminVenues: () => void;
}

function avatarInitial(email: string | undefined): string {
  const ch = (email ?? '').trim()[0];
  return ch ? ch.toUpperCase() : 'נ';
}

export function Header({ screen, go, isAdmin, openAdmin,
  openAdminVenues }: HeaderProps) {
  const { session } = useAuth();

  const Item = ({ to, icon, label }: { to: Screen; icon: IconName; label: string }) => {
    const on = screen === to || (to === 'home' && screen === 'venue');
    return (
      <button
        onClick={() => go(to)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 14.5,
          fontWeight: 700,
          padding: '9px 14px',
          borderRadius: 999,
          background: on ? 'var(--w4-accent-soft)' : 'transparent',
          color: on ? 'var(--w4-accent)' : 'var(--w4-muted)',
          transition: 'all .15s',
        }}
      >
        <Icon name={icon} size={18} sw={on ? 2.1 : 1.8} />
        {label}
      </button>
    );
  };

  return (
    <header
      style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '0 26px',
        background: 'color-mix(in srgb, var(--w4-surface) 90%, transparent)',
        backdropFilter: 'blur(14px) saturate(180%)',
        WebkitBackdropFilter: 'blur(14px) saturate(180%)',
        borderBottom: '1px solid var(--w4-border)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        flexShrink: 0,
      }}
    >
      <button
        onClick={() => go('home')}
        style={{
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: 0,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: 'var(--w4-accent)',
            color: 'var(--w4-on-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="coffee" size={22} sw={1.9} />
        </div>
        <span
          style={{
            fontSize: 21,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            direction: 'ltr',
            color: 'var(--w4-text)',
          }}
        >
          Work<span style={{ color: 'var(--w4-accent)' }}>4U</span>
        </span>
      </button>
      <nav className="w4-nav" style={{ display: 'flex', gap: 4, marginInlineStart: 14 }}>
        <Item to="home" icon="map" label="מפה" />
        <Item to="history" icon="list" label="הדירוגים שלי" />
      </nav>
      <div style={{ flex: 1 }} />
      {isAdmin && (
        <Button size="sm" variant="soft" icon="plus" onClick={openAdmin}>
          הוספת מתחם
        </Button>
      )}
      <button
        onClick={() => go('profile')}
        title="הפרופיל שלי"
        style={{
          width: 40,
          height: 40,
          borderRadius: 999,
          border: '2px solid var(--w4-border)',
          cursor: 'pointer',
          background: 'var(--w4-accent)',
          color: 'var(--w4-on-accent)',
          fontSize: 16,
          fontWeight: 800,
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          direction: 'ltr',
        }}
      >
        {avatarInitial(session?.user.email)}
      </button>
          <button
            onClick={openAdminVenues}
            style={{
              border: 'none',
              borderRadius: 999,
              padding: '10px 16px',
              background: 'var(--w4-surface-2)',
              color: 'var(--w4-text)',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: 'var(--w4-shadow-sm)',
            }}
          >
            ניהול מקומות
          </button>
    </header>
  );
}
