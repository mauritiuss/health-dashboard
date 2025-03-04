# Health Dashboard

## Tecnologie utilizzate

- **React**: Libreria principale per la costruzione dell'interfaccia utente.
- **Vite**: Strumento di build veloce e leggero per progetti React.
- **Semantic UI React**: Libreria di componenti predefiniti per uno stile moderno e coerente.
- **PapaParse**: Libreria per la gestione e il parsing di file CSV.
- **React Router DOM**: Gestione delle rotte per una navigazione fluida all'interno dell'app.
- **Recharts**: Creazione di grafici interattivi e dinamici.
- **React Markdown**: Visualizzazione di contenuti Markdown in componenti React.
- **Helmet**: Gestione dinamica dei metadati in applicazioni React.

## Setup del progetto
Per eseguire il progetto in locale, segui questi passaggi:
```bash
# Clona il repository
git clone https://github.com/mauritiuss/health-dashboard.git
cd health-dashboard

# Inizializza il progetto con Vite
npm create vite@latest . --template react

# Installa le dipendenze
npm install

# Installa le librerie necessarie
npm install semantic-ui-react semantic-ui-css
npm install papaparse
npm install react-router-dom
npm install recharts
npm install react-markdown
npm install react-helmet-async

# Avvia il progetto
npm run dev
```
Assicurati di avere Node.js installato per eseguire i comandi ```npm```.

## Struttura del progetto
```bash
health-dashboard/
|-- src/
|   |-- components/       # Componenti riutilizzabili
|   |-- pages/            # Pagine principali dell'app
|   |-- data/             # File di dati (es. CSV)
|   |-- App.jsx           # Componente principale
|   |-- main.jsx          # Punto di ingresso
|-- public/               # File statici
|-- package.json         # Configurazione e dipendenze
|-- vite.config.js       # Configurazione di Vite
```

## Licenza
Questo progetto è distribuito sotto licenza MIT. Sentiti libero di utilizzarlo e modificarlo secondo le tue necessità.