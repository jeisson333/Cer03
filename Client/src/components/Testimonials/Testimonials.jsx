// Testimonials.js
import React from "react";
import { Slide } from "react-awesome-reveal";

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
    <div className="max-w-3xl mx-auto mt-12 relative overflow-hidden">
      <div className="flex items-center">
        <button
          className="w-10 h-10 bg-gray-800 text-white flex items-center justify-center"
          onClick={handlePrev}
        >
          {currentIndex === 0 ? "" : "<"}
        </button>
        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {visibleTestimonials.map((testimonial) => (
              <Slide key={testimonial.id} bottom>
                <div className="bg-white p-8 rounded shadow-md mb-8 mr-4 w-1/2">
                  <p className="text-gray-600">{testimonial.quote}</p>
                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${testimonial.name}`}
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {testimonial.name}
                      </div>
                    </div>
                  </div>
                </div>
              </Slide>
            ))}
          </div>
        </div>
        <button
          className="w-10 h-10 bg-gray-800 text-white flex items-center justify-center"
          onClick={handleNext}
        >
          {currentIndex * 2 + 2 < testimonialsData.length ? " >" : ""}
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
