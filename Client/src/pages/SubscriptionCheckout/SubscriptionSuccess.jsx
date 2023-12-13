import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updateSubcription } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./Subscription.module.css";
import axios from "axios";
const url = import.meta.env.VITE_BASE_URL;
const devEmail = import.meta.env.VITE_EMAIL_DEV;
import Cookies from "universal-cookie";
const cookies = new Cookies();

const SubscriptionSuccess = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { idBranch, email } = cookies.get("auth");
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
          `https://cer03-dev-dhmt.4.us-1.fl0.io/paymentGateways/webhook?data.id=${collectionId}&type=payment`
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
      if (verifyId?.body) {
        await axios.post(`${url}/email`, {
          email: `${email},${devEmail}`,
          tittle: "Compra Exitosa!",
          text: `Tipo de suscripción : ${verifyId?.body?.description} <br />
          Transacción id: ${verifyId?.body?.id} <br/>
          Estado: ${verifyId?.body?.status} <br/>
          Precio: ${verifyId?.body?.transaction_details?.total_paid_amount} <br/>
          `,
        });
        dispatch(
          updateSubcription(verifyId?.body?.description.toLowerCase(), idBranch)
        );
      }
    } catch (error) {
      throw Error(error.message);
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.tittle}>Transacción exitosa</h1>
      <p className={style.text}>Transacción id: {collectionId}</p>
      <p className={style.text}>Estado:{collectionStatus}</p>
      <p className={style.text}>
        Identificación de preferencia: {preferenceId}
      </p>
    </div>
  );
};

export default SubscriptionSuccess;
