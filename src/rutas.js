import React from 'react';
import ReactDOM from 'react-dom';
import './indice.css';
import App from './App'; // Asegúrate de que la ruta sea correcta

ReactDOM.render(
  <App />,  // El BrowserRouter ya está envuelto en App.js
  document.getElementById('root') // Asegúrate de que el ID del elemento HTML sea correcto
);
