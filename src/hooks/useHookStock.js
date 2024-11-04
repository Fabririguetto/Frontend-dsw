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
    estado: 'Alta',
    nombreProducto: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'idProducto', direction: 'ascending' });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = () => {
    fetch('http://localhost:3500/stock')
      .then((response) => response.json())
      .then((productos) => setProductos(Array.isArray(productos) ? productos : []))
      .catch((error) => {
        console.error('Error fetching productos:', error);
        setProductos([]);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    handleSearch({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.idProducto ? updateProducto(formData.idProducto, formData) : createProducto(formData);
  };

  const sendRequest = (url, method, body) => {
    return fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((response) => response.json());
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

  const handleSearch = ({ estado, nombreProducto }) => {
    let url = `http://localhost:3500/stock?estado=${encodeURIComponent(estado)}`;
    if (nombreProducto) url += `&producto=${encodeURIComponent(nombreProducto)}`;

    fetch(url)
      .then((response) => response.json())
      .then((productos) => setProductos(Array.isArray(productos) ? productos : []))
      .catch((error) => {
        console.error('Error al buscar productos:', error);
        setProductos([]);
      });
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
  };
}

export default useStock;