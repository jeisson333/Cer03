import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.content}>
      <div className={style.navContent}>
        <h1 className={style.title}>Nombre de la tienda</h1>
        <NavLink className={style.config} to="/setings">
          Configuracion
        </NavLink>
        <div className={style.p_v_i}>
          <NavLink className={style.button} to="/products">
            Productos
          </NavLink>
          <NavLink className={style.button} to="/sales">
            Ventas
          </NavLink>
          <NavLink className={style.button} to="/inventory">
            Inventario
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
