<div align="center">

# Autoscuola Carbonin

[![Vercel Deployment](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT) [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

| 🇺🇸 English | 🇮🇹 Italiano |
| :--- | :--- |
| **Autoscuola Carbonin** is a minimalist, high-performance website designed for an Italian driving school. The project focuses on providing a clean, professional, and mobile-first experience for prospective students and existing clients. | **Autoscuola Carbonin** è un sito web minimalista e performante, progettato per una scuola guida italiana. Il progetto punta a offrire un'esperienza pulita, professionale e "mobile-first" per i futuri allievi e i clienti già acquisiti. |

## 📖 Overview / Panoramica

| 🇺🇸 Description | 🇮🇹 Descrizione |
| :--- | :--- |
| This project serves as the digital front office for Autoscuola Carbonin. It aims to simplify the process of finding information about driving licenses and services, emphasizing clarity and ease of contact. The design is intentionally "legacy-style" (vanilla), avoiding heavy modern frameworks for maximum speed and compatibility. | Questo progetto funge da ufficio digitale per l'Autoscuola Carbonin. L'obiettivo è semplificare la ricerca di informazioni su patenti e servizi, puntando sulla chiarezza e sulla facilità di contatto. Il design è intenzionalmente in stile "legacy" (vanilla), evitando framework moderni pesanti per garantire massima velocità e compatibilità. |

## ✨ Key Features / Funzionalità Principali

| 🇺🇸 Features | 🇮🇹 Funzionalità |
| :--- | :--- |
| - **License Info**: Detailed pages for A, B, and Higher categories. | - **Info Patenti**: Pagine dettagliate per le categorie A, B e Superiori. |
| - **Service Catalog**: Quick access to renewals, point recovery, and conversions. | - **Catalogo Servizi**: Accesso rapido a rinnovi, recupero punti e conversioni. |
| - **Mobile-First Design**: Fully responsive layout optimized for smartphones. | - **Design Mobile-First**: Layout completamente responsive ottimizzato per smartphone. |
| - **Direct Contact**: Integrated "Call Now" and contact buttons for immediate support. | - **Contatto Diretto**: Pulsanti "Chiama Ora" e contatti integrati per supporto immediato. |
| - **Component-Based Architecture**: Modular HTML components (navbar, footer) for easier maintenance. | - **Architettura a Componenti**: Componenti HTML modulari (navbar, footer) per una manutenzione più semplice. |
| - **Fast Loading**: Minimal dependencies and optimized assets for near-instant load times. | - **Caricamento Rapido**: Dipendenze minime e asset ottimizzati per tempi di caricamento istantanei. |

## 🛠️ Technologies / Tecnologie Utilizzate

| 🇺🇸 Stack | 🇮🇹 Stack Tecnologico |
| :--- | :--- |
| - **Vanilla HTML5 & CSS3**: Modern styling using CSS variables and Flexbox/Grid. | - **HTML5 & CSS3**: Styling moderno con variabili CSS e layout Flexbox/Grid. |
| - **Vanilla JavaScript**: Lightweight interactivity without heavy frameworks (e.g., no React/Vue). | - **JavaScript (Vanilla)**: Interattività leggera senza l'uso di framework pesanti (es. no React/Vue). |
| - **Inter Font Family**: High-legibility typography for a modern look. | - **Inter Font**: Tipografia ad alta leggibilità per un look moderno. |
| - **Vercel**: Hosting and deployment with clean URL routing. | - **Vercel**: Hosting e deployment con gestione delle "pretty URLs". |

## 🚀 Installation & Setup / Installazione & Avvio

### 🇺🇸 English
1. **Clone the repository**:
   ```bash
   git clone https://github.com/ByFalco/autoscuola-carbonin.git
   ```
2. **Navigate to the directory**:
   ```bash
   cd autoscuola-carbonin
   ```
3. **Run a local server**:
   Since the project uses `fetch()` to load components, you need a local server. You can use the "Live Server" extension in VS Code or run:
   ```bash
   # Using Python
   python -m http.server 8000
   # Or using Node.js (if installed)
   npx serve .
   ```
4. **Open in browser**:
   Navigate to `http://localhost:8000` (or the port provided by your server).

### 🇮🇹 Italiano
1. **Clona la repository**:
   ```bash
   git clone https://github.com/ByFalco/autoscuola-carbonin.git
   ```
2. **Entra nella cartella**:
   ```bash
   cd autoscuola-carbonin
   ```
3. **Avvia un server locale**:
   Poiché il progetto utilizza `fetch()` per caricare i componenti, è necessario un server locale. Puoi usare l'estensione "Live Server" di VS Code o eseguire:
   ```bash
   # Usando Python
   python -m http.server 8000
   # O usando Node.js (se installato)
   npx serve .
   ```
4. **Apri nel browser**:
   Vai all'indirizzo `http://localhost:8000` (o alla porta indicata dal server).

## 💡 Usage / Utilizzo

| 🇺🇸 How to use | 🇮🇹 Come utilizzare |
| :--- | :--- |
| Navigate through the site using the top navigation bar. For updates, simply edit the HTML files in the root or subfolders (`patenti/`, `servizi/`). Components like the navbar and footer are located in the `components/` folder. | Naviga nel sito utilizzando la barra di navigazione superiore. Per aggiornamenti, è sufficiente modificare i file HTML nella root o nelle sottocartelle (`patenti/`, `servizi/`). I componenti come navbar e footer si trovano nella cartella `components/`. |

## ⚙️ Configuration / Configurazione

| 🇺🇸 Notes | 🇮🇹 Note |
| :--- | :--- |
| Deployment is pre-configured for Vercel via `vercel.json`. It handles URL rewrites to remove the `.html` extension for a cleaner look and better SEO. | Il deployment è pre-configurato per Vercel tramite `vercel.json`. Gestisce i rewrite degli URL per rimuovere l'estensione `.html`, migliorando l'estetica e la SEO. |

## 🤝 Contributing / Contributi

| 🇺🇸 Guidelines | 🇮🇹 Linee Guida |
| :--- | :--- |
| Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change. | I contributi sono i benvenuti! Senti libero di inviare una Pull Request. Per modifiche sostanziali, apri prima un'issue per discutere i cambiamenti proposti. |

## 📄 License / Licenza

| 🇺🇸 License | 🇮🇹 Licenza |
| :--- | :--- |
| This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). | Questo progetto è rilasciato sotto licenza [MIT](https://opensource.org/licenses/MIT). |

> ### ⚠️ Important / Importante
>
> **🇺🇸 English**: The MIT license applies exclusively to the software code. The name, brand, and images of the driving school (Autoscuola Carbonin) are the exclusive property of the owner and cannot be reused without explicit authorization.
>
> **🇮🇹 Italiano**: La licenza MIT si applica esclusivamente al codice del software. Il nome, il marchio e le immagini dell'autoscuola (Autoscuola Carbonin) rimangono proprietà esclusiva del titolare e non possono essere riutilizzati senza autorizzazione esplicita.

## 📞 Contact / Contatti

| 🇺🇸 Reach out | 🇮🇹 Contatti |
| :--- | :--- |
| **Maintainer**: [ByFalco](https://github.com/ByFalco) | **Maintainer**: [ByFalco](https://github.com/ByFalco) |
| **Autoscuola Carbonin**: [+39 0422 590972](tel:+390422590972) | **Autoscuola Carbonin**: [+39 0422 590972](tel:+390422590972) |
