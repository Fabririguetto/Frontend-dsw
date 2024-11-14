import { useEffect, useState } from 'react';

export const useHookVen = () => {
  const [ventas, setVentas] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(''); 
  const [filtro, setFiltro] = useState(''); 
  useEffect(() => {
    fetchVentas();
  }, []);

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
          setVentas([]); 
        }
      })
      .catch((error) => {
        console.error('Error fetching ventas:', error);
        setVentas([]);
      });
  };

  const fetchClientePorDni = (dni) => {
    if (!dni) {
      console.error('DNI vacío o no proporcionado');
      return Promise.resolve(null); 
    }

    return fetch(`http://localhost:3500/clientesventa/${dni}`)
      .then((response) => response.json())
      .then((cliente) => {
        console.log('Respuesta del servidor:', cliente);
        if (cliente && cliente.idCliente) {
          return cliente.idCliente; 
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error('Error fetching cliente:', error);
        return null;
      });
  };

  const validarCliente = async (dni) => {
    console.log('DNI recibido:', dni);  
    
    const idCliente = await fetchClientePorDni(dni);
    
    if (!idCliente) {
      alert('Cliente no encontrado.');
      return null; 
    }
  
    return idCliente; 
  };

  const iniciarVenta = async (montoTotal, DNIEmpleado, clienteDNI) => {
    if (!clienteDNI || !montoTotal || !DNIEmpleado) {
      alert('Por favor, complete todos los campos antes de crear la venta.');
      return;
    }

    const idCliente = await validarCliente(clienteDNI); 
    if (!idCliente) {
      return;
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
          idCliente,
          fechaHoraVenta,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Venta creada con éxito:', data);
        return data; 
      } else {
        const data = await response.json();
        console.error('Error al crear la venta', data);
        return null;
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
        setVentas([]);
      });
  };

  const handleDetalleClick = (venta) => {
    const nuevaPestaña = window.open(`/detalle_venta/${venta.idVenta}`, '_blank');
    if (nuevaPestaña) {
      nuevaPestaña.focus();
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFiltro(value);
    fetchVentas(value);
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
