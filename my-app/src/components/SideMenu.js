import React from 'react';
import '../CSS/SolicitudList.css';

// Importa la imagen de la carpeta Imagenes
import perfilImagen from '../Imagenes/foto perfil.webp';

const SideMenu = () => {
  return (
    <div className="menu">
      <div className="perfil">
        {/* Utiliza la variable importada como valor del atributo src */}
        <img src={perfilImagen} alt="Perfil del administrador" />
        <p>Nombre del Administrador</p>
      </div>
      <ul className="opciones">
        <li><a href="inicioAdmin.html" id="gestionarInventario">Gestionar Inventario</a></li>
        <li><a href="gestionPerfiles.html" id="gestionarPerfiles">Gestionar Perfiles</a></li>
        <li><a href="gestionarCambiosDevoluciones.html" id="devolucionesCambios">Devoluciones / Cambios</a></li>
        <li><a href="gestionarbannerDestacados.html" id="publicidadDestacados">Banner / Destacados</a></li>
        <li><a href="gestionarPedidos.html" id="pedidos">Pedidos</a></li>
        <li><a href="index.html" id="verTienda" target="_blank">Ver Tienda</a></li>
      </ul>
    </div>
  );
};

export default SideMenu;
