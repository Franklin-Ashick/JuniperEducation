// Premium Tower House School JavaScript

// Advanced Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.remove('light-theme');
    body.classList.add(currentTheme);
    updateThemeIcon(currentTheme);
}

themeToggle?.addEventListener('click', function() {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
        updateThemeIcon('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        updateThemeIcon('dark-theme');
    }
});

function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('i');
    if (icon) {
        if (theme === 'dark-theme') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Advanced Navigation Scroll Effect
let lastScrollY = window.scrollY;
const nav = document.querySelector('.premium-nav');

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    if (nav) {
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.25)';
            nav.style.backdropFilter = 'blur(16px)';
            nav.style.boxShadow = 'none';
        }
        
        // Hide/show nav on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollY = currentScrollY;
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileClose = document.querySelector('.mobile-close');

mobileMenuToggle?.addEventListener('click', function() {
    mobileMenuOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
});

mobileClose?.addEventListener('click', function() {
    mobileMenuOverlay?.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking outside
mobileMenuOverlay?.addEventListener('click', function(e) {
    if (e.target === mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            mobileMenuOverlay?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animated Counter for Stats
function animateCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animation
            if (entry.target.classList.contains('hero-stats') || 
                entry.target.classList.contains('excellence-grid')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.hero-stats, .about-grid, .excellence-grid, .journey-stages').forEach(el => {
    observer.observe(el);
});

// Academic Showcase Tabs
const showcaseTabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

showcaseTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const target = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        showcaseTabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        document.getElementById(target)?.classList.add('active');
    });
});

// Excellence Cards Interactive
const excellenceCards = document.querySelectorAll('.excellence-card');
const showcaseTitle = document.getElementById('showcaseTitle');
const showcaseDescription = document.getElementById('showcaseDescription');

const showcaseData = {
    academic: {
        title: 'Academic Achievement',
        description: 'Outstanding academic results with pupils consistently exceeding national averages in all key subjects and achieving remarkable success rates.'
    },
    sports: {
        title: 'Sports Excellence',
        description: 'Comprehensive sports program developing fitness, teamwork, and competitive spirit across all age groups with championship-winning teams.'
    },
    arts: {
        title: 'Creative Arts Excellence',
        description: 'Rich creative program fostering artistic expression, cultural appreciation, and performance confidence through concerts and productions.'
    },
    facilities: {
        title: 'Modern Facilities',
        description: 'State-of-the-art facilities supporting innovative teaching and immersive learning experiences across all subject areas.'
    }
};

excellenceCards.forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Remove active class from all cards
        excellenceCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        this.classList.add('active');
        
        // Update showcase content
        if (showcaseData[category]) {
            showcaseTitle.textContent = showcaseData[category].title;
            showcaseDescription.textContent = showcaseData[category].description;
        }
    });
});

// Form Enhancement
const premiumForm = document.querySelector('.premium-form');
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    // Add focus and blur effects
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on load
    if (input.value !== '') {
        input.parentElement.classList.add('focused');
    }
});

premiumForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('.btn-form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--gradient-accent)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            this.reset();
            
            // Remove focused class from all form groups
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('focused');
            });
        }, 2000);
    }, 1500);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements .float-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Advanced Hover Effects with GSAP-like animations
function createHoverAnimation(element, scale = 1.05, duration = 0.3) {
    element.addEventListener('mouseenter', function() {
        this.style.transition = `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`;
        this.style.transform = `scale(${scale}) translateZ(0)`;
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateZ(0)';
    });
}

// Apply hover animations to cards
document.querySelectorAll('.feature-card, .excellence-card, .info-card').forEach(card => {
    createHoverAnimation(card, 1.03);
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn?.classList.add('visible');
    } else {
        backToTopBtn?.classList.remove('visible');
    }
});

backToTopBtn?.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Video Background Controls
const heroVideo = document.querySelector('.hero-video-bg video');
const videoToggle = document.querySelector('.btn-hero-video');

videoToggle?.addEventListener('click', function() {
    if (heroVideo) {
        if (heroVideo.paused) {
            heroVideo.play();
            this.querySelector('i').className = 'fas fa-pause';
        } else {
            heroVideo.pause();
            this.querySelector('i').className = 'fas fa-play';
        }
    }
});

// Advanced Scroll Reveal Animations
const scrollElements = document.querySelectorAll('.feature-card, .stage-card, .excellence-card');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const hideScrollElement = (element) => {
    element.classList.remove('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimation();
    
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .scrolled {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Advanced Page Transitions
function createPageTransition() {
    const transitionOverlay = document.createElement('div');
    transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.5s ease-in-out;
    `;
    document.body.appendChild(transitionOverlay);
    
    return transitionOverlay;
}

// Performance optimization
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Throttle scroll events for better performance
window.addEventListener('scroll', throttle(function() {
    // Your scroll event handlers here
}, 16)); // ~60fps 