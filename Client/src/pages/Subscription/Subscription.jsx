import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Subscription.css";

const Subscription = () => {
  const navigate = useNavigate();

  const [subscriptionType, setSubscriptionType] = useState("free");
  const [subscriptionMonths, setSubscriptionMonths] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("COP");

  const subscriptionOptions = [
    { type: "Free", price: 0 },
    { type: "Basic", price: 10000 },
    { type: "Premium", price: 50000 },
  ];

  const handleTypeChange = (event) => {
    setSubscriptionType(event.target.value);
  };

  const handleMonthsChange = (event) => {
    setSubscriptionMonths(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handlePaymentClick = () => {
    const selectedSubscription = subscriptionOptions.find(
      (option) => option.type === subscriptionType
    );
    navigate(
      `/subscription/checkout/?subscription=${subscriptionType}&totalPay=${selectedSubscription.price}&currency_id=${selectedCurrency}&quantity=${subscriptionMonths}`
    );
  };

  return (
    <div className="container">
      <header>
        <h1>Nuestros Precios</h1>
        <div className="toggle">
          <label>Anual</label>
          <div className="toggle-btn">
            <input type="checkbox" id="checkbox" className="checkbox" />
            <label form="checkbox" className="sub" id="suv">
              <div className="circle"></div>
            </label>
          </div>
          <label>Mensual</label>
        </div>
      </header>

      <div className="cards">
        <div className="card shadow">
          <ul>
            <li className="pack">Free</li>
            <li id="free" className="priceBottomBar">
              $0
            </li>
            <li className="bottonBar">1 funcion</li>
            <li className="bottonBar">2 funcion</li>
            <li>
              <button className="btn">Lo quiero</button>
            </li>
          </ul>
        </div>
        <div className="card active">
          <ul>
            <li className="pack">Basic</li>
            <li id="free" className="priceBottomBar">
              $100
            </li>
            <li className="bottonBar">1 funcion</li>
            <li className="bottonBar">2 funcion</li>
            <li className="bottonBar">3 funcion</li>
            <li className="bottonBar">4 funcion</li>
            <li>
              <button className="btn active-btn">Lo quiero</button>
            </li>
          </ul>
        </div>
        <div className="card shadow">
          <ul>
            <li className="pack">Profesional</li>
            <li id="free" className="priceBottomBar">
              $300
            </li>
            <li className="bottonBar">1 funcion</li>
            <li className="bottonBar">2 funcion</li>
            <li className="bottonBar">3 funcion</li>
            <li className="bottonBar">4 funcion</li>
            <li className="bottonBar">5 funcion</li>
            <li>
              <button className="btn">Lo quiero</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // <div>
    //   <h2>Información de la suscripción</h2>
    //   <label htmlFor="currency">Seleccionar Moneda:</label>
    //   <select
    //     id="currency"
    //     value={selectedCurrency}
    //     onChange={handleCurrencyChange}
    //   >
    //     {["COP", "ARS", "PER", "USD"].map((currency) => (
    //       <option key={currency} value={currency}>
    //         {currency}
    //       </option>
    //     ))}
    //   </select>

    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Tipo</th>
    //         <th>Precio</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {subscriptionOptions.map((option) => (
    //         <tr key={option.type}>
    //           <td>{option.type}</td>
    //           <td>{option.price}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>

    //   <label htmlFor="subscriptionType">Seleccionar Tipo de Suscripción:</label>
    //   <select
    //     id="subscriptionType"
    //     value={subscriptionType}
    //     onChange={handleTypeChange}
    //   >
    //     {subscriptionOptions.map((option) => (
    //       <option key={option.type} value={option.type}>
    //         {option.type}
    //       </option>
    //     ))}
    //   </select>

    //   <label htmlFor="subscriptionMonths">Seleccionar Número de Meses:</label>
    //   <select
    //     id="subscriptionMonths"
    //     value={subscriptionMonths}
    //     onChange={handleMonthsChange}
    //   >
    //     {[...Array(12).keys()].map((month) => (
    //       <option key={month + 1} value={month + 1}>
    //         {month + 1}
    //       </option>
    //     ))}
    //   </select>

    //   <button onClick={handlePaymentClick}>Ir a Pagar</button>
    // </div>
  );
};

export default Subscription;
