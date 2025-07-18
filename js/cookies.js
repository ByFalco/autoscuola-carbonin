/**
 * Cookie Banner Management
 * Gestisce il banner dei cookies conforme al GDPR
 */

class CookieBanner {
    constructor() {
        this.cookieName = 'autoscuola_cookie_consent';
        this.cookieExpiry = 365; // giorni
        this.banner = null;
        this.init();
    }

    init() {
        // Controlla se il consenso è già stato dato
        if (!this.hasConsent()) {
            this.createBanner();
            this.showBanner();
        } else {
            // Se i cookie sono già stati accettati, carica automaticamente i servizi
            const consentValue = this.getCookie(this.cookieName);
            if (consentValue === 'accepted') {
                this.enableAllCookies();
            }
        }
    }

    hasConsent() {
        return this.getCookie(this.cookieName) !== null;
    }

    createBanner() {
        const bannerHTML = `
            <div class="cookie-banner" id="cookieBanner">
                <div class="cookie-banner__container">
                    <div class="cookie-banner__content">
                        <h3 class="cookie-banner__title">
                            <svg class="cookie-banner__icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                            </svg>
                            Utilizzo dei Cookies
                        </h3>
                        <p class="cookie-banner__text">
                            Questo sito utilizza cookies tecnici e di terze parti (Google Maps) per migliorare la tua esperienza di navigazione. 
                            <a href="#" class="cookie-banner__link" onclick="cookieBanner.showDetails()">Maggiori informazioni</a>
                        </p>
                    </div>
                    <div class="cookie-banner__actions">
                        <button class="cookie-banner__btn cookie-banner__btn--decline" onclick="cookieBanner.decline()">
                            Rifiuta
                        </button>
                        <button class="cookie-banner__btn cookie-banner__btn--accept" onclick="cookieBanner.accept()">
                            Accetta tutti
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        this.banner = document.getElementById('cookieBanner');
    }

    showBanner() {
        if (this.banner) {
            // Piccolo delay per permettere il rendering
            setTimeout(() => {
                this.banner.classList.add('show');
            }, 100);
        }
    }

    hideBanner() {
        if (this.banner) {
            this.banner.classList.remove('show');
            // Rimuove il banner dal DOM dopo l'animazione
            setTimeout(() => {
                if (this.banner && this.banner.parentNode) {
                    this.banner.parentNode.removeChild(this.banner);
                }
            }, 400);
        }
    }

    accept() {
        this.setCookie(this.cookieName, 'accepted', this.cookieExpiry);
        this.hideBanner();
        this.enableAllCookies();
        
        // Analytics event (se implementato in futuro)
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }

    decline() {
        this.setCookie(this.cookieName, 'declined', this.cookieExpiry);
        this.hideBanner();
        this.disableNonEssentialCookies();
        
        // Analytics event (se implementato in futuro)
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }

    showDetails() {
        // Determina il percorso corretto per la pagina privacy
        const currentPath = window.location.pathname;
        let privacyPath = 'privacy-cookies.html';
        
        // Se siamo in una sottocartella, aggiungi '../' per tornare alla root
        if (currentPath.includes('/patenti/') || currentPath.includes('/servizi/')) {
            privacyPath = '../privacy-cookies.html';
        }
        
        // Apre la pagina privacy in una nuova scheda
        window.open(privacyPath, '_blank');
    }

    enableAllCookies() {
        // Abilita tutti i servizi che richiedono cookies
        console.log('Cookies accettati - Tutti i servizi abilitati');
        this.loadMaps();
    }

    // Nuova funzione per gestire la richiesta di caricamento mappa
    requestMapLoad() {
        // Controlla se i cookies sono stati accettati
        const consentValue = this.getCookie(this.cookieName);
        
        if (consentValue === 'accepted') {
            // Se i cookies sono accettati, carica la mappa
            this.loadMaps();
        } else {
            // Se i cookies non sono accettati, mostra il banner
            if (!this.hasConsent()) {
                // Se non c'è ancora una decisione, crea e mostra il banner
                this.createBanner();
                this.showBanner();
            } else if (consentValue === 'declined') {
                // Se i cookies sono stati rifiutati, mostra un messaggio informativo
                this.showMapConsentMessage();
            }
        }
    }

    // Funzione per mostrare un messaggio quando i cookies sono stati rifiutati
    showMapConsentMessage() {
        const placeholder = document.getElementById('maps-placeholder');
        if (placeholder) {
            // Crea un messaggio temporaneo
            const messageDiv = document.createElement('div');
            messageDiv.className = 'maps-consent-message';
            messageDiv.innerHTML = `
                <div style="background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 6px; margin: 2px 0; text-align: center;">
                    <p style="margin: 0 0 6px 0; font-size: 12px; color: #6c757d;">
                        Google Maps utilizza cookies<br>per fornire il servizio di mappe.
                    </p>
                    <button onclick="cookieBanner.showConsentOptions()" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                        Gestisci Consenso
                    </button>
                </div>
            `;
            
            // Inserisce il messaggio dopo il contenuto del placeholder
            const content = placeholder.querySelector('.maps-placeholder__content');
            if (content) {
                content.appendChild(messageDiv);
                
                // Rimuove il messaggio dopo 5 secondi
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.parentNode.removeChild(messageDiv);
                    }
                }, 5000);
            }
        }
    }

    // Funzione per mostrare nuovamente le opzioni di consenso
    showConsentOptions() {
        // Rimuove il cookie esistente per permettere una nuova scelta
        document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
        
        // Mostra il banner per una nuova decisione
        this.createBanner();
        this.showBanner();
    }

    loadMaps() {
        const placeholder = document.getElementById('maps-placeholder');
        const container = document.getElementById('google-maps-container');
        
        if (placeholder && container) {
            // Crea l'iframe di Google Maps
            const iframe = document.createElement('iframe');
            iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11180.5!2d12.2436!3d45.6669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477935b1234567890%3A0x1234567890abcdef!2sViale%20Trento%20e%20Trieste%2C%2010D%2C%2031100%20Treviso%20TV%2C%20Italy!5e0!3m2!1sen!2sit!4v1234567890123!5m2!1sen!2sit";
            iframe.width = "100%";
            iframe.height = "400";
            iframe.style.border = "0";
            iframe.allowFullscreen = true;
            iframe.loading = "lazy";
            iframe.referrerPolicy = "no-referrer-when-downgrade";
            
            // Sostituisce il placeholder con la mappa
            container.appendChild(iframe);
            container.style.display = 'block';
            placeholder.style.display = 'none';
        }
    }

    disableNonEssentialCookies() {
        // Disabilita i cookies non essenziali
        console.log('Cookies non essenziali disabilitati');
        
        // Rimuove eventuali cookies di terze parti esistenti
        this.removeThirdPartyCookies();
    }

    removeThirdPartyCookies() {
        // Lista dei domini di terze parti da cui rimuovere i cookies
        const thirdPartyDomains = [
            '.google.com',
            '.googleapis.com',
            '.gstatic.com',
            '.doubleclick.net'
        ];

        // Nota: la rimozione completa dei cookies di terze parti è limitata
        // per motivi di sicurezza del browser
        thirdPartyDomains.forEach(domain => {
            document.cookie = `; domain=${domain}; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        });
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Metodo pubblico per resettare il consenso (per testing)
    resetConsent() {
        document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
        location.reload();
    }
}

// Inizializza il banner dei cookies quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
    window.cookieBanner = new CookieBanner();
});

// Gestione del consenso per Google Analytics (se implementato in futuro)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Imposta il consenso di default come negato
gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied'
});