import React from 'react';
import ReactDOM from 'react-dom';
import './indice.css';
import Aplicacion from './Aplicacion';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Aplicacion />
  </BrowserRouter>,
  document.getElementById('root') // Cambia 'root' al id de tu elemento HTML donde quieres renderizar la app
);
