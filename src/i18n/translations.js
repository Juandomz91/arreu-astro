// Tots els textos del web, per idioma.
// Cada idioma ha de tenir EXACTAMENT la mateixa estructura de claus.
// (Abans vivien a src/i18n.js dins de react-i18next; el contingut és el mateix.)

export const translations = {
  // ─────────────────────────────── CATALÀ ───────────────────────────────
  ca: {
    meta: {
      title: 'Camperitzacions a mida a Girona | Arreu Campers',
      description: 'Taller independent de Girona que dissenya, construeix i homologa camperitzacions de furgonetes a mida: disseny, instal·lació completa i tràmits d\'homologació.',
    },
    nav: { language: 'Idioma' },
    hero: {
      logoPlaceholder: '// espai reservat per al logotip real',
      tagline: 'SUPER CUSTOM QUALITY',
      projects: 'Mira els projectes a',
      vanTours: 'Mira els van tours a',
    },
    queFem: {
      title: 'QUÈ',
      // ca, debajo de  title: 'Què',
      galleryAlt: "Projecte de camperització d'Arreu Campers",
// es, debajo de  title: 'Qué',
      galleryAlt: 'Proyecto de camperización de Arreu Campers',
// en, debajo de  title: 'What',
      galleryAlt: 'Arreu Campers van conversion project',
// fr, debajo de  title: 'Quoi',
      galleryAlt: "Projet d'aménagement de van Arreu Campers",
      intro1: 'Arreu Campers és una empresa dedicada a assessorar, dissenyar, construir i homologar camperitzacions a mida, de qualitat i amb un enfocament curiós.',
      intro2: 'Cada vehicle és una creació única, amb adaptacions enginyoses per solucionar les necessitats específiques de cada client.',
      items: [
        { n: '01', title: 'Disseny a mida', body: "Cada furgoneta i cada forma de viatjar és diferent. Partim d'un pla fet a mida per a tu." },
        { n: '02', title: 'Instal·lació completa', body: "Aïllament, electricitat, aigua, gas i fusteria: tot fet al taller, d'una sola vegada." },
        { n: '03', title: 'Homologació i papers', body: "T'acompanyem amb la documentació perquè el vehicle surti legal a carretera." },
      ],
    },
    quiSom: {
      title: 'QUI',
      text1: 'Un petit taller independent de Girona, creat i portat per una sola persona.',
      text2: "Una manera propera d'entendre les camperitzacions: pocs projectes anuals, artesania i atenció al detall.",
      altTeam: "Foto de l'equip al taller",
      altWorkshop: 'Foto del taller',
      altVehicle: 'Foto del vehicle',
      norbertBio1: 'Esquiador i amant dels racons remots. El més feliç en dies de forta tramuntana.',
      norbertBio2: 'Cul inquiet, sempre en porta alguna de cap. Amant dels gadgets de tota mena.',
      bluesBio: 'Ajudant i cap de taller. Li agraden tots els pals.',
    },
    com: {
      title: 'COM',
      steps: [
        { n: '01', title: 'PARLEM', body: ["Explica'm com vols utilitzar el teu vehicle. Ofereixo assessorament si encara no en disposes. Després de la primera trucada podràs tenir una orientació temporal i econòmica del projecte."] },
        { n: '02', title: 'DISSENYEM', body: [
          "Si decideixes que soc la persona ideal per crear la teva casa sobre rodes, s'acorda una petita paga i senyal que confirma l'inici del projecte i l'entrada a l'agenda del taller.",
          "Plegats dissenyarem la distribució perfecta, es dimensionaran les instal·lacions d'accessoris, el sistema elèctric i el d'aigua, i es triaran els materials de construcció i acabats disponibles.",
        ] },
        { n: '03', title: 'CONSTRUÏM', body: [
          "Segons el vehicle i la complexitat del projecte, es necessitaran més o menys hores. Aproximadament, cada camperització implica d'un a tres mesos de feina.",
          "Amb molt de gust s'accepten visites al taller sota demanda, en moments interessants durant el procés de construcció.",
        ] },
        { n: '04', title: 'HOMOLOGUEM', body: [
          "Cada projecte es realitza tenint en compte la normativa vigent per fer que el procés d'homologació sigui el més fluid possible.",
          "Acompanyo el client a passar la revisió de la ITV si ha volgut rebre el vehicle abans. També s'ofereix l'opció d'entregar el vehicle amb la ITV passada.",
        ] },
        { n: '05', title: 'GAUDIM', body: [
          "Cada camperització fa créixer la petita gran família d'Arreu Campers.",
          'Cada feina que entrego em fa estar orgullós i feliç, sabent que us ajudo a viure noves experiències en aquesta forma tan curiosa i bonica de viatjar: de manera autosuficient amb el vostre vehicle.',
        ] },
      ],
    },
    perQue: {
      title: 'PER QUÈ',
      reasons: [
        { n: '01', title: 'Tot neix de viure-ho', body: ['Soc viatger i fa anys que visc i em moc amb diferents vehicles lluny de casa per períodes extensos. Aquesta experiència és la base de cada projecte que construeixo.'] },
        { n: '02', title: "Treball d'artesà", body: ["Cada projecte es construeix amb temps, atenció al detall i mirada global. Busco l'equilibri entre disseny, funcionalitat i tècnica."] },
        { n: '03', title: 'Responsabilitat ecològica', body: ['El 100% de la fusta que utilitzo compta amb certificacions europees de sostenibilitat. Materials escollits amb criteri i coherents amb la meva filosofia de vida.'] },
        { n: '04', title: 'Economia en xarxa', body: ['Treballo amb proveïdors locals, marques del país i professionals que comparteixen la mateixa manera de fer, apostant pel teixit econòmic del territori.'] },
        { n: '05', title: 'Projectes amb ànima', body: ["Arreu Campers no neix només per construir furgonetes. Neix d'una manera concreta d'entendre com s'han de viure i de la motivació de crear projectes totalment personalitzats, no en sèrie."] },
      ],
    },
    contact: {
      photoAlt: 'Paisatge',
      title: 'Contacta',
      languages: 'Parlem català, castellà, italià, francès i anglès.',
      rights: 'Tots els drets reservats.',
      name: 'Nom',
      surname: 'Cognom',
      email: 'Email *',
      message: 'Explica la teva idea aquí',
      send: 'Enviar',
      sending: 'Enviant…',
      success: 'Missatge enviat correctament. Gràcies!',
      error: "No s'ha pogut enviar el missatge. Torna-ho a provar o escriu-nos per WhatsApp.",
    },
  },

  // ─────────────────────────────── ESPAÑOL ──────────────────────────────
  es: {
    meta: {
      title: 'Camperizaciones a medida en Girona | Arreu Campers',
      description: 'Taller independiente de Girona que diseña, construye y homologa camperizaciones de furgonetas a medida: diseño, instalación completa y trámites de homologación.',
    },
    nav: { language: 'Idioma' },
    hero: {
      logoPlaceholder: '// espacio reservado para el logotipo real',
      tagline: 'SUPER CUSTOM QUALITY',
      projects: 'Mira los proyectos en',
      vanTours: 'Mira los van tours en',
    },
    queFem: {
      title: 'QUÉ',
      intro1: 'Arreu Campers es una empresa dedicada a asesorar, diseñar, construir y homologar camperizaciones a medida, de calidad y con un enfoque curioso.',
      intro2: 'Cada vehículo es una creación única, con adaptaciones ingeniosas para resolver las necesidades específicas de cada cliente.',
      items: [
        { n: '01', title: 'Diseño a medida', body: 'Cada furgoneta y cada forma de viajar es diferente. Partimos de un plan hecho a medida para ti.' },
        { n: '02', title: 'Instalación completa', body: 'Aislamiento, electricidad, agua, gas y carpintería: todo hecho en el taller, de una sola vez.' },
        { n: '03', title: 'Homologación y papeles', body: 'Te acompañamos con la documentación para que el vehículo salga legal a la carretera.' },
      ],
    },
    quiSom: {
      title: 'QUIÉN',
      text1: 'Un pequeño taller independiente de Girona, creado y llevado por una sola persona.',
      text2: 'Una forma cercana de entender las camperizaciones: pocos proyectos al año, artesanía y atención al detalle.',
      altTeam: 'Foto del equipo en el taller',
      altWorkshop: 'Foto del taller',
      altVehicle: 'Foto del vehículo',
      norbertBio1: 'Esquiador y amante de los rincones remotos. El más feliz en días de fuerte tramontana.',
      norbertBio2: 'Culo inquieto, siempre está tramando algo. Amante de los gadgets de todo tipo.',
      bluesBio: 'Ayudante y jefe de taller. Le gustan todos los palos.',
    },
    com: {
      title: 'CÓMO',
      steps: [
        { n: '01', title: 'HABLEMOS', body: ['Cuéntame cómo quieres usar tu vehículo. Ofrezco asesoramiento si todavía no tienes uno. Después de la primera llamada tendrás una orientación de plazos y presupuesto del proyecto.'] },
        { n: '02', title: 'DISEÑAMOS', body: [
          'Si decides que soy la persona ideal para crear tu casa sobre ruedas, se acuerda una pequeña paga y señal que confirma el inicio del proyecto y la entrada en la agenda del taller.',
          'Juntos diseñaremos la distribución perfecta, se dimensionarán las instalaciones de accesorios, el sistema eléctrico y el de agua, y se elegirán los materiales de construcción y acabados disponibles.',
        ] },
        { n: '03', title: 'CONSTRUIMOS', body: [
          'Según el vehículo y la complejidad del proyecto, se necesitarán más o menos horas. Aproximadamente, cada camperización supone de uno a tres meses de trabajo.',
          'Con mucho gusto se aceptan visitas al taller bajo petición, en momentos interesantes del proceso de construcción.',
        ] },
        { n: '04', title: 'HOMOLOGAMOS', body: [
          'Cada proyecto se realiza teniendo en cuenta la normativa vigente para que el proceso de homologación sea lo más fluido posible.',
          'Acompaño al cliente a pasar la ITV si ha preferido recibir el vehículo antes. También se ofrece la opción de entregar el vehículo con la ITV pasada.',
        ] },
        { n: '05', title: 'DISFRUTAMOS', body: [
          'Cada camperización hace crecer la pequeña gran familia de Arreu Campers.',
          'Cada trabajo que entrego me hace sentir orgulloso y feliz, sabiendo que os ayudo a vivir nuevas experiencias en esta forma tan curiosa y bonita de viajar: de manera autosuficiente con vuestro vehículo.',
        ] },
      ],
    },
    perQue: {
      title: 'POR QUÉ',
      reasons: [
        { n: '01', title: 'Todo nace de vivirlo', body: ['Soy viajero y hace años que vivo y me muevo con distintos vehículos lejos de casa durante largos periodos. Esta experiencia es la base de cada proyecto que construyo.'] },
        { n: '02', title: 'Trabajo artesano', body: ['Cada proyecto se construye con tiempo, atención al detalle y una mirada global. Busco el equilibrio entre diseño, funcionalidad y técnica.'] },
        { n: '03', title: 'Responsabilidad ecológica', body: ['El 100% de la madera que utilizo cuenta con certificaciones europeas de sostenibilidad. Materiales elegidos con criterio y coherentes con mi filosofía de vida.'] },
        { n: '04', title: 'Economía en red', body: ['Trabajo con proveedores locales, marcas del país y profesionales que comparten la misma forma de hacer, apostando por el tejido económico del territorio.'] },
        { n: '05', title: 'Proyectos con alma', body: ['Arreu Campers no nace solo para construir furgonetas. Nace de una manera concreta de entender cómo hay que vivirlas y de la motivación de crear proyectos totalmente personalizados, no en serie.'] },
      ],
    },
    contact: {
      photoAlt: 'Paisaje',
      title: 'Contacta',
      languages: 'Hablamos catalán, castellano, italiano, francés e inglés.',
      rights: 'Todos los derechos reservados.',
      name: 'Nombre',
      surname: 'Apellido',
      email: 'Email *',
      message: 'Explica tu idea aquí',
      send: 'Enviar',
      sending: 'Enviando…',
      success: 'Mensaje enviado correctamente. ¡Gracias!',
      error: 'No se ha podido enviar el mensaje. Vuelve a intentarlo o escríbenos por WhatsApp.',
    },
  },

  // ─────────────────────────────── ENGLISH ──────────────────────────────
  en: {
    meta: {
      title: 'Custom campervan conversions in Girona | Arreu Campers',
      description: 'Independent workshop in Girona, Catalonia, that designs, builds and certifies custom van conversions: design, full installation and certification paperwork.',
    },
    nav: { language: 'Language' },
    hero: {
      logoPlaceholder: '// space reserved for the real logo',
      tagline: 'SUPER CUSTOM QUALITY',
      projects: 'See our projects on',
      vanTours: 'Watch the van tours on',
    },
    queFem: {
      title: 'WHAT',
      intro1: 'Arreu Campers advises on, designs, builds and certifies custom campervan conversions: high quality, with a curious approach.',
      intro2: "Every vehicle is a one-of-a-kind creation, with clever adaptations that solve each client's specific needs.",
      items: [
        { n: '01', title: 'Custom design', body: 'Every van and every way of travelling is different. We start from a plan made to measure for you.' },
        { n: '02', title: 'Full installation', body: 'Insulation, electrics, water, gas and carpentry: all done in the workshop, in one go.' },
        { n: '03', title: 'Certification and paperwork', body: 'We help you with the paperwork so your vehicle hits the road fully legal.' },
      ],
    },
    quiSom: {
      title: 'WHO',
      text1: 'A small independent workshop in Girona, set up and run by one person.',
      text2: 'A personal approach to campervan conversions: few projects a year, craftsmanship and attention to detail.',
      altTeam: 'The team at the workshop',
      altWorkshop: 'The workshop',
      altVehicle: 'The vehicle',
      norbertBio1: 'Skier and lover of remote corners. Happiest on days of strong tramontane wind.',
      norbertBio2: 'Restless soul, always up to something. Loves gadgets of every kind.',
      bluesBio: 'Assistant and workshop boss. Loves every kind of stick.',
    },
    com: {
      title: 'HOW',
      steps: [
        { n: '01', title: "LET'S TALK", body: ["Tell me how you want to use your vehicle. I can advise you if you don't have one yet. After the first call you'll have a rough idea of the project's timeline and cost."] },
        { n: '02', title: 'WE DESIGN', body: [
          "If you decide I'm the right person to build your home on wheels, we agree on a small deposit that confirms the start of the project and books your slot in the workshop schedule.",
          "Together we'll design the perfect layout, size the accessories, the electrical system and the water system, and choose from the available building materials and finishes.",
        ] },
        { n: '03', title: 'WE BUILD', body: [
          'Depending on the vehicle and the complexity of the project, it will take more or fewer hours. Roughly, each conversion means one to three months of work.',
          'Workshop visits are very welcome on request, at interesting moments during the build.',
        ] },
        { n: '04', title: 'WE CERTIFY', body: [
          'Every project is built with current regulations in mind, so the certification process runs as smoothly as possible.',
          "I go with you to the ITV (Spain's vehicle inspection) if you'd rather receive the vehicle beforehand. You can also have it delivered with the ITV already passed.",
        ] },
        { n: '05', title: 'WE ENJOY', body: [
          'Every conversion grows the small-but-big Arreu Campers family.',
          "Every job I hand over makes me proud and happy, knowing I'm helping you live new experiences in this curious and beautiful way of travelling: self-sufficiently, in your own vehicle.",
        ] },
      ],
    },
    perQue: {
      title: 'WHY',
      reasons: [
        { n: '01', title: 'It all comes from living it', body: ["I'm a traveller, and for years I've lived and moved around in different vehicles, far from home for long stretches. That experience is the foundation of every project I build."] },
        { n: '02', title: 'Craftsmanship', body: ['Every project is built with time, attention to detail and a big-picture view. I look for the balance between design, functionality and technique.'] },
        { n: '03', title: 'Environmental responsibility', body: ['100% of the wood I use carries European sustainability certifications. Materials chosen with care and in line with my philosophy of life.'] },
        { n: '04', title: 'Local network economy', body: ['I work with local suppliers, homegrown brands and professionals who share the same way of doing things, backing the local economy.'] },
        { n: '05', title: 'Projects with soul', body: ["Arreu Campers wasn't born just to build vans. It comes from a particular way of understanding how they should be lived in, and from the drive to create fully personalised projects, not mass-produced ones."] },
      ],
    },
    contact: {
      photoAlt: 'Landscape',
      title: 'Contact',
      languages: 'We speak Catalan, Spanish, Italian, French and English.',
      rights: 'All rights reserved.',
      name: 'First name',
      surname: 'Last name',
      email: 'Email *',
      message: 'Tell us about your idea',
      send: 'Send',
      sending: 'Sending…',
      success: 'Message sent. Thank you!',
      error: "Your message couldn't be sent. Try again or message us on WhatsApp.",
    },
  },

  // ─────────────────────────────── FRANÇAIS ─────────────────────────────
  fr: {
    meta: {
      title: 'Aménagement de vans sur mesure à Gérone | Arreu Campers',
      description: 'Atelier indépendant à Gérone, en Catalogne, qui conçoit, construit et homologue des aménagements de vans sur mesure : conception, installation complète et homologation.',
    },
    nav: { language: 'Langue' },
    hero: {
      logoPlaceholder: '// espace réservé au vrai logo',
      tagline: 'SUPER CUSTOM QUALITY',
      projects: 'Découvrez nos projets sur',
      vanTours: 'Regardez les van tours sur',
    },
    queFem: {
      title: 'QUOI',
      intro1: 'Arreu Campers conseille, conçoit, construit et homologue des aménagements de vans sur mesure, de qualité et avec une approche curieuse.',
      intro2: 'Chaque véhicule est une création unique, avec des adaptations ingénieuses pour répondre aux besoins spécifiques de chaque client.',
      items: [
        { n: '01', title: 'Conception sur mesure', body: 'Chaque van est différent, tout comme chaque façon de voyager. Nous partons d\'un plan conçu sur mesure pour vous.' },
        { n: '02', title: 'Installation complète', body: 'Isolation, électricité, eau, gaz et menuiserie : tout est réalisé à l\'atelier, en une seule fois.' },
        { n: '03', title: 'Homologation et démarches', body: 'Nous vous accompagnons dans les démarches pour que le véhicule prenne la route en toute légalité.' },
      ],
    },
    quiSom: {
      title: 'QUI',
      text1: 'Un petit atelier indépendant à Gérone, créé et tenu par une seule personne.',
      text2: "Une approche humaine de l'aménagement de vans : peu de projets par an, de l'artisanat et le souci du détail.",
      altTeam: "L'équipe à l'atelier",
      altWorkshop: "L'atelier",
      altVehicle: 'Le véhicule',
      norbertBio1: 'Skieur et amoureux des coins reculés. Jamais aussi heureux que les jours de forte tramontane.',
      norbertBio2: 'Toujours en mouvement, il a toujours un projet en tête. Fan de gadgets en tout genre.',
      bluesBio: "Assistant et chef d'atelier. Il aime tous les bâtons.",
    },
    com: {
      title: 'COMMENT',
      steps: [
        { n: '01', title: 'PARLONS', body: ["Racontez-moi comment vous souhaitez utiliser votre véhicule. Je vous conseille si vous n'en avez pas encore. Après le premier appel, vous aurez une idée des délais et du budget du projet."] },
        { n: '02', title: 'CONCEVONS', body: [
          'Si vous décidez que je suis la bonne personne pour créer votre maison sur roues, nous convenons d\'un petit acompte qui confirme le lancement du projet et réserve votre place dans le planning de l\'atelier.',
          'Ensemble, nous concevrons l\'agencement idéal, dimensionnerons les équipements, le circuit électrique et le circuit d\'eau, et choisirons parmi les matériaux et finitions disponibles.',
        ] },
        { n: '03', title: 'CONSTRUISONS', body: [
          'Selon le véhicule et la complexité du projet, il faudra plus ou moins d\'heures. En moyenne, chaque aménagement représente d\'un à trois mois de travail.',
          'Les visites à l\'atelier sont les bienvenues sur demande, aux moments intéressants de la construction.',
        ] },
        { n: '04', title: 'HOMOLOGUONS', body: [
          'Chaque projet est réalisé dans le respect de la réglementation en vigueur, pour que l\'homologation se passe le plus facilement possible.',
          'J\'accompagne le client au contrôle technique (ITV) s\'il a préféré récupérer le véhicule avant. Il est aussi possible de livrer le véhicule avec l\'ITV déjà passée.',
        ] },
        { n: '05', title: 'PROFITONS', body: [
          'Chaque aménagement agrandit la petite grande famille d\'Arreu Campers.',
          'Chaque projet que je livre me rend fier et heureux, en sachant que je vous aide à vivre de nouvelles expériences dans cette façon si curieuse et si belle de voyager : en autonomie, avec votre propre véhicule.',
        ] },
      ],
    },
    perQue: {
      title: 'POURQUOI',
      reasons: [
        { n: '01', title: 'Tout vient du vécu', body: ['Je suis voyageur et depuis des années je vis et me déplace dans différents véhicules, loin de chez moi pendant de longues périodes. Cette expérience est la base de chaque projet que je construis.'] },
        { n: '02', title: 'Un travail d\'artisan', body: ['Chaque projet est construit avec du temps, le souci du détail et une vision d\'ensemble. Je cherche l\'équilibre entre design, fonctionnalité et technique.'] },
        { n: '03', title: 'Responsabilité écologique', body: ['100 % du bois que j\'utilise bénéficie de certifications européennes de durabilité. Des matériaux choisis avec soin et cohérents avec ma philosophie de vie.'] },
        { n: '04', title: 'Économie en réseau', body: ['Je travaille avec des fournisseurs locaux, des marques du pays et des professionnels qui partagent la même façon de faire, en misant sur le tissu économique local.'] },
        { n: '05', title: 'Des projets avec une âme', body: ['Arreu Campers n\'est pas né seulement pour construire des vans. Il naît d\'une certaine façon de comprendre comment on doit les vivre, et de l\'envie de créer des projets entièrement personnalisés, pas en série.'] },
      ],
    },
    contact: {
      photoAlt: 'Paysage',
      title: 'Contact',
      languages: 'Nous parlons catalan, espagnol, italien, français et anglais.',
      rights: 'Tous droits réservés.',
      name: 'Prénom',
      surname: 'Nom',
      email: 'E-mail *',
      message: 'Parlez-nous de votre idée',
      send: 'Envoyer',
      sending: 'Envoi…',
      success: 'Message envoyé. Merci !',
      error: "Le message n'a pas pu être envoyé. Réessayez ou écrivez-nous sur WhatsApp.",
    },
  },
};

export const LANGUAGES = ['ca', 'es', 'en', 'fr'];
export const DEFAULT_LANG = 'ca';

// El català viu a l'arrel (/) i la resta d'idiomes a /es/, /en/, /fr/
export function langUrl(lang) {
  return lang === DEFAULT_LANG ? '/' : `/${lang}/`;
}

// Substitut de useTranslation(): t('queFem.title'), t('com.steps')...
// Si una clau no existeix en un idioma, es fa servir la catalana.
export function getT(lang) {
  const lookup = (dict, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict);
  return (key) => lookup(translations[lang], key) ?? lookup(translations[DEFAULT_LANG], key) ?? key;
}
