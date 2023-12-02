/* eslint-disable react/prop-types */
// import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LiaCartPlusSolid } from "react-icons/lia";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "../../redux/actions";

import style from "./Product.module.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const inCart = cookies.get("inCart");
  const [isCart, setIsCart] = useState(false);

  const cartHandler = () => {
    if (
      !inCart.find((prodCart) => {
        return prodCart.PRODUCTO.id_producto === product.PRODUCTO.id_producto;
      })
    ) {
      dispatch(addCart(product));
    } else {
      console.log("nop");
    }
  };

  // useEffect(() => {
  //   inCart.forEach((prodCart) => {
  //     if (prodCart.PRODUCTO.id_producto === product.PRODUCTO.id_producto)
  //       setIsCart(true);
  //   });
  // }, [inCart]);

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
