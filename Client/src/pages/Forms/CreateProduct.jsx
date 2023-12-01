/* eslint-disable react/prop-types */
import validation from "./validation";
import { useEffect, useState } from "react";
import { getTypeProducts, postNewProduct } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./CreateProduct.module.css";

export function CreateProduct() {
  const { idBranch } = useSelector((state) => state.auth);
  const [newProduct, setNewProduct] = useState({
    idBranch: idBranch,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

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
    dispatch(postNewProduct(newProduct));
    alert("producto cargado con exito!");
    navigate("/products");
  };

  const allTypeProducts = useSelector((state) => state.allTypeProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypeProducts());
    setErrors(validation({ newProduct }));
  }, [newProduct]);

  const resetForm = () => {
    setNewProduct({
      idBranch: newProduct.idBranch,
      image: "",
      nombre_producto: "",
      peso: "",
      tipo_producto: "",
      valor_compra: "",
      valor_venta: "",
    });
  };
  // console.log(newProduct);
  // console.log(errors)
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.cargarProductos}>
        <h2>Cargar producto</h2>
        <div className={styles.divider}></div>
      </div>
      <h2 className={styles.title}>Información del producto</h2>
      <div className={styles.formHolder}>
        <div className={styles.createContainer}>
          <div className={styles.indHolder}>
            <label>
              <span>Nombre del Producto </span>
              <input
                onChange={handleChangeProduct}
                type="text"
                name="nombre_producto"
                value={newProduct.nombre_producto}
              />
              {errors.nombre_producto != "" && (
                <p className={styles.errors}>{errors.nombre_producto}</p>
              )}
            </label>
          </div>

          <div className={styles.indHolder}>
            <label>
              <span>Tipo de producto </span>
              <select
                className={styles.select}
                onChange={handleChangeProduct}
                name="tipo_producto"
                value={newProduct.tipo_producto}
              >
                <option value=""></option>
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
              <span>Peso: gr. </span>
              <input
                onChange={handleChangeProduct}
                type="number"
                name="peso"
                value={newProduct.peso}
              />
              {errors.peso != "" && (
                <p className={styles.errors}>{errors.peso}</p>
              )}
            </label>
          </div>

          <div className={styles.indHolder}>
            <label>
              <span>Valor compra: $ </span>
              <input
                onChange={handleChangeProduct}
                type="number"
                name="valor_compra"
                value={newProduct.valor_compra}
              />
              {errors.valor_compra != "" && (
                <p className={styles.errors}>{errors.valor_compra}</p>
              )}
            </label>
          </div>

          <div className={styles.indHolder}>
            <label>
              <span>Valor venta: $ </span>
              <input
                onChange={handleChangeProduct}
                type="number"
                name="valor_venta"
                value={newProduct.valor_venta}
              />
              {errors.valor_venta != "" && (
                <p className={styles.errors}>{errors.valor_venta}</p>
              )}
            </label>
          </div>

          {/* <button type="submit">Submit</button> */}
        </div>
        <div className={styles.createContainer}>
          <div className={styles.indHolder}>
            <span>Imagen</span>
            <img
              className={styles.image}
              src={newProduct.image}
              alt="Aqui puedes ver tu imagen"
            />
            <label>
              <span>Imagen (URL) </span>
              <input
                onChange={handleChangeProduct}
                type="url"
                name="image"
                value={newProduct.image}
              />
              {errors.image != "" && (
                <p className={styles.errors}>{errors.image}</p>
              )}
            </label>
          </div>
        </div>
        <div className={styles.buttonHolder}>
          <button type="button" className={styles.delete} onClick={resetForm}>
            Borrar
          </button>
          <button
            className={styles.submit}
            type="submit"
            disabled={
              !newProduct.nombre_producto ||
              !newProduct.image ||
              !newProduct.valor_compra ||
              !newProduct.valor_venta ||
              !newProduct.peso ||
              !newProduct.tipo_producto ||
              errors.nombre_producto ||
              errors.image ||
              errors.valor_compra ||
              errors.valor_venta ||
              errors.peso ||
              errors.tipo_producto
            }
          >
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
}
