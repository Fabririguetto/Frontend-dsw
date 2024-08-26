import React, { useEffect, useState } from 'react';
import '../App.css';

function FormClientes() {
  const [clientes, setClientes] = useState([]);
  const [dni, setDni] = useState('');
  const [nombreApellido, setNombreApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [contacto, setContacto] = useState('');
  const [idCliente, setIdCliente] = useState(''); 
  const [sortConfig, setSortConfig] = useState({ key: 'idCliente', direction: 'ascending' }); // Estado para ordenar

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

  const handleIngresar = (event) => {
    event.preventDefault();

    const cliente = {
      dni,
      nombre_apellidoCli: nombreApellido,
      direccion,
      contacto,
    };

    if (idCliente) {
      updateCliente(idCliente, cliente);
    } else {
      createCliente(cliente);
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
        resetForm();
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
        resetForm();
      })
      .catch((error) => {
        console.error('Error al modificar el cliente:', error);
      });
  };

  const handleEdit = (cliente) => {
    setIdCliente(cliente.idCliente);
    setDni(cliente.dni);
    setNombreApellido(cliente.nombre_apellidoCli);
    setDireccion(cliente.direccion);
    setContacto(cliente.contacto);
  };


  const resetForm = () => {
    setIdCliente('');
    setDni('');
    setNombreApellido('');
    setDireccion('');
    setContacto('');
  };

  // Función para manejar la solicitud de ordenamiento
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Función para ordenar los clientes basados en la configuración de ordenamiento
  const sortedClientes = [...clientes].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const renderClientes = () => {
    if (clientes.length === 0) {
      return (
        <tr>
          <td colSpan="6">No hay clientes disponibles</td>
        </tr>
      );
    }

    return sortedClientes.map((cliente) => (
      <tr key={cliente.idCliente}>
        <td>{cliente.idCliente}</td>
        <td>{cliente.dni}</td>
        <td>{cliente.nombre_apellidoCli}</td>
        <td>{cliente.direccion}</td>
        <td>{cliente.contacto}</td>
        <td>
          <button id='botmod' onClick={() => handleEdit(cliente)}>Modificar</button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          id="filtro"
          placeholder="Buscar clientes por nombre o DNI..."
          onChange={(e) => handleSearchClientes(e.target.value)}
        />
      </header>
      <form onSubmit={handleIngresar}>
        <input
          type="text"
          id="idCliente"
          placeholder="ID Cliente"
          value={idCliente}
          readOnly
        />
        <input
          type="text"
          id="dni"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <input
          type="text"
          id="nombreApellido"
          placeholder="Nombre y Apellido"
          value={nombreApellido}
          onChange={(e) => setNombreApellido(e.target.value)}
        />
        <input
          type="text"
          id="direccion"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <input
          type="text"
          id="contacto"
          placeholder="Contacto"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
        />
        <button type="submit" id="ingresarCliente">
          {idCliente ? 'Modificar' : 'Ingresar'}
        </button>
      </form>
      <div className="tabla-container">
        {<table id="tabla-clientes" className="tabla-negra">
          <thead>
            <tr>
              <th className="columna" onClick={() => requestSort('idCliente')}>ID Cliente</th>
              <th className="columna" onClick={() => requestSort('dni')}>DNI</th>
              <th className="columna" onClick={() => requestSort('nombre_apellidoCli')}>Nombre y Apellido</th>
              <th className="columna" onClick={() => requestSort('direccion')}>Dirección</th>
              <th className="columna" onClick={() => requestSort('contacto')}>Contacto</th>
              <th className="columna">Acciones</th>
            </tr>
          </thead>
          <tbody className="cuerpo-tabla">
            {renderClientes()}
          </tbody>
        </table>
        }
      </div>
    </div>
  );
}

export default FormClientes;
