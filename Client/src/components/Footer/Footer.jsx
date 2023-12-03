import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Style from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={Style.footer}>
      <div className={Style.container}>
        <div className={Style.contentContainer}>
          <div className={Style.socialContainer}>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className={Style.socialIcon} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className={Style.socialIcon} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className={Style.socialIcon} />
            </a>
          </div>

          <div className={Style.infoContainer}>
            <p className={Style.infoText}>© 2023 Tu Empresa. Todos los derechos reservados.</p>
            <p className={Style.infoText}>Dirección: Calle Principal, Ciudad</p>
            <p className={Style.infoText}>Teléfono: (123) 456-7890</p>
            <p className={Style.infoText}>Correo: info@tuempresa.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
