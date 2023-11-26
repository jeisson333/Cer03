import { NavLink } from "react-router-dom";
import logo from "../image/logocer03.jpeg";
import style from "./Header.module.css";

export default function Header() {
  return (
    <div className={style.header}>
      <img className={style.logoImage} src={logo} alt="Cer03" />
      <div className={style.headerHolder}>
        <NavLink to="/about">
          <h1 className={style.element}>Sobre Nosotros</h1>
        </NavLink>
        <NavLink to="/contact">
          <h1 className={style.element}>Contáctanos ✆</h1>
        </NavLink>
        <NavLink to="/signIn">
          <button className={style.login}>Log In </button>
        </NavLink>
      </div>
    </div>
  );
}
