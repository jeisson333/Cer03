import Style from "./LandingPage.module.css";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import SlideShow from "../../components/SlideShow/SlideShow";
import Advantages from "../../components/Advantages/Advantages";
import Header from "../../components/Header/Header";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  cookies.set("auth", {}, { path: "/" });
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const testimonialsData = [
    {
      id: 1,
      name: "Juan Pérez",
      quote:
        "¡Increíble experiencia! Me encanta la comunidad y la conexión que proporciona Cer03.",
    },
    {
      id: 2,
      name: "María García",
      quote:
        "Cer03 ha cambiado la forma en que interactúo con mi vecindario. Estoy muy agradecida.",
    },
    {
      id: 3,
      name: "María García",
      quote:
        "Cer03 ha cambiado la forma en que interactúo con mi vecindario. Estoy muy agradecida.",
    },
    {
      id: 4,
      name: "María García",
      quote:
        "Cer03 ha cambiado la forma en que interactúo con mi vecindario. Estoy muy agradecida.",
    },
    {
      id: 5,
      name: "María García",
      quote:
        "Cer03 ha cambiado la forma en que interactúo con mi vecindario. Estoy muy agradecida.",
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
              Explota el potencial de tu empresa, ya sea chica o grande. En
              Cer03, priorizamos el control de tu inventario y finanzas.
            </p>
          </Fade>
          <Fade delay={600}>
            <p className={Style.description}>
              Lleva los detalles de tus productos y ventas desde la pantalla de
              tu PC o tu celular, ya no necesitaras usar más el papel y lápiz.
            </p>
          </Fade>
          <Fade delay={900}>
            <p className={Style.description}>
              Únete a nosotros para modernizar y agilizar el control de tu
              negocio
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
      <Testimonials
        currentIndex={currentIndex}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <div className={Style.additional_container}>
        <Fade>
          <div className={Style.additional_wrapper}>
            <div className={Style.additional_text_container}>
              <h2 className={Style.additional_title}>Administra tu negocio</h2>
              <p>
                Con Cer03 prodras administrar 100% de forma digital tu negocio,
                aumentando asi, la velocidad con la que consultas tu inventario
                y ventas.
              </p>
            </div>
            <div className={Style.additional_image}>
              <img
                src="https://previews.123rf.com/images/yupiramos/yupiramos1802/yupiramos180210134/95204193-computadora-port%C3%A1til-con-estad%C3%ADsticas.jpg"
                alt="una imagen aca"
              />
            </div>
          </div>
        </Fade>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
