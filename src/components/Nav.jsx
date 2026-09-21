import { colors, fonts } from '../theme.js';
import { getT, LANGUAGES, langUrl } from '../i18n/translations.js';
import { SOCIAL } from '../config.js';

// Es carrega amb client:load (vegeu HomePage.astro): el <select> necessita JS per navegar.
export default function Nav({ lang }) {
  const t = getT(lang);

  // Cada idioma és una pàgina pròpia: canviar d'idioma = anar a la seva URL.
  // Es recorda l'elecció perquè, si torna a entrar per "/", el portem al seu idioma.
  function changeLanguage(e) {
    const lng = e.target.value;
    try { localStorage.setItem('lang', lng); } catch { /* localStorage bloquejat */ }
    window.location.href = langUrl(lng);
  }

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 28px', background: colors.bg, borderBottom: `2px solid ${colors.ink}`
    }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"
          style={{ width: 38, height: 38, borderRadius: '50%', background: colors.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={colors.bg}>
            <path d="M17.6 6.3A8.9 8.9 0 0 0 12 4a9 9 0 0 0-7.7 13.6L3 21l3.5-1.2A9 9 0 1 0 17.6 6.3ZM12 19.5a7.4 7.4 0 0 1-3.8-1l-.3-.2-2 .7.7-2-.2-.3A7.5 7.5 0 1 1 19.5 12 7.5 7.5 0 0 1 12 19.5Z" />
          </svg>
        </a>
        <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
          style={{ width: 38, height: 38, borderRadius: '50%', background: colors.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.bg} strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="3.5" />
            <circle cx="17.3" cy="6.7" r="1.2" fill={colors.bg} stroke="none" />
          </svg>
        </a>
      </div>
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
