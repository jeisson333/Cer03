import React, { useState } from 'react';
import { Fade, Slide } from 'react-reveal';
import SlideShow from '../../components/SlideShow/SlideShow';
import Advantages from '../../components/Advantages/Advantages';
import Header from '../../components/Header/Header';
import Testimonials from '../../components/Testimonials/Testimonials';
import Style from './LandingPage.module.css'
import Footer from '../../components/Footer/Footer';

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
    <div className={Style.main_container}>
      <Header />
      {/* Contenedor principal */}
      <div className={Style.flex_container}>
        {/* Texto a la izquierda con animación Fade */}
        <div className={Style.text_section}>
          <Fade>
            <h1 className={Style.title}>Bienvenido a Cer03</h1>
          </Fade>
          <Fade delay={300}>
            <p className={Style.description}>
              Explora las posibilidades de tu comunidad con nosotros. En Cer03,
              priorizamos las conexiones y el crecimiento conjunto sobre las transacciones comerciales.
            </p>
          </Fade>
          <Fade delay={600}>
            <p className={Style.description}>
              Registra y comparte tus experiencias, eventos y recursos con otros miembros del barrio.
              Lleva un control detallado de tus interacciones, desde colaboraciones hasta actividades
              cotidianas, sin la presión de vender.
            </p>
          </Fade>
          <Fade delay={900}>
            <p className={Style.description}>
              Únete a nosotros para construir juntos un espacio comunitario vibrante y próspero.
            </p>
          </Fade>
        </div>

        <div className={Style.slideshow_container}>
          <SlideShow />
        </div>
      </div>

      <div className={Style.advantages_container}>
        <Advantages />
      </div>
      <Testimonials currentIndex={currentIndex} handlePrev={handlePrev} handleNext={handleNext} />
      <div className={Style.additional_container}>
        <Fade>
          <div className={Style.additional_wrapper}>
            <div className={Style.additional_text_container}>
              <h2 className={Style.additional_title}>Administra tu negocio</h2>
              <p>
                Treinta es la primera app gratuita de Latinoamérica que permite a los negocios digitalizar sus finanzas. Administra ventas, gastos, deudas, inventario, balance y mucho más, 100% gratis.
              </p>
            </div>
            <div className={Style.additional_image}>
              <img src="https://previews.123rf.com/images/yupiramos/yupiramos1802/yupiramos180210134/95204193-computadora-port%C3%A1til-con-estad%C3%ADsticas.jpg" alt="una imagen aca" />
            </div>
          </div>
        </Fade>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
