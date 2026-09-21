# Arreu Campers

Web d'Arreu Campers: frontend estàtic amb **Astro** (components de React) i backend del formulari amb **FastAPI**.

## Rutes

| URL    | Idioma   |
|--------|----------|
| `/`    | Català   |
| `/es/` | Castellà |
| `/en/` | Anglès   |
| `/fr/` | Francès  |

## Desenvolupament

Cal **Node 22.12 o superior** (`node -v`) i Python 3.10+.

Terminal 1, backend:

```bash
cd src/backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Terminal 2, frontend:

```bash
cd src/frontend
npm install
npm run dev        # http://localhost:4321
```

En desenvolupament, les peticions a `/api/...` es redirigeixen soles al backend (vegeu `astro.config.mjs`).

## Compilar per publicar

```bash
cd src/frontend
npm run build      # genera la web estàtica a dist/
npm run preview    # per revisar-la abans de pujar-la
```

## On és cada cosa

- `src/frontend/src/config.js`: domini, correu, telèfon i xarxes socials.
- `src/frontend/src/i18n/translations.js`: tots els textos en els 4 idiomes, i els títols i descripcions per a Google.
- `src/frontend/src/components/`: les seccions de la pàgina (`HomePage.astro` les munta totes).
- `src/frontend/src/layouts/BaseLayout.astro`: el `<head>` (SEO, idiomes alternatius, xarxes socials, dades per a Google).
- `src/frontend/src/recursos/`: fotos i logo (s'optimitzen automàticament en compilar).
- `src/frontend/public/`: fitxers que es copien tal qual (vídeo, robots.txt).
