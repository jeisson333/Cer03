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
  // const [verifyId, setVerifyId] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `https://de86-45-238-182-161.ngrok.io/paymentGateways/webhook?data.id=${collectionId}&type=payment`
        );

        // setVerifyId(data);
        await sendMail(data);
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);

  const sendMail = async (verifyId) => {
    try {
      console.log("entro");
      if (verifyId?.body) {
        console.log("No entro");
        await axios.post(`${url}/email`, {
          email:
            "lucasescudero5629@gmail.com,david@castromora.lat,jeissonosorio97@gmail.com",
          tittle: "Compra Exitosa!!!",
          text: `Tipo de suscripción : ${verifyId?.body?.description} <br />
          Transacción id: ${verifyId?.body?.id} <br/>
          Estado: ${verifyId?.body?.status} <br/>
          Precio: ${verifyId?.body?.transaction_details?.total_paid_amount} <br/>
          `,
        });
      }
    } catch (error) {
      throw Error(error.message);
    }
  };

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
