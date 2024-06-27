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
        setEmpleados(empleados);
      })
      .catch((error) => {
        console.error('Error fetching empleados:', error);
      });
  };

  const renderEmpleados = () => {
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
