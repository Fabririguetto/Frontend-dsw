import React, { useEffect, useState } from 'react';
import '../App.css';

function FormEmpleados() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = () => {
    fetch('http://localhost:3500/empleados')
      .then((response) => response.json())
      .then((empleados) => {
        if (Array.isArray(empleados)) {
          setEmpleados(empleados);
        } else {
          setEmpleados([]); // En caso de que la respuesta no sea un array
        }
      })
      .catch((error) => {
        console.error('Error fetching empleados:', error);
        setEmpleados([]); // En caso de error, establecer empleados como un array vacío
      });
  };

  const renderEmpleados = () => {
    if (empleados.length === 0) {
      return (
        <tr>
          <td colSpan="4">No hay empleados disponibles</td>
        </tr>
      );
    }

    return empleados.map((empleado) => (
      <tr key={empleado.DNI_CUIL}>
        <td>{empleado.DNI_CUIL}</td>
        <td>{empleado.nombre_apellidoEmp}</td>
        <td>{empleado.contacto}</td>
        <td>{empleado.sucursal}</td>
      </tr>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="filtro" placeholder="Buscar..." />
      </header>
      <div className="tabla-container">
        <table id="tabla-prod" className="tabla-negra">
          <thead>
            <tr>
              <th className="columna">DNI/CUIL</th>
              <th className="columna">Nombre y Apellido</th>
              <th className="columna">Contacto</th>
              <th className="columna">Sucursal</th>
            </tr>
          </thead>
          <tbody className="cuerpo-tabla">
            {renderEmpleados()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormEmpleados;
