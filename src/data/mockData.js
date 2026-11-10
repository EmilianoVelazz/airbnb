export const DATE_PRESETS = [
  {
    id: 'preset-weekend',
    label: 'Fin de Semana en Zacatlán',
    checkIn: 'Vie 13 Nov',
    checkOut: 'Dom 15 Nov',
    nights: 2,
    tag: 'Feria & Neblina'
  },
  {
    id: 'preset-long',
    label: 'Puente Sierra Norte Puebla',
    checkIn: 'Vie 20 Nov',
    checkOut: 'Lun 23 Nov',
    nights: 3,
    tag: 'Ideal Combo 3x'
  },
  {
    id: 'preset-midweek',
    label: 'Escapada Entre Manzanos',
    checkIn: 'Mar 17 Nov',
    checkOut: 'Jue 19 Nov',
    nights: 2,
    tag: '-15% con BOSQUE15'
  },
  {
    id: 'preset-week',
    label: 'Semana Nómada Starlink',
    checkIn: 'Lun 23 Nov',
    checkOut: 'Sab 28 Nov',
    nights: 5,
    tag: 'Home Office Cabaña'
  }
];

export const HERO_SCENES = [
  {
    id: 'scene-cabins',
    badge: 'HOTEL GUERRERO · ZACATLÁN DE LAS MANZANAS, PUEBLA',
    category: '01 · Cabañas en la Neblina',
    title: 'Despierta sobre el mar de nubes en Zacatlán.',
    subtitle:
      'En Hotel Guerrero fusionamos cabañas de autor frente a la Barranca de los Jilgueros con tinas calientes a leña, sidra artesanal de bienvenida y senderos privados en la Sierra Norte de Puebla.',
    image: '/renders/hero-cabin.jpg',
    stats: [
      { label: 'Ubicación', value: 'Zacatlán, Puebla' },
      { label: 'Clima Actual', value: '12°C · Neblina de Sierra' },
      { label: 'Amenidad Cortesía', value: 'Sidra & Pan de Queso' }
    ],
    hotspots: [
      {
        id: 'hs-1',
        x: 42,
        y: 44,
        title: 'Vista a la Barranca de los Jilgueros',
        detail: 'Cristal panorámico de doble acristalamiento frente al ascenso matutino del mar de nubes de Zacatlán.',
        tag: 'Mirador Privado'
      },
      {
        id: 'hs-2',
        x: 68,
        y: 72,
        title: 'Tina Hidromasaje de Cedro Rojo (39°C)',
        detail: 'Calentada con leña de encino poblano e incluye botella de sidra rosada de Zacatlán.',
        tag: 'Hotel Guerrero'
      },
      {
        id: 'hs-3',
        x: 28,
        y: 65,
        title: 'Chimenea Central con Leña de Ocote',
        detail: 'Encendida antes de tu llegada junto con una canasta de pan tradicional relleno de queso.',
        tag: 'Tradición Poblana'
      }
    ]
  },
  {
    id: 'scene-temazcal',
    badge: 'SANTUARIO HOTEL GUERRERO · SIERRA NORTE DE PUEBLA',
    category: '02 · Temazcal Tradicional',
    title: 'Vapor herbal, copal blanco y abuelas de fuego.',
    subtitle:
      'Domos de piedra volcánica en los bosques de Zacatlán guiados por temazcaleros de la Sierra Norte. Purificación en 4 puertas con infusión de manzana silvestre, pirul y romero.',
    image: '/renders/temazcal-ritual.jpg',
    stats: [
      { label: 'Piedras de Volcán', value: '28 Abuelas al Rojo' },
      { label: 'Temperatura Vapor', value: '39°C – 51°C' },
      { label: 'Herbolaria Sierra Norte', value: 'Pirul, Copal y Manzana' }
    ],
    hotspots: [
      {
        id: 'hs-t1',
        x: 48,
        y: 52,
        title: 'Domo Térmico de Basalto Poblano',
        detail: 'Geometría tradicional de la Sierra Norte que conserva el calor infrarrojo natural.',
        tag: 'Temazcal Guerrero'
      },
      {
        id: 'hs-t2',
        x: 52,
        y: 78,
        title: 'Xictli · Ombligo de Piedras Volcánicas',
        detail: 'Rocas calentadas durante 4 horas en fuego de encino antes de verter té medicinal de monte.',
        tag: 'Fuego Sagrado'
      },
      {
        id: 'hs-t3',
        x: 24,
        y: 62,
        title: 'Poza Fría de Manantial & Té de Manzana',
        detail: 'Contraste térmico revitalizante al salir de la cuarta puerta con infusión caliente de manzana y canela.',
        tag: 'Hidroterapia'
      }
    ]
  },
  {
    id: 'scene-motos',
    badge: 'RUTAS ZACATLÁN · PIEDRAS ENCIMADAS & TULIMÁN',
    category: '03 · Renta de Motos & ATV',
    title: 'Recorre Piedras Encimadas y Cascada Tulimán en moto.',
    subtitle:
      'Renta de Cuatrimotos 4x4 Grizzly, Scramblers 450cc y E-Motos silenciosas en Hotel Guerrero. Te las entregamos en tu cabaña para rodar hacia el Valle de Piedras Encimadas y Quetzalapan.',
    image: '/renders/moto-trail.jpg',
    stats: [
      { label: 'Rutas en Zacatlán', value: 'Piedras Encimadas · Tulimán' },
      { label: 'Flota Hotel Guerrero', value: 'ATV 4x4 · Enduro · E-Moto' },
      { label: 'Entrega Directa', value: 'En tu Cabaña en 15 min' }
    ],
    hotspots: [
      {
        id: 'hs-m1',
        x: 36,
        y: 58,
        title: 'Scrambler Trail 450cc Edición Sierra Norte',
        detail: 'Suspensión de largo recorrido ideal para el camino forestal hacia Cascadas de Tulimán.',
        tag: '2 Ruedas'
      },
      {
        id: 'hs-m2',
        x: 66,
        y: 64,
        title: 'Cuatrimoto 4x4 Grizzly 700 EPS',
        detail: 'Perfecta para cruzar los senderos de niebla del Valle de Piedras Encimadas en pareja.',
        tag: 'Todo Terreno'
      },
      {
        id: 'hs-m3',
        x: 55,
        y: 34,
        title: 'Mirador Cañón de los Jilgueros (2,380 msnm)',
        detail: 'Punto panorámico incluido en el GPS Garmin de todas las motos de Hotel Guerrero.',
        tag: 'Ruta GPS Zacatlán'
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todas las Cabañas', count: 6 },
  { id: 'a-frame', label: 'A-Frame & Domos', count: 2 },
  { id: 'treehouse', label: 'Huertos de Manzana', count: 1 },
  { id: 'cliff', label: 'Barranca Jilgueros', count: 1 },
  { id: 'river', label: 'Cascada Tulimán & Río', count: 2 },
  { id: 'temazcal-privado', label: 'Con Temazcal Privado', count: 4 },
  { id: 'acceso-moto', label: 'Ruta Piedras Encimadas', count: 5 }
];

export const ZONES = [
  'Todas las Zonas',
  'Barranca de los Jilgueros · Mirador',
  'Valle de Piedras Encimadas',
  'Parque Eco-Turístico Tulimán',
  'Cascada de San Pedro & Tomatlán'
];

export const CABINS = [
  {
    id: 'cab-1',
    name: 'Suite Guerrero · A-Frame Barranca de los Jilgueros',
    zone: 'Barranca de los Jilgueros · Mirador',
    category: ['a-frame', 'temazcal-privado', 'acceso-moto'],
    altitude: '2,340 msnm',
    altitudeNum: 2340,
    pricePerNight: 4850,
    rating: 4.99,
    reviewsCount: 168,
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2.5,
    architect: 'Hotel Guerrero Arquitectura · Zacatlán',
    area: '145 m² + Deck a la Barranca',
    badge: 'Insignia Hotel Guerrero',
    hasPrivateTemazcal: true,
    hasMotoTrailAccess: true,
    hasHotTub: true,
    petFriendly: true,
    wifiSpeed: '185 Mbps Starlink',
    checkInTime: '15:00 hrs (Con sidra y pan de queso)',
    host: {
      name: 'Familia Guerrero',
      role: 'Anfitriones Fundadores en Zacatlán · 12 años de tradición',
      responseTime: 'Responde en menos de 5 min'
    },
    sleepingLayout: [
      { room: 'Tapanco Panorámico Jilgueros', beds: '1 Cama King Size con vista al mar de nubes' },
      { room: 'Suite Planta Baja', beds: '1 Cama Queen Size + Salida directa a la tina de cedro' }
    ],
    mapCoords: { x: 34, y: 38 },
    images: [
      '/renders/hero-cabin.jpg',
      '/renders/temazcal-ritual.jpg',
      '/renders/cabin-nomada.jpg',
      '/renders/cabin-piedra.jpg',
      '/renders/moto-trail.jpg'
    ],
    shortDesc: 'Nuestra cabaña insignia en Hotel Guerrero frente a la Barranca de los Jilgueros, con tina a leña, sidra artesanal y temazcal privado.',
    description:
      'Ubicada a 5 minutos del Reloj Floral y suspendida frente a la neblina de la Barranca de los Jilgueros en Zacatlán, Puebla. Incluye botella de sidra artesanal local, canasta de pan relleno de queso recién horneado y acceso privado al temazcal.',
    amenities: [
      'Tina de cedro a leña (39°C) frente a la barranca',
      'Canasta de Pan de Queso y Sidra de Zacatlán incluida',
      'Temazcal volcánico privado a 60 metros',
      'Salida en Cuatrimoto hacia Piedras Encimadas',
      'Starlink High-Speed (185 Mbps)',
      'Café de olla de la Sierra Norte de Puebla',
      'Calefacción radiante y chimenea de encino'
    ],
    specs: {
      tempInterior: '22°C constante',
      orientation: 'Mirador Barranca de los Jilgueros',
      woodType: 'Cedro Rojo Carbonizado & Pino Poblano'
    },
    reviews: [
      {
        author: 'Rodrigo V.',
        date: 'Octubre 2026',
        tripType: 'Cabaña + Temazcal + Ruta Piedras Encimadas',
        text: 'El servicio de Hotel Guerrero es increíble. Llegamos con neblina cerrada en Zacatlán, la chimenea encendida, pan de queso calentito y la tina a 39°C.'
      },
      {
        author: 'Camila S.',
        date: 'Septiembre 2026',
        tripType: 'Escapada en Pareja a Zacatlán',
        text: 'Ver cómo sube la niebla desde la Barranca de los Jilgueros mientras estás en el jacuzzi y luego pasar al temazcal fue inolvidable.'
      }
    ]
  },
  {
    id: 'cab-2',
    name: 'Loft Mirador de Cristal · Cañón de la Niebla',
    zone: 'Barranca de los Jilgueros · Mirador',
    category: ['cliff', 'acceso-moto'],
    altitude: '2,390 msnm',
    altitudeNum: 2390,
    pricePerNight: 5400,
    rating: 4.99,
    reviewsCount: 112,
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1.5,
    architect: 'Hotel Guerrero · Diseño Contemporáneo',
    area: '118 m² en voladizo sobre el cañón',
    badge: 'Inspirada en el Mirador de Cristal',
    hasPrivateTemazcal: false,
    hasMotoTrailAccess: true,
    hasHotTub: true,
    petFriendly: false,
    wifiSpeed: '210 Mbps Starlink',
    checkInTime: '15:00 hrs (Bienvenida con licor de manzana)',
    host: {
      name: 'Concierge Hotel Guerrero',
      role: 'Especialistas en Rutas Sierra Norte',
      responseTime: 'Responde en 4 min'
    },
    sleepingLayout: [
      { room: 'Loft Suspendido sobre los Jilgueros', beds: '1 Cama King Size con vista 270° al cañón de niebla' }
    ],
    mapCoords: { x: 64, y: 26 },
    images: [
      '/renders/cabin-nomada.jpg',
      '/renders/moto-trail.jpg',
      '/renders/hero-cabin.jpg',
      '/renders/cabin-domo.jpg',
      '/renders/moto-emoto.jpg'
    ],
    shortDesc: 'Loft en voladizo inspirado en el famoso Mirador de Cristal de Zacatlán, flotando literalmente sobre el mar de nubes.',
    description:
      'Inspirada en la tradición de los miradores de Zacatlán de las Manzanas, esta estructura en voladizo se asoma 45 metros sobre la barranca, permitiéndote caminar y descansar sobre el manto de niebla poblana.',
    amenities: [
      'Terraza en voladizo con piso mirador y red',
      'Fogatero hundido con vista a la Sierra Norte',
      'Entrega directa de Scramblers para ir a Quetzalapan',
      'Telescopio para noches despejadas',
      'Degustación de licores de manzana, mora y acachul',
      'Sonido Sonos Era 300 Atmos'
    ],
    specs: {
      tempInterior: '21.5°C constante',
      orientation: 'Amanecer sobre Barranca de los Jilgueros',
      woodType: 'Concreto Entintado & Parota'
    },
    reviews: [
      {
        author: 'Patricio M.',
        date: 'Octubre 2026',
        tripType: 'Cabaña + Scrambler a Tulimán',
        text: 'Tener tu propio mirador privado sin gente alrededor y salir en moto hacia el Salto de Quetzalapan hizo que Hotel Guerrero fuera un 10 de 10.'
      }
    ]
  },
  {
    id: 'cab-3',
    name: 'Nido del Manzanal · Casa en el Árbol Tomatlán',
    zone: 'Cascada de San Pedro & Tomatlán',
    category: ['treehouse', 'temazcal-privado'],
    altitude: '2,280 msnm',
    altitudeNum: 2280,
    pricePerNight: 4200,
    rating: 4.97,
    reviewsCount: 215,
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    architect: 'Bosque Vivo · Hotel Guerrero',
    area: '110 m² a 9m entre oyameles y manzanos',
    badge: 'Entre Huertos de Manzana',
    hasPrivateTemazcal: true,
    hasMotoTrailAccess: false,
    hasHotTub: true,
    petFriendly: true,
    wifiSpeed: '160 Mbps Starlink',
    checkInTime: '14:30 hrs (Puente colgante iluminado)',
    host: {
      name: 'Sofía Guerrero & Maestro Tonal',
      role: 'Anfitriones y Guías de Temazcal en Zacatlán',
      responseTime: 'Responde en 8 min'
    },
    sleepingLayout: [
      { room: 'Cúpula del Dosel', beds: '1 Cama King Size rodeada de pinos y manzanos' },
      { room: 'Alcoba del Puente Colgante', beds: '1 Cama Matrimonial con tragaluz al bosque' }
    ],
    mapCoords: { x: 24, y: 66 },
    images: [
      '/renders/cabin-bosque.jpg',
      '/renders/temazcal-ritual.jpg',
      '/renders/cabin-piedra.jpg',
      '/renders/hero-cabin.jpg',
      '/renders/cabin-laguna.jpg'
    ],
    shortDesc: 'Elevada entre oyameles y huertos de manzana cerca de la Cascada de San Pedro, con puente iluminado y temazcal privado.',
    description:
      'Rodeada de los tradicionales huertos de manzana de Zacatlán y a minutos de la Cascada de San Pedro Atmatla. Sube tu desayuno poblano en canasta por polea cada mañana y disfruta del temazcal de barro en la base del árbol.',
    amenities: [
      'Puente colgante privado de 28 metros con luces cálidas',
      'Temazcal tradicional privado al pie del árbol',
      'Jacuzzi caliente exterior entre las ramas',
      'Desayuno con pan de Zacatlán subido por polea',
      'Recolección de manzanas y moras en temporada',
      'Pet-friendly con jardín cercado'
    ],
    specs: {
      tempInterior: '23°C cálido',
      orientation: '360° Huertos y Bosque de Niebla',
      woodType: 'Pino de la Sierra & Tejamanil Artesanal'
    },
    reviews: [
      {
        author: 'Fernanda L.',
        date: 'Noviembre 2026',
        tripType: 'Aniversario + Temazcal de Manzana y Canela',
        text: 'Subir la canasta con café de olla y pan recién horneado de Zacatlán por la polea mientras todo el bosque tiene neblina es un sueño.'
      }
    ]
  },
  {
    id: 'cab-4',
    name: 'Chalet Tulimán · Río y Cascada de 300m',
    zone: 'Parque Eco-Turístico Tulimán',
    category: ['river', 'temazcal-privado', 'acceso-moto'],
    altitude: '2,190 msnm',
    altitudeNum: 2190,
    pricePerNight: 5150,
    rating: 4.98,
    reviewsCount: 164,
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 3,
    architect: 'Hotel Guerrero · Estudio Basal',
    area: '210 m² junto al río de montaña',
    badge: 'Especial Familias & Cuatrimotos',
    hasPrivateTemazcal: true,
    hasMotoTrailAccess: true,
    hasHotTub: true,
    petFriendly: true,
    wifiSpeed: '190 Mbps Starlink',
    checkInTime: '15:00 hrs (Estacionamiento privado 4x4)',
    host: {
      name: 'Familia Guerrero',
      role: 'Anfitriones en Zona Tulimán',
      responseTime: 'Responde en 5 min'
    },
    sleepingLayout: [
      { room: 'Master Suite del Río Quetzalapan', beds: '1 Cama King Size + Chimenea de piedra braza' },
      { room: 'Habitación de los Pinos', beds: '1 Cama Queen Size + Terraza al arroyo' },
      { room: 'Habitación Familiar Guerrero', beds: '2 Camas Matrimoniales en madera maciza' }
    ],
    mapCoords: { x: 52, y: 74 },
    images: [
      '/renders/cabin-piedra.jpg',
      '/renders/moto-cuatrimoto.jpg',
      '/renders/temazcal-ritual.jpg',
      '/renders/moto-trail.jpg',
      '/renders/hero-cabin.jpg'
    ],
    shortDesc: 'Cabaña de piedra y cristal junto al arroyo en la ruta hacia Cascadas de Tulimán, con fogatero y base de cuatrimotos.',
    description:
      'Ubicada en el corredor ecológico hacia el Parque Tulimán en Zacatlán. Diseñada para familias o grupos de amigos que buscan combinar el sonido del río con carnita asada, temazcal grupal y ruta en cuatrimotos hasta la poza mineral.',
    amenities: [
      'Orilla privada de río cristalino de montaña',
      'Fogatero circular de piedra con bombones y sidra',
      'Garage con 4 Cuatrimotos listas para ir a Tulimán',
      'Asador a leña y horno de barro para tlacoyos',
      'Temazcal familiar privado hasta para 8 personas',
      '3 habitaciones con chimenea independiente'
    ],
    specs: {
      tempInterior: '22°C constante',
      orientation: 'Cañada de Tulimán, Zacatlán',
      woodType: 'Piedra de Río Poblana & Encino'
    },
    reviews: [
      {
        author: 'Alejandro G.',
        date: 'Octubre 2026',
        tripType: 'Familia 6 personas + Cuatrimotos Tulimán',
        text: 'Salimos desde la cabaña en cuatrimotos directo a las Cascadas de Tulimán y al volver ya nos tenían listo el temazcal y el fogatero.'
      }
    ]
  },
  {
    id: 'cab-5',
    name: 'Domo Piedras Encimadas · Geodésico de Cobre',
    zone: 'Valle de Piedras Encimadas',
    category: ['a-frame', 'temazcal-privado', 'acceso-moto'],
    altitude: '2,460 msnm',
    altitudeNum: 2460,
    pricePerNight: 3950,
    rating: 4.96,
    reviewsCount: 138,
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    architect: 'Hotel Guerrero · Biosfera Lab',
    area: '88 m² frente al valle monolítico',
    badge: 'Valle de Piedras Encimadas',
    hasPrivateTemazcal: true,
    hasMotoTrailAccess: true,
    hasHotTub: true,
    petFriendly: true,
    wifiSpeed: '175 Mbps Starlink',
    checkInTime: '15:00 hrs (Acceso directo al Valle)',
    host: {
      name: 'Valeria Guerrero',
      role: 'Anfitriona en Camotepec · Piedras Encimadas',
      responseTime: 'Responde en 7 min'
    },
    sleepingLayout: [
      { room: 'Domo Cenital frente a los Monolitos', beds: '1 Cama King Size bajo cúpula transparente y chimenea' }
    ],
    mapCoords: { x: 76, y: 48 },
    images: [
      '/renders/cabin-domo.jpg',
      '/renders/hero-cabin.jpg',
      '/renders/temazcal-ritual.jpg',
      '/renders/moto-emoto.jpg',
      '/renders/cabin-nomada.jpg'
    ],
    shortDesc: 'Domo geodésico de lujo junto al místico Valle de Piedras Encimadas en Zacatlán, con tina caliente y ruta de motos.',
    description:
      'Ubicado a un costado del famoso Valle de Piedras Encimadas en Zacatlán, Puebla, donde gigantescas formaciones rocosas de 65 millones de años emergen entre la neblina y los pinos.',
    amenities: [
      'Vista a los monolitos de Piedras Encimadas',
      'Tina exterior caliente a leña en terraza privada',
      'Salida directa en Cuatrimoto o E-Moto por el valle',
      'Temazcal místico de piedra volcánica',
      'Degustación de vinos de frutas y sidra de Zacatlán'
    ],
    specs: {
      tempInterior: '22.5°C bioclimático',
      orientation: 'Valle de Piedras Encimadas, Zacatlán',
      woodType: 'Cobre Martillado & Cedro Blanco'
    },
    reviews: [
      {
        author: 'Mariana D.',
        date: 'Octubre 2026',
        tripType: 'Pareja + Ruta Cuatrimoto Piedras Encimadas',
        text: 'Recorrer Piedras Encimadas al amanecer con neblina en las motos de Hotel Guerrero y regresar a la tina caliente del domo no tiene precio.'
      }
    ]
  },
  {
    id: 'cab-6',
    name: 'Pabellón Laguna de Niebla · Reserva Guerrero',
    zone: 'Valle de Piedras Encimadas',
    category: ['river', 'acceso-moto'],
    altitude: '2,410 msnm',
    altitudeNum: 2410,
    pricePerNight: 6200,
    rating: 5.0,
    reviewsCount: 94,
    guests: 6,
    bedrooms: 3,
    beds: 3,
    baths: 3.5,
    architect: 'Hotel Guerrero · Edición Presidencial',
    area: '240 m² sobre espejo de agua en Zacatlán',
    badge: 'Suite Presidencial Guerrero',
    hasPrivateTemazcal: false,
    hasMotoTrailAccess: true,
    hasHotTub: true,
    petFriendly: true,
    wifiSpeed: '220 Mbps Starlink Pro',
    checkInTime: '14:00 hrs (Concierge privado en muelle)',
    host: {
      name: 'Familia Guerrero',
      role: 'Hospitalidad Boutique en Zacatlán, Puebla',
      responseTime: 'Responde en menos de 5 min'
    },
    sleepingLayout: [
      { room: 'Suite Espejo de Niebla', beds: '1 Cama King Size a nivel de la laguna' },
      { room: 'Suite de los Oyameles', beds: '1 Cama King Size con tina monolítica' },
      { room: 'Estudio del Muelle', beds: '1 Cama Queen Size con terraza privada' }
    ],
    mapCoords: { x: 42, y: 54 },
    images: [
      '/renders/cabin-laguna.jpg',
      '/renders/cabin-piedra.jpg',
      '/renders/hero-cabin.jpg',
      '/renders/moto-emoto.jpg',
      '/renders/temazcal-ritual.jpg'
    ],
    shortDesc: 'La residencia más exclusiva de Hotel Guerrero en Zacatlán: madera negra sobre una laguna privada de niebla con muelle y motos.',
    description:
      'Nuestra joya arquitectónica en los bosques altos de Zacatlán. Cuando la bruma matutina cubre el espejo de agua, ofrece privacidad absoluta con sauna frente al lago, muelle con canoa y motos listas en garage.',
    amenities: [
      'Muelle privado con canoa de madera y fogatero sobre el agua',
      'Sauna panorámico y jacuzzi caliente a leña',
      'Garage privado con 2 Motos eléctricas Sur-Ron incluidas',
      'Cena opcional de trucha salmonada y tlacoyos de alberjón',
      'Cava de sidras artesanales y licores de Zacatlán'
    ],
    specs: {
      tempInterior: '22°C constante',
      orientation: 'Laguna Alta · Zacatlán, Puebla',
      woodType: 'Fresno Termotratado Negro & Basalto Poblano'
    },
    reviews: [
      {
        author: 'Santiago H.',
        date: 'Noviembre 2026',
        tripType: 'Estancia Familiar de Lujo en Zacatlán',
        text: 'Es el secreto mejor guardado de Zacatlán de las Manzanas. La atención de Hotel Guerrero y la paz de la laguna con neblina son únicas.'
      }
    ]
  }
];

export const TEMAZCAL_INTENTIONS = [
  {
    id: 'int-recovery',
    label: 'Recuperación tras Ruta Piedras Encimadas / Tulimán',
    herbs: 'Árnica de la Sierra Norte, Romero, Eucalipto y Ocote',
    recommendedTemp: '48°C Vapor Intenso',
    desc: 'Ideal después de rodar en cuatrimoto por Zacatlán: desinflama músculos y calienta el cuerpo del frío de la neblina.'
  },
  {
    id: 'int-sleep',
    label: 'Infusión de Manzana de Zacatlán, Canela y Lavanda',
    herbs: 'Manzana Silvestre de Zacatlán, Canela, Tila y Copal Blanco',
    recommendedTemp: '42°C Vapor Aromático Suave',
    desc: 'Receta exclusiva de Hotel Guerrero con aroma cálido de manzana y flores de monte para dormir profundamente.'
  },
  {
    id: 'int-detox',
    label: 'Purificación Tradicional Sierra Norte (4 Puertas)',
    herbs: 'Pirul Fresco, Salvia Real, Ruda y Miel de Monte Poblana',
    recommendedTemp: '51°C Ceremonia Completa',
    desc: 'Ceremonia tradicional guiada con cantos, rameo herbal y contraste en agua fría de manantial.'
  }
];

export const TEMAZCAL_DOORS = [
  {
    door: 1,
    name: 'Primera Puerta · Tlalticpac (Tierra de la Sierra)',
    element: 'Elemento Tierra · Arraigo en Zacatlán',
    temp: 39,
    duration: '20 min',
    stoneCount: '7 Abuelas Volcánicas',
    herbs: 'Copal Blanco de la Sierra Norte, Salvia y Cedro',
    frequency: 'Tambor de Agua · 432 Hz',
    description:
      'Ingresamos al domo de piedra volcánica de Hotel Guerrero. Las primeras 7 piedras incandescentes entran al Xictli sahumadas con resina de copal blanco para quitar el frío de la neblina de Zacatlán y abrir los poros.',
    benefits: ['Calor profundo contra el clima frío de montaña', 'Apertura respiratoria inicial', 'Calma del sistema nervioso']
  },
  {
    door: 2,
    name: 'Segunda Puerta · Atl (Agua de Manantial)',
    element: 'Elemento Agua · Vapor de Manzana y Hierbas',
    temp: 45,
    duration: '25 min',
    stoneCount: '14 Abuelas Volcánicas',
    herbs: 'Romero, Pirul, Eucalipto e Infusión de Manzana de Zacatlán',
    frequency: 'Cantos Tradicionales & Sonaja de Guaje',
    description:
      'Se vierte infusión caliente de hierbas de monte y manzana criolla de Zacatlán sobre las rocas al rojo vivo. El vapor aromático envuelve el domo mientras se realiza el rameo tradicional con hojas frescas.',
    benefits: ['Eliminación de toxinas dérmicas', 'Rameo herbal circulatorio', 'Aromaterapia natural poblana']
  },
  {
    door: 3,
    name: 'Tercera Puerta · Tletl (Fuego Interior)',
    element: 'Elemento Fuego · Voluntad y Claridad',
    temp: 51,
    duration: '25 min',
    stoneCount: '21 Abuelas Volcánicas',
    herbs: 'Lavanda de Montaña, Pericón y Miel Virgen de la Sierra',
    frequency: 'Flauta de Barro & Silencio Meditativo',
    description:
      'El punto culminante térmico del ritual en Hotel Guerrero. Con 21 piedras volcánicas irradiando calor infrarrojo profundo, aplicamos mascarilla de barro mineral y miel de la Sierra Norte.',
    benefits: ['Liberación profunda de endorfinas', 'Fortalecimiento inmunológico', 'Exfoliación con barro y miel poblana']
  },
  {
    door: 4,
    name: 'Cuarta Puerta · Ehecatl (Renacimiento en la Niebla)',
    element: 'Elemento Aire · Ponche de Manzana y Pan de Queso',
    temp: 28,
    duration: '20 min',
    stoneCount: '28 Abuelas Completas',
    herbs: 'Té Caliente de Manzana con Canela, Guayaba y Tila',
    frequency: 'Cuencos de Cuarzo & Brisa de los Jilgueros',
    description:
      'Se abre la puerta del temazcal hacia la neblina fresca de Zacatlán. Salimos envueltos en batas térmicas para degustar té caliente de manzana con canela, fruta de los huertos y pan tradicional.',
    benefits: ['Choque térmico revitalizante', 'Piel renovada y luminosa', 'Degustación tradicional de Zacatlán incluida']
  }
];

export const TEMAZCAL_PACKAGES = [
  {
    id: 'tem-1',
    title: 'Temazcal Romántico Hotel Guerrero · Manzana & Copal',
    subtitle: 'Domo exclusivo para 2 personas en Zacatlán con sidra y pan de queso al salir',
    duration: '1h 45m',
    price: 1850,
    perPerson: false,
    unitLabel: 'por pareja (2 pax)',
    rating: 4.99,
    badge: 'Favorito en Zacatlán',
    schedule: ['08:30 AM · Neblina', '05:30 PM · Atardecer', '08:00 PM · Nocturno'],
    includes: [
      '28 piedras volcánicas calentadas en leña de encino poblano',
      'Infusión de vapor con hierbas de monte y manzana de Zacatlán',
      'Exfoliación con barro mineral y miel de la Sierra Norte',
      'Batas térmicas, ponche caliente de manzana y pan relleno de queso'
    ]
  },
  {
    id: 'tem-2',
    title: 'Ritual Sierra Norte & Sonoterapia de Cuencos',
    subtitle: 'Temazcal de 4 puertas + concierto de cuencos y cacao frente a la barranca',
    duration: '2h 30m',
    price: 1150,
    perPerson: true,
    unitLabel: 'por persona',
    rating: 4.98,
    badge: 'Experiencia Sensorial',
    schedule: ['06:00 PM · Crepúsculo', '08:30 PM · Estelar'],
    includes: [
      'Temazcalero tradicional de Zacatlán + terapeuta de sonido',
      'Cacao caliente antes de ingresar al domo volcánico',
      'Acceso a poza fría de manantial y tina caliente de cedro',
      'Traslado desde tu cabaña en Hotel Guerrero ida y vuelta'
    ]
  },
  {
    id: 'tem-3',
    title: 'Temazcal Privado Familiar / Amigos en Hotel Guerrero',
    subtitle: 'Domo completo hasta para 6 personas a tu propio ritmo y temperatura',
    duration: '2h 15m',
    price: 3200,
    perPerson: false,
    unitLabel: 'grupo privado (hasta 6 pax)',
    rating: 4.98,
    badge: 'Ideal Grupos',
    schedule: ['10:30 AM · Mañana', '04:30 PM · Tarde', '07:30 PM · Noche'],
    includes: [
      'Control personalizado de intensidad de vapor (suave a intenso)',
      'Tina de hidromasaje exterior reservada en exclusiva',
      'Degustación de sidras de Zacatlán, pan de queso y tlacoyos',
      'Fotografía recuerdo instantánea para el grupo'
    ]
  }
];

export const MOTO_FLEET = [
  {
    id: 'moto-1',
    name: 'Scrambler Enduro 450cc "Edición Zacatlán"',
    type: '2 Ruedas · Enduro Sierra Norte',
    cc: '449 cc · 4 Tiempos Inyección',
    capacity: '1 - 2 pasajeros',
    licenseReq: 'Manejo con clutch · Ideal ruta a Cascadas Tulimán',
    priceHalfDay: 1650,
    priceFullDay: 2600,
    badge: 'Ruta Tulimán & Quetzalapan',
    image: '/renders/moto-trail.jpg',
    deliveryAvailable: true,
    specs: {
      torque: 92,
      terrain: 95,
      comfort: 82,
      stealth: 65
    },
    features: [
      'Suspensión invertida KYB para caminos empedrados de la Sierra',
      'Llantas Pirelli Scorpion Rally para terracería húmeda y neblina',
      'GPS Garmin con rutas a Piedras Encimadas, Tulimán y San Pedro',
      'Incluye 2 cascos Bell Moto-9, goggles, guantes e impermeable'
    ]
  },
  {
    id: 'moto-2',
    name: 'Cuatrimoto Yamaha Grizzly 700 4x4 "Piedras Encimadas"',
    type: '4 Ruedas · Todo Terreno ATV',
    cc: '686 cc · Tracción 4WD On-Command',
    capacity: '2 pasajeros cómodos',
    licenseReq: 'Automática · La más pedida en Zacatlán',
    priceHalfDay: 1850,
    priceFullDay: 2950,
    badge: 'Favorita en Zacatlán',
    image: '/renders/moto-cuatrimoto.jpg',
    deliveryAvailable: true,
    specs: {
      torque: 96,
      terrain: 98,
      comfort: 94,
      stealth: 70
    },
    features: [
      'Dirección asistida electrónica (EPS) súper suave y automática',
      'Tracción 4x4 para recorrer el Valle de Piedras Encimadas y arroyos',
      'Maletero trasero con café de olla caliente y pan de Zacatlán',
      'Te la entregamos directo en la puerta de tu cabaña en Hotel Guerrero'
    ]
  },
  {
    id: 'moto-3',
    name: 'Sur-Ron Ultra Bee · E-Moto Silenciosa de Huertos',
    type: '2 Ruedas · 100% Eléctrica Stealth',
    cc: '12.5 kW · 440 Nm Torque Instantáneo',
    capacity: '1 piloto',
    licenseReq: 'Automática sin embrague · Cero ruido en la barranca',
    priceHalfDay: 1550,
    priceFullDay: 2400,
    badge: 'Ruta Huertos de Manzana',
    image: '/renders/moto-emoto.jpg',
    deliveryAvailable: true,
    specs: {
      torque: 94,
      terrain: 90,
      comfort: 88,
      stealth: 100
    },
    features: [
      'Silencio total: escucha los jilgueros y las cascadas mientras ruedas',
      'Autonomía de 115 km por los huertos de manzana de Tomatlán y Ayehualulco',
      'Peso ultraligero (85 kg) muy fácil de maniobrar',
      'Cargador rápido incluido en todas las cabañas de Hotel Guerrero'
    ]
  }
];

export const TRAIL_ROUTES = [
  {
    id: 'trail-1',
    name: 'Ruta 01 · Valle de Piedras Encimadas & Bosque de Niebla',
    difficulty: 'Intermedia · Icónica de Zacatlán',
    distance: '22.0 km',
    duration: '2h 45m',
    maxAltitude: '2,460 msnm',
    terrain: '60% Sendero forestal de pino · 25% Pradera de monolitos · 15% Empedrado serrano',
    elevationProfile: [2120, 2210, 2340, 2290, 2380, 2460, 2410, 2310, 2240],
    checkpoints: [
      { km: '0.0 km', name: 'Salida desde tu Cabaña en Hotel Guerrero', alt: '2,120m' },
      { km: '6.2 km', name: 'Mirador Barranca de los Jilgueros', alt: '2,340m' },
      { km: '14.5 km', name: 'Valle de Piedras Encimadas (Monolitos)', alt: '2,460m' },
      { km: '22.0 km', name: 'Regreso con Degustación de Sidra y Pan', alt: '2,240m' }
    ]
  },
  {
    id: 'trail-2',
    name: 'Ruta 02 · Cascadas de Tulimán & Salto de Quetzalapan',
    difficulty: 'Avanzada · Aventura de Agua y Cañón',
    distance: '28.5 km',
    duration: '3h 30m',
    maxAltitude: '2,390 msnm',
    terrain: '50% Brecha hacia Tulimán · 30% Cruce de arroyo · 20% Bosque denso de oyamel',
    elevationProfile: [2240, 2310, 2390, 2250, 2140, 1980, 2110, 2220, 2240],
    checkpoints: [
      { km: '0.0 km', name: 'Basecamp Hotel Guerrero Zacatlán', alt: '2,240m' },
      { km: '8.4 km', name: 'Cumbre de Niebla Sierra Norte', alt: '2,390m' },
      { km: '16.0 km', name: 'Parque Tulimán (Cascada de 300m y Poza Mineral)', alt: '1,980m' },
      { km: '28.5 km', name: 'Llegada directo al Temazcal Hotel Guerrero', alt: '2,240m' }
    ]
  },
  {
    id: 'trail-3',
    name: 'Ruta 03 · Huertos de Manzana, Cascada San Pedro & Reloj Floral',
    difficulty: 'Suave · Panorámica y Gastronómica',
    distance: '15.0 km',
    duration: '2h 00m',
    maxAltitude: '2,310 msnm',
    terrain: '75% Caminos entre huertos de manzana · 25% Sendero a Cascada de San Pedro',
    elevationProfile: [2150, 2200, 2260, 2310, 2280, 2210, 2180, 2160, 2150],
    checkpoints: [
      { km: '0.0 km', name: 'Salida Hotel Guerrero', alt: '2,150m' },
      { km: '4.2 km', name: 'Cascada de San Pedro Atmatla y Ruinas', alt: '2,260m' },
      { km: '9.5 km', name: 'Huertos de Manzana y Mora Azul (Tomatlán)', alt: '2,310m' },
      { km: '15.0 km', name: 'Mirador Vitromurales y Regreso a Cabaña', alt: '2,150m' }
    ]
  }
];
