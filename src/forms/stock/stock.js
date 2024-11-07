import React from 'react';
import useStock from '../../hooks/useHookStock';
import './stock.css';

function FormStock() {
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
        <button
          type="submit"
          id="btn-agregar-producto" /* ID único para Agregar Producto */
          className="btn-submit"
        >
          {formData.idProducto ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
        <button
          type="button"
          id="btn-limpiar-formulario" /* ID único para Limpiar Formulario */
          className="btn-reset"
          onClick={resetForm}
        >
          Limpiar Formulario
        </button>
      </form>

      <div>
        <select
          id="estado"
          name="estado"
          value={filters.estado}
          onChange={handleFilterChange}
        >
          <option value="Alta">Alta</option>
          <option value="Baja">Baja</option>
        </select>

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
                <button
                    id={`edit-${producto.idProducto}`} /* ID único para Editar */
                    className="btn-edit"
                    onClick={() => handleEdit(producto)}
                  >
                    Editar
                  </button>
                  <button
                    id={`delete-${producto.idProducto}`} /* ID único para Eliminar */
                    className="btn-delete"
                    onClick={() => handleElim(producto.idProducto, producto.estado)}
                  >
                    Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormStock;