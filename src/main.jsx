import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"; // Import React Router
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider> {/* Aggiunto qui */}
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);