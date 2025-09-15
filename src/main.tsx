import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import global_en from './translations/en/global.json';
import global_pt from './translations/pt/global.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en', // default language
  resources: {
    en: {
      global: global_en
    },
    pt: {
      global: global_pt
    }
  }
});

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);


