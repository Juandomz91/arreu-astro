// Textos llargs de l'Avís legal i de la Política de privacitat, en els 4 idiomes.
// Les dades del titular (nom, NIF, adreça...) NO s'escriuen aquí: surten de
// src/legal-data.js i de src/config.js. Només s'importa des de les pàgines
// legals (LegalPage.astro), mai des del navegador.
//
// IMPORTANT: aquests textos són una base redactada per a un web informatiu amb
// formulari de contacte, sense botiga ni analítica. Revisa'ls amb un gestor o
// advocat abans de publicar, i actualitza'ls si el web canvia (p. ex. si afegeixes
// analítica, vídeos de YouTube incrustats o una botiga).

import { BUSINESS, SITE_URL } from '../config.js';
import { LEGAL, pendingLegalFields } from '../legal-data.js';
import { formatLegalDate, getLegalUI, legalUrl } from './legal-ui.js';

// Avís a la consola de compilació (i als logs de Clever Cloud) si falten dades
if (!globalThis.__legalWarned) {
  globalThis.__legalWarned = true;
  const pending = pendingLegalFields();
  if (pending.length) {
    console.warn(
      `\n[LEGAL] ATENCIÓ: falten dades per omplir a src/legal-data.js (${pending.join(', ')}). ` +
        `Les pàgines legals es publicarien amb marcadors "[...]" visibles.\n`,
    );
  }
}

// Els textos es generen com a HTML: tot el que ve de les dades s'escapa
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Un valor pendent d'omplir (comença per "[") es ressalta perquè no passi desapercebut
const val = (s) => (String(s).trim().startsWith('[') ? `<mark class="pending">${esc(s)}</mark>` : esc(s));

function buildData() {
  return {
    name: esc(BUSINESS.name),
    site: esc(SITE_URL),
    holder: val(LEGAL.holder),
    taxId: val(LEGAL.taxId),
    address: val(LEGAL.address),
    registry: LEGAL.registry ? esc(LEGAL.registry) : '',
    emailLink: `<a href="mailto:${esc(BUSINESS.email)}">${esc(BUSINESS.email)}</a>`,
    privacyEmailLink: `<a href="mailto:${esc(LEGAL.privacyEmail)}">${esc(LEGAL.privacyEmail)}</a>`,
    phone: esc(BUSINESS.phoneDisplay),
    hosting: val(LEGAL.hostingProvider),
    provider: val(LEGAL.emailProvider),
    months: LEGAL.retentionMonths,
  };
}

// ───────────────────────────────── CATALÀ ─────────────────────────────────
function docsCa(d, a) {
  return {
    legal: {
      title: 'Avís legal',
      description: `Titular, condicions d'ús i informació legal del web d'${BUSINESS.name}.`,
      sections: [
        {
          h: 'Titular del web',
          body: [
            `En compliment de l'article 10 de la Llei 34/2002, de serveis de la societat de la informació i de comerç electrònic (LSSI-CE), s'informa que el titular d'aquest lloc web és:`,
            {
              list: [
                `<strong>Titular:</strong> ${d.holder}`,
                `<strong>NIF/CIF:</strong> ${d.taxId}`,
                `<strong>Domicili:</strong> ${d.address}`,
                `<strong>Correu electrònic:</strong> ${d.emailLink}`,
                `<strong>Telèfon:</strong> ${d.phone}`,
                `<strong>Nom comercial:</strong> ${d.name}`,
                `<strong>Web:</strong> ${d.site}`,
                ...(d.registry ? [`<strong>Dades registrals:</strong> ${d.registry}`] : []),
              ],
            },
          ],
        },
        {
          h: 'Objecte',
          body: [
            `Aquest web té per objecte donar a conèixer l'activitat d'${d.name} (assessorament, disseny, construcció i homologació de camperitzacions a mida) i facilitar el contacte amb el taller. L'accés és gratuït i implica la condició d'usuari i l'acceptació d'aquestes condicions.`,
          ],
        },
        {
          h: "Condicions d'ús",
          body: [
            `L'usuari es compromet a fer un ús adequat dels continguts i serveis del web, d'acord amb la llei, la bona fe i l'ordre públic, i a no utilitzar-lo per a activitats il·lícites o que perjudiquin tercers. En particular, es compromet a no enviar pel formulari de contacte informació falsa, continguts il·lícits ni missatges automatitzats no sol·licitats (correu brossa).`,
          ],
        },
        {
          h: 'Propietat intel·lectual i industrial',
          body: [
            `Els continguts del web (textos, fotografies, vídeos, logotip, dissenys i codi) són titularitat d'${d.name} o s'utilitzen amb l'autorització corresponent, i estan protegits per la normativa de propietat intel·lectual i industrial. Queda prohibida la seva reproducció, distribució, comunicació pública o transformació sense autorització expressa del titular, llevat dels usos que la llei permet.`,
          ],
        },
        {
          h: 'Responsabilitat',
          body: [
            `El titular procura que la informació del web sigui correcta i estigui actualitzada, però no garanteix l'absència d'errors ni la disponibilitat contínua del servei, i es reserva el dret de modificar-ne els continguts sense avís previ.`,
            `La informació publicada té caràcter orientatiu i no constitueix una oferta ni un pressupost vinculant: els terminis, els preus i les condicions de cada projecte s'acorden amb cada client de manera individual.`,
          ],
        },
        {
          h: 'Enllaços a tercers',
          body: [
            `Aquest web conté enllaços a llocs de tercers (com Instagram, YouTube o WhatsApp). ${d.name} no controla aquests llocs i no es fa responsable dels seus continguts ni de les seves polítiques de privacitat.`,
          ],
        },
        {
          h: 'Protecció de dades i cookies',
          body: [`El tractament de les dades personals i l'ús de l'emmagatzematge local del navegador s'expliquen a la ${a('privacy')}.`],
        },
        {
          h: 'Legislació aplicable i jurisdicció',
          body: [
            `Aquest avís legal es regeix per la legislació espanyola. Per a qualsevol controvèrsia, les parts se sotmeten als jutjats i tribunals que corresponguin d'acord amb la normativa aplicable i, si l'usuari és consumidor, als del seu domicili quan la llei així ho estableixi.`,
          ],
        },
      ],
    },
    privacy: {
      title: 'Política de privacitat',
      description: `Com tractem les dades personals que ens facilites a través del web d'${BUSINESS.name}.`,
      sections: [
        {
          h: 'Responsable del tractament',
          body: [
            `Aquesta política explica com tractem les dades personals que ens facilites a través d'aquest web, d'acord amb el Reglament (UE) 2016/679 (RGPD) i la Llei orgànica 3/2018 (LOPDGDD).`,
            {
              list: [
                `<strong>Responsable:</strong> ${d.holder}`,
                `<strong>NIF/CIF:</strong> ${d.taxId}`,
                `<strong>Domicili:</strong> ${d.address}`,
                `<strong>Correu electrònic:</strong> ${d.privacyEmailLink}`,
              ],
            },
          ],
        },
        {
          h: 'Quines dades recollim',
          body: [
            `Només les que ens envies tu mitjançant el formulari de contacte: nom, cognoms (opcional), adreça de correu electrònic i el contingut del missatge. No et demanem cap altra dada; et preguem que no incloguis al missatge dades especialment protegides (salut, ideologia, etc.).`,
            `Si ens contactes per WhatsApp, per correu electrònic o per telèfon, les dades que ens facilitis es tracten amb la mateixa finalitat.`,
            `A més, els servidors d'allotjament registren dades tècniques de connexió (com l'adreça IP) per raons de seguretat i de funcionament del servei.`,
          ],
        },
        {
          h: 'Finalitat',
          body: [
            `Atendre la teva consulta o sol·licitud d'informació o de pressupost i mantenir la comunicació necessària amb tu. No fem servir les teves dades per enviar-te publicitat ni per prendre decisions automatitzades o elaborar perfils.`,
          ],
        },
        {
          h: 'Base legal',
          body: [
            `El teu consentiment (article 6.1.a RGPD), que dones marcant la casella del formulari abans d'enviar-lo, i, quan sol·licites un pressupost, l'aplicació de mesures precontractuals a petició teva (article 6.1.b RGPD). Pots retirar el consentiment en qualsevol moment, sense que això afecti la licitud del tractament anterior.`,
          ],
        },
        {
          h: 'Conservació',
          body: [
            `Conservem les dades mentre atenem la teva consulta i, si no arriba a haver-hi relació comercial, durant un màxim de ${d.months} mesos des de l'últim contacte. Si hi ha relació comercial, les conservem mentre duri i, després, durant els terminis legals de prescripció de responsabilitats.`,
          ],
        },
        {
          h: 'Destinataris',
          body: [
            `No cedim les teves dades a tercers, tret d'obligació legal. Per prestar el servei utilitzem proveïdors que actuen com a encarregats del tractament, accedeixen a les dades només per compte nostre i ho fan amb les garanties que exigeix el RGPD:`,
            { list: [`Allotjament del web i del servidor del formulari: ${d.hosting}.`, `Correu electrònic: ${d.provider}.`] },
            `Si algun d'aquests proveïdors tracta dades fora de l'Espai Econòmic Europeu, ho fa amb les garanties adequades previstes pel RGPD (decisió d'adequació de la Comissió Europea o clàusules contractuals tipus).`,
          ],
        },
        {
          h: 'Els teus drets',
          body: [
            `Pots exercir els drets d'accés, rectificació, supressió, oposició, limitació del tractament i portabilitat escrivint a ${d.privacyEmailLink}, indicant quin dret vols exercir i adjuntant una còpia d'un document que t'identifiqui. També pots retirar el consentiment en qualsevol moment.`,
            `Si consideres que el tractament no s'ajusta a la normativa, tens dret a presentar una reclamació davant l'Agència Espanyola de Protecció de Dades (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>) o davant l'autoritat de control del teu lloc de residència.`,
          ],
        },
        {
          h: 'Cookies i emmagatzematge local',
          body: [
            `Aquest web no utilitza cookies pròpies ni de tercers d'anàlisi, publicitat o seguiment, i per això no mostra cap bàner de cookies.`,
            `Quan canvies d'idioma, el navegador desa la teva elecció a l'emmagatzematge local (clau «lang») per portar-te a l'idioma triat la propera vegada. Aquesta dada només s'utilitza per a aquesta finalitat, no s'envia a cap servidor i no permet identificar-te: és una personalització de la interfície que demanes tu mateix i, per això, no requereix consentiment.`,
            ...(LEGAL.usesGoogleFonts
              ? [`Per mostrar la tipografia, el web carrega la font IBM Plex Mono des dels servidors de Google Fonts. En fer-ho, Google pot rebre la teva adreça IP i dades tècniques del navegador.`]
              : []),
          ],
        },
        {
          h: 'Enllaços i xarxes socials',
          body: [
            `Si fas clic als enllaços a Instagram, YouTube o WhatsApp, passes a utilitzar serveis de tercers que tracten les teves dades segons les seves pròpies polítiques. Aquest web no incorpora ni carrega els seus connectors.`,
          ],
        },
        {
          h: 'Seguretat',
          body: [`Apliquem mesures tècniques i organitzatives raonables per protegir les dades, com ara la connexió xifrada (HTTPS) i l'accés restringit a la informació.`],
        },
        {
          h: 'Canvis en aquesta política',
          body: [`Podem actualitzar aquesta política per adaptar-la a canvis normatius o del web. La data de l'última actualització consta al final de la pàgina.`],
        },
      ],
    },
  };
}

// ───────────────────────────────── CASTELLANO ─────────────────────────────────
function docsEs(d, a) {
  return {
    legal: {
      title: 'Aviso legal',
      description: `Titular, condiciones de uso e información legal del sitio web de ${BUSINESS.name}.`,
      sections: [
        {
          h: 'Titular del sitio web',
          body: [
            `En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa de que el titular de este sitio web es:`,
            {
              list: [
                `<strong>Titular:</strong> ${d.holder}`,
                `<strong>NIF/CIF:</strong> ${d.taxId}`,
                `<strong>Domicilio:</strong> ${d.address}`,
                `<strong>Correo electrónico:</strong> ${d.emailLink}`,
                `<strong>Teléfono:</strong> ${d.phone}`,
                `<strong>Nombre comercial:</strong> ${d.name}`,
                `<strong>Sitio web:</strong> ${d.site}`,
                ...(d.registry ? [`<strong>Datos registrales:</strong> ${d.registry}`] : []),
              ],
            },
          ],
        },
        {
          h: 'Objeto',
          body: [
            `Este sitio web tiene por objeto dar a conocer la actividad de ${d.name} (asesoramiento, diseño, construcción y homologación de camperizaciones a medida) y facilitar el contacto con el taller. El acceso es gratuito y conlleva la condición de usuario y la aceptación de estas condiciones.`,
          ],
        },
        {
          h: 'Condiciones de uso',
          body: [
            `El usuario se compromete a hacer un uso adecuado de los contenidos y servicios del sitio web, conforme a la ley, la buena fe y el orden público, y a no utilizarlo para actividades ilícitas o que perjudiquen a terceros. En particular, se compromete a no enviar a través del formulario de contacto información falsa, contenidos ilícitos ni mensajes automatizados no solicitados (spam).`,
          ],
        },
        {
          h: 'Propiedad intelectual e industrial',
          body: [
            `Los contenidos del sitio web (textos, fotografías, vídeos, logotipo, diseños y código) son titularidad de ${d.name} o se utilizan con la autorización correspondiente, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa del titular, salvo en los usos que la ley permita.`,
          ],
        },
        {
          h: 'Responsabilidad',
          body: [
            `El titular procura que la información del sitio web sea correcta y esté actualizada, pero no garantiza la ausencia de errores ni la disponibilidad continua del servicio, y se reserva el derecho de modificar sus contenidos sin previo aviso.`,
            `La información publicada tiene carácter orientativo y no constituye una oferta ni un presupuesto vinculante: los plazos, los precios y las condiciones de cada proyecto se acuerdan con cada cliente de forma individual.`,
          ],
        },
        {
          h: 'Enlaces a terceros',
          body: [
            `Este sitio web contiene enlaces a sitios de terceros (como Instagram, YouTube o WhatsApp). ${d.name} no controla dichos sitios y no se hace responsable de sus contenidos ni de sus políticas de privacidad.`,
          ],
        },
        {
          h: 'Protección de datos y cookies',
          body: [`El tratamiento de los datos personales y el uso del almacenamiento local del navegador se explican en la ${a('privacy')}.`],
        },
        {
          h: 'Legislación aplicable y jurisdicción',
          body: [
            `Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa aplicable y, si el usuario es consumidor, a los de su domicilio cuando la ley así lo establezca.`,
          ],
        },
      ],
    },
    privacy: {
      title: 'Política de privacidad',
      description: `Cómo tratamos los datos personales que nos facilitas a través del sitio web de ${BUSINESS.name}.`,
      sections: [
        {
          h: 'Responsable del tratamiento',
          body: [
            `Esta política explica cómo tratamos los datos personales que nos facilitas a través de este sitio web, de acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).`,
            {
              list: [
                `<strong>Responsable:</strong> ${d.holder}`,
                `<strong>NIF/CIF:</strong> ${d.taxId}`,
                `<strong>Domicilio:</strong> ${d.address}`,
                `<strong>Correo electrónico:</strong> ${d.privacyEmailLink}`,
              ],
            },
          ],
        },
        {
          h: 'Qué datos recogemos',
          body: [
            `Solo los que nos envías tú mediante el formulario de contacto: nombre, apellidos (opcional), dirección de correo electrónico y el contenido del mensaje. No te pedimos ningún otro dato; te rogamos que no incluyas en el mensaje datos especialmente protegidos (salud, ideología, etc.).`,
            `Si nos contactas por WhatsApp, por correo electrónico o por teléfono, los datos que nos facilites se tratan con la misma finalidad.`,
            `Además, los servidores de alojamiento registran datos técnicos de conexión (como la dirección IP) por motivos de seguridad y de funcionamiento del servicio.`,
          ],
        },
        {
          h: 'Finalidad',
          body: [
            `Atender tu consulta o solicitud de información o de presupuesto y mantener la comunicación necesaria contigo. No utilizamos tus datos para enviarte publicidad ni para tomar decisiones automatizadas o elaborar perfiles.`,
          ],
        },
        {
          h: 'Base legal',
          body: [
            `Tu consentimiento (artículo 6.1.a RGPD), que das marcando la casilla del formulario antes de enviarlo y, cuando solicitas un presupuesto, la aplicación de medidas precontractuales a petición tuya (artículo 6.1.b RGPD). Puedes retirar el consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento anterior.`,
          ],
        },
        {
          h: 'Conservación',
          body: [
            `Conservamos los datos mientras atendemos tu consulta y, si no llega a haber relación comercial, durante un máximo de ${d.months} meses desde el último contacto. Si hay relación comercial, los conservamos mientras dure y, después, durante los plazos legales de prescripción de responsabilidades.`,
          ],
        },
        {
          h: 'Destinatarios',
          body: [
            `No cedemos tus datos a terceros, salvo obligación legal. Para prestar el servicio utilizamos proveedores que actúan como encargados del tratamiento, acceden a los datos solo por cuenta nuestra y lo hacen con las garantías que exige el RGPD:`,
            { list: [`Alojamiento del sitio web y del servidor del formulario: ${d.hosting}.`, `Correo electrónico: ${d.provider}.`] },
            `Si alguno de estos proveedores trata datos fuera del Espacio Económico Europeo, lo hace con las garantías adecuadas previstas por el RGPD (decisión de adecuación de la Comisión Europea o cláusulas contractuales tipo).`,
          ],
        },
        {
          h: 'Tus derechos',
          body: [
            `Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${d.privacyEmailLink}, indicando qué derecho quieres ejercer y adjuntando una copia de un documento que te identifique. También puedes retirar el consentimiento en cualquier momento.`,
            `Si consideras que el tratamiento no se ajusta a la normativa, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>) o ante la autoridad de control de tu lugar de residencia.`,
          ],
        },
        {
          h: 'Cookies y almacenamiento local',
          body: [
            `Este sitio web no utiliza cookies propias ni de terceros de análisis, publicidad o seguimiento, y por eso no muestra ningún banner de cookies.`,
            `Cuando cambias de idioma, el navegador guarda tu elección en el almacenamiento local (clave «lang») para llevarte al idioma elegido la próxima vez. Este dato solo se utiliza para esa finalidad, no se envía a ningún servidor y no permite identificarte: es una personalización de la interfaz que pides tú mismo y, por ello, no requiere consentimiento.`,
            ...(LEGAL.usesGoogleFonts
              ? [`Para mostrar la tipografía, el sitio web carga la fuente IBM Plex Mono desde los servidores de Google Fonts. Al hacerlo, Google puede recibir tu dirección IP y datos técnicos del navegador.`]
              : []),
          ],
        },
        {
          h: 'Enlaces y redes sociales',
          body: [
            `Si haces clic en los enlaces a Instagram, YouTube o WhatsApp, pasas a utilizar servicios de terceros que tratan tus datos según sus propias políticas. Este sitio web no incorpora ni carga sus conectores.`,
          ],
        },
        {
          h: 'Seguridad',
          body: [`Aplicamos medidas técnicas y organizativas razonables para proteger los datos, como la conexión cifrada (HTTPS) y el acceso restringido a la información.`],
        },
        {
          h: 'Cambios en esta política',
          body: [`Podemos actualizar esta política para adaptarla a cambios normativos o del sitio web. La fecha de la última actualización consta al final de la página.`],
        },
      ],
    },
  };
}

// ───────────────────────────────── ENGLISH ─────────────────────────────────
function docsEn(d, a) {
  return {
    legal: {
      title: 'Legal notice',
      description: `Owner, terms of use and legal information for the ${BUSINESS.name} website.`,
      sections: [
        {
          h: 'Website owner',
          body: [
            `In compliance with Article 10 of Spanish Law 34/2002 on information society services and electronic commerce (LSSI-CE), you are informed that the owner of this website is:`,
            {
              list: [
                `<strong>Owner:</strong> ${d.holder}`,
                `<strong>Tax ID (NIF/CIF):</strong> ${d.taxId}`,
                `<strong>Address:</strong> ${d.address}`,
                `<strong>Email:</strong> ${d.emailLink}`,
                `<strong>Phone:</strong> ${d.phone}`,
                `<strong>Trade name:</strong> ${d.name}`,
                `<strong>Website:</strong> ${d.site}`,
                ...(d.registry ? [`<strong>Registration details:</strong> ${d.registry}`] : []),
              ],
            },
          ],
        },
        {
          h: 'Purpose',
          body: [
            `The purpose of this website is to present the activity of ${d.name} (advice, design, construction and certification of custom campervan conversions) and to make it easy to get in touch with the workshop. Access is free of charge and implies that you become a user and accept these terms.`,
          ],
        },
        {
          h: 'Terms of use',
          body: [
            `Users agree to make proper use of the website's content and services, in accordance with the law, good faith and public order, and not to use it for unlawful activities or activities that harm third parties. In particular, users agree not to submit false information, unlawful content or unsolicited automated messages (spam) through the contact form.`,
          ],
        },
        {
          h: 'Intellectual and industrial property',
          body: [
            `The website's content (texts, photographs, videos, logo, designs and code) belongs to ${d.name} or is used with the corresponding authorisation, and is protected by intellectual and industrial property law. Reproduction, distribution, public communication or modification without the owner's express authorisation is prohibited, except for uses permitted by law.`,
          ],
        },
        {
          h: 'Liability',
          body: [
            `The owner endeavours to keep the information on the website correct and up to date, but does not guarantee that it is free of errors or that the service will be continuously available, and reserves the right to change its content without prior notice.`,
            `The information published is for guidance only and is not a binding offer or quote: deadlines, prices and conditions for each project are agreed individually with each client.`,
          ],
        },
        {
          h: 'Third-party links',
          body: [
            `This website contains links to third-party sites (such as Instagram, YouTube or WhatsApp). ${d.name} does not control those sites and is not responsible for their content or privacy policies.`,
          ],
        },
        {
          h: 'Data protection and cookies',
          body: [`How personal data is processed and how the browser's local storage is used is explained in the ${a('privacy')}.`],
        },
        {
          h: 'Governing law and jurisdiction',
          body: [
            `This legal notice is governed by Spanish law. For any dispute, the parties submit to the courts that have jurisdiction under the applicable rules and, where the user is a consumer, to the courts of their place of residence where the law so provides.`,
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy policy',
      description: `How we process the personal data you provide through the ${BUSINESS.name} website.`,
      sections: [
        {
          h: 'Data controller',
          body: [
            `This policy explains how we process the personal data you provide through this website, in accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD).`,
            {
              list: [
                `<strong>Controller:</strong> ${d.holder}`,
                `<strong>Tax ID (NIF/CIF):</strong> ${d.taxId}`,
                `<strong>Address:</strong> ${d.address}`,
                `<strong>Email:</strong> ${d.privacyEmailLink}`,
              ],
            },
          ],
        },
        {
          h: 'What data we collect',
          body: [
            `Only what you send us through the contact form: first name, surname (optional), email address and the content of your message. We do not ask for any other data; please do not include specially protected data (health, beliefs, etc.) in your message.`,
            `If you contact us by WhatsApp, email or phone, the data you provide is processed for the same purpose.`,
            `In addition, our hosting servers record technical connection data (such as the IP address) for security and to keep the service running.`,
          ],
        },
        {
          h: 'Purpose',
          body: [
            `To handle your enquiry or request for information or a quote, and to keep in touch with you as needed. We do not use your data to send you advertising or to make automated decisions or build profiles.`,
          ],
        },
        {
          h: 'Legal basis',
          body: [
            `Your consent (Article 6.1.a GDPR), which you give by ticking the box on the form before sending it, and, when you ask for a quote, the application of pre-contractual measures at your request (Article 6.1.b GDPR). You may withdraw your consent at any time, without affecting the lawfulness of the processing carried out before.`,
          ],
        },
        {
          h: 'Retention',
          body: [
            `We keep the data while we handle your enquiry and, if no business relationship results, for a maximum of ${d.months} months from the last contact. If there is a business relationship, we keep it for as long as it lasts and, afterwards, for the legal limitation periods for liabilities.`,
          ],
        },
        {
          h: 'Recipients',
          body: [
            `We do not share your data with third parties, except where required by law. To provide the service we use providers that act as data processors, access the data only on our behalf and do so with the safeguards required by the GDPR:`,
            { list: [`Hosting of the website and of the form server: ${d.hosting}.`, `Email: ${d.provider}.`] },
            `If any of these providers processes data outside the European Economic Area, it does so with the appropriate safeguards provided for by the GDPR (a European Commission adequacy decision or standard contractual clauses).`,
          ],
        },
        {
          h: 'Your rights',
          body: [
            `You can exercise your rights of access, rectification, erasure, objection, restriction of processing and portability by writing to ${d.privacyEmailLink}, stating which right you wish to exercise and attaching a copy of a document that identifies you. You can also withdraw your consent at any time.`,
            `If you believe the processing does not comply with the rules, you have the right to lodge a complaint with the Spanish Data Protection Agency (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>) or with the supervisory authority of your place of residence.`,
          ],
        },
        {
          h: 'Cookies and local storage',
          body: [
            `This website does not use first-party or third-party cookies for analytics, advertising or tracking, which is why it does not display a cookie banner.`,
            `When you change language, your browser saves your choice in local storage (key "lang") so that it can take you to your chosen language next time. This data is used only for that purpose, is not sent to any server and cannot identify you: it is an interface preference that you request yourself and therefore does not require consent.`,
            ...(LEGAL.usesGoogleFonts
              ? [`To display the typeface, the website loads the IBM Plex Mono font from Google Fonts servers. In doing so, Google may receive your IP address and technical browser data.`]
              : []),
          ],
        },
        {
          h: 'Links and social media',
          body: [
            `If you click the links to Instagram, YouTube or WhatsApp, you start using third-party services that process your data under their own policies. This website does not embed or load their plug-ins.`,
          ],
        },
        {
          h: 'Security',
          body: [`We apply reasonable technical and organisational measures to protect data, such as an encrypted connection (HTTPS) and restricted access to the information.`],
        },
        {
          h: 'Changes to this policy',
          body: [`We may update this policy to reflect changes in the law or on the website. The date of the last update is shown at the end of the page.`],
        },
      ],
    },
  };
}

// ───────────────────────────────── FRANÇAIS ─────────────────────────────────
function docsFr(d, a) {
  return {
    legal: {
      title: 'Mentions légales',
      description: `Éditeur, conditions d'utilisation et informations légales du site web de ${BUSINESS.name}.`,
      sections: [
        {
          h: 'Éditeur du site',
          body: [
            `Conformément à l'article 10 de la loi espagnole 34/2002 sur les services de la société de l'information et le commerce électronique (LSSI-CE), il est précisé que le titulaire de ce site web est :`,
            {
              list: [
                `<strong>Titulaire :</strong> ${d.holder}`,
                `<strong>NIF/CIF :</strong> ${d.taxId}`,
                `<strong>Adresse :</strong> ${d.address}`,
                `<strong>E-mail :</strong> ${d.emailLink}`,
                `<strong>Téléphone :</strong> ${d.phone}`,
                `<strong>Nom commercial :</strong> ${d.name}`,
                `<strong>Site web :</strong> ${d.site}`,
                ...(d.registry ? [`<strong>Données d'immatriculation :</strong> ${d.registry}`] : []),
              ],
            },
          ],
        },
        {
          h: 'Objet',
          body: [
            `Ce site a pour objet de faire connaître l'activité de ${d.name} (conseil, conception, construction et homologation d'aménagements de vans sur mesure) et de faciliter le contact avec l'atelier. L'accès est gratuit et implique la qualité d'utilisateur ainsi que l'acceptation des présentes conditions.`,
          ],
        },
        {
          h: "Conditions d'utilisation",
          body: [
            `L'utilisateur s'engage à faire un usage approprié des contenus et services du site, conformément à la loi, à la bonne foi et à l'ordre public, et à ne pas l'utiliser pour des activités illicites ou portant préjudice à des tiers. En particulier, il s'engage à ne pas transmettre par le formulaire de contact des informations fausses, des contenus illicites ni des messages automatisés non sollicités (spam).`,
          ],
        },
        {
          h: 'Propriété intellectuelle et industrielle',
          body: [
            `Les contenus du site (textes, photographies, vidéos, logo, conceptions et code) appartiennent à ${d.name} ou sont utilisés avec l'autorisation correspondante, et sont protégés par la réglementation sur la propriété intellectuelle et industrielle. Leur reproduction, distribution, communication au public ou transformation sans l'autorisation expresse du titulaire est interdite, sauf dans les cas permis par la loi.`,
          ],
        },
        {
          h: 'Responsabilité',
          body: [
            `Le titulaire s'efforce de garantir l'exactitude et la mise à jour des informations du site, mais ne garantit ni l'absence d'erreurs ni la disponibilité continue du service, et se réserve le droit de modifier ses contenus sans préavis.`,
            `Les informations publiées sont données à titre indicatif et ne constituent ni une offre ni un devis ferme : les délais, les prix et les conditions de chaque projet sont convenus individuellement avec chaque client.`,
          ],
        },
        {
          h: 'Liens vers des tiers',
          body: [
            `Ce site contient des liens vers des sites tiers (tels qu'Instagram, YouTube ou WhatsApp). ${d.name} ne contrôle pas ces sites et n'est pas responsable de leurs contenus ni de leurs politiques de confidentialité.`,
          ],
        },
        {
          h: 'Protection des données et cookies',
          body: [`Le traitement des données personnelles et l'utilisation du stockage local du navigateur sont expliqués dans la ${a('privacy')}.`],
        },
        {
          h: 'Droit applicable et juridiction',
          body: [
            `Les présentes mentions légales sont régies par le droit espagnol. Pour tout litige, les parties se soumettent aux juridictions compétentes conformément à la réglementation applicable et, si l'utilisateur est un consommateur, à celles de son domicile lorsque la loi le prévoit.`,
          ],
        },
      ],
    },
    privacy: {
      title: 'Politique de confidentialité',
      description: `Comment nous traitons les données personnelles que vous nous communiquez via le site web de ${BUSINESS.name}.`,
      sections: [
        {
          h: 'Responsable du traitement',
          body: [
            `Cette politique explique comment nous traitons les données personnelles que vous nous communiquez via ce site, conformément au Règlement (UE) 2016/679 (RGPD) et à la loi organique espagnole 3/2018 (LOPDGDD).`,
            {
              list: [
                `<strong>Responsable :</strong> ${d.holder}`,
                `<strong>NIF/CIF :</strong> ${d.taxId}`,
                `<strong>Adresse :</strong> ${d.address}`,
                `<strong>E-mail :</strong> ${d.privacyEmailLink}`,
              ],
            },
          ],
        },
        {
          h: 'Quelles données nous collectons',
          body: [
            `Uniquement celles que vous nous envoyez via le formulaire de contact : prénom, nom (facultatif), adresse e-mail et contenu du message. Nous ne demandons aucune autre donnée ; nous vous prions de ne pas inclure dans votre message de données particulièrement sensibles (santé, opinions, etc.).`,
            `Si vous nous contactez par WhatsApp, par e-mail ou par téléphone, les données que vous nous communiquez sont traitées dans la même finalité.`,
            `En outre, les serveurs d'hébergement enregistrent des données techniques de connexion (comme l'adresse IP) pour des raisons de sécurité et de fonctionnement du service.`,
          ],
        },
        {
          h: 'Finalité',
          body: [
            `Traiter votre demande de renseignements ou de devis et maintenir la communication nécessaire avec vous. Nous n'utilisons pas vos données pour vous envoyer de la publicité ni pour prendre des décisions automatisées ou établir des profils.`,
          ],
        },
        {
          h: 'Base juridique',
          body: [
            `Votre consentement (article 6.1.a du RGPD), que vous donnez en cochant la case du formulaire avant de l'envoyer et, lorsque vous demandez un devis, l'exécution de mesures précontractuelles prises à votre demande (article 6.1.b du RGPD). Vous pouvez retirer votre consentement à tout moment, sans que cela affecte la licéité du traitement effectué avant ce retrait.`,
          ],
        },
        {
          h: 'Durée de conservation',
          body: [
            `Nous conservons les données le temps de traiter votre demande et, si aucune relation commerciale n'en découle, pendant ${d.months} mois maximum à compter du dernier contact. En cas de relation commerciale, nous les conservons pendant sa durée puis pendant les délais légaux de prescription des responsabilités.`,
          ],
        },
        {
          h: 'Destinataires',
          body: [
            `Nous ne cédons pas vos données à des tiers, sauf obligation légale. Pour fournir le service, nous faisons appel à des prestataires qui agissent en tant que sous-traitants, n'accèdent aux données que pour notre compte et avec les garanties exigées par le RGPD :`,
            { list: [`Hébergement du site et du serveur du formulaire : ${d.hosting}.`, `Messagerie électronique : ${d.provider}.`] },
            `Si l'un de ces prestataires traite des données en dehors de l'Espace économique européen, il le fait avec les garanties appropriées prévues par le RGPD (décision d'adéquation de la Commission européenne ou clauses contractuelles types).`,
          ],
        },
        {
          h: 'Vos droits',
          body: [
            `Vous pouvez exercer vos droits d'accès, de rectification, d'effacement, d'opposition, de limitation du traitement et de portabilité en écrivant à ${d.privacyEmailLink}, en indiquant le droit que vous souhaitez exercer et en joignant une copie d'un document d'identité. Vous pouvez également retirer votre consentement à tout moment.`,
            `Si vous estimez que le traitement n'est pas conforme à la réglementation, vous avez le droit d'introduire une réclamation auprès de l'Agence espagnole de protection des données (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>) ou auprès de l'autorité de contrôle de votre lieu de résidence.`,
          ],
        },
        {
          h: 'Cookies et stockage local',
          body: [
            `Ce site n'utilise pas de cookies propres ni de tiers à des fins d'analyse, de publicité ou de suivi, et n'affiche donc aucun bandeau de cookies.`,
            `Lorsque vous changez de langue, votre navigateur enregistre votre choix dans le stockage local (clé « lang ») afin de vous orienter vers la langue choisie la prochaine fois. Cette donnée n'est utilisée que dans ce but, n'est envoyée à aucun serveur et ne permet pas de vous identifier : il s'agit d'une personnalisation de l'interface que vous demandez vous-même et qui ne nécessite donc pas de consentement.`,
            ...(LEGAL.usesGoogleFonts
              ? [`Pour afficher la typographie, le site charge la police IBM Plex Mono depuis les serveurs de Google Fonts. Ce faisant, Google peut recevoir votre adresse IP et des données techniques de votre navigateur.`]
              : []),
          ],
        },
        {
          h: 'Liens et réseaux sociaux',
          body: [
            `Si vous cliquez sur les liens vers Instagram, YouTube ou WhatsApp, vous utilisez des services tiers qui traitent vos données selon leurs propres politiques. Ce site n'intègre ni ne charge leurs modules.`,
          ],
        },
        {
          h: 'Sécurité',
          body: [`Nous appliquons des mesures techniques et organisationnelles raisonnables pour protéger les données, comme la connexion chiffrée (HTTPS) et l'accès restreint aux informations.`],
        },
        {
          h: 'Modifications de cette politique',
          body: [`Nous pouvons mettre à jour cette politique pour l'adapter à des évolutions réglementaires ou du site. La date de dernière mise à jour figure en bas de page.`],
        },
      ],
    },
  };
}

const BUILDERS = { ca: docsCa, es: docsEs, en: docsEn, fr: docsFr };

// getLegalDoc('es', 'privacy') -> { title, description, sections, updated, path }
export function getLegalDoc(lang, doc) {
  const ui = getLegalUI(lang);
  // Enllaç a l'altre document legal, amb el nom correcte per a cada idioma
  const a = (target) => `<a href="${legalUrl(lang, target)}">${esc(ui[target])}</a>`;
  const docs = BUILDERS[lang](buildData(), a);
  return { ...docs[doc], updated: formatLegalDate(lang, LEGAL.updated), path: legalUrl(lang, doc) };
}
