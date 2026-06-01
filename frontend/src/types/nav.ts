// types/nav.ts — the set of top-level screens the app routes between.

export type Screen =
  | 'login'
  | 'signup'
  | 'prefs'
  | 'prefs-edit'
  | 'home'
  | 'venue'
  | 'history'
  | 'profile';

export type Navigate = (screen: Screen) => void;
