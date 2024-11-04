import React, { useEffect, useState } from 'react';
import '../../App.css';
import './detalle_Venta.css'

function FormDetalleVentas({ venta, onClose }) {
  const [detalleVentas, setDetalleVentas] = useState([]);

  useEffect(() => {
    fetchDetalleVentas();
  }, [venta]); // Ejecutar fetchDetalleVentas cada vez que la venta seleccionada cambie

  const fetchDetalleVentas = () => {
    fetch('http://localhost:3500/DetalleVentas')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDetalleVentas(data);
        } else {
          setDetalleVentas([]); // En caso de que la respuesta no sea un array
        }
      })
      .catch((error) => {
        console.error('Error fetching detalle ventas:', error);
        setDetalleVentas([]); // En caso de error, establecer detalleVentas como un array vacío
      });
  };

  const renderDetalleVentas = () => {
    if (detalleVentas.length === 0) {
      return (
        <tr>
          <td colSpan="4">No hay detalles de ventas disponibles</td>
        </tr>
      );
    }

    return detalleVentas.map((detalle) => (
      <tr key={detalle.idProducto}>
        <td>{detalle.idProducto}</td>
        <td>{detalle.fechaHoraVenta}</td>
        <td>{detalle.cantidadVendida}</td>
        <td>{detalle.subtotal}</td>
      </tr>
    ));
  };

  return (
    <div className="divDet">
     <header >
        <h2>Detalle de Ventas</h2>
        <button classname="butclose" onClick={onClose}>Cerrar</button>
     </header>      
      <div className="tabla-container">
        <table id="tabla-detalle-ventas" className="tabla-negra">
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Fecha Hora Venta</th>
              <th>Cantidad Vendida</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody className="cuerpo-tabla">
            {renderDetalleVentas()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormDetalleVentas;