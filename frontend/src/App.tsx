// App.tsx — top-level controller: routing, global UI state, and the data wiring
// for the home venue list + smart-push (ported from work4u-web-app.jsx).

import { useEffect, useMemo, useRef, useState } from 'react';
import { api } from './api';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { useGeolocation } from './hooks/useGeolocation';
import { useVenues } from './hooks/useVenues';
import { buildVenueQuery, DEFAULT_FILTERS, type Filters } from './lib/filters';
import { getSearchLocationById } from './lib/searchLocations';
import { isOpenNow } from './lib/hours';
import { buildRootVars } from './lib/theme';
import type { Screen } from './types/nav';

import { Header } from './components/Header';
import { PushCard } from './components/PushCard';
import { AppearanceSettings } from './components/AppearanceSettings';
import { ForgotDialog } from './components/dialogs/ForgotDialog';
import { AdminDialog } from './components/dialogs/AdminDialog';
import { AdminVenuesDialog } from './components/dialogs/AdminVenuesDialog';
import { RatingModal } from './components/dialogs/RatingModal';

import { Login } from './screens/Login';
import { Signup } from './screens/Signup';
import { Preferences } from './screens/Preferences';
import { Home } from './screens/Home';
import { Venue } from './screens/Venue';
import { History } from './screens/History';
import { Profile } from './screens/Profile';

type Overlay = 'forgot' | 'admin' | null;
type RatingTarget = { id: string; name: string; placeType?: string } | null;

const isAuthScreen = (s: Screen) => s === 'login' || s === 'signup';


function isCurrentLocationSearch(value: string): boolean {
  const clean = value.trim().toLowerCase().replace(/\s+/g, ' ');

  return [
    'המיקום הנוכחי שלי',
    'המיקום שלי',
    'מיקום נוכחי',
    'מיקום נוכחי שלי',
    'current location',
    'my location',
  ].includes(clean);
}

export default function App() {
  const [showAdminVenues, setShowAdminVenues] = useState(false);
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const { tweaks } = useTheme();
  const { location, precise } = useGeolocation();
  const [searchLocationId, setSearchLocationId] = useState('current');

  const [screen, setScreen] = useState<Screen | null>(null);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [ratingTarget, setRatingTarget] = useState<RatingTarget>(null);
  const [push, setPush] = useState<RatingTarget>(null);
  const pushedOnce = useRef(false);
  const lastLearningSearchRef = useRef('');

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

  const selectedSearchLocation = useMemo(
    () => getSearchLocationById(searchLocationId),
    [searchLocationId],
  );

  const searchMeansCurrentLocation = useMemo(
    () => isCurrentLocationSearch(search),
    [search],
  );

  useEffect(() => {
    if (searchMeansCurrentLocation && searchLocationId !== 'current') {
      setSearchLocationId('current');
    }
  }, [searchMeansCurrentLocation, searchLocationId]);

  const effectiveLocation = searchMeansCurrentLocation
    ? location
    : selectedSearchLocation.location ?? location;

  const effectiveSearch = searchMeansCurrentLocation ? '' : search;

  // Home venue list — only fetched once authenticated.
  const query = useMemo(
    () => buildVenueQuery(filters, effectiveSearch, effectiveLocation),
    [filters, effectiveSearch, effectiveLocation],
  );
  const currentLocationReady = searchLocationId !== 'current' || precise;

  const { venues, loading: venuesLoading, error: venuesError, reload: reloadVenues } = useVenues(
    query,
    effectiveLocation,
    isAuthenticated && currentLocationReady,
  );

  // Behavior learning: search terms.
  useEffect(() => {
    if (!isAuthenticated) return;

    const term = search.trim();

    if (term.length < 2) return;
    if (term === lastLearningSearchRef.current) return;

    const handle = window.setTimeout(() => {
      lastLearningSearchRef.current = term;

      void api.learning
        .record({
          type: 'search',
          searchTerm: term,
        })
        .then(() => reloadVenues())
        .catch(() => {
          // Learning should never block the user experience.
        });
    }, 800);

    return () => window.clearTimeout(handle);
  }, [search, isAuthenticated, reloadVenues]);

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
    content = <Preferences go={go} onboarding setHomeFilters={setFilters} />;
  } else if (effective === 'prefs-edit') {
    content = <Preferences go={go} onboarding={false} setHomeFilters={setFilters} />;
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
        location={effectiveLocation}
        searchLocationId={searchLocationId}
        setSearchLocationId={setSearchLocationId}
        openAdminVenues={() => setShowAdminVenues(true)}
      />
    );
  } else if (effective === 'venue' && selectedVenueId) {
    content = (
      <Venue
        venueId={selectedVenueId}
        go={go}
        location={effectiveLocation}
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
            <Header
              screen={effective}
              go={go}
              isAdmin={isAdmin}
              openAdmin={() => setOverlay('admin')}
              openAdminVenues={() => setShowAdminVenues(true)}
            />
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
      {showAdminVenues && (
        <AdminVenuesDialog
          close={() => setShowAdminVenues(false)}
          onChanged={reloadVenues}
        />
      )}
</>
  );
}
