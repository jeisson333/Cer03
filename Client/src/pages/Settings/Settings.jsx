import { useEffect, useState } from "react";
import axios from "axios";
import Style from "./Settings.module.css";
import FormVendedor from "../../components/FormVendedor/FormVendedor";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const url = import.meta.env.VITE_BASE_URL;
  const { idBranch } = cookies.get("auth");
  const navigate = useNavigate();

  const navigateToPapelera = () => {
    navigate("/papelera");
  };
  const navigateToDeleteProductos = () => {
    navigate("/deleteProduct");
  };
  const navigateToFormVendedor = () => {
    navigate("/newSeller");
  };

  const navigateToFormSucursal = () => {
    navigate("/newSucursal");
  };

  // useEffect(() => {}, []);

  return (
    <div className={Style.contenido}>
      <div className={Style.divider}>
        <div className={Style.usableHolder}>
          <h2>Vendedores</h2>
          <button className={Style.Btn} onClick={navigateToFormVendedor}>
            Vendedores
          </button>
        </div>
        <img
          src="https://static.thenounproject.com/png/883982-200.png"
          alt=""
        />
      </div>
      <div className={Style.divider}>
        <div className={Style.usableHolder}>
          <h2>Productos</h2>
          <button className={Style.Btn} onClick={navigateToDeleteProductos}>
            Eliminar
          </button>
          <button className={Style.Btn} onClick={navigateToPapelera}>
            Restaurar
          </button>
          <button className={Style.Btn}>Actualizar Inventario</button>
        </div>
        <img
          src="https://img.freepik.com/vector-gratis/conjunto-iconos-planos-decorativos-supermercado_1284-9106.jpg?q=10&h=200"
          alt=""
        />
      </div>
      <div className={Style.divider}>
        <div className={Style.usableHolder}>
          <h2>Sucursales</h2>
          <button className={Style.Btn} onClick={navigateToFormSucursal}>
            Sucursales
          </button>
        </div>
        <img
          src="https://i.blogs.es/b68133/4urb5gipmfhw3ku55p7hkkrpue/200_200.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Settings;
