import React, { useEffect, useState } from 'react';
import '../App.css';

function FormSucursales() {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    fetchSucursales();
  }, []);

  const fetchSucursales = () => {
    fetch('http://localhost:3500/sucursales')
      .then((response) => response.json())
      .then((sucursales) => {
        setSucursales(sucursales);
      })
      .catch((error) => {
        console.error('Error fetching sucursales:', error);
      });
  };

  const renderSucursales = () => {
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
