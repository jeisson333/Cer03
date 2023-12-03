import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../image/logocer03.jpeg";
import Style from './Header.module.css'

const Header = () => {
  return (
    <nav className={Style.navBar}>
      <div className={Style.container}>
        <div className={Style.logoContainer}>
          <img
            className={Style.logo}
            src={logo}
            alt="Cer03"
          />
        </div>

        <div className={Style.linkContainer}>
          <NavLink
            to="/about"
            className={Style.navLink}
          >
            Sobre Nosotros
          </NavLink>

          <NavLink
            to="/contact"
            className={Style.navLink}
          >
            Contáctanos ✆
          </NavLink>

          <NavLink to="/signIn">
            <button className={Style.loginButton}>
              Log In
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;