import React from 'react';
import ReactDOM from 'react-dom'; // Asegúrate de importar ReactDOM correctamente
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'; // Importa estilos de Bootstrap si los necesitas
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
