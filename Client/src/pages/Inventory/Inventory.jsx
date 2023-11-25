import React, { useEffect, useState } from "react";
import axios from "axios";

import Style from "./inventory.module.css";

const Inventory = ({ idBranch }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post("http://localhost:3001/products", {
          id: idBranch,
        });
        setProducts(data.data);
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      <div className={Style.cardContainer}>
        {products?.map((product, i) => (
          <div key={i} className={Style.card}>
            <img
              src={product?.PRODUCTO?.image}
              alt={product?.PRODUCTO?.nombre_producto}
            />
            <div className={Style.cardDetails}>
              <h2>{product?.PRODUCTO?.nombre_producto}</h2>
              <p>Precio: ${product?.PRODUCTO?.valor_venta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
