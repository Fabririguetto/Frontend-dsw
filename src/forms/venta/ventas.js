import React, { useState } from 'react';
import FormDetalleVentas from './detalle_Venta';
import { useHookVen } from '../../hooks/useHookVen';

function FormVentas() {
  const { 
    ventas, 
    clientes,  // Obtener la lista de clientes
    ventaSeleccionada, 
    mostrarDetalle, 
    iniciarVenta, 
    handleDetalleClick, 
    cerrarDetalle,
    clienteSeleccionado,
    setClienteSeleccionado  // Método para seleccionar cliente
  } = useHookVen();

  const [montoTotal, setMontoTotal] = useState(''); // Asegurarse de capturar el monto
  const [DNIEmpleado, setDNIEmpleado] = useState(''); // Para capturar el DNI del empleado

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
        <td>{venta.nombre_apellidoEmp}</td>
        <td>{venta.nombre_apellidoCli}</td>
        <td>
          <button onClick={() => handleDetalleClick(venta)}>Detalle</button>
        </td>
      </tr>
    ));
  };

  const handleCrearVenta = () => {
    montoTotal = 0
    DNIEmpleado = 44231125
    if (!montoTotal || !DNIEmpleado || !clienteSeleccionado) {
      alert("Por favor completa todos los campos.");
      return;
    }
    // Aquí estamos usando la función de actualización de estado de React
    iniciarVenta(montoTotal, DNIEmpleado, clienteSeleccionado);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input 
          type="text" 
          id="filtro" 
          placeholder="Buscar..." 
        />
        <div>
          <label htmlFor="cliente">Ingresar DNI del Cliente para una nueva venta</label>
          <input 
            type="text" 
            id="cliente" 
            value={clienteSeleccionado} 
            onChange={(e) => setClienteSeleccionado(e.target.value)} 
            placeholder="Ingrese DNI del Cliente" 
          />
        </div>
        <button type='button' id='newVen' onClick={handleCrearVenta}>
          Nueva Venta
        </button>
      </header>
      <div className="tabla-container">
        <table id="tabla-ventas" className="tabla-negra">
          <thead>
            <tr>
              <th className="columna">ID Venta</th>
              <th className="columna">Monto Total</th>
              <th className="columna">Empleado</th>
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
