import { gameReviews } from './reviews';

export const games = [
  {
    id: 1,
    title: "Bola de Fuego Suprema",
    category: "Poderes Elementales",
    platform: "Fuego",
    price: 59.99,
    trailer: "https://www.youtube.com/embed/wgC7KVkhPsQ",
    description: "Domina el elemento fuego con esta poderosa esfera ígnea. Capaz de reducir fortalezas a cenizas y derretir metales preciosos. Perfecta para magos que buscan poder destructivo puro.",
    images: ["/img/fuego1.jpg", "/img/fuego2.jpg", "/img/fuego3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "Pyromancer",
        comment: "¡Increíble poder! Derritió todo a su paso",
        stars: 5,
        date: "2024-01-15"
      }
    ],
    stock: 50,
    isActive: true,
    sku: "FUEGO-001",
    discount: 0,
    featured: true
  },
  {
    id: 2,
    title: "Tsunami Ancestral", 
    category: "Poderes Elementales",
    platform: "Agua",
    price: 49.99,
    trailer: "https://www.youtube.com/embed/Z-WSedqa5zA",
    description: "Invoca las profundidades oceánicas con este hechizo de control acuático. Desde suaves lluvias hasta tsunamis devastadores, el agua obedece tu voluntad.",
    images: ["/img/agua1.jpg", "/img/agua2.jpg", "/img/agua3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "AquaMage",
        comment: "Control total sobre el agua, muy versátil",
        stars: 4,
        date: "2024-02-20"
      }
    ],
    stock: 30,
    isActive: true,
    sku: "AGUA-002",
    discount: 10,
    featured: true
  },
  {
    id: 3,
    title: "Tornado Elemental",
    category: "Poderes Elementales",
    platform: "Aire",
    price: 19.99,
    trailer: "https://www.youtube.com/embed/s0c27Twu__o",
    description: "Controla los vientos y las tormentas. Este poder te permite volar, crear escudos de viento y convocar tornados que arrasan con todo a su paso.",
    images: ["/img/aire1.jpg", "/img/aire2.jpg", "/img/aire3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "WindMaster",
        comment: "Perfecto para movilidad y defensa",
        stars: 4,
        date: "2024-03-10"
      }
    ],
    stock: 25,
    isActive: true,
    sku: "AIRE-003",
    discount: 5,
    featured: false
  },
  {
    id: 4,
    title: "Terremoto Telúrico",
    category: "Poderes Elementales",
    platform: "Tierra",
    price: 39.99,
    trailer: "https://www.youtube.com/embed/sl_gLSHR84A",
    description: "Conecta con las fuerzas telúricas del planeta. Abre grietas, levanta montañas y controla la roca y el metal con este poder ancestral.",
    images: ["/img/tierra1.jpg", "/img/tierra2.jpg", "/img/tierra3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "GeoLord",
        comment: "Poder absoluto sobre la tierra, impresionante",
        stars: 5,
        date: "2024-01-25"
      }
    ],
    stock: 40,
    isActive: true,
    sku: "TIERRA-004",
    discount: 15,
    featured: true
  },
  {
    id: 5,
    title: "Resurrección Arcana",
    category: "Magia Avanzada",
    platform: "Luz",
    price: 49.99,
    trailer: "https://www.youtube.com/embed/wboON-Z-eqI",
    description: "El más poderoso hechizo de sanación. Revive a los caídos, cura enfermedades incurables y bendice con protección divina.",
    images: ["/img/luz1.jpg", "/img/luz2.jpg", "/img/luz3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Healer",
        comment: "Salvó a mi grupo completo en batalla",
        stars: 5,
        date: "2024-02-15"
      }
    ],
    stock: 35,
    isActive: true,
    sku: "LUZ-005",
    discount: 20,
    featured: false
  },
  {
    id: 6,
    title: "Bola de Luz Curativa",
    category: "Hechizos Básicos", 
    platform: "Luz",
    price: 0,
    trailer: "https://www.youtube.com/embed/EUW64InojVI",
    description: "Hechizo gratuito para principiantes. Cura heridas leves, purifica ambientes y proporciona luz en la oscuridad. Perfecto para aprendices.",
    images: ["/img/basico1.jpg", "/img/basico2.jpg", "/img/basico3.jpg"],
    rating: 3,
    reviews: [
      {
        name: "Novice",
        comment: "Buen hechizo para empezar en la magia",
        stars: 3,
        date: "2024-03-05"
      }
    ],
    stock: 999,
    isActive: true,
    sku: "BASICO-006",
    discount: 0,
    featured: true
  },
  {
    id: 7,
    title: "Escudo de Viento Colectivo",
    category: "Hechizos Básicos",
    platform: "Aire",
    price: 0,
    trailer: "https://www.youtube.com/embed/yu0M0A1IWmA",
    description: "Protege a todo tu grupo con este escudo de viento colaborativo. Múltiples magos pueden unir fuerzas para crear un escudo impenetrable.",
    images: ["/img/colectivo1.jpg", "/img/colectivo2.jpg", "/img/colectivo3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "TeamLeader",
        comment: "Esencial para misiones grupales",
        stars: 4,
        date: "2024-01-30"
      }
    ],
    stock: 999,
    isActive: true,
    sku: "COLECTIVO-007",
    discount: 0,
    featured: false
  },
  {
    id: 8,
    title: "Amuleto del Fénix",
    category: "Artefactos Legendarios",
    platform: "Fuego",
    price: 59.99,
    trailer: "https://www.youtube.com/embed/sGrsbUO8N4Q",
    description: "Artefacto legendario que concede resurrección automática al portador. Una vez por luna llena, te levantarás de tus cenizas más fuerte que antes.",
    images: ["/img/artefacto1.jpg", "/img/artefacto2.jpg", "/img/artefacto3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "Survivor",
        comment: "Me salvó la vida 3 veces ya!",
        stars: 5,
        date: "2024-02-10"
      }
    ],
    stock: 45,
    isActive: true,
    sku: "ARTEFACTO-008",
    discount: 0,
    featured: true
  },
  {
    id: 9,
    title: "Poción de Invisibilidad",
    category: "Pociones Mágicas",
    platform: "Aire",
    price: 24.99,
    trailer: "https://www.youtube.com/embed/zxp-8m2fQ_g",
    description: "Bebida alquímica que te hace invisible por 30 minutos. Perfecta para espionaje, evasión o simplemente evitar conversaciones indeseadas.",
    images: ["/img/pocion1.jpg", "/img/pocion2.jpg", "/img/pocion3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "Rogue",
        comment: "Perfecta para misiones de infiltración",
        stars: 5,
        date: "2024-03-12"
      }
    ],
    stock: 60,
    isActive: true,
    sku: "POCION-009",
    discount: 10,
    featured: false
  },
  {
    id: 10,
    title: "Hechizo de Teletransportación", 
    category: "Magia Avanzada",
    platform: "Luz",
    price: 14.99,
    trailer: "https://www.youtube.com/embed/MRS2XSnCGBg",
    description: "Transportación instantánea a cualquier lugar conocido. Ahorra tiempo de viaje y sorprende a tus enemigos apareciendo donde menos lo esperan.",
    images: ["/img/teleport1.jpg", "/img/teleport2.jpg", "/img/teleport3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "Traveler",
        comment: "Increíble para explorar el reino rápidamente",
        stars: 5,
        date: "2024-01-18"
      }
    ],
    stock: 80,
    isActive: true,
    sku: "TELEPORT-010",
    discount: 5,
    featured: true
  },
  {
    id: 11,
    title: "Orbe de la Verdad",
    category: "Artefactos Legendarios",
    platform: "Luz",
    price: 14.99,
    trailer: "https://www.youtube.com/embed/fWWjN1OXpyg",
    description: "Esfera cristalina que revela verdades ocultas y detecta mentiras. Imprescindible para negociaciones y juicios mágicos.",
    images: ["/img/orbe1.jpg", "/img/orbe2.jpg", "/img/orbe3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Judge",
        comment: "Fundamental para mis deberes como juez mágico",
        stars: 4,
        date: "2024-02-28"
      }
    ],
    stock: 20,
    isActive: true,
    sku: "ORBE-011",
    discount: 0,
    featured: false
  },
  {
    id: 12,
    title: "Invocación de Golem",
    category: "Magia Avanzada",
    platform: "Tierra",
    price: 39.99,
    trailer: "https://www.youtube.com/embed/2qyGt34woGk",
    description: "Da vida a un sirviente de piedra que te protegerá y realizará tareas pesadas. Leal hasta la destrucción.",
    images: ["/img/golem1.jpg", "/img/golem2.jpg", "/img/golem3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Summoner",
        comment: "Mi golem es mi mejor compañero de aventuras",
        stars: 4,
        date: "2024-03-08"
      }
    ],
    stock: 55,
    isActive: true,
    sku: "GOLEM-012",
    discount: 25,
    featured: true
  },
  {
    id: 13,
    title: "Anillo de Poder Absoluto",
    category: "Artefactos Legendarios",
    platform: "Oscuridad",
    price: 59.99,
    trailer: "https://www.youtube.com/embed/kM0Vfa3Ld5E",
    description: "El artefacto más poderoso jamás creado. Otorga control sobre todos los elementos pero exige un precio terrible a su portador.",
    images: ["/img/anillo1.jpg", "/img/anillo2.jpg", "/img/anillo3.jpg"],
    rating: 5,
    reviews: [],
    stock: 65,
    isActive: true,
    sku: "ANILLO-013",
    discount: 0,
    featured: true
  },
  {
    id: 14,
    title: "Hechizo de Ilusión Básico",
    category: "Hechizos Básicos",
    platform: "Aire",
    price: 26.95,
    trailer: "https://www.youtube.com/embed/XlLy_qWBrR8",
    description: "Crea ilusiones simples perfectas para practicar magia. Ideal para principiantes que quieren aprender control mental.",
    images: ["/img/ilusion1.jpg", "/img/ilusion2.jpg", "/img/ilusion3.jpg"],
    rating: 5,
    reviews: [],
    stock: 999,
    isActive: true,
    sku: "ILUSION-014",
    discount: 0,
    featured: true
  },
  {
    id: 15,
    title: "Ritual de Protección Grupal",
    category: "Artefactos Legendarios",
    platform: "Luz",
    price: 0,
    trailer: "https://www.youtube.com/embed/7rCBps3uIUY",
    description: "Protección mágica gratuita para grupos. Múltiples magos pueden unir fuerzas para crear un escudo impenetrable.",
    images: ["/img/proteccion1.jpg", "/img/proteccion2.jpg", "/img/proteccion3.jpg"],
    rating: 4,
    reviews: [],
    stock: 999,
    isActive: true,
    sku: "PROTECCION-015",
    discount: 0,
    featured: false
  },
  {
    id: 16,
    title: "Rayo Tormentoso",
    category: "Poderes Elementales",
    platform: "Aire",
    price: 34.99,
    trailer: "https://www.youtube.com/embed/zB68LgQTB-8",
    description: "Conjura poderosos rayos eléctricos desde los cielos. Controla las tormentas y electrocuta a tus enemigos con este poder atmosférico.",
    images: ["/img/rayo1.jpg", "/img/rayo2.jpg", "/img/rayo3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "StormCaller",
        comment: "El poder de los dioses en mis manos!",
        stars: 5,
        date: "2024-03-15"
      }
    ],
    stock: 40,
    isActive: true,
    sku: "RAYO-016",
    discount: 10,
    featured: true
  },
  {
    id: 17,
    title: "Muro de Hielo Eterno",
    category: "Poderes Elementales",
    platform: "Agua",
    price: 29.99,
    trailer: "https://www.youtube.com/embed/aQbBCH6xZMw",
    description: "Crea impenetrables barreras de hielo que protegen contra ataques físicos y mágicos. Duración extendida incluso en climas cálidos.",
    images: ["/img/hielo1.jpg", "/img/hielo2.jpg", "/img/hielo3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "IceMage",
        comment: "Defensa perfecta contra ataques de fuego",
        stars: 4,
        date: "2024-02-22"
      }
    ],
    stock: 35,
    isActive: true,
    sku: "HIELO-017",
    discount: 5,
    featured: false
  },
  {
    id: 18,
    title: "Visión del Futuro",
    category: "Magia Avanzada",
    platform: "Luz",
    price: 79.99,
    trailer: "https://www.youtube.com/embed/0xrLrFxGIbo",
    description: "Atisba momentos del futuro para anticipar peligros y oportunidades. Perfecto para estrategas y planificadores.",
    images: ["/img/vision1.jpg", "/img/vision2.jpg", "/img/vision3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "Oracle",
        comment: "Cambió completamente mi forma de tomar decisiones",
        stars: 5,
        date: "2024-01-30"
      }
    ],
    stock: 15,
    isActive: true,
    sku: "VISION-018",
    discount: 0,
    featured: true
  },
  {
    id: 19,
    title: "Maleficio de Debilitamiento",
    category: "Magia Avanzada",
    platform: "Oscuridad",
    price: 44.99,
    trailer: "https://www.youtube.com/embed/kf4TGNNzdAI",
    description: "Drena la fuerza y vitalidad de tus enemigos, reduciendo sus capacidades de combate significativamente.",
    images: ["/img/maleficio1.jpg", "/img/maleficio2.jpg", "/img/maleficio3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "DarkMage",
        comment: "Muy efectivo contra enemigos poderosos",
        stars: 4,
        date: "2024-03-05"
      }
    ],
    stock: 50,
    isActive: true,
    sku: "MALEFICIO-019",
    discount: 15,
    featured: false
  },
  {
    id: 20,
    title: "Bendición de la Fertilidad",
    category: "Magia Natural",
    platform: "Tierra",
    price: 19.99,
    trailer: "https://www.youtube.com/embed/OpYQ9Oy4Pag",
    description: "Favorece el crecimiento de cultivos y plantas. Esencial para magos que trabajan con la naturaleza.",
    images: ["/img/bendicion1.jpg", "/img/bendicion2.jpg", "/img/bendicion3.jpg"],
    rating: 3,
    reviews: [
      {
        name: "Druid",
        comment: "Mis cultivos crecen el doble de rápido",
        stars: 3,
        date: "2024-02-14"
      }
    ],
    stock: 100,
    isActive: true,
    sku: "BENDICION-020",
    discount: 0,
    featured: false
  },
  {
    id: 21,
    title: "Espejo de Reflexión Mágica",
    category: "Artefactos Legendarios",
    platform: "Luz",
    price: 54.99,
    trailer: "https://www.youtube.com/embed/lNmNOdqQnSo",
    description: "Refleja hechizos enemigos de vuelta a su lanzador. Defensa perfecta contra magos rivales.",
    images: ["/img/espejo1.jpg", "/img/espejo2.jpg", "/img/espejo3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "Reflector",
        comment: "Invaluable en duelos mágicos",
        stars: 5,
        date: "2024-03-20"
      }
    ],
    stock: 25,
    isActive: true,
    sku: "ESPEJO-021",
    discount: 10,
    featured: true
  },
  {
    id: 22,
    title: "Poción de Fuerza Sobrenatural",
    category: "Pociones Mágicas",
    platform: "Tierra",
    price: 32.99,
    trailer: "https://www.youtube.com/embed/5A5bjQM1-VA",
    description: "Otorga fuerza sobrehumana temporal. Perfecta para batallas físicas y tareas que requieren potencia.",
    images: ["/img/fuerza1.jpg", "/img/fuerza2.jpg", "/img/fuerza3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Warrior",
        comment: "Me permitió levantar rocas gigantes",
        stars: 4,
        date: "2024-01-25"
      }
    ],
    stock: 70,
    isActive: true,
    sku: "FUERZA-022",
    discount: 5,
    featured: false
  },
  {
    id: 23,
    title: "Hechizo de Lenguas Antiguas",
    category: "Magia Avanzada",
    platform: "Luz",
    price: 27.99,
    trailer: "https://www.youtube.com/embed/fvtHD2S77Cc",
    description: "Comprende y habla cualquier idioma, incluyendo lenguajes antiguos y criaturas mágicas.",
    images: ["/img/lenguas1.jpg", "/img/lenguas2.jpg", "/img/lenguas3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Linguist",
        comment: "Perfecto para comunicarme con dragones",
        stars: 4,
        date: "2024-02-18"
      }
    ],
    stock: 45,
    isActive: true,
    sku: "LENGUAS-023",
    discount: 0,
    featured: true
  },
  {
    id: 24,
    title: "Nube Venenosa",
    category: "Magia Oscura",
    platform: "Aire",
    price: 38.99,
    trailer: "https://www.youtube.com/embed/pck3tmQScsI",
    description: "Crea una nube tóxica que debilita y envenena a quienes la respiran. Efectiva contra grupos de enemigos.",
    images: ["/img/veneno1.jpg", "/img/veneno2.jpg", "/img/veneno3.jpg"],
    rating: 3,
    reviews: [
      {
        name: "Alchemist",
        comment: "Muy útil para control de multitudes",
        stars: 3,
        date: "2024-03-10"
      }
    ],
    stock: 55,
    isActive: true,
    sku: "VENENO-024",
    discount: 20,
    featured: false
  },
  {
    id: 25,
    title: "Capa de Invisibilidad Élfica",
    category: "Artefactos Legendarios",
    platform: "Aire",
    price: 89.99,
    trailer: "https://www.youtube.com/embed/EDGVffH8nKA",
    description: "Capa tejida con magia élfica que otorga invisibilidad permanente mientras se usa.",
    images: ["/img/capa1.jpg", "/img/capa2.jpg", "/img/capa3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "Rogue",
        comment: "El mejor equipo para sigilo",
        stars: 5,
        date: "2024-01-12"
      }
    ],
    stock: 10,
    isActive: true,
    sku: "CAPA-025",
    discount: 0,
    featured: true
  },
  {
    id: 26,
    title: "Invocación de Fénix",
    category: "Magia Avanzada",
    platform: "Fuego",
    price: 69.99,
    trailer: "https://www.youtube.com/embed/2qfWSV6Zmp0",
    description: "Invoca al legendario fénix para que luche a tu lado. Capaz de renacer de sus cenizas infinitamente.",
    images: ["/img/fenix1.jpg", "/img/fenix2.jpg", "/img/fenix3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "Summoner",
        comment: "Compañero leal y poderoso",
        stars: 5,
        date: "2024-02-05"
      }
    ],
    stock: 20,
    isActive: true,
    sku: "FENIX-026",
    discount: 15,
    featured: true
  },
  {
    id: 27,
    title: "Hechizo de Memoria Selectiva",
    category: "Magia Mental",
    platform: "Luz",
    price: 42.99,
    trailer: "https://www.youtube.com/embed/eisOifEqBYk",
    description: "Modifica o borra recuerdos específicos. Útil para proteger secretos o ayudar a superar traumas.",
    images: ["/img/memoria1.jpg", "/img/memoria2.jpg", "/img/memoria3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "MindMage",
        comment: "Requiere cuidado ético pero muy poderoso",
        stars: 4,
        date: "2024-03-25"
      }
    ],
    stock: 30,
    isActive: true,
    sku: "MEMORIA-027",
    discount: 0,
    featured: false
  },
  {
    id: 28,
    title: "Armadura de Escamas de Dragón",
    category: "Artefactos Legendarios",
    platform: "Tierra",
    price: 99.99,
    trailer: "https://www.youtube.com/embed/aJ-cKPQzuOM",
    description: "Armadura forjada con escamas de dragón ancestral. Casi indestructible y resistente a la magia.",
    images: ["/img/armadura1.jpg", "/img/armadura2.jpg", "/img/armadura3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "Knight",
        comment: "Me salvó de un hechizo de muerte",
        stars: 5,
        date: "2024-01-08"
      }
    ],
    stock: 8,
    isActive: true,
    sku: "ARMADURA-028",
    discount: 0,
    featured: true
  },
  {
    id: 29,
    title: "Poción de Sueño Eterno",
    category: "Pociones Mágicas",
    platform: "Oscuridad",
    price: 36.99,
    trailer: "https://www.youtube.com/embed/7EnyoJX61FE",
    description: "Induce un sueño profundo e ininterrumpido. Perfecta para tratar insomnio o neutralizar enemigos.",
    images: ["/img/sueno1.jpg", "/img/sueno2.jpg", "/img/sueno3.jpg"],
    rating: 3,
    reviews: [
      {
        name: "Healer",
        comment: "Efectiva pero debe usarse con responsabilidad",
        stars: 3,
        date: "2024-02-28"
      }
    ],
    stock: 65,
    isActive: true,
    sku: "SUENO-029",
    discount: 10,
    featured: false
  },
  {
    id: 30,
    title: "Control del Clima",
    category: "Magia Avanzada",
    platform: "Aire",
    price: 59.99,
    trailer: "https://www.youtube.com/embed/EqXlDf7aAys",
    description: "Modifica patrones climáticos a gran escala. Crea lluvias, despeja cielos o convoca tormentas.",
    images: ["/img/clima1.jpg", "/img/clima2.jpg", "/img/clima3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "WeatherMage",
        comment: "Poder que antes solo tenían los dioses",
        stars: 5,
        date: "2024-03-15"
      }
    ],
    stock: 12,
    isActive: true,
    sku: "CLIMA-030",
    discount: 0,
    featured: true
  },
  {
    id: 31,
    title: "Báculo del Sabio Ancestral",
    category: "Artefactos Legendarios",
    platform: "Luz",
    price: 74.99,
    trailer: "https://www.youtube.com/embed/qfYevKDCguA",
    description: "Báculo que amplifica el poder mágico y otorga sabiduría ancestral a su portador.",
    images: ["/img/baculo1.jpg", "/img/baculo2.jpg", "/img/baculo3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "Archmage",
        comment: "Mi poder se duplicó con este artefacto",
        stars: 5,
        date: "2024-01-20"
      }
    ],
    stock: 15,
    isActive: true,
    sku: "BACULO-031",
    discount: 20,
    featured: true
  },
  {
    id: 32,
    title: "Hechizo de Curación Básica",
    category: "Hechizos Básicos",
    platform: "Luz",
    price: 0,
    trailer: "https://www.youtube.com/embed/Csx6NcPsxgQ",
    description: "Cura heridas menores y alivia dolores. Perfecto para aprendices de magia curativa.",
    images: ["/img/curacion1.jpg", "/img/curacion2.jpg", "/img/curacion3.jpg"],
    rating: 3,
    reviews: [
      {
        name: "Apprentice",
        comment: "Buen punto de partida para sanadores",
        stars: 3,
        date: "2024-03-01"
      }
    ],
    stock: 999,
    isActive: true,
    sku: "CURACION-032",
    discount: 0,
    featured: false
  },
  {
    id: 33,
    title: "Portal Dimensional",
    category: "Magia Avanzada",
    platform: "Luz",
    price: 84.99,
    trailer: "https://www.youtube.com/embed/hay6P6BjUUw",
    description: "Abre portales a otras dimensiones y planos de existencia. Viaja entre realidades con este poder cósmico.",
    images: ["/img/portal1.jpg", "/img/portal2.jpg", "/img/portal3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "DimensionWalker",
        comment: "El universo entero está a mi alcance",
        stars: 5,
        date: "2024-02-12"
      }
    ],
    stock: 18,
    isActive: true,
    sku: "PORTAL-033",
    discount: 0,
    featured: true
  },
  {
    id: 34,
    title: "Poción de Juventud Temporal",
    category: "Pociones Mágicas",
    platform: "Luz",
    price: 49.99,
    trailer: "https://www.youtube.com/embed/af70nd_18SI",
    description: "Revierte el envejecimiento por tiempo limitado. Restaura vitalidad y apariencia juvenil.",
    images: ["/img/juventud1.jpg", "/img/juventud2.jpg", "/img/juventud3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "ElderMage",
        comment: "Volví a tener la energía de mis 20 años",
        stars: 5,
        date: "2024-01-05"
      }
    ],
    stock: 5,
    isActive: true,
    sku: "JUVENTUD-034",
    discount: 0,
    featured: true
  },
  {
    id: 35,
    title: "Ritual de Lluvia",
    category: "Conjuros Colectivos",
    platform: "Agua",
    price: 0,
    trailer: "https://www.youtube.com/embed/3TA9b7j8tKE",
    description: "Ritual grupal para invocar lluvias beneficiosas. Múltiples magos pueden aumentar el área de efecto.",
    images: ["/img/lluvia1.jpg", "/img/lluvia2.jpg", "/img/lluvia3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Farmer",
        comment: "Salvó nuestra cosecha durante la sequía",
        stars: 4,
        date: "2024-03-18"
      }
    ],
    stock: 999,
    isActive: true,
    sku: "LLUVIA-035",
    discount: 0,
    featured: false
  },
  {
    id: 36,
    title: "Gema de Almacenamiento Mágico",
    category: "Artefactos Legendarios",
    platform: "Luz",
    price: 45.99,
    trailer: "https://www.youtube.com/embed/_WrGfgVhkj8",
    description: "Almacena energía mágica para uso posterior. Perfecta para emergencias o hechizos que requieren mucha energía.",
    images: ["/img/gema1.jpg", "/img/gema2.jpg", "/img/gema3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "EnergyMage",
        comment: "Nunca me quedo sin poder mágico",
        stars: 4,
        date: "2024-02-25"
      }
    ],
    stock: 40,
    isActive: true,
    sku: "GEMA-036",
    discount: 15,
    featured: false
  },
  {
    id: 37,
    title: "Hechizo de Purificación",
    category: "Magia Natural",
    platform: "Luz",
    price: 22.99,
    trailer: "https://www.youtube.com/embed/xDGoMtWiSOQ",
    description: "Purifica agua, aire y objetos de contaminación y maldiciones. Esencial para ambientes saludables.",
    images: ["/img/purificacion1.jpg", "/img/purificacion2.jpg", "/img/purificacion3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Cleaner",
        comment: "Mantenemos nuestro templo impecable",
        stars: 4,
        date: "2024-03-22"
      }
    ],
    stock: 85,
    isActive: true,
    sku: "PURIFICACION-037",
    discount: 5,
    featured: false
  },
  {
    id: 38,
    title: "Invocación de Espíritus Guardianes",
    category: "Magia Avanzada",
    platform: "Luz",
    price: 67.99,
    trailer: "https://www.youtube.com/embed/W00VS6uLShw",
    description: "Invoca espíritus ancestrales para protección y guía. Ofrecen sabiduría y defensa contra amenazas etéreas.",
    images: ["/img/espiritus1.jpg", "/img/espiritus2.jpg", "/img/espiritus3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "SpiritCaller",
        comment: "Mis ancestros me protegen constantemente",
        stars: 5,
        date: "2024-01-28"
      }
    ],
    stock: 22,
    isActive: true,
    sku: "ESPIRITUS-038",
    discount: 10,
    featured: true
  },
  {
    id: 39,
    title: "Poción de Cambio de Forma",
    category: "Pociones Mágicas",
    platform: "Tierra",
    price: 52.99,
    trailer: "https://www.youtube.com/embed/Cv638q7xQ54",
    description: "Permite transformarse en diferentes animales por tiempo limitado. Ideal para espionaje y exploración.",
    images: ["/img/cambio1.jpg", "/img/cambio2.jpg", "/img/cambio3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Shifter",
        comment: "Volarme como águila fue increíble",
        stars: 4,
        date: "2024-02-08"
      }
    ],
    stock: 35,
    isActive: true,
    sku: "CAMBIO-039",
    discount: 20,
    featured: false
  },
  {
    id: 40,
    title: "Escudo Anti-Magia",
    category: "Conjuros Colectivos",
    platform: "Luz",
    price: 0,
    trailer: "https://www.youtube.com/embed/WNOhGinQb1Y",
    description: "Protección grupal contra hechizos hostiles. Múltiples magos pueden fortalecer el escudo colectivamente.",
    images: ["/img/antimagia1.jpg", "/img/antimagia2.jpg", "/img/antimagia3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "TeamMage",
        comment: "Fundamental para enfrentar magos oscuros",
        stars: 4,
        date: "2024-03-30"
      }
    ],
    stock: 999,
    isActive: true,
    sku: "ANTIMAGIA-040",
    discount: 0,
    featured: false
  },
  {
    id: 41,
    title: "Orbe de Energía Cósmica",
    category: "Artefactos Legendarios",
    platform: "Luz",
    price: 99.99,
    trailer: "https://www.youtube.com/embed/mDoeRXNJbLg",
    description: "Canaliza energía directamente del cosmos. Poder ilimitado pero requiere gran maestría para controlar.",
    images: ["/img/cosmico1.jpg", "/img/cosmico2.jpg", "/img/cosmico3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "CosmicMage",
        comment: "El artefacto definitivo para magos expertos",
        stars: 5,
        date: "2024-01-03"
      }
    ],
    stock: 3,
    isActive: true,
    sku: "COSMICO-041",
    discount: 0,
    featured: true
  },
  {
    id: 42,
    title: "Hechizo de Localización",
    category: "Magia Avanzada",
    platform: "Luz",
    price: 31.99,
    trailer: "https://www.youtube.com/embed/pyxVNuGAIW0",
    description: "Encuentra personas, objetos o lugares perdidos. Perfecto para búsquedas y rescates.",
    images: ["/img/localizacion1.jpg", "/img/localizacion2.jpg", "/img/localizacion3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Tracker",
        comment: "Encontré el artefacto perdido de mi familia",
        stars: 4,
        date: "2024-02-16"
      }
    ],
    stock: 60,
    isActive: true,
    sku: "LOCALIZACION-042",
    discount: 0,
    featured: false
  },
  {
    id: 43,
    title: "Poción de Velocidad Sobrenatural",
    category: "Pociones Mágicas",
    platform: "Aire",
    price: 41.99,
    trailer: "https://www.youtube.com/embed/NicMELLQVRk",
    description: "Otorga velocidad sobrehumana temporal. Corre más rápido que el viento y esquiva ataques con facilidad.",
    images: ["/img/velocidad1.jpg", "/img/velocidad2.jpg", "/img/velocidad3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Speedster",
        comment: "El mundo se ve en cámara lenta cuando la uso",
        stars: 4,
        date: "2024-03-08"
      }
    ],
    stock: 55,
    isActive: true,
    sku: "VELOCIDAD-043",
    discount: 15,
    featured: true
  },
  {
    id: 44,
    title: "Barrera de Sonido",
    category: "Poderes Elementales",
    platform: "Aire",
    price: 28.99,
    trailer: "https://www.youtube.com/embed/yngKXEBALE0?start=179",
    description: "Crea barreras de sonido puro que bloquean ataques físicos y desorientan a los enemigos.",
    images: ["/img/sonido1.jpg", "/img/sonido2.jpg", "/img/sonido3.jpg"],
    rating: 3,
    reviews: [
      {
        name: "SoundMage",
        comment: "Muy útil contra enemigos que dependen del oído",
        stars: 3,
        date: "2024-01-17"
      }
    ],
    stock: 45,
    isActive: true,
    sku: "SONIDO-044",
    discount: 0,
    featured: false
  },
  {
    id: 45,
    title: "Lazo de Almas Gemelas",
    category: "Magia Avanzada",
    platform: "Luz",
    price: 39.99,
    trailer: "https://www.youtube.com/embed/E7HR_k2_EGk",
    description: "Conecta dos almas permitiendo comunicación mental y sentido de ubicación mutuo.",
    images: ["/img/almas1.jpg", "/img/almas2.jpg", "/img/almas3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "SoulMage",
        comment: "Mi compañero y yo estamos siempre conectados",
        stars: 4,
        date: "2024-02-24"
      }
    ],
    stock: 25,
    isActive: true,
    sku: "ALMAS-045",
    discount: 10,
    featured: false
  },
  {
    id: 46,
    title: "Cristal de Visión Nocturna",
    category: "Artefactos Legendarios",
    platform: "Oscuridad",
    price: 47.99,
    trailer: "https://www.youtube.com/embed/Wu7rGxONBro",
    description: "Permite ver perfectamente en completa oscuridad. Esencial para exploración de mazmorras y cuevas.",
    images: ["/img/noche1.jpg", "/img/noche2.jpg", "/img/noche3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Explorer",
        comment: "Las mazmorras ya no tienen secretos para mí",
        stars: 4,
        date: "2024-03-12"
      }
    ],
    stock: 38,
    isActive: true,
    sku: "NOCHE-046",
    discount: 5,
    featured: true
  },
  {
    id: 47,
    title: "Hechizo de Enraizamiento",
    category: "Magia Natural",
    platform: "Tierra",
    price: 18.99,
    trailer: "https://www.youtube.com/embed/FH7UmSFXjnA",
    description: "Inmoviliza enemigos haciendo que raíces surjan del suelo y los sujeten.",
    images: ["/img/raices1.jpg", "/img/raices2.jpg", "/img/raices3.jpg"],
    rating: 3,
    reviews: [
      {
        name: "NatureMage",
        comment: "Control de multitudes muy efectivo",
        stars: 3,
        date: "2024-01-22"
      }
    ],
    stock: 75,
    isActive: true,
    sku: "RAICES-047",
    discount: 0,
    featured: false
  },
  {
    id: 48,
    title: "Poción de Adaptación Ambiental",
    category: "Pociones Mágicas",
    platform: "Tierra",
    price: 35.99,
    trailer: "https://www.youtube.com/embed/b3q9spcENQo",
    description: "Permite sobrevivir en cualquier ambiente extremo: desiertos, montañas, fondos marinos o incluso el vacío.",
    images: ["/img/adaptacion1.jpg", "/img/adaptacion2.jpg", "/img/adaptacion3.jpg"],
    rating: 4,
    reviews: [
      {
        name: "Explorer",
        comment: "Pude explorar el volcán sin problemas",
        stars: 4,
        date: "2024-02-19"
      }
    ],
    stock: 42,
    isActive: true,
    sku: "ADAPTACION-048",
    discount: 20,
    featured: false
  },
  {
    id: 49,
    title: "Ritual de Armonía Elemental",
    category: "Conjuros Colectivos",
    platform: "Todos",
    price: 0,
    trailer: "https://www.youtube.com/embed/55_WIopMHjs",
    description: "Ritual grupal que balancea todas las energías elementales en un área. Promueve paz y equilibrio natural.",
    images: ["/img/armonia1.jpg", "/img/armonia2.jpg", "/img/armonia3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "BalanceKeeper",
        comment: "Restauramos el equilibrio del bosque encantado",
        stars: 5,
        date: "2024-03-28"
      }
    ],
    stock: 999,
    isActive: true,
    sku: "ARMONIA-049",
    discount: 0,
    featured: true
  },
  {
    id: 50,
    title: "Orbe de Puro Vacío",
    category: "Magia Avanzada",
    platform: "Oscuridad",
    price: 29.99,
    trailer: "https://www.youtube.com/embed/d8ATK5ATmCg",
    description: "Crea esferas de pura nada que disuelven todo lo que tocan. Poder extremadamente peligroso y difícil de controlar.",
    images: ["/img/vacio1.jpg", "/img/vacio2.jpg", "/img/vacio3.jpg"],
    rating: 5,
    reviews: [
      {
        name: "VoidMage",
        comment: "El poder definitivo, requiere responsabilidad absoluta",
        stars: 5,
        date: "2024-01-10"
      }
    ],
    stock: 7,
    isActive: true,
    sku: "VACIO-050",
    discount: 0,
    featured: true
  },
];