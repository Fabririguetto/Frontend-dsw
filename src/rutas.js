import React from 'react';
import ReactDOM from 'react-dom';
import './indice.css';
import App from './App'; // Asegúrate de que la ruta sea correcta
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root') // Asegúrate de que el ID del elemento HTML sea correcto
);
