// FAQ Section Interactivity
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Close all other questions
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current question
            question.setAttribute('aria-expanded', !isExpanded);
        });
    });
});

// Newsletter Form Validation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            // Here you would typically send the email to your server
            alert('Thank you for subscribing!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll Progress Indicator
window.addEventListener('scroll', function() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});

// Hero Showcase Functionality
document.addEventListener('DOMContentLoaded', function() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoRotateInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index) {
        showcaseItems.forEach(item => {
            item.classList.remove('active');
            item.setAttribute('aria-hidden', 'true');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
        });
        
        showcaseItems[index].classList.add('active');
        showcaseItems[index].setAttribute('aria-hidden', 'false');
        dots[index].classList.add('active');
        dots[index].setAttribute('aria-selected', 'true');
    }

    function startAutoRotate() {
        stopAutoRotate();
        autoRotateInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % showcaseItems.length;
            showSlide(currentIndex);
        }, 5000);
    }

    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
    }

    // Initialize first slide
    showSlide(currentIndex);
    startAutoRotate();

    // Click on dots to change slides
    dots.forEach((dot, index) => {
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.setAttribute('tabindex', '0');

        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
            startAutoRotate();
        });

        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentIndex = index;
                showSlide(currentIndex);
                startAutoRotate();
            }
        });
    });

    // Touch interactions
    const showcaseContainer = document.querySelector('.showcase-container');
    if (showcaseContainer) {
        showcaseContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoRotate();
        }, { passive: true });

        showcaseContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoRotate();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                currentIndex = (currentIndex + 1) % showcaseItems.length;
            } else {
                // Swipe right
                currentIndex = (currentIndex - 1 + showcaseItems.length) % showcaseItems.length;
            }
            showSlide(currentIndex);
        }
    }

    // Pause auto-rotate on hover
    showcaseContainer.addEventListener('mouseenter', stopAutoRotate);
    showcaseContainer.addEventListener('mouseleave', startAutoRotate);

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoRotate();
        } else {
            startAutoRotate();
        }
    });
}); 

// Mobile sidebar toggle
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');

menuToggle.addEventListener('click', () => {
  sidebar.classList.add('open');
  sidebar.setAttribute('aria-hidden', 'false');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebar.setAttribute('aria-hidden', 'true');
});

// --- Auto-scroll carousels ---
function setupAutoCarousel(selector, interval = 4000) {
    const container = document.querySelector(selector);
    if (!container) return;
    let scrollPos = 0;
    const cardWidth = container.querySelector('*').offsetWidth + 16; // gap
    setInterval(() => {
      scrollPos += cardWidth;
      if (scrollPos >= container.scrollWidth) scrollPos = 0;
      container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }, interval);
  }
  setupAutoCarousel('.stats-grid');
  setupAutoCarousel('.distraction-impact');
  
  // --- Hero stats count-up ---
  window.addEventListener('load', () => {
    const counters = document.querySelectorAll('.hero-stats .stat-value');
    counters.forEach(el => {
      const target = +el.textContent.replace(/[^0-9]/g, '');
      let count = 0;
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / target));
      const timer = setInterval(() => {
        count += 1;
        el.textContent = `${count}${el.textContent.replace(/\d/g, '')}`;
        if (count >= target) clearInterval(timer);
      }, stepTime);
    });
  });
  