import React, { useEffect, useState } from 'react';
import '../App.css';
import './stock.css';

function Formstock() {
  const [productos, setProductos] = useState([]);
  const [articulo, setArticulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [monto, setMonto] = useState('');
  const [idProducto, setIdProducto] = useState(''); 
  const [sortConfig, setSortConfig] = useState({ key: 'idProducto', direction: 'ascending' });
  const [estado, setEstado] = useState('Alta');
  const [nombreProducto, setNombreProducto] = useState('');


  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = () => {
    fetch('http://localhost:3500/stock')
      .then((response) => response.json())
      .then((productos) => {
        if (Array.isArray(productos)) {
          setProductos(productos);
        } else {
          setProductos([]); 
        }
      })
      .catch((error) => {
        console.error('Error fetching productos:', error);
        setProductos([]);
      });
  };

  const handleingresar = (event) => {
    event.preventDefault();

    const producto = {
      articulo,
      descripcion,
      cantidad,
      monto,
    };

    if (idProducto) {
      updateProducto(idProducto, producto);
    } else {
      createProducto(producto);
    }
  };

  const createProducto = (producto) => {
    fetch('http://localhost:3500/stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Producto ingresado correctamente:', data);
        fetchProductos();
        resetForm();
      })
      .catch((error) => {
        console.error('Error al ingresar el producto:', error);
      });
  };

  const updateProducto = (id, producto) => {
    fetch(`http://localhost:3500/stock/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Producto modificado correctamente:', data);
        fetchProductos();
        resetForm();
      })
      .catch((error) => {
        console.error('Error al modificar el producto:', error);
      });
  };

  const handleEstadoChange = (event) => {
    const newEstado = event.target.value;
    setEstado(newEstado);
    handleSearch(newEstado, nombreProducto); // Actualiza el estado y llama a la búsqueda
};
  
const handleProductoChange = (event) => {
    const newNombreProducto = event.target.value;
    setNombreProducto(newNombreProducto);
    handleSearch(estado, newNombreProducto); // Actualiza el nombreProducto y llama a la búsqueda
};
  
const handleSearch = async (estado, nombreProducto) => {
    let url = `http://localhost:3500/stock?estado=${encodeURIComponent(estado)}`;

    if (nombreProducto) {
        url += `&producto=${encodeURIComponent(nombreProducto)}`;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const productos = await response.json();
        console.log('Productos encontrados:', productos);

        if (Array.isArray(productos)) {
            setProductos(productos);
        } else {
            setProductos([]);
        }
    } catch (error) {
        console.error('Error al buscar productos:', error);
        setProductos([]);
    }
};


  const handleEdit = (producto) => {
    setIdProducto(producto.idProducto);
    setArticulo(producto.articulo);
    setDescripcion(producto.descripcion);
    setCantidad(producto.cantidad);
    setMonto(producto.monto);
  };

  const handleElim = (producto) => {
    if (window.confirm(`¿Seguro que quieres cambiar el estado del producto ${producto.articulo}?`)) {
      deleteProducto(producto.idProducto, producto.estado);
    }
  };
  
  const deleteProducto = (id, estadoActual) => {
    fetch(`http://localhost:3500/stockelim/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado: estadoActual }), 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Producto actualizado correctamente:', data);
        fetchProductos();
      })
      .catch((error) => {
        console.error('Error al actualizar el estado del producto:', error);
      });
  };

  const resetForm = () => {
    setIdProducto('');
    setArticulo('');
    setDescripcion('');
    setCantidad('');
    setMonto('');
  };

  // Función para manejar la solicitud de ordenamiento
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Función para ordenar los productos basados en la configuración de ordenamiento
  const sortedProductos = [...productos].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const renderProductos = () => {
    if (productos.length === 0) {
      return (
        <tr>
          <td colSpan="7">No hay productos disponibles</td>
        </tr>
      );
    }

    return sortedProductos.map((producto) => (
      <tr key={producto.idProducto}>
        <td>{producto.idProducto}</td>
        <td>{producto.articulo}</td>
        <td>{producto.descripcion}</td>
        <td>{producto.cantidad}</td>
        <td>{producto.monto || 'No disponible'}</td>
        <td>
          <button id='botmod' onClick={() => handleEdit(producto)}>Modificar</button>
          <button id='botelim' onClick={() => handleElim(producto)}>Eliminar</button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          id="filtro"
          placeholder="Buscar..."
          onChange={handleProductoChange}
        />
        <select id="estado1" onChange={handleEstadoChange} value={estado}>
          <option value="alta">Alta</option>
          <option value="baja">Baja</option>
        </select>
      </header>
      <form onSubmit={handleingresar}>
        <input
          type="text"
          id="idProducto"
          placeholder="ID Producto"
          value={idProducto}
          readOnly
        />
        <input
          type="text"
          id="Articulo"
          placeholder="Artículo"
          value={articulo}
          onChange={(e) => setArticulo(e.target.value)}
        />
        <input
          type="text"
          id="descripcion"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          id="cantidad"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <input
          type="text"
          id="monto"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <button type="submit" id="ingresarstock">
          {idProducto ? 'Modificar' : 'Ingresar'}
        </button>
      </form>
      <div className="tabla-container">
        {<table id="tabla-prod" className="tabla-negra">
          <thead>
            <tr>
              <th className="columna" onClick={() => requestSort('idProducto')}>ID Producto</th>
              <th className="columna" onClick={() => requestSort('articulo')}>Artículo</th>
              <th className="columna" onClick={() => requestSort('descripcion')}>Descripción</th>
              <th className="columna" onClick={() => requestSort('cantidad')}>Cantidad</th>
              <th className="columna" onClick={() => requestSort('monto')}>Precio de venta</th>
              <th className="columna">Acciones</th>
            </tr>
          </thead>
          <tbody className="cuerpo-tabla">
            {renderProductos()}
          </tbody>
        </table>
        }
      </div>
    </div>
  );
}

export default Formstock;
