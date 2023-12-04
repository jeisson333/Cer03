/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/actions";
import Style from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { decodeToken } from "react-jwt";
import { toast, Toaster } from "react-hot-toast";
const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function SignIn() {
  const dispatch = useDispatch();
  const dataUser = cookies.get("auth");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getUser(user));
  };

  const onSucess = (credentialResponse) => {
    const { email, sub } = decodeToken(credentialResponse?.credential);
    const user = {
      email: email,
      password: sub,
    };
    dispatch(getUser(user));
  };

  const onFailure = (res) => {
    console.log("TE HE MIRADO A LOS OJOSSSSSSSSSSSS ", res);
  };
  return (
    <div className={Style.container}>
      <form onSubmit={handleSubmit} className={Style.containerForm}>
        <h1 className={Style.title}>Iniciar Sesion</h1>
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
        >
          <GoogleLogin
            onSuccess={onSucess}
            onError={onFailure}
            width={"500px"}
          ></GoogleLogin>
        </div>
      </form>
    </div>
  );
}
