import { useEffect, useState } from 'react';

const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'idCliente', direction: 'ascending' });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    fetch('http://localhost:3500/clientes')
      .then((response) => response.json())
      .then((clientes) => {
        if (Array.isArray(clientes)) {
          setClientes(clientes);
        } else {
          setClientes([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching clientes:', error);
        setClientes([]);
      });
  };

  const handleSearchClientes = async (nombre) => {
    let url = 'http://localhost:3500/clientes';

    if (nombre) {
      url += `?nombre=${encodeURIComponent(nombre)}`;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const clientes = await response.json();
      console.log('Clientes encontrados:', clientes);

      if (Array.isArray(clientes)) {
        setClientes(clientes);
      } else {
        setClientes([]);
      }
    } catch (error) {
      console.error('Error al buscar clientes:', error);
      setClientes([]);
    }
  };

  const createCliente = (cliente) => {
    fetch('http://localhost:3500/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Cliente ingresado correctamente:', data);
        fetchClientes();
      })
      .catch((error) => {
        console.error('Error al ingresar el cliente:', error);
      });
  };

  const updateCliente = (id, cliente) => {
    fetch(`http://localhost:3500/clientes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Cliente modificado correctamente:', data);
        fetchClientes();
      })
      .catch((error) => {
        console.error('Error al modificar el cliente:', error);
      });
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedClientes = [...clientes].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return {
    clientes: sortedClientes,
    fetchClientes,
    handleSearchClientes,
    createCliente,
    updateCliente,
    requestSort,
  };
};

export default useClientes;
