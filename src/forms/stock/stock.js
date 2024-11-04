import '../../App.css';
import './stock.css';
import React from 'react';
import useStock from '../../hooks/useHookStock';

const FormStock = () => {
  const {
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
  } = useStock();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="articulo"
          value={formData.articulo}
          onChange={handleInputChange}
          placeholder="Artículo"
        />
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
          placeholder="Descripción"
        />
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleInputChange}
          placeholder="Cantidad"
        />
        <input
          type="number"
          name="monto"
          value={formData.monto}
          onChange={handleInputChange}
          placeholder="Monto"
        />
        <button type="submit">
          {formData.idProducto ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
        <button type="button" onClick={resetForm}>
          Limpiar Formulario
        </button>
      </form>

      <div>
        <input
          type="text"
          name="estado"
          value={filters.estado}
          onChange={handleFilterChange}
          placeholder="Estado"
        />
        <input
          type="text"
          name="nombreProducto"
          value={filters.nombreProducto}
          onChange={handleFilterChange}
          placeholder="Buscar por nombre"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('articulo')}>Artículo</th>
            <th onClick={() => requestSort('descripcion')}>Descripción</th>
            <th onClick={() => requestSort('cantidad')}>Cantidad</th>
            <th onClick={() => requestSort('monto')}>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedProductos.map((producto) => (
            <tr key={producto.idProducto}>
              <td>{producto.articulo}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.monto}</td>
              <td>
                <button onClick={() => handleEdit(producto)}>Editar</button>
                <button onClick={() => handleElim(producto.idProducto, producto.estado)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormStock;
