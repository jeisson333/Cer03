import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayments, getProducts } from "../../redux/actions";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { toast } from "react-hot-toast";

//components
import Products from "../../components/Products/Products";
import Filters from "../../components/Filters/Filters";
import Cart from "../../components/Cart/Cart";

//styles
import Style from "./NewSales.module.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const NewSales = () => {
  const dispatch = useDispatch();
  const { idBranch, branch, idUser } = cookies.get("auth");
  const { paymentMethods, totalPages, sucursales } = useSelector(
    (state) => state
  );

  const [search, setSearch] = useState("");
  const [conditions, setConditions] = useState({
    sucursal: branch,
    page: 1,
    page_size: 6,
  });
  const [isModal, setIsModal] = useState(false);
  const [payment, setPayment] = useState({
    id_catalogo: "",
    nombre_catalogo: "",
  });
  const [cart, setCart] = useState([]);
  const [detectBuy, setDetectBuy] = useState(false);

  useEffect(() => {
    dispatch(getPayments());
  }, []);

  useEffect(() => {
    dispatch(getProducts(idBranch, conditions)); //nueva action con filtro de sucursal
  }, [conditions, detectBuy]);

  useEffect(() => {
    setPayment({ ...paymentMethods[0] });
  }, [paymentMethods]);

  const handlerChange = (event) => {
    setSearch(event.target.value);
  };

  const handlerSubmit = () => {
    setConditions({
      ...conditions,
      name: search,
    });
  };

  const comprar = () => {
    setIsModal(true);
  };

  const cancelar = () => {
    setIsModal(false);
  };

  const paymentChange = (event) => {
    setPayment({
      ...paymentMethods.find(
        (method) => method.nombre_catalogo === event.target.value
      ),
    });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(`${idUser}|Cart`)))
      setCart([...JSON.parse(localStorage.getItem(`${idUser}|Cart`))]);
  }, [isModal]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const message = await axios.post(`${baseUrl}/ventas/nueva-venta`, {
        id_branch: idBranch,
        nombre_sucursal: branch,
        payment: payment.id_catalogo,
        products: [...cart],
      });

      if (!message.error) {
        // console.log(idUser);
        localStorage.removeItem(`${idUser}|Cart`);
        localStorage.removeItem(`${idUser}|totalAmount`);
        setDetectBuy(!detectBuy);
        dispatch(getProducts(idBranch, conditions));
        setIsModal(false);
        // dispatch();
      }
    } catch (error) {
      // toast.error("La compra no pudo ser realizada");
      console.log(error.message);
    }
  };

  return (
    <div className={Style.divMain}>
      <div className={Style.holder}>
        <Filters
          conditions={conditions}
          setConditions={setConditions}
          sucursales={sucursales}
          totalPages={totalPages}
          handlerChange={handlerChange}
          handlerSubmit={handlerSubmit}
        />
        <Products />
      </div>
      {/* carrito de compras */}
      <Cart comprar={comprar} detectBuy={detectBuy} />
      {/* modal - comprar */}
      <section className={isModal ? Style.modal : Style.modalNOT}>
        <div>
          <h1>Seleccione el método de pago</h1>
          <select name="payment" id="payment" onChange={paymentChange}>
            {paymentMethods?.map((method) => (
              <option key={method.id_catalogo} value={method.nombre_catalogo}>
                {method.nombre_catalogo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button className={Style.comprar} onClick={submitHandler}>
            Continuar
          </button>
          <button className={Style.delete} onClick={cancelar}>
            Cancelar
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewSales;
