import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Importa estilos globales (si tienes un index.css y un style.css)
import './styles/style.css';

// Renderiza la app en el root del HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
