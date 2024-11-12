import React, { useState } from 'react';
import './venta.css';
import { useHookVen } from '../../hooks/useHookVen';

function FormVentas() {
  const { 
    ventas, 
    iniciarVenta, 
    handleDetalleClick, 
    clienteSeleccionado,
    setClienteSeleccionado,  
    idClienteSeleccionado, 
    validarCliente,
    fetchVentas
  } = useHookVen();

  const [montoTotal, setMontoTotal] = useState(0); // Estado para montoTotal
  const [DNIEmpleado, setDNIEmpleado] = useState(''); // Capturar el DNI del empleado
  const [filtro, setFiltro] = useState(''); // Estado para el filtro

  // Función para manejar cambios en el filtro y llamar a fetchVentas con filtro
  const handleFilterChange = (e) => {
    setFiltro(e.target.value);
    fetchVentas(filtro); // Pasar el filtro al hook para que haga la consulta
  };

  // Renderizar la lista de ventas
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
          <button onClick={() => handleDetalleClick(venta)}>Detalle</button>
        </td>
      </tr>
    ));
  };

  // Función para manejar la creación de una nueva venta
  const handleCrearVenta = async () => {    
    const montoTotal = -1
    // Verificar si el cliente es válido antes de proceder
    const clienteValido = await validarCliente(clienteSeleccionado);
    
    if (!clienteValido) {
      // Si el cliente no es válido, mostramos un mensaje y detenemos la ejecución
      alert('Cliente no válido. No se puede crear la venta.');
      return; // Detenemos la ejecución de la función si el cliente no es válido
    }
  
    // Si el cliente es válido, proceder a iniciar la venta con el monto, DNI del empleado e id del cliente
    const ventaCreada = await iniciarVenta(montoTotal, DNIEmpleado, idClienteSeleccionado);
    
    // Si la venta se crea con éxito, abrir la venta en una nueva ventana
    if (ventaCreada) {
      const nuevaVentaId = ventaCreada.id_venta; // Asegúrate de que el ID de la venta sea parte de la respuesta
      const nuevaPestaña = window.open(`/cargaventa/${nuevaVentaId}`, '_blank');
      if (nuevaPestaña) {
        nuevaPestaña.focus(); // Asegurarse de que la nueva pestaña esté enfocada
      }
    }
  };

  return (
    <div className='app'>
      <header className="App-header">
        <input
          type="text"
          id="filtro-clientes"
          placeholder="Buscar por clientes o por empleados..."
          onChange={(e) => handleFilterChange(e.target.value)} // Manejar búsqueda
        />
      </header>

      <div className='div-container'>
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
        <div>
          <label htmlFor="DNIEmpleado">DNI del Empleado</label>
          <input 
            type="text" 
            id="DNIEmpleado" 
            value={DNIEmpleado} 
            onChange={(e) => setDNIEmpleado(e.target.value)} 
            placeholder="Ingrese DNI del Empleado" 
          />
        </div>
        <button type='button' id='newVen' onClick={handleCrearVenta}>
          Nueva Venta
        </button>
      </div>
      
      {/* Tabla para mostrar las ventas */}
      <div className="tabla-container">
        <table id="tabla-ventas" className="tabla-negra">
          <thead>
            <tr>
              <th className="columna">ID Venta</th>
              <th className="columna">Monto Total</th>
              <th className="columna">Empleado</th>
              <th className="columna">Cliente</th>
              <th className="columna">Fecha Hora</th>
              <th className="columna">Acciones</th>
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
