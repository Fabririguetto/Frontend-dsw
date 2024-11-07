import React, { useState, useEffect } from 'react';
import './sucursales.css';

function FormSucursales() {
  const [sucursales, setSucursales] = useState([]);
  const [filtro, setFiltro] = useState('');

  // Función para manejar cambios en el filtro
  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  // Función para obtener las sucursales filtradas del backend
  const fetchSucursales = async () => {
    try {
      const response = await fetch(`http://localhost:3500/sucursales?filtro=${filtro}`);
      const data = await response.json();
      setSucursales(data);
    } catch (error) {
      console.error('Error al obtener las sucursales:', error);
    }
  };

  // UseEffect para cargar las sucursales cada vez que el filtro cambie
  useEffect(() => {
    fetchSucursales(); // Llamar a fetchSucursales con el filtro
  }, [filtro]); // Solo se ejecutará cuando filtro cambie

  return (
    <div className="App sucursales-app">
      <header className="App-header sucursales-header">
        <input
          type="text"
          id="filtro-sucursal"
          value={filtro}
          onChange={handleFiltroChange}
          placeholder="Buscar por nombre o dirección de sucursal..."
          className="filtro-input"
        />
      </header>
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
    </div>
  );
}

export default FormSucursales;
