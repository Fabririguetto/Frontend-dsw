// src/components/FormSucursales.js
import React from 'react';
import '../../App.css';
import useSucursales from '../../hooks/useHookSuc'; // Asegúrate de importar el hook

function FormSucursales() {
  const sucursales = useSucursales(); // Usar el hook para obtener sucursales

  const renderSucursales = () => {
    if (sucursales.length === 0) {
      return (
        <tr>
          <td colSpan="3">No hay sucursales disponibles</td>
        </tr>
      );
    }

    return sucursales.map((sucursal) => (
      <tr key={sucursal.idSucursal}>
        <td>{sucursal.idSucursal}</td>
        <td>{sucursal.nombreSucursal}</td>
        <td>{sucursal.direccion}</td>
      </tr>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="filtro" placeholder="Buscar..." />
      </header>
      <div className="tabla-container">
        <table id="tabla-prod" className="tabla-negra">
          <thead>
            <tr>
              <th className="columna">ID Sucursal</th>
              <th className="columna">Nombre Sucursal</th>
              <th className="columna">Dirección</th>
            </tr>
          </thead>
          <tbody className="cuerpo-tabla">
            {renderSucursales()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormSucursales;
