// src/components/RegisterForm.js
import React, { useState } from 'react';
import { ArrowRightCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Inicializa useNavigate

  // Obtener la URL del backend de Strapi (como en tu App.js)
  // Asegúrate de que REACT_APP_STRAPI_URL esté definida en tu .env
  const STRAPI_BACKEND_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validaciones básicas
    if (username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres.');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${STRAPI_BACKEND_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          // name: 'Nombre Ejemplo', // Puedes añadir campos adicionales aquí
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.error?.message || data?.message?.[0]?.messages?.[0]?.message || 'Ocurrió un error en el registro.';
        // Strapi a veces anida los mensajes de error, así que intentamos obtener el más específico.
        throw new Error(errorMessage);
      }

      // Registro exitoso
      // Guardar el token JWT y datos del usuario si Strapi los devuelve y quieres auto-loguear
      // Por ejemplo:
      // if (data.jwt && data.user) {
      //   localStorage.setItem('jwtToken', data.jwt);
      //   localStorage.setItem('userData', JSON.stringify(data.user)); // Guarda como string
      // }

      setSuccess('¡Registro exitoso! Redirigiendo al inicio...');
      setUsername('');
      setEmail('');
      setPassword('');

      // Redirigir al inicio después de un breve momento para que el usuario vea el mensaje de éxito
      setTimeout(() => {
        navigate('/'); // Redirige a la página de inicio
      }, 1500); // Espera 1.5 segundos antes de redirigir

    } catch (err) {
      setError(err.message || 'No se pudo conectar al servidor. Inténtalo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-md w-full mx-auto">
      <h3 className="text-2xl font-bold text-sky-700 mb-6 text-center">Crea tu Cuenta</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de usuario
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            placeholder="Tu nombre de usuario"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        {error && <p className="text-red-600 text-sm text-center bg-red-100 p-3 rounded-md">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center bg-green-100 p-3 rounded-md">{success}</p>}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 transition-opacity"
          >
            {isLoading ? 'Registrando...' : 'Crear Cuenta'}
            {!isLoading && <ArrowRightCircle size={20} className="inline ml-2" />}
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        ¿Ya tienes cuenta?{' '}
        {/* Asume que tienes una ruta /login. Ajusta según sea necesario. */}
        {/* Si no tienes una página de login separada, podrías quitar este enlace o apuntarlo a #home */}
        <a href="/login" className="font-medium text-sky-600 hover:text-sky-500">
          Inicia sesión
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
