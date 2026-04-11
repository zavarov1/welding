document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');

  function updateHeaderState() {
    if (!header) {
      return;
    }

    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  function closeMenu() {
    if (!nav || !burger) {
      return;
    }

    nav.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (header) {
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState);
  }

  // Mobile menu
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.classList.toggle('active', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      const clickedInsideMenu = nav.contains(event.target);
      const clickedBurger = burger.contains(event.target);
      if (!clickedInsideMenu && !clickedBurger) {
        closeMenu();
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      closeMenu();
    });
  });

  // ПОРТФОЛІО: додайте новий об'єкт у worksDataUa/worksDataEn,
  // і картка автоматично з'явиться в секції "Наші роботи"/"Projects".
  // Для зображень використовуйте локальні шляхи з /assets/images/.
  const worksDataUa = [
    {
      id: 1,
      title: "Металева ферма для промислового об'єкта",
      summary: 'Виготовлення та монтаж ферми для виробничої будівлі з підвищеним навантаженням.',
      image: '/assets/images/work-farm.svg',
      alt: 'Металева ферма промислового об’єкта',
      type: 'Металева ферма',
      description: 'Реалізовано ферменну систему для промислової зони в Києві з урахуванням довгих прольотів.',
      details: 'Терміни: 18 днів. Етапи: підготовка вузлів, зварювання, антикорозійне покриття, монтаж на об’єкті.'
    },
    {
      id: 2,
      title: 'Каркас ангару',
      summary: 'Проєктування вузлів та зварювання каркасної конструкції для ангару під складські потреби.',
      image: '/assets/images/work-hangar.svg',
      alt: 'Каркас металевого ангару',
      type: 'Каркас ангару',
      description: 'Створено просторовий каркас ангару з точним дотриманням монтажних допусків і геометрії.',
      details: 'Терміни: 24 дні. Особливості: посилені опори, стикові вузли під кранове навантаження.'
    },
    {
      id: 3,
      title: 'Несучі балки для будівлі',
      summary: 'Комплект несучих балок для комерційного об’єкта з перевіркою зварних швів.',
      image: '/assets/images/work-beams.svg',
      alt: 'Несучі металеві балки',
      type: 'Несучі балки',
      description: 'Виконано партію балок для реконструкції будівлі із поетапною поставкою на майданчик.',
      details: 'Терміни: 12 днів. Роботи: розкрій, складання, зварювання, контроль якості, маркування елементів.'
    },
    {
      id: 4,
      title: 'Металевий навіс',
      summary: 'Зварна конструкція навісу для вхідної групи та паркувальної зони.',
      image: '/assets/images/work-canopy.svg',
      alt: 'Металевий навіс з арковими елементами',
      type: 'Навіс та опори',
      description: 'Виготовлено каркас навісу з арковими елементами та стійким покриттям для зовнішнього середовища.',
      details: 'Терміни: 10 днів. Матеріал: профільна труба та листова сталь, підготовка до фарбування.'
    },
    {
      id: 5,
      title: 'Індивідуальна зварна конструкція',
      summary: 'Нестандартний виріб під технічне завдання замовника для виробничого процесу.',
      image: '/assets/images/work-custom.svg',
      alt: 'Індивідуальна зварна металева конструкція',
      type: 'Індивідуальне замовлення',
      description: 'Розроблено й виготовлено спеціальну конструкцію під конкретні умови експлуатації.',
      details: 'Терміни: 9 днів. Підхід: узгодження креслень, пробне складання, фінальне зварювання та перевірка.'
    }
  ];

  const worksDataEn = [
    {
      id: 1,
      title: 'Steel Truss for an Industrial Facility',
      summary: 'Fabrication and installation of a truss system for a production building with increased loads.',
      image: '/assets/images/work-farm.svg',
      alt: 'Steel truss for industrial facility',
      type: 'Steel Truss',
      description: 'A truss system was delivered for an industrial site in Kyiv with long-span requirements.',
      details: 'Timeline: 18 days. Stages: node preparation, welding, anti-corrosion coating, on-site installation.'
    },
    {
      id: 2,
      title: 'Hangar Frame',
      summary: 'Node design and frame welding for a hangar structure for warehouse operations.',
      image: '/assets/images/work-hangar.svg',
      alt: 'Steel hangar frame',
      type: 'Hangar Frame',
      description: 'A spatial steel frame was produced with strict tolerance and geometry control.',
      details: 'Timeline: 24 days. Features: reinforced supports and joints for crane load conditions.'
    },
    {
      id: 3,
      title: 'Load-Bearing Beams for a Building',
      summary: 'Set of structural beams for a commercial facility with weld quality checks.',
      image: '/assets/images/work-beams.svg',
      alt: 'Load-bearing steel beams',
      type: 'Structural Beams',
      description: 'A batch of beams was fabricated for building reconstruction with phased delivery.',
      details: 'Timeline: 12 days. Scope: cutting, assembly, welding, quality control, element marking.'
    },
    {
      id: 4,
      title: 'Steel Canopy',
      summary: 'Welded canopy frame for an entrance group and parking area.',
      image: '/assets/images/work-canopy.svg',
      alt: 'Steel canopy with arched elements',
      type: 'Canopy and Supports',
      description: 'A canopy frame with arched elements and durable coating for outdoor operation.',
      details: 'Timeline: 10 days. Material: profile tube and sheet steel, pre-paint preparation.'
    },
    {
      id: 5,
      title: 'Custom Welded Structure',
      summary: 'Non-standard welded product delivered according to customer technical requirements.',
      image: '/assets/images/work-custom.svg',
      alt: 'Custom welded steel structure',
      type: 'Custom Order',
      description: 'A dedicated welded structure was designed and manufactured for specific operation conditions.',
      details: 'Timeline: 9 days. Approach: drawing approval, trial assembly, final welding, final checks.'
    }
  ];

  const currentLang = document.documentElement.lang || 'uk';
  const worksData = currentLang.startsWith('en') ? worksDataEn : worksDataUa;

  const worksGrid = document.getElementById('worksGrid');
  const servicesGrid = document.getElementById('servicesGrid');

  if (servicesGrid) {
    const servicesCarousel = servicesGrid.closest('.services-carousel');
    const servicesPrev = document.getElementById('servicesPrev');
    const servicesNext = document.getElementById('servicesNext');
    const servicesDots = document.getElementById('servicesDots');
    const initialServiceCards = Array.from(servicesGrid.querySelectorAll('.service-card')).map((card) => card.innerHTML);
    let currentServiceStartIndex = 0;

    function getVisibleServiceCount() {
      if (window.innerWidth <= 680) {
        return 1;
      }
      if (window.innerWidth <= 1040) {
        return 2;
      }
      return 3;
    }

    function getVisibleServices() {
      const visibleCount = getVisibleServiceCount();
      const visibleItems = [];

      for (let i = 0; i < visibleCount; i += 1) {
        visibleItems.push(initialServiceCards[(currentServiceStartIndex + i) % initialServiceCards.length]);
      }

      return visibleItems;
    }

    function renderServiceDots() {
      if (!servicesDots) {
        return;
      }

      servicesDots.innerHTML = initialServiceCards.map((_, index) => {
        const isActive = index === currentServiceStartIndex ? 'active' : '';
        return `
          <button
            type="button"
            class="services-dot ${isActive}"
            data-service-dot-index="${index}"
            aria-label="Перейти до послуги ${index + 1}"></button>
        `;
      }).join('');
    }

    function renderServices() {
      const visibleServices = getVisibleServices();
      servicesGrid.innerHTML = visibleServices.map((serviceHtml) => {
        return `<article class="service-card">${serviceHtml}</article>`;
      }).join('');

      renderServiceDots();
    }

    function showPrevServices() {
      currentServiceStartIndex = (currentServiceStartIndex - 1 + initialServiceCards.length) % initialServiceCards.length;
      renderServices();
    }

    function showNextServices() {
      currentServiceStartIndex = (currentServiceStartIndex + 1) % initialServiceCards.length;
      renderServices();
    }

    renderServices();

    if (servicesPrev && servicesNext) {
      servicesPrev.addEventListener('click', showPrevServices);
      servicesNext.addEventListener('click', showNextServices);
      window.addEventListener('resize', renderServices);
    }

    if (servicesDots) {
      servicesDots.addEventListener('click', (event) => {
        const dotButton = event.target.closest('[data-service-dot-index]');
        if (!dotButton) {
          return;
        }

        const dotIndex = Number(dotButton.dataset.serviceDotIndex);
        if (Number.isNaN(dotIndex)) {
          return;
        }

        currentServiceStartIndex = dotIndex;
        renderServices();
      });
    }

    if (servicesCarousel) {
      let touchStartX = 0;
      let touchStartY = 0;
      const swipeThreshold = 45;

      servicesCarousel.addEventListener('touchstart', (event) => {
        if (event.touches.length !== 1) {
          return;
        }

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
      }, { passive: true });

      servicesCarousel.addEventListener('touchend', (event) => {
        if (window.innerWidth > 680 || event.changedTouches.length !== 1) {
          return;
        }

        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) <= Math.abs(deltaY)) {
          return;
        }

        if (deltaX < 0) {
          showNextServices();
        } else {
          showPrevServices();
        }
      }, { passive: true });
    }
  }

  if (worksGrid) {
    const worksCarousel = worksGrid.closest('.works-carousel');
    const worksPrev = document.getElementById('worksPrev');
    const worksNext = document.getElementById('worksNext');
    const worksDots = document.getElementById('worksDots');
    let currentStartIndex = 0;

    function getVisibleCount() {
      if (window.innerWidth <= 680) {
        return 1;
      }
      if (window.innerWidth <= 1040) {
        return 2;
      }
      // ДЕФОЛТ: на десктопі показуємо 3 проєкти
      return 3;
    }

    function getVisibleWorks() {
      const visibleCount = getVisibleCount();
      const visibleItems = [];

      for (let i = 0; i < visibleCount; i += 1) {
        visibleItems.push(worksData[(currentStartIndex + i) % worksData.length]);
      }

      return visibleItems;
    }

    function renderDots() {
      if (!worksDots) {
        return;
      }

      worksDots.innerHTML = worksData.map((_, index) => {
        const isActive = index === currentStartIndex ? 'active' : '';
        return `
          <button
            type="button"
            class="works-dot ${isActive}"
            data-dot-index="${index}"
            aria-label="Перейти до проєкту ${index + 1}"></button>
        `;
      }).join('');
    }

    function renderWorks() {
      const visibleWorks = getVisibleWorks();
      worksGrid.innerHTML = visibleWorks.map((work) => {
        return `
          <article class="work-card">
            <img class="work-thumb" src="${work.image}" alt="${work.alt}" loading="lazy">
            <div class="work-content">
              <h3>${work.title}</h3>
              <p>${work.summary}</p>
              <button class="btn btn-secondary" type="button" data-work-id="${work.id}">Переглянути</button>
            </div>
          </article>
        `;
      }).join('');

      renderDots();
    }

    function showPrevWorks() {
      currentStartIndex = (currentStartIndex - 1 + worksData.length) % worksData.length;
      renderWorks();
    }

    function showNextWorks() {
      currentStartIndex = (currentStartIndex + 1) % worksData.length;
      renderWorks();
    }

    renderWorks();

    if (worksPrev && worksNext) {
      worksPrev.addEventListener('click', showPrevWorks);
      worksNext.addEventListener('click', showNextWorks);

      window.addEventListener('resize', renderWorks);
    }

    if (worksDots) {
      worksDots.addEventListener('click', (event) => {
        const dotButton = event.target.closest('[data-dot-index]');
        if (!dotButton) {
          return;
        }

        const dotIndex = Number(dotButton.dataset.dotIndex);
        if (Number.isNaN(dotIndex)) {
          return;
        }

        currentStartIndex = dotIndex;
        renderWorks();
      });
    }

    // Swipe for mobile carousel
    if (worksCarousel) {
      let touchStartX = 0;
      let touchStartY = 0;
      const swipeThreshold = 45;

      worksCarousel.addEventListener('touchstart', (event) => {
        if (event.touches.length !== 1) {
          return;
        }

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
      }, { passive: true });

      worksCarousel.addEventListener('touchend', (event) => {
        if (window.innerWidth > 680 || event.changedTouches.length !== 1) {
          return;
        }

        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // React only to clear horizontal swipes.
        if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) <= Math.abs(deltaY)) {
          return;
        }

        if (deltaX < 0) {
          showNextWorks();
        } else {
          showPrevWorks();
        }
      }, { passive: true });
    }

    // Modal / gallery logic
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalType = document.getElementById('modalType');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetails = document.getElementById('modalDetails');
    const modalClose = document.getElementById('modalClose');

    if (modal && modalTitle && modalType && modalImage && modalDescription && modalDetails && modalClose) {
      function openModal(work) {
        modalTitle.textContent = work.title;
        modalType.textContent = work.type;
        modalImage.src = work.image;
        modalImage.alt = work.alt;
        modalDescription.textContent = work.description;
        modalDetails.textContent = work.details;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      worksGrid.addEventListener('click', (event) => {
        const button = event.target.closest('[data-work-id]');
        if (!button) {
          return;
        }

        const selectedId = Number(button.dataset.workId);
        const selectedWork = worksData.find((item) => item.id === selectedId);
        if (selectedWork) {
          openModal(selectedWork);
        }
      });

      modalClose.addEventListener('click', closeModal);
      modal.addEventListener('click', (event) => {
        if (event.target.hasAttribute('data-close-modal')) {
          closeModal();
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('open')) {
          closeModal();
        }
      });
    }
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
});
