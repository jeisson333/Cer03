import React, { useEffect, useState } from "react";
import style from "./Detail.module.css";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const EditProduct = ({ modalEditProduc, sucursales }) => {
  const url = import.meta.env.VITE_BASE_URL;
  const { idBranch } = cookies.get("auth");
  const dataParams = {
    stock: 0,
    sucursal: "",
    productoid: "",
  };
  const [updateStock, setUpdateStock] = useState(dataParams);

  const handleChange = (event) => {
    if (event.target.name === "sucursales") {
      const ids = sucursales.find(
        (i) => i.SUCURSAL.nombre_sucursal === event.target.value
      );
      setUpdateStock({
        ...updateStock,
        productoid: ids.PRODUCTO.id_producto,
        sucursal: ids.SUCURSAL.id_sucursal,
      });
    } else {
      setUpdateStock({
        ...updateStock,
        [event.target.name]: event.target.value,
      });
    }
  };
  console.log(updateStock);
  const handleSubmit = async (event) => {
    try {
      const { data } = await axios.put(
        `${url}/products/${idBranch}?id_sucursal=${updateStock.sucursal}&id_producto=${updateStock.productoid}&stock=${updateStock.stock}`,
        {
          id: idBranch,
        }
      );
      alert("stock actualizado con exito: " + data[0].stock);
    } catch (error) {
      throw Error(error.message);
    }
  };
  return (
    <div className={style.divMain}>
      <div>
        <h2 className={style.tittle}>
          {sucursales[0]?.PRODUCTO?.nombre_producto}
        </h2>
        <button onClick={modalEditProduc} className={style.buttons}>
          X
        </button>
      </div>
      <div>
        <h2 className={style.tittle}>Inventario</h2>
        <p className={style.info}>Sucursal</p>
        <select name="sucursales" onChange={handleChange}>
          {sucursales.map((sl, key) => {
            return (
              <option key={key} value={sl.SUCURSAL.nombre_sucursal}>
                {sl.SUCURSAL.nombre_sucursal}
              </option>
            );
          })}
        </select>
        <p>Stock</p>
        <input type="text" name="stock" onChange={handleChange} />
      </div>
      <div>
        <button onClick={handleSubmit}>Guardar</button>
      </div>
    </div>
  );
};

export default EditProduct;
