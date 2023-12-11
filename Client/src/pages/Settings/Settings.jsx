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
    navigate("/sign-up/sucursales");
  };

  useEffect(() => {}, []);

  return (
    <div className={Style.contenido}>
      <div>
        <h2>Vendedores</h2>
        <button className={Style.Btn} onClick={navigateToFormVendedor}>
          Vendedores
        </button>
      </div>
      <div>
        <h2>Productos</h2>
        <button className={Style.Btn} onClick={navigateToDeleteProductos}>
          Eliminar
        </button>
        <button className={Style.Btn} onClick={navigateToPapelera}>
          Restaurar
        </button>
        <button className={Style.Btn}>Actualizar Inventario</button>
      </div>
      <div>
        <h2>Sucursales</h2>
        <button className={Style.Btn} onClick={navigateToFormSucursal}>
          Sucursales
        </button>
      </div>
    </div>
  );
};

export default Settings;
