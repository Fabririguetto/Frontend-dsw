import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Stock from './forms/stock';
import Clientes from './forms/clientes';
import Sucursales from './forms/sucursales';
import Ventas from './forms/ventas';
import Empleados from './forms/empleados';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/stock">Stock</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/sucursales">Sucursales</Link>
            <Link to="/ventas">Ventas</Link>
            <Link to="/empleados">Empleados</Link>
          </nav>
        </header>
       
        <div className="Content">
          <Routes>
            <Route path="/stock" element={<Stock />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/empleados" element={<Empleados />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
