import React, { useState } from 'react';
import axios from 'axios';
import AgregarPromocionForm from './AgregarPromocionForm';

const BuscarProducto = ({ onPromocionAgregada, promociones }) => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleBusqueda = async (e) => {
    e.preventDefault();
    try {
      const isNumeric = !isNaN(busqueda) && isFinite(busqueda);
      const response = await axios.get(`http://localhost:8080/productos/buscar?${isNumeric ? `idProducto=${busqueda}` : `palabrasClave=${busqueda}`}`);
      setResultados(response.data);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  const handleSeleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  const handleCerrarAgregarPromocion = () => {
    setProductoSeleccionado(null);
  };

  return (
    <div>
      <form onSubmit={handleBusqueda}>
        <input
          type="text"
          placeholder="Buscar producto por nombre o ID"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {resultados.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Talla</th>
              <th>Color</th>
              <th>Género</th>
              <th>Tipo de Zapato</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((producto) => (
              <tr key={producto.idProducto}>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.precio}</td>
                <td>{producto.talla}</td>
                <td>{producto.color}</td>
                <td>{producto.genero}</td>
                <td>{producto.tipoZapato}</td>
                <td>
                  <button onClick={() => handleSeleccionarProducto(producto)}>Agregar a promoción</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron productos</p>
      )}
      {productoSeleccionado && (
        <AgregarPromocionForm
          producto={productoSeleccionado}
          onPromocionAgregada={onPromocionAgregada}
          onCerrar={handleCerrarAgregarPromocion}
          promociones={promociones}
        />
      )}
    </div>
  );
};

export default BuscarProducto;