/* ================= PulseFit Gym — Script ================= */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Hamburger / responsive nav menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // close menu when a link is clicked (mobile UX)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- 2. Sticky header shadow on scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 6px 20px rgba(0,0,0,0.35)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  /* ---------- 3. Accordion (FAQ / Services page) ---------- */
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(function (item) {
    const header = item.querySelector('.accordion-header');
    const panel = item.querySelector('.accordion-panel');

    header.addEventListener('click', function () {
      const isOpen = item.classList.contains('active');

      // close all other panels (single-open accordion)
      accordionItems.forEach(function (other) {
        other.classList.remove('active');
        other.querySelector('.accordion-panel').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- 4. Image slider / carousel (Home page hero) ---------- */
  const slider = document.querySelector('.slider');
  if (slider) {
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.slider-arrow.prev');
    const nextBtn = slider.querySelector('.slider-arrow.next');
    const dotsWrap = slider.querySelector('.slider-dots');
    let current = 0;
    let autoTimer;

    // build dots dynamically
    slides.forEach(function (_, i) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll('.dot');

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
    }

    function startAuto() {
      autoTimer = setInterval(function () { goTo(current + 1); }, 5000);
    }
    function stopAuto() { clearInterval(autoTimer); }

    nextBtn.addEventListener('click', function () { goTo(current + 1); stopAuto(); startAuto(); });
    prevBtn.addEventListener('click', function () { goTo(current - 1); stopAuto(); startAuto(); });

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    startAuto();
  }

  /* ---------- 5. Gallery filter + lightbox modal (Gallery page) ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const category = btn.dataset.filter;

      galleryItems.forEach(function (item) {
        const show = category === 'all' || item.dataset.category === category;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    const modalImg = modalOverlay.querySelector('img');
    const modalClose = modalOverlay.querySelector('.modal-close');

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const fullImg = item.querySelector('img').src;
        modalImg.src = fullImg;
        modalOverlay.classList.add('open');
      });
    });

    modalClose.addEventListener('click', function () { modalOverlay.classList.remove('open'); });
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') modalOverlay.classList.remove('open');
    });
  }

  /* ---------- 6. Contact form validation ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const successBox = document.querySelector('.form-success');

    function setError(group, show) {
      group.classList.toggle('invalid', show);
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function isValidPhone(value) {
      return value === '' || /^[0-9+\-\s()]{7,}$/.test(value);
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const phone = contactForm.querySelector('#phone');
      const message = contactForm.querySelector('#message');

      // name
      if (name.value.trim().length < 3) {
        setError(name.closest('.form-group'), true);
        valid = false;
      } else {
        setError(name.closest('.form-group'), false);
      }

      // email
      if (!isValidEmail(email.value.trim())) {
        setError(email.closest('.form-group'), true);
        valid = false;
      } else {
        setError(email.closest('.form-group'), false);
      }

      // phone (optional but must be valid format if filled)
      if (phone && !isValidPhone(phone.value.trim())) {
        setError(phone.closest('.form-group'), true);
        valid = false;
      } else if (phone) {
        setError(phone.closest('.form-group'), false);
      }

      // message
      if (message.value.trim().length < 10) {
        setError(message.closest('.form-group'), true);
        valid = false;
      } else {
        setError(message.closest('.form-group'), false);
      }

      if (valid) {
        successBox.classList.add('show');
        contactForm.reset();
        setTimeout(function () { successBox.classList.remove('show'); }, 5000);
      } else {
        successBox.classList.remove('show');
      }
    });

    // live validation as user types (clears error once fixed)
    ['name', 'email', 'phone', 'message'].forEach(function (id) {
      const field = document.getElementById(id);
      if (!field) return;
      field.addEventListener('input', function () {
        field.closest('.form-group').classList.remove('invalid');
      });
    });
  }

  /* ---------- 7. Active nav link highlight ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---------- 8. Scroll reveal animation ---------- */
  const revealEls = document.querySelectorAll('.card, .section-title, .hero-grid, .about-grid');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});
