// Textos curts del bloc legal (peu de pàgina, enllaços i informació del formulari)
// i adreces de les pàgines legals. Els textos llargs (Avís legal i Política de
// privacitat) són a legal-docs.js: aquest fitxer és petit perquè també l'importa
// el formulari, que s'envia al navegador.

import { LEGAL } from '../legal-data.js';

// Cada idioma té les seves pròpies adreces. El català, com la resta del web, a l'arrel.
export const LEGAL_SLUGS = {
  ca: { legal: 'avis-legal', privacy: 'politica-privacitat' },
  es: { legal: 'aviso-legal', privacy: 'politica-privacidad' },
  en: { legal: 'legal-notice', privacy: 'privacy-policy' },
  fr: { legal: 'mentions-legales', privacy: 'politique-de-confidentialite' },
};

export const LEGAL_DOCS = ['legal', 'privacy'];

// legalUrl('es', 'privacy') -> '/es/politica-privacidad/'
export function legalUrl(lang, doc) {
  const slug = LEGAL_SLUGS[lang][doc];
  return lang === 'ca' ? `/${slug}/` : `/${lang}/${slug}/`;
}

const DATE_LOCALES = { ca: 'ca-ES', es: 'es-ES', en: 'en-GB', fr: 'fr-FR' };

// formatLegalDate('es', '2026-10-07') -> '7 de octubre de 2026'
export function formatLegalDate(lang, iso) {
  return new Intl.DateTimeFormat(DATE_LOCALES[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
}

const UI = {
  ca: {
    rights: 'Tots els drets reservats.',
    legal: 'Avís legal',
    privacy: 'Política de privacitat',
    back: "Tornar a l'inici",
    footerNav: 'Informació legal',
    langNav: 'Idioma',
    updated: 'Última actualització',
  },
  es: {
    rights: 'Todos los derechos reservados.',
    legal: 'Aviso legal',
    privacy: 'Política de privacidad',
    back: 'Volver al inicio',
    footerNav: 'Información legal',
    langNav: 'Idioma',
    updated: 'Última actualización',
  },
  en: {
    rights: 'All rights reserved.',
    legal: 'Legal notice',
    privacy: 'Privacy policy',
    back: 'Back to home',
    footerNav: 'Legal information',
    langNav: 'Language',
    updated: 'Last updated',
  },
  fr: {
    rights: 'Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Politique de confidentialité',
    back: "Retour à l'accueil",
    footerNav: 'Informations légales',
    langNav: 'Langue',
    updated: 'Dernière mise à jour',
  },
};

export function getLegalUI(lang) {
  return UI[lang] ?? UI.ca;
}

// Informació bàsica sobre protecció de dades que es mostra sota el formulari
// (primera capa de la informació, tal com recomana l'Agència Espanyola de Protecció de Dades).
const FORM = {
  ca: {
    consentBefore: 'He llegit i accepto la ',
    consentLink: 'política de privacitat',
    consentAfter: ' i consento que es tractin les meves dades per respondre a la meva consulta.',
    infoTitle: 'Informació bàsica sobre protecció de dades',
    rows: (d) => [
      ['Responsable', d.holder],
      ['Finalitat', 'Atendre la teva consulta o sol·licitud de pressupost.'],
      ['Base legal', 'El teu consentiment.'],
      ['Destinataris', "No es cedeixen dades a tercers, tret d'obligació legal. Els proveïdors d'allotjament i correu actuen com a encarregats del tractament."],
      ['Drets', `Accés, rectificació, supressió, oposició, limitació i portabilitat, a ${d.privacyEmail}.`],
    ],
    moreBefore: 'Informació addicional a la ',
    moreAfter: '.',
  },
  es: {
    consentBefore: 'He leído y acepto la ',
    consentLink: 'política de privacidad',
    consentAfter: ' y consiento que se traten mis datos para responder a mi consulta.',
    infoTitle: 'Información básica sobre protección de datos',
    rows: (d) => [
      ['Responsable', d.holder],
      ['Finalidad', 'Atender tu consulta o solicitud de presupuesto.'],
      ['Base legal', 'Tu consentimiento.'],
      ['Destinatarios', 'No se ceden datos a terceros, salvo obligación legal. Los proveedores de alojamiento y correo actúan como encargados del tratamiento.'],
      ['Derechos', `Acceso, rectificación, supresión, oposición, limitación y portabilidad, en ${d.privacyEmail}.`],
    ],
    moreBefore: 'Información adicional en la ',
    moreAfter: '.',
  },
  en: {
    consentBefore: 'I have read and accept the ',
    consentLink: 'privacy policy',
    consentAfter: ' and consent to my data being processed to answer my enquiry.',
    infoTitle: 'Basic data protection information',
    rows: (d) => [
      ['Controller', d.holder],
      ['Purpose', 'To handle your enquiry or quote request.'],
      ['Legal basis', 'Your consent.'],
      ['Recipients', 'Data is not shared with third parties except where required by law. Hosting and email providers act as data processors.'],
      ['Rights', `Access, rectification, erasure, objection, restriction and portability, at ${d.privacyEmail}.`],
    ],
    moreBefore: 'Further information in the ',
    moreAfter: '.',
  },
  fr: {
    consentBefore: "J'ai lu et j'accepte la ",
    consentLink: 'politique de confidentialité',
    consentAfter: ' et je consens au traitement de mes données pour répondre à ma demande.',
    infoTitle: 'Informations de base sur la protection des données',
    rows: (d) => [
      ['Responsable du traitement', d.holder],
      ['Finalité', 'Traiter votre demande de renseignements ou de devis.'],
      ['Base juridique', 'Votre consentement.'],
      ['Destinataires', "Aucune donnée n'est cédée à des tiers, sauf obligation légale. Les prestataires d'hébergement et de messagerie agissent en tant que sous-traitants."],
      ['Droits', `Accès, rectification, effacement, opposition, limitation et portabilité, à ${d.privacyEmail}.`],
    ],
    moreBefore: 'Informations complémentaires dans la ',
    moreAfter: '.',
  },
};

export function getFormLegal(lang) {
  const f = FORM[lang] ?? FORM.ca;
  return { ...f, rows: f.rows(LEGAL) };
}
