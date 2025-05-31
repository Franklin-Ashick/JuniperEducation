// Menu functionality
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const slideMenu = document.querySelector('.slide-menu');
const mainMenu = document.getElementById('mainMenu');
const menuItems = mainMenu.querySelectorAll('li');

// Open menu when hamburger/menu button is clicked
menuBtn.addEventListener('click', () => {
    slideMenu.classList.add('open');
});

// Close menu when close button is clicked
closeBtn.addEventListener('click', () => {
    slideMenu.classList.remove('open');
    // Reset submenus when closing
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.classList.remove('active');
    });
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
});

// Handle submenu interactions
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const submenuId = item.getAttribute('data-submenu');
        if (submenuId) {
            // Remove active class from all menu items
            menuItems.forEach(mi => mi.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            // Hide all submenus
            document.querySelectorAll('.submenu').forEach(submenu => {
                submenu.classList.remove('active');
            });
            // Show the clicked submenu
            document.getElementById(submenuId).classList.add('active');
        }
    });
});

// Smooth scroll functionality for "DISCOVER MORE" button
document.addEventListener('DOMContentLoaded', () => {
    const discoverBtn = document.querySelector('.btn .fa-chevron-down');
    if (discoverBtn) {
        discoverBtn.closest('.btn').addEventListener('click', () => {
            const welcomeSection = document.querySelector('.welcome-section');
            if (welcomeSection) {
                welcomeSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Close menu when clicking outside of it
document.addEventListener('click', (e) => {
    if (!slideMenu.contains(e.target) && !menuBtn.contains(e.target) && slideMenu.classList.contains('open')) {
        slideMenu.classList.remove('open');
        // Reset submenus when closing
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.remove('active');
        });
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Handle escape key to close menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && slideMenu.classList.contains('open')) {
        slideMenu.classList.remove('open');
        // Reset submenus when closing
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.remove('active');
        });
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = [
        {
            title: "Small & Personal",
            content: "It's key to our philosophy. For us, small defines all of the values that are sometimes lost in larger establishments. Small gives us the time for individuals and a personal touch. We foster an independent spirit without losing the essentials of cooperation and partnership. Small is simply a kinder and more forward thinking approach. Small is what we are, but it does not limit us.",
            image: "assets/students-posing-bench-with-laptop.png"
        },
        {
            title: "Innovative Learning",
            content: "Our cutting-edge approach to education combines traditional values with modern teaching methods. We believe in fostering creativity and critical thinking in every student, preparing them for the challenges of tomorrow while maintaining the highest academic standards.",
            image: "assets/students-posing-bench-with-laptop.png"
        },
        {
            title: "Supportive Community",
            content: "At Tower House, we pride ourselves on creating a warm, inclusive environment where every boy feels valued and supported. Our dedicated staff work closely with families to ensure each student reaches their full potential both academically and personally.",
            image: "assets/students-posing-bench-with-laptop.png"
        },
        {
            title: "Excellence in All",
            content: "From academics to sports, arts to leadership, we encourage our students to pursue excellence in all their endeavors. Our comprehensive program ensures well-rounded development and prepares students for success in all aspects of life.",
            image: "assets/students-posing-bench-with-laptop.png"
        }
    ];

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Get DOM elements
    const titleElement = document.querySelector('.about-content h2');
    const contentElement = document.querySelector('.about-content p');
    const imageElement = document.querySelector('.about-image img');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');

    // Update slide content
    function updateSlide(index) {
        if (titleElement) titleElement.textContent = slides[index].title;
        if (contentElement) contentElement.textContent = slides[index].content;
        if (imageElement) imageElement.src = slides[index].image;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide(currentSlide);
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide(currentSlide);
    }

    // Event listeners
    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });

    // LEARN MORE button functionality
    const learnMoreBtn = document.querySelector('.learn-more');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            // Add your learn more functionality here
            console.log('Learn more about:', slides[currentSlide].title);
            // Example: scroll to next section or open modal
            const nextSection = document.querySelector('.isi-report-section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Auto-play slider (optional)
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
});

// Menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const slideMenu = document.querySelector('.slide-menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuLinks = document.querySelectorAll('.menu-links > li');
    const submenus = document.querySelectorAll('.submenu');

    // Toggle menu
    function toggleMenu() {
        slideMenu.classList.toggle('open');
    }

    // Close menu
    function closeMenu() {
        slideMenu.classList.remove('open');
    }

    // Handle submenu
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            menuLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Hide all submenus
            submenus.forEach(submenu => submenu.classList.remove('active'));

            // Show corresponding submenu if it exists
            const submenuId = this.getAttribute('data-submenu');
            if (submenuId) {
                const targetSubmenu = document.getElementById(submenuId);
                if (targetSubmenu) {
                    targetSubmenu.classList.add('active');
                }
            }
        });
    });

    // Event listeners
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
}); 