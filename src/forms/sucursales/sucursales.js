// src/components/FormSucursales.js
import React from 'react';
import '../../App.css';
import useSucursales from '../../hooks/useHookSuc';

function FormSucursales() {
  const sucursales = useSucursales();

  const renderSucursales = () => {
    if (sucursales.length === 0) {
      return (
        <div className="card">
          <p>No hay sucursales disponibles</p>
        </div>
      );
    }

    return (
      <div className="card-container">
        {sucursales.map((sucursal) => (
          <div key={sucursal.idSucursal} className="card">
            <h3 className="card-title">{sucursal.nombreSucursal}</h3>
            <p className="card-text">ID: {sucursal.idSucursal}</p>
            <p className="card-text">Dirección: {sucursal.direccion}</p>
            <div className="card-button-container">
              <button className="card-button" onClick={() => alert(`Sucursal ${sucursal.nombreSucursal} seleccionada`)}>
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="filtro" placeholder="Buscar sucursales..." />
      </header>
      <div className="card-container">
        {renderSucursales()}
      </div>
    </div>
  );
}

export default FormSucursales;