import { useState, useEffect } from 'react';

function useStock() {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    articulo: '',
    descripcion: '',
    cantidad: '',
    monto: '',
    idProducto: '',
  });
  const [filters, setFilters] = useState({
    estado: 'Disponible',
    nombreProducto: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'idProducto', direction: 'ascending' });
  const [pagina, setPagina] = useState(0);  // Página actual
  const [limite, setLimite] = useState(10);  // Límite de productos por página

  useEffect(() => {
    fetchProductos();
  }, [filters, pagina, limite]); // Recargar cuando cambian los filtros, página o límite

  const fetchProductos = async () => {
    // Construir la URL con los parámetros actuales
    const url = `http://localhost:3500/stock?producto=${filters.nombreProducto}`;

    // Imprimir la URL y los parámetros en la consola
    console.log('URL con parámetros:', url);

    // Realizar la solicitud
    const response = await fetch(url);
    const data = await response.json();
    setProductos(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.idProducto ? updateProducto(formData.idProducto, formData) : createProducto(formData);
  };

  const sendRequest = async (url, method, body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Error en la solicitud');
      return await response.json();
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  };

  const createProducto = (producto) => {
    sendRequest('http://localhost:3500/stock', 'POST', producto)
      .then(() => {
        fetchProductos();
        resetForm();
      })
      .catch((error) => console.error('Error al ingresar el producto:', error));
  };

  const updateProducto = (id, producto) => {
    sendRequest(`http://localhost:3500/stock/${id}`, 'PUT', producto)
      .then(() => {
        fetchProductos();
        resetForm();
      })
      .catch((error) => console.error('Error al modificar el producto:', error));
  };

  const handleSearch = () => {
    setPagina(0);  // Reiniciar a la primera página en caso de búsqueda nueva
    fetchProductos();
  };

  const handleEdit = (producto) => {
    setFormData({
      idProducto: producto.idProducto,
      articulo: producto.articulo,
      descripcion: producto.descripcion,
      cantidad: producto.cantidad,
      monto: producto.monto,
    });
  };

  const handleElim = (id, estadoActual) => {
    if (window.confirm('¿Seguro que quieres cambiar el estado de este producto?')) {
      sendRequest(`http://localhost:3500/stockelim/${id}`, 'PUT', { estado: estadoActual })
        .then(() => fetchProductos())
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

  const resetForm = () => {
    setFormData({
      articulo: '',
      descripcion: '',
      cantidad: '',
      monto: '',
      idProducto: '',
    });
  };

  const requestSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });
  };

  const sortedProductos = [...productos].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  const handlePageChange = (newPage) => {
    setPagina(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimite(newLimit);
  };

  return {
    productos,
    sortedProductos,
    formData,
    filters,
    handleInputChange,
    handleFilterChange,
    handleSubmit,
    handleEdit,
    handleElim,
    requestSort,
    resetForm,
    pagina,
    limite,
    handlePageChange,
    handleLimitChange,
  };
}

export default useStock;
