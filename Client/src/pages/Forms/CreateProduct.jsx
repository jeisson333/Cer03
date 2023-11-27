import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { getTypeProducts, postNewProduct } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

import styles from "./CreateProduct.module.css"

function validate(input) {
  let errors = {};

  const regexNumber = /^[1-9]\d*$/;

  if (
    !input.nombre_producto ||
    !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.nombre_producto)
  ) {
    errors.nombre_producto =
      "Ingresa la Primera letra Mayuscula, Unicamente Letras y Numeros, y al menos 3 caracteres ";
  } else if (input.nombre_producto.length > 20) {
    errors.nombre_producto = "El nombre tiene que tener menos de 20 caracteres";
  } else if (input.nombre_producto.length < 3) {
    errors.nombre_producto = "El nombre tiene que tener al menos 3 caracteres";
  }

  if (!input.peso || !regexNumber.test(input.peso)) {
    errors.peso = "El peso tiene que ser entero positivo no se permite coma";
  } else if (parseInt(input.peso) > 10001) {
    errors.peso = "El peso no puede exeder los 10000gr";
  }

  if (!input.valor_compra || !regexNumber.test(input.valor_compra)) {
    errors.valor_compra =
      "El valor compra tiene que ser entero positivo no se permite coma";
  } else if (parseInt(input.valor_compra) > 500001) {
    errors.valor_compra = "El valor compra no puede exeder los $500000";
  }

  if (!input.valor_compra || !regexNumber.test(input.valor_compra)) {
    errors.valor_compra =
      "El valor de venta tiene que ser numerico no se permite coma";
  } else if (parseInt(input.valor_compra) <= parseInt(input.valor_compra)) {
    errors.valor_compra = "compra no puede ser Mayor o Igual que venta";
  } else if (parseInt(input.valor_compra) > 1000001) {
    errors.valor_compra = "El valor de venta no puede exeder el $1000000";
  }

  if (
    input.image &&
    !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.image)
  ) {
    errors.image = "Debe ser una URL";
  }
  if ((input.temperament.length = 0)) {
    errors.temperament = "Se requiere seleccionar el tipo de producto";
  }
  return errors;
}

export function CreateProduct({ idBranch }) {
  const [newProduct, setNewProduct] = useState({
    idBranch: idBranch,
  });

  const handleChangeProduct = (event) => {
    switch (event.target.name) {
      case "peso":
        setNewProduct({
          ...newProduct,
          [event.target.name]: parseInt(event.target.value),
        });
        break;
      case "valor_venta":
        setNewProduct({
          ...newProduct,
          [event.target.name]: parseFloat(event.target.value),
        });
        break;
      case "valor_compra":
        setNewProduct({
          ...newProduct,
          [event.target.name]: parseFloat(event.target.value),
        });
        break;

      default:
        setNewProduct({
          ...newProduct,
          [event.target.name]: event.target.value,
        });
        break;
    }

    // console.log(newProduct);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(newProduct);
    dispatch(postNewProduct(newProduct));
  };

  const allTypeProducts = useSelector((state) => state.allTypeProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypeProducts());
  }, []);

  console.log(newProduct.image)
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.cargarProductos}>
      <h2>Cargar producto</h2>
      <div className={styles.divider}>
      </div>
      </div>
      <div className={styles.formHolder}>
      <div className={styles.createContainer}>
      <div className={styles.indHolder}>
        <label>
          <span>Nombre del Producto </span>
          <input
            onChange={handleChangeProduct}
            type="text"
            name="nombre_producto"
          />
        </label>
      </div>

      <div className={styles.indHolder}>
        <label>
          <span>Tipo de producto </span>
          <select className={styles.select} onChange={handleChangeProduct} name="tipo_producto">
            {allTypeProducts?.map((tipo_producto, index) => (
              <option key={index} value={tipo_producto.id_catalogo}>
                {tipo_producto.nombre_catalogo}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.indHolder}>
        <label>
          <span>peso: gr. </span>
          <input onChange={handleChangeProduct} type="number" name="peso" />
        </label>
      </div>

      <div className={styles.indHolder}>
        <label>
          <span>Valor compra: $ </span>
          <input
            onChange={handleChangeProduct}
            type="number"
            name="valor_compra"
          />
        </label>
      </div>

      <div className={styles.indHolder}>
        <label>
          <span>Valor venta: $ </span>
          <input
            onChange={handleChangeProduct}
            type="number"
            name="valor_venta"
          />
        </label>
      </div>

      {/* <button type="submit">Submit</button> */}
      </div>
      <div className={styles.createContainer}>

      <div className={styles.indHolder}>
        <h2>Imagen</h2>
           <img className={styles.image} src={newProduct.image} alt="Aqui puedes ver tu imagen" />
        <label>
          <span>Imagen (URL) </span>
          <input  onChange={handleChangeProduct} type="url" name="image" />
        </label>
      </div>

      </div>
      <div className={styles.buttonHolder}>
      <button className={styles.submit} type="submit">Submit</button>
      </div>
      
      </div>
    </form>
  );
}
