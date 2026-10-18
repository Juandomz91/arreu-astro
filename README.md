# Arreu Campers

Web d'Arreu Campers (taller de camperitzacions de Girona): frontend estàtic amb **Astro** (components de React) i backend del formulari de contacte amb **FastAPI**. Quatre idiomes: català, castellà, anglès i francès.

Domini principal: **https://www.arreucampers.cat**. Els altres dominis (`arreucampers.cat`, `arreucampers.com`, `arreucampers.es` i `campersgirona.com`, amb i sense `www`) redirigeixen amb un 301 al principal (vegeu `Caddyfile`).

## Estructura del repositori

```
.
├── astro.config.mjs        Configuració d'Astro (sitemap, CSP, proxy de desenvolupament)
├── Caddyfile               Servidor de producció: redireccions de dominis, capçaleres i memòria cau
├── package.json            Dependències del frontend i versió de Node (engines)
├── env.example             Variables del frontend (còpia-la a .env)
├── public/                 Fitxers que es copien tal qual (vídeo, logo, robots.txt)
├── src/
│   ├── config.js           Domini, correu, telèfon i xarxes socials
│   ├── legal-data.js       Dades del titular per als textos legals
│   ├── lang-redirect.js    Script que porta l'usuari a l'idioma que ja havia triat
│   ├── theme.js            Colors i tipografies
│   ├── components/         Les seccions de la pàgina (HomePage.astro les munta totes)
│   ├── i18n/               Textos en els 4 idiomes i textos legals
│   ├── layouts/            BaseLayout.astro: el <head> (SEO, idiomes, xarxes, dades per a Google)
│   ├── pages/              Rutes: portades, pàgines legals i 404
│   └── recursos/           Fotos i logo (s'optimitzen sols en compilar)
└── backend/
    ├── main.py             API del formulari (FastAPI)
    ├── requirements.txt    Dependències de Python
    └── env.example         Variables del backend (còpia-la a backend/.env)
```

## Rutes

| URL | Contingut |
|-----|-----------|
| `/`, `/es/`, `/en/`, `/fr/` | Portada en català, castellà, anglès i francès |
| `/avis-legal/`, `/politica-privacitat/` | Pàgines legals en català |
| `/es/aviso-legal/`, `/es/politica-privacidad/` | Pàgines legals en castellà |
| `/en/legal-notice/`, `/en/privacy-policy/` | Pàgines legals en anglès |
| `/fr/mentions-legales/`, `/fr/politique-de-confidentialite/` | Pàgines legals en francès |
| `/sitemap-index.xml`, `/robots.txt` | Per als cercadors |
| qualsevol altra adreça | Pàgina 404 (amb `noindex`) |

## Desenvolupament

Cal **Node 22.12 o superior** (`node -v`) i **Python 3.10 o superior**.

Terminal 1, backend:

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp env.example .env          # i omple les dades SMTP
uvicorn main:app --reload --port 8000
```

Terminal 2, frontend (des de l'arrel del repositori):

```bash
npm install
npm run dev                  # http://localhost:4321
```

En desenvolupament, les peticions a `/api/...` es redirigeixen soles al backend (vegeu `astro.config.mjs`), així que no cal definir `PUBLIC_API_URL`. La CSP (vegeu més avall) no s'aplica en desenvolupament.

## Variables d'entorn

**Frontend** (`.env` a l'arrel o variables de l'aplicació a Clever Cloud). Es llegeixen **en compilar**: si les canvies, cal tornar a desplegar el web.

| Variable | Per a què serveix |
|----------|-------------------|
| `PUBLIC_API_URL` | URL del backend, p. ex. `https://api.arreucampers.cat/api`. Si no es defineix, el formulari envia a `/api` (mateix origen). També decideix a quin origen deixa connectar-se la CSP. |

**Backend** (`backend/.env` o variables de l'aplicació a Clever Cloud). Són secrets: mai no es pugen al repositori.

| Variable | Per a què serveix |
|----------|-------------------|
| `ALLOWED_ORIGINS` | Dominis des dels quals s'accepta el formulari. En producció: `https://www.arreucampers.cat` |
| `SMTP_HOST`, `SMTP_PORT` | Servidor de correu (587 = STARTTLS, 465 = SSL directe) |
| `SMTP_USER`, `SMTP_PASSWORD` | Credencials del correu (amb Gmail, una contrasenya d'aplicació) |
| `SMTP_FROM` | Remitent; ha de ser una adreça que el proveïdor et deixi fer servir |
| `CONTACT_TO_EMAIL` | Adreça on arriben els missatges del formulari |

## Compilar

```bash
npm run build      # genera la web estàtica a dist/
npm run preview    # per revisar-la abans de pujar-la
```

Abans de publicar:

```bash
npm audit          # ha de dir: found 0 vulnerabilities
npm run build      # ha de generar totes les pàgines sense errors
```

## Seguretat

- **CSP (política de seguretat de contingut):** es defineix a `astro.config.mjs` (`security.csp`). Astro calcula el hash de cada `<script>` i `<style>` que genera i el posa en una etiqueta `<meta>` de cada pàgina. Només es permet carregar contingut del propi web, els estils de Google Fonts (`fonts.googleapis.com`), les tipografies (`fonts.gstatic.com`) i connectar-se al backend del formulari. **Si afegeixes un recurs extern nou** (analítica, mapa, vídeo incrustat, un altre tipus de lletra...), afegeix el seu domini a les directives corresponents; si no, el navegador el bloquejarà i a la consola veuràs `Refused to ...`.
- **Capçaleres HTTP:** HSTS, `X-Content-Type-Options`, `Referrer-Policy` i `X-Frame-Options` es posen al `Caddyfile`, que també activa la compressió i la memòria cau (un any per a `/_astro/`, un dia per al vídeo i el logo).
- **Formulari:** camp trampa anti-spam (*honeypot*), consentiment RGPD obligatori, límit de 5 peticions per minut i 20 per hora per IP, i CORS limitat al domini principal.
- **Secrets:** les credencials SMTP només viuen a les variables de l'aplicació; `.env` i `backend/.env` són al `.gitignore`.

## Desplegament a Clever Cloud

Es fan **dues aplicacions** a partir del mateix repositori i la branca `main`. Ordre recomanat: primer el backend, després el frontend (perquè `PUBLIC_API_URL` s'incrusta en compilar).

### 1. Backend (aplicació Python)

```
CC_PIP_REQUIREMENTS_FILE=backend/requirements.txt
CC_RUN_COMMAND=cd backend && uvicorn main:app --host 0.0.0.0 --port 9000 --proxy-headers --forwarded-allow-ips "*"
CC_HEALTH_CHECK_PATH=/api/health
ALLOWED_ORIGINS=https://www.arreucampers.cat
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
SMTP_FROM=...
CONTACT_TO_EMAIL=...
```

- L'aplicació ha d'escoltar a `0.0.0.0` i al port `9000`.
- Deixa-la en **1 instància**: el límit de peticions es compta per instància.
- Domini: `api.arreucampers.cat`. Comprova `https://api.arreucampers.cat/api/health` (ha de respondre `{"status":"ok"}`).

### 2. Frontend (aplicació Static)

```
CC_BUILD_COMMAND=npm ci && npm run build
CC_WEBROOT=/dist
PUBLIC_API_URL=https://api.arreucampers.cat/api
```

- Clever Cloud detecta el `Caddyfile` de l'arrel i el fa servir com a servidor (port 8080).
- La versió de Node la marca el camp `engines` de `package.json` (≥ 22.12). Segons la documentació de Clever Cloud, els fitxers `.nvmrc` s'ignoren (no en creïs).
- Si tot dona 404, canvia al `Caddyfile` la línia `root * dist` per `root * {$APP_HOME}/dist`.

### 3. Dominis i DNS

Afegeix a l'aplicació Static `www.arreucampers.cat` (principal) i els altres set dominis. Al DNS de cada domini:

| Tipus | Nom | Valor |
|-------|-----|-------|
| CNAME | `www` | El destí que mostri la consola de Clever Cloud (regió París: `domain.par.clever-cloud.com.`) |
| A | `@` | Les IP que mostri la consola |

No toquis els registres MX i TXT (correu, SPF, DKIM) de `arreucampers.com`.

### 4. Comprovacions després de desplegar

```bash
curl -I https://www.arreucampers.cat/                       # 200 i capçaleres de seguretat
curl -I https://www.arreucampers.cat/no-existe              # 404 amb la pàgina pròpia
curl -sI https://campersgirona.com/es/ | grep -i -E '^HTTP|^location'   # 301 cap a www.arreucampers.cat/es/
curl https://www.arreucampers.cat/robots.txt
curl https://www.arreucampers.cat/sitemap-index.xml
curl https://api.arreucampers.cat/api/health
```

Després, envia un missatge des del formulari del domini real i comprova que arriba a `CONTACT_TO_EMAIL`.

### 5. Cercadors

- Dona d'alta `https://www.arreucampers.cat/` a Google Search Console i envia `sitemap-index.xml`.
- Crea o actualitza la fitxa de Google Business Profile del taller.
- Quan tinguis l'adreça física del taller, afegeix `streetAddress` i `postalCode` a l'`address` de `src/layouts/BaseLayout.astro`.

## On és cada cosa

- `src/config.js`: domini, correu, telèfon i xarxes socials.
- `src/legal-data.js`: titular, NIF i proveïdors per als textos legals. Qualsevol valor que comenci per `[` és un marcador pendent d'omplir.
- `src/i18n/translations.js`: tots els textos en els 4 idiomes, i els títols i descripcions per a Google. Cada idioma ha de tenir exactament les mateixes claus.
- `src/i18n/legal-ui.js` i `src/i18n/legal-docs.js`: adreces i textos de l'Avís legal i la Política de privacitat.
- `src/components/`: les seccions de la pàgina (`HomePage.astro` les munta totes).
- `src/layouts/BaseLayout.astro`: el `<head>` (SEO, idiomes alternatius, xarxes socials, dades per a Google).
- `src/recursos/`: fotos i logo (s'optimitzen automàticament en compilar). Les 9 fotos de «Què fem» són a `src/recursos/que-fem/` i es mostren per ordre de nom de fitxer.
- `public/`: fitxers que es copien tal qual (vídeo de la portada, logo, `robots.txt`).