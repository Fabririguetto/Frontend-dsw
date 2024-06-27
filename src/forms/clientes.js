import React, { useEffect, useState } from 'react';
import '../App.css';

function FormClientes() {
  const [clientes, setClientes] = useState([]);

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
          setClientes([]); // En caso de que la respuesta no sea un array
        }
      })
      .catch((error) => {
        console.error('Error fetching clientes:', error);
        setClientes([]); // En caso de error, establecer clientes como un array vacío
      });
  };

  const renderClientes = () => {
    if (clientes.length === 0) {
      return (
        <tr>
          <td colSpan="5">No hay clientes disponibles</td>
        </tr>
      );
    }

    return clientes.map((cliente) => (
      <tr key={cliente.idCliente}>
        <td>{cliente.idCliente}</td>
        <td>{cliente.dni}</td>
        <td>{cliente.nombre_apellidoCli}</td>
        <td>{cliente.direccion}</td>
        <td>{cliente.contacto}</td>
      </tr>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="filtro" placeholder="Buscar..." />
      </header>
      <div className="tabla-container">
        <table id="tabla-clientes" className="tabla-negra">
          <thead>
            <tr>
              <th className="columna">ID Cliente</th>
              <th className="columna">DNI</th>
              <th className="columna">Nombre y Apellido</th>
              <th className="columna">Dirección</th>
              <th className="columna">Contacto</th>
            </tr>
          </thead>
          <tbody className="cuerpo-tabla">
            {renderClientes()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormClientes;
