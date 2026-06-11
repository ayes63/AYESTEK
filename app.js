document.addEventListener('DOMContentLoaded', () => {

  /* --- MOUSE FOLLOW GLOW EFFECT --- */
  const mouseGlow = document.getElementById('mouse-glow');
  if (mouseGlow) {
    document.addEventListener('mousemove', (e) => {
      mouseGlow.style.left = `${e.clientX}px`;
      mouseGlow.style.top = `${e.clientY}px`;
      mouseGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      mouseGlow.style.opacity = '0';
    });
  }

  /* --- MULTI-LINE TYPING EFFECT --- */
  const typedTextSpan = document.getElementById('typed-text');
  const roles = [
    "Güvenlik Kamera & Alarm Sistemleri",
    "Akıllı Ev & Cihaz Entegrasyonları",
    "Kişisel & Kurumsal Web Tasarımları",
    "Özel Otomasyon & Yazılım Çözümleri",
    "Plaka Tanıma & Stok Takip Sistemleri"
  ];
  const typingSpeed = 100;
  const erasingSpeed = 60;
  const newRoleDelay = 2000; // Delay between roles
  let roleIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < roles[roleIndex].length) {
      typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newRoleDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, typingSpeed + 500);
    }
  }

  if (typedTextSpan) {
    setTimeout(type, 1000);
  }

  /* --- MOBILE MENU TOGGLE --- */
  const menuBtn = document.getElementById('menu-btn');
  const navbar = document.getElementById('navbar');

  if (menuBtn && navbar) {
    menuBtn.addEventListener('click', () => {
      navbar.classList.toggle('open');
      
      // Toggle menu icon between burger and close
      const isOpen = navbar.classList.contains('open');
      menuBtn.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
           </svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
           </svg>`;
    });

    // Close menu when a link is clicked
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('open');
        menuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
           </svg>`;
      });
    });
  }

  /* --- HEADER SCROLL ACTION --- */
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* --- SCROLL REVEAL (Intersection Observer) --- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep performance high
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- PORTFOLIO DYNAMIC FILTER --- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons and add to clicked
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        // Fade out
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        setTimeout(() => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
            // Trigger browser reflow to enable fade in
            card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  /* --- ACTIVE NAV INDICATOR ON SCROLL --- */
  const sections = document.querySelectorAll('.id-reveal, .hero');
  const navAnchorLinks = document.querySelectorAll('nav ul a');

  window.addEventListener('scroll', () => {
    let currentSectionId = 'home';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navAnchorLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  /* --- CONTACT FORM FEEDBACK --- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      // Show loading feedback
      submitBtn.innerHTML = `Gönderiliyor... <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="rotating"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v4"></path></svg>`;
      submitBtn.style.pointerEvents = 'none';
      submitBtn.style.opacity = '0.7';

      // Send form data to Netlify Forms via AJAX
      const formData = new FormData(contactForm);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
      .then(() => {
        submitBtn.innerHTML = `Başarıyla Gönderildi! ✓`;
        submitBtn.style.background = 'linear-gradient(135deg, #00ff64, #00b050)';
        submitBtn.style.boxShadow = '0 8px 24px rgba(0, 255, 100, 0.3)';
        
        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.boxShadow = '';
          submitBtn.style.pointerEvents = 'auto';
          submitBtn.style.opacity = '1';
        }, 3000);
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        submitBtn.innerHTML = `Hata Oluştu! ✗`;
        submitBtn.style.background = 'linear-gradient(135deg, #ff4e50, #f9d423)';
        submitBtn.style.boxShadow = '0 8px 24px rgba(255, 78, 80, 0.3)';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.boxShadow = '';
          submitBtn.style.pointerEvents = 'auto';
          submitBtn.style.opacity = '1';
        }, 3000);
      });
    });
  }

  /* --- DARK/LIGHT THEME MANAGER --- */
  const themeBtn = document.getElementById('theme-btn');
  const storedTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeBtn) return;
    if (theme === 'light') {
      themeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      themeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }

});
