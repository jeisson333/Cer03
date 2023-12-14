/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions";
import Style from "./SignIn.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { decodeToken } from "react-jwt";
import { toast } from "react-hot-toast";
const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import {faArro}

export default function SignIn() {
  const dispatch = useDispatch();
  const dataUser = cookies.get("auth");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loginConfirm, setLoginConfirm] = useState("");

  useEffect(() => {
    if (Object.keys(dataUser).length > 1) {
      navigate("/home");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginConfirm(await dispatch(signIn(user)));
  };

  const onSucess = (credentialResponse) => {
    const { email, sub } = decodeToken(credentialResponse?.credential);
    const user = {
      email: email,
      password: sub,
    };
    dispatch(signIn(user));
  };

  const onFailure = (res) => {
    console.log("TE HE MIRADO A LOS OJOSSSSSSSSSSSS ", res);
  };
  return (
    <div className={Style.container}>
      <form onSubmit={handleSubmit} className={Style.containerForm}>
        <div className={Style.divTittle}>
          <h1 className={Style.title}>Iniciar Sesion</h1>
        </div>
        <input
          type="text"
          value={user?.email}
          onChange={handleUser}
          className={Style.input}
          name="email"
          placeholder="Correo electrónico o nombre de usuario "
        />

        <input
          type="password"
          value={user?.password}
          onChange={handleUser}
          className={Style.input}
          name="password"
          placeholder="Contraseña"
        />
        <p className={Style.errorMessage}>
          {loginConfirm?.data?.error
            ? loginConfirm?.data?.error
            : loginConfirm?.data}
        </p>
        <button className={Style.inputSubmit}>iniciar sesión</button>
        <div
          style={{
            marginTop: "3vh",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <GoogleLogin
            onSuccess={onSucess}
            onError={onFailure}
            width={"360px"}
            text="signin_with"
            useOneTap={false}
          ></GoogleLogin>
        </div>
        <div className={Style.containerButton}>
          <NavLink to="/signUp">
            <button className={Style.SignUp}>Crear cuenta nueva</button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/">
          <a className={Style.goBack}><FontAwesomeIcon icon={faArrowLeft}/> Volver</a>
          </NavLink>
        </div>
      </form>
    </div>
  );
}
