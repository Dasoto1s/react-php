import React, { useState, useEffect } from 'react';

import SolicitudList from './components/Frontend/Cambio/devolucion/SolicitudList ';
import SolicitudDetalles from './components/Frontend/Cambio/devolucion/SolicitudDetalles ';
import PedidosList from './components/Frontend/Pedidos/PedidosList';
import PedidoDetalles from './components/Frontend/Pedidos/PedidoDetalles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PromocionesDestacados from './components/Frontend/PromocionesDestacados/PromocionesDestacados';
import Destacados from './components/Frontend/Destacados/Destacados';
import GestionarInventario from './components/Frontend/GestionarInventario/GestionarInventario';
import AdminLogin from './components/Frontend/inicioSesion/AdminLogin';
import EditarProducto from './components/Frontend/GestionarInventario/EditarProducto';

const App = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  const actualizarSolicitudes = (solicitudActualizada) => {
    setSolicitudes((solicitudesActuales) =>
      solicitudesActuales.map((solicitud) =>
        solicitud.N_solicitud === solicitudActualizada.N_solicitud
          ? solicitudActualizada
          : solicitud
      )
    );
  };

  useEffect(() => {
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
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SolicitudList solicitudes={solicitudes} />} />
          <Route path="/solicitud/:solicitudId" element={<SolicitudDetalles actualizarSolicitudes={actualizarSolicitudes} />} />
          <Route path="/pedidos" element={<PedidosList />} />
          <Route path="/pedido/:pedidoId" element={<PedidoDetalles />} />
          <Route path="/gestionarCambiosDevoluciones" element={<SolicitudList solicitudes={solicitudes} />} />
          <Route path="/gestionarbannerDestacados" element={<PromocionesDestacados />} />
          <Route path="/destacados" element={<Destacados />} />
          <Route path="/gestionarInventario" element={<GestionarInventario />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/editar-producto/:idProducto" element={<EditarProducto />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;