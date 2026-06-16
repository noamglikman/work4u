import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_LOCATION, type LatLng } from '../lib/geo';

export type GeoStatus =
  | 'idle'
  | 'loading'
  | 'granted'
  | 'denied'
  | 'unavailable'
  | 'insecure';

export function useGeolocation(): {
  location: LatLng;
  precise: boolean;
  status: GeoStatus;
  error: string;
  requestLocation: () => void;
} {
  const [location, setLocation] = useState<LatLng>(DEFAULT_LOCATION);
  const [precise, setPrecise] = useState(false);
  const [status, setStatus] = useState<GeoStatus>('idle');
  const [error, setError] = useState('');

  const requestLocation = useCallback(() => {
    setError('');

    if (typeof window !== 'undefined' && !window.isSecureContext) {
      setPrecise(false);
      setStatus('insecure');
      setError('מיקום נוכחי דורש אתר מאובטח ב־HTTPS. האתר הנוכחי רץ ב־HTTP ולכן הדפדפן חוסם מיקום.');
      return;
    }

    if (!('geolocation' in navigator)) {
      setPrecise(false);
      setStatus('unavailable');
      setError('הדפדפן לא תומך בקבלת מיקום נוכחי.');
      return;
    }

    setStatus('loading');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setPrecise(true);
        setStatus('granted');
        setError('');
      },
      (err) => {
        setPrecise(false);

        if (err.code === err.PERMISSION_DENIED) {
          setStatus('denied');
          setError('הרשאת המיקום נדחתה. כדי להשתמש במיקום נוכחי צריך לאשר הרשאת מיקום בדפדפן.');
        } else {
          setStatus('unavailable');
          setError('לא הצלחנו לקבל מיקום נוכחי. נסי לרענן, לאשר הרשאה, או לבחור מיקום ידנית.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return { location, precise, status, error, requestLocation };
}