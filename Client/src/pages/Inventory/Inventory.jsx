import React, { useEffect, useState } from "react";
// import { products } from "../../data/products";
import axios from "axios";

import Style from "./inventory.module.css";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post("http://localhost:3001/products", {
          id: "6f722d7f-515b-4705-a007-84b07317cc20",
        });

        setProducts(data.data);
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);

  console.log(products);

  return (
    <div>
      <h1>Inventory</h1>
      <div className={Style.cardContainer}>
        {products?.map((product) => (
          <div key={product?.PRODUCTO?.id_producto} className={Style.card}>
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
