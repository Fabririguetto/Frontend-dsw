import React from 'react';
import '../../App.css';
import useEmpleados from '../../hooks/useHookEmp';

function FormEmpleados() {
  const {
    empleados,
    sucursales,
    dniCuil,
    nombreApellido,
    contacto,
    sucursal,
    setDniCuil,
    setNombreApellido,
    setContacto,
    setSucursal,
    createEmpleado,
    updateEmpleado,
    handleEdit,
    resetForm,
  } = useEmpleados();

  const handleIngresar = (event) => {
    event.preventDefault();

    const empleado = {
      dniCuil,
      nombre_apellidoEmp: nombreApellido,
      contacto,
      sucursal,
    };

    createEmpleado(empleado);
  };

  const renderEmpleados = () => {
    if (empleados.length === 0) {
      return (
        <tr>
          <td colSpan="5">No hay empleados disponibles</td>
        </tr>
      );
    }

    return empleados.map((empleado) => (
      <tr key={empleado.DNI_CUIL}>
        <td>{empleado.DNI_CUIL}</td>
        <td>{empleado.nombre_apellidoEmp}</td>
        <td>{empleado.contacto}</td>
        <td>{empleado.sucursal}</td>
        <td>
          <button onClick={() => handleEdit(empleado)}>Modificar</button>
        </td>
      </tr>
    ));
  };

  const renderSucursalesOptions = () => {
    return sucursales.map((suc) => (
      <option key={suc.idSucursal} value={suc.idSucursal}>
        {suc.nombreSucursal}
      </option>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="filtro" placeholder="Buscar empleados por nombre o DNI..." />
      </header>
      <form onSubmit={handleIngresar}>
        <input
          type="text"
          id="dniCuil"
          placeholder="DNI/CUIL"
          value={dniCuil}
          onChange={(e) => setDniCuil(e.target.value)}
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
          id="contacto"
          placeholder="Contacto"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
        />
        <select
          id="sucursal"
          value={sucursal}
          onChange={(e) => setSucursal(e.target.value)}
        >
          <option value="">Seleccionar sucursal</option>
          {renderSucursalesOptions()}
        </select>
        <button type="submit">Ingresar</button>
      </form>
      <div className="tabla-container">
        <table className="tabla-negra">
          <thead>
            <tr>
              <th>DNI/CUIL</th>
              <th>Nombre y Apellido</th>
              <th>Contacto</th>
              <th>Sucursal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{renderEmpleados()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default FormEmpleados;
