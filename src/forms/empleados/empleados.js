import React from 'react';
import './empleados.css';
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
    handleIngresar,
    handleSelectEmpleado,
    toggleEditMode,
    isEditMode,
    resetForm,
    handleEliminarEmpleado, // nuevo método para baja lógica
  } = useEmpleados();

  const renderEmpleados = () => {
    if (empleados.length === 0) {
      return <p>No hay empleados disponibles</p>;
    }

    return (
      <div className="card-container">
        {empleados.map((empleado) => (
          <div key={empleado.DNI_CUIL} className="card">
            <h3 className="card-title">{empleado.nombre_apellidoEmp}</h3>
            <p className="card-text">DNI/CUIL: {empleado.DNI_CUIL}</p>
            <p className="card-text">Contacto: {empleado.contacto}</p>
            <p className="card-text">
              Sucursal: {empleado.sucursal?.idSucursal || 'No asignada'}
            </p>
            <div className="button-container">
              <button
                className="card-button card-button-modificar"
                onClick={() => handleSelectEmpleado(empleado)}
              >
                Editar
              </button>
              <button
                className="card-button card-button-eliminar"
                onClick={() => handleEliminarEmpleado(empleado.DNI_CUIL)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    );
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
      <form onSubmit={(e) => { e.preventDefault(); handleIngresar(); }}>
        <input
          type="text"
          placeholder="DNI/CUIL"
          value={dniCuil}
          onChange={(e) => setDniCuil(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre y Apellido"
          value={nombreApellido}
          onChange={(e) => setNombreApellido(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
        />
        <select
          value={sucursal}
          onChange={(e) => setSucursal(e.target.value)}
        >
          <option value="">Seleccionar sucursal</option>
          {renderSucursalesOptions()}
        </select>
        <button type="submit" className="card-button">
          {isEditMode ? 'Modificar' : 'Ingresar'}
        </button>
        {isEditMode && <button type="button" className="card-button" onClick={resetForm}>Cancelar</button>}
      </form>
      {renderEmpleados()}
    </div>
  );
}

export default FormEmpleados;