import React from 'react';
import SolicitudForm from './components/SolicitudForm ';
import SolicitudList from './components/SolicitudList ';
import SolicitudDetalles from './components/SolicitudDetalles ';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <SolicitudForm />
        <Routes>
          <Route path="/" element={<SolicitudList />} />
          <Route path="/solicitud/:solicitudId" element={<SolicitudDetalles />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;