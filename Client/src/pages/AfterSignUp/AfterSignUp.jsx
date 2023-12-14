import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSucursales } from "../../redux/actions";
import { changeSidebar } from "../../redux/actions";
import axios from "axios";
import { toast } from "react-hot-toast";
const baseUrl = import.meta.env.VITE_BASE_URL;
import Cookies from "universal-cookie";
import { IoMdAdd } from "react-icons/io";
const cookies = new Cookies();

import Style from "./AfterSignUp.module.css";

const AfterSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataSucursales = useSelector((state) => state.sucursales);
  const dataUser = cookies.get("auth");
  const [input, setInput] = useState("");
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    dispatch(changeSidebar(false));
    dispatch(getSucursales(dataUser.idBranch));
  }, []);

  const handlerInput = (event) => {
    setInput(event.target.value);
  };

  const addSucursal = (event) => {
    event.preventDefault();
    const flag = handleSubscription();
    if (flag) {
      if (
        !sucursales?.find(
          (sucursal) => sucursal.toLowerCase() === input.toLowerCase()
        ) &&
        input
      ) {
        setSucursales([...sucursales, input]);
        setInput("");
      }
    } else {
      toast.error("Haz alcanzado el limite de sucursales");
    }
    //mostrar msj de error
  };

  const deleteSucursal = (event) => {
    event.preventDefault();
    setSucursales(
      sucursales.filter((sucursal) => sucursal !== event.target.name)
    );
  };

  const handleSubscription = () => {
    switch (dataUser.subscription) {
      case "free":
        if (dataSucursales.length + sucursales.length > 3) return false;
        return true;

      case "basic":
        if (dataSucursales.length + sucursales.length > 6) return false;
        return true;
      case "premium":
        return true;
    }
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (sucursales.length) {
      const url = `${baseUrl}/sucursales/post-sucursales`;
      axios.post(url, {
        idBranch: dataUser.idBranch,
        nombre_sucursales: sucursales,
      });
      navigate("/home");
    }
  };

  return (
    <div className={Style.container}>
      <form onSubmit={handlerSubmit} className={Style.containerForm}>
        <h2 className={Style.title}>Negocio creado con exito!</h2>
        <label className={Style.labelSucursal}>Registra tus sucursales: </label>
        <input
          type="text"
          value={input}
          onChange={handlerInput}
          className={Style.input}
          name="sucursal"
          placeholder="Nombre de la sucursal"
        />
        <button onClick={addSucursal} className={Style.buttonAdd}>
          <IoMdAdd />
        </button>

        <div className={Style.labels}>
          {sucursales?.map((sucursal, i) => (
            <div key={i} className={Style.selected}>
              <p key={i}>{sucursal}</p>
              <button key={i} onClick={deleteSucursal} name={sucursal}>
                x
              </button>
            </div>
          ))}
        </div>
        <button className={Style.inputSubmit}>Registar</button>
      </form>
    </div>
  );
};

export default AfterSignUp;
