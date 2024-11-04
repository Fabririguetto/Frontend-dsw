import React, { useEffect, useState } from 'react';
import '../../App.css';
import FormDetalleVentas from './detalle_Venta'; // Asegúrate de que esta ruta sea correcta
import { useNavigate } from 'react-router-dom';


function FormVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null); // Venta seleccionada
  const [mostrarDetalle, setMostrarDetalle] = useState(false); // Controla la visibilidad de la subventana
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = () => {
    fetch('http://localhost:3500/ventas')
      .then((response) => response.json())
      .then((ventas) => {
        if (Array.isArray(ventas)) {
          setVentas(ventas);
        } else {
          setVentas([]); // En caso de que la respuesta no sea un array
        }
      })
      .catch((error) => {
        console.error('Error fetching ventas:', error);
        setVentas([]); // En caso de error, establecer ventas como un array vacío
      });
  };

  const handleDetalleClick = (venta) => {
    setVentaSeleccionada(venta); // Establece la venta seleccionada
    setMostrarDetalle(true); // Muestra la subventana
  };

  const handleNuevaVentaClick = () => {
    navigate('/detallecargaventa');
  };

  const cerrarDetalle = () => {
    setMostrarDetalle(false); // Oculta la subventana
    setVentaSeleccionada(null); // Limpia la venta seleccionada
  };

  const renderVentas = () => {
    if (ventas.length === 0) {
      return (
        <tr>
          <td colSpan="5">No hay ventas disponibles</td>
        </tr>
      );
    }

    return ventas.map((venta) => (
      <tr key={venta.idVenta}>
        <td>{venta.idVenta}</td>
        <td>{venta.montoTotal}</td>
        <td>{venta.sucursal}</td>
        <td>{venta.pCliente}</td>
        <td>
          <button onClick={() => handleDetalleClick(venta)}>Detalle</button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="filtro" placeholder="Buscar..." />
        <button type='button' id='newVen' onClick={handleNuevaVentaClick}>
          Nueva Venta
        </button>
      </header>
      <div className="tabla-container">
        <table id="tabla-ventas" className="tabla-negra">
          <thead>
            <tr>
              <th className="columna">ID Venta</th>
              <th className="columna">Monto Total</th>
              <th className="columna">Sucursal</th>
              <th className="columna">Cliente</th>
              <th className="columna">Acciones</th>
            </tr>
          </thead>
          <tbody className="cuerpo-tabla">
            {renderVentas()}
          </tbody>
        </table>
      </div>

      {/* Subventana para mostrar detalle de ventas */}
      {mostrarDetalle && (
        <FormDetalleVentas
          venta={ventaSeleccionada}
          onClose={cerrarDetalle}
        />
      )}
    </div>
  );
}

export default FormVentas;