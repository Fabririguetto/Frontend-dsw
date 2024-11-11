import { useEffect, useState } from 'react';

export const useHookVen = () => {
  const [ventas, setVentas] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(''); // Estado para el DNI del cliente
  const [idClienteSeleccionado, setIdClienteSeleccionado] = useState(null); // Estado para almacenar el id_cliente
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
      return Promise.resolve(false); // Evitar hacer la solicitud si el DNI está vacío
    }

    return fetch(`http://localhost:3500/clientesventa/${dni}`)
      .then((response) => response.json())
      .then((cliente) => {
        console.log('Respuesta del servidor:', cliente);
        if (cliente && cliente.idCliente) {
          setIdClienteSeleccionado(cliente.idCliente);
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error('Error fetching cliente:', error);
        return false;
      });
  };

  // Función para validar si el cliente existe antes de crear la venta
  const validarCliente = async (dni) => {
    const clienteValido = await fetchClientePorDni(dni);
    if (!clienteValido) {
      alert('Cliente no encontrado.');
      setIdClienteSeleccionado(null);
    }
    return clienteValido;
  };

  // Función para iniciar una venta
  const iniciarVenta = async (montoTotal, DNIEmpleado, idClienteSeleccionado) => {
    if (!clienteSeleccionado || !montoTotal || !DNIEmpleado) {
      alert('Por favor, complete todos los campos antes de crear la venta.');
      return;
    }

    const clienteValido = await validarCliente(clienteSeleccionado);
    if (!clienteValido) {
      return; // Si el cliente no es válido, no se crea la venta
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
          idCliente: idClienteSeleccionado,
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
    idClienteSeleccionado
  };
};
