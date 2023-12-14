/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions";
import Style from "./SigInDeveloper.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import { gapi } from "gapi-script";
import { toast } from "react-hot-toast";
const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SignInDeveloper() {
  const dispatch = useDispatch();
  const dataUser = cookies.get("auth");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Object.keys(dataUser).length >= 1) {
      navigate("/dashboardDeveloper");
      toast.success("Se inicio sesion correctamente");
    }
    function start() {
      gapi.auth2.init({
        client_id: client_id,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, [dataUser]);

  const handleUser = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signIn(user, "developer"));
  };

  return (
    <div className={Style.container}>
      <form onSubmit={handleSubmit} className={Style.containerForm}>
        <div className={Style.divTittle}>
          <h1 className={Style.title}>Iniciar Sesion</h1>
        </div>

        <label className={Style.label}>Usuario</label>
        <input
          type="text"
          value={user?.email}
          onChange={handleUser}
          className={Style.input}
          name="email"
        />
        <label className={Style.label}>Contraseña</label>
        <input
          type="password"
          value={user?.password}
          onChange={handleUser}
          className={Style.input}
          name="password"
        />
        <input type="submit" value="Ingresar" className={Style.inputSubmit} />
        <div
          style={{
            marginTop: "3vh",
            justifyContent: "center",
            display: "flex",
          }}
        ></div>
          <div className={Style.goBackDiv}>
          <NavLink to="/">
          <a className={Style.goBack}><FontAwesomeIcon icon={faArrowLeft}/> Volver</a>
          </NavLink>
        </div>
      </form>
    </div>
  );
}
