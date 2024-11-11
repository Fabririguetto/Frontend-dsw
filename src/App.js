import React from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Stock from './forms/stock/stock';
import Clientes from './forms/clientes/clientes';
import Sucursales from './forms/sucursales/sucursales';
import Ventas from './forms/venta/ventas';
import Empleados from './forms/empleados/empleados';
import DetalleVenta from './forms/venta/detalle_Venta';  
import DetalleCargarVenta from './forms/venta/detallecargaventa'; 

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/stock">Stock</Link>
            <Link to="/ventas">Ventas</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/empleados">Empleados</Link>
            <Link to="/sucursales">Sucursales</Link>
          </nav>
        </header>

        <div className="Content">
          <Routes>
            <Route path="/stock" element={<Stock />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/detalle_venta/:idVenta" element={<DetalleVenta />} />
            <Route path="/detallecargaventa/:idVenta" element={<DetalleCargarVenta />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
