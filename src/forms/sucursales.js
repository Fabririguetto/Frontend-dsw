import '../App.css';

function formstock() {
    return (
      <div className="App">
        <header className="App-header">
          <input type="text" id="filtro" placeholder="Buscar..."/>
          
      <div class="tabla-container">
        <table id="tabla-prod" class="tabla-negra">
          <thead>
            <tr>
              <th class="columna">Productos</th>
              <th class="columna">Descripcion</th>
              <th class="columna">cantidad</th>
              <th class="columna">Precio de venta</th>
            </tr>
          </thead>
        <tbody class="cuerpo-tabla">
          </tbody>
          </table>
      </div>
  
        </header>
      </div>
    );
  }

export default formstock;