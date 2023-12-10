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

  const navigateToSettingsProductos = () => {
    navigate("/settingsProductos");
  };
  const navigateToFormVendedor = () => {
    navigate("/newSeller");
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div>
        <button className={Style.Btn} onClick={navigateToFormVendedor}>
          Vendedores
        </button>
        <button className={Style.Btn} onClick={navigateToSettingsProductos}>
          Producto
        </button>
        <button className={Style.Btn}>Sucursales</button>
      </div>
    </div>
  );
};

export default Settings;
