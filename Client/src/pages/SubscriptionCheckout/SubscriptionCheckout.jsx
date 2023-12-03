import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SubscriptionCheckout = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const subscription = query.get("subscription");
  const totalPay = query.get("totalPay");
  const currency_id = query.get("currency_id");
  const quantity = query.get("quantity");

  const [checkout, setCheckout] = useState([]);
  console.log(subscription, totalPay, currency_id, quantity);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:3001/paymentGateways?subscription=${subscription}&totalPay=${totalPay}&currency_id=${currency_id}&quantity=${quantity}`
        );
        setCheckout(data);
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);
  console.log(checkout.init_point);
  const handleSubmit = () => {
    window.location.href = checkout.init_point;
  };

  return (
    <div>
      <h1>Medios de pago:</h1>
      <p>Mercado Pago:</p>
      <button onClick={handleSubmit}>Pagar</button>
    </div>
  );
};

export default SubscriptionCheckout;
