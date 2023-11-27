import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Fade, Zoom } from "react-reveal";

const images = [
  "https://www.brinknews.com/wp-content/uploads/2019/12/shutterstock_1031044285.jpg",
  "https://www.upb.edu.co/es/imagenes/img-10-tips-para-emprender-con-exito-1464262571595.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgsX6sPOuEwHlMYBsAMUktEnUNs7lJ0t2vGQ&usqp=CAU",   
];

const LandingPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000);
  
      return () => clearInterval(timer);
    }, []);
  
    return (
      <div className="flex flex-wrap items-center justify-center min-h-screen">
        <Header />
  
        <div className="w-full md:w-2/5 p-8">
          <Fade top>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-blue-500 font-bold mb-4">
              Tu negocio a la mano y en todos tus dispositivos
            </h1>
          </Fade>
          <Fade top>
            <p className="text-gray-700 mb-4">
              ¡No importa el tamaño! Aquí los pequeños negocios, comerciantes y
              emprendedores pueden digitalizar, monitorear y crecer las finanzas
              de su negocio.
            </p>
          </Fade>
          <Fade top>
            <ul className="list-disc list-inside mb-4">
              <li>Registra tus ventas, deudas y gastos.</li>
              <li>Gestiona grandes inventarios desde tu computadora.</li>
              <li>Crea tu catálogo virtual y vende en línea.</li>
              <li>Sincroniza tu información automáticamente en tu app y PC.</li>
            </ul>
          </Fade>
        </div>
  
        <div className="w-full md:w-3/5 p-8">
          <Zoom>
            <img
              className="w-full h-auto rounded-lg shadow-md hover:opacity-90 transform hover:scale-105 transition duration-300"
              src={images[currentImageIndex]}
              alt=""
            />
          </Zoom>
        </div>
      </div>
    );
  };
  
  export default LandingPage;  