// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//styles
import style from "./Product.module.css";

const Product = ({ product }) => {
  return (
    <div className={style.card}>
      <Link
        to={`/detail/?name=${product?.PRODUCTO?.nombre_producto}&sucursal=${product?.SUCURSAL?.nombre_sucursal}`}
      >
        <img
          src={product?.PRODUCTO?.image}
          alt={product?.PRODUCTO?.nombre_producto}
        />
        <div className={style.cardDetails}>
          <h2>{product?.PRODUCTO?.nombre_producto}</h2>
          <p>Precio: ${product?.PRODUCTO?.valor_venta}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
