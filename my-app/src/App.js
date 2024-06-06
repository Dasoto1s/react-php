import React from 'react';
import SolicitudForm from './components/Cambio/devolucion/SolicitudForm ';
import SolicitudList from './components/Cambio/devolucion/SolicitudList ';
import SolicitudDetalles from './components/Cambio/devolucion/SolicitudDetalles ';
import PedidosList from './components/Pedidos/PedidosList';
import PedidoDetalles from './components/Pedidos/PedidoDetalles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PromocionesDestacados from './components/PromocionesDestacados/PromocionesDestacados';
import Destacados from './components/Destacados/Destacados';
import GestionarInventario from './components/GestionarInventario/GestionarInventario';
import AdminLogin from './components/inicioSesion/AdminLogin'; // Importa el componente AdminLogin
import EditarProducto from './components/GestionarInventario/EditarProducto';

const App = () => {
  return (
    <Router>
      <div>
        <SolicitudForm />
        <Routes>
          <Route path="/" element={<SolicitudList />} />
          <Route path="/solicitud/:solicitudId" element={<SolicitudDetalles />} />
          <Route path="/pedidos" element={<PedidosList />} />
          <Route path="/pedido/:pedidoId" element={<PedidoDetalles />} />
          <Route path="/gestionarCambiosDevoluciones" element={<SolicitudList />} />
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