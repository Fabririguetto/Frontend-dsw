import { useParams } from 'react-router-dom';
import { useHookCargaVenta } from '../../hooks/useHookCargaVenta';

function DetalleCargarVenta() {
  const { idVenta } = useParams();  // Obtiene el idVenta de la URL
  console.log(idVenta); // Obtenemos el id_venta de la URL
    
  // Usamos el hook personalizado
  const {
    articulos,
    articuloSeleccionado,
    setArticuloSeleccionado,
    cantidad,
    setCantidad,
    agregarArticuloAVenta,
    productosVenta, // Asumimos que este es el estado con los productos agregados a la venta
    totalVenta, // El total acumulado de la venta
    eliminarArticuloAVenta,
    finalizarVenta // Añadimos la función para finalizar la venta
  } = useHookCargaVenta(idVenta);

  // Función para calcular el subtotal de un artículo
  const calcularSubtotal = (precio, cantidad) => {
    return precio * cantidad;
  };

  // Función para finalizar la venta y actualizar el monto total
  const handleFinalizarVenta = async () => {
    // Llamamos a la función de finalizarVenta
    await finalizarVenta();

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
        alert('Venta actualizada con éxito');
        window.close();
      } else {
        alert('Error al actualizar la venta');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error al actualizar la venta');
    }
  };

  return (
    <div>
      <h1>Agregar Artículos a la Venta {idVenta}</h1>

      <div>
        <select onChange={(e) => setArticuloSeleccionado(Number(e.target.value))} value={articuloSeleccionado}>
            <option value="">Selecciona un artículo</option>
            {articulos.map((articulo) => (
                <option key={articulo.idProducto} value={articulo.idProducto}>
                {articulo.articulo} - {articulo.descripcion} - ${articulo.monto}
                </option>
            ))}
        </select>

        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          min="1"
        />

        <button onClick={agregarArticuloAVenta}>Agregar a Venta</button>
      </div>

      {/* Tabla para mostrar los productos agregados a la venta */}
      <div>
        <h2>Productos en la Venta</h2>
        <table>
          <thead>
            <tr>
              <th>Artículo</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosVenta.map((producto, index) => (
              <tr key={index}>
                <td>{producto.articulo}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.monto}</td>
                <td>{calcularSubtotal(producto.monto, producto.cantidad)}</td>
                <td>
                  <button onClick={() => eliminarArticuloAVenta(producto.idProducto)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mostrar Total de la Venta */}
        <div>
          <h3>Total Venta: ${totalVenta}</h3>
        </div>

        {/* Botón para finalizar la venta */}
        <button onClick={handleFinalizarVenta}>Finalizar Venta</button>
      </div>
    </div>
  );
}

export default DetalleCargarVenta;
