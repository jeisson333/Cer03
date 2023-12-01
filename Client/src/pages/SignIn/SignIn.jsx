/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions";
import Style from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { decodeToken } from "react-jwt";
const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function SignIn() {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Object.keys(dataUser).length > 1) {
      navigate("/home");
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

    // Buscar el usuario en el array por el nombre de usuario
    // const user = users.find((user) => user.userName === username);

    // if (user) {
    //   // Verificar si la contraseña coincide
    //   if (user.password === password) {
    //
    //   } else {
    //     alert("Contraseña incorrecta");
    //   }
    // } else {
    //   alert("Usuario no encontrado");
    // }
  };

  const onSucess = (credentialResponse) => {
    const { email, sub } = decodeToken(credentialResponse?.credential);
    console.log(email, sub);
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
      </form>
      <GoogleLogin onSuccess={onSucess} onError={onFailure}></GoogleLogin>;
    </div>
  );
}
