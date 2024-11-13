import { useEffect, useState } from 'react';

const useEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [sucursales, setSucursales] = useState([]);
  const [dniCuil, setDniCuil] = useState('');
  const [nombreApellido, setNombreApellido] = useState('');
  const [contacto, setContacto] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
 

  useEffect(() => {
    fetchEmpleados();
    fetchSucursales();
  }, []);

  const fetchEmpleados = () => {
    fetch('http://localhost:3500/empleados')
      .then((response) => response.json())
      .then((data) => {
        setEmpleados(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Error fetching empleados:', error);
        setEmpleados([]);
      });
  };

  const fetchSucursales = () => {
    fetch('http://localhost:3500/sucursales')
      .then((response) => response.json())
      .then((data) => {
        setSucursales(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Error fetching sucursales:', error);
        setSucursales([]);
      });
  };

  const createEmpleado = (empleado) => {
    fetch('http://localhost:3500/empleados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empleado),
    })
      .then(() => {
        fetchEmpleados();
        resetForm();
      })
      .catch((error) => console.error('Error al ingresar el empleado:', error));
  };

  const updateEmpleado = (id, empleado) => {
    fetch(`http://localhost:3500/empleados/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empleado),
    })
      .then(() => {
        fetchEmpleados();
        resetForm();
      })
      .catch((error) => console.error('Error al modificar el empleado:', error));
  };

  const handleIngresar = () => {
    const empleado = {
      DNI_CUIL: dniCuil,
      nombre_apellidoEmp: nombreApellido,
      contacto,
      sucursal,
    };
    if (isEditMode && selectedEmpleado) {
      updateEmpleado(selectedEmpleado.DNI_CUIL, empleado);
    } else {
      createEmpleado(empleado);
    }
  };

  const handleSelectEmpleado = (empleado) => {
    setSelectedEmpleado(empleado);
    setDniCuil(empleado.DNI_CUIL);
    setNombreApellido(empleado.nombre_apellidoEmp);
    setContacto(empleado.contacto);
    setSucursal(empleado.idSucursal);
    setIsEditMode(true);
  };

  const handleSearchEmpleados = (searchTerm) => {
    let url = 'http://localhost:3500/empleados';

    if (searchTerm) {
      url += `?nombre=${encodeURIComponent(searchTerm)}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEmpleados(data);
      })
      .catch((error) => {
        console.error('Error fetching empleados:', error);
      });
  };

  const resetForm = () => {
    setDniCuil('');
    setNombreApellido('');
    setContacto('');
    setSucursal('');
    setSelectedEmpleado(null);
    setIsEditMode(false);
  };

  return {
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
    handleSearchEmpleados, // Asegúrate de exportar la función
    isEditMode,
    resetForm,
  };
};

export default useEmpleados;