import React, { useState } from 'react';
import { Fade } from 'react-reveal';
import SlideShow from '../../components/SlideShow/SlideShow';
import Advantages from '../../components/Advantages/Advantages';
import Header from '../../components/Header/Header';
import Testimonials from '../../components/Testimonials/Testimonials';

const LandingPage = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1));
  };

  const testimonialsData = [
    {
      id: 1,
      name: 'Juan Pérez',
      quote: '¡Increíble experiencia! Me encanta la comunidad y la conexión que proporciona Cer03.',
    },
    {
      id: 2,
      name: 'María García',
      quote: 'Cer03 ha cambiado la forma en que interactúo con mi vecindario. Estoy muy agradecida.',
    },
    {
      id: 3,
      name: 'María García',
      quote: 'Cer03 ha cambiado la forma en que interactúo con mi vecindario. Estoy muy agradecida.',
    },
    {
      id: 4,
      name: 'María García',
      quote: 'Cer03 ha cambiado la forma en que interactúo con mi vecindario. Estoy muy agradecida.',
    },
    {
      id: 5,
      name: 'María García',
      quote: 'Cer03 ha cambiado la forma en que interactúo con mi vecindario. Estoy muy agradecida.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      {/* Contenedor principal */}
      <div className="flex-1 flex overflow-hidden mt-40">
        {/* Texto a la izquierda con animación Fade */}
        <div className="w-1/2 p-8 flex flex-col items-center justify-center">
          <Fade>
            <h1 className="text-4xl font-bold mb-4">Bienvenido a Cer03</h1>
          </Fade>
          <Fade delay={300}>
            <p className="text-gray-600 mb-4">
              Explora las posibilidades de tu comunidad con nosotros. En Cer03,
              priorizamos las conexiones y el crecimiento conjunto sobre las transacciones comerciales.
            </p>
          </Fade>
          <Fade delay={600}>
            <p className="text-gray-600 mb-4">
              Registra y comparte tus experiencias, eventos y recursos con otros miembros del barrio.
              Lleva un control detallado de tus interacciones, desde colaboraciones hasta actividades
              cotidianas, sin la presión de vender.
            </p>
          </Fade>
          <Fade delay={900}>
            <p className="text-gray-600">
              Únete a nosotros para construir juntos un espacio comunitario vibrante y próspero.
            </p>
          </Fade>
        </div>

        <div className="w-1/2 p-8">
          <SlideShow />
        </div>
      </div>

      <div className="w-full p-8 mt-8">
        <Advantages />
      </div>
      <Testimonials currentIndex={currentIndex} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  );
};

export default LandingPage;
