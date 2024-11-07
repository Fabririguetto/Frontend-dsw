// src/hooks/useEmpleados.js
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
    console.log('Contenido del empleado antes de enviar:', empleado);
    fetch('http://localhost:3500/empleados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleado),
    })
      .then((response) => response.json())
      .then(() => {
        fetchEmpleados();
        resetForm();
      })
      .catch((error) => {
        console.error('Error al ingresar el empleado:', error);
      });
  };

  const updateEmpleado = (id, empleado) => {
    fetch(`http://localhost:3500/empleados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleado),
    })
      .then((response) => response.json())
      .then(() => {
        fetchEmpleados();
        resetForm();
      })
      .catch((error) => {
        console.error('Error al modificar el empleado:', error);
      });
  };

const handleIngresar = () => {
  if (isEditMode) {
    //Actualizar empleado
    const updatedEmpleados = empleados.map((empleado) => 
      empleado.DNI_CUIL === selectedEmpleado.DNI_CUIL
        ? { ...empleado, nombre_apellidoEmp: nombreApellido, contacto, sucursal }
        : empleado
    );
    setEmpleados(updatedEmpleados);
    setIsEditMode(false); // Salir del modo de edición
  } else {
    //Ingresar nuevo empleado
    const nuevoEmpleado = {
      DNI_CUIL: dniCuil,
      nombre_apellidoEmp: nombreApellido,
      contacto,
      nombreSucursal: sucursales.find(suc => suc.idSucursal === sucursal)?.nombreSucursal || '',
      sucursal: sucursal,
    };
    setEmpleados([...empleados, nuevoEmpleado]);
  }

  //Limpiar el formulario
  resetForm();
};
const handleSelectEmpleado = (empleado) => {
  setSelectedEmpleado(empleado);
  setDniCuil(empleado.DNI_CUIL);
  setNombreApellido(empleado.nombre_apellidoEmp);
  setContacto(empleado.contacto);
  setSucursal(empleado.sucursal);
  setIsEditMode(true);
};

//Función para alternar entre el modo de edición y el de nuevo ingreso
const toggleEditMode = () => {
  if (isEditMode) {
    //Si está en modo edición, salir de ese modo
    setIsEditMode(false);
    resetForm();
  } else {
    //Si no está en modo edición, habilitarlo
    setIsEditMode(true);
  }
};

//Función para restablecer el formulario
const resetForm = () => {
  setDniCuil('');
  setNombreApellido('');
  setContacto('');
  setSucursal('');
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
    toggleEditMode,
    isEditMode,
    resetForm,
  };
};

export default useEmpleados;

