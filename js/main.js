// ==============================================================
// CARGA DE SECCIONES (PARTIALS) DESDE /partials
// ==============================================================
const loadPartials = async () => {
  const includes = document.querySelectorAll('[data-include]');
  const requests = [...includes].map(async (el) => {
    try {
      const resp = await fetch(el.getAttribute('data-include'));
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      el.innerHTML = await resp.text();
    } catch (err) {
      console.error('No se pudo cargar la sección:', el.getAttribute('data-include'), err);
    }
  });
  await Promise.all(requests);
  initApp();
};

// ==============================================================
// LÓGICA DEL SITIO
// ==============================================================
const initApp = () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });

  // Menú Hamburguesa Móvil
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
      mobileMenuBtn.innerHTML = isExpanded
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Control de desplazamiento del carrusel de demos (PC)
  const demosGrid = document.getElementById('demosGrid');
  const prevDemoBtn = document.getElementById('prevDemo');
  const nextDemoBtn = document.getElementById('nextDemo');

  if (demosGrid && prevDemoBtn && nextDemoBtn) {
    const scrollAmount = 400;

    nextDemoBtn.addEventListener('click', () => {
      demosGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevDemoBtn.addEventListener('click', () => {
      demosGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  // Sincronización de puntos indicadores (Dots) en móvil
  const dots = document.querySelectorAll('.carousel-dots .dot');

  if (demosGrid && dots.length > 0) {
    demosGrid.addEventListener('scroll', () => {
      const cardWidth = demosGrid.querySelector('.demo-card').offsetWidth + 30;
      const scrollLeft = demosGrid.scrollLeft;
      const currentIndex = Math.round(scrollLeft / cardWidth);

      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const cardWidth = demosGrid.querySelector('.demo-card').offsetWidth + 30;
        demosGrid.scrollTo({
          left: cardWidth * index,
          behavior: 'smooth',
        });
      });
    });
  }

  // Carrusel de servicios (desktop): degradados laterales + botones adelante/atrás
  const pricingWrap = document.getElementById('pricingWrap');
  const prevServicioBtn = document.getElementById('prevServicio');
  const nextServicioBtn = document.getElementById('nextServicio');
  const fadeServLeft = document.getElementById('serviciosFadeLeft');
  const fadeServRight = document.getElementById('serviciosFadeRight');

  if (pricingWrap && prevServicioBtn && nextServicioBtn) {
    const updateServiciosCarousel = () => {
      const maxScroll = pricingWrap.scrollWidth - pricingWrap.clientWidth;
      const atStart = pricingWrap.scrollLeft <= 0;
      const atEnd = pricingWrap.scrollLeft >= maxScroll - 1;
      const hasOverflow = maxScroll > 0;

      prevServicioBtn.classList.toggle('disabled', !hasOverflow || atStart);
      nextServicioBtn.classList.toggle('disabled', !hasOverflow || atEnd);

      if (fadeServLeft) {
        fadeServLeft.classList.toggle('visible', hasOverflow && !atStart);
      }
      if (fadeServRight) {
        fadeServRight.classList.toggle('hidden', !hasOverflow || atEnd);
      }
    };

    const scrollServicios = (direction) => {
      const card = pricingWrap.querySelector('.pricing-card');
      const step = card ? card.offsetWidth + 24 : 400;
      pricingWrap.scrollBy({ left: direction * step, behavior: 'smooth' });
    };

    nextServicioBtn.addEventListener('click', () => scrollServicios(1));
    prevServicioBtn.addEventListener('click', () => scrollServicios(-1));

    pricingWrap.addEventListener('scroll', updateServiciosCarousel, { passive: true });

    let serviciosResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(serviciosResizeTimer);
      serviciosResizeTimer = setTimeout(updateServiciosCarousel, 150);
    });

    updateServiciosCarousel();
  }

  // Acordeón FAQ Accesible y Estable: al abrir uno, los demás (incluido el vecino en desktop) quedan cerrados
  const closeAllFaqItems = () => {
    document.querySelectorAll('.faq-item').forEach((other) => {
      other.classList.remove('active');
      other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
  };

  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-q');

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      closeAllFaqItems();

      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Filtrado por pestañas en la sección FAQ
  const faqTabs = document.querySelectorAll('.faq-tabs .tab-btn');
  const faqItems = document.querySelectorAll('.faq-grid .faq-item');

  const applyFaqFilter = (filter) => {
    faqItems.forEach((item) => {
      if (item.getAttribute('data-category') === filter) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  };

  faqTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      faqTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      closeAllFaqItems();
      applyFaqFilter(tab.getAttribute('data-filter'));
    });
  });

  // Aplica el filtro del tab activo por defecto
  const activeFaqTab = document.querySelector('.faq-tabs .tab-btn.active');
  if (activeFaqTab) applyFaqFilter(activeFaqTab.getAttribute('data-filter'));

  // Acordeón modal: abre uno y cierra los demás del mismo modal.
  // La altura del contenido se mide con JS para que nada se corte en móvil.
  const setAccordionHeight = (content) => {
    content.style.maxHeight = content.scrollHeight + 'px';
  };

  document.querySelectorAll('.modal-acc .acc-header').forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.closest('.acc-item');
      const accContainer = item.closest('.modal-acc');
      const isOpen = item.classList.contains('open');

      accContainer.querySelectorAll('.acc-item').forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.acc-header').setAttribute('aria-expanded', 'false');
        const otherContent = other.querySelector('.acc-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
        const content = item.querySelector('.acc-content');
        if (content) setAccordionHeight(content);
      }
    });
  });

  // Ajusta la altura de los acordeones abiertos por defecto
  document.querySelectorAll('.acc-item.open .acc-content').forEach((content) => {
    setAccordionHeight(content);
  });

  // Recalcula la altura al cambiar el tamaño de la pantalla (rotación móvil, etc.)
  const updateOpenAccordionHeights = () => {
    document.querySelectorAll('.acc-item.open .acc-content').forEach((content) => {
      setAccordionHeight(content);
    });
  };
  window.addEventListener('resize', updateOpenAccordionHeights);

  // Función para cerrar todos los acordeones de un modal
  const resetAccordions = (modalEl) => {
    modalEl.querySelectorAll('.acc-item').forEach((item) => {
      item.classList.remove('open');
      item.querySelector('.acc-header').setAttribute('aria-expanded', 'false');
      const content = item.querySelector('.acc-content');
      if (content) content.style.maxHeight = null;
    });
  };

  // Modal detalle Landing Page Express
  const pricingModal = document.getElementById('pricingModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  const openModal = () => {
    pricingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    resetAccordions(pricingModal);
    pricingModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (pricingModal && openModalBtn && closeModalBtn) {
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    pricingModal.addEventListener('click', (e) => {
      if (e.target === pricingModal) closeModal();
    });
  }

  const deliveryDetailBtn = document.getElementById('deliveryDetailBtn');
  if (deliveryDetailBtn) {
    deliveryDetailBtn.addEventListener('click', openModal);
  }

  // Modal Sitio Web Corporativo
  const pricingModalCorp = document.getElementById('pricingModalCorp');
  const openModalCorpBtn = document.getElementById('openModalCorpBtn');
  const closeModalCorpBtn = document.getElementById('closeModalCorpBtn');

  const openModalCorp = () => {
    pricingModalCorp.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModalCorp = () => {
    resetAccordions(pricingModalCorp);
    pricingModalCorp.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (pricingModalCorp && openModalCorpBtn && closeModalCorpBtn) {
    openModalCorpBtn.addEventListener('click', openModalCorp);
    closeModalCorpBtn.addEventListener('click', closeModalCorp);

    pricingModalCorp.addEventListener('click', (e) => {
      if (e.target === pricingModalCorp) closeModalCorp();
    });
  }

  const deliveryDetailBtnCorp = document.getElementById('deliveryDetailBtnCorp');
  if (deliveryDetailBtnCorp) {
    deliveryDetailBtnCorp.addEventListener('click', openModalCorp);
  }

  // Modal Catálogo y Menú Express
  const pricingModalCatalog = document.getElementById('pricingModalCatalog');
  const openModalCatalogBtn = document.getElementById('openModalCatalogBtn');
  const closeModalCatalogBtn = document.getElementById('closeModalCatalogBtn');

  const openModalCatalog = () => {
    pricingModalCatalog.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModalCatalog = () => {
    resetAccordions(pricingModalCatalog);
    pricingModalCatalog.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (pricingModalCatalog && openModalCatalogBtn && closeModalCatalogBtn) {
    openModalCatalogBtn.addEventListener('click', openModalCatalog);
    closeModalCatalogBtn.addEventListener('click', closeModalCatalog);

    pricingModalCatalog.addEventListener('click', (e) => {
      if (e.target === pricingModalCatalog) closeModalCatalog();
    });
  }

  const deliveryDetailBtnCatalog = document.getElementById('deliveryDetailBtnCatalog');
  if (deliveryDetailBtnCatalog) {
    deliveryDetailBtnCatalog.addEventListener('click', openModalCatalog);
  }

  // Modal Tienda Online Profesional
  const pricingModalEcom = document.getElementById('pricingModalEcom');
  const openModalEcomBtn = document.getElementById('openModalEcomBtn');
  const closeModalEcomBtn = document.getElementById('closeModalEcomBtn');

  const openModalEcom = () => {
    pricingModalEcom.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModalEcom = () => {
    resetAccordions(pricingModalEcom);
    pricingModalEcom.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (pricingModalEcom && openModalEcomBtn && closeModalEcomBtn) {
    openModalEcomBtn.addEventListener('click', openModalEcom);
    closeModalEcomBtn.addEventListener('click', closeModalEcom);

    pricingModalEcom.addEventListener('click', (e) => {
      if (e.target === pricingModalEcom) closeModalEcom();
    });
  }

  const deliveryDetailBtnEcom = document.getElementById('deliveryDetailBtnEcom');
  if (deliveryDetailBtnEcom) {
    deliveryDetailBtnEcom.addEventListener('click', openModalEcom);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (pricingModal && pricingModal.classList.contains('active')) closeModal();
      if (pricingModalCorp && pricingModalCorp.classList.contains('active')) closeModalCorp();
      if (pricingModalCatalog && pricingModalCatalog.classList.contains('active')) closeModalCatalog();
      if (pricingModalEcom && pricingModalEcom.classList.contains('active')) closeModalEcom();
    }
  });

  // Formulario a WhatsApp
  const formContacto = document.getElementById('formContacto');
  if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const servicio = document.getElementById('servicio').value;
      const mensaje = document.getElementById('mensaje').value.trim();

      // Texto plano con saltos de línea reales
      const texto =
        `*¡Nueva consulta desde el sitio web!*\n\n` +
        `*Mi Nombre es:* ${nombre}\n` +
        `*Servicio de interés:* ${servicio}\n` +
        `*Mensaje:* ${mensaje}`;

      // Codificación segura compatible con navegadores de escritorio y móviles
      const telefono = '56959909150';
      const url = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(texto)}`;

      window.open(url, '_blank');
    });
  }
};

// Inicialización: espera a que el DOM esté listo y carga los partials
document.addEventListener('DOMContentLoaded', loadPartials);
