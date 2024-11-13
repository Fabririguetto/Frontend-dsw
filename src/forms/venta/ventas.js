import React, { useState } from 'react';
import './venta.css';
import DetalleVenta from './detalle_Venta';
import { useHookVen } from '../../hooks/useHookVen';

function FormVentas() {
  const {
    ventas,
    iniciarVenta,
    fetchVentas,
    validarCliente,
    clienteSeleccionado,
    setClienteSeleccionado,
  } = useHookVen();

  const [DNIEmpleado, setDNIEmpleado] = useState('');
  const [filtro, setFiltro] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const handleFilterChange = (e) => {
    const nuevoFiltro = e.target.value;
    setFiltro(nuevoFiltro);
    fetchVentas(nuevoFiltro); // Usar el valor actualizado directamente
  };

  const handleDetalleClick = (venta) => {
    setVentaSeleccionada(venta);
    setIsModalOpen(true);
  };

  const handleCrearVenta = async () => {
    // Validar los datos antes de crear la venta
    let montoTotal = -1

    if (!DNIEmpleado) {
      alert('Por favor ingrese el DNI del empleado.');
      return;
    }
    if (!clienteSeleccionado) {
      alert('Por favor ingrese el DNI del cliente.');
      return;
    }

    console.log(montoTotal, DNIEmpleado, clienteSeleccionado)
    // Crear venta usando el ID del cliente válido
    const ventaCreada = await iniciarVenta(montoTotal, DNIEmpleado, clienteSeleccionado);
    if (ventaCreada) {
      const nuevaVentaId = ventaCreada.id_venta;
      const nuevaPestaña = window.open(`/cargaventa/${nuevaVentaId}`, '_blank');
      if (nuevaPestaña) {
        nuevaPestaña.focus();
      }
    }
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
        <td>{venta.nombre_apellidoEmp}</td>
        <td>{venta.nombre_apellidoCli}</td>
        <td>{venta.fechaHoraVenta}</td>
        <td>
          <button className="detallebtn" onClick={() => handleDetalleClick(venta)}>
            Ver Detalle
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div id="form-ventas-container">
      <header className="App-header" id="header-ventas">
        <input
          type="text"
          id="filtro-clientes"
          placeholder="Buscar por clientes o por empleados..."
          onChange={handleFilterChange}
          value={filtro} // Agregar el valor del filtro
        />
      </header>

      <div id="form-venta-inputs" className="div-container">
        <div id="cliente-input">
          <label htmlFor="cliente">Ingresar DNI del Cliente para una nueva venta</label>
          <input
            type="text"
            id="cliente"
            value={clienteSeleccionado}
            onChange={(e) => setClienteSeleccionado(e.target.value)}
            placeholder="Ingrese DNI del Cliente"
          />
        </div>
        <div id="dni-empleado-input">
          <label htmlFor="DNIEmpleado">DNI del Empleado</label>
          <input
            type="text"
            id="DNIEmpleado"
            value={DNIEmpleado}
            onChange={(e) => setDNIEmpleado(e.target.value)}
            placeholder="Ingrese DNI del Empleado"
          />
        </div>
        <button
          type="button"
          id="nueva-venta-btn"
          onClick={handleCrearVenta}
        >
          Nueva Venta
        </button>
      </div>

      <div id="tabla-ventas-container">
        <table id="tabla-ventas" className="tabla-negra">
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>Monto Total</th>
              <th>Empleado</th>
              <th>Cliente</th>
              <th>Fecha Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{renderVentas()}</tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && ventaSeleccionada && (
        <DetalleVenta
          venta={ventaSeleccionada}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default FormVentas;
