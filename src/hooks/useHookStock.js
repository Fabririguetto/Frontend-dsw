import { useState, useEffect } from 'react';

function useStock() {
  const [productos, setProductos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0); // Total de productos
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
    const estado = filters.estado || '';  // Si necesitas usar el estado en el filtro
  
    // Validar el límite y la página
    const maxLimit = 40;  // Límite máximo
    const minLimit = 20;  // Límite mínimo
    const maxPage = Math.ceil(totalProductos / limit); // Total de páginas
  
    // Validar límite
    const validatedLimit = limit > maxLimit ? maxLimit : (limit < minLimit ? minLimit : limit);
  
    // Validar página
    const validatedPage = page >= maxPage ? maxPage - 1 : (page < 0 ? 0 : page);
  
    const url = `http://localhost:3500/stock?producto=${nombreProducto}&pagina=${validatedPage}&limite=${validatedLimit}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (Array.isArray(data.productos)) {
        setProductos(data.productos);  // Establecer productos
        setTotalProductos(data.totalProductos);  // Establecer total de productos
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
      options.body = JSON.stringify(body);  // Solo agregar el cuerpo para POST o PUT
    }
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;  // Devolver los datos de la respuesta
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProductos();  // Llamar a la función para obtener productos
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

  // Para editar un producto
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
        .then(() => fetchProductos())  // Recargar los productos después de eliminar
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
