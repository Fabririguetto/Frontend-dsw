import { useState, useEffect } from 'react';

function useStock() {
  const [productos, setProductos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
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
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  
  const fetchProductos = async () => {
    const nombreProducto = filters.nombreProducto || '';
    const estado = filters.estado || ''; 

  
    const maxLimit = 40;  
    const minLimit = 20;  
    const maxPage = Math.ceil(totalProductos / limit); 
  
    const validatedLimit = limit > maxLimit ? maxLimit : (limit < minLimit ? minLimit : limit);
  
    const validatedPage = page >= maxPage ? maxPage - 1 : (page < 0 ? 0 : page);
  
    const url = `http://localhost:3500/stock?producto=${nombreProducto}&pagina=${validatedPage}&limite=${validatedLimit}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (Array.isArray(data.productos)) {
        setProductos(data.productos);
        setTotalProductos(data.totalProductos);
      } else {
        console.error("La respuesta no es un array válido");
        setProductos([]);
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      setProductos([]);
    }
  };

  const sendRequest = async (url, method = 'GET', body = null) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [page, limit, filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.idProducto ? updateProducto(formData.idProducto, formData) : createProducto(formData);
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
      .catch((error) => console.error('Error al actualizar el producto:', error));
  };

  const resetForm = () => {
    setFormData({ articulo: '', descripcion: '', cantidad: '', monto: '', idProducto: '' });
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

  // Para eliminar un producto
  const handleElim = (idProducto) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      sendRequest(`http://localhost:3500/stock/${idProducto}`, 'DELETE')
        .then(() => fetchProductos())
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedProductos = [...productos].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return {
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
    page,
    limit,
    setPage,
    setLimit,
    totalProductos,
  };
}

export default useStock;
