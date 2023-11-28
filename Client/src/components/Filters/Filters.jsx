/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypeProducts } from "../../redux/actions";

//components
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";

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
    <div>
      <SearchBar handlerChange={handlerChange} handlerSubmit={handlerSubmit} />
      <select name="type" onChange={handlerConditions}>
        <option value="">Tipo De Producto</option>
        {allTypeProduct.map((type, index) => (
          <option key={index} value={type?.nombre_catalogo}>
            {type?.nombre_catalogo}
          </option>
        ))}
      </select>
      <select name="orderName" onChange={handlerConditions}>
        <option value="">Ordenar segun</option>
        <option value="valor_venta">Precio de venta</option>
        <option value="valor_compra">Precio de compra</option>
        <option value="nombre_producto">Nombre del producto</option>
      </select>
      <select name="order" onChange={handlerConditions}>
        <option value="">Tipo de orden</option>
        <option value="ASC">Ascendente</option>
        <option value="DESC">Descendente</option>
      </select>
      <select name="sucursal" onChange={handlerConditions}>
        <option value="">Sucursales</option>
        {sucursales.map((sucursal, index) => (
          <option key={index} value={sucursal?.nombre_sucursal}>
            {sucursal?.nombre_sucursal}
          </option>
        ))}
      </select>
      <Paginate
        prevChange={prevPage}
        nextChange={nextPage}
        pages={conditions.page}
        pageTotal={totalPages}
      />
    </div>
  );
}
