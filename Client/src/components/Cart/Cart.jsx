import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ProdCart from "../ProdCart/ProdCart";

import styles from "./Cart.module.css";

const Cart = () => {
  const products = useSelector((state) => state.inCart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    setTotalPrice(0);
    products.forEach((product) => {
      if (!quantity[product.PRODUCTO.id_producto])
        setQuantity({ [product.PRODUCTO.id_producto]: 1 });
    });
  }, [products]);

  // useEffect(() => {
  //   setTotalPrice(0);
  //   // console.log(totalPrice);
  //   products.forEach((product, i) => {
  //     if (!quantity[product.PRODUCTO.id_producto])
  //       setQuantity({ ...quantity, [product.PRODUCTO.id_producto]: 1 });
  //     // console.log(
  //     //   totalPrice,
  //     //   product.PRODUCTO.valor_venta,
  //     //   quantity[product.PRODUCTO.id_producto]
  //     // );
  //     if (quantity[product.PRODUCTO.id_producto]) {
  //       setTotalPrice(
  //         totalPrice + product.PRODUCTO.valor_venta
  //         *
  //           quantity[product.PRODUCTO.id_producto]
  //       );
  //     }
  //   });
  // }, [products, quantity]);

  const quantityInputHandler = (event) => {
    setQuantity({
      ...quantity,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div>
        {products?.map((product) => {
          return (
            <ProdCart
              key={product.PRODUCTO.id_producto}
              product={product}
              quantity={quantity}
              quantityInputHandler={quantityInputHandler}
            />
          );
        })}
      </div>
      <div>
        <p>Precio Total: {totalPrice}</p>
        <button onClick={() => console.log("Elija el metodo de pago")}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Cart;
