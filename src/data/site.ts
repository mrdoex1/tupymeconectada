interface SiteConfig {
  phoneDisplay: string;
  phoneLink: string;
  email: string;
  instagram: string;
  whatsapp: Record<string, string>;
}

const PHONE_LINK = '56973173721';

const WHATSAPP_TEXT = {
  general: 'Hola%2C%20quiero%20cotizar%20una%20p%C3%A1gina%20web%20para%20mi%20negocio',
  onePage: 'Hola%2C%20quiero%20cotizar%20la%20One%20Page%20%28desde%20%2479.990%29',
  catalogo: 'Hola%2C%20quiero%20cotizar%20el%20Cat%C3%A1logo%20WhatsApp',
  corporativo: 'Hola%2C%20quiero%20cotizar%20un%20Sitio%20Corporativo',
  mantenimiento: 'Hola%2C%20quiero%20informaci%C3%B3n%20del%20plan%20de%20Mantenimiento',
  aMedida: 'Hola%2C%20necesito%20una%20tienda%20online%20o%20un%20proyecto%20a%20medida',
};

export const site: SiteConfig = {
  phoneDisplay: '+56 9 7317 3721',
  phoneLink: PHONE_LINK,
  email: 'contacto@tupymeconectada.cl',
  instagram: 'https://www.instagram.com/tupymeconectada/',
  whatsapp: Object.fromEntries(
    Object.entries(WHATSAPP_TEXT).map(([key, text]) => [key, `https://wa.me/${PHONE_LINK}?text=${text}`])
  ),
};