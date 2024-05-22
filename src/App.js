import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button id="stock" onclick={handleClickStock}> Stock </button>
        <button id="venta" onclick={handleClickStock}> venta </button>
        <button id="clientes" onclick={handleClickStock}> clientes </button>
        <button id="empleados" onclick={handleClickStock}> empleados </button>
        <button id="sucursales" onclick={handleClickStock}> sucursales </button>
      </header>
    </div>
  );
}

const handleClickStock = () => {
  window.location.href = '/forms/stock.jsx';
}
const handleClickVenta = () => {
  window.location.href = '/forms/venta.jsx';
}
const handleClickClientes = () => {
  window.location.href = '/forms/clientes.jsx';
}
const handleClickEmpleados = () => {
  window.location.href = '/forms/empleados.jsx';
}
const handleClickSucursales = () => {
  window.location.href = '/forms/sucursales.jsx';
}


export default App;
