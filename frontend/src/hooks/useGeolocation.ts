// hooks/useGeolocation.ts — best-effort browser geolocation with a sensible
// default (Tel Aviv) so distance + the map work even before/without permission.

import { useEffect, useState } from 'react';
import { DEFAULT_LOCATION, type LatLng } from '../lib/geo';

export function useGeolocation(): { location: LatLng; precise: boolean } {
  const [location, setLocation] = useState<LatLng>(DEFAULT_LOCATION);
  const [precise, setPrecise] = useState(false);

  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    let active = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!active) return;
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setPrecise(true);
      },
      () => {
        /* permission denied / unavailable → keep default */
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 },
    );
    return () => {
      active = false;
    };
  }, []);

  return { location, precise };
}
