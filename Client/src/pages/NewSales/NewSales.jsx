import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getSucursales } from "../../redux/actions";

//components
import Products from "../../components/Products/Products";
import Filters from "../../components/Filters/Filters";
import Cart from "../../components/Cart/Cart";

//styles
import Style from "./NewSales.module.css";

const NewSales = ({ idBranch }) => {
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.totalPages);
  const sucursales = useSelector((state) => state.sucursales);

  const sucursalEmpleado = "FORMOSA";

  const [search, setSearch] = useState("");
  const [conditions, setConditions] = useState({
    sucursal: sucursalEmpleado,
    page: 1,
    page_size: 6,
  });

  useEffect(() => {
    // dispatch(getSucursales(idBranch));
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

  // funtion addToCart(event)
  // const cartHandler = (event) => {

  // }

  return (
    <div className={Style.divMain}>
      <Filters
        conditions={conditions}
        setConditions={setConditions}
        sucursales={sucursales}
        totalPages={totalPages}
        handlerChange={handlerChange}
        handlerSubmit={handlerSubmit}
      />
      <Products />
      <Cart />

      <div></div>
    </div>
  );
};

export default NewSales;
