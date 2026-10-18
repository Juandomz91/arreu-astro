// Script que porta l'usuari a l'idioma que ja havia triat (només amb una elecció
// explícita guardada a localStorage; mai amb l'idioma del navegador, així Google
// sempre veu el català a "/"). Viu en un fitxer a part perquè el seu hash es
// calcula a astro.config.mjs per a la política CSP: si el canvies, el hash
// s'actualitza sol en tornar a compilar.
export const LANG_REDIRECT_SCRIPT = `try {
  var saved = localStorage.getItem('lang');
  if (saved === 'es' || saved === 'en' || saved === 'fr') location.replace('/' + saved + '/');
} catch (e) {}`;