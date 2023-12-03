import React, { useState } from "react";
import Style from "./FormVendedor.module.css";

const FormVendedor = () => {
  const [form, setForm] = useState({
    usuario_vendedor: "",
    contraseña_vendedor: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    tipo_documento: "",
    numero_documento: "",
    vendedor_sucursal: "",
  });

  const [errors, setErrors] = useState({
    usuario_vendedor: "",
    contraseña_vendedor: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    tipo_documento: "",
    numero_documento: "",
    vendedor_sucursal: "",
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
            name="primer_nombre"
            value={form.primer_nombre}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.primer_nombre}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Segundo Nombre: </label>
          <input
            type="text"
            className={Style.formInput}
            name="segundo_nombre"
            value={form.segundo_nombre}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.segundo_nombre}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Primer Apellido: </label>
          <input
            type="text"
            className={Style.formInput}
            name="primer_apellido"
            value={form.primer_apellido}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.primer_apellido}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Segundo Apellido: </label>
          <input
            type="text"
            className={Style.formInput}
            name="segundo_apellido"
            value={form.segundo_apellido}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.segundo_apellido}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Tipo de Documento: </label>
          <select
            className={Style.formInput}
            name="tipo_documento"
            value={form.tipo_documento}
            onChange={handleInputChange}
          >
            <option></option>
          </select>
          <span className={Style.formError}>{errors.tipo_documento}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Número de Documento: </label>
          <input
            type="number"
            className={Style.formInput}
            name="numero_documento"
            value={form.numero_documento}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.numero_documento}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Sucursal: </label>
          <select
            className={Style.formInput}
            name="vendedor_sucursal"
            value={form.vendedor_sucursal}
            onChange={handleInputChange}
          >
            <option></option>
          </select>
          <span className={Style.formError}>{errors.vendedor_sucursal}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Usuario: </label>
          <input
            type="text"
            className={Style.formInput}
            name="usuario_vendedor"
            value={form.usuario_vendedor}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.usuario_vendedor}</span>
        </div>

        <div className={Style.formGroup}>
          <label className={Style.formLabel}>Contraseña: </label>
          <input
            type="password"
            className={Style.formInput}
            name="contraseña_vendedor"
            value={form.contraseña_vendedor}
            onChange={handleInputChange}
          />
          <span className={Style.formError}>{errors.contraseña_vendedor}</span>
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
