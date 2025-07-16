// Script per aggiornare automaticamente i dati Places API
// Compatibile con GitHub Actions e Vercel

const CONFIG = {
    // Configurazione tramite variabili d'ambiente (GitHub Secrets)
    GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY || 'YOUR_API_KEY_HERE',
    PLACE_ID: process.env.PLACE_ID || 'YOUR_PLACE_ID_HERE',
    
    // Dati di fallback
    FALLBACK_DATA: {
        rating: 4.9,
        user_ratings_total: 2947
    }
};

class PlacesDataUpdater {
    constructor() {
        this.outputFile = './places-data.json';
    }

    async updateData() {
        console.log('🔄 Avvio aggiornamento dati Places API...');
        
        try {
            // Verifica configurazione
            if (!CONFIG.GOOGLE_PLACES_API_KEY || CONFIG.GOOGLE_PLACES_API_KEY === 'YOUR_API_KEY_HERE') {
                throw new Error('API Key non configurata');
            }
            
            if (!CONFIG.PLACE_ID || CONFIG.PLACE_ID === 'YOUR_PLACE_ID_HERE') {
                throw new Error('Place ID non configurato');
            }

            // Effettua la richiesta API
            const data = await this.fetchPlacesData();
            
            // Salva i dati con timestamp
            const dataWithTimestamp = {
                ...data,
                lastUpdated: new Date().toISOString(),
                nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            };
            
            await this.saveData(dataWithTimestamp);
            
            console.log('✅ Dati aggiornati con successo!');
            console.log(`📊 Rating: ${data.rating}/5`);
            console.log(`👥 Recensioni: ${data.user_ratings_total}`);
            console.log(`🕒 Prossimo aggiornamento: ${dataWithTimestamp.nextUpdate}`);
            
        } catch (error) {
            console.error('❌ Errore nell\'aggiornamento:', error.message);
            
            // In caso di errore, usa i dati di fallback
            const fallbackData = {
                ...CONFIG.FALLBACK_DATA,
                lastUpdated: new Date().toISOString(),
                nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                error: error.message
            };
            
            await this.saveData(fallbackData);
            console.log('🔄 Utilizzati dati di fallback');
        }
    }

    async fetchPlacesData() {
        const { GOOGLE_PLACES_API_KEY, PLACE_ID } = CONFIG;
        
        // Costruisce l'URL con solo i campi necessari
        const fields = 'rating,user_ratings_total';
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=${fields}&key=${GOOGLE_PLACES_API_KEY}`;
        
        console.log('📡 Effettuando richiesta a Places API...');
        
        // Usa fetch per Node.js (richiede node-fetch per versioni Node < 18)
        const fetch = globalThis.fetch || (await import('node-fetch')).default;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.status !== 'OK') {
            throw new Error(`Places API error: ${result.status} - ${result.error_message || 'Unknown error'}`);
        }
        
        return {
            rating: result.result.rating || CONFIG.FALLBACK_DATA.rating,
            user_ratings_total: result.result.user_ratings_total || CONFIG.FALLBACK_DATA.user_ratings_total
        };
    }

    async saveData(data) {
        const fs = await import('fs/promises');
        
        try {
            await fs.writeFile(this.outputFile, JSON.stringify(data, null, 2), 'utf8');
            console.log(`💾 Dati salvati in ${this.outputFile}`);
        } catch (error) {
            throw new Error(`Errore nel salvataggio: ${error.message}`);
        }
    }
}

// Esecuzione dello script
if (typeof window === 'undefined') {
    // Ambiente Node.js
    const updater = new PlacesDataUpdater();
    updater.updateData().then(() => {
        console.log('🎉 Aggiornamento completato!');
        process.exit(0);
    }).catch((error) => {
        console.error('💥 Errore fatale:', error);
        process.exit(1);
    });
} else {
    // Ambiente browser - esporta la classe
    window.PlacesDataUpdater = PlacesDataUpdater;
}