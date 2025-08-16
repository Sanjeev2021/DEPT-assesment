// FOODZ Website - Vanilla JavaScript
// Performance optimized and accessible

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Performance optimization: Use passive event listeners
    const passiveSupported = (() => {
        let passive = false;
        try {
            const options = Object.defineProperty({}, 'passive', {
                get: function() {
                    passive = true;
                    return true;
                }
            });
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (e) {
            // Passive listeners not supported
        }
        return passive;
    })();

    // Performance optimization: Debounce function
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Performance optimization: Throttle function
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

    document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".offers-container");
  const prevBtn = document.querySelector(".nav-prev");
  const nextBtn = document.querySelector(".nav-next");

  // Width of one card (including margin if any)
  const card = document.querySelector(".offer-card");
  const cardStyle = getComputedStyle(card);
  const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight);

  let scrollAmount = 0;

  nextBtn.addEventListener("click", () => {
    container.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    container.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });
});

    // Smooth scrolling for navigation links
    const initSmoothScrolling = () => {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active navigation state
                    updateActiveNavigation(targetId);
                }
            });
        });
    };

    // Update active navigation based on scroll position
    const updateActiveNavigation = (sectionId) => {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
        }
    };

    // Header scroll effect
    const initHeaderScroll = () => {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        const handleScroll = throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Update active navigation based on scroll position
            updateActiveNavigationOnScroll();
            
            lastScrollTop = scrollTop;
        }, 16); // ~60fps
        
        // Use passive listener for better performance
        window.addEventListener('scroll', handleScroll, passiveSupported ? { passive: true } : false);
    };

    // Update active navigation based on scroll position
    const updateActiveNavigationOnScroll = () => {
        const sections = ['hero', 'offers', 'chef', 'contact'];
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        let currentSection = 'hero';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop - headerHeight - 100; // Offset for better detection
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                    currentSection = sectionId;
                }
            }
        });
        
        updateActiveNavigation(currentSection);
    };

    // Button click animations
    const initButtonAnimations = () => {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    };

    // Statistics counter animation
    const initStatsAnimation = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element, target, duration = 2000) => {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + '+';
            }, 16);
        };
        
        // Intersection Observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const number = entry.target;
                    const targetValue = parseInt(number.textContent);
                    animateCounter(number, targetValue);
                    observer.unobserve(number);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(number => {
            observer.observe(number);
        });
    };

    // Mobile Hamburger Menu
    const initMobileMenu = () => {
        console.log('Initializing mobile menu...');
        
        const hamburgerBtn = document.querySelector('.hamburger-menu');
        const mobileOverlay = document.querySelector('.mobile-nav-overlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        const mobileNavClose = document.querySelector('.mobile-nav-close');
        
        console.log('Mobile menu elements found:', { 
            hamburgerBtn: !!hamburgerBtn, 
            mobileOverlay: !!mobileOverlay, 
            mobileNavLinksCount: mobileNavLinks.length,
            mobileNavClose: !!mobileNavClose
        });
        
        if (!hamburgerBtn || !mobileOverlay) {
            console.log('Mobile menu elements not found:', { hamburgerBtn, mobileOverlay });
            return;
        }
        
        // Toggle mobile menu
        const toggleMobileMenu = (open = true) => {
            const isOpen = mobileOverlay.classList.contains('active');
            
            if (open && !isOpen) {
                // Opening menu
                console.log('Opening mobile menu...');
                mobileOverlay.classList.add('active');
                hamburgerBtn.classList.add('active');
                hamburgerBtn.setAttribute('aria-expanded', 'true');
                mobileOverlay.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                document.body.classList.add('mobile-nav-open');
                
                // Add entrance animation class - now slides up from bottom
                mobileOverlay.style.transform = 'translateY(0)';
                
                // Debug: Check if content is visible
                setTimeout(() => {
                    const mobileNav = document.querySelector('.mobile-navigation');
                    const mobileList = document.querySelector('.mobile-nav-list');
                    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
                    const overlay = document.querySelector('.mobile-nav-overlay');
                    
                    console.log('Mobile navigation debug:', {
                        mobileNav: mobileNav,
                        mobileList: mobileList,
                        mobileLinksCount: mobileLinks.length,
                        mobileNavDisplay: mobileNav ? getComputedStyle(mobileNav).display : 'not found',
                        mobileNavOpacity: mobileNav ? getComputedStyle(mobileNav).opacity : 'not found',
                        mobileNavVisibility: mobileNav ? getComputedStyle(mobileNav).visibility : 'not found',
                        mobileNavZIndex: mobileNav ? getComputedStyle(mobileNav).zIndex : 'not found',
                        overlayClasses: overlay ? overlay.className : 'not found',
                        overlayDisplay: overlay ? getComputedStyle(overlay).display : 'not found',
                        overlayOpacity: overlay ? getComputedStyle(overlay).opacity : 'not found',
                        overlayVisibility: overlay ? getComputedStyle(overlay).visibility : 'not found',
                        overlayZIndex: overlay ? getComputedStyle(overlay).zIndex : 'not found',
                        overlayTransform: overlay ? getComputedStyle(overlay).transform : 'not found'
                    });
                }, 100);
            } else if (!open && isOpen) {
                // Closing menu
                console.log('Closing mobile menu...');
                mobileOverlay.classList.remove('active');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                mobileOverlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto';
                document.body.classList.remove('mobile-nav-open');
                
                // Add exit animation - now slides down to bottom
                mobileOverlay.style.transform = 'translateY(100%)';
            }
        };
        
        // Event listeners
        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger button clicked');
            toggleMobileMenu(true);
        });
        
        // Close button functionality
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                toggleMobileMenu(false);
            });
        }
        
        // Close menu when clicking on navigation links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Mobile nav link clicked:', link.textContent);
                
                // Update active state
                mobileNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close menu with animation
                toggleMobileMenu(false);
                
                // Smooth scroll to section if it's a hash link
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        setTimeout(() => {
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }, 500); // Wait for menu close animation
                    }
                }
            });
        });
        
        // Close menu when clicking outside
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                console.log('Clicked outside mobile menu, closing...');
                toggleMobileMenu(false);
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                console.log('Escape key pressed, closing mobile menu...');
                toggleMobileMenu(false);
            }
        });
        
        // Close menu on window resize (if switching from mobile to desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileOverlay.classList.contains('active')) {
                console.log('Window resized to desktop, closing mobile menu...');
                toggleMobileMenu(false);
            }
        });
        
        // Prevent body scroll when menu is open
        const preventScroll = (e) => {
            if (mobileOverlay.classList.contains('active')) {
                e.preventDefault();
            }
        };
        
        // Add touch event prevention for iOS
        document.addEventListener('touchmove', preventScroll, { passive: false });
        
        console.log('Mobile menu initialized successfully!');
    };

    // Initialize mobile menu
    initMobileMenu();

    // Form validation for contact forms (if added later)
    const initFormValidation = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        // Remove error class after user starts typing
                        field.addEventListener('input', function() {
                            this.classList.remove('error');
                        }, { once: true });
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    // Focus first error field
                    const firstError = form.querySelector('.error');
                    if (firstError) {
                        firstError.focus();
                    }
                }
            });
        });
    };

    // Lazy loading for images (if added later)
    const initLazyLoading = () => {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    };

    // Performance monitoring
    const initPerformanceMonitoring = () => {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                        console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
                    }
                }, 0);
            });
        }
    };

    // Order form functionality
    const initOrderForm = () => {
        const orderForm = document.querySelector('.order-form');
        const mealSelect = document.getElementById('meal-select');
        const addMealBtn = document.querySelector('.add-meal-btn');
        const totalPayment = document.querySelector('.payment-amount');
        
        if (!orderForm) return;

        // Meal prices
        const mealPrices = {
            'gimbap': 12.99,
            'korea-bbq': 21.99,
            'kimchi': 6.99,
            'sushi': 18.99,
            'ramen': 15.99
        };

        // Update total payment when meal is selected
        const updateTotal = () => {
            const selectedMeal = mealSelect.value;
            if (selectedMeal && mealPrices[selectedMeal]) {
                totalPayment.textContent = `$${mealPrices[selectedMeal].toFixed(2)}`;
            } else {
                totalPayment.textContent = '$0.00';
            }
        };

        // Add meal button functionality
        if (addMealBtn) {
            addMealBtn.addEventListener('click', () => {
                // Create a new meal selection group
                const newMealGroup = document.createElement('div');
                newMealGroup.className = 'form-group';
                newMealGroup.innerHTML = `
                    <label class="form-label">Additional Meal</label>
                    <div class="meal-selection-container">
                        <select name="additionalMeal" class="form-select" required>
                            <option value="" disabled selected>What's your Taste?</option>
                            <option value="gimbap">Gimbap</option>
                            <option value="korea-bbq">Korea BBQ</option>
                            <option value="kimchi">Kimchi</option>
                            <option value="sushi">Sushi</option>
                            <option value="ramen">Ramen</option>
                        </select>
                        <button type="button" class="remove-meal-btn" style="color: #dc3545; background: none; border: none; font-weight: 600; cursor: pointer;">Remove</button>
                    </div>
                `;

                // Insert before the order name field
                const orderNameField = document.querySelector('[for="order-name"]').closest('.form-group');
                orderNameField.parentNode.insertBefore(newMealGroup, orderNameField);

                // Add remove functionality
                const removeBtn = newMealGroup.querySelector('.remove-meal-btn');
                removeBtn.addEventListener('click', () => {
                    newMealGroup.remove();
                    updateTotal();
                });

                // Add change listener for new meal
                const newMealSelect = newMealGroup.querySelector('select');
                newMealSelect.addEventListener('change', updateTotal);
            });
        }

        // Form submission
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(orderForm);
            const orderData = Object.fromEntries(formData.entries());
            
            // Validate required fields
            const requiredFields = ['meal', 'orderName', 'phoneNumber', 'address', 'paymentMethod'];
            const missingFields = requiredFields.filter(field => !orderData[field]);
            
            if (missingFields.length > 0) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate order submission
            const submitBtn = orderForm.querySelector('.order-submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Order submitted successfully! We will contact you soon.');
                orderForm.reset();
                totalPayment.textContent = '$0.00';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove additional meal fields
                const additionalMeals = orderForm.querySelectorAll('.form-group:not(:first-child)');
                additionalMeals.forEach(meal => {
                    if (meal.querySelector('.remove-meal-btn')) {
                        meal.remove();
                    }
                });
            }, 2000);
        });

        // Initialize total
        updateTotal();
        
        // Add change listener for main meal select
        mealSelect.addEventListener('change', updateTotal);
    };

    // Special Offers Carousel
    const initOffersCarousel = () => {
        console.log('Initializing offers carousel...');
        
        const offersContainer = document.querySelector('.offers-carousel .offers-container');
        const prevBtn = document.querySelector('.carousel-navigation .nav-prev');
        const nextBtn = document.querySelector('.carousel-navigation .nav-next');
        
        console.log('Carousel elements found:', { 
            offersContainer: !!offersContainer, 
            prevBtn: !!prevBtn, 
            nextBtn: !!nextBtn 
        });
        
        if (!offersContainer || !prevBtn || !nextBtn) {
            console.log('Carousel elements not found:', { offersContainer, prevBtn, nextBtn });
            return;
        }
        
        // Calculate card width dynamically based on screen size
        const getCardWidth = () => {
            if (window.innerWidth <= 480) {
                return 280 + 20; // card width + gap
            } else if (window.innerWidth <= 768) {
                return 320 + 30; // card width + gap
            } else {
                return 350 + 40; // card width + gap
            }
        };
        
        let cardWidth = getCardWidth();
        let currentPosition = 0;
        const maxPosition = offersContainer.children.length - 1;
        
        console.log('Carousel setup:', { cardWidth, maxPosition, totalCards: offersContainer.children.length });
        
        // Update card width on window resize
        const updateCardWidth = () => {
            cardWidth = getCardWidth();
            console.log('Card width updated:', cardWidth);
        };
        
        window.addEventListener('resize', debounce(updateCardWidth, 250));
        
        const updateNavigation = () => {
            prevBtn.style.opacity = currentPosition === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentPosition === maxPosition ? '0.5' : '1';
            
            prevBtn.disabled = currentPosition === 0;
            nextBtn.disabled = currentPosition === maxPosition;
        };
        
        const scrollToPosition = (position) => {
            currentPosition = Math.max(0, Math.min(position, maxPosition));
            const scrollAmount = currentPosition * cardWidth;
            
            console.log('Scrolling carousel to position:', { position: currentPosition, scrollAmount });
            
            offersContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            
            updateNavigation();
        };
        
        // Event listeners for navigation arrows
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Previous button clicked, current position:', currentPosition);
            if (currentPosition > 0) {
                scrollToPosition(currentPosition - 1);
            }
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Next button clicked, current position:', currentPosition);
            if (currentPosition < maxPosition) {
                scrollToPosition(currentPosition + 1);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentPosition > 0) {
                e.preventDefault();
                scrollToPosition(currentPosition - 1);
            } else if (e.key === 'ArrowRight' && currentPosition < maxPosition) {
                e.preventDefault();
                scrollToPosition(currentPosition + 1);
            }
        });
        
        // Touch/swipe support for mobile - Improved version
        let startX = 0;
        let endX = 0;
        let isDragging = false;
        
        // Touch events
        offersContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            console.log('Touch start:', startX);
        }, { passive: true });
        
        offersContainer.addEventListener('touchmove', (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        }, { passive: false });
        
        offersContainer.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            console.log('Touch end:', { startX, endX, diff });
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0 && currentPosition < maxPosition) {
                    // Swipe left - go to next
                    console.log('Swipe left detected, going to next');
                    scrollToPosition(currentPosition + 1);
                } else if (diff < 0 && currentPosition > 0) {
                    // Swipe right - go to previous
                    console.log('Swipe right detected, going to previous');
                    scrollToPosition(currentPosition - 1);
                }
            }
            
            isDragging = false;
        }, { passive: true });
        
        // Mouse events for desktop
        let mouseStartX = 0;
        let mouseEndX = 0;
        let isMouseDragging = false;
        
        offersContainer.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isMouseDragging = true;
            offersContainer.style.cursor = 'grabbing';
        });
        
        offersContainer.addEventListener('mousemove', (e) => {
            if (isMouseDragging) {
                e.preventDefault();
            }
        });
        
        offersContainer.addEventListener('mouseup', (e) => {
            if (!isMouseDragging) return;
            
            mouseEndX = e.clientX;
            const diff = mouseStartX - mouseEndX;
            
            if (Math.abs(diff) > 50) { // Minimum drag distance
                if (diff > 0 && currentPosition < maxPosition) {
                    // Drag left - go to next
                    scrollToPosition(currentPosition + 1);
                } else if (diff < 0 && currentPosition > 0) {
                    // Drag right - go to previous
                    scrollToPosition(currentPosition - 1);
                }
            }
            
            isMouseDragging = false;
            offersContainer.style.cursor = 'grab';
        });
        
        offersContainer.addEventListener('mouseleave', () => {
            isMouseDragging = false;
            offersContainer.style.cursor = 'grab';
        });
        
        // Initialize navigation state
        updateNavigation();
        
        // Auto-scroll timer for Korea BBQ special offer
        const timerElement = document.querySelector('.timer-text');
        if (timerElement) {
            let timeLeft = 2 * 60 * 60 + 21 * 60 + 11; // 02:21:11 in seconds
            
            const updateTimer = () => {
                if (timeLeft <= 0) {
                    timeLeft = 24 * 60 * 60; // Reset to 24 hours
                }
                
                const hours = Math.floor(timeLeft / 3600);
                const minutes = Math.floor((timeLeft % 3600) / 60);
                const seconds = timeLeft % 60;
                
                timerElement.textContent = 
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                timeLeft--;
            };
            
            updateTimer();
            setInterval(updateTimer, 1000);
        }
    };

    // Performance optimization: Intersection Observer for animations
    const initIntersectionObserver = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        const animateElements = document.querySelectorAll('.offer-card, .process-card, .stat-card');
        animateElements.forEach(el => observer.observe(el));
    };

    // Initialize intersection observer
    initIntersectionObserver();

    // Initialize all functionality
    const init = () => {
        console.log('Initializing FOODZ website...');
        
        initSmoothScrolling();
        initHeaderScroll();
        initButtonAnimations();
        initStatsAnimation();
        initMobileMenu(); // This function now handles mobile menu
        initFormValidation();
        initLazyLoading();
        initPerformanceMonitoring();
        initOffersCarousel();
        initOrderForm();
        
        // Add CSS for mobile menu
        addMobileMenuStyles();
        
        console.log('FOODZ website initialized successfully!');
    };

    // Add mobile menu styles dynamically
    const addMobileMenuStyles = () => {
        // Mobile menu styles are now handled in CSS
        // This function is kept for future dynamic styles if needed
    };

    // Start the application
    init();
});
