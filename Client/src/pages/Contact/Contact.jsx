import Header from "../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import {
  faXTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import styles from "./Contact.module.css";
import contactanos from "../../assets/Contactanos.jpeg";

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      <Header />
      <div>
        <h1 className={styles.bigTitle}>Contáctanos</h1>
      </div>
      <div className={styles.boxHolder}>
        <div className={styles.contactBox}>
          <h2 className={styles.title}>Redes Sociales</h2>
          <p className={styles.text}>
            Puedes contactarnos en cualquiera de nuestras redes. Siguenos para
            mas novedades.
          </p>
          <FontAwesomeIcon className={styles.icon} icon={faXTwitter} />
          <FontAwesomeIcon className={styles.icon} icon={faLinkedin} />
          <FontAwesomeIcon className={styles.icon} icon={faInstagram} />
        </div>
        <div className={styles.contactBox}>
          <h2 className={styles.title}>Teléfono</h2>
          <p className={styles.text}>
            Nos gustaría mucho escucharte, no dudes en llamarnos y te
            responderemos cualquier pregunta.
          </p>
          <p className={styles.link}>
            {" "}
            <FontAwesomeIcon icon={faPhone} /> +1 8005643221
          </p>
        </div>
        <div className={styles.contactBox}>
          <h2 className={styles.title}>Correo electrónico</h2>
          <p className={styles.text}>
            Escríbenos un correo, nuestro equipo encargado te responderá en un
            tiempo estimado entre las 24 y 48 horas.
          </p>
          <p className={styles.link}>
            {" "}
            <FontAwesomeIcon icon={faEnvelope} /> servicioalcliente@cer03.com
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
