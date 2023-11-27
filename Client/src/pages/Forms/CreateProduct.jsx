import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { getTypeProducts, postNewProduct } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CreateProduct.module.css";

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

    if (!newProduct.nombre_producto) {
      alert("Ingrese un nombre para el producto.");
      return;
    }

    if (!newProduct.tipo_producto) {
      alert("Seleccione un tipo de producto.");
      return;
    }

    if (!newProduct.peso || isNaN(newProduct.peso)) {
      alert("Ingrese un peso válido.");
      return;
    }

    if (!newProduct.valor_compra || isNaN(newProduct.valor_compra)) {
      alert("Ingrese un valor de compra válido.");
      return;
    }

    if (!newProduct.valor_venta || isNaN(newProduct.valor_venta)) {
      alert("Ingrese un valor de venta válido.");
      return;
    }

    if (!validator.isURL(newProduct.image)) {
      alert("Ingrese una URL de imagen válida.");
      return;
    }

    if (newProduct.nombre_producto.length > 25) {
      alert("El nombre del producto no puede exceder los 25 caracteres.");
      return;
    }

    if (newProduct.valor_venta <= newProduct.valor_compra) {
      alert("El valor de venta no puede ser menor o igual al valor de compra.");
      return;
    }

    if (!Number.isInteger(newProduct.peso) || newProduct.peso < 0) {
      alert("Ingrese un peso válido mayor o igual a cero.");
      return;
    }

    if (
      !Number.isInteger(newProduct.valor_compra) ||
      newProduct.valor_compra < 0
    ) {
      alert("Ingrese un valor de compra válido mayor o igual a cero.");
      return;
    }

    if (
      !Number.isInteger(newProduct.valor_venta) ||
      newProduct.valor_venta < 0
    ) {
      alert("Ingrese un valor de venta válido mayor o igual a cero.");
      return;
    }

    console.log(newProduct);
    dispatch(postNewProduct(newProduct));
    alert("producto cargado con exito");
  };

  const allTypeProducts = useSelector((state) => state.allTypeProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypeProducts());
  }, []);

  console.log(newProduct.image);
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.cargarProductos}>
        <h2>Cargar producto</h2>
        <div className={styles.divider}></div>
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
              <select
                className={styles.select}
                onChange={handleChangeProduct}
                name="tipo_producto"
              >
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
            <img
              className={styles.image}
              src={newProduct.image}
              alt="Aqui puedes ver tu imagen"
            />
            <label>
              <span>Imagen (URL) </span>
              <input onChange={handleChangeProduct} type="url" name="image" />
            </label>
          </div>
        </div>
        <div className={styles.buttonHolder}>
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
