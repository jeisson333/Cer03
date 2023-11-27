/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./Detail.module.css";

const Detail = ({ idBranch }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get("name");
  const sucursal = query.get("sucursal");

  const [product, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:3001/products/?name=${name}&sucursal=${sucursal}`,
          {
            id: idBranch,
          }
        );
        setProducts(data.data);
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);
  return (
    <div className={styles.divMain}>
      <div className={styles.divTittle}>
        <h2 className={styles.tittle}>
          {product[0]?.PRODUCTO?.nombre_producto}
        </h2>
        <img
          className={styles.img}
          src={product[0]?.PRODUCTO?.image}
          alt={product[0]?.PRODUCTO?.nombre_producto}
        />
      </div>
      <div>
        <p className={styles.info}>
          Sucursal: {product[0]?.SUCURSAL.nombre_sucursal}
        </p>
        <p className={styles.info}>
          Tipo de producto:{" "}
          {product[0]?.PRODUCTO?.CATALOGO_UNIVERSAL?.nombre_catalogo}
        </p>
        <p className={styles.info}>Stock/Cantidad: {product[0]?.stock}</p>
        <p className={styles.info}>Peso(gr): {product[0]?.PRODUCTO?.peso}</p>
        <p className={styles.info}>
          Precio Compra: ${product[0]?.PRODUCTO?.valor_compra}
        </p>
        <p className={styles.info}>
          Precio Venta: ${product[0]?.PRODUCTO?.valor_venta}
        </p>
      </div>
    </div>
  );
};

export default Detail;
