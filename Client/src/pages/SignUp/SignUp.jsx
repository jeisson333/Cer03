/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/actions";
import Style from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { decodeToken } from "react-jwt";
import Modal from "react-modal";
const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
import Cookies from "universal-cookie";
const cookies = new Cookies();

Modal.setAppElement("#root");
export default function SignUp() {
  const dispatch = useDispatch();
  const dataUser = cookies.get("auth");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nombre_empresa: "",
    email: "",
    password: "",
  });
  const [googleUser, setGoogleUser] = useState(false);
  const [errors, setErrors] = useState({
    nombre_empresa: "Formulario incompleto!",
    email: "Formulario incompleto!",
    password: "Formulario incompleto!",
  });
  const validate = (user, name) => {
    const validationRegex = {
      nombre_empresa: /^[a-zA-Z0-9\s-]{3,200}$/,
      email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };

    if (name in validationRegex) {
      const regex = validationRegex[name];
      if (!regex.test(user[name])) {
        setErrors({ ...errors, [name]: `Campo ${name} inválido` });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  useEffect(() => {
    if (Object.keys(dataUser).length > 1) {
      navigate("/sign-up/sucursales");
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
    validate(
      {
        ...user,
        [event.target.name]: event.target.value,
      },
      event.target.name
    );
  };
  const disableFunction = () => {
    let disabledAux = 0;
    for (let error in errors) {
      if (errors.hasOwnProperty(error)) {
        if (errors[error] !== "") {
          disabledAux++;
        }
      }
    }
    if (disabledAux > 0) {
      return true;
    } else return false;
  };

  const handleErrorGoogle = () => {
    setUser({
      nombre_empresa: "",
      email: "",
      password: "",
    });
    setGoogleUser(!googleUser);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUp(user));
  };

  const onSucess = (credentialResponse) => {
    const { email, sub } = decodeToken(credentialResponse?.credential);
    setUser({
      email: email,
      password: sub,
    });
    setGoogleUser(true);
  };

  const onFailure = (res) => {
    console.log("TE HE MIRADO A LOS OJOSSSSSSSSSSSS ", res);
  };
  const miSet = new Set();
  for (let error in errors) {
    if (errors.hasOwnProperty(error)) {
      miSet.add(errors[error]);
    }
  }

  return (
    <div className={Style.container}>
      <form onSubmit={handleSubmit} className={Style.containerForm}>
        <div className={Style.divTittle}>
          <h1 className={Style.title}>Registrar negocio</h1>
        </div>
        <input
          type="text"
          value={user?.nombre_empresa}
          onChange={handleUser}
          className={Style.input}
          name="nombre_empresa"
          placeholder="Nombre negocio"
        />

        <input
          type="text"
          value={user?.email}
          onChange={handleUser}
          className={Style.input}
          name="email"
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          value={user?.password}
          onChange={handleUser}
          className={Style.input}
          name="password"
          placeholder="Contraseña nueva"
        />
        <p className={Style.errorMessage}>{Array.from(miSet).join(", ")}</p>
        <button disabled={disableFunction()} className={Style.inputSubmit}>
          Registar
        </button>
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
            text="signup_with"
            useOneTap={false}
            type="icon"
          ></GoogleLogin>
        </div>
      </form>
      <Modal isOpen={googleUser} className={Style.modal}>
        <form onSubmit={handleSubmit} className={Style.containerForm}>
          <h1>Inserta el nombre de tu empresa/local</h1>
          <input
            type="text"
            value={user?.nombre_empresa}
            onChange={handleUser}
            className={Style.input}
            name="nombre_empresa"
          />
          <button type="submit" className={Style.inputSubmit}>
            Registrar
          </button>
          <button
            type="button"
            className={Style.inputSubmit}
            onClick={handleErrorGoogle}
          >
            Cancelar
          </button>
        </form>
      </Modal>
    </div>
  );
}
