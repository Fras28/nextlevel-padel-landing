// src/App.js
import React, { useState, useEffect, useMemo } from 'react';
// import ImgComunidad from './assets/comunidad.webp'; // Comentado porque no se usa según ESLint
import PuntosFondo from './assets/PuntosFondo.jpg';
import Logo from './assets/Logo.png';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Competitivo from './assets/Competitivo.jpg';
import ImagenPadel2 from './assets/PuntosFondo.jpg'; // Considera si es la misma que PuntosFondo
import ImagenPadel3 from './assets/comunidad.webp'; // Esta parece ser la que querías usar como ImgComunidad
import {
  ShieldCheck, Users, Trophy, ListChecks, TrendingUp, UserPlus, Zap, DollarSign,
  CalendarDays, Info, PlayCircle, CheckCircle, ArrowRightCircle, BarChart3,
  Award, Shuffle, FileText, Settings, ShieldQuestion, LogIn
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import GoogleAuthCallback from './pages/GoogleAuthCallback'; // Asegúrate que esta ruta sea correcta

// IMPORTANTE: Asegúrate de crear este archivo y pegar el código del RegisterForm que te proporcioné.
// Por ejemplo, en src/components/RegisterForm.js
import RegisterForm from './components/RegisterForm';


// Helper Components
const SectionTitle = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-8 md:mb-12 text-center">
    {children}
  </h2>
);

const FeatureCard = ({ icon: Icon, title, description, bgColor = 'bg-sky-50', textColor = 'text-sky-700' }) => (
  <div className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ${bgColor} h-full flex flex-col`}>
    <div className={`w-16 h-16 rounded-full ${textColor.replace('text-', 'bg-').replace('700', 'bg-opacity-20').replace('text-sky-700', 'bg-sky-100').replace('text-yellow-700', 'bg-yellow-100').replace('text-amber-700', 'bg-amber-100')} flex items-center justify-center mb-4 shrink-0`}>
      <Icon size={32} className={textColor} />
    </div>
    <h3 className={`text-xl font-semibold mb-2 ${textColor.replace('700', '800')}`}>{title}</h3>
    <p className="text-gray-600 text-sm flex-grow">{description}</p>
  </div>
);

const StepCard = ({ number, title, description, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
    <div className="flex items-center mb-4">
      <div className="bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold mr-4 shrink-0">
        {Icon ? <Icon size={24} /> : number}
      </div>
      <h3 className="text-xl font-semibold text-sky-700">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Componente de página para el formulario de registro local
const RegisterFormPage = () => {
  return (
    <div className="py-16 md:py-24 bg-sky-50 min-h-screen flex items-center justify-center px-4">
      <RegisterForm />
    </div>
  );
};


// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const navLinks = useMemo(() => [
    { id: 'home', title: 'Inicio', path: '/#home' },
    { id: 'que-es', title: '¿Qué es?', path: '/#que-es' },
    { id: 'como-funciona', title: '¿Cómo Funciona?', path: '/#como-funciona' },
    { id: 'caracteristicas', title: 'Características', path: '/#caracteristicas' },
    { id: 'beneficios', title: 'Beneficios', path: '/#beneficios' },
    { id: 'puntuacion', title: 'Puntuación', path: '/#puntuacion'},
    { id: 'registro', title: 'Regístrate', path: '/#registro' },
    // Podrías añadir un enlace directo al login si tienes una página de login
    // { id: 'login', title: 'Iniciar Sesión', path: '/login' }, // Ejemplo
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5, // Ajustado para que se active cuando el 50% de la sección esté visible
        rootMargin: "-40% 0px -40% 0px" // Ajusta esto según necesites para la detección
      }
    );
    
    // Solo observar secciones si estamos en la HomePage ('/')
    if (window.location.pathname === '/') {
        navLinks.forEach(link => {
            // Solo observar si el path es un ancla (contiene '#')
            if (link.path.includes('#')) {
                const sectionId = link.path.split('#')[1];
                const section = document.getElementById(sectionId);
                if (section) observer.observe(section);
            }
        });
    }

    return () => {
        navLinks.forEach(link => {
            if (link.path.includes('#')) {
                const sectionId = link.path.split('#')[1];
                const section = document.getElementById(sectionId);
                if (section) observer.unobserve(section);
            }
        });
      observer.disconnect();
    };
  }, [navLinks]);


  const Navbar = () => (
    <nav className="bg-sky-700 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/#home" className="text-2xl font-bold text-yellow-400 hover:text-amber-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
          NextLevel Padel
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-3 lg:space-x-5 items-center">
          {navLinks.map(link => (
            <a // Usamos <a> para anclas en la misma página, Link para rutas de React Router
              key={link.id}
              href={link.path} // Usamos el path completo
              onClick={(e) => {
                if (link.path.startsWith('/#')) {
                  // Smooth scroll for anchor links
                  e.preventDefault();
                  document.querySelector(link.path.substring(1)).scrollIntoView({ behavior: 'smooth' });
                  setActiveSection(link.id);
                } else {
                  // For router links, just navigate
                  // This part is more for <Link> components if you mix them
                }
              }}
              className={`hover:text-yellow-400 transition-colors px-2 py-1 rounded-md text-sm ${activeSection === link.id && window.location.pathname === '/' ? 'text-yellow-400 border-b-2 border-yellow-400 font-semibold' : ''}`}
            >
              {link.title}
            </a>
          ))}
           <Link to="/crear-cuenta" className="bg-yellow-400 hover:bg-amber-500 text-sky-800 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
            Crear Cuenta
          </Link>
        </div>
         {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-sky-700 z-40 shadow-lg">
          <div className="container mx-auto flex flex-col items-center py-2">
            {navLinks.map(link => (
              <a
                key={`mobile-${link.id}`}
                href={link.path}
                onClick={(e) => {
                  if (link.path.startsWith('/#')) {
                    e.preventDefault();
                    document.querySelector(link.path.substring(1)).scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(link.id);
                  }
                  setIsMobileMenuOpen(false); // Close menu on click
                }}
                className={`block w-full text-center py-2 px-3 hover:text-yellow-400 transition-colors ${activeSection === link.id && window.location.pathname === '/' ? 'text-yellow-400 font-semibold' : ''}`}
              >
                {link.title}
              </a>
            ))}
            <Link 
              to="/crear-cuenta" 
              className="block w-full text-center py-3 px-4 mt-2 bg-yellow-400 hover:bg-amber-500 text-sky-800 font-semibold rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      )}
    </nav>
  );

  const Hero = () => (
    <section id="home" className=" text-white py-20 md:py-32 min-h-screen flex flex-col justify-center items-center" style={{ backgroundImage: `url(${PuntosFondo})` }}>
      <div className="container mx-auto text-center px-4">
        <img
          src={Logo}
          alt="Logo NextLevel Padel"
          className="mx-auto mb-8 w-32 h-auto sm:w-40 md:w-48 lg:w-56" // Responsive logo size
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Bienvenido a <span className="text-yellow-400">NextLevel Padel</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto bg-black bg-opacity-70 rounded-lg p-4">
          La plataforma digital que organiza, motiva y conecta a la comunidad de jugadores de pádel en Bahía Blanca. ¡Lleva tu juego al siguiente nivel!
        </p>
        <a // Changed to <a> for smooth scroll to #registro
          href="#registro"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('registro').scrollIntoView({ behavior: 'smooth' });
            setActiveSection('registro');
          }}
          className="bg-yellow-400 hover:bg-amber-500 text-sky-800 font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg"
        >
          Regístrate y Compite
        </a>
      </div>
    </section>
  );

  const About = () => {
    const images = [
      { src: Competitivo, alt: "Jugadores de Padel Conectados - Vista 1", legend: "Competición y Conexión" },
      { src: ImagenPadel2, alt: "Jugadores de Padel Disfrutando - Vista 2", legend: "Partidos Equilibrados" },
      { src: ImagenPadel3, alt: "Comunidad de Padel - Vista 3", legend: "Comunidad Activa" },
    ];

    return (
      <section id="que-es" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle>¿Qué es NextLevel Padel?</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                className="rounded-xl shadow-xl overflow-hidden"
              >
                {images.map((image, index) => (
                  <div key={index} className="h-[300px] sm:h-[400px]"> {/* Responsive height */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/800x400/E0F2FE/0284C7?text=${encodeURIComponent(image.alt || 'Imagen Padel No Disponible')}`;
                      }}
                    />
                    {image.legend && <p className="legend bg-black bg-opacity-50 text-white p-2">{image.legend}</p>}
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                NextLevel Padel nace para transformar la experiencia del pádel amateur en Bahía Blanca. Entendemos la pasión por este deporte y la necesidad de una estructura que permita a los jugadores competir, mejorar y conectarse.
              </p>
              <p className="font-semibold text-sky-700">
                Nuestro objetivo es claro:
              </p>
              <ul className="list-none space-y-2">
                <li className="flex items-start"><CheckCircle size={24} className="inline-block mr-2 text-yellow-500 flex-shrink-0 mt-1" /><span>Ofrecer un sistema de <span className="font-bold">ranking oficial y transparente</span> desde 1ra hasta 7ma categoría.</span></li>
                <li className="flex items-start"><CheckCircle size={24} className="inline-block mr-2 text-yellow-500 flex-shrink-0 mt-1" /><span>Facilitar <span className="font-bold">partidos competitivos y equilibrados</span> con jugadores de tu mismo nivel.</span></li>
                <li className="flex items-start"><CheckCircle size={24} className="inline-block mr-2 text-yellow-500 flex-shrink-0 mt-1" /><span>Brindar <span className="font-bold">flexibilidad total</span> para que organices tus partidos cuándo y dónde prefieras.</span></li>
                <li className="flex items-start"><CheckCircle size={24} className="inline-block mr-2 text-yellow-500 flex-shrink-0 mt-1" /><span>Crear una <span className="font-bold">comunidad activa y motivada</span> de apasionados por el pádel.</span></li>
              </ul>
              <p>
                Olvídate de la desorganización. Con NextLevel Padel, cada partido cuenta y tu progreso es visible.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const HowItWorks = () => (
    <section id="como-funciona" className="py-16 md:py-24 bg-sky-50">
      <div className="container mx-auto px-4">
        <SectionTitle>¿Cómo Funciona la App?</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StepCard number="1" title="Regístrate" description="Completa tus datos personales, indica tu nivel aproximado y realiza el pago de la membresía mensual." icon={UserPlus} />
          <StepCard number="2" title="Recibe Emparejamientos" description="El sistema te asignará rivales de tu mismo nivel y categoría quincenalmente. Recibirás una notificación en la app." icon={Shuffle}/>
          <StepCard number="3" title="Coordina y Juega" description="Contacta a tus rivales, acuerden día, hora y complejo para jugar. ¡Tienen 3 días para concretar!" icon={CalendarDays} />
          <StepCard number="4" title="Registra Resultados" description="Después del partido, ambos equipos registran el resultado en la app. ¡Tu ranking se actualizará al instante!" icon={FileText} />
        </div>
      </div>
    </section>
  );

  const Features = () => (
    <section id="caracteristicas" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Características Principales</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={BarChart3} title="Ranking Actualizado" description="Sigue tu progreso y el de tus rivales en tiempo real. Rankings individuales y por equipos (parejas) por categoría." />
          <FeatureCard icon={Users} title="Sistema de Categorías" description="Desde 1ra (élite) hasta 7ma (principiantes), con barreras de puntos claras para ascender." bgColor="bg-amber-50" textColor="text-amber-700" />
          <FeatureCard icon={Trophy} title="Ascensos y Descensos" description="¡Demuestra tu nivel! Cada 3 meses, los mejores tienen la chance de ascender jugando playoffs contra los últimos de la categoría superior." />
          <FeatureCard icon={ListChecks} title="Registro Fácil de Resultados" description="Ambos equipos confirman el resultado. Sistema de gestión de disputas para asegurar la transparencia." />
          <FeatureCard icon={ShieldQuestion} title="Gestión de Disputas" description="Si los resultados no coinciden, se activa un proceso de disputa con notificación a los administradores para una resolución justa." bgColor="bg-amber-50" textColor="text-amber-700" />
          <FeatureCard icon={Settings} title="Flexibilidad Total" description="Elige cuándo y dónde jugar tus partidos, coordinando directamente con tus rivales." />
        </div>
      </div>
    </section>
  );

  const Benefits = () => (
     <section id="beneficios" className="py-16 md:py-24 bg-sky-50">
      <div className="container mx-auto px-4">
        <SectionTitle>Beneficios para Ti</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: TrendingUp, title: "Competencia Equilibrada", description: "Juega siempre contra rivales de tu nivel, haciendo cada partido un desafío real y divertido." },
            { icon: Award, title: "Motivación Constante", description: "El sistema de ranking y los ascensos/descensos te impulsan a mejorar tu juego continuamente." },
            { icon: PlayCircle, title: "Flexibilidad de Juego", description: "Organiza tus partidos en los horarios y complejos que más te convengan." },
            { icon: ShieldCheck, title: "Reconocimiento Oficial", description: "Forma parte de un ranking reconocido en la comunidad de pádel de Bahía Blanca." },
            { icon: Users, title: "Comunidad Activa", description: "Conéctate con otros jugadores apasionados, haz nuevos contactos y disfruta más del deporte." },
            { icon: DollarSign, title: "Premios y Beneficios", description: "Accede a premios y beneficios de nuestros sponsors por destacarte en el ranking (próximamente)." }
          ].map(benefit => (
            <FeatureCard key={benefit.title} icon={benefit.icon} title={benefit.title} description={benefit.description} />
          ))}
        </div>
      </div>
    </section>
  );

  const ScoringSystem = () => (
    <section
      id="puntuacion"
      className="py-16 md:py-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${PuntosFondo})` }}
    >
      <div className="container mx-auto px-4 text-center">
        <SectionTitle>Sistema de Puntuación</SectionTitle>
        <div className="max-w-2xl mx-auto bg-sky-50 p-6 sm:p-8 rounded-xl shadow-lg">
          <Zap size={48} className="mx-auto mb-6 text-yellow-500" />
          <p className="text-lg text-gray-700 mb-4">
            En NextLevel Padel, cada partido de ranking suma para tu progreso. La puntuación se basa principalmente en:
          </p>
          <ul className="list-none space-y-3 text-left text-gray-600 mx-auto max-w-md">
            <li className="flex items-start"><CheckCircle size={24} className="inline-block mr-3 mt-1 text-sky-600 flex-shrink-0" /> <span><span className="font-bold">Partidos Ganados:</span> Otorgan la mayor cantidad de puntos para ascender en el ranking.</span></li>
            <li className="flex items-start"><CheckCircle size={24} className="inline-block mr-3 mt-1 text-sky-600 flex-shrink-0" /> <span><span className="font-bold">Partidos Perdidos:</span> En algunos casos, podrías sumar una pequeña cantidad de puntos por participación, o no sumar (según la configuración actual de la categoría).</span></li>
            <li className="flex items-start"><Info size={24} className="inline-block mr-3 mt-1 text-sky-600 flex-shrink-0" /> <span><span className="font-bold">Diferencial de Juegos/Sets (Próximamente):</span> Estamos trabajando para incorporar el diferencial de juegos o sets para una asignación de puntos más precisa.</span></li>
          </ul>
          <p className="mt-6 text-sm text-gray-500">
            El objetivo es recompensar la victoria y la consistencia. ¡Cada punto te acerca a tu próximo nivel!
          </p>
           <p className="mt-2 text-xs text-gray-400">
            (Nota: La lógica exacta de puntos puede variar ligeramente y se comunicará en detalle dentro de la app.)
          </p>
        </div>
      </div>
    </section>
  );

  const RegistrationProcess = () => {
    const STRAPI_BACKEND_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

    const handleGoogleRegistration = () => {
      window.location.href = `${STRAPI_BACKEND_URL}/api/connect/google`;
    };

    return (
      <section id="registro" className="py-16 md:py-24 bg-gradient-to-br from-yellow-400 to-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-800 mb-10">
            ¿Listo para Subir de Nivel? ¡Regístrate Hoy!
          </h2>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left mb-10 sm:mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <UserPlus size={40} className="text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-sky-700 mb-2">1. Crea tu Perfil</h3>
              <p className="text-gray-600 text-sm">Completa tus datos, cuéntanos tu nivel aproximado de pádel. ¡Es rápido y fácil!</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <DollarSign size={40} className="text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-sky-700 mb-2">2. Activa tu Membresía</h3>
              <p className="text-gray-600 text-sm">Realiza el pago de la cuota mensual accesible para acceder a todos los beneficios y empezar a competir. (Ej: $10.000 mensuales - valor de referencia).</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <CheckCircle size={40} className="text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-sky-700 mb-2">3. ¡A Jugar!</h3>
              <p className="text-gray-600 text-sm">Recibe tu asignación de categoría y prepárate para tus primeros emparejamientos. ¡El ranking te espera!</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Link
                to="/crear-cuenta" // Ruta a la página de registro local
                className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-lg text-lg sm:text-xl transition-transform transform hover:scale-105 shadow-xl inline-flex items-center justify-center w-full sm:w-auto"
            >
                Crear Cuenta Manualmente <LogIn size={22} className="inline ml-2" />
            </Link>
            <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-lg text-lg sm:text-xl transition-transform transform hover:scale-105 shadow-xl inline-flex items-center justify-center w-full sm:w-auto" // Cambiado el color para diferenciar
                onClick={handleGoogleRegistration}
            >
                Regístrate con Google <ArrowRightCircle size={22} className="inline ml-2" />
            </button>
          </div>
        </div>
      </section>
    );
  };

  const Footer = () => (
    <footer className="bg-sky-800 text-sky-100 py-12">
      <div className="container mx-auto text-center px-4">
        <img
          src={Logo}
          alt="Logo NextLevel Padel"
          className="mx-auto mb-6 sm:mb-8 w-20 h-auto sm:w-24 md:w-28" // Responsive logo size
        />
        <p className="mb-2 text-lg font-semibold">NextLevel Padel</p>
        <p className="text-sm mb-4">Llevando tu juego al siguiente nivel en Bahía Blanca.</p>
        <div className="flex justify-center space-x-4 sm:space-x-6 mb-4">
          <a href="https://facebook.com/nextlevelpadelbahia" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">Facebook (Próximamente)</a>
          <a href="https://instagram.com/nextlevelpadelbahia" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">Instagram (Próximamente)</a>
        </div>
        <p className="text-xs text-sky-300">
          &copy; {new Date().getFullYear()} NextLevel Padel. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );

  // Componente para la página de inicio que renderiza todas las secciones
  const HomePage = () => (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <Benefits />
      <ScoringSystem />
      <RegistrationProcess />
    </>
  );

  // Componente simple de ejemplo para una página de perfil
  const ProfilePage = () => {
    // Hook para navegación, útil si quieres redirigir programáticamente
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('jwtToken');
      // localStorage.removeItem('userData'); // Si también guardaste datos del usuario
      // En lugar de alert, podrías mostrar un mensaje más integrado
      console.log('Sesión cerrada'); // O un toast/notificación
      navigate('/'); // Redirige al inicio
    };
    
    return (
    <div className="container mx-auto p-6 sm:p-8 mt-8 sm:mt-10 text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-sky-700 mb-4">¡Bienvenido a tu Perfil!</h1>
      <p className="text-gray-700 mb-6">Aquí podrás ver tu información, próximos partidos y más.</p>
      <p className="text-gray-600 text-sm sm:text-base">
        Token JWT almacenado: 
        <span className="font-mono bg-gray-100 p-1 rounded text-sm ml-1">
            {localStorage.getItem('jwtToken') ? 'Sí ✅' : 'No ❌'}
        </span>
      </p>
      {/* Aquí podrías mostrar más información del usuario si la guardaste en localStorage */}
      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        Cerrar Sesión
      </button>
    </div>
  )};

  // Componente para página de error de login (opcional)
  const LoginErrorPage = () => (
    <div className="container mx-auto p-6 sm:p-8 text-center mt-8 sm:mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-red-600">Error de Autenticación</h1>
      <p className="text-gray-700 mb-6">Hubo un problema al intentar iniciar sesión con Google. Por favor, inténtalo de nuevo.</p>
      <Link to="/" className="mt-4 inline-block bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
        Volver al Inicio
      </Link>
    </div>
  );

  // Este es el return principal del componente App
  return (
    <Router>
      <div className="font-sans antialiased text-gray-800"> {/* Default text color */}
        <Navbar />
        <main className="bg-gray-50"> {/* Un fondo general suave para el main */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/connect/google/redirect" element={<GoogleAuthCallback />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/login-error" element={<LoginErrorPage />} />
            <Route path="/crear-cuenta" element={<RegisterFormPage />} /> {/* Nueva ruta para el formulario de registro */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
