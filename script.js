
// For production: Minify this JS for optimal performance.

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        // Initialize closed
        sidebar.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('sidebar-open');
        
        menuToggle.addEventListener('click', () => {
            const isHidden = sidebar.getAttribute('aria-hidden') === 'true';
            sidebar.setAttribute('aria-hidden', !isHidden);
            document.body.classList.toggle('sidebar-open', !isHidden);
        });
    }
});

// FAQ Section Interactivity
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length) {
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
    }
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

// Unified carousel logic
function initCarousels() {
    if (window.innerWidth > 820) return;
    
    const carousels = document.querySelectorAll('.stats-carousel-container, .impact-carousel-container, .carousel-container');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.stats-carousel, .impact-carousel, .carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentIndex = 0;
        let interval;
        
        function goToSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Auto-rotate every 5 seconds
        interval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        });
    });
}

// Initialize and handle resize
document.addEventListener('DOMContentLoaded', initCarousels);
window.addEventListener('resize', initCarousels);

// Initialize carousels for stats and impact sections
function initStatsCarousels() {
    const statsCarousel = document.querySelector('.stats-carousel');
    const impactCarousel = document.querySelector('.impact-carousel');
    
    // Clear any existing intervals
    if (window.statsCarouselInterval) clearInterval(window.statsCarouselInterval);
    if (window.impactCarouselInterval) clearInterval(window.impactCarouselInterval);
    
    // Only enable for mobile (<576px)
    if (window.innerWidth >= 576) {
        // Reset transforms if resizing from mobile to desktop
        if (statsCarousel) {
            const track = statsCarousel.querySelector('.carousel-track');
            track.style.transform = 'none';
        }
        if (impactCarousel) {
            const track = impactCarousel.querySelector('.carousel-track');
            track.style.transform = 'none';
        }
        return;
    }
    
    // Stats carousel
    if (statsCarousel) {
        const track = statsCarousel.querySelector('.carousel-track');
        const slides = statsCarousel.querySelectorAll('.carousel-slide');
        let currentIndex = 0;
        
        function goToSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Auto-rotate every 5 seconds
        window.statsCarouselInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }
    
    // Impact carousel
    if (impactCarousel) {
        const track = impactCarousel.querySelector('.carousel-track');
        const slides = impactCarousel.querySelectorAll('.carousel-slide');
        let currentIndex = 0;
        
        function goToSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Auto-rotate every 5 seconds
        window.impactCarouselInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }
}

// Initialize on load and resize
document.addEventListener('DOMContentLoaded', function() {
    initStatsCarousels();
    window.addEventListener('resize', initStatsCarousels);
});
