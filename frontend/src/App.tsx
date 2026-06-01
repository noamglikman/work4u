// App.tsx — top-level controller: routing, global UI state, and the data wiring
// for the home venue list + smart-push (ported from work4u-web-app.jsx).

import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { useGeolocation } from './hooks/useGeolocation';
import { useVenues } from './hooks/useVenues';
import { buildVenueQuery, DEFAULT_FILTERS, type Filters } from './lib/filters';
import { isOpenNow } from './lib/hours';
import { buildRootVars } from './lib/theme';
import type { Screen } from './types/nav';

import { Header } from './components/Header';
import { PushCard } from './components/PushCard';
import { AppearanceSettings } from './components/AppearanceSettings';
import { ForgotDialog } from './components/dialogs/ForgotDialog';
import { AdminDialog } from './components/dialogs/AdminDialog';
import { RatingModal } from './components/dialogs/RatingModal';

import { Login } from './screens/Login';
import { Signup } from './screens/Signup';
import { Preferences } from './screens/Preferences';
import { Home } from './screens/Home';
import { Venue } from './screens/Venue';
import { History } from './screens/History';
import { Profile } from './screens/Profile';

type Overlay = 'forgot' | 'admin' | null;
type RatingTarget = { id: string; name: string } | null;

const isAuthScreen = (s: Screen) => s === 'login' || s === 'signup';

export default function App() {
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const { tweaks } = useTheme();
  const { location } = useGeolocation();

  const [screen, setScreen] = useState<Screen | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [ratingTarget, setRatingTarget] = useState<RatingTarget>(null);
  const [push, setPush] = useState<RatingTarget>(null);
  const pushedOnce = useRef(false);

  // Decide the first screen once auth state has resolved.
  useEffect(() => {
    if (!authLoading && screen === null) {
      setScreen(isAuthenticated ? 'home' : 'login');
    }
  }, [authLoading, isAuthenticated, screen]);

  const go = (s: Screen) => {
    setScreen(s);
    if (s !== 'venue') window.scrollTo(0, 0);
  };
  const openVenue = (id: string) => {
    setSelectedVenueId(id);
    go('venue');
  };

  // Home venue list — only fetched once authenticated.
  const query = useMemo(() => buildVenueQuery(filters, search, location), [filters, search, location]);
  const { venues, loading: venuesLoading, error: venuesError, reload: reloadVenues } = useVenues(
    query,
    location,
    isAuthenticated,
  );
  const visibleVenues = useMemo(
    () => (filters.open ? venues.filter((v) => isOpenNow(v.openingHours)) : venues),
    [venues, filters.open],
  );

  // Smart-push: nudge the user to rate the top recommendation after a beat.
  useEffect(() => {
    if (
      screen === 'home' &&
      tweaks.smartPush &&
      !isAdmin &&
      !pushedOnce.current &&
      visibleVenues.length > 0
    ) {
      const top = visibleVenues[0];
      const t = setTimeout(() => {
        setPush({ id: top.id, name: top.name });
        pushedOnce.current = true;
      }, 4200);
      return () => clearTimeout(t);
    }
  }, [screen, tweaks.smartPush, isAdmin, visibleVenues]);

  const rootVars = buildRootVars(tweaks);

  if (authLoading || screen === null) {
    return (
      <div
        style={{
          ...rootVars,
          background: 'var(--w4-bg)',
          color: 'var(--w4-muted)',
          direction: 'rtl',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 15,
        }}
      >
        טוען…
      </div>
    );
  }

  // Guard protected screens if somehow reached while signed out.
  const effective: Screen = !isAuthenticated && !isAuthScreen(screen) ? 'login' : screen;

  let content: React.ReactNode = null;
  if (effective === 'login') {
    content = <Login go={go} openForgot={() => setOverlay('forgot')} />;
  } else if (effective === 'signup') {
    content = <Signup go={go} />;
  } else if (effective === 'prefs') {
    content = <Preferences go={go} onboarding />;
  } else if (effective === 'prefs-edit') {
    content = <Preferences go={go} onboarding={false} />;
  } else if (effective === 'home') {
    content = (
      <Home
        openVenue={openVenue}
        venues={visibleVenues}
        loading={venuesLoading}
        error={venuesError}
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
        location={location}
      />
    );
  } else if (effective === 'venue' && selectedVenueId) {
    content = (
      <Venue
        venueId={selectedVenueId}
        go={go}
        location={location}
        openRating={(t) => setRatingTarget(t)}
      />
    );
  } else if (effective === 'history') {
    content = <History openVenue={openVenue} />;
  } else if (effective === 'profile') {
    content = <Profile go={go} />;
  }

  const isAuth = isAuthScreen(effective);
  const fillHeight = effective === 'home';

  return (
    <>
      <div
        style={{
          ...rootVars,
          background: 'var(--w4-bg)',
          color: 'var(--w4-text)',
          direction: 'rtl',
          minHeight: '100vh',
          height: fillHeight ? '100vh' : undefined,
          display: 'flex',
          flexDirection: 'column',
          overflow: fillHeight ? 'hidden' : undefined,
        }}
      >
        {isAuth ? (
          content
        ) : (
          <>
            <Header screen={effective} go={go} isAdmin={isAdmin} openAdmin={() => setOverlay('admin')} />
            <main style={{ flex: 1, overflowY: fillHeight ? 'hidden' : 'auto' }}>{content}</main>
          </>
        )}

        <PushCard
          venue={push ? visibleVenues.find((v) => v.id === push.id) ?? null : null}
          onOpen={() => {
            if (push) setRatingTarget(push);
            setPush(null);
          }}
          onClose={() => setPush(null)}
        />

        {overlay === 'forgot' && <ForgotDialog close={() => setOverlay(null)} />}
        {overlay === 'admin' && (
          <AdminDialog close={() => setOverlay(null)} onPublished={reloadVenues} />
        )}
        {ratingTarget && (
          <RatingModal target={ratingTarget} close={() => setRatingTarget(null)} />
        )}
      </div>

      {!isAuth && <AppearanceSettings />}
    </>
  );
}
