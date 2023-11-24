import Header from "../../components/Header/Header"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import {faXTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from "react-router-dom"
import Card from "../../components/Card/Card";

import styles from "./Contact.module.css"

export default function Contact(){
    return (
        <div className={styles.contactPage}>
            <Header/>
            <div>
            <h1 className={styles.bigTitle}>Ponte en contacto con nosotros:</h1>
            </div>
            <div className={styles.boxHolder}>
                <div className={styles.contactBox}>
                    <h2 className={styles.title}>Redes Sociales</h2>
                    <p>Puedes contactarnos en cualquiera de nuestras redes. Siguenos para mas novedades.</p>
                    <FontAwesomeIcon className={styles.icon} icon={faXTwitter}/>
                    <FontAwesomeIcon className={styles.icon} icon={faLinkedin}/>
                    <FontAwesomeIcon className={styles.icon} icon={faInstagram}/>
                </div>
                <div className={styles.contactBox}>
                    <h2 className={styles.title}>Teléfono</h2>
                    <p>Nos gustaría mucho escucharte, no dudes en llamarnos y te responderemos cualquier pregunta.</p>
                    <p> <FontAwesomeIcon icon={faPhone}/> +1 8005643221</p>
                </div>
                <div className={styles.contactBox}>
                    <h2 className={styles.title}>Correo electrónico</h2>
                    <p>Escríbenos un correo, nuestro equipo encargado te responderá en un tiempo estimado entre las 24 y 48 horas.</p>
                    <p> <FontAwesomeIcon icon={faEnvelope}/> servicioalcliente@cer03.com</p>
                </div>
            </div>
            <div className={styles.goHolder}>
                <NavLink to = '/'>
                <h2 className={styles.goBack}><FontAwesomeIcon icon={faLeftLong}/> Volver</h2> </NavLink>
            </div>
        </div>
    )
}