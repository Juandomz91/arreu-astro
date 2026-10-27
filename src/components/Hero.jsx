import { colors, fonts } from '../theme.js';
import { getT } from '../i18n/translations.js';
import { SOCIAL } from '../config.js';

const HERO_VIDEO_URL = '/video/hero.mp4';
const HERO_POSTER_URL = '/video/hero-poster.jpg';

// Mida del logo (la mateixa per al logo i per a l'espai que se li reserva)
const LOGO_WIDTH = 'clamp(240px, 60vw, 560px)';
// Halo clar al voltant del logo: el negre queda sòlid i es llegeix sobre zones fosques del vídeo.
// Per treure'l del tot: const LOGO_HALO = 'none';
const LOGO_HALO = 'drop-shadow(0 0 1px #fff) drop-shadow(0 0 2px #fff)';
// Just a sota del Nav. --nav-h és la seva alçada real (la calcula Nav.jsx; en mòbil
// és més alt): així el bloc no es mou fins que comences a fer scroll.
const LOGO_STICKY_TOP = 'var(--nav-h, 72px)';

// El <video> s'escriu com a HTML directe perquè React, en generar HTML al servidor,
// no escriu l'atribut `muted`, i sense ell els navegadors bloquegen l'autoplay.
// Així funciona sense enviar JavaScript al navegador.
const VIDEO_HTML = `<video src="${HERO_VIDEO_URL}" poster="${HERO_POSTER_URL}" autoplay muted loop playsinline preload="metadata" aria-hidden="true" style="width:100%;height:100%;object-fit:cover;display:block"></video>`;

// Quant sobresurt el vídeo per SOBRE del logo (px): el vídeo comença una mica abans del títol.
// El bloc del logo té 64px de marge superior, així que amb 32 el vídeo comença 32px per sobre del logo.
const VIDEO_TOP = 32;

// Els 4 requadres negres (2 etiquetes + 2 enllaços) van en una graella de 2 columnes:
// tots els de cada columna fan la mateixa amplada i els de cada fila la mateixa alçada,
// i per tant queden alineats. Mateix aspecte per a etiquetes i enllaços.
const boxStyle = { background: colors.ink, padding: '8px 12px', lineHeight: 1.3, display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left' };
const linkStyle = { ...boxStyle, color: colors.accent, textDecoration: 'none' };
const labelStyle = { ...boxStyle };

// Sense JavaScript: tot l'efecte és CSS (sticky + overflow: clip).
export default function Hero({ lang, logoSrc }) {
  const t = getT(lang);

  return (
    // Contenidor de Hero + vídeo. `overflow: clip` retalla tot el que en surti
    // per baix: és la "vora" que es menja el logo i els enllaços.
    <div style={{ overflow: 'clip', background: colors.bg }}>
      {/* Pista per on baixa el bloc enganxós. S'allarga 100vh per sota del vídeo
          (la "cua" del final) perquè el bloc pugui passar la vora i ser retallat;
          el marge negatiu fa que aquesta cua no ocupi espai a la pàgina. */}
      <div style={{ marginBottom: '-100vh', position: 'relative' }}>

        {/* Logo + enllaços: baixen junts en fer scroll, per sobre del vídeo */}
        <div style={{ position: 'sticky', top: LOGO_STICKY_TOP, zIndex: 2, paddingTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ margin: 0 }}>
            <img src={logoSrc} alt="Arreu Campers" width="454" height="198" style={{ width: LOGO_WIDTH, height: 'auto', display: 'block', filter: LOGO_HALO }} />
          </h1>

          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, max-content))', justifyContent: 'center', alignItems: 'stretch', gap: 8, maxWidth: '100%', fontSize: 'clamp(13px,2vw,20px)', color: colors.accent, fontWeight: 600, fontFamily: fonts.mono }}>
            <span style={labelStyle}>{t('hero.projects')}</span>
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" style={linkStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
            <span style={labelStyle}>{t('hero.vanTours')}</span>
            <a href={SOCIAL.youtube} target="_blank" rel="noreferrer" style={linkStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.1-2.1C18.5 3.6 12 3.6 12 3.6s-6.5 0-8.4.5a3 3 0 0 0-2.1 2.1C1 8.1 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5a3 3 0 0 0 2.1-2.1C23 15.9 23 12 23 12ZM9.9 15.4V8.6l5.8 3.4-5.8 3.4Z" />
              </svg>
              YouTube
            </a>
          </div>
        </div>

        {/* El vídeo va per DARRERE del logo i dels enllaços: comença VIDEO_TOP px per sobre del logo
            i acaba on acabava abans (a sota de tot). Està posicionat de manera absoluta
            dins de la pista; `bottom: 100vh` el deixa just on comença la cua invisible. */}
        <div
          style={{ position: 'absolute', top: VIDEO_TOP, left: 0, right: 0, bottom: '100vh', zIndex: 0, background: colors.ink }}
          dangerouslySetInnerHTML={{ __html: VIDEO_HTML }}
        />

        {/* Espai sota el logo: dóna al conjunt l'alçada que tenia el vídeo (proporció i
            alçada màxima segons la pantalla: classe .hero-video a BaseLayout.astro) */}
        <div className="hero-video" aria-hidden="true" style={{ width: '100%', aspectRatio: '16/6', maxHeight: 420 }} />

        {/* Cua invisible: espai per on el bloc continua baixant fins desaparèixer */}
        <div aria-hidden="true" style={{ height: '100vh' }} />
      </div>
    </div>
  );
}
