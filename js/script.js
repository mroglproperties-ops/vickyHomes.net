document.addEventListener('DOMContentLoaded', function() {
  // Slideshow functionality
  const slideshowContainer = document.querySelector('.slideshow-container');
  const heroBanner = document.querySelector('.hero-banner');

  if (slideshowContainer && heroBanner) {
    const originalImages = Array.from(slideshowContainer.querySelectorAll('img'));
    const totalOriginalImages = originalImages.length;

    // Clone all images and append to both ends for seamless infinite loop
    originalImages.forEach(img => {
      const cloneAfter = img.cloneNode(true);
      slideshowContainer.appendChild(cloneAfter);
    });

    originalImages.forEach(img => {
      const cloneBefore = img.cloneNode(true);
      slideshowContainer.insertBefore(cloneBefore, slideshowContainer.firstChild);
    });

    // Start at the first real image (after prepended clones)
    let currentIndex = totalOriginalImages;
    const allImages = slideshowContainer.querySelectorAll('img');

    function updateSlidePosition(noTransition = false) {
      const slideWidth = allImages[0].offsetWidth + 20;
      slideshowContainer.style.transition = noTransition ? 'none' : 'transform 0.3s ease-in-out';
      slideshowContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function checkInfiniteLoop() {
      if (currentIndex >= totalOriginalImages * 2) {
        currentIndex = totalOriginalImages;
        setTimeout(() => updateSlidePosition(true), 300);
      } else if (currentIndex < totalOriginalImages) {
        currentIndex = totalOriginalImages * 2 - 1;
        setTimeout(() => updateSlidePosition(true), 300);
      }
    }

    heroBanner.addEventListener('click', function(e) {
      const containerRect = heroBanner.getBoundingClientRect();
      const clickX = e.clientX - containerRect.left;
      const containerWidth = containerRect.width;
      const edgeThreshold = containerWidth * 0.2;

      if (clickX < edgeThreshold) {
        currentIndex--;
        updateSlidePosition();
        checkInfiniteLoop();
      } else if (clickX > containerWidth - edgeThreshold) {
        currentIndex++;
        updateSlidePosition();
        checkInfiniteLoop();
      }
    });

    heroBanner.addEventListener('mousemove', function(e) {
      const containerRect = heroBanner.getBoundingClientRect();
      const clickX = e.clientX - containerRect.left;
      const containerWidth = containerRect.width;
      const edgeThreshold = containerWidth * 0.2;

      heroBanner.style.cursor = (clickX < edgeThreshold || clickX > containerWidth - edgeThreshold) ? 'pointer' : 'default';
    });

    setInterval(function() {
      currentIndex++;
      updateSlidePosition();
      checkInfiniteLoop();
    }, 5000);

    updateSlidePosition(true);
    window.addEventListener('resize', () => updateSlidePosition(true));
  }

  // Mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');

      const spans = this.querySelectorAll('span');
      if (nav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768 && menuToggle) {
        nav.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
          span.style.transform = 'none';
          span.style.opacity = '1';
        });
      }
    });
  });

  // Set active navigation link
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'home.html')) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
