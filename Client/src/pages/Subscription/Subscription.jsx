import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Subscription.css";

const Subscription = () => {
  const navigate = useNavigate();

  const [subscriptionType, setSubscriptionType] = useState({
    free: "Free",
    basic: "Basic",
    premium: "Premium",
  });
  const [subscriptionPay, setSubscriptionPay] = useState({
    free: 0,
    basic: 1000,
    premium: 3000,
  });
  const [selectedCurrency, setSelectedCurrency] = useState([
    "COP",
    "ARG",
    "PER",
    "USD",
  ]);
  let [subscriptionMonths, setSubscriptionMonths] = useState(1);
  const [isAnnual, setIsAnnual] = useState(false);

  const handleCheckboxChange = () => {
    setIsAnnual(!isAnnual);
  };

  const calculateSubscriptionPrice = (type) => {
    const basePrice = subscriptionPay[type];
    return isAnnual ? basePrice * 12 : basePrice;
  };

  const handleButtonClick = (type) => {
    const country = document.getElementById("country").value;
    const isChecked = isAnnual;
    const name = subscriptionType[type];
    const price = subscriptionPay[type];

    if (isChecked) {
      subscriptionMonths = 12;
    }
    navigate(
      `/subscription/checkout/?subscription=${name}&totalPay=${price}&currency_id=${country}&quantity=${subscriptionMonths}`
    );
  };

  return (
    <div className="container">
      <div>
        <select id="country">
          {selectedCurrency.map((p, i) => (
            <option key={i} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <header>
        <h1>Nuestros Precios</h1>
        <div className="toggle">
          <label>Mensual</label>
          <div className="toggle-btn">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox" className="sub" id="suv">
              <div className="circle"></div>
            </label>
          </div>
          <label>Anual</label>
        </div>
      </header>

      <div className="cards">
        <div className="card shadow">
          <ul>
            <li className="pack">{subscriptionType.free}</li>
            <li id="free" className="price bottonBar">
              ${calculateSubscriptionPrice("free")}
            </li>
            <li className="bottonBar">1 funcion</li>
            <li className="bottonBar">2 funcion</li>
            <li className="bottonBar">3 funcion</li>
            <li>
              <button className="btn" onClick={() => handleButtonClick("free")}>
                Lo quiero
              </button>
            </li>
          </ul>
        </div>
        <div className="card active">
          <ul>
            <li className="pack">{subscriptionType.basic}</li>
            <li id="free" className="price bottonBar">
              ${calculateSubscriptionPrice("basic")}
            </li>
            <li className="bottonBar">1 funcion</li>
            <li className="bottonBar">2 funcion</li>
            <li className="bottonBar">3 funcion</li>
            <li>
              <button
                className="btn active-btn"
                onClick={() => handleButtonClick("basic")}
              >
                Lo quiero
              </button>
            </li>
          </ul>
        </div>
        <div className="card shadow">
          <ul>
            <li className="pack">{subscriptionType.premium}</li>
            <li id="free" className="price bottonBar">
              ${calculateSubscriptionPrice("premium")}
            </li>
            <li className="bottonBar">1 funcion</li>
            <li className="bottonBar">2 funcion</li>
            <li className="bottonBar">3 funcion</li>
            <li>
              <button
                className="btn"
                onClick={() => handleButtonClick("premium")}
              >
                Lo quiero
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
