// Funzione per caricare i componenti HTML
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        
        // Adatta i percorsi nel contenuto HTML in base alla posizione della pagina corrente
        const adaptedHtml = adaptPathsForCurrentPage(html);
        
        document.getElementById(elementId).innerHTML = adaptedHtml;
    } catch (error) {
        console.error(`Errore nel caricamento del componente ${componentPath}:`, error);
    }
}

// Funzione per adattare i percorsi in base alla posizione della pagina corrente
function adaptPathsForCurrentPage(html) {
    const currentPath = window.location.pathname;
    
    // Se siamo nella root del progetto (es. privacy-cookies.html)
    if (currentPath === '/privacy-cookies.html' || currentPath.endsWith('/privacy-cookies.html') || 
        (!currentPath.includes('/patenti/') && !currentPath.includes('/servizi/') && currentPath !== '/' && currentPath !== '/index.html')) {
        // Sostituisce "../" con "./" per i percorsi nella root
        return html.replace(/\.\.\//g, './');
    }
    
    // Per le sottocartelle, mantiene i percorsi originali con "../"
    return html;
}

// Funzione per determinare il percorso corretto per i componenti
function getComponentPath(componentName) {
    const currentPath = window.location.pathname;
    
    // Se siamo nella root del progetto
    if (currentPath === '/privacy-cookies.html' || currentPath.endsWith('/privacy-cookies.html') || 
        (!currentPath.includes('/patenti/') && !currentPath.includes('/servizi/') && currentPath !== '/' && currentPath !== '/index.html')) {
        return `./components/${componentName}`;
    }
    
    // Per le sottocartelle
    return `../components/${componentName}`;
}

// Funzione per inizializzare i componenti
async function initializeComponents() {
    // Carica navbar e footer con percorsi adattivi
    await Promise.all([
        loadComponent('navbar-placeholder', getComponentPath('navbar.html')),
        loadComponent('footer-placeholder', getComponentPath('footer.html'))
    ]);
    
    // Aspetta che il DOM sia completamente aggiornato prima di inizializzare gli script
    await new Promise(resolve => {
        // Usa requestAnimationFrame per assicurarsi che il rendering sia completato
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    });
    
    // Inizializza gli script dopo il caricamento dei componenti
    try {
        console.log('Initializing navigation...');
        initializeNavigation();
        console.log('Navigation initialized successfully');
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
    initializeBackToTop();
}

// Funzione per inizializzare la navigazione mobile
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navOverlay = document.getElementById('nav-overlay');

    console.log('Navigation elements found:', {
        navToggle: !!navToggle,
        navMenu: !!navMenu,
        navClose: !!navClose,
        navOverlay: !!navOverlay
    });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            console.log('Toggle menu clicked');
            navMenu.classList.add('show-menu');
            if (navOverlay) navOverlay.classList.add('show-overlay');
            document.body.style.overflow = 'hidden';
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            console.log('Close menu clicked');
            navMenu.classList.remove('show-menu');
            if (navOverlay) navOverlay.classList.remove('show-overlay');
            document.body.style.overflow = '';
        });
    }

    if (navOverlay && navMenu) {
        navOverlay.addEventListener('click', () => {
            console.log('Overlay clicked');
            navMenu.classList.remove('show-menu');
            navOverlay.classList.remove('show-overlay');
            document.body.style.overflow = '';
        });
    }

    // Gestione dei link di navigazione per chiudere il menu mobile
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
                if (navOverlay) navOverlay.classList.remove('show-overlay');
                document.body.style.overflow = '';
            }
        });
    });

    // Gestione del tasto Escape per chiudere il menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            if (navOverlay) navOverlay.classList.remove('show-overlay');
            document.body.style.overflow = '';
        }
    });
}

// Funzione per inizializzare il pulsante back to top
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== CONTACT ACTION HANDLER =====
function handleContactAction(event) {
    // Detect if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile: allow the tel: link to work (call the number)
        return true;
    } else {
        // On desktop: prevent default and navigate to contact section on main page
        event.preventDefault();
        
        const currentPath = window.location.pathname;
        
        // Se siamo nella root del progetto
        if (currentPath === '/privacy-cookies.html' || currentPath.endsWith('/privacy-cookies.html') || 
            (!currentPath.includes('/patenti/') && !currentPath.includes('/servizi/') && currentPath !== '/' && currentPath !== '/index.html')) {
            window.location.href = './index.html#contact';
        } else {
            // Per le sottocartelle
            window.location.href = '../index.html#contact';
        }
        
        return false;
    }
}

// Inizializza tutto quando il DOM è caricato
document.addEventListener('DOMContentLoaded', initializeComponents);