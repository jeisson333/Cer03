import React, { useEffect, useState } from "react";
import axios from "axios";
import Style from "./inventory.module.css";
import { Link } from "react-router-dom";
import { FaListOl } from "react-icons/fa6";
import { FaFilterCircleDollar } from "react-icons/fa6";

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
      <h1>Inventario</h1>
      <div className={Style.filtrosContainer}>

        <button className={Style.buttons}><FaFilterCircleDollar /> Filtrar</button>
        <button className={Style.buttons}><FaListOl /> Ordenar</button>
          <input
            type="search"
            placeholder="Buscar concepto..."
            className={Style.searchInput}
          />

        
      </div>
      <div className={Style.cardContainer}>
        {products?.map((product, i) => (

          <div key={i} className={Style.card}>
            <Link to={`/detail/?name=${product?.PRODUCTO?.nombre_producto}&sucursal=${product?.SUCURSAL?.nombre_sucursal}`}>
              <img
                src={product?.PRODUCTO?.image}
                alt={product?.PRODUCTO?.nombre_producto}
              />
              <div className={Style.cardDetails}>
                <h2>{product?.PRODUCTO?.nombre_producto}</h2>
                <p>Precio: ${product?.PRODUCTO?.valor_venta}</p>

              </div>
            </Link>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Inventory;
