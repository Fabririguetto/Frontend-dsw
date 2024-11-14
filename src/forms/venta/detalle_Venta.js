import React, { useEffect, useState } from 'react';
import './detalle_Venta.css';

function DetalleVenta({ venta, closeModal }) {
  const [detallesVenta, setDetallesVenta] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true); 
    fetch(`http://localhost:3500/detalle_ventas/${venta.idVenta}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDetallesVenta(data);
        } else {
          console.error('Error: La respuesta no es un array', data);
          setDetallesVenta([]);
        }
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching venta:', error);
        setLoading(false);
      });
  }, [venta]);

  const renderDetalles = () => {
    if (detallesVenta.length === 0) {
      return (
        <tr>
          <td colSpan="4">No se encontraron detalles para esta venta.</td>
        </tr>
      );
    }

    return detallesVenta.map((detalle, index) => (
      <tr key={index}>
        <td>{detalle.articulo}</td>
        <td>{detalle.descripcion}</td>
        <td>{detalle.cantidadVendida}</td>
        <td>{detalle.subtotal}</td>
      </tr>
    ));
  };

  if (loading) {
    return <div>Cargando detalles de la venta...</div>;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={closeModal}>&times;</span>
        <h2>Detalles de la Venta {venta.idVenta}</h2>
        <div className="tabla-container">
          <table className="tabla-negra">
            <thead>
              <tr>
                <th>Artículo</th>
                <th>Descripción</th>
                <th>Cantidad Vendida</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {renderDetalles()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DetalleVenta;