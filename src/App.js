import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import Stock from './forms/stock/stock';
import Clientes from './forms/clientes/clientes';
import Sucursales from './forms/sucursales/sucursales';
import Ventas from './forms/venta/ventas';
import Empleados from './forms/empleados/empleados';
import DetalleVenta from './forms/venta/detalle_Venta';
import DetalleCargarVenta from './forms/venta/cargaventa';  

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/ventas" activeClassName="active">Ventas</NavLink>
            <NavLink to="/stock" activeClassName="active">Stock</NavLink>
            <NavLink to="/clientes" activeClassName="active">Clientes</NavLink>
            <NavLink to="/empleados" activeClassName="active">Empleados</NavLink>
            <NavLink to="/sucursales" activeClassName="active">Sucursales</NavLink>
          </nav>
        </header>

        <div className="Content">
          <Routes>
            {/* Ruta predeterminada que redirige a /ventas */}
            <Route path="/" element={<Navigate to="/ventas" />} />

            <Route path="/stock" element={<Stock />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/detalle_venta/:idVenta" element={<DetalleVenta />} />
            <Route path="/cargaventa/:idVenta" element={<DetalleCargarVenta />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;