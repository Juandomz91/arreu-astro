import { colors, fonts } from '../theme.js';
import { getT } from '../i18n/translations.js';
 
// Seccions sense JavaScript: Astro les converteix en HTML en compilar.
// Les fotos arriben ja optimitzades (WebP) des de HomePage.astro, a `images`,
// cadascuna com a { src, width, height }.
 
// Graella de fotos de "Què fem": 3 × 3, amb el mateix estil de línies negres
// que tenia la taula de textos. Les fotos arriben optimitzades des de HomePage.astro.
const GALLERY_SIZE = 9;
const GALLERY_RATIO = '1/1'; // proporció de cada casella: quadrades ('4/3' = horitzontals)
 
export function QueFem({ lang, gallery = [] }) {
  const t = getT(lang);
  // Sempre 9 caselles: si encara falten fotos, es veuen buides
  const cells = Array.from({ length: GALLERY_SIZE }, (_, i) => gallery[i]);
 
  return (
    <section id="que" style={{ padding: '100px 24px', background: colors.bg, fontFamily: fonts.mono }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', margin: '10px 0 24px', textTransform: 'uppercase', lineHeight: 1 }}>{t('queFem.title')}</h2>
        <p style={{ maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: colors.bodyText, marginBottom: 56 }}>
          {t('queFem.intro1')}<br/><br/>
          {t('queFem.intro2')}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 2, background: colors.ink, border: `2px solid ${colors.ink}` }}>
          {cells.map((img, i) => (
            <div key={i} style={{ background: colors.bg, aspectRatio: GALLERY_RATIO }}>
              {img && (
                <img
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  alt={`${t('queFem.galleryAlt')} ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
// Proporció de les fotos de "Qui": '3/4' = vertical; '4/3' = horitzontal.
const QUI_PHOTO_RATIO = '1/1';
 
// Disposició de "Qui" (només aquí, sense tocar BaseLayout.astro):
//  - Ordinador: foto de les dunes | quadre de text (centrat) | foto Norbert i el gos
//  - Mòbil (≤ 700px): en vertical → dunes, text, Norbert i el gos
const QUI_CSS = `
  .qui-trio { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr); gap: 32px; align-items: center; }
  .qui-trio .qui-photo { width: 100%; }
  .qui-trio .qui-text { max-width: none; }
  @media (max-width: 1024px) { .qui-trio { gap: 24px; } }
  @media (max-width: 700px)  { .qui-trio { grid-template-columns: minmax(0, 1fr); gap: 16px; } }
`;
 
function QuiPhoto({ photo, alt, position = 'center' }) {
  return (
    <div className="qui-photo" style={{ aspectRatio: QUI_PHOTO_RATIO }}>
      <img src={photo.src} width={photo.width} height={photo.height} loading="lazy" decoding="async" alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: position, display: 'block' }} />
    </div>
  );
}
 
export function QuiSom({ lang, images }) {
  const t = getT(lang);
 
  return (
    <section id="qui" style={{ padding: '100px 24px', background: colors.ink, color: colors.bg, fontFamily: fonts.mono }}>
      <style dangerouslySetInnerHTML={{ __html: QUI_CSS }} />
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(32px,5vw,52px)', margin: '10px 0 24px', textTransform: 'uppercase', lineHeight: 1, color: colors.accent }}>{t('quiSom.title')}</h2>
        <p style={{ maxWidth: 900, fontSize: 18, lineHeight: 1.6, color: colors.bodyTextLight, marginBottom: 56 }}>
          {t('quiSom.text1')} <br/> {t('quiSom.text2')}
        </p>
 
        <div className="qui-trio">
          <QuiPhoto photo={images.nurbi} alt={t('quiSom.altTeam')} position="center 30%" />
          <div className="qui-text" style={{ background: '#1c1b17', padding: '14px 16px' }}>
            <div style={{ fontStyle: 'italic', fontSize: 15, fontWeight: 600, color: colors.bg }}>Norbert</div>
            <div style={{ fontStyle: 'italic', fontSize: 13, color: colors.bodyTextLight, marginTop: 4 }}>{t('quiSom.norbertBio1')}<br/> {t('quiSom.norbertBio2')}</div>
          </div>
          <QuiPhoto photo={images.duo} alt={t('quiSom.altWorkshop')} />
        </div>
      </div>
    </section>
  );
}
 
export function ComTreballem({ lang }) {
  const t = getT(lang);
  const steps = t('com.steps');
 
  return (
    <section id="com" style={{ padding: '100px 24px', background: colors.bg }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontFamily: fonts.logo, fontSize: 'clamp(32px,5vw,56px)', margin: '10px 0 48px', textTransform: 'uppercase', lineHeight: 1 }}>{t('com.title')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: `2px solid ${colors.ink}` }}>
          {steps.map((s) => (
            <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '80px minmax(0,1fr)', gap: 24, padding: '28px 0', borderBottom: `2px solid ${colors.ink}`, alignItems: 'baseline' }}>
              <div style={{ fontFamily: fonts.logo, fontSize: 32, color: colors.accent }}>{s.n}</div>
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700, fontFamily: fonts.mono }}>{s.title}</h3>
                {s.body.map((paragraph, i) => (
                  <p key={i} style={{ margin: '0 0 10px', fontSize: 16, lineHeight: 1.55, color: colors.muted, maxWidth: 640, fontFamily: fonts.mono }}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
export function PerQue({ lang }) {
  const t = getT(lang);
  const reasons = t('perQue.reasons');
 
  return (
    <section id="perque" style={{ padding: '100px 24px', background: colors.ink, color: colors.bg }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
 
        <h2 style={{ fontFamily: fonts.logo, fontSize: 'clamp(32px,5vw,56px)', margin: '10px 0 48px', textTransform: 'uppercase', lineHeight: 1, color: colors.bg }}>{t('perQue.title')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: `2px solid ${colors.bg}` }}>
          {reasons.map((r) => (
            <div key={r.n} style={{ display: 'grid', gridTemplateColumns: '80px minmax(0,1fr)', gap: 24, padding: '28px 0', borderBottom: `2px solid ${colors.bg}`, alignItems: 'baseline' }}>
              <div style={{ fontFamily: fonts.logo, fontSize: 32, color: colors.accent }}>{r.n}</div>
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700, color: colors.bg, fontFamily: fonts.mono }}>{r.title}</h3>
                {r.body.map((paragraph, i) => (
                  <p key={i} style={{ margin: '0 0 10px', fontSize: 16, lineHeight: 1.55, color: colors.bodyTextLight, maxWidth: 640, fontFamily: fonts.mono }}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}