import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./ProdCart.module.css";

const ProdCart = ({
  product,
  quantity,
  quantityInputHandler,
  deleteProdCart,
}) => {
  return (
    <div className={styles.prodCart}>
      <div className={styles.close}>
       <button onClick={deleteProdCart} name={product.PRODUCTO.id_producto}> X
          {/* <FontAwesomeIcon onClick={deleteProdCart} name={product.PRODUCTO.id_producto} className={styles.trash} icon={faTrash}/> */}
        </button>
        </div>
      <div className={styles.prodInfo}>
        <img
          src={product.PRODUCTO.image}
          alt={product.PRODUCTO.nombre_producto}
        />
        <h2>{product.PRODUCTO.nombre_producto}</h2>
        <div className={styles.cantidad}>
        <label htmlFor={product.PRODUCTO.id_producto}>Cantidad: </label>
        <input
          type="number"
          className={styles.quantityInput}
          name={product.PRODUCTO.id_producto}
          value={quantity[product.PRODUCTO.id_producto]?.quantity}
          onChange={quantityInputHandler}
          min={1}
          max={product.stock}
          placeholder={product.stock}
        />
        </div>
      </div>
      <div className={styles.quantity}>
        <p>${Math.floor(product.PRODUCTO.valor_venta)}</p>
        
        <div className={styles.stockHolder}>
          <p>Stock: {product.stock}</p>
        </div>
        
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};

export default ProdCart;
