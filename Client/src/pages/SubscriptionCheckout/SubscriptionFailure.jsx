import React from "react";
import { useLocation } from "react-router-dom";
import style from "./Subscription.module.css";

const SubscriptionFailure = () => {
  const location = useLocation();

  const queryString = location.search;
  const params = new URLSearchParams(queryString);

  const collectionId = params.get("collection_id");
  const collectionStatus = params.get("collection_status");
  const preferenceId = params.get("preference_id");

  return (
    <div className={style.container}>
      <h1 className={style.tittleFail}>Transacción Fallida</h1>
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

export default SubscriptionFailure;
