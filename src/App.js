import React, { useState, useEffect, useMemo } from 'react';
// Asegúrate de tener lucide-react instalado: npm install lucide-react
import ImgComunidad from './assets/comunidad.webp';
import PuntosFondo from './assets/PuntosFondo.jpg'; // <<--- 1. IMPORTA TU IMAGEN AQUÍ
import Logo from './assets/Logo.png';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel

import Competitivo from './assets/Competitivo.jpg';
import ImagenPadel2 from './assets/PuntosFondo.jpg';
import ImagenPadel3 from './assets/comunidad.webp';
import {
  ShieldCheck, Users, Trophy, ListChecks, TrendingUp, UserPlus, Zap, DollarSign,
  CalendarDays, Info, PlayCircle, CheckCircle, ArrowRightCircle, BarChart3,
  Award, Shuffle, FileText, Settings, ShieldQuestion
} from 'lucide-react';

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

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = useMemo(() => [
    { id: 'home', title: 'Inicio' },
    { id: 'que-es', title: '¿Qué es?' },
    { id: 'como-funciona', title: '¿Cómo Funciona?' },
    { id: 'caracteristicas', title: 'Características' },
    { id: 'beneficios', title: 'Beneficios' },
    { id: 'puntuacion', title: 'Puntuación'},
    { id: 'registro', title: 'Regístrate' },
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
        threshold: 0.5, 
        rootMargin: "-40% 0px -40% 0px" 
      } 
    );

    navLinks.forEach(link => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => {
      navLinks.forEach(link => {
        const section = document.getElementById(link.id);
        if (section) observer.unobserve(section);
      });
      observer.disconnect();
    };
  }, [navLinks]);


  const Navbar = () => (
    <nav className="bg-sky-700 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-yellow-400 hover:text-amber-300 transition-colors">
          NextLevel Padel
        </a>
        <div className="hidden md:flex space-x-3 lg:space-x-5">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`hover:text-yellow-400 transition-colors px-2 py-1 rounded-md text-sm ${activeSection === link.id ? 'text-yellow-400 border-b-2 border-yellow-400 font-semibold' : ''}`}
            >
              {link.title}
            </a>
          ))}
        </div>
        <a href="#registro" className="hidden md:inline-block bg-yellow-400 hover:bg-amber-500 text-sky-800 font-semibold py-2 px-4 rounded-lg transition-colors">
          ¡Únete Ahora!
        </a>
        {/* TODO: Implementar menú hamburguesa para móviles */}
      </div>
    </nav>
  );

  const Hero = () => (
    <section id="home" className=" text-white py-20 md:py-32 min-h-screen flex flex-col justify-center items-center  " style={{ backgroundImage: `url(${PuntosFondo})` }}>
  
      <div className="container mx-auto text-center px-4 pad  ">
        <img
          src={Logo}// Usando amber-400 para el color de texto
          alt="Logo NextLevel Padel"
          className="mx-auto mb-8  " // Usando yellow-400
           width={200}
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Bienvenido a <span className="text-yellow-400">NextLevel Padel</span> {/* Usando yellow-400 */}
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          La plataforma digital que organiza, motiva y conecta a la comunidad de jugadores de pádel en Bahía Blanca. ¡Lleva tu juego al siguiente nivel!
        </p>
        <a
          href="#registro"
          className="bg-yellow-400 hover:bg-amber-500 text-sky-800 font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg"
        >
          Regístrate y Compite
        </a>
      </div>

    </section>
  );

  const About = () => {
    // Define un array de tus imágenes
    const images = [
      {
        src: Competitivo,
        alt: "Jugadores de Padel Conectados - Vista 1",
        legend: "Competición y Conexión" // Leyenda opcional para cada imagen
      },
      {
        src: ImagenPadel2, // Reemplaza con la ruta a tu segunda imagen
        alt: "Jugadores de Padel Disfrutando - Vista 2",
        legend: "Partidos Equilibrados"
      },
      {
        src: ImagenPadel3, // Reemplaza con la ruta a tu tercera imagen
        alt: "Comunidad de Padel - Vista 3",
        legend: "Comunidad Activa"
      },
      // Puedes añadir más imágenes aquí
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
          className="rounded-xl shadow-xl overflow-hidden" // Estilos para el contenedor principal del carrusel
        >
          {images.map((image, index) => (
            // Contenedor de la diapositiva: le damos una altura fija o máxima.
            // Usaremos h-[400px] para una altura fija de 400px.
            // Tailwind CSS: h-[400px] -> height: 400px;
            // Podrías usar max-h-[400px] si quieres que sea flexible hasta 400px,
            // pero para que object-cover funcione bien, una altura fija en el contenedor es más predecible.
            <div key={index} className="h-[400px]"> {/* Contenedor de cada slide con altura fija */}
              <img
                src={image.src}
                alt={image.alt}
                // w-full: la imagen ocupa todo el ancho del contenedor.
                // h-full: la imagen ocupa toda la altura del contenedor (que es 400px).
                // object-cover: la imagen se redimensiona para mantener su relación de aspecto
                //               mientras llena las dimensiones del elemento; si la relación de aspecto
                //               del objeto no coincide con la de su caja, entonces el objeto
                //               será recortado para ajustarse.
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  // Ajusta el placeholder para que también intente llenar el espacio, si es posible,
                  // o considera un placeholder con una relación de aspecto más adaptable.
                  // El texto podría ser difícil de leer si la imagen del placeholder es muy pequeña o grande.
                  e.target.src = `https://placehold.co/800x400/E0F2FE/0284C7?text=${encodeURIComponent(image.alt || 'Imagen Padel No Disponible')}`;
                }}
              />
              {image.legend && (
                <p className="legend">{image.legend}</p> // Estilos de la leyenda son manejados por react-responsive-carousel
              )}
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
    className="py-16 md:py-24 bg-cover bg-center" // Clases para el tamaño y posición
    style={{ backgroundImage: `url(${PuntosFondo})` }} // Se establece la imagen de fondo
  >
      <div className="container mx-auto px-4 text-center">
        <SectionTitle>Sistema de Puntuación</SectionTitle>
        <div className="max-w-2xl mx-auto bg-sky-50 p-8 rounded-xl shadow-lg">
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

  const RegistrationProcess = () => (
    <section id="registro" className="py-16 md:py-24 bg-gradient-to-br from-yellow-400 to-amber-500">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-800 mb-10">
          ¿Listo para Subir de Nivel? ¡Regístrate Hoy!
        </h2>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-left">
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
        <button
            className="mt-12 bg-sky-700 hover:bg-sky-800 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-xl"
            onClick={() => alert('Redirigiendo al formulario de registro... (funcionalidad a implementar)')}
        >
          Quiero Registrarme <ArrowRightCircle size={24} className="inline ml-2" />
        </button>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-sky-800 text-sky-100 py-12">
      <div className="container mx-auto text-center px-4">
      <img
          src={Logo}// Usando amber-400 para el color de texto
          alt="Logo NextLevel Padel"
          className="mx-auto mb-8 md:w-40 md:h-45 " // Usando yellow-400
          width={100}
        />
        <p className="mb-2 text-lg font-semibold">NextLevel Padel</p>
        <p className="text-sm mb-4">Llevando tu juego al siguiente nivel en Bahía Blanca.</p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://facebook.com/nextlevelpadelbahia" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">Facebook (Próximamente)</a>
          <a href="https://instagram.com/nextlevelpadelbahia" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">Instagram (Próximamente)</a>
        </div>
        <p className="text-xs text-sky-300">
          &copy; {new Date().getFullYear()} NextLevel Padel. Todos los derechos reservados.
          {/* TODO: Añadir links a Términos y Privacidad */}
        </p>
      </div>
    </footer>
  );

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Features />
        <Benefits />
        <ScoringSystem />
        <RegistrationProcess />
      </main>
      <Footer />
    </div>
  );
};

export default App;
