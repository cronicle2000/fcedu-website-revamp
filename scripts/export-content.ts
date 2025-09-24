import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import admin from 'firebase-admin';

// Use GOOGLE_APPLICATION_CREDENTIALS env to point to a service account JSON
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
}
const db = admin.firestore();

const outDir = path.join(process.cwd(), 'src', 'data');
async function dump(col: string, fileName: string) {
  const snap = await db.collection(col).get();
  const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  fs.writeFileSync(path.join(outDir, fileName), JSON.stringify(arr, null, 2));
  console.log(`Exported ${arr.length} docs -> ${fileName}`);
}

(async () => {
  await dump('partners', 'partners.json');
  await dump('programs', 'programs.json');
  await dump('branches', 'branches.json');
  await dump('team', 'team.json');
  await dump('news', 'news.json');
  console.log('Done.');
})().catch((e) => { console.error(e); process.exit(1); });
