/**
 * Componente: AdminLogin
 * Descripción: Formulario de inicio de sesión para administradores.
 *
 * Props:
 * - Ninguno
 *
 * Estado:
 * - email: Correo electrónico ingresado por el usuario.
 * - password: Contraseña ingresada por el usuario.
 * - error: Mensaje de error en caso de credenciales incorrectas.
 *
 * Funciones:
 * - handleSubmit: Maneja el envío del formulario de inicio de sesión.
 *   - Realiza una solicitud POST a la API de inicio de sesión (/adminlogin.php).
 *   - Si las credenciales son válidas, guarda el token de autenticación en el almacenamiento local y redirige al usuario a la página de gestión de inventario.
 *   - Si las credenciales son incorrectas, muestra un mensaje de error.
 *
 * Hooks:
 * - useEffect: Verifica si hay un token de autenticación en el almacenamiento local al cargar el componente.
 *   - Si existe un token, redirige al usuario a la página de gestión de inventario.
 *
 * Estilos:
 * - Los estilos se encuentran en el archivo '../../../CSS/AdminLogin.css'.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../CSS/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/gestionarInventario');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/adminlogin.php', {
        email,
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/gestionarInventario');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Ocurrió un error en la solicitud');
      }
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Inicio de Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: 'block' }} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ display: 'block' }} 
            />
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
  
};

export default AdminLogin;