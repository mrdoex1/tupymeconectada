const initApp = () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menú móvil
  const menuBtn = document.getElementById('ppMenuBtn');
  const nav = document.getElementById('ppNav');
  if (menuBtn && nav) {
    const setMenu = (open) => {
      nav.classList.toggle('pp-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.innerHTML = open
        ? '<i class="ti ti-x" aria-hidden="true"></i>'
        : '<i class="ti ti-menu-2" aria-hidden="true"></i>';
    };
    menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('pp-open')));
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => setMenu(false))
    );
  }

  // Anclas suaves con offset del header fijo
  const header = document.querySelector('.pp-header');
  const headerOffset = header ? header.offsetHeight + 22 : 22;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  // Carrusel de servicios: botones prev/next (desktop) con scroll-snap
  // (idéntico al index, main.js)
  const srvCarousel = document.getElementById('pricingWrap');
  const srvPrev = document.getElementById('srvPrevBtn');
  const srvNext = document.getElementById('srvNextBtn');

  const scrollServices = (dir) => {
    if (!srvCarousel) return;
    // Avanza una "página": el ancho visible (N cards completas) en cada clic.
    // Con scroll-snap center + cards relativas, saltar clientWidth deja N cards alineadas.
    srvCarousel.scrollBy({ left: dir * srvCarousel.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
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

  // Indicadores (dots) del carrusel de servicios
  const srvDots = document.getElementById('ppSrvDots');
  if (srvCarousel && srvDots) {
    const srvCards = srvCarousel.querySelectorAll('.pricing-card');
    const dotsEl = srvDots;
    const dots = srvDots.querySelectorAll('.pp-srv-dot');
    const updateDots = () => {
      if (!srvCards.length) return;
      let idx = 0;
      if (srvCarousel.scrollWidth > srvCarousel.clientWidth + 4) {
        const mid = srvCarousel.scrollLeft + srvCarousel.clientWidth / 2;
        let best = Infinity;
        srvCards.forEach((card, i) => {
          const c = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
          if (c < best) {
            best = c;
            idx = i;
          }
        });
      }
      dots.forEach((dot, i) => {
        const active = i === idx;
        dot.setAttribute('aria-current', String(active));
        dot.setAttribute('aria-selected', String(active));
      });
    };
    srvCarousel.addEventListener('scroll', updateDots, { passive: true });
    window.addEventListener('resize', updateDots);
    dotsEl.addEventListener('click', (e) => {
      const dot = e.target.closest('.pp-srv-dot');
      if (!dot || !srvCards.length) return;
      const i = Number(dot.dataset.index);
      const card = srvCards[i];
      if (!card) return;
      const target = card.offsetLeft - (srvCarousel.clientWidth - card.offsetWidth) / 2;
      srvCarousel.scrollTo({ left: Math.max(0, target), behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    updateDots();
  }

  // Acordeón FAQ: al abrir uno, los demás quedan cerrados
  const closeOthers = (item) => {
    document.querySelectorAll('.pp-faq-item').forEach((other) => {
      if (other === item) return;
      other.classList.remove('active');
      const q = other.querySelector('.pp-faq-q');
      if (q) q.setAttribute('aria-expanded', 'false');
    });
  };

  document.querySelectorAll('.pp-faq-item').forEach((item) => {
    const button = item.querySelector('.pp-faq-q');
    if (!button) return;
    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      closeOthers(item);
      item.classList.toggle('active', !isActive);
      button.setAttribute('aria-expanded', String(!isActive));
    });
  });

  // Filtrado por chips en el FAQ
  const chipBtns = document.querySelectorAll('.pp-chips .pp-chip');
  const groups = document.querySelectorAll('.pp-faq-group');
  if (chipBtns.length && groups.length) {
    const applyFilter = (filter) => {
      groups.forEach((group) => {
        const match = group.getAttribute('data-group') === filter;
        group.hidden = !match;
      });
    };
    chipBtns.forEach((chip) => {
      chip.addEventListener('click', () => {
        chipBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        applyFilter(chip.getAttribute('data-filter'));
      });
    });
    const initial = document.querySelector('.pp-chips .pp-chip.active');
    if (initial) applyFilter(initial.getAttribute('data-filter'));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.pp-reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('pp-visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('pp-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach((el) => observer.observe(el));
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}