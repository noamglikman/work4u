// hooks/useRatings.ts — the current user's rating history (with optimistic delete).

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from '../api';
import type { RatingView } from '../types/view';
import { toRatingView } from '../lib/mappers';

export function useRatings() {
  const [ratings, setRatings] = useState<RatingView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await api.ratings.listMine();
      setRatings(list.map(toRatingView));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'אירעה שגיאה בטעינת הדירוגים');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const remove = useCallback(
    async (ratingId: string) => {
      const prev = ratings;
      setRatings((r) => r.filter((x) => x.ratingId !== ratingId)); // optimistic
      try {
        await api.ratings.remove(ratingId);
      } catch (e) {
        setRatings(prev); // rollback
        throw e;
      }
    },
    [ratings],
  );

  return { ratings, loading, error, remove, reload };
}
