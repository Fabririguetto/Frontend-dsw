import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetalleCargarVenta() {
    const { idVenta } = useParams();  // Obtenemos el id_venta de la URL
    const [articulos, setArticulos] = useState([]);
    const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    // Cargar artículos disponibles (por ejemplo)
    useEffect(() => {
        // Fetch para obtener artículos disponibles
        fetch('http://localhost:3500/api/articulos')
            .then(response => response.json())
            .then(data => setArticulos(data))
            .catch(error => console.error('Error al obtener artículos:', error));
    }, []);

    const agregarArticuloAVenta = async () => {
        if (!articuloSeleccionado || cantidad <= 0) return;

        // Enviar el artículo seleccionado para agregarlo a la venta
        const response = await fetch(`http://localhost:3500/api/agregarArticuloAVenta/${idVenta}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_articulo: articuloSeleccionado,
                cantidad,
            })
        });

        if (response.ok) {
            alert('Artículo agregado a la venta');
        } else {
            console.error('Error al agregar artículo');
        }
    };

    return (
        <div>
            <h1>Agregar Artículos a la Venta {idVenta}</h1>

            <select onChange={(e) => setArticuloSeleccionado(e.target.value)}>
                <option value="">Selecciona un artículo</option>
                {articulos.map((articulo) => (
                    <option key={articulo.id} value={articulo.id}>
                        {articulo.nombre}
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
    );
}

export default DetalleCargarVenta;