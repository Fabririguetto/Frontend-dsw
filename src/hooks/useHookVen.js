import { useEffect, useState } from 'react';

export const useHookVen = () => {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]); // Nuevo estado para clientes
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(''); // Nuevo estado para cliente seleccionado

  useEffect(() => {
    fetchVentas();
    fetchClientes(); // Llamada para cargar los clientes
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

  const fetchClientes = () => {
    fetch('http://localhost:3500/clientes') // Asegúrate de tener una ruta para obtener clientes
      .then((response) => response.json())
      .then((clientes) => {
        if (Array.isArray(clientes)) {
          setClientes(clientes);
        } else {
          setClientes([]); // En caso de que la respuesta no sea un array
        }
      })
      .catch((error) => {
        console.error('Error fetching clientes:', error);
        setClientes([]); // En caso de error, establecer clientes como un array vacío
      });
  };

  const iniciarVenta = async (montoTotal, DNIEmpleado, idCliente) => {
    if (!idCliente) {
      alert("Por favor selecciona un cliente para la venta.");
      return;
    }

    const fechaHoraVenta = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
        const response = await fetch('http://localhost:3500/crearVenta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                montoTotal,
                DNIEmpleado,
                idCliente,
                fechaHoraVenta
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Venta creada con éxito:', data);
        } else {
            const data = await response.json();
            console.error('Error al crear la venta', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const handleDetalleClick = (venta) => {
    const nuevaPestaña = window.open(`/detalle_venta/${venta.idVenta}`, '_blank');
    if (nuevaPestaña) {
      nuevaPestaña.focus(); // Asegurarse de que la nueva pestaña esté enfocada
    }
  };

  const cerrarDetalle = () => {
    setMostrarDetalle(false); // Oculta la subventana
    setVentaSeleccionada(null); // Limpia la venta seleccionada
  };

  return {
    ventas,
    clientes, // Retornar los clientes
    ventaSeleccionada,
    mostrarDetalle,
    iniciarVenta,
    fetchVentas,
    handleDetalleClick,
    cerrarDetalle,
    clienteSeleccionado, // Retornar el estado de cliente seleccionado
    setClienteSeleccionado, // Método para actualizar el cliente seleccionado
  };
};
