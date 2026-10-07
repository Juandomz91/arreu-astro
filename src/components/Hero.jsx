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

const linkStyle = { background: colors.ink, padding: '4px 10px', marginTop: 6, color: colors.accent, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' };
const labelStyle = { background: colors.ink, padding: '4px 10px', display: 'inline-block', marginTop: 6 };

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
      <div style={{ marginBottom: '-100vh' }}>

        {/* Logo + enllaços: baixen junts en fer scroll, per sobre del vídeo */}
        <div style={{ position: 'sticky', top: LOGO_STICKY_TOP, zIndex: 2, paddingTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ margin: 0 }}>
            <img src={logoSrc} alt="Arreu Campers" width="454" height="198" style={{ width: LOGO_WIDTH, height: 'auto', display: 'block', filter: LOGO_HALO }} />
          </h1>

          <div style={{ marginTop: 28, fontSize: 'clamp(14px,2vw,20px)', lineHeight: 1.9, color: colors.accent, fontWeight: 600, fontFamily: fonts.mono }}>
            <span style={labelStyle}>{t('hero.projects')}</span>{' '}
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" style={linkStyle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a><br />
            <span style={labelStyle}>{t('hero.vanTours')}</span>{' '}
            <a href={SOCIAL.youtube} target="_blank" rel="noreferrer" style={linkStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.1-2.1C18.5 3.6 12 3.6 12 3.6s-6.5 0-8.4.5a3 3 0 0 0-2.1 2.1C1 8.1 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5a3 3 0 0 0 2.1-2.1C23 15.9 23 12 23 12ZM9.9 15.4V8.6l5.8 3.4-5.8 3.4Z" />
              </svg>
              YouTube
            </a>
          </div>
        </div>

        <div
          style={{ width: '100%', aspectRatio: '16/6', maxHeight: 420, background: colors.ink }}
          dangerouslySetInnerHTML={{ __html: VIDEO_HTML }}
        />

        {/* Cua invisible: espai per on el bloc continua baixant fins desaparèixer */}
        <div aria-hidden="true" style={{ height: '100vh' }} />
      </div>
    </div>
  );
}
