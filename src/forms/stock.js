import React, { useEffect, useState } from 'react';
import '../App.css';
import './stock.css';

function Formstock() {
  const [productos, setProductos] = useState([]);
  const [articulo, setArticulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [monto, setMonto] = useState('');

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

    const nuevoProducto = {
      articulo: articulo,
      descripcion: descripcion,
      cantidad: cantidad,
      monto: monto, // Asegúrate de enviar "monto" en lugar de "precio"
    };

    fetch('http://localhost:3500/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Producto ingresado correctamente:', data);
        fetchProductos();
        setArticulo('');
        setDescripcion('');
        setCantidad('');
        setMonto('');
      })
      .catch((error) => {
        console.error('Error al ingresar el producto:', error);
      });
  };

  const handleSearch = async (event) => {
    const nombreProducto = event.target.value;

    // Construir la URL de búsqueda con parámetros de consulta
    let url = `http://localhost:3500/productos`;
    if (nombreProducto) {
      url += `?nombre=${encodeURIComponent(nombreProducto)}`;
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

  const renderProductos = () => {
    if (productos.length === 0) {
      return (
        <tr>
          <td colSpan="5">No hay productos disponibles</td>
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
          placeholder="monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <button type="submit" id="ingresarstock">Ingresar</button>
      </form>
      <div className="tabla-container">
        <table id="tabla-prod" className="tabla-negra">
          <thead>
            <tr>
              <th className='columna'>idProducto</th>
              <th className="columna">Productos</th>
              <th className="columna">Descripción</th>
              <th className="columna">Cantidad</th>
              <th className="columna">Precio de venta</th>
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