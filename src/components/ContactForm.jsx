import { useState } from 'react';
import { colors, fonts } from '../theme.js';
import { getT } from '../i18n/translations.js';
import { BUSINESS } from '../config.js';
import { getFormLegal, legalUrl } from '../i18n/legal-ui.js';

// En Astro, les variables d'entorn visibles al navegador han de començar per PUBLIC_
const API_URL = import.meta.env.PUBLIC_API_URL || '/api';

const EMPTY_FORM = { nom: '', cognom: '', email: '', missatge: '', website: '', consent: false };

// Es carrega amb client:load (vegeu HomePage.astro): té estat i envia dades.
export default function ContactForm({ lang, image }) {
  const t = getT(lang);
  const legal = getFormLegal(lang);
  const privacyHref = legalUrl(lang, 'privacy');
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `HTTP ${res.status}`);
      }
      setStatus('ok');
      setForm(EMPTY_FORM);
    } catch (err) {
      // El detall tècnic (en català, ve del backend) va a la consola;
      // a l'usuari li ensenyem el missatge traduït.
      console.error('Contact form error:', err);
      setStatus('error');
    }
  }

  const inputStyle = { padding: 14, border: `1px solid ${colors.ink}`, background: '#fff', borderRadius: 2, fontSize: 15, fontFamily: fonts.body };
  const labelStyle = { display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, fontWeight: 600, fontFamily: fonts.body };

  return (
    <section>
      <div style={{ width: '100%', height: '100%' }}>
        <img src={image.src} width={image.width} height={image.height} loading="lazy" decoding="async" alt={t('contact.photoAlt')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px,1fr) minmax(0,2fr)' }}>
        <div style={{ background: colors.ink, color: colors.bg, padding: '56px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 520 }}>
          <div>
            <h2 style={{ fontFamily: fonts.logo, fontSize: 38, margin: '0 0 20px', textTransform: 'uppercase' }}>{t('contact.title')}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: colors.bodyTextLight, maxWidth: 280, fontFamily: fonts.body }}>{t('contact.languages')}</p>
          </div>
          <div>
            <div style={{ fontFamily: fonts.logo, fontSize: 36, color: colors.accent, lineHeight: 1, textTransform: 'uppercase' }}>ARREU<br />CAMPERS</div>
            <div style={{ marginTop: 20, fontSize: 15, fontFamily: fonts.body }}>{BUSINESS.email}</div>
            <div style={{ fontSize: 15, fontFamily: fonts.body }}>{BUSINESS.phoneDisplay}</div>
            <div style={{ marginTop: 16, fontSize: 13, color: colors.accent, fontFamily: fonts.mono }}>{t('contact.rights')}<br />2026</div>
          </div>
        </div>
        <div style={{ background: colors.bg, padding: '56px 40px' }}>
          <form onSubmit={handleSubmit}>
            {/* Parany anti-spam (honeypot): invisible per a les persones; els bots l'omplen
                i el backend descarta el missatge. No l'esborris ni el facis visible. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label>Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 760 }}>
              <label style={labelStyle}>{t('contact.name')}
                <input required value={form.nom} onChange={update('nom')} type="text" style={inputStyle} />
              </label>
              <label style={labelStyle}>{t('contact.surname')}
                <input value={form.cognom} onChange={update('cognom')} type="text" style={inputStyle} />
              </label>
            </div>
            <label style={{ ...labelStyle, maxWidth: 760, marginTop: 20 }}>{t('contact.email')}
              <input required value={form.email} onChange={update('email')} type="email" style={inputStyle} />
            </label>
            <label style={{ ...labelStyle, maxWidth: 760, marginTop: 20 }}>{t('contact.message')}
              <textarea rows={5} value={form.missatge} onChange={update('missatge')} style={{ ...inputStyle, resize: 'vertical' }} />
            </label>
            {/* Consentiment (RGPD): obligatori. L'enllaç s'obre en una pestanya nova perquè no es perdin les dades ja escrites. */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, maxWidth: 760, marginTop: 24, fontSize: 14, lineHeight: 1.5, fontFamily: fonts.body }}>
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0, accentColor: colors.ink }}
              />
              <span>
                {legal.consentBefore}
                <a href={privacyHref} target="_blank" rel="noopener noreferrer" style={{ color: colors.ink, textDecoration: 'underline' }}>{legal.consentLink}</a>
                {legal.consentAfter}
              </span>
            </label>
            {/* Informació bàsica sobre protecció de dades (primera capa) */}
            <div style={{ maxWidth: 760, marginTop: 14, fontSize: 13, lineHeight: 1.5, color: colors.muted, fontFamily: fonts.body }}>
              <strong>{legal.infoTitle}</strong>
              <ul style={{ listStyle: 'none', margin: '6px 0 0', padding: 0 }}>
                {legal.rows.map(([label, value]) => (
                  <li key={label} style={{ marginBottom: 2 }}><strong>{label}:</strong> {value}</li>
                ))}
              </ul>
              <p style={{ margin: '6px 0 0' }}>
                {legal.moreBefore}
                <a href={privacyHref} target="_blank" rel="noopener noreferrer" style={{ color: colors.ink, textDecoration: 'underline' }}>{legal.consentLink}</a>
                {legal.moreAfter}
              </p>
            </div>
            <button type="submit" disabled={status === 'sending'} style={{
              marginTop: 24, maxWidth: 760, width: '100%', padding: 16, background: colors.ink, color: colors.bg,
              border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer', borderRadius: 2, fontFamily: fonts.body
            }}>
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>
            {status === 'ok' && <p style={{ color: '#2f7a3d', marginTop: 12, fontFamily: fonts.body }}>{t('contact.success')}</p>}
            {status === 'error' && <p style={{ color: colors.accent, marginTop: 12, fontFamily: fonts.body }}>{t('contact.error')}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
