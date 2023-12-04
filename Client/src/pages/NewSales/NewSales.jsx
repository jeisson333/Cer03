import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";

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
  const totalPages = useSelector((state) => state.totalPages);
  const sucursales = useSelector((state) => state.sucursales);

  const [search, setSearch] = useState("");
  const [conditions, setConditions] = useState({
    sucursal: branch,
    page: 1,
    page_size: 6,
  });

  useEffect(() => {
    dispatch(getProducts(idBranch, conditions)); //nueva action con filtro de sucursal
  }, [conditions]);

  const handlerChange = (event) => {
    setSearch(event.target.value);
  };

  const handlerSubmit = () => {
    setConditions({
      ...conditions,
      name: search,
    });
  };

  const [isModal, setIsModal] = useState(false);

  const comprar = () => {
    setIsModal(true);
  };
  const cancelar = () => {
    setIsModal(false);
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
          <h2>!!Estamos trabajando aun en esta parte!!</h2>
        </div>
        <div>
          <button className={Style.comprar}>Continuar</button>
          <button className={Style.delete} onClick={cancelar}>
            Cancelar
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewSales;
