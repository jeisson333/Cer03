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
  const [errors, setErrors] = useState({
    stock: "incompleto!",
    sucursales: "Confirme la sucursal",
  });
  const validate = (updateStock, name) => {
    const validationRegex = {
      stock: /^\d+$/,
      sucursales: /^[a-zA-Z0-9\s]{2,100}$/,
    };

    if (name in validationRegex) {
      const regex = validationRegex[name];
      if (!regex.test(updateStock[name])) {
        setErrors({ ...errors, [name]: `Campo ${name} inválido` });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
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
    validate(
      {
        ...updateStock,
        [event.target.name]: event.target.value,
      },
      event.target.name
    );
  };

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
    await modalEditProduc();
  };
  console.log(errors);
  const miSet = new Set();
  for (let error in errors) {
    if (errors.hasOwnProperty(error)) {
      miSet.add(errors[error]);
    }
  }
  return (
    <div className={style.divMain}>
      <div>
        <h2 className={style.tittle}>Inventario</h2>
      </div>
      <div>
        <h2 className={style.tittle}>
          {sucursales[0]?.PRODUCTO?.nombre_producto}
        </h2>
        <p className={style.info}>Sucursal</p>
        <select
          name="sucursales"
          onChange={handleChange}
          className={style.selectModal}
        >
          {sucursales.map((sl, key) => {
            return (
              <option
                key={key}
                value={sl.SUCURSAL.nombre_sucursal}
                className={style.optionModal}
              >
                {sl.SUCURSAL.nombre_sucursal}
              </option>
            );
          })}
        </select>
        <p className={style.info}>Stock</p>
        <input
          type="text"
          name="stock"
          onChange={handleChange}
          className={style.optionModal}
        />
      </div>
      <div>
        <p className={style.errorMessage}>{Array.from(miSet).join(", ")}</p>
        <button
          disabled={disableFunction()}
          onClick={handleSubmit}
          className={style.buttModal}
        >
          Guardar
        </button>
        <button onClick={modalEditProduc} className={style.buttModal}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
