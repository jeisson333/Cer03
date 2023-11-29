import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getSucursales } from "../../redux/actions";

//components
import Paginate from "../../components/Paginate/Paginate";
import Search from "../../components/SearchBar/SearchBar";
import Products from "../../components/Products/Products";
import Filters from "../../components/Filters/Filters";

//styles
import Style from "./inventory.module.css";

const Inventory = ({ idBranch }) => {
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.totalPages);
  const [search, setSearch] = useState("");
  const sucursales = useSelector((state) => state.sucursales);
  const [conditions, setConditions] = useState({
    page: 1,
    page_size: 6,
  });

  useEffect(() => {
    dispatch(getSucursales(idBranch));
    dispatch(getProducts(idBranch, conditions));
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
    </div>
  );
};

export default Inventory;
