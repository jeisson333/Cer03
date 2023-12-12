import { useState, useEffect } from "react";
import Style from "./FormVendedor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments, getSucursales, postSaleMen } from "../../redux/actions";
import validations from "./validations";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const FormVendedor = () => {
  const dispatch = useDispatch();
  const { documents, sucursales } = useSelector((state) => state);
  const { idBranch } = cookies.get("auth");

  const [form, setForm] = useState({});

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getDocuments());
    dispatch(getSucursales(idBranch));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    // validarCampo(name, value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!hayErrores()) {
      dispatch(postSaleMen(form));
      console.log("Datos del formulario:", form);
    } else {
      console.log("Hay errores en el formulario. No se puede enviar.");
    }
  };

  const contentSomething = () => {
    if (
      !form.primer_nombre ||
      !form.segundo_nombre ||
      !form.primer_apellido ||
      !form.segundo_apellido ||
      !form.tipo_documento ||
      !form.numero_documento ||
      !form.vendedor_sucursal ||
      !form.usuario_vendedor ||
      !form.contraseña_vendedor
    )
      return true;

    return false;
  };

  const notSubmit = () => {
    if (
      !form.primer_nombre ||
      !form.segundo_nombre ||
      !form.primer_apellido ||
      !form.segundo_apellido ||
      !form.tipo_documento ||
      !form.numero_documento ||
      !form.vendedor_sucursal ||
      !form.usuario_vendedor ||
      !form.contraseña_vendedor ||
      errors.primer_nombre ||
      errors.segundo_nombre ||
      errors.primer_apellido ||
      errors.segundo_apellido ||
      errors.tipo_documento ||
      errors.numero_documento ||
      errors.vendedor_sucursal ||
      errors.usuario_vendedor ||
      errors.contraseña_vendedor
    )
      return true;
  };

  const deleteFields = () => {
    setForm({
      ...form,
      contraseña_vendedor: "",
      tipo_documento: "",
      numero_documento: "",
      primer_apellido: "",
      primer_nombre: "",
      segundo_apellido: "",
      segundo_nombre: "",
      usuario_vendedor: "",
      vendedor_sucursal: "",
    });
  };

  useEffect(() => {
    setErrors(validations(form));
  }, [form]);

  return (
    <form className={Style.formContainer} onSubmit={handleFormSubmit}>
      <h2>Registrar Vendedor</h2>
      <div className={Style.container}>
        <div className={Style.formSame}>
          <div className={Style.formGroup}>
            <label className={Style.formLabel}>Primer Nombre: </label>
            <input
              type="text"
              className={Style.formInput}
              name="primer_nombre"
              value={form.primer_nombre}
              onChange={handleInputChange}
            />
            {errors.primer_nombre && (
              <p className={Style.errors}>{errors.primer_nombre}</p>
            )}
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
            {/* <span className={Style.formError}>{errors.segundo_nombre}</span> */}
            {errors.segundo_nombre && (
              <p className={Style.errors}>{errors.segundo_nombre}</p>
            )}
          </div>
        </div>

        <div className={Style.formSame}>
          <div className={Style.formGroup}>
            <label className={Style.formLabel}>Primer Apellido: </label>
            <input
              type="text"
              className={Style.formInput}
              name="primer_apellido"
              value={form.primer_apellido}
              onChange={handleInputChange}
            />
            {/* <span className={Style.formError}>{errors.primer_apellido}</span> */}
            {errors.primer_apellido && (
              <p className={Style.errors}>{errors.primer_apellido}</p>
            )}
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
            {/* <span className={Style.formError}>{errors.segundo_apellido}</span> */}
            {errors.segundo_apellido && (
              <p className={Style.errors}>{errors.segundo_apellido}</p>
            )}
          </div>
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
            {documents?.map((document, index) => (
              <option key={index} value={document.id_catalogo}>
                {document.nombre_catalogo}
              </option>
            ))}
          </select>
          {/* <span className={Style.formError}>{errors.tipo_documento}</span> */}
          {errors.tipo_documento && (
            <p className={Style.errors}>{errors.tipo_documento}</p>
          )}
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
          {/* <span className={Style.formError}>{errors.numero_documento}</span> */}
          {errors.numero_documento && (
            <p className={Style.errors}>{errors.numero_documento}</p>
          )}
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
            {sucursales?.map((sucursal, index) => (
              <option key={index} value={sucursal.id_sucursal}>
                {sucursal.nombre_sucursal}
              </option>
            ))}
          </select>
          {/* <span className={Style.formError}>{errors.vendedor_sucursal}</span> */}
          {errors.vendedor_sucursal && (
            <p className={Style.errors}>{errors.vendedor_sucursal}</p>
          )}
        </div>

        <div className={Style.formSame}>
          <div className={Style.formGroup}>
            <label className={Style.formLabel}>Usuario: </label>
            <input
              type="text"
              className={Style.formInput}
              name="usuario_vendedor"
              value={form.usuario_vendedor}
              onChange={handleInputChange}
            />
            {errors.usuario_vendedor && (
              <p className={Style.errors}>{errors.usuario_vendedor}</p>
            )}
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
            {errors.contraseña_vendedor && (
              <p className={Style.errors}>{errors.contraseña_vendedor}</p>
            )}
          </div>
        </div>

        <div className={Style.buttonHolder}>
          <button
            type="submit"
            className={`${Style.formButton} ${Style.formSubmit}`}
            disabled={notSubmit()}
          >
            Guardar
          </button>
          <button
            className={Style.deleteButton}
            onClick={deleteFields}
            disabled={contentSomething()}
          >
            Borrar todo
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormVendedor;
