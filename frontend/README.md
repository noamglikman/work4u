# Work4U — Web Frontend

React + Vite + TypeScript implementation of the Work4U web app (the design in
`test/project/Work4U Web.html`). It runs **fully offline on mock data by default**
and is wired so that switching to the real AWS backend (Amazon Cognito + API
Gateway + Lambda + DynamoDB + S3) is a configuration change, not a rewrite.

It's a Hebrew, right-to-left app: auth, preferences onboarding, a map +
recommendations home, venue detail with a live-crowd forecast, community ratings,
rating history, profile, and an admin "add venue" flow.

---

## Quick start

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173  (mock data, no AWS needed)
```

Other scripts:

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server (mock mode) |
| `npm run build` | Type-check (`tsc -b`) + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check only |
| `npm run smoke` | Run the data-layer runtime smoke test (mock adapter + mappers + filters) |

> **Mock login:** any email + password works. Pick the **מנהל / admin** toggle (or
> use an email containing `admin`) to see the admin "add venue" button.

---

## Architecture

```
src/
  config/        env.ts (reads VITE_* vars) · amplify.ts (configures Cognito/API/S3, no-op in mock)
  types/         api.ts (exact API-contract types) · view.ts (UI view models) · nav.ts
  api/           THE INTEGRATION SEAM
    services.ts  the Api interface both adapters implement
    mock/        store.ts (in-memory adapter) + data.ts (contract-shaped seed data)
    live.ts      real AWS adapter (maps each method → api-contract endpoint)
    http.ts      fetch wrapper: attaches Cognito JWT, unwraps { success, message, data }
    auth.ts      Cognito (Amplify) auth + mock; provides getIdToken() to http
    index.ts     picks mock vs live ONCE and exports `api` + `auth`
  lib/           labels (Hebrew ↔ enum) · theme · mappers (api → view) · geo · hours · filters · format
  context/       AuthContext · ThemeContext (appearance) · ToastContext
  hooks/         useAsync · useGeolocation · useVenues · usePreferences · useRatings
  components/    ui/ primitives · Header · MapCanvas · ForecastGraph · VenueListCard · PushCard · dialogs/
  screens/       Login · Signup · Preferences · Home · Venue · History · Profile
  App.tsx        routing + global state   main.tsx  entry (providers + Amplify)
```

**The one rule that makes this integration-ready:** the UI never touches mock data
or `fetch` directly. Every screen goes through `api` / `auth` (from `src/api`) and
renders **view models** produced by `lib/mappers.ts`. Mock data is stored in the
*exact* API-contract shape, so it flows through the same mappers as real data —
the components literally cannot tell the two apart.

---

## Going live against the real AWS backend

1. Deploy the backend (Cognito User Pool + the Lambdas behind API Gateway, per
   `../api-contract.md`). Create an `admin` Cognito group for admin users.
2. Copy `.env.example` → `.env` and fill it in:

   ```bash
   VITE_USE_MOCK=false
   VITE_API_BASE_URL=https://<api-id>.execute-api.<region>.amazonaws.com/dev
   VITE_AWS_REGION=us-east-1
   VITE_COGNITO_USER_POOL_ID=us-east-1_xxxxx
   VITE_COGNITO_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
   # VITE_S3_BUCKET only needed if you use the Amplify Storage path
   ```
3. `npm run build`. That's it — no code changes.

If `VITE_USE_MOCK=false` but config is missing, the app **falls back to mock** and
warns in the console (see `config/env.ts`) so a half-configured deploy never hard-crashes.

### What each screen calls (mock today → real endpoint)

| Screen / action | `api`/`auth` call | Endpoint (api-contract.md) |
|---|---|---|
| Login | `auth.signIn` | Cognito `signIn` |
| Signup | `auth.signUp` | Cognito `signUp` (+ confirm) |
| Forgot password | `auth.resetPassword` | Cognito `resetPassword` |
| Preferences (load/save) | `api.preferences.get/save` | `GET` / `POST /preferences` |
| Home map + list | `api.venues.list` | `GET /venues?lat&lng&radiusKm&search&priceRange&wifiQuality&quietEnvironment&needPowerOutlet` |
| Venue detail | `api.venues.get` | `GET /venues/{venueId}` |
| Submit rating | `api.ratings.submit` | `POST /ratings` |
| Rating history | `api.ratings.listMine` / `remove` | `GET /ratings/my` · `DELETE /ratings/{id}` |
| Admin add venue | `api.venues.create` + `api.storage.uploadVenuePhoto` | `POST /admin/venues` · `POST /admin/venues/{id}/images/upload-url` → S3 PUT |

Admin (`POST /admin/venues`) is gated by the `admin` Cognito group; the backend
must enforce it too — the frontend only hides the UI.

---

## Data-model mapping (contract ⇄ UI)

The backend speaks camelCase English enums; the UI shows Hebrew. All translation
lives in `lib/labels.ts` and `lib/mappers.ts`:

- `currentCrowdLevel` / `crowdLevel`: `free|reasonable|crowded` → פנוי / סביר / עמוס מאוד
- `priceRange`: `low|medium|high` → ₪ / ₪₪ / ₪₪₪
- `wifiQuality`: `low|medium|high` → label + a 1–5 strength for the Wi-Fi indicator
- `noiseLevel`: `low|medium|high` → Hebrew label; `low` also yields a "שקט" tag
- `hasPowerOutlets` (bool) → "שקעים זמינים" + a "שקעים" tag
- `forecast: [{hour, crowdLevel}]` → bars whose height maps from the crowd level
  (so the graph works with the contract's 3-point forecast or a richer hourly one)
- distance / map position are computed from `latitude`/`longitude` (see `lib/geo.ts`),
  so the stylised map and the radius filter work with real coordinates
- venues without a photo get a stable placeholder colour + emoji from their id;
  when `mainImageUrl` / `imageUrls` are present, the real S3 image is shown

---

## Integration notes (intentional gaps, clearly marked in code)

- **Admin form fields.** The design's add-venue form collects name/address/hours/
  price/photos. `VenueInput` also requires coordinates + wifi/noise/power/description,
  so `components/dialogs/AdminDialog.tsx` sends sensible **defaults** for those
  (marked with a comment). Expand the form or geocode the address to replace them.
- **Signup confirmation.** With Cognito email verification on, `signUp` returns
  `needsConfirmation` and the app routes the user to log in after confirming. The
  design has no code-entry screen; add one if you require verification. In mock
  (and auto-confirm pools) signup signs the user in and continues to onboarding.
- **Admin toggle on login.** The user/admin toggle is a *mock* convenience; with
  Cognito, admin status comes from the `admin` group in the JWT and the toggle is
  ignored.
- **Smart push.** The "rate the place you visited" banner is a timed nudge here;
  in production it's triggered by geofencing + SNS / Web Push (AWS guide §3).
```
