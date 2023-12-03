import { Slide } from "react-awesome-reveal";
import Style from "./Testimonials.module.css";

const testimonialsData = [
  {
    id: 1,
    name: "Juan Pérez",
    quote:
      "Excelente, la empecé a revisar y está muy bien creada, tienen todo lo que necesito para llevar un mejor control de mi negocio y lo mejor de lo mejor es que se utiliza en el celular muy bien pensando Cer03. Gracias Cer03 por pensar en nosotros. ",
  },
  {
    id: 2,
    name: "María García",
    quote:
      "¡Me encanta! ¡Simplemente espectacular! Puedo no solo llevar el inventario y registro de compras y ventas sino también un registro de deudores. Además, que ponen a tu disposición una página web con un catálogo de tus productos. La amo.",
  },
  {
    id: 3,
    name: "Carlos Martínez",
    quote:
      "Es Genial pode hacer todas las tareas necesarias para administrar el negocio desde el celular o computadora y tener la opción de soporte técnico. Gracias!!",
  },
  {
    id: 4,
    name: "Ana Rodríguez",
    quote:
      "Excelente para llevar la administración de tu negocio y tus finanzas. Amo la opción de inventario, es justo lo que necesitaba para organizar mi mercancía.",
  },
  {
    id: 5,
    name: "Pedro Sánchez",
    quote:
      "Cuando empecé mi negocio me costaba mucho llevar la cuenta de mi inventario y las ventas del mes, pero desde que empecé a usar Cer03 todo mi trabajo se agilizó, aumentando así mis ingresos.",
  },
];

const Testimonials = ({ currentIndex, handlePrev, handleNext }) => {
  const startIndex = currentIndex * 2;
  const endIndex = startIndex + 2;
  const visibleTestimonials = testimonialsData.slice(startIndex, endIndex);

  return (
    <div className={Style.testimonialsContainer}>
      <div className={Style.testimonialsList}>
        {visibleTestimonials.map((testimonial) => (
          <Slide key={testimonial.id} bottom>
            <div className={Style.testimonialItem}>
              <p className={Style.quote}>{testimonial.quote}</p>
              <div className={Style.authorInfo}>
                <div className={Style.avatar}>
                  <img
                    className={Style.avatarImage}
                    src={`https://ui-avatars.com/api/?name=${testimonial.name}`}
                    alt={testimonial.name}
                  />
                </div>
                <div className={Style.authorName}>
                  <div className={Style.authorNameText}>{testimonial.name}</div>
                </div>
              </div>
            </div>
          </Slide>
        ))}
      </div>
      <div className={Style.buttonContainer}>
        <button
          className={Style.arrowButton}
          onClick={handlePrev}
          style={{ visibility: currentIndex === 0 ? "hidden" : "visible" }}
        >
          {"<"}
        </button>
        <button
          className={Style.arrowButton}
          onClick={handleNext}
          style={{
            visibility:
              currentIndex * 2 + 2 < testimonialsData.length
                ? "visible"
                : "hidden",
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
