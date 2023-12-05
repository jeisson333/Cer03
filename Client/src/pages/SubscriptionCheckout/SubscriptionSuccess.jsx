import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./Subscription.module.css";
import axios from "axios";
const url = import.meta.env.VITE_BASE_URL;

const SubscriptionSuccess = () => {
  const location = useLocation();

  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const collectionId = params.get("collection_id");
  const collectionStatus = params.get("collection_status");
  const preferenceId = params.get("preference_id");
  const [verifyId, setVerifyId] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `https://b569-45-238-182-161.ngrok.io/paymentGateways/webhook?data.id=${collectionId}&type=payment`
        );

        setVerifyId(data);
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.post(`${url}/email`, {
  //         email:
  //           "lucasescudero5629@gmail.com,david@castromora.lat,jeissonosorio97@gmail.com",
  //         tittle: "Compra Exitosa",
  //         text: `Compra Exitosa <br /> id:  `,
  //       });

  //       setVerifyId(data);
  //     } catch (error) {
  //       throw Error(error.message);
  //     }
  //   })();
  // }, []);
  console.log(verifyId);

  return (
    <div className={style.container}>
      <h1 className={style.tittle}>Transacción exitosa</h1>
      <p className={style.text}>Transacción id: {collectionId}</p>
      <p className={style.text}>
        Estado: {<spam className={style.textApproved}>{collectionStatus}</spam>}
      </p>
      <p className={style.text}>
        Identificación de preferencia: {preferenceId}
      </p>
    </div>
  );
};

export default SubscriptionSuccess;
