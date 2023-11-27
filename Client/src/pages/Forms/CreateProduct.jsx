import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { getTypeProducts, postNewProduct } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

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

    console.log(newProduct);
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

  return (
    <form onSubmit={onSubmit}>
      <h1>Cargar producto</h1>
      <div>
        <label>
          <span>Nombre del Producto </span>
          <input
            onChange={handleChangeProduct}
            type="text"
            name="nombre_producto"
          />
        </label>
      </div>

      <div>
        <label>
          <span>Tipo de producto </span>
          <select onChange={handleChangeProduct} name="tipo_producto">
            {allTypeProducts?.map((tipo_producto, index) => (
              <option key={index} value={tipo_producto.id_catalogo}>
                {tipo_producto.nombre_catalogo}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          <span>peso: gr. </span>
          <input onChange={handleChangeProduct} type="number" name="peso" />
        </label>
      </div>

      <div>
        <label>
          <span>Imagen </span>
          <input onChange={handleChangeProduct} type="url" name="image" />
        </label>
      </div>

      <div>
        <label>
          <span>Valor compra: $ </span>
          <input
            onChange={handleChangeProduct}
            type="number"
            name="valor_compra"
          />
        </label>
      </div>

      <div>
        <label>
          <span>Valor venta: $ </span>
          <input
            onChange={handleChangeProduct}
            type="number"
            name="valor_venta"
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
