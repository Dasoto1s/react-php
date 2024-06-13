/**
 * Descripción: Componente que muestra una lista de solicitudes de cambio y devolución de productos.
 *
 * Hooks:
 * - useState: Maneja el estado de las solicitudes obtenidas desde el servidor.
 * - useEffect: Se utiliza para obtener las solicitudes desde el servidor al montar el componente.
 *
 * Funciones:
 * - fetchSolicitudes: Función asíncrona que realiza una solicitud GET al servidor para obtener las solicitudes.
 *
 * Componentes importados:
 * - SideMenu: Componente que representa el menú lateral de la aplicación.
 *
 * Estilos:
 * - Los estilos se encuentran en el archivo '../../../../CSS/SolicitudList.css'.
 *
 * Renderizado:
 * - Se muestra una tabla con la lista de solicitudes, donde cada fila contiene información como el número de solicitud, estado, motivo, producto relacionado, mensaje del cliente, fecha de solicitud y un botón para gestionar la solicitud.
 * - Cada solicitud tiene un enlace que redirige a la página de detalles de la solicitud correspondiente.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SideMenu from '../../../SideMenu';
import '../../../../CSS/SolicitudList.css';

const SolicitudList = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  // Hook useEffect para realizar una solicitud HTTP al cargar el componente
  useEffect(() => {
    // Función asíncrona para obtener las solicitudes desde el backend
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/solicitudCambioDevolucion.php');
        setSolicitudes(response.data);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };
    fetchSolicitudes();
  }, []);

  return (
    // Contenedor principal del componente
    <div className="container" id="container-solicitudes">
      <SideMenu />
      <div className="content" id="content-solicitudes">
        <h1>Gestión de Cambios y Devoluciones</h1>
        <h2>Lista de solicitudes</h2>

        <table>
          <thead>
            <tr>
              <th>Número de solicitud</th>
              <th>Estado de la solicitud</th>
              <th>Motivo de la solicitud</th>
              <th>Producto relacionado</th>
              <th>Mensaje del cliente</th>
              <th>Fecha de solicitud</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.N_solicitud}>
                <td>{solicitud.N_solicitud}</td>
                <td className={solicitud.Estado_solicitud === '0' ? 'estado-pendiente' : 'estado-atendido'}>
                  {solicitud.Estado_solicitud === '0' ? 'Pendiente' : 'Atendido'}
                </td>
                <td>{solicitud.Motivo_solicitud}</td>
                <td>{solicitud.Producto_relacionado}</td>
                <td>{solicitud.Mensaje_recibido_cliente}</td>
                <td>{solicitud.Fecha_solicitud}</td>
                <td>
                  <Link to={`/solicitud/${solicitud.N_solicitud}`} className="btn-detalles">
                    Gestionar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SolicitudList;
