import { useEffect, useState } from "react";
import axios from "axios";
import Style from "./Settings.module.css";
import FormVendedor from "../../components/FormVendedor/FormVendedor";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Settings = () => {
  const url = import.meta.env.VITE_BASE_URL;
  const { idBranch } = cookies.get("auth");

  useEffect(() => {}, []);

  return (
    <div>
      <div>
        <button className={Style.Btn}>Vendedores</button>
        <button>Producto</button>
      </div>
      <div>
        <FormVendedor />
      </div>
    </div>
  );

  // return (
  //   <div>
  //     {sucursales.map((sucursal, index) => (
  //       <h3 key={index}>{sucursal?.nombre_sucursal}</h3>
  //     ))}
  //   </div>
  // );
};

export default Settings;
