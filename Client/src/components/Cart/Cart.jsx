import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { actionCart } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

import ProdCart from "../ProdCart/ProdCart";

import styles from "./Cart.module.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Cart = ({ comprar }) => {
  const dispatch = useDispatch();
  const detectActionCart = useSelector((state) => state.actionCart);
  // const payments = useSelector((state) => state.paymentMethods);
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem(`${cookies.get("auth").idUser}|Cart`)) || []
  );
  const [totalPrice, setTotalPrice] = useState(
    JSON.parse(
      localStorage.getItem(`${cookies.get("auth").idUser}|totalAmount`)
    ) || 0
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem(`${cookies.get("auth").idUser}|Cart`))
    ) {
      setProducts([
        ...JSON.parse(
          localStorage.getItem(`${cookies.get("auth").idUser}|Cart`)
        ),
      ]);
    } else {
      setProducts([]);
    }
  }, [detectActionCart]);

  useEffect(() => {
    let totalAmount = 0;

    products.forEach(
      (prodCart) => (totalAmount += prodCart.valor_venta * prodCart.amount)
    );

    localStorage.setItem(
      `${cookies.get("auth").idUser}|totalAmount`,
      JSON.stringify(totalAmount)
    );

    setTotalPrice(
      JSON.parse(
        localStorage.getItem(`${cookies.get("auth").idUser}|totalAmount`)
      )
    );
  }, [products]);

  const changeAmount = (event) => {
    if (event.target.value) {
      let newAmount = parseInt(event.target.value);
      let filterProduct = products.find(
        (product) => product?.id == event.target.name
      );
      if (filterProduct) {
        let stockProduct = parseInt(filterProduct?.stock);
        if (newAmount > stockProduct) filterProduct.amount = stockProduct;
        else if (newAmount < 1) filterProduct.amount = 1;
        else {
          filterProduct.amount = newAmount;
        }
      }
      products.forEach((product, index) => {
        if (product?.id == filterProduct?.id) products[index] = filterProduct;
      });

      localStorage.setItem(
        `${cookies.get("auth").idUser}|Cart`,
        JSON.stringify(products)
      );
      dispatch(actionCart());
    }
  };

  const deleteProdCart = (event) => {
    let cartFiltered = products?.filter(
      (prodCart) => prodCart.id !== event.target.name
    );

    localStorage.setItem(
      `${cookies.get("auth").idUser}|Cart`,
      JSON.stringify(cartFiltered)
    );

    dispatch(actionCart());
  };

  const deleteAllProducts = () => {
    localStorage.removeItem(`${cookies.get("auth").idUser}|Cart`);

    dispatch(actionCart());
  };

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleCartBuy = () => {
    if (products.length) {
      if (totalPrice === 0) toast.error("El precio total no puede ser 0!");
      else comprar();
    } else {
      toast.error("El carro debe contener mínimo un producto!");
    }
  };

  return (
    <div className={styles.bigContainer}>
      <button
        onClick={toggleVisible}
        className={isVisible ? styles.hideToggle : styles.toggleButton}
      >
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
      <div className={isVisible ? styles.container : styles.containerNOT}>
        <div className={styles.header}>
          <button onClick={toggleVisible} className={styles.toggleButton2}>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
          <h2 className={styles.title}>Productos a Comprar</h2>
        </div>
        <div className={styles.divider}></div>
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
        <div className={styles.buttonHolder}>
          <p style={{ fontWeight: "bold" }}>Precio Total: ${totalPrice}</p>
          <button className={styles.comprar} onClick={handleCartBuy}>
            Comprar
          </button>
          <button className={styles.delete} onClick={deleteAllProducts}>
            Eliminar todos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
