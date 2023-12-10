import { useNavigate } from "react-router-dom";
import Style from "./settingsProductos.module.css";

const SettingsProductos = () => {
  const navigate = useNavigate();

  const navigateToDeleteProductos = () => {
    navigate("/deleteProduct");
  };

  return (
    <div className={Style.contenido}>
      <button className={Style.Btn} onClick={navigateToDeleteProductos}>
        Eliminar
      </button>
      <button className={Style.Btn}>Actualizar Inventario</button>
    </div>
  );
};
export default SettingsProductos;
