import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { actionCart } from "../../redux/actions";

import ProdCart from "../ProdCart/ProdCart";

import styles from "./Cart.module.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Cart = () => {
  const dispatch = useDispatch();
  const detectActionCart = useSelector((state) => state.actionCart);
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [totalPrice, setTotalPrice] = useState(
    JSON.parse(localStorage.getItem("totalAmountCart")) || 0
  );

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      setProducts([...JSON.parse(localStorage.getItem("cart"))]);
    } else {
      setProducts([]);
    }
  }, [detectActionCart]);

  useEffect(() => {
    let totalAmount = 0;

    products.forEach(
      (prodCart) => (totalAmount += prodCart.valor_venta * prodCart.amount)
    );

    localStorage.setItem("totalAmountCart", JSON.stringify(totalAmount));

    setTotalPrice(JSON.parse(localStorage.getItem("totalAmountCart")));
  }, [products]);

  const changeAmount = (event) => {
    if (event.target.value) {
      let prodChangeAmount = products.map((prodCart) => {
        if (prodCart.amount !== 0 && prodCart.id === event.target.name) {
          if (prodCart.amount < event.target.value)
            return { ...prodCart, amount: ++prodCart.amount };
          else if (prodCart.amount > event.target.value)
            return { ...prodCart, amount: --prodCart.amount };
        } else return prodCart;
      });

      localStorage.setItem("cart", JSON.stringify(prodChangeAmount));

      dispatch(actionCart());
    }
  };

  const deleteProdCart = (event) => {
    let cartFiltered = products?.filter(
      (prodCart) => prodCart.id !== event.target.name
    );

    localStorage.setItem("cart", JSON.stringify(cartFiltered));

    dispatch(actionCart());
  };

  const deleteAllProducts = () => {
    localStorage.clear();

    dispatch(actionCart());
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Productos a Comprar</h2>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.cards}>
        {products?.map((product) => {
          return (
            <ProdCart
              key={product?.id}
              product={product}
              changeAmount={changeAmount}
              deleteProdCart={deleteProdCart}
            />
          );
        })}
      </div>
      <div>
        <p>Precio Total: {totalPrice}</p>
        <button
          className={styles.comprar}
          onClick={() => console.log("Elija el metodo de pago")}
        >
          Comprar
        </button>
        <button onClick={deleteAllProducts}>Delete all</button>
      </div>
    </div>
  );
};

export default Cart;
