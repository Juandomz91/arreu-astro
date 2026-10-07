import { useEffect, useRef } from 'react';
import { colors, fonts } from '../theme.js';
import { getT, LANGUAGES, langUrl } from '../i18n/translations.js';
import { SOCIAL } from '../config.js';

// Enllaços a les seccions. El text surt dels títols de cada secció
// (translations.js), així que si canvies un títol, canvia també aquí.
// L'`id` ha de coincidir amb l'`id` de la <section> corresponent (Sections.jsx).
const SECTIONS = [
  { id: 'que', key: 'queFem.title' },
  { id: 'qui', key: 'quiSom.title' },
  { id: 'com', key: 'com.title' },
  { id: 'perque', key: 'perQue.title' },
];

const iconStyle = { width: 38, height: 38, borderRadius: '50%', background: colors.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };

// Es carrega amb client:load (vegeu HomePage.astro): el <select> necessita JS per navegar.
export default function Nav({ lang }) {
  const t = getT(lang);
  const navRef = useRef(null);

  // Publica l'alçada real del Nav com a --nav-h. La fan servir el logo del Hero
  // (per enganxar-se just a sota) i el scroll a les seccions (perquè el títol no
  // quedi tapat). En mòbil el Nav fa dues files i és més alt.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const publish = () => document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  // Cada idioma és una pàgina pròpia: canviar d'idioma = anar a la seva URL.
  // Es recorda l'elecció perquè, si torna a entrar per "/", el portem al seu idioma.
  function changeLanguage(e) {
    const lng = e.target.value;
    try { localStorage.setItem('lang', lng); } catch { /* localStorage bloquejat */ }
    window.location.href = langUrl(lng);
  }

  return (
    <nav ref={navRef} className="nav" style={{
      position: 'sticky', top: 0, zIndex: 50, display: 'flex', flexWrap: 'wrap',
      alignItems: 'center', justifyContent: 'space-between', columnGap: 16,
      padding: '16px 28px', background: colors.bg, borderBottom: `2px solid ${colors.ink}`
    }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" style={iconStyle}>
          {/* Logo oficial de WhatsApp (Simple Icons, CC0) */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill={colors.bg} aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
        <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" style={iconStyle}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.bg} strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="3.5" />
            <circle cx="17.3" cy="6.7" r="1.2" fill={colors.bg} stroke="none" />
          </svg>
        </a>
      </div>

      {/* Enllaços a les seccions. Estils de hover/focus i la versió mòbil: BaseLayout.astro */}
      <ul className="nav-links">
        {SECTIONS.map(({ id, key }) => (
          <li key={id}>
            <a className="nav-link" href={`#${id}`}>{t(key)}</a>
          </li>
        ))}
      </ul>

      <select
        aria-label={t('nav.language')}
        value={lang}
        onChange={changeLanguage}
        style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 600, background: '#fff', border: `1px solid ${colors.ink}`, padding: '8px 12px', borderRadius: 2 }}
      >
        {LANGUAGES.map((lng) => (
          <option key={lng} value={lng}>{lng.toUpperCase()}</option>
        ))}
      </select>
    </nav>
  );
}
