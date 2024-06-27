import React, { useEffect, useState } from 'react';
import '../App.css';

function FormVentas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = () => {
    fetch('http://localhost:3500/ventas')
      .then((response) => response.json())
      .then((ventas) => {
        setVentas(ventas);
      })
      .catch((error) => {
        console.error('Error fetching ventas:', error);
      });
  };

  const renderVentas = () => {
    return ventas.map((venta) => (
      <tr key={venta.idVenta}>
        <td>{venta.idVenta}</td>
        <td>{venta.montoTotal}</td>
        <td>{venta.sucursal}</td>
        <td>{venta.pCliente}</td>
      </tr>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="filtro" placeholder="Buscar..." />
      </header>
      <div className="tabla-container">
        <table id="tabla-ventas" className="tabla-negra">
          <thead>
            <tr>
              <th className="columna">ID Venta</th>
              <th className="columna">Monto Total</th>
              <th className="columna">Sucursal</th>
              <th className="columna">Cliente</th>
            </tr>
          </thead>
          <tbody className="cuerpo-tabla">
            {renderVentas()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormVentas;
