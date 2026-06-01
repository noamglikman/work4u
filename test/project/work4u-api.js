// work4u-api.js — single integration seam for the AWS backend.
// Today every function returns the local mock data so the prototype runs offline.
// To go live: flip USE_MOCK to false and fill in the Amplify/SDK calls marked TODO.
// The UI never changes — only work4u-web-app.jsx consumes these functions.

const USE_MOCK = true;

// ── Auth (Amazon Cognito) ───────────────────────────────────
const Work4UAuth = {
  async signIn(email, password) {
    if (USE_MOCK) return { user: { email }, isAdmin: /admin/i.test(email) };
    // TODO: import { signIn, fetchAuthSession } from 'aws-amplify/auth';
    //   await signIn({ username: email, password });
    //   const groups = (await fetchAuthSession()).tokens.idToken.payload['cognito:groups'] || [];
    //   return { user: { email }, isAdmin: groups.includes('admin') };
  },
  async signUp(email, password) {
    if (USE_MOCK) return { ok: true };
    // TODO: signUp({ username: email, password }) + confirmSignUp(code)
  },
  async resetPassword(email) {
    if (USE_MOCK) return { ok: true };
    // TODO: resetPassword({ username: email })
  },
  async signOut() {
    if (USE_MOCK) return; // TODO: signOut()
  },
};

// ── Data (API Gateway → Lambda → DynamoDB) ──────────────────
const Work4UApi = {
  // GET /venues?lat=&lng=&radius=&quiet=&power=&wifi=&price=
  async listVenues(filters, location) {
    if (USE_MOCK) return window.W4U_VENUES;
    // TODO: return get({ apiName: 'Work4U', path: '/venues', options: { queryParams: { ...filters, ...location } } });
  },
  // GET /venues/{id}  (includes S3 photo URLs + Lambda-computed forecast/occupancy)
  async getVenue(id) {
    if (USE_MOCK) return window.W4U_VENUES.find(v => v.id === id);
    // TODO: get({ apiName: 'Work4U', path: `/venues/${id}` });
  },
  // PUT /users/me/prefs
  async savePrefs(prefs) {
    if (USE_MOCK) return { ok: true };
    // TODO: put({ apiName: 'Work4U', path: '/users/me/prefs', options: { body: prefs } });
  },
  // GET /users/me/reports
  async listMyReports() {
    if (USE_MOCK) return window.W4U_HISTORY;
    // TODO: get({ apiName: 'Work4U', path: '/users/me/reports' });
  },
  // POST /reports  { venueId, occ, wifi, noise }  (Lambda stamps timestamp → DynamoDB)
  async postReport(report) {
    if (USE_MOCK) return { id: 'h' + Date.now(), ...report };
    // TODO: post({ apiName: 'Work4U', path: '/reports', options: { body: report } });
  },
  // DELETE /reports/{id}
  async deleteReport(id) {
    if (USE_MOCK) return { ok: true };
    // TODO: del({ apiName: 'Work4U', path: `/reports/${id}` });
  },
  // POST /venues  (admin only — Lambda verifies cognito:groups includes 'admin')
  async createVenue(venue) {
    if (USE_MOCK) return { ok: true };
    // TODO: post({ apiName: 'Work4U', path: '/venues', options: { body: venue } });
  },
};

// ── Storage (Amazon S3) ─────────────────────────────────────
const Work4UStorage = {
  // Upload a venue photo; returns the S3 key to store on the venue record.
  async uploadPhoto(file, venueId) {
    if (USE_MOCK) return `mock/${venueId}/${file?.name || 'photo.jpg'}`;
    // TODO: import { uploadData } from 'aws-amplify/storage';
    //   const key = `venues/${venueId}/${crypto.randomUUID()}`;
    //   await uploadData({ key, data: file, options: { contentType: file.type } }).result;
    //   return key;
  },
};

window.Work4UAuth = Work4UAuth;
window.Work4UApi = Work4UApi;
window.Work4UStorage = Work4UStorage;
