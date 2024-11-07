import React from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Stock from './forms/stock/stock';
import Clientes from './forms/clientes/clientes';
import Sucursales from './forms/sucursales/sucursales';
import Ventas from './forms/venta/ventas';
import Empleados from './forms/empleados/empleados';
import DetalleVenta from './forms/venta/detalle_Venta';  // Asegúrate de que la ruta sea correcta
import CargaDetalle from './forms/venta/detallecargaventa';  // Cambio a mayúscula al inicio

// Función para resaltar el enlace activo
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={isActive ? 'active' : ''} // Se agrega la clase "active" si el enlace está activo
    >
      {children}
    </Link>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/stock">Stock</NavLink>
            <NavLink to="/ventas">Ventas</NavLink>
            <NavLink to="/clientes">Clientes</NavLink>
            <NavLink to="/empleados">Empleados</NavLink>
            <NavLink to="/sucursales">Sucursales</NavLink>
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
            <Route path="/detallecargaventa/:idVenta" element={<CargaDetalle />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
