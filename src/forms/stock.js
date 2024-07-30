import React, { useEffect, useState } from 'react';
import '../App.css';
import './stock.css';

function Formstock() {
  const [productos, setProductos] = useState([]);
  const [articulo, setArticulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [monto, setMonto] = useState('');
  const [idProducto, setIdProducto] = useState(''); // Nuevo estado para idProducto

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = () => {
    fetch('http://localhost:3500/productos')
      .then((response) => response.json())
      .then((productos) => {
        if (Array.isArray(productos)) {
          setProductos(productos);
        } else {
          setProductos([]); // En caso de que la respuesta no sea un array
        }
      })
      .catch((error) => {
        console.error('Error fetching productos:', error);
        setProductos([]); // En caso de error, establecer productos como un array vacío
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const producto = {
      articulo: articulo,
      descripcion: descripcion,
      cantidad: cantidad,
      monto: monto,
    };

    if (idProducto) {
      // Modificar producto
      fetch(`http://localhost:3500/productos/${idProducto}`, {
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
    } else {
      // Insertar nuevo producto
      fetch('http://localhost:3500/productos', {
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
    }
  };

  const handleSearch = async (event) => {
    const nombreProducto = event.target.value;

    let url = `http://localhost:3500/productos`;
    if (nombreProducto) {
      url += `?producto=${encodeURIComponent(nombreProducto)}`;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const productos = await response.json();
      console.log('Productos encontrados:', productos);

      if (Array.isArray(productos)) {
        setProductos(productos);
      } else {
        setProductos([]); // En caso de que la respuesta no sea un array
      }

    } catch (error) {
      console.error('Error al buscar productos:', error);
      setProductos([]); // En caso de error, establecer productos como un array vacío
    }
  };

  const handleEdit = (producto) => {
    setIdProducto(producto.idProducto);
    setArticulo(producto.articulo);
    setDescripcion(producto.descripcion);
    setCantidad(producto.cantidad);
    setMonto(producto.monto);
  };

  const resetForm = () => {
    setIdProducto('');
    setArticulo('');
    setDescripcion('');
    setCantidad('');
    setMonto('');
  };

  const renderProductos = () => {
    if (productos.length === 0) {
      return (
        <tr>
          <td colSpan="6">No hay productos disponibles</td>
        </tr>
      );
    }

    return productos.map((producto) => (
      <tr key={producto.idProducto}>
        <td>{producto.idProducto}</td>
        <td>{producto.articulo}</td>
        <td>{producto.descripcion}</td>
        <td>{producto.cantidad}</td>
        <td>{producto.monto || 'No disponible'}</td>
        <td>
          <button height='1px' onClick={() => handleEdit(producto)}>
            Modificar
          </button>
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
          onChange={handleSearch}
        />
      </header>
      <form onSubmit={handleSubmit}>
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
        <table id="tabla-prod" className="tabla-negra">
          <thead>
            <tr>
              <th className='columna'>ID Producto</th>
              <th className="columna">Artículo</th>
              <th className="columna">Descripción</th>
              <th className="columna">Cantidad</th>
              <th className="columna">Precio de venta</th>
              <th className="columna">Acciones</th>
            </tr>
          </thead>
          <tbody className="cuerpo-tabla">
            {renderProductos()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Formstock;
