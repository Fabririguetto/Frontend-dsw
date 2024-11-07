// src/components/FormSucursales.js
import React from 'react';
import useSucursales from '../../hooks/useHookSuc';
import './sucursales.css';

function FormSucursales() {
  const sucursales = useSucursales();

  const renderSucursales = () => {
    if (sucursales.length === 0) {
      return (
        <div className="card no-sucursales">
          <p>No hay sucursales disponibles</p>
        </div>
      );
    }

    return (
      <div className="card-container">
        {sucursales.map((sucursal) => (
          <div key={sucursal.idSucursal} className="card sucursal-card">
            <h3 className="card-title sucursal-title">{sucursal.nombreSucursal}</h3>
            <p className="card-text sucursal-id">ID: {sucursal.idSucursal}</p>
            <p className="card-text sucursal-direccion">Dirección: {sucursal.direccion}</p>
            <div className="card-button-container sucursal-button-container">
              <button
                className="card-button sucursal-button"
                onClick={() => alert(`Sucursal ${sucursal.nombreSucursal} seleccionada`)}
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App sucursales-app">
      <header className="App-header sucursales-header">
        <input
          type="text"
          id="filtro-sucursales"
          placeholder="Buscar sucursales..."
          className="filtro-input"
        />
      </header>
      <div className="card-container">
        {renderSucursales()}
      </div>
    </div>
  );
}

export default FormSucursales;