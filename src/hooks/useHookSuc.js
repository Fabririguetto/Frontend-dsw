// src/hooks/useSucursales.js
import { useEffect, useState } from 'react';

const useSucursales = () => {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await fetch('http://localhost:3500/sucursales');
        const data = await response.json();
        if (Array.isArray(data)) {
          setSucursales(data);
        } else {
          setSucursales([]); // En caso de que la respuesta no sea un array
        }
      } catch (error) {
        console.error('Error fetching sucursales:', error);
        setSucursales([]); // En caso de error, establecer sucursales como un array vacío
      }
    };

    fetchSucursales();
  }, []);

  return sucursales;
};

export default useSucursales;
