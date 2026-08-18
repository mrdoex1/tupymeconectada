import { animate, stagger } from 'motion';

// ==============================================================
// LÓGICA DEL SITIO
// ==============================================================
const initApp = () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // Menú Hamburguesa Móvil
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
      mobileMenuBtn.innerHTML = isExpanded
        ? '<i class="ti ti-x"></i>'
        : '<i class="ti ti-menu-2"></i>';
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="ti ti-menu-2"></i>';
      });
    });
  }

  // Scroll reveal sutil
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Anclas suaves con offset del header fijo
  const header = document.querySelector('.light-header');
  const headerOffset = header ? header.offsetHeight + 24 : 24;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Carrusel de servicios: botones prev/next (desktop) con scroll-snap
  const srvCarousel = document.getElementById('pricingWrap');
  const srvPrev = document.getElementById('srvPrevBtn');
  const srvNext = document.getElementById('srvNextBtn');

  const scrollServices = (dir) => {
    if (!srvCarousel) return;
    const card = srvCarousel.querySelector('.pricing-card');
    const step = card ? card.offsetWidth + 20 : 400;
    srvCarousel.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const updateSrvButtons = () => {
    if (!srvCarousel || !srvPrev || !srvNext) return;
    const maxScroll = srvCarousel.scrollWidth - srvCarousel.clientWidth;
    srvPrev.disabled = srvCarousel.scrollLeft <= 0;
    srvNext.disabled = srvCarousel.scrollLeft >= maxScroll - 4;
  };

  if (srvPrev && srvNext && srvCarousel) {
    srvPrev.addEventListener('click', () => scrollServices(-1));
    srvNext.addEventListener('click', () => scrollServices(1));
    srvCarousel.addEventListener('scroll', updateSrvButtons, { passive: true });
    window.addEventListener('resize', updateSrvButtons);
    updateSrvButtons();
  }

  // Acordeón FAQ: al abrir uno, los demás quedan cerrados
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

  // Filtrado por chips en la sección FAQ
  const chipBtns = document.querySelectorAll('.faq-chips .chip-btn');
  const faqGroups = document.querySelectorAll('.faq-group');

  const applyFaqFilter = (filter) => {
    faqGroups.forEach((group) => {
      const match = group.getAttribute('data-group') === filter;
      group.style.display = match ? '' : 'none';
      const firstItem = group.querySelector('.faq-item');
      if (match && firstItem && !group.querySelector('.faq-item.active')) {
        group.querySelectorAll('.faq-item').forEach((i) => {
          i.classList.remove('active');
          i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });
        firstItem.classList.add('active');
        firstItem.querySelector('.faq-q').setAttribute('aria-expanded', 'true');
      }
    });
  };

  chipBtns.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.getAttribute('data-filter');
      chipBtns.forEach((b) => b.classList.remove('active'));
      chip.classList.add('active');
      applyFaqFilter(filter);
    });
  });

  const initialChip = document.querySelector('.faq-chips .chip-btn.active');
  if (initialChip) {
    applyFaqFilter(initialChip.getAttribute('data-filter'));
  }

  // Formulario a WhatsApp
  const formContacto = document.getElementById('formContacto');
  if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const servicio = document.getElementById('servicio').value;
      const mensaje = document.getElementById('mensaje').value.trim();

      const texto =
        `*¡Nueva consulta desde el sitio web!*\n\n` +
        `*Mi Nombre es:* ${nombre}\n` +
        `*Servicio de interés:* ${servicio}\n` +
        `*Mensaje:* ${mensaje}`;

      const telefono = '56959909150';
      const url = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(texto)}`;
      window.open(url, '_blank');
    });
  }

  // Motion: entrada del header + micro-hover del CTA + entrada del hero
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && animate) {
    const logoEl = document.querySelector('.logo-container');
    if (logoEl) {
      animate(
        logoEl,
        { y: [-14, 0], opacity: [0, 1] },
        { type: 'spring', stiffness: 200, damping: 20, duration: 0.6, delay: 0.05 }
      );
    }

    const navLinksList = document.querySelectorAll('.nav-links a');
    if (navLinksList.length) {
      animate(
        navLinksList,
        { y: [-12, 0], opacity: [0, 1] },
        { type: 'spring', stiffness: 220, damping: 22, duration: 0.6, delay: stagger(0.08) }
      );
    }

    const navActionsEls = document.querySelectorAll('.nav-actions > a');
    if (navActionsEls.length) {
      animate(
        navActionsEls,
        { y: [-10, 0], opacity: [0, 1], scale: [0.97, 1] },
        { type: 'spring', stiffness: 220, damping: 20, duration: 0.5, delay: 0.35 }
      );
    }

    const ctaHeader = document.querySelector('.cta-header');
    if (ctaHeader && window.matchMedia('(hover: hover)').matches) {
      ctaHeader.addEventListener('mouseenter', () => {
        animate(ctaHeader, { scale: 1.05 }, { type: 'spring', stiffness: 300, damping: 18 });
      });
      ctaHeader.addEventListener('mouseleave', () => {
        animate(ctaHeader, { scale: 1 }, { type: 'spring', stiffness: 300, damping: 18 });
      });
    }

    const heroTitle = document.querySelector('.hero-light h1');
    const heroParagraph = document.querySelector('.hero-light .hero-layout > div > p');
    const heroButton = document.querySelector('.hero-buttons .btn-main');
    const heroCard = document.querySelector('.hero-benefits-card');

    if (heroTitle) {
      animate(
        heroTitle,
        { y: [24, 0], opacity: [0, 1] },
        { type: 'spring', stiffness: 160, damping: 22, duration: 0.8, delay: 0.1 }
      );
    }
    if (heroParagraph) {
      animate(
        heroParagraph,
        { y: [18, 0], opacity: [0, 1] },
        { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
      );
    }
    if (heroButton) {
      animate(
        heroButton,
        { y: [12, 0], opacity: [0, 1], scale: [0.97, 1] },
        { type: 'spring', stiffness: 240, damping: 20, duration: 0.6, delay: 0.45 }
      );
    }
    if (heroCard) {
      animate(
        heroCard,
        { x: [40, 0], opacity: [0, 1] },
        { type: 'spring', stiffness: 160, damping: 22, duration: 0.9, delay: 0.2 }
      );
      const benefitItems = heroCard.querySelectorAll('.benefit-item');
      if (benefitItems.length) {
        animate(
          benefitItems,
          { x: [16, 0], opacity: [0, 1] },
          { duration: 0.6, ease: 'easeOut', delay: stagger(0.1) }
        );
      }
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}