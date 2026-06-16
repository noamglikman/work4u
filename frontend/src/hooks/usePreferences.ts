// hooks/usePreferences.ts — load + save the current user's preferences.

import { useCallback, useState } from 'react';
import { api } from '../api';
import type { UserPreferences, UserPreferencesInput } from '../types/api';
import { useAsync } from './useAsync';

export function usePreferences() {
  const state = useAsync(() => api.preferences.get(), []);
  const [saving, setSaving] = useState(false);

  const save = useCallback(async (input: UserPreferencesInput): Promise<UserPreferences> => {
    setSaving(true);
    try {
      const saved = await api.preferences.save(input);
      await state.reload();
      return saved;
    } finally {
      setSaving(false);
    }
  }, [state]);

  return {
    preferences: state.data,
    loading: state.loading,
    error: state.error,
    saving,
    save,
    reload: state.reload,
  };
}
