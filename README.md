# Autoscuola Carbonin - Sito Web Moderno

Un sito web moderno e responsive per Autoscuola Carbonin con integrazione Google Places API per mostrare recensioni e valutazioni in tempo reale.

## 🌟 Caratteristiche

- **Design Moderno**: Interfaccia pulita e professionale
- **Responsive**: Ottimizzato per tutti i dispositivi
- **Integrazione Google Places**: Recensioni e valutazioni automatiche
- **Aggiornamenti Automatici**: Dati aggiornati quotidianamente
- **Performance Ottimizzate**: Caricamento veloce e cache intelligente
- **Sicurezza**: Nessuna esposizione di API key nel frontend
- **Hosting Vercel**: Deploy automatico e CDN globale

## 🚀 Deploy su Vercel

### Passo 1: Fork del Repository
1. Fai fork di questo repository sul tuo account GitHub
2. Clona il fork localmente per le modifiche iniziali

### Passo 2: Configurazione Google Places API

1. **Crea Google Cloud Project**:
   - Vai su [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuovo progetto
   - Abilita **"Places API"**
   - Crea una API Key
   - Configura restrizioni API (solo Places API)

2. **Trova il Place ID**:
   - Usa [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Cerca "Autoscuola Carbonin" o il tuo business
   - Copia il `place_id`

### Passo 3: Configurazione GitHub Secrets

1. **Nel tuo repository GitHub**:
   - Vai su Settings > Secrets and variables > Actions
   - Clicca "New repository secret"
   - Aggiungi questi secrets:

```
GOOGLE_PLACES_API_KEY: la_tua_api_key_qui
PLACE_ID: il_tuo_place_id_qui
```

### Passo 4: Deploy su Vercel

1. **Connetti Vercel a GitHub**:
   - Vai su [vercel.com](https://vercel.com)
   - Clicca "New Project"
   - Importa il tuo repository GitHub
   - Clicca "Deploy"

2. **Configurazione automatica**:
   - Vercel rileva automaticamente che è un sito statico
   - Il deploy avviene automaticamente
   - Ogni volta che GitHub Actions aggiorna `places-data.json`, Vercel rideploya

## 🤖 Come Funziona l'Automazione

### Flusso Automatico
1. **GitHub Actions** si esegue ogni giorno alle 6:00 UTC
2. **Scarica** i dati da Google Places API (1 sola richiesta)
3. **Aggiorna** il file `places-data.json`
4. **Committa** le modifiche al repository
5. **Vercel** rileva il cambiamento e rideploya automaticamente
6. **Il sito** mostra i dati aggiornati

### Vantaggi di Questa Soluzione
- ✅ **Completamente automatico**: Zero intervento manuale
- ✅ **Costi minimi**: ~$0.50/mese (1 richiesta API al giorno)
- ✅ **Performance ottimali**: Dati serviti staticamente da Vercel
- ✅ **Sempre aggiornato**: Aggiornamento giornaliero garantito
- ✅ **Fallback robusto**: Funziona anche se l'API fallisce
- ✅ **Zero configurazione server**: Tutto gestito da GitHub e Vercel

## 📁 Struttura File

```
autoscuola-carbonin/
├── .github/
│   └── workflows/
│       └── update-places.yml    # GitHub Actions workflow
├── imgs/                        # Immagini del sito
├── index.html                   # Pagina principale
├── styles.css                   # Stili CSS
├── script.js                    # JavaScript principale
├── places-data.json             # Dati Places API (aggiornato automaticamente)
├── update-places-data.js        # Script aggiornamento (usato da GitHub Actions)
├── README.md                    # Questa documentazione
└── .gitignore                   # File da escludere
```

## 🔧 Test e Debugging

### Test Manuale GitHub Actions
1. Vai su Actions nel tuo repository GitHub
2. Seleziona "Update Places Data"
3. Clicca "Run workflow" per test manuale

### Verifica Funzionamento
1. Controlla che `places-data.json` sia aggiornato
2. Verifica che Vercel abbia fatto redeploy
3. Controlla la console del browser per eventuali errori

### Log e Monitoraggio
- **GitHub Actions**: Logs dettagliati in Actions tab
- **Vercel**: Dashboard con logs di deploy
- **Browser**: Console per debug frontend

## 💰 Gestione Costi

### Costi Stimati
- **Places API**: $17 per 1000 richieste
- **Nostro utilizzo**: 1 richiesta al giorno = ~$0.50/mese
- **GitHub Actions**: Gratuito per repository pubblici
- **Vercel**: Gratuito per progetti personali

### Monitoraggio
1. **Google Cloud Console**: Monitora utilizzo API
2. **GitHub**: Verifica esecuzione Actions
3. **Vercel**: Controlla deploy e performance

## 🔒 Sicurezza

### Protezione Credenziali
- ✅ API Key protetta in GitHub Secrets
- ✅ Nessuna credenziale nel codice pubblico
- ✅ Restrizioni API configurate
- ✅ Accesso limitato solo a Places API

### Best Practices
- Monitora regolarmente l'utilizzo API
- Ruota le API key periodicamente
- Verifica i logs per attività sospette

## 🛠️ Sviluppo Locale

```bash
# Clona il repository
git clone [url-del-tuo-fork]

# Entra nella directory
cd autoscuola-carbonin

# Per testare localmente (opzionale)
# Imposta le variabili d'ambiente:
export GOOGLE_PLACES_API_KEY="la_tua_api_key"
export PLACE_ID="il_tuo_place_id"

# Esegui aggiornamento manuale
node update-places-data.js

# Avvia server locale
python -m http.server 8000
```

## 🔧 Risoluzione Problemi

### GitHub Actions non si esegue
- Verifica che i secrets siano configurati correttamente
- Controlla i logs in Actions tab
- Assicurati che il workflow file sia nella cartella corretta

### Vercel non rideploya
- Verifica che il repository sia connesso a Vercel
- Controlla che ci siano modifiche nel file `places-data.json`
- Verifica i logs di deploy su Vercel

### Dati non aggiornati
- Controlla l'ultimo commit su GitHub
- Verifica che GitHub Actions sia eseguito con successo
- Controlla la console del browser per errori

### Errori API
- Verifica che l'API key sia valida
- Controlla che Places API sia abilitata
- Verifica che il Place ID sia corretto

## 📞 Supporto

Per problemi:
1. Controlla i logs di GitHub Actions
2. Verifica la configurazione dei secrets
3. Controlla i logs di Vercel
4. Verifica la console del browser

## 🔄 Aggiornamenti Futuri

Il sistema è facilmente estendibile per:
- Aggiungere più campi Places API
- Integrare altri servizi Google
- Creare dashboard di monitoraggio
- Aggiungere notifiche di aggiornamento

## 🔧 Configurazione Passo-Passo

### Passo 1: Creare un Progetto Google Cloud

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Clicca su "Seleziona un progetto" → "Nuovo progetto"
3. Inserisci il nome del progetto (es. "Autoscuola Carbonin Website")
4. Clicca "Crea"

### Passo 2: Abilitare le API Necessarie

1. Nel menu laterale, vai su "API e servizi" → "Libreria"
2. Cerca e abilita le seguenti API:
   - **"Places API"** - per ottenere i dati del luogo
   - **"Maps JavaScript API"** - per utilizzare la libreria JavaScript
3. Clicca su ciascuna API e poi "Abilita"

### Passo 3: Creare una API Key

1. Vai su "API e servizi" → "Credenziali"
2. Clicca "Crea credenziali" → "Chiave API"
3. Copia la chiave API generata
4. **IMPORTANTE**: Clicca "Limita chiave" per configurare le restrizioni

### Passo 4: Configurare le Restrizioni (IMPORTANTE per la Sicurezza)

1. Nella sezione "Restrizioni applicazione":
   - Seleziona "Referrer HTTP (siti web)"
   - Aggiungi il tuo dominio (es. `https://tuosito.com/*`)
   - Per sviluppo locale, aggiungi anche `http://localhost:*` e `http://127.0.0.1:*`

2. Nella sezione "Restrizioni API":
   - Seleziona "Limita chiave"
   - Scegli "Maps JavaScript API" e "Places API"

3. Clicca "Salva"

### Passo 5: Ottenere il Place ID

#### Metodo 1: Usando il Link di Google Maps
1. Apri il tuo link di Google Maps: `https://maps.app.goo.gl/dd2D8UoJkLjgkycN9`
2. Nella URL che si apre, cerca il parametro che inizia con `place_id=`
3. Copia il valore dopo `place_id=` (fino al prossimo `&`)

#### Metodo 2: Usando Place ID Finder
1. Vai su [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Cerca la tua attività per nome e indirizzo
3. Copia il Place ID mostrato

#### Metodo 3: Manuale
1. Vai su Google Maps
2. Cerca la tua attività
3. Clicca sulla tua attività
4. Nell'URL vedrai qualcosa come `!1s0x...!8m2!3d...!4d...!16s%2Fg%2F...`
5. Il Place ID è la parte dopo `%2Fg%2F` (decodificata)

### Passo 6: Configurare il Sito Web

1. Apri il file `config.js`
2. Sostituisci `YOUR_API_KEY_HERE` con la tua API key
3. Sostituisci `YOUR_PLACE_ID_HERE` con il tuo Place ID

```javascript
const CONFIG = {
    GOOGLE_PLACES_API_KEY: 'AIzaSyC...', // La tua API key qui
    PLACE_ID: 'ChIJ...', // Il tuo Place ID qui
    // ... resto della configurazione
};
```

## 💰 Gestione dei Costi

### Piano Gratuito Google Cloud
- **$200 di crediti gratuiti** per i primi 90 giorni
- **Quota gratuita mensile**: Dopo i crediti iniziali, hai comunque accesso gratuito limitato

### Costi Places API
- **Place Details**: $17 per 1000 richieste
- **Con questo sistema**: ~1 richiesta al giorno = ~$0.50 al mese
- **Cache di 24 ore**: Riduce drasticamente le richieste

### Ottimizzazioni Implementate
1. **Google Maps JavaScript API**: Utilizziamo la libreria ufficiale per evitare problemi CORS
2. **Solo campi necessari**: Richiediamo solo `rating` e `user_ratings_total`
3. **Cache locale**: I dati vengono memorizzati per 24 ore
4. **Fallback**: Se l'API fallisce, vengono usati i dati di backup
5. **Richiesta singola**: Una sola chiamata API al caricamento
6. **Caricamento dinamico**: L'API viene caricata solo quando necessario

## 🔒 Sicurezza

### File da NON Committare
Aggiungi al tuo `.gitignore`:
```
config.js
```

### Versione di Produzione
Per la produzione, considera di:
1. Usare variabili d'ambiente invece del file `config.js`
2. Implementare un proxy server per nascondere l'API key
3. Usare restrizioni IP più stringenti

## 🧪 Test della Configurazione

1. Apri la console del browser (F12)
2. Ricarica la pagina
3. Controlla i messaggi nella console:
   - ✅ "Recuperando dati da Google Places API..."
   - ✅ "Dati aggiornati: X.X/5 stelle, XXX recensioni"

## 🐛 Risoluzione Problemi

### Errore: "API key not valid"
- Verifica che l'API key sia corretta
- Controlla che Places API e Maps JavaScript API siano abilitate
- Verifica le restrizioni del referrer

### Errore: "CORS policy" o "Failed to fetch"
- ✅ **RISOLTO**: Il sistema ora usa Google Maps JavaScript API invece di chiamate HTTP dirette
- Se persiste, verifica che Maps JavaScript API sia abilitata

### Errore: "INVALID_REQUEST"
- Controlla che il Place ID sia corretto
- Verifica che il luogo esista su Google Maps

### Errore: "OVER_QUERY_LIMIT"
- Hai superato la quota gratuita
- Controlla l'utilizzo nella Google Cloud Console

### I dati non si aggiornano
- Cancella la cache del browser
- Controlla la console per errori
- Verifica che il Place ID sia corretto

## 📊 Monitoraggio dell'Utilizzo

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Seleziona il tuo progetto
3. Vai su "API e servizi" → "Dashboard"
4. Monitora l'utilizzo di Places API

## 🔄 Aggiornamenti Futuri

Il sistema è progettato per essere facilmente estendibile. Puoi aggiungere altri campi come:
- `photos` (foto del luogo)
- `reviews` (recensioni dettagliate)
- `opening_hours` (orari di apertura)

Ricorda di aggiornare il parametro `fields` nella richiesta API e considerare l'impatto sui costi.

## 📞 Supporto

Se hai problemi con la configurazione:
1. Controlla la console del browser per errori
2. Verifica la documentazione ufficiale di [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
3. Controlla che tutti i passaggi siano stati seguiti correttamente

---

**Nota**: Questo sistema è ottimizzato per rimanere nel piano gratuito di Google Cloud. Con un utilizzo normale (pochi visitatori al giorno), i costi dovrebbero essere minimi o nulli.