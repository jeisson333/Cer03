// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./ProdCart.module.css";

const ProdCart = ({ product, changeAmount, deleteProdCart }) => {
  return (
    <div className={styles.prodCart}>
      <div className={styles.close}>
        <button onClick={deleteProdCart} name={product?.id}>
          X
          {/* <FontAwesomeIcon onClick={deleteProdCart} name={product.PRODUCTO.id_producto} className={styles.trash} icon={faTrash}/> */}
        </button>
      </div>
      <div className={styles.prodInfo}>
        <img src={product?.image} alt={product?.name} />
        <h2>{product?.name}</h2>
        <div className={styles.cantidad}>
          <label htmlFor={product?.id}>Cantidad: </label>
          <input
            type="number"
            className={styles.quantityInput}
            name={product?.id}
            value={product?.amount}
            onChange={changeAmount}
            min={1}
            max={product?.stock}
            placeholder={product?.stock}
          />
        </div>
      </div>
      <div className={styles.quantity}>
        <p>${Math.floor(product?.valor_venta)}</p>

        <div className={styles.stockHolder}>
          <p>Stock: {product?.stock}</p>
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};

export default ProdCart;
