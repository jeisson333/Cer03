import validation from "./validation";
import { useEffect, useState } from "react";
import { getTypeProducts, postNewProduct } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CreateProduct.module.css";

export function CreateProduct({ idBranch }) {
  const [newProduct, setNewProduct] = useState({
    idBranch: idBranch,
  });

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
    console.log(newProduct);
    dispatch(postNewProduct(newProduct));
  };

  const allTypeProducts = useSelector((state) => state.allTypeProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypeProducts());
    setErrors(validation({ newProduct }));
  }, [newProduct]);

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
            <h2>Imagen</h2>
            <img
              className={styles.image}
              src={newProduct.image}
              alt="Aqui puedes ver tu imagen"
            />
            <label>
              <span>Imagen (URL) </span>
              <input onChange={handleChangeProduct} type="url" name="image" />
              {errors.image != "" && (
                <p className={styles.errors}>{errors.image}</p>
              )}
            </label>
          </div>
        </div>
        <div className={styles.buttonHolder}>
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
