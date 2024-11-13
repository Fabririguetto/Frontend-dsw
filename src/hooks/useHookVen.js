import { useEffect, useState } from 'react';

export const useHookVen = () => {
  const [ventas, setVentas] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(''); // Estado para el DNI del cliente
  const [filtro, setFiltro] = useState(''); // Estado para el filtro de búsqueda

  useEffect(() => {
    fetchVentas(); // Carga inicial de ventas
  }, []);

  // Fetch de ventas (puede filtrar según el estado)
  const fetchVentas = (filtro = '') => {
    let url = `http://localhost:3500/ventas`;
    if (filtro) {
      url += `?filtro=${encodeURIComponent(filtro)}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((ventas) => {
        if (Array.isArray(ventas)) {
          setVentas(ventas);
        } else {
          setVentas([]); // Si la respuesta no es un array, establecer vacío
        }
      })
      .catch((error) => {
        console.error('Error fetching ventas:', error);
        setVentas([]); // En caso de error, establecer ventas como array vacío
      });
  };

  // Función para buscar cliente según el DNI
  const fetchClientePorDni = (dni) => {
    if (!dni) {
      console.error('DNI vacío o no proporcionado');
      return Promise.resolve(null); // Evitar hacer la solicitud si el DNI está vacío
    }

    return fetch(`http://localhost:3500/clientesventa/${dni}`)
      .then((response) => response.json())
      .then((cliente) => {
        console.log('Respuesta del servidor:', cliente);
        if (cliente && cliente.idCliente) {
          return cliente.idCliente; // Devolver directamente el idCliente
        } else {
          return null; // Cliente no encontrado
        }
      })
      .catch((error) => {
        console.error('Error fetching cliente:', error);
        return null; // Retornar null si hay error
      });
  };

  // Función para validar si el cliente existe antes de crear la venta
  const validarCliente = async (dni) => {
    console.log('DNI recibido:', dni);  // Verifica que el valor recibido sea el DNI
    
    // Asegúrate de que fetchClientePorDni esté buscando por el DNI y no por el ID
    const idCliente = await fetchClientePorDni(dni);
    
    if (!idCliente) {
      alert('Cliente no encontrado.');
      return null;  // Retorna null si no encuentra el cliente
    }
  
    return idCliente;  // Si existe, retorna el ID del cliente
  };

  // Función para iniciar una venta
  const iniciarVenta = async (montoTotal, DNIEmpleado, clienteDNI) => {
    if (!clienteDNI || !montoTotal || !DNIEmpleado) {
      alert('Por favor, complete todos los campos antes de crear la venta.');
      return;
    }

    const idCliente = await validarCliente(clienteDNI); // Validar cliente y obtener el idCliente
    if (!idCliente) {
      return; // Si el cliente no es válido, no se crea la venta
    }

    const fechaHoraVenta = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
      const response = await fetch('http://localhost:3500/ventas/crearVenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          montoTotal,
          DNIEmpleado,
          idCliente, // Usar directamente el idCliente obtenido
          fechaHoraVenta,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Venta creada con éxito:', data);
        return data; // Devolver la venta creada (o los datos de la venta)
      } else {
        const data = await response.json();
        console.error('Error al crear la venta', data);
        return null; // No se pudo crear la venta
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const handleSearch = ({ filtro }) => {
    let url = `http://localhost:3500/ventas?filtro=${encodeURIComponent(filtro)}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((ventas) => setVentas(Array.isArray(ventas) ? ventas : []))
      .catch((error) => {
        console.error('Error al buscar ventas:', error);
        setVentas([]); // En caso de error, establecer ventas como un array vacío
      });
  };

  // Función para manejar el clic en detalle de venta
  const handleDetalleClick = (venta) => {
    const nuevaPestaña = window.open(`/detalle_venta/${venta.idVenta}`, '_blank');
    if (nuevaPestaña) {
      nuevaPestaña.focus();
    }
  };

  // Función para manejar cambios en el filtro
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFiltro(value);
    fetchVentas(value); // Actualizar las ventas según el filtro
  };

  return {
    ventas,
    iniciarVenta,
    fetchVentas,
    handleDetalleClick,
    validarCliente,
    handleSearch,
    handleFilterChange,
    clienteSeleccionado,
    setClienteSeleccionado,
  };
};
