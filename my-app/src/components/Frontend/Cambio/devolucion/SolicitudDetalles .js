/**
 * Componente: SolicitudDetalles
 * Descripción: Componente que muestra los detalles de una solicitud de cambio o devolución de producto específica.
 *
 * Hooks:
 * - useState: Maneja el estado de la solicitud obtenida desde el servidor y el estado de la solicitud (pendiente o atendida).
 * - useEffect: Se utiliza para obtener los detalles de la solicitud al montar el componente y cada vez que el ID de la solicitud o la solicitud misma cambien.
 * - useParams: Se utiliza para obtener el ID de la solicitud desde la URL.
 *
 * Funciones:
 * - fetchSolicitud: Función asíncrona que realiza una solicitud GET al servidor para obtener los detalles de la solicitud.
 * - handleCambiarEstado: Función que maneja el cambio de estado de la solicitud (pendiente a atendida, o viceversa) mediante una solicitud PUT al servidor.
 *
 * Componentes importados:
 * - Link (de react-router-dom): Componente para crear enlaces de enrutamiento.
 *
 * Estilos:
 * - Los estilos se encuentran en el archivo '../../../../CSS/SolicitudDetalles.css'.
 *
 * Renderizado:
 * - Se muestra una vista con los detalles de la solicitud, incluyendo el número de solicitud, estado (pendiente o atendido), motivo, producto relacionado, mensaje del cliente, fecha de solicitud, correo del cliente, tipo de solicitud, nombre del cliente y número de contacto del cliente.
 * - Hay un botón para cambiar el estado de la solicitud (pendiente a atendido, o viceversa).
 * - Hay un enlace para volver a la lista de solicitudes.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../../../../CSS/SolicitudDetalles.css';

const SolicitudDetalles = () => {
  const { solicitudId } = useParams();
  const [solicitud, setSolicitud] = useState(null);
  const [estadoSolicitud, setEstadoSolicitud] = useState(null);

  useEffect(() => {
    const fetchSolicitud = async () => {
      if (solicitudId && !solicitud) {
        try {
          const response = await axios.get(`http://localhost:8000/solicitudCambioDevolucion.php?solicitudId=${solicitudId}`);
          setSolicitud(response.data);
          setEstadoSolicitud(response.data.Estado_solicitud);
        } catch (error) {
          console.error('Error al obtener la solicitud:', error);
        }
      }
    };
    fetchSolicitud();
  }, [solicitudId, solicitud]);

  const handleCambiarEstado = () => {
    const nuevoEstado = estadoSolicitud === '0' ? '1' : '0';
    const confirmacion = window.confirm(`¿Estás seguro de cambiar el estado de la solicitud a ${nuevoEstado === '0' ? 'pendiente' : 'atendido'}?`);
    if (confirmacion) {
      axios
  .put(`http://localhost:8000/solicitudCambioDevolucion.php?solicitudId=${solicitud.N_solicitud}`, { Estado_solicitud: nuevoEstado })
  .then((response) => {
    console.log(response.data);
    setSolicitud({ ...solicitud, Estado_solicitud: nuevoEstado });
    setEstadoSolicitud(nuevoEstado);
  })
  .catch((error) => {
    console.error('Error al actualizar el estado:', error);
  });
    }
  };

  if (!solicitud) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detalles-container">
      <h2>Detalles de la solicitud</h2>
      <div className="detalle-fila">
        <div className="detalle-celda">Número de solicitud:</div>
        <div className="detalle-valor">{solicitud.N_solicitud}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Estado de la solicitud:</div>
        <div className={`detalle-valor ${estadoSolicitud === '0' ? 'estado-pendiente' : 'estado-atendido'}`}>
          {estadoSolicitud === '0' ? 'Pendiente' : 'Atendido'}
          <button onClick={handleCambiarEstado}>
            {estadoSolicitud === '0' ? 'Marcar como atendido' : 'Marcar como pendiente'}
          </button>
        </div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Motivo de la solicitud:</div>
        <div className="detalle-valor">{solicitud.Motivo_solicitud}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Producto relacionado:</div>
        <div className="detalle-valor">{solicitud.Producto_relacionado}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Mensaje del cliente:</div>
        <div className="detalle-valor">{solicitud.Mensaje_recivido_cliente}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Fecha de solicitud:</div>
        <div className="detalle-valor">{solicitud.Fecha_solicitud}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Correo del cliente:</div>
        <div className="detalle-valor">{solicitud.Correo_Cliente}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Tipo de solicitud:</div>
        <div className="detalle-valor">{solicitud.Tipo_solicitud}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Nombre del cliente:</div>
        <div className="detalle-valor">{solicitud.nombreCliente}</div>
      </div>
      <div className="detalle-fila">
        <div className="detalle-celda">Número de contacto del cliente:</div>
        <div className="detalle-valor">{solicitud.numeroContactoCliente}</div>
      </div>
      <Link to="/" className="btn-volver">
        Volver a la lista de solicitudes
      </Link>
    </div>
  );
};

export default SolicitudDetalles; 