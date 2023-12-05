import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayments, getProducts } from "../../redux/actions";

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
  const { idBranch, branch } = cookies.get("auth");
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
    name: paymentMethods[0].nombre_catalogo,
  });

  useEffect(() => {
    dispatch(getProducts(idBranch, conditions)); //nueva action con filtro de sucursal
  }, [conditions]);

  useEffect(() => {
    dispatch(getPayments());
  }, []);

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
      ...payment,
      name: event.target.value,
    });
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
      <Cart comprar={comprar} />
      <section className={isModal ? Style.modal : Style.modalNOT}>
        <div>
          <h1>Seleccione el método de pago</h1>
          <select name="payment" id="payment" onChange={paymentChange}>
            {paymentMethods?.map((method) => {
              return (
                <option key={method.id_catalogo} value={method.nombre_catalogo}>
                  {method.nombre_catalogo}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <button
            className={Style.comprar}
            onClick={() => console.log("accion de comprar")}
          >
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
