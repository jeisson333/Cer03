import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSucursales } from "../../redux/actions";
import { toast } from "react-hot-toast";
const baseUrl = import.meta.env.VITE_BASE_URL;
import Cookies from "universal-cookie";
import { IoMdAdd } from "react-icons/io";
const cookies = new Cookies();

import Style from "./FormSucursales.module.css";

const FormSucursales = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUser = cookies.get("auth");
  const [input, setInput] = useState("");
  const [sucursales, setSucursales] = useState([]);
  const dataSucursales = useSelector((state) => state.sucursales);
  const handlerInput = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    dispatch(getSucursales(dataUser.idBranch));
  }, []);

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
        if (dataSucursales.length + sucursales.length >= 1) return false;
        return true;

      case "basic":
        if (dataSucursales.length + sucursales.length >= 3) return false;
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
        <h2 className={Style.title}>Registra tus sucursales</h2>
        <label className={Style.labelSucursal}>Nombre de la sucursal: </label>
        <input
          type="text"
          value={input}
          onChange={handlerInput}
          className={Style.input}
          name="sucursal"
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
        <input type="submit" value="Registar" className={Style.inputSubmit} />
      </form>
    </div>
  );
};

export default FormSucursales;
