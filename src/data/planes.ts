import { site } from './site';

export interface Plan {
  id: string;
  nombre: string;
  bajada: string;
  precio: string;
  precioNota: string;
  desde?: boolean;
  plazo: string;
  condicion?: string;
  paraQuien: string;
  destacado?: boolean;
  feature?: boolean;
  ancho?: boolean;
  incluye: string[];
  incluyeLead?: string;
  noIncluye: string;
  boton: string;
  whatsappKey: keyof typeof site.whatsapp;
  esPrecio: string;
}

export const planes: Plan[] = [
  {
    id: 'one-page-esencial',
    nombre: 'One Page Esencial',
    bajada: 'Tu negocio en internet, simple y listo para recibir clientes.',
    precio: '79.990',
    precioNota: 'pago único',
    plazo: 'Lista en 3 a 5 días hábiles',
    paraQuien: 'Ideal si ya tienes tus textos y fotos y quieres partir rápido.',
    feature: true,
    incluye: [
      'Página de una sola sección con tu propuesta, servicios, opiniones y contacto',
      'Botón directo a tu WhatsApp',
      'Botones a tus redes sociales',
      'Diseño adaptado a celular, tablet y computador',
      'Administrador para editar textos e imágenes sin programar',
      'Carga rápida y certificado SSL',
      'SEO técnico para que Google entienda tu sitio',
      'Hosting incluido, sin costo adicional',
      '1 ronda de cambios antes de publicar',
    ],
    noIncluye: 'No incluye redacción de textos ni dominio.',
    boton: 'Quiero la One Page Esencial',
    whatsappKey: 'onePageEsencial',
    esPrecio: '79990',
  },
  {
    id: 'one-page-pro',
    nombre: 'One Page Pro',
    bajada: 'Nosotros escribimos, tú solo revisas.',
    precio: '119.990',
    precioNota: 'pago único',
    plazo: 'Lista en 3 a 5 días hábiles',
    paraQuien:
      'Ideal si no tienes tiempo de escribir o quieres una web mejor preparada para aparecer en Google.',
    destacado: true,
    feature: true,
    incluyeLead: 'Todo lo de One Page Esencial, más:',
    incluye: [
      'Redacción de todos los textos, pensados para que te contacten',
      'Mapa de Google con tu zona de atención',
      'Formulario de contacto que llega a tu correo',
      'Configuración de Google Search Console y envío de tu sitio a Google',
      'Galería de trabajos o productos',
      '2 rondas de cambios antes de publicar',
      'Hosting incluido, sin costo adicional',
    ],
    noIncluye: 'No incluye dominio.',
    boton: 'Quiero la One Page Pro',
    whatsappKey: 'onePagePro',
    esPrecio: '119990',
  },
  {
    id: 'catalogo-whatsapp',
    nombre: 'Catálogo WhatsApp',
    bajada: 'Tus productos en línea y los pedidos directo a tu teléfono.',
    precio: '129.990',
    desde: true,
    precioNota: 'pago único',
    plazo: 'Listo en 3 a 5 días hábiles',
    paraQuien:
      'Ideal para negocios que venden productos: comida, ropa, accesorios, repuestos.',
    incluye: [
      'Catálogo de hasta 30 productos con fotos, precios y categorías',
      'Búsqueda y filtros por precio',
      'El cliente arma su pedido y te llega por WhatsApp',
      'Sección de retiro o delivery',
      'Administrador para agregar y editar productos y precios',
      'Diseño adaptado a celular, tablet y computador',
      'Carga rápida, certificado SSL y SEO técnico',
      'Hosting incluido, sin costo adicional',
    ],
    noIncluye:
      'No incluye pago en línea ni dominio. Cobras como ya lo haces (transferencia o al entregar). Más de 30 productos: se cotiza.',
    boton: 'Quiero mi Catálogo',
    whatsappKey: 'catalogo',
    esPrecio: '129990',
  },
  {
    id: 'sitio-corporativo',
    nombre: 'Sitio Corporativo',
    bajada: 'Una web completa para empresas que necesitan proyectar solidez.',
    precio: '249.990',
    desde: true,
    precioNota: 'pago único',
    plazo: 'Listo en 8 a 10 días hábiles',
    paraQuien:
      'Ideal para empresas que venden a otras empresas o necesitan más de una página.',
    incluye: [
      'Hasta 4 páginas: Inicio, Quiénes somos, Servicios y Contacto',
      'Botón de WhatsApp y formulario que llega a tu correo',
      'Administrador para editar textos e imágenes sin programar',
      'Diseño adaptado a celular, tablet y computador',
      'Carga rápida, certificado SSL y SEO técnico en cada página',
      'Hosting incluido, sin costo adicional',
    ],
    noIncluye:
      'No incluye dominio. Páginas adicionales y módulos como blog o portafolio se cotizan aparte.',
    boton: 'Cotizar Sitio Corporativo',
    whatsappKey: 'corporativo',
    esPrecio: '249990',
  },
  {
    id: 'mantenimiento',
    nombre: 'Mantenimiento y Optimización',
    bajada: 'Tu web cuidada, rápida y segura, sin preocuparte de nada.',
    precio: '29.990',
    precioNota: 'al mes',
    condicion: 'Sin contrato · Cancelable con aviso previo',
    plazo: '',
    paraQuien: '',
    incluye: [
      'Respaldos y actualizaciones de seguridad',
      'Corrección de errores',
      'Optimización de velocidad y SEO técnico',
      '2 horas al mes para tus cambios (no acumulables)',
    ],
    noIncluye: 'Páginas nuevas, funciones nuevas o rediseños se cotizan aparte.',
    boton: 'Quiero el plan mensual',
    whatsappKey: 'mantenimiento',
    esPrecio: '29990',
    ancho: true,
  },
];

export const buenoSaber = [
  {
    titulo: 'Dominio',
    texto:
      'El dominio .cl se paga aparte, directamente en NIC Chile (aprox. $10.000 al año). Si no sabes cómo hacerlo, te ayudamos a inscribirlo a tu nombre.',
  },
  {
    titulo: 'Hosting',
    texto:
      'Usamos hosting gratuito de proveedores como Cloudflare, pensado para sitios como el tuyo: rápido, seguro y sin costo para ti. La cuenta queda a tu nombre, y si el proveedor cambiara sus condiciones, tu web se puede mover a otro hosting sin rehacerla. Si prefieres otro hosting, te ayudamos a publicarla ahí; ese costo lo pagas directamente al proveedor.',
  },
  {
    titulo: 'Pago',
    texto:
      '50% al iniciar y 50% cuando tu web está publicada. Por transferencia o Mercado Pago.',
  },
  {
    titulo: 'Plazos',
    texto:
      'Corren desde que recibimos tus textos, imágenes y accesos, y se realiza el primer pago.',
  },
  {
    titulo: 'Correo con tu dominio',
    texto:
      'No está incluido. Si quieres un correo como contacto@tunegocio.cl, te ayudamos a configurarlo; el servicio de correo (por ejemplo Google Workspace) se paga directamente al proveedor.',
  },
];

export const proyectosAMedida = {
  texto:
    '¿Necesitas una tienda online con pago en línea o un proyecto a medida? Escríbenos y lo cotizamos según lo que necesitas, incluido el hosting.',
  boton: 'Cotizar proyecto a medida',
};