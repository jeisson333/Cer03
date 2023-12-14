import { Slide } from "react-awesome-reveal";
import { useState, useEffect } from "react";
import Style from "./Testimonials.module.css";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startIndex = currentIndex * 2;
  const endIndex = startIndex + 2;
  const [testimonialsData, setTestimonialsData] = useState([]);

  useEffect(() => {
    axios(`${baseUrl}/review`).then(({ data }) => {
      setTestimonialsData(data);
    });
  }, []);

  const visibleTestimonials = testimonialsData?.slice(startIndex, endIndex);

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

  return (
    <div className={Style.testimonialsContainer}>
      <div className={Style.testimonialsList}>
        {visibleTestimonials.map((testimonial) => (
          <Slide key={testimonial?.id_review} bottom>
            <div className={Style.testimonialItem}>
              <p className={Style.quote}>{testimonial?.descripcion_review}</p>
              <div className={Style.authorInfo}>
                <div className={Style.avatar}>
                  <img
                    className={Style.avatarImage}
                    src={`https://ui-avatars.com/api/?name=${testimonial?.EMPRESA?.nombre_empresa}`}
                    alt={testimonial?.EMPRESA?.nombre_empresa}
                  />
                </div>
                <div className={Style.authorName}>
                  <div className={Style.authorNameText}>
                    {testimonial?.EMPRESA?.nombre_empresa}
                  </div>
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
