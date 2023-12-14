/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCart } from "../../redux/actions";

import style from "./Product.module.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const inCart =
    JSON.parse(localStorage.getItem(`${cookies.get("auth").idUser}|Cart`)) ||
    [];
  const cartHandler = () => {
    if (
      inCart &&
      !inCart?.find(
        (prodCart) => prodCart?.id === product?.PRODUCTO?.id_producto
      )
    ) {
      inCart.push({
        id: product.PRODUCTO.id_producto,
        name: product.PRODUCTO.nombre_producto,
        image: product.PRODUCTO.image,
        peso: product.PRODUCTO.peso,
        valor_compra: product.PRODUCTO.valro_compra,
        valor_venta: product.PRODUCTO.valor_venta,
        stock: product.stock,
        amount: product.stock ? 1 : 0,
      });

      localStorage.setItem(
        `${cookies.get("auth").idUser}|Cart`,
        JSON.stringify(inCart)
      );

      dispatch(actionCart());
    }
  };

  return (
    <div className={style.card}>
      {useLocation().pathname === "/products" && (
        <Link
          to={`/detail/?name=${product?.PRODUCTO?.nombre_producto}&sucursal=${product?.SUCURSAL?.nombre_sucursal}`}
        >
          <div>
            <div className={style.cardContent}>
              <img
                src={product?.PRODUCTO?.image}
                alt={product?.PRODUCTO?.nombre_producto}
                className={style.cardImage}
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className={style.cardContent}>
              <h2>Precio: ${Math.floor(product?.PRODUCTO?.valor_venta)}</h2>
              <h6>{product?.PRODUCTO?.nombre_producto}</h6>
            </div>
          </div>
        </Link>
      )}

      {useLocation().pathname === "/newsales" && (
        <div onClick={cartHandler}>
          <div className={style.cardContent}>
            <img
              src={product?.PRODUCTO?.image}
              alt={product?.PRODUCTO?.nombre_producto}
              className={style.cardImage}
            />
          </div>

          <div className={style.cardContent}>
            <h2>Precio: ${Math.floor(product?.PRODUCTO?.valor_venta)}</h2>
            <h6>{product?.PRODUCTO?.nombre_producto}</h6>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
