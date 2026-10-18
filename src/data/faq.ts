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
        a: 'Sí. Todos los sitios incluyen un administrador sencillo, sin saber programar y sin romper el diseño. En One Page y Sitio Corporativo cambias textos e imágenes; en el Catálogo agregas y editas productos y precios.',
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
        a: 'Respaldos, actualizaciones de seguridad, corrección de errores, optimización de velocidad y SEO técnico, y 2 horas al mes para tus cambios.',
      },
      {
        q: '¿Es obligatorio el plan de Mantenimiento?',
        a: 'No. Tu web funciona igual sin él y el hosting sigue incluido sin costo. El plan es para quienes prefieren que nos encarguemos de respaldos, seguridad, velocidad y de hacer sus cambios cada mes.',
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
        q: '¿Y si quiero cambios después de publicar?',
        a: 'Los textos e imágenes los puedes cambiar tú desde el administrador. Si prefieres que los hagamos nosotros, el plan de Mantenimiento incluye 2 horas al mes para tus cambios. Las páginas o funciones nuevas se cotizan aparte.',
      },
      {
        q: '¿Incluyen hosting y dominio?',
        a: 'El hosting va incluido sin costo adicional en todos nuestros planes: One Page, Catálogo WhatsApp y Sitio Corporativo. Las tiendas online y proyectos a medida necesitan un hosting pagado, que se incluye en su cotización. Si prefieres otro hosting, te ayudamos a publicar tu web ahí; ese costo lo pagas directamente al proveedor. El dominio .cl se paga aparte en NIC Chile (aprox. $10.000 al año) y te ayudamos a inscribirlo a tu nombre.',
      },
      {
        q: '¿Por qué el hosting no tiene costo?',
        a: 'Porque tu web es un sitio rápido que no necesita servidor ni base de datos, y proveedores como Cloudflare alojan este tipo de sitios sin costo. No es una promoción: no hay cobro después ni renovación. La cuenta queda a tu nombre y la web se puede mover a otro hosting cuando quieras.',
      },
      {
        q: '¿Incluye correo con mi dominio?',
        a: 'No. Si quieres un correo como contacto@tunegocio.cl, te ayudamos a configurarlo; el servicio de correo (por ejemplo Google Workspace) se paga directamente al proveedor.',
      },
      {
        q: '¿Hacen tiendas online con pago en línea?',
        a: 'Sí, como proyecto a medida. Como necesitan un hosting pagado, ese costo se incluye en la cotización. Escríbenos por WhatsApp, cuéntanos qué vendes y te enviamos una cotización.',
      },
    ],
  },
];