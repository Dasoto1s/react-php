// AgregarProducto.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../CSS/AgregarProducto.css';

const AgregarProducto = ({ onProductoAgregado }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [talla, setTalla] = useState(0);
  const [color, setColor] = useState('');
  const [genero, setGenero] = useState('');
  const [tipoZapato, setTipoZapato] = useState('');
  const [imagen, setImagen] = useState(null);
  const [cantidad, setCantidad] = useState(0);
  const [stock, setStock] = useState(0);
  const [cantidadMinimaRequerida, setCantidadMinimaRequerida] = useState(0);

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('talla', talla);
    formData.append('color', color);
    formData.append('genero', genero);
    formData.append('tipoZapato', tipoZapato);
    formData.append('imagen', imagen);
    formData.append('cantidad', cantidad);
    formData.append('stock', stock);
    formData.append('cantidadMinimaRequerida', cantidadMinimaRequerida);

    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8080/productos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Producto agregado:', response.data);
        window.alert('El producto se ha agregado con éxito.'); // Mostrar el aviso del navegador
        onProductoAgregado();
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    };

  return (
    <form className="agregar-producto-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(parseFloat(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="talla">Talla:</label>
        <input
          type="number"
          id="talla"
          placeholder="Talla"
          value={talla}
          onChange={(e) => setTalla(parseInt(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="genero">Género:</label>
        <input
          type="text"
          id="genero"
          placeholder="Género"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tipoZapato">Tipo de Zapato:</label>
        <input
          type="text"
          id="tipoZapato"
          placeholder="Tipo de Zapato"
          value={tipoZapato}
          onChange={(e) => setTipoZapato(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imagen">Imagen:</label>
        <input
          type="file"
          id="imagen"
          accept="image/*"
          onChange={handleImagenChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cantidadMinimaRequerida">Cantidad Mínima Requerida:</label>
        <input
          type="number"
          id="cantidadMinimaRequerida"
          placeholder="Cantidad Mínima Requerida"
          value={cantidadMinimaRequerida}
          onChange={(e) => setCantidadMinimaRequerida(parseInt(e.target.value))}
        />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AgregarProducto;