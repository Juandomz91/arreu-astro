// Dades legals del titular del web. OMPLE AQUEST FITXER ABANS DE PUBLICAR.
//
// Es fan servir a l'Avís legal, a la Política de privacitat, al peu de pàgina
// i a la informació bàsica sobre protecció de dades del formulari.
// Qualsevol valor que encara comenci per "[" és un marcador pendent d'omplir:
// la compilació (npm run build) t'avisarà i, a la pàgina, es veurà ressaltat.

import { BUSINESS } from './config.js';

export const LEGAL = {
  // Titular del web: persona física (nom i cognoms) o societat (raó social)
  holder: 'Norbert Artigas Roura',

  // NIF (persona física) o CIF (societat)
  taxId: '41581247-F',


  // Només si el titular és una societat inscrita al Registre Mercantil
  // (p. ex. 'Registre Mercantil de Girona, tom X, foli Y, full Z').
  // Si és autònom o no n'hi ha, deixa-ho buit: ''
  registry: '',

  // Correu on la gent pot exercir els seus drets de protecció de dades
  privacyEmail: BUSINESS.email,

  // Proveïdors que reben les dades (encarregats del tractament)
  hostingProvider: 'Clever Cloud',
  emailProvider: ' Gmail',

  // Quant de temps es guarden els missatges si no arriba a haver-hi relació comercial
  retentionMonths: 12,

  // Posa false si la tipografia (IBM Plex Mono) s'allotja al mateix web
  // en lloc de carregar-se des de Google Fonts: s'eliminarà aquest paràgraf de la política.
  usesGoogleFonts: true,

  // Data de l'última revisió dels textos legals (AAAA-MM-DD). Actualitza-la si els canvies.
  updated: '2026-10-07',
};

// Llista dels marcadors que encara falten per omplir
export function pendingLegalFields() {
  return Object.entries(LEGAL)
    .filter(([, value]) => typeof value === 'string' && value.trim().startsWith('['))
    .map(([key]) => key);
}
