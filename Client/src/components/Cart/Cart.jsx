import { useSelector } from "react-redux";

import ProdCart from "../ProdCart/ProdCart";

const Cart = () => {
  const products = useSelector((state) => state.inCart);
  console.log(products);
  return (
    <div>
      {products?.map((product) => {
        return (
          <ProdCart key={product.PRODUCTO.id_producto} product={product} />
        );
      })}
    </div>
  );
};

export default Cart;
