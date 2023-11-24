import PropTypes from "prop-types";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <div className={style.card}>
      <Link to={`/detail/${product.id}`}>
        <img src={product.image} alt="img not found" />
        <div className={style.hCont}>
          <h4>{product.name}</h4>
          <h6>Precio: ${product.precio}</h6>
        </div>
      </Link>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Card;
