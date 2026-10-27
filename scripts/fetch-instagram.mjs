// Descarrega les últimes fotos d'Instagram abans de compilar la web.
//
// Es crida sola amb `npm run build` (script "prebuild" del package.json).
// Deixa les 9 fotos a src/recursos/instagram/ (carpeta fora de Git). HomePage.astro les
// fa servir si hi són; si no, mostra les de src/recursos/que-fem/.
//
// IMPORTANT: aquest script MAI fa fallar la compilació. Si falta el token, Instagram
// no respon o hi ha menys de 9 fotos, es deixa tot com està i la web usa les fotos de reserva.
//
// Variable d'entorn (a Clever Cloud, app Static):
//   INSTAGRAM_TOKEN  token de llarga durada del compte professional d'Instagram
import { mkdir, mkdtemp, readdir, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const API = process.env.INSTAGRAM_API_BASE || 'https://graph.instagram.com';
const TOKEN = process.env.INSTAGRAM_TOKEN;
const COUNT = 9; // graella 3 × 3 de "Què fem"
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src', 'recursos', 'instagram');

const log = (msg) => console.log(`[instagram] ${msg}`);

async function getJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 200).replace(TOKEN, '***')}`);
  return res.json();
}

// Allarga la validesa del token (60 dies des d'ara). Si encara no té 24 h, Instagram
// ho rebutja: no passa res, és només un avís.
async function refreshToken() {
  try {
    const data = await getJson(`${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(TOKEN)}`);
    const days = Math.round((data.expires_in || 0) / 86400);
    log(`token renovat: caduca d'aquí a ${days} dies`);
    if (data.access_token && data.access_token !== TOKEN) {
      log('ATENCIÓ: Instagram ha donat un token NOU. Copia\'l a la variable INSTAGRAM_TOKEN de Clever Cloud.');
    }
  } catch (e) {
    log(`no s'ha pogut renovar el token (no és greu): ${e.message}`);
  }
}

async function main() {
  if (!TOKEN) {
    log('INSTAGRAM_TOKEN no definit: s\'usen les fotos de reserva.');
    return;
  }
  await refreshToken();

  const fields = 'id,media_type,media_url,thumbnail_url,permalink,timestamp';
  const data = await getJson(`${API}/me/media?fields=${fields}&limit=30&access_token=${encodeURIComponent(TOKEN)}`);

  // Fotos i àlbums: media_url. Vídeos/reels: la seva imatge de portada (thumbnail_url).
  const urls = (data.data || [])
    .map((m) => (m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url))
    .filter(Boolean)
    .slice(0, COUNT);
  if (urls.length < COUNT) {
    log(`només hi ha ${urls.length} fotos disponibles (en calen ${COUNT}): s'usen les fotos de reserva.`);
    return;
  }

  // Es baixa tot a una carpeta temporal i només es canvia la bona si ha anat bé el lot sencer.
  await mkdir(path.dirname(outDir), { recursive: true });
  const tmp = await mkdtemp(path.join(path.dirname(outDir), '.instagram-tmp-'));
  try {
    for (const [i, url] of urls.entries()) {
      const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw new Error(`foto ${i + 1}: HTTP ${res.status}`);
      const type = res.headers.get('content-type') || '';
      if (!type.startsWith('image/')) throw new Error(`foto ${i + 1}: no és una imatge (${type})`);
      const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
      await writeFile(path.join(tmp, `${String(i + 1).padStart(2, '0')}.${ext}`), Buffer.from(await res.arrayBuffer()));
    }
    await rm(outDir, { recursive: true, force: true });
    await rename(tmp, outDir);
    log(`fet: ${COUNT} fotos noves a src/recursos/instagram/`);
  } catch (e) {
    await rm(tmp, { recursive: true, force: true });
    throw e;
  }
}

try {
  await main();
} catch (e) {
  log(`ERROR: ${e.message}. Es mantenen les fotos de reserva.`);
}
// Neteja carpetes temporals que hagin pogut quedar d'un tall anterior
try {
  const parent = path.dirname(outDir);
  for (const name of await readdir(parent)) if (name.startsWith('.instagram-tmp-')) await rm(path.join(parent, name), { recursive: true, force: true });
} catch { /* res a fer */ }
process.exit(0);
