import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";

//components
import Products from "../../components/Products/Products";
import Filters from "../../components/Filters/Filters";
import Cart from "../../components/Cart/Cart";

//styles
import Style from "./NewSales.module.css";

const NewSales = () => {
  const dispatch = useDispatch();
  const { idBranch, branch } = useSelector((state) => state.auth);
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

  // funtion addToCart(event)
  // const cartHandler = (event) => {

  // }



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
    <Cart />


  </div>
);
};


export default NewSales;
