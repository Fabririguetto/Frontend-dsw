import React, { useEffect, useState } from 'react';
import '../App.css';
import './stock.css';

function Formstock() {
  const [productos, setProductos] = useState([]);
  const [articulo, setArticulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = () => {
    fetch('http://localhost:3500/productos')
      .then((response) => response.json())
      .then((productos) => {
        setProductos(productos);
      })
      .catch((error) => {
        console.error('Error fetching productos:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nuevoProducto = {
      articulo: articulo,
      descripcion: descripcion,
      cantidad: cantidad,
    };

    fetch('http://localhost:3500/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'app/json'
      },
      body: JSON.stringify(nuevoProducto)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Producto ingresado correctamente:', data);
        fetchProductos(); 
        setArticulo('');
        setDescripcion('');
        setCantidad('');
      })
      .catch(error => {
        console.error('Error al ingresar el producto:', error);
      });
  };
  
  const renderProductos = () => {
    return productos.map((producto) => (
      <tr key={producto.idProducto}>
        <td>{producto.articulo}</td>
        <td>{producto.descripcion}</td>
        <td>{producto.cantidad}</td>
        <td>{producto.precio_venta}</td>
      </tr>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="filtro" placeholder="Buscar..." />
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
        <button type="submit" id="ingresarstock">Ingresar</button>
      </form>
      <div className="tabla-container">
        <table id="tabla-prod" className="tabla-negra">
          <thead>
            <tr>
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
