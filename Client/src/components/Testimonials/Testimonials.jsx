import { Slide } from "react-awesome-reveal";
import Style from "./Testimonials.module.css";

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
    name: "Carlos Martínez",
    quote:
      "Una plataforma excepcional para conectar con los demás en la comunidad.",
  },
  {
    id: 4,
    name: "Ana Rodríguez",
    quote:
      "Cer03 me ha ayudado a descubrir eventos interesantes y a conocer a personas increíbles.",
  },
  {
    id: 5,
    name: "Pedro Sánchez",
    quote:
      "Gran herramienta para fortalecer la comunidad y construir lazos significativos.",
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
