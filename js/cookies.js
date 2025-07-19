/**
 * Cookie Banner Management
 * Gestisce il banner dei cookies conforme al GDPR
 */

class CookieBanner {
    constructor() {
        this.cookieName = 'autoscuola_cookie_consent';
        this.cookieExpiry = 365; // giorni
        this.banner = null;
        this.preferences = {
            maps: false
        };
        this.init();
    }

    init() {
        const consent = this.getCookie(this.cookieName);
        if (!consent) {
            this.createBanner();
            this.showBanner();
        } else {
            this.applyConsent(consent);
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
                            Questo sito utilizza cookies tecnici e, con il tuo consenso, cookies di terze parti (Google Maps) per migliorare la tua esperienza.
                            <a href="#" class="cookie-banner__link" onclick="cookieBanner.showDetails()">Maggiori informazioni</a>
                        </p>
                    </div>
                    <div class="cookie-banner__actions">
                        <button class="cookie-banner__btn" onclick="cookieBanner.decline()">Rifiuta tutti</button>
                        <button class="cookie-banner__btn" onclick="cookieBanner.showPreferences()">Personalizza</button>
                        <button class="cookie-banner__btn" onclick="cookieBanner.accept()">Accetta tutti</button>
                    </div>
                </div>
                <div class="cookie-preferences" id="cookiePreferences">
                    <div class="cookie-banner__container">
                        <div class="cookie-preferences__header">
                            <h4 class="cookie-preferences__title">Personalizza Consenso</h4>
                            <p class="cookie-preferences__description">Puoi scegliere quali cookies abilitare. Le tue preferenze verranno salvate per 365 giorni.</p>
                        </div>
                        <div class="cookie-preference-item">
                            <div class="cookie-preference-item__info">
                                <label for="maps-cookie">Google Maps</label>
                                <p>Utilizzato per visualizzare mappe interattive e fornire indicazioni stradali.</p>
                            </div>
                            <label class="switch">
                                <input type="checkbox" id="maps-cookie" data-cookie="maps">
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <div class="cookie-preferences__actions">
                            <button class="cookie-banner__btn" onclick="cookieBanner.savePreferences()">Salva Preferenze</button>
                        </div>
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
        
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted'
            });
        }
    }

    decline() {
        this.setCookie(this.cookieName, 'declined', this.cookieExpiry);
        this.hideBanner();
        this.disableNonEssentialCookies();
        
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied'
            });
        }
    }

    showDetails() {
        // Determina il percorso corretto per la pagina privacy
        const currentPath = window.location.pathname;
        let privacyPath = 'info/privacy-cookies.html';
        
        // Se siamo in una sottocartella, aggiungi '../' per tornare alla root
        if (currentPath.includes('/patenti/') || currentPath.includes('/servizi/') || currentPath.includes('/info/')) {
            privacyPath = '../info/privacy-cookies.html';
        }
        
        // Apre la pagina privacy in una nuova scheda
        window.open(privacyPath, '_blank');
    }

    enableAllCookies() {
        console.log('Cookies accettati - Tutti i servizi abilitati');
        this.preferences.maps = true;
        this.loadMaps();
    }

    applyConsent(consent) {
        if (consent === 'accepted') {
            this.enableAllCookies();
        } else if (consent === 'declined') {
            this.disableNonEssentialCookies();
        } else {
            try {
                this.preferences = JSON.parse(consent);
                this.enableCookiesFromPreferences();
            } catch (e) {
                console.error("Errore durante il parsing delle preferenze dei cookie", e);
                this.disableNonEssentialCookies();
            }
        }
    }

    showPreferences() {
        const prefsPanel = document.getElementById('cookiePreferences');
        if (prefsPanel) {
            const isVisible = prefsPanel.classList.toggle('show');
            // Pre-check switches based on current preferences
            if (isVisible) {
                const mapsSwitch = document.querySelector('#maps-cookie');
                if (mapsSwitch) {
                    mapsSwitch.checked = this.preferences.maps;
                }
            }
        }
    }

    savePreferences() {
        const mapsSwitch = document.querySelector('#maps-cookie');
        this.preferences.maps = mapsSwitch ? mapsSwitch.checked : false;

        this.setCookie(this.cookieName, JSON.stringify(this.preferences), this.cookieExpiry);
        this.hideBanner();
        this.enableCookiesFromPreferences();
    }

    enableCookiesFromPreferences() {
        console.log('Cookies abilitati in base alle preferenze');
        if (this.preferences.maps) {
            this.loadMaps();
        }
    }

    requestMapLoad() {
        const consentValue = this.getCookie(this.cookieName);

        if (consentValue === 'accepted') {
            this.loadMaps();
            return;
        }

        if (consentValue && consentValue !== 'declined') {
            try {
                const prefs = JSON.parse(consentValue);
                if (prefs.maps) {
                    this.loadMaps();
                    return;
                }
            } catch (e) {
                // Non è un JSON valido, procedi
            }
        }

        // Se arriviamo qui, il consenso non è stato dato per le mappe.
        this.showMapConsentMessage();
    }

    // Funzione per mostrare un messaggio quando il consenso per le mappe non è stato dato
    showMapConsentMessage() {
        const placeholder = document.getElementById('maps-placeholder');
        if (!placeholder) return;

        // Se il messaggio esiste già, non fare nulla
        if (placeholder.querySelector('.maps-consent-message')) return;

        // Nascondi il pulsante originale "Carica Mappa"
        const originalButton = placeholder.querySelector('.maps-placeholder__btn');
        if (originalButton) {
            originalButton.style.display = 'none';
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = 'maps-consent-message';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.marginTop = '1rem';

        messageDiv.innerHTML = `
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #6c757d;">
                Per visualizzare la mappa, è necessario il consenso.
            </p>
            <button onclick="cookieBanner.showConsentOptions()" class="cookie-banner__btn">
                Gestisci Consenso
            </button>
        `;
        
        const content = placeholder.querySelector('.maps-placeholder__content');
        if (content) {
            content.appendChild(messageDiv);
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
            iframe.src = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5577.031166718418!2d12.240851000000001!3d45.660549!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477949d44561fc03%3A0x9d2212d780084cef!2sAutoscuola%20Carbonin%20Treviso!5e0!3m2!1sen!2sit!4v1752875507732!5m2!1sen!2sit";
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
        console.log('Cookies non essenziali disabilitati');
        this.preferences.maps = false;
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