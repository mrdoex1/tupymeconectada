export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  id: string;
  etiqueta: string;
  icono: string;
  faqs: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: 'landing',
    etiqueta: 'One Page Web',
    icono: 'ti ti-code',
    faqs: [
      {
        q: '¿Qué es una One Page?',
        a: 'Es un sitio web de una sola página donde tus clientes encuentran todo lo importante con solo bajar: qué ofreces, por qué elegirte, opiniones y cómo contactarte. Está pensada para que te escriban directo por WhatsApp.',
      },
      {
        q: '¿Qué diferencia hay entre One Page Esencial y One Page Pro?',
        a: 'En la Esencial tú entregas los textos y las fotos. En la Pro nosotros redactamos todos los textos y además sumamos mapa de Google, formulario de contacto, galería, configuración de Google Search Console y 2 rondas de cambios.',
      },
      {
        q: '¿Puedo editar mi web por mi cuenta después?',
        a: 'Sí. Todos los sitios incluyen un administrador sencillo para cambiar textos e imágenes sin saber programar y sin romper el diseño.',
      },
    ],
  },
  {
    id: 'catalogo',
    etiqueta: 'Catálogo WhatsApp',
    icono: 'ti ti-shopping-cart',
    faqs: [
      {
        q: '¿Cómo llega el pedido?',
        a: 'El cliente ve tus productos con fotos, arma su pedido y te llega directo a tu WhatsApp. Tú cobras como ya lo haces: por transferencia o al entregar.',
      },
      {
        q: '¿Cuántos productos puedo tener?',
        a: 'El plan incluye hasta 30 productos. Si necesitas más, lo cotizamos según la cantidad.',
      },
      {
        q: '¿Puedo cobrar en línea con tarjeta?',
        a: 'El Catálogo WhatsApp no incluye pago en línea. Si lo necesitas, te cotizamos una tienda online a medida.',
      },
    ],
  },
  {
    id: 'corporativo',
    etiqueta: 'Sitio Corporativo',
    icono: 'ti ti-building',
    faqs: [
      {
        q: '¿Qué páginas incluye?',
        a: 'Hasta 4 páginas: Inicio, Quiénes somos, Servicios y Contacto. Se entrega en 8 a 10 días hábiles.',
      },
      {
        q: '¿Puedo agregar más páginas o un blog?',
        a: 'Sí. Las páginas adicionales y módulos como blog o portafolio se cotizan aparte.',
      },
    ],
  },
  {
    id: 'mantenimiento',
    etiqueta: 'Mantenimiento y Optimización',
    icono: 'ti ti-lifebuoy',
    faqs: [
      {
        q: '¿Qué incluye el plan mensual?',
        a: 'Respaldos, actualizaciones de seguridad, corrección de errores, optimización de velocidad y SEO técnico, hosting y 2 horas al mes para tus cambios.',
      },
      {
        q: '¿Estoy amarrado a un contrato?',
        a: 'No. Es un pago mensual sin contrato, cancelable con aviso previo. Las horas no usadas no se acumulan.',
      },
      {
        q: '¿Qué no está incluido?',
        a: 'Las páginas nuevas, funciones nuevas o rediseños se cotizan aparte.',
      },
    ],
  },
  {
    id: 'proceso',
    etiqueta: 'Proceso y pagos',
    icono: 'ti ti-checklist',
    faqs: [
      {
        q: '¿Cuánto demora la entrega?',
        a: 'One Page y Catálogo WhatsApp: 3 a 5 días hábiles. Sitio Corporativo: 8 a 10 días hábiles. El plazo corre desde que recibimos tus textos, imágenes y accesos, y se realiza el primer pago.',
      },
      {
        q: '¿Cómo se paga?',
        a: '50% al iniciar el proyecto y 50% cuando tu web está publicada. Puedes pagar por transferencia bancaria o Mercado Pago.',
      },
      {
        q: '¿Incluyen hosting y dominio?',
        a: 'El hosting del primer año va incluido en todos los sitios. Desde el segundo año va incluido en el plan de Mantenimiento o se renueva por $39.990 al año. El dominio .cl se paga aparte en NIC Chile (aprox. $10.000 al año) y te ayudamos a inscribirlo a tu nombre.',
      },
      {
        q: '¿Hacen tiendas online con pago en línea?',
        a: 'Sí, como proyecto a medida. Escríbenos por WhatsApp, cuéntanos qué vendes y te enviamos una cotización.',
      },
    ],
  },
];