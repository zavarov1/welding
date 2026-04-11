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

  // ПОРТФОЛІО: додайте новий об'єкт у масив worksData,
  // і картка автоматично з'явиться в секції "Наші роботи".
  // Для зображень використовуйте локальні шляхи з assets/images/.
  const worksData = [
    {
      id: 1,
      title: "Металева ферма для промислового об'єкта",
      summary: 'Виготовлення та монтаж ферми для виробничої будівлі з підвищеним навантаженням.',
      image: 'assets/images/work-farm.svg',
      alt: 'Металева ферма промислового об’єкта',
      type: 'Металева ферма',
      description: 'Реалізовано ферменну систему для промислової зони в Києві з урахуванням довгих прольотів.',
      details: 'Терміни: 18 днів. Етапи: підготовка вузлів, зварювання, антикорозійне покриття, монтаж на об’єкті.'
    },
    {
      id: 2,
      title: 'Каркас ангару',
      summary: 'Проєктування вузлів та зварювання каркасної конструкції для ангару під складські потреби.',
      image: 'assets/images/work-hangar.svg',
      alt: 'Каркас металевого ангару',
      type: 'Каркас ангару',
      description: 'Створено просторовий каркас ангару з точним дотриманням монтажних допусків і геометрії.',
      details: 'Терміни: 24 дні. Особливості: посилені опори, стикові вузли під кранове навантаження.'
    },
    {
      id: 3,
      title: 'Несучі балки для будівлі',
      summary: 'Комплект несучих балок для комерційного об’єкта з перевіркою зварних швів.',
      image: 'assets/images/work-beams.svg',
      alt: 'Несучі металеві балки',
      type: 'Несучі балки',
      description: 'Виконано партію балок для реконструкції будівлі із поетапною поставкою на майданчик.',
      details: 'Терміни: 12 днів. Роботи: розкрій, складання, зварювання, контроль якості, маркування елементів.'
    },
    {
      id: 4,
      title: 'Металевий навіс',
      summary: 'Зварна конструкція навісу для вхідної групи та паркувальної зони.',
      image: 'assets/images/work-canopy.svg',
      alt: 'Металевий навіс з арковими елементами',
      type: 'Навіс та опори',
      description: 'Виготовлено каркас навісу з арковими елементами та стійким покриттям для зовнішнього середовища.',
      details: 'Терміни: 10 днів. Матеріал: профільна труба та листова сталь, підготовка до фарбування.'
    },
    {
      id: 5,
      title: 'Індивідуальна зварна конструкція',
      summary: 'Нестандартний виріб під технічне завдання замовника для виробничого процесу.',
      image: 'assets/images/work-custom.svg',
      alt: 'Індивідуальна зварна металева конструкція',
      type: 'Індивідуальне замовлення',
      description: 'Розроблено й виготовлено спеціальну конструкцію під конкретні умови експлуатації.',
      details: 'Терміни: 9 днів. Підхід: узгодження креслень, пробне складання, фінальне зварювання та перевірка.'
    }
  ];

  const worksGrid = document.getElementById('worksGrid');

  if (worksGrid) {
    function renderWorks() {
      worksGrid.innerHTML = worksData.map((work) => {
        return `
          <article class="work-card reveal">
            <img class="work-thumb" src="${work.image}" alt="${work.alt}" loading="lazy">
            <div class="work-content">
              <h3>${work.title}</h3>
              <p>${work.summary}</p>
              <button class="btn btn-secondary" type="button" data-work-id="${work.id}">Переглянути</button>
            </div>
          </article>
        `;
      }).join('');
    }

    renderWorks();

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
