import { useState, useEffect } from 'react';

export const useHookCargaVenta = (idVenta) => {
  const [articulos, setArticulos] = useState([]);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [productosVenta, setProductosVenta] = useState([]); // Productos añadidos a la venta
  const [totalVenta, setTotalVenta] = useState(0); // Total de la venta
  const [totalVentaCalculado, setTotalVentaCalculado] = useState(0);
  const [empleadoDNI, setEmpleadoDNI] = useState('');
  const [clienteId, setClienteId] = useState('');

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await fetch('http://localhost:3500/stockventa?estado=Disponible');
        const data = await response.json();
        console.log(data); // Verifica lo que se recibe de la API
        setArticulos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchArticulos();
  }, []);

  const actualizarMontoTotal = async () => {
    try {
      const responseVenta = await fetch(`http://localhost:3500/ventasmonto/${idVenta}`, {
        method: 'PUT', // Actualizar la venta
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          montoTotal: totalVenta, // El nuevo monto total
        }),
      });
  
      if (!responseVenta.ok) {
        const errorData = await responseVenta.text();
        console.error('Error al actualizar la venta:', errorData);
        alert('Error al actualizar el monto total de la venta.');
        return;
      }
  
      alert('Monto total actualizado correctamente.');
    } catch (error) {
      console.error('Hubo un error al actualizar la venta:', error);
      alert('Hubo un error al actualizar la venta.');
    }
  };
  
// Función para agregar un artículo a la venta
// Función para agregar un artículo a la venta con validación de stock
const agregarArticuloAVenta = () => {
  if (!articuloSeleccionado || cantidad <= 0) {
    alert('Seleccione un artículo válido y una cantidad mayor a 0.');
    return;
  }

  const articulo = articulos.find((a) => a.idProducto === articuloSeleccionado);

  if (!articulo) {
    alert('El artículo seleccionado no es válido.');
    return;
  }

  // Validar que la cantidad no sea mayor al stock disponible
  if (cantidad > articulo.cantidad) {
    alert(`No hay suficiente stock para el artículo seleccionado. Stock disponible: ${articulo.cantidad}.`);
    return;
  }

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



  // Función para agregar un artículo a la venta
  const agregarProductosAVenta = async () => {
    try {
      const responseProductos = await fetch('http://localhost:3500/ventas/agregarProductosVenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idVenta, // Ya tienes este ID de la venta
          productos: productosVenta.map((producto) => ({
            idProducto: producto.idProducto,
            cantidadVendida: producto.cantidad,
            subtotal: producto.subtotal,
          })),
        }),
      });
  
      if (!responseProductos.ok) {
        const errorData = await responseProductos.text();
        console.error('Error al agregar productos:', errorData);
        alert('Error al agregar los productos.');
        return;
      }
  
      alert('Productos agregados correctamente a la venta.');
    } catch (error) {
      console.error('Hubo un error al agregar los productos:', error);
      alert('Hubo un error al agregar los productos.');
    }
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
  // Función para finalizar la venta y enviar los productos al backend
  const finalizarVenta = async () => {
    if (productosVenta.length === 0) {
      alert('Debe agregar al menos un producto para finalizar la venta.');
      return;
    }
    
    try {
      // Actualizar monto total de la venta
      await actualizarMontoTotal();
  
      // Agregar productos a la venta
      await agregarProductosAVenta();
  
      alert('Venta finalizada y productos agregados correctamente.');
    } catch (error) {
      console.error('Hubo un error al finalizar la venta:', error);
      alert('Hubo un error al finalizar la venta.');
    }
  };
  
  return {
    articulos,
    articuloSeleccionado,
    setArticuloSeleccionado,
    cantidad,
    setCantidad,
    agregarArticuloAVenta,
    agregarProductosAVenta, // Cambia esto de agregarArticuloAVenta a agregarProductosAVenta
    productosVenta,
    totalVenta,
    eliminarArticuloAVenta,
    finalizarVenta, // Exponer la función para finalizar la venta
  };
};
