const ProdCart = ({ product }) => {
  return (
    <div>
      <img
        src={product.PRODUCTO.image}
        alt={product.PRODUCTO.nombre_producto}
      />
      <h2>{product.PRODUCTO.nombre_producto}</h2>
      <label htmlFor={product.PRODUCTO.id_producto}>Stock: </label>
      <input
        type="number"
        name={product.PRODUCTO.id_producto}
        min={1}
        max={product.stock}
        placeholder="Stock"
      />
    </div>
  );
};

export default ProdCart;
