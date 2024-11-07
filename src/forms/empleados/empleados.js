import React from 'react';
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
  } = useEmpleados();

  const renderEmpleados = () => {
    if (empleados.length === 0) {
      return (
        <div className="card">
          <p>No hay empleados disponibles</p>
        </div>
      );
    }

    return (
      <div className="card-container">
        {empleados.map((empleado) => (
          <div key={empleado.DNI_CUIL} className="card">
            <h3 className="card-title">{empleado.nombre_apellidoEmp}</h3>
            <p className="card-text">DNI/CUIL: {empleado.DNI_CUIL}</p>
            <p className="card-text">Contacto: {empleado.contacto}</p>
            <p className="card-text">Sucursal: {empleado.nombreSucursal}</p>
            <div className="button-container">
              <button className="card-button" onClick={() => handleSelectEmpleado(empleado)}>
                Modificar
              </button>
              <button className="card-button" onClick={resetForm}>
                Cancelar
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
        <button type="submit">
          {isEditMode ? 'Modificar' : 'Ingresar'}
        </button>
        {isEditMode && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>
      {renderEmpleados()}
    </div>
  );
}

export default FormEmpleados;
