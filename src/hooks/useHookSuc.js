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
          setSucursales([]); 
        }
      } catch (error) {
        console.error('Error fetching sucursales:', error);
        setSucursales([]);
      }
    };

    fetchSucursales();
  }, []);

  return sucursales;
};

export default useSucursales;
