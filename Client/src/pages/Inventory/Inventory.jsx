import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getSucursales } from "../../redux/actions";

//components
import Products from "../../components/Products/Products";
import Filters from "../../components/Filters/Filters";

//styles
import Style from "./inventory.module.css";

const Inventory = () => {
  const dispatch = useDispatch();
  const { idBranch, branch } = useSelector((state) => state.user);
  const totalPages = useSelector((state) => state.totalPages);
  const [search, setSearch] = useState("");
  const sucursales = useSelector((state) => state.sucursales);
  const [conditions, setConditions] = useState({
    sucursal: [],
    page: 1,
    page_size: 15,
  });
  const [firstChargue, setFirstChargue] = useState(true);

  useEffect(() => {
    dispatch(getSucursales(idBranch));
  }, []);

  useEffect(() => {
    if (firstChargue) {
      setConditions({
        ...conditions,
        sucursal: branch ? branch : sucursales[0]?.nombre_sucursal,
      });
      setFirstChargue(false);
    }
  }, [sucursales]);

  useEffect(() => {
    if (conditions.sucursal) dispatch(getProducts(idBranch, conditions));
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
    <div>
      <div className={Style.inventario}>
        <h2>Inventario</h2>
        <div className={Style.divider}></div>
      </div>
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
