// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Asegúrate que la URL de Strapi esté disponible, por ejemplo, a través de variables de entorno
const STRAPI_BACKEND_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

const LoginForm = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${STRAPI_BACKEND_URL}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data?.error?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      }

      // Llamar a onLogin con los datos del usuario y el token
      onLogin(data.user, data.jwt);
      navigate('/perfil'); // O a donde quieras redirigir

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-md w-full mx-auto">
      <h3 className="text-2xl font-bold text-sky-700 mb-6 text-center">Iniciar Sesión</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo para Identifier (Email o Username) */}
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
            Email o Usuario
          </label>
          <input
            type="text" id="identifier" value={identifier}
            onChange={(e) => setIdentifier(e.target.value)} required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        {/* Campo para Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password" id="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        {error && <p className="text-red-600 text-sm text-center bg-red-100 p-3 rounded-md">{error}</p>}
        <button type="submit" disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 transition-opacity"
        >
          {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
      </form>
       <p className="mt-6 text-center text-sm text-gray-500">
        ¿No tienes cuenta?{' '}
        <a href="/crear-cuenta" className="font-medium text-sky-600 hover:text-sky-500">
          Regístrate
        </a>
      </p>
    </div>
  );
};
export default LoginForm;