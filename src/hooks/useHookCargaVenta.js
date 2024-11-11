import { useState, useEffect } from 'react';

export const useHookCargaVenta = (idVenta) => {
  const [articulos, setArticulos] = useState([]);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [productosVenta, setProductosVenta] = useState([]); // Productos añadidos a la venta
  const [totalVenta, setTotalVenta] = useState(0); // Total de la venta

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await fetch('http://localhost:3500/stockventa?estado=Alta');
        const data = await response.json();
        console.log(data); // Verifica lo que se recibe de la API
        setArticulos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchArticulos();
  }, []);

  // Función para agregar un artículo a la venta
  const agregarArticuloAVenta = () => {
    if (!articuloSeleccionado || cantidad <= 0) return;

    const articulo = articulos.find((a) => a.idProducto === articuloSeleccionado);
    const subtotal = articulo.monto * cantidad;

    const nuevoProducto = {
      ...articulo,
      cantidad,
      subtotal,
    };

    setProductosVenta((prevProductos) => {
      const nuevosProductos = [...prevProductos, nuevoProducto];
      calcularTotalVenta(nuevosProductos); // Recalcular total cada vez que se agrega un producto
      return nuevosProductos;
    });

    setArticuloSeleccionado('');
    setCantidad(1);
  };

  // Función para calcular el total de la venta
  const calcularTotalVenta = (productos) => {
    const total = productos.reduce((acc, producto) => acc + producto.subtotal, 0);
    setTotalVenta(total);
  };

  // Función para eliminar un artículo de la venta
  const eliminarArticuloAVenta = (idProducto) => {
    const productosActualizados = productosVenta.filter((producto) => producto.idProducto !== idProducto);
    setProductosVenta(productosActualizados);
    calcularTotalVenta(productosActualizados);
  };

  // Función para finalizar la venta y actualizar el monto total
  const finalizarVenta = async () => {
    try {
      const response = await fetch(`http://localhost:3500/ventas/${idVenta}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalVenta, // Monto total actualizado
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Venta actualizada con éxito');
      } else {
        console.error('Error al actualizar la venta:', data.message);
      }
    } catch (error) {
      console.error('Error al finalizar la venta:', error);
    }
  };

  return {
    articulos,
    articuloSeleccionado,
    setArticuloSeleccionado,
    cantidad,
    setCantidad,
    agregarArticuloAVenta,
    productosVenta,
    totalVenta,
    eliminarArticuloAVenta,
    finalizarVenta, // Exponer la función para finalizar la venta
  };
};
