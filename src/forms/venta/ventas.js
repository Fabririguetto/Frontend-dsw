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
    handleSearch,
    clienteSeleccionado,
    setClienteSeleccionado,
    idClienteSeleccionado
  } = useHookVen();

  const [montoTotal, setMontoTotal] = useState(0);
  const [DNIEmpleado, setDNIEmpleado] = useState('');
  const [filtro, setFiltro] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null); // Para almacenar la venta seleccionada

  const handleFilterChange = (e) => {
    setFiltro(e.target.value);
    fetchVentas(filtro); // Pasar el filtro al hook para que haga la consulta
  };

  const handleDetalleClick = (venta) => {
    setVentaSeleccionada(venta); // Guardamos la venta seleccionada
    setIsModalOpen(true); // Abrimos el modal
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
          <button className='detallebtn' onClick={() => handleDetalleClick(venta)}>
            Ver Detalle
          </button>
        </td>
      </tr>
    ));
  };

  const handleCrearVenta = async () => {    
    const montoTotal = -1;
    const clienteValido = await validarCliente(clienteSeleccionado);
    
    if (!clienteValido) {
      alert('Cliente no válido. No se puede crear la venta.');
      return; 
    }
  
    const ventaCreada = await iniciarVenta(montoTotal, DNIEmpleado, idClienteSeleccionado);
    
    if (ventaCreada) {
      const nuevaVentaId = ventaCreada.id_venta;
      const nuevaPestaña = window.open(`/cargaventa/${nuevaVentaId}`, '_blank');
      if (nuevaPestaña) {
        nuevaPestaña.focus();
      }
    }
  };

  return (
    <div id="form-ventas-container">
      <header className="App-header" id="header-ventas">
        <input
          type="text"
          id="filtro-clientes"
          placeholder="Buscar por clientes o por empleados..."
          onChange={handleFilterChange}
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
          type='button' 
          id='nueva-venta-btn'  /* ID único para Nueva Venta */
          onClick={handleCrearVenta}
        >
          Nueva Venta
        </button>
      </div>
      
      <div id="tabla-ventas-container">
        <table id="tabla-ventas" className="tabla-negra">
          <thead>
            <tr>
              <th id="id-venta-col" className="columna">ID Venta</th>
              <th id="monto-total-col" className="columna">Monto Total</th>
              <th id="empleado-col" className="columna">Empleado</th>
              <th id="cliente-col" className="columna">Cliente</th>
              <th id="fecha-hora-col" className="columna">Fecha Hora</th>
              <th id="acciones-col" className="columna">Acciones</th>
            </tr>
          </thead>
          <tbody className="cuerpo-tabla">
            {renderVentas()}
          </tbody>
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