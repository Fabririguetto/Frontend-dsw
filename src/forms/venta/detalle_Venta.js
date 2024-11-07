import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetalleVenta() {
  const { idVenta } = useParams(); // Captura el idVenta de la URL
  const [detallesVenta, setDetallesVenta] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    setLoading(true); // Empieza a cargar los datos
    fetch(`http://localhost:3500/detalle_ventas/${idVenta}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDetallesVenta(data);
        } else {
          console.error('Error: La respuesta no es un array', data);
          setDetallesVenta([]); // Si no es un array, inicializamos como array vacío
        }
        setLoading(false); // Finaliza la carga
      })
      .catch((error) => {
        console.error('Error fetching venta:', error);
        setLoading(false); // En caso de error, finaliza la carga
      });
  }, [idVenta]);

  // Función para renderizar los detalles de la venta
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
    <div>
      <h1>Detalle de la Venta {idVenta}</h1>
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
  );
}

export default DetalleVenta;