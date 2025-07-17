// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Debounce function for performance optimization
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

// ===== DOM ELEMENTS =====
const header = $('#header');
const navMenu = $('#nav-menu');
const navToggle = $('#nav-toggle');
const navClose = $('#nav-close');
const navOverlay = $('#nav-overlay');
const navLinks = $$('.nav__link');
const backToTopBtn = $('#back-to-top');
const contactForm = $('.contact__form');
const sections = $$('section[id]');

// ===== MOBILE NAVIGATION =====
class MobileNavigation {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        // Toggle menu
        navToggle?.addEventListener('click', () => this.showMenu());
        navClose?.addEventListener('click', () => this.hideMenu());
        
        // Close menu when clicking on overlay
        navOverlay?.addEventListener('click', () => this.hideMenu());
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.hideMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                this.hideMenu();
            }
        });
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.hideMenu();
            }
        });
    }

    showMenu() {
        navMenu?.classList.add('show-menu');
        navOverlay?.classList.add('show-overlay');
        this.isMenuOpen = true;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    hideMenu() {
        navMenu?.classList.remove('show-menu');
        navOverlay?.classList.remove('show-overlay');
        this.isMenuOpen = false;
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// ===== HEADER SCROLL EFFECT =====
class HeaderScrollEffect {
    constructor() {
        this.init();
    }

    init() {
        const handleScroll = debounce(() => {
            if (window.scrollY >= 50) {
                header?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
            }
        }, 10);

        window.addEventListener('scroll', handleScroll);
    }
}

// ===== SMOOTH SCROLLING =====
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        // Handle navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(href);
                }
            });
        });

        // Handle other internal links
        $$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#' && $(href)) {
                    e.preventDefault();
                    this.scrollToSection(href);
                }
            });
        });
    }

    scrollToSection(selector) {
        const target = $(selector);
        if (target) {
            const headerHeight = header?.offsetHeight || 70;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// ===== ACTIVE SECTION HIGHLIGHTING =====
class ActiveSectionHighlighter {
    constructor() {
        this.navList = $('.nav__list');
        this.init();
    }

    init() {
        const handleScroll = debounce(() => {
            this.highlightActiveSection();
        }, 50);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', debounce(() => {
            this.updateActiveIndicator();
        }, 100));
        
        // Initial check
        this.highlightActiveSection();
    }

    highlightActiveSection() {
        const scrollY = window.pageYOffset;
        const headerHeight = header?.offsetHeight || 70;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = $(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active-link'));
                // Add active class to current link
                correspondingLink?.classList.add('active-link');
                // Update the animated indicator
                this.updateActiveIndicator(correspondingLink);
            }
        });
    }

    updateActiveIndicator(activeLink = null) {
        if (!this.navList) return;
        
        // Se non viene passato un link attivo, cerca quello corrente
        if (!activeLink) {
            activeLink = $('.nav__link.active-link');
        }
        
        if (activeLink && this.navList.contains(activeLink)) {
            const navListRect = this.navList.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();
            
            const leftOffset = linkRect.left - navListRect.left;
            const width = linkRect.width;
            
            // Aggiorna la posizione e dimensione della linea
            this.navList.style.setProperty('--indicator-left', `${leftOffset}px`);
            this.navList.style.setProperty('--indicator-width', `${width}px`);
            
            // Mostra la linea
            this.navList.classList.add('show-indicator');
        } else {
            // Nascondi la linea se non c'è un link attivo
            this.navList.classList.remove('show-indicator');
        }
    }
}

// ===== BACK TO TOP BUTTON =====
class BackToTopButton {
    constructor() {
        this.init();
    }

    init() {
        const handleScroll = debounce(() => {
            if (window.scrollY >= 500) {
                backToTopBtn?.classList.add('show');
            } else {
                backToTopBtn?.classList.remove('show');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);

        backToTopBtn?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== FORM HANDLING =====
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        contactForm?.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add real-time validation
        const inputs = contactForm?.querySelectorAll('.form__input');
        inputs?.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!this.validateForm()) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(data);
            
            // Show success message
            this.showMessage('Messaggio inviato con successo! Ti contatteremo presto.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            this.showMessage('Errore nell\'invio del messaggio. Riprova più tardi.', 'error');
        } finally {
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    validateForm() {
        const inputs = contactForm.querySelectorAll('.form__input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Questo campo è obbligatorio';
        }
        
        // Email validation
        if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Inserisci un indirizzo email valido';
        }
        
        // Phone validation
        if (type === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Inserisci un numero di telefono valido';
        }
        
        this.showFieldError(field, errorMessage);
        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        if (message) {
            field.style.borderColor = '#ef4444';
            
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            errorElement.style.cssText = `
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: block;
            `;
            
            field.parentNode.appendChild(errorElement);
        }
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = $('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        messageElement.textContent = message;
        messageElement.style.cssText = `
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-weight: 500;
            ${type === 'success' 
                ? 'background-color: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' 
                : 'background-color: #fef2f2; color: #dc2626; border: 1px solid #fecaca;'
            }
        `;
        
        contactForm.insertBefore(messageElement, contactForm.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    async simulateFormSubmission(data) {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    console.log('Form submitted:', data);
                    resolve();
                } else {
                    reject(new Error('Simulated error'));
                }
            }, 1500);
        });
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Only run animations if user hasn't requested reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = $$('.service__card, .license__card, .news__card, .feature');
        animatedElements.forEach((el, index) => {
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            observer.observe(el);
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images when implemented
        this.setupLazyLoading();
        
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Setup service worker for caching (if needed)
        this.setupServiceWorker();
    }

    setupLazyLoading() {
        // Placeholder for future image lazy loading
        const images = $$('img[data-src]');
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
    }

    setupServiceWorker() {
        // Register service worker for caching (optional)
        if ('serviceWorker' in navigator) {
            // Uncomment when service worker is implemented
            // navigator.serviceWorker.register('/sw.js');
        }
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        // Skip to main content link
        this.addSkipLink();
        
        // Keyboard navigation improvements
        this.enhanceKeyboardNavigation();
        
        // Focus management
        this.manageFocus();
        
        // ARIA live regions for dynamic content
        this.setupLiveRegions();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Salta al contenuto principale';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #dc2626;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add id to main content
        const main = $('.main');
        if (main && !main.id) {
            main.id = 'main';
        }
    }

    enhanceKeyboardNavigation() {
        // Trap focus in mobile menu when open
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && navMenu?.classList.contains('show-menu')) {
                this.trapFocus(e, navMenu);
            }
        });
    }

    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }

    manageFocus() {
        // Return focus to trigger element when mobile menu closes
        const originalFocus = { element: null };
        
        navToggle?.addEventListener('click', () => {
            originalFocus.element = document.activeElement;
        });
        
        navClose?.addEventListener('click', () => {
            if (originalFocus.element) {
                originalFocus.element.focus();
            }
        });
    }

    setupLiveRegions() {
        // Create live region for form messages
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        document.body.appendChild(liveRegion);
    }
}

// ===== INITIALIZATION =====
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all components
            new MobileNavigation();
            new HeaderScrollEffect();
            new SmoothScrolling();
            new ActiveSectionHighlighter();
            new BackToTopButton();
            new FormHandler();
            new ScrollAnimations();
            new PerformanceOptimizer();
            new AccessibilityEnhancements();
            
            console.log('✅ Autoscuola Carbonin website initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing website:', error);
        }
    }
}

// Start the application
new App();

// ===== GLOBAL ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});