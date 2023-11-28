// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "./Product.module.css";

const Product = ({ product }) => {
  return (
    <div className={style.card}>
      <Link
        to={`/detail/?name=${product?.PRODUCTO?.nombre_producto}&sucursal=${product?.SUCURSAL?.nombre_sucursal}`}
      >
        <div className={style.cardContent}>
          <img
            src={product?.PRODUCTO?.image}
            alt={product?.PRODUCTO?.nombre_producto}
            className={style.cardImage}
          />
        </div>

        <div className={style.cardContent}>
          <h2>Precio: ${product?.PRODUCTO?.valor_venta}</h2>
          <h6>{product?.PRODUCTO?.nombre_producto}</h6>
        </div>
      </Link>
    </div>
  );
};

export default Product;
