// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const slideMenu = document.querySelector('.slide-menu');
    const mainMenu = document.getElementById('mainMenu');
    const menuItems = mainMenu ? mainMenu.querySelectorAll('li') : [];

    // Open menu when hamburger/menu button is clicked
    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            slideMenu.classList.add('open');
        });
    }

    // Close menu when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
        });
    }

    // Close menu function
    function closeMenu() {
        slideMenu.classList.remove('open');
        // Reset submenus when closing
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.remove('active');
        });
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
    }

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
                const targetSubmenu = document.getElementById(submenuId);
                if (targetSubmenu) {
                    targetSubmenu.classList.add('active');
                }
            }
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (slideMenu && !slideMenu.contains(e.target) && !menuBtn.contains(e.target) && slideMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    // Handle escape key to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && slideMenu && slideMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    // Smooth scroll functionality for "DISCOVER MORE" button
    const discoverBtn = document.querySelector('.btn .fa-chevron-down');
    if (discoverBtn) {
        discoverBtn.closest('.btn').addEventListener('click', () => {
            const welcomeSection = document.querySelector('.welcome-section');
            if (welcomeSection) {
                welcomeSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Slider functionality
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

    // Get DOM elements for slider
    const titleElement = document.querySelector('.about-content h2');
    const contentElement = document.querySelector('.about-content p');
    const imageElement = document.querySelector('.about-image img');
    const dots = document.querySelectorAll('.special-section .dot');
    const prevButton = document.querySelector('.about-content-slider .slider-nav.prev');
    const nextButton = document.querySelector('.about-content-slider .slider-nav.next');

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

    // Event listeners for slider
    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });

    // Numbers Section Functionality
    const numbersStats = {
        achievement: {
            number: "98%",
            description: "Students achieve their<br>target grades or above",
            image: "assets/students-stairs-university.jpg"
        },
        sport: {
            number: "15",
            description: "Different sports offered<br>throughout the year",
            image: "assets/confident-young-man-with-backpack.jpg"
        },
        concerts: {
            number: "4",
            description: "Concerts to be held<br>at school this year",
            image: "assets/student-leaving-school-after-classes.jpg"
        },
        location: {
            number: "2",
            description: "Minutes walk from<br>Richmond Station",
            image: "assets/students-outside-university.jpg"
        },
        facilities: {
            number: "25",
            description: "State-of-the-art<br>facilities available",
            image: "assets/youngsters-with-notepads.jpg"
        }
    };

    let currentNumbersStat = 'concerts'; // Default to concerts as shown in image
    const statCards = document.querySelectorAll('.stat-card');
    const numbersDots = document.querySelectorAll('.numbers-section .dot');
    const numbersNavPrev = document.querySelector('.numbers-section .slider-nav.prev');
    const numbersNavNext = document.querySelector('.numbers-section .slider-nav.next');
    const statNumber = document.getElementById('stat-number');
    const statDescription = document.getElementById('stat-description');
    const mainCategoryImage = document.getElementById('main-category-image');

    // Update numbers display
    function updateNumbersDisplay(statType) {
        if (numbersStats[statType] && statNumber && statDescription) {
            statNumber.textContent = numbersStats[statType].number;
            statDescription.innerHTML = numbersStats[statType].description;
            
            // Update the main image
            if (mainCategoryImage) {
                mainCategoryImage.src = numbersStats[statType].image;
                mainCategoryImage.alt = `${statType} at Tower House School`;
            }
        }

        // Update active states
        statCards.forEach(card => {
            card.classList.toggle('active', card.getAttribute('data-stat') === statType);
        });

        numbersDots.forEach(dot => {
            dot.classList.toggle('active', dot.getAttribute('data-stat') === statType);
        });

        currentNumbersStat = statType;
    }

    // Stat card click handlers
    statCards.forEach(card => {
        card.addEventListener('click', () => {
            const statType = card.getAttribute('data-stat');
            updateNumbersDisplay(statType);
        });
    });

    // Numbers dots click handlers
    numbersDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const statType = dot.getAttribute('data-stat');
            updateNumbersDisplay(statType);
        });
    });

    // Numbers navigation functionality
    const statsOrder = ['achievement', 'sport', 'concerts', 'location', 'facilities'];
    
    function getNextStat() {
        const currentIndex = statsOrder.indexOf(currentNumbersStat);
        return statsOrder[(currentIndex + 1) % statsOrder.length];
    }

    function getPrevStat() {
        const currentIndex = statsOrder.indexOf(currentNumbersStat);
        return statsOrder[(currentIndex - 1 + statsOrder.length) % statsOrder.length];
    }

    if (numbersNavNext) {
        numbersNavNext.addEventListener('click', () => {
            updateNumbersDisplay(getNextStat());
        });
    }

    if (numbersNavPrev) {
        numbersNavPrev.addEventListener('click', () => {
            updateNumbersDisplay(getPrevStat());
        });
    }

    // LEARN MORE button functionality
    const learnMoreBtn = document.querySelector('.learn-more');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            console.log('Learn more about:', slides[currentSlide].title);
            // Scroll to numbers section
            const numbersSection = document.querySelector('.numbers-section');
            if (numbersSection) {
                numbersSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Auto-play slider (optional - uncomment next line to enable)
    // setInterval(nextSlide, 5000); // Change slide every 5 seconds
}); 