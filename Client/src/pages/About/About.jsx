import Header from "../../components/Header/Header";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import valores from "../../assets/Valores.jpg";
import mision from "../../assets/mision.jpg";
import styles from "./About.module.css";
import Footer from "../../components/Footer/Footer";

export default function About() {
  return (
    <div className={styles.aboutPage} style={{ marginTop: "15vh" }}>
      <Header />
      <div>
        <div className={styles.story}>
          <div className={styles.textWithBackground}>
            <h1 className={styles.title}>Nuestra Historia...</h1>
            <div className={styles.container}>
              <h3 className={`${styles.body} ${styles.whiteText}`}>
                Cer03 se creo con la idea de impulsar a los pequeños negocios
                por medio de la digitalización financiera, y potenciar aún más a
                las grandes empresas Visualizamos un mundo en el que cada
                empresa y nuevo vendedor pueda aprovechar el poder de la
                tecnología para impulsar su crecimiento. Diferentes empresarios
                notaron las dificultades para vender y administrar productos de
                forma tradicional. Teniendo en cuenta estas dificultades, un
                grupo de mentes visionarias se unió con una misión compartida,
                apoyar tanto a las grandes empresas como a los pequeños
                comerciantes. Nuestro propósito es simplificar el trabajo de la
                gestión de ventas y productos. Por esto es que nos distinguimos.
                Cer03 no solo ofrece la mejor tecnología. Creemos en la
                simplicidad sin sacrificar la sofisticación, en el poder sin
                complejidad. Nuestra plataforma es un testimonio de la idea de
                que la tecnología debe ser un puente que facilite a las empresas
                el llevar cuenta de aquello que a veces resulta difícil. Detrás
                de la interfaz elegante y sus funciones, tenemos un equipo de
                individuos dedicados a ti, apasionados por ayudar en tu éxito.
                Desarrolladores, servicio al cliente y mucho más. Cer03 está
                comprometido a brindar un soporte incomparable en tu viaje a la
                excelencia.
              </h3>
            </div>
          </div>
        </div>
        <div className={styles.secondBlock}>
          <div className={`${styles.smallBlockHolder} ${styles.card}`}>
            <h1 className={styles.title}>Nuesta visión</h1>
            <h3 className={styles.body}>
              Nos visualizamos como arquitectos de soluciones vanguardistas,
              donde la innovación no tiene límites. Buscamos constantemente
              nuevas formas de simplificar y potenciar la gestión de ventas y
              productos. allanando el camino para que las empresas se destaquen
              en un entorno comercial en constante evolución.
            </h3>
            <img src={mision} alt="Mision" />
          </div>
          <div className={`${styles.smallBlockHolder} ${styles.card}`}>
            <h1 className={styles.title}>Nuestros valores</h1>
            <h3 className={styles.body}>
              Creemos que la unión hace la fuerza. Por ello imaginamos un
              ecosistema empresarial donde la sinergia entre empleados,
              empresarios y la plataforma Cer03 fomente relaciones sólidas y
              crecimiento mutuo.
            </h3>
            <img src={valores} alt="Valores" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
