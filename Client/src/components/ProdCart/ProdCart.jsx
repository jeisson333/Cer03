import styles from "./ProdCart.module.css";

const ProdCart = ({
  product,
  quantity,
  quantityInputHandler,
  deleteProdCart,
}) => {
  return (
    <div className={styles.prodCart}>
      <div className={styles.prodInfo}>
        <img
          src={product.PRODUCTO.image}
          alt={product.PRODUCTO.nombre_producto}
        />
        <h2>{product.PRODUCTO.nombre_producto}</h2>
      </div>
      <div className={styles.quantity}>
        <label htmlFor={product.PRODUCTO.id_producto}>Cantidad: </label>
        <input
          type="number"
          name={product.PRODUCTO.id_producto}
          value={quantity[product.PRODUCTO.id_producto]?.quantity}
          onChange={quantityInputHandler}
          min={1}
          max={product.stock}
          placeholder={product.stock}
        />
        <div>
          <p>Stock: {product.stock}</p>
          <p>Precio: {Math.floor(product.PRODUCTO.valor_venta)}</p>
        </div>
        <button onClick={deleteProdCart} name={product.PRODUCTO.id_producto}>
          X
        </button>
      </div>
    </div>
  );
};

export default ProdCart;