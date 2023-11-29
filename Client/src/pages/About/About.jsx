import Header from "../../components/Header/Header";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.aboutPage} style={{ marginTop: "15vh" }}>
      <Header />
      <div>
        <div className={styles.story}>
          <h1 className={styles.title}>
            Conectando empresas, Potenciando el crecimiento
          </h1>
          <h3 className={styles.body}>
            Cer03 empezó en Marzo del 2005. No se trataba solo de crear una
            plataforma sinó de tejer una tela digital que conectara a las
            empresas con sus clientes y empleados de forma eficiente.
            Visualizamos un mundo en el que cada empresa y cada pequeño vendedor
            pueda aprovechar el poder de la technología para impulsar su
            crecimiento. Diferentes empresarios notaron las dificultades para
            vender y administrar productos. Teniendo en cuenta estas
            dificultades, un grupo de mentes visionarias se unió con una misión
            compartida para apoyar tanto a las empresas grandes como a los
            pequeños comerciantes. Nuestro propósito es simplificar el trabajo
            de la gestión de ventas y proovedores. Por esto es que nos
            distinguimos. Cer03 no solo ofrece la mejor tecnología. Creemos en
            la simplicidad sin sacrificar la sofisticación, en el poder sin
            complejidad. Nuestra plataforma es un testimonio de la idea de que
            la tecnología debe ser un puente que facilite a las empresas a
            concentrarse en lo que mejor hacen: servir a sus clientes.
          </h3>

          <h3 className={styles.body}>
            Detás de la interfaz elegante y las múltiples funciones, tenemos un
            equipo de individuos dedicas a ti, apasionados por tu éxito.
            Desarrolladores, servicio al cliente y mucho mas. Cer03 está
            comprometido a brindar un soporte incomparable en tu viaje a la
            excelencia.
          </h3>
          <h3 className={styles.body}>
            No dudes en contactarnos, solo debes hacer click{" "}
            <NavLink to="/contact">
              <a>aqui</a>
            </NavLink>
            .
          </h3>
        </div>
        <div className={styles.secondBlock}>
          <div className={styles.smallBlockHolder}>
            <h1 className={styles.title}>Nuesta visión</h1>
            <h3 className={styles.body}>
              Nos visualizamos como arquitectos de soluciones vanguardistas,
              donde la innovación no tiene límites. Buscamos constantemente
              nuevas formas de simplificar y potencial la gestión de ventas y
              proovedores. allanando el camino para que las empresas se
              destaquen en un entorno comercial en constante evolución.
            </h3>
            <h3 className={styles.body}>
              Creemos que la unión hace la fuerza. Nuesta visión incluye un
              ecosistema empresarial donde la sinergía entre clientes, empleados
              y la plataforma Cer03 fomente relaciones sólidas y crecimiento
              mutuo.
            </h3>
          </div>
          <div className={styles.smallBlockHolder}>
            <h1 className={styles.title}>Impacto social</h1>
            <h3 className={styles.body}>
              <strong>Empresas conectadas:</strong> Mas de 1000 empresas en todo
              el mundo confían en Cer03 para gestionar sus ventas.
            </h3>
            <h3 className={styles.body}>
              <strong>Transacciones procesadas:</strong> Anualmente facilitames
              mas de 100 millones de transacciones, simplificando y agilizando
              los procesos comerciales.
            </h3>
            <h3 className={styles.body}>
              <strong>Pequeños proovedores:</strong> Los pequeños proovedores
              experimentaron un aumento promedio del 22% en sus ingresos desde
              que se unieron a Cer03.
            </h3>
          </div>
        </div>
        <NavLink to="/">
          <h2 className={styles.goBack}>
            <FontAwesomeIcon icon={faLeftLong} /> Volver
          </h2>{" "}
        </NavLink>
      </div>
    </div>
  );
}
