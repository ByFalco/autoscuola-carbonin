# Font Inter Variable - Hosting Locale

Per utilizzare il font Inter Variable in locale e rispettare il GDPR, segui questi passaggi:

## Download e Installazione

1. Vai su https://fonts.google.com/specimen/Inter
2. Clicca su "Download family" per scaricare tutti i pesi
3. Estrai i file **Variable** dalla cartella scaricata
4. Posiziona questi 2 file nella cartella `fonts/`:

### File richiesti (formato TTF Variable):
- `InterVariable.ttf` (tutti i pesi 100-900, stile normale)
- `InterVariable-Italic.ttf` (tutti i pesi 100-900, stile corsivo)

## Vantaggi dei Font Variabili

- ✅ **Un solo file** invece di 5+ file separati
- ✅ **Supporto completo** per tutti i pesi da 100 a 900
- ✅ **Controllo fine** del peso del font (es. font-weight: 350)
- ✅ **Prestazioni migliori** - meno richieste HTTP
- ✅ **Dimensione ridotta** rispetto a file multipli

## Utilizzo nel CSS

```css
/* Peso standard */
.text { font-weight: 400; }

/* Peso personalizzato */
.text-custom { font-weight: 350; }

/* Corsivo */
.text-italic { font-style: italic; font-weight: 500; }
```

## Note

- Il file `inter.css` è già configurato con fallback per browser meno recenti
- I font variabili sono supportati da tutti i browser moderni (95%+ degli utenti)
- Questo approccio evita il caricamento da Google Fonts, rispettando il GDPR