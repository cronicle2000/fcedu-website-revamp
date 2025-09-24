// Guarded client import to avoid bundling when not used
// Only used if you choose to fetch Firestore live on News page.
let _app: any = null;

export async function getFirebaseApp() {
  if (_app) return _app;
  const [{ initializeApp }, { getApps }] = await Promise.all([
    import('firebase/app'),
    import('firebase/app')
  ]);
  if (!getApps().length) {
    _app = initializeApp({
      // Public config (safe to expose) — replace with your Firebase web app config
      apiKey: 'YOUR_PUBLIC_API_KEY',
      authDomain: 'YOUR_PROJECT.firebaseapp.com',
      projectId: 'YOUR_PROJECT_ID',
      appId: 'YOUR_APP_ID'
    });
  }
  return _app;
}
