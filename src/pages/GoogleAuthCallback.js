// src/pages/GoogleAuthCallback.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Asumiendo React Router v6+

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para acceder a la ubicación actual (URL)

  useEffect(() => {
    // Extrae los parámetros de la URL
    // Strapi normalmente devuelve el JWT en el parámetro 'access_token'
    // y puede incluir datos del usuario en un objeto 'raw'
    const params = new URLSearchParams(location.search);
    const jwt = params.get('access_token');
    
    // Opcional: Extraer otros datos del usuario si Strapi los envía
    // const rawUser = {};
    // for (const [key, value] of params.entries()) {
    //   if (key.startsWith('raw[')) {
    //     const propName = key.substring(4, key.length - 1);
    //     rawUser[propName] = value;
    //   }
    // }

    if (jwt) {
      console.log('JWT recibido:', jwt);
      // if (Object.keys(rawUser).length > 0) {
      //   console.log('Datos del usuario recibidos:', rawUser);
      // }

      // --- ACCIÓN IMPORTANTE: Almacena el JWT ---
      // Puedes usar localStorage, sessionStorage, Context API, Redux, Zustand, etc.
      // localStorage es simple para empezar:
      localStorage.setItem('jwtToken', jwt); 
      // Opcionalmente, almacena también la información del usuario si la necesitas globalmente
      // if (Object.keys(rawUser).length > 0) {
      //   localStorage.setItem('userData', JSON.stringify(rawUser));
      // }

      // --- ACCIÓN IMPORTANTE: Redirige al usuario ---
      // Redirige a una página protegida, dashboard, perfil, etc.
      // Por ejemplo, a una página de bienvenida o al perfil del usuario.
      alert('¡Autenticación exitosa! Redirigiendo...'); // Puedes quitar esta alerta
      navigate('/perfil'); // Cambia '/perfil' por la ruta a la que quieres ir
    } else {
      // Manejo de error: No se recibió el JWT
      console.error('Autenticación con Google falló: No se recibió JWT.');
      alert('Error en la autenticación con Google.');
      navigate('/'); // Redirige a la página de inicio o de login
    }
  }, [location, navigate]); // El efecto se ejecuta cuando 'location' o 'navigate' cambian

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Procesando autenticación con Google...</h2>
      <p>Por favor, espera.</p>
      {/* Podrías agregar un spinner o un indicador de carga aquí */}
    </div>
  );
};

export default GoogleAuthCallback;