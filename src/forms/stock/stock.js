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
    page,  // Deberías obtener estos desde el hook
    limit, // Deberías obtener estos desde el hook
    setPage,  // Funciones para cambiar el estado de paginación
    setLimit, // Funciones para cambiar el estado de límite
  } = useStock();

  return (
    <div>
      <div className="App-header">
        <input
          type="text"
          name="nombreProducto"
          value={filters.nombreProducto}
          onChange={handleFilterChange}
          placeholder="Buscar por articulo o descripcion"
        />
      </div>
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
          className="btn-submit"
        >
          {formData.idProducto ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
        <button
          type="button"
          className="btn-reset"
          onClick={resetForm}
        >
          Limpiar Formulario
        </button>
      </form>

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
              <td>{`$${(producto.monto ? Number(producto.monto).toFixed(2) : '0.00')}`}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(producto)}
                >
                  Editar
                </button>
                <button
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
      <div className="pagination">
        <button onClick={() => setPage(Math.max(page - 1, 1))}>Anterior</button>
        <span>{`Página ${page}`}</span>
        <button onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>
      <select onChange={(e) => setLimit(Number(e.target.value))} value={limit}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
      </select>
    </div>
  );
}

export default FormStock;
