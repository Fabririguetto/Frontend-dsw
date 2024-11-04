import React, { useEffect, useState } from 'react';
import '../App.css';
import './detalle_Venta.css'

function FormDetalleVentas({ venta, onClose }) {
  const [detalleVentas, setDetalleVentas] = useState([]);
  const [idProducto, setIdProducto] = useState('');
  const [articulo, setArticulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [monto, setMonto] = useState('');
  const [estado, setEstado] = useState('alta');

  useEffect(() => {
    fetchDetalleVentas();
  }, [venta]);

  const fetchDetalleVentas = () => {
    fetch('http://localhost:3500/DetalleVentas')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Para verificar los datos
        if (Array.isArray(data)) {
          setDetalleVentas(data);
        } else {
          setDetalleVentas([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching detalle ventas:', error);
        setDetalleVentas([]);
      });
  };

  const handleProductoChange = (e) => {
    setIdProducto(e.target.value);
  };

  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
  };

  const handleingresar = (e) => {
    e.preventDefault();
    // Lógica para ingresar el producto
  };

  const renderDetallecargaVentas = () => {
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
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          id="filtro"
          placeholder="Buscar..."
          onChange={handleProductoChange}
        />
        <select id="estado1" onChange={handleEstadoChange} value={estado}>
          <option value="alta">Alta</option>
          <option value="baja">Baja</option>
        </select>
      </header>
      <form onSubmit={handleingresar}>
        <input
          type="text"
          id="idProducto"
          placeholder="ID Producto"
          value={idProducto}
          readOnly
        />
        <input
          type="text"
          id="Articulo"
          placeholder="Artículo"
          value={articulo}
          onChange={(e) => setArticulo(e.target.value)}
        />
        <input
          type="text"
          id="descripcion"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          id="cantidad"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <input
          type="text"
          id="monto"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <button type="submit" id="ingresarstock">
          {idProducto ? 'eliminar' : ''}
        </button>
      </form>
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
            {renderDetallecargaVentas()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormDetalleVentas;