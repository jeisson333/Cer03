/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypeProducts } from "../../redux/actions";
import { useLocation } from "react-router-dom";

//components
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";

//style
import Style from "./Filters.module.css";
export default function Filters({
  conditions,
  setConditions,
  sucursales,
  totalPages,
  handlerChange,
  handlerSubmit,
}) {
  const dispatch = useDispatch();
  const allTypeProduct = useSelector((state) => state.allTypeProducts);

  const handlerConditions = (event) => {
    setConditions({
      ...conditions,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    dispatch(getTypeProducts());
  }, []);

  const nextPage = () => {
    setConditions({
      ...conditions,
      page: conditions.page + 1,
    });
  };

  const prevPage = () => {
    setConditions({
      ...conditions,
      page: conditions.page - 1,
    });
  };

  //type order orderName sucursal
  return (
    <div className={Style.container}>
      <SearchBar handlerChange={handlerChange} handlerSubmit={handlerSubmit} />
      <select
        name="type"
        onChange={handlerConditions}
        className={Style.selectFilter}
      >
        <option value="" className={Style.optionFilter}>
          Tipo De Producto
        </option>
        {allTypeProduct.map((type, index) => (
          <option
            key={index}
            value={type?.nombre_catalogo}
            className={Style.optionFilter}
          >
            {type?.nombre_catalogo}
          </option>
        ))}
      </select>
      <select
        name="orderName"
        onChange={handlerConditions}
        className={Style.selectFilter}
      >
        <option value="" className={Style.optionFilter}>
          Ordenar segun
        </option>
        <option value="valor_venta" className={Style.optionFilter}>
          Precio de venta
        </option>
        <option value="valor_compra" className={Style.optionFilter}>
          Precio de compra
        </option>
        <option value="nombre_producto" className={Style.optionFilter}>
          Nombre del producto
        </option>
      </select>
      <select
        name="order"
        onChange={handlerConditions}
        className={Style.selectFilter}
      >
        <option value="" className={Style.optionFilter}>
          Tipo de orden
        </option>
        <option value="ASC" className={Style.optionFilter}>
          Ascendente
        </option>
        <option value="DESC" className={Style.optionFilter}>
          Descendente
        </option>
      </select>
      {useLocation().pathname !== "/newsales" && (
        <select
          name="sucursal"
          onChange={handlerConditions}
          className={Style.selectFilter}
        >
          <option value="" className={Style.optionFilter}>
            Sucursales
          </option>
          {sucursales.map((sucursal, index) => (
            <option
              key={index}
              value={sucursal?.nombre_sucursal}
              className={Style.optionFilter}
            >
              {sucursal?.nombre_sucursal}
            </option>
          ))}
        </select>
      )}
      <Paginate
        prevChange={prevPage}
        nextChange={nextPage}
        pages={conditions.page}
        pageTotal={totalPages}
      />
    </div>
  );
}
