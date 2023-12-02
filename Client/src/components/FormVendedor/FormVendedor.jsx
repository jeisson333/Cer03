import React, { useState } from "react";
import Style from "./FormVendedor.module.css";

const FormVendedor = () => {
  const [form, setForm] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    tipoDocumento: "",
    numeroDocumento: "",
    sucursal: "",
    email: "",
    usuario: "",
    contraseña: "",
  });

  const [errors, setErrors] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    tipoDocumento: "",
    numeroDocumento: "",
    sucursal: "",
    email: "",
    usuario: "",
    contraseña: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    validarCampo(name, value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!hayErrores()) {
      console.log("Datos del formulario:", form);
    } else {
      console.log("Hay errores en el formulario. No se puede enviar.");
    }
  };

  const hayErrores = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  const validarCampo = (name, value) => {
    let nuevosErrores = { ...errors };

    switch (name) {
      case "primerNombre":
      case "segundoNombre":
      case "primerApellido":
      case "segundoApellido":
        if (/^[A-Za-záéíóúüñÑ\s]+$/.test(value)) {
          nuevosErrores[name] = "";
        } else {
          nuevosErrores[name] = `El ${name} no puede contener números`;
        }
        break;
      case "numeroDocumento":
        if (/^[1-9]\d*$/.test(value)) {
          nuevosErrores[name] = "";
        } else {
          nuevosErrores[name] = "Ingrese un número válido y positivo";
        }
        break;
      case "sucursal":
        if (/^[A-Za-z0-9\s]+$/.test(value)) {
          nuevosErrores[name] = "";
        } else {
          nuevosErrores[name] = "Ingrese una sucursal válida";
        }
        break;
      case "email":
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          nuevosErrores[name] = "";
        } else {
          nuevosErrores[name] = "Ingrese un correo electrónico válido";
        }
        break;
      case "usuario":
        if (/^[A-Za-z0-9]+$/.test(value)) {
          nuevosErrores[name] = "";
        } else {
          nuevosErrores[name] =
            "Ingrese un nombre de usuario válido (solo letras y números)";
        }
        break;
      case "contraseña":
        if (value.length >= 6) {
          nuevosErrores[name] = "";
        } else {
          nuevosErrores[name] =
            "La contraseña debe tener al menos 6 caracteres";
        }
        break;
      default:
        break;
    }
    setErrors(nuevosErrores);
  };

  return (
    <form className={Style.formContainer} onSubmit={handleFormSubmit}>
      <div className={Style.container}>
        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Primer Nombre: </label>
          <input
            type="text"
            className={Style.formInput}
            name="primerNombre"
            value={form.primerNombre}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.primerNombre}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Segundo Nombre: </label>
          <input
            type="text"
            className={Style.formInput}
            name="segundoNombre"
            value={form.segundoNombre}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.segundoNombre}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Primer Apellido: </label>
          <input
            type="text"
            className={Style.formInput}
            name="primerApellido"
            value={form.primerApellido}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.primerApellido}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Segundo Apellido: </label>
          <input
            type="text"
            className={Style.formInput}
            name="segundoApellido"
            value={form.segundoApellido}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.segundoApellido}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Número de Documento: </label>
          <input
            type="text"
            className={Style.formInput}
            name="numeroDocumento"
            value={form.numeroDocumento}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.numeroDocumento}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Sucursal: </label>
          <input
            type="text"
            className={Style.formInput}
            name="sucursal"
            value={form.sucursal}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.sucursal}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Email: </label>
          <input
            type="text"
            className={Style.formInput}
            name="email"
            value={form.email}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.email}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Usuario: </label>
          <input
            type="text"
            className={Style.formInput}
            name="usuario"
            value={form.usuario}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.usuario}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Contraseña: </label>
          <input
            type="password"
            className={Style.formInput}
            name="contraseña"
            value={form.contraseña}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.contraseña}</span>
        </div>

        <button
          type="submit"
          className={`${Style.formButton} ${Style.formSubmit}`}
          disabled={hayErrores()}
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormVendedor;
