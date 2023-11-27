import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getTypeProducts,
  filterTemperamentAction,
  postProductName,
  postOrderProducts,
} from "../../redux/actions";
import Style from "./inventory.module.css";
import { Link } from "react-router-dom";
import Paginate from "../../components/Paginate/Paginate";
import Search from "../../components/SearchBar/SearchBar";

const Inventory = ({ idBranch }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const allTypeProduct = useSelector((state) => state.allTypeProducts);
  const [search, setSearch] = useState("");
  const [info, setInfo] = useState({
    count: 0,
    currentPage: 1,
    pages: 1,
  });
  useEffect(() => {
    dispatch(getProducts(idBranch));
    dispatch(getTypeProducts());
  }, []);

  const filterTypeProducts = (event) => {
    if (event.target.value === "all") {
      dispatch(getProducts(idBranch));
    } else {
      dispatch(filterTemperamentAction(event.target.value, idBranch));
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postProductName(search, idBranch));
  };
  const orderProducts = (event) => {
    if (event.target.value === "nombre_producto") {
      dispatch(postOrderProducts("nombre_producto", "", idBranch));
    } else if (event.target.value === "DESC") {
      dispatch(postOrderProducts("nombre_producto", "DESC", idBranch));
    } else {
      dispatch(postOrderProducts("", "", idBranch));
    }
  };
  //pages
  const prevPage = () => {
    if (info.currentPage > 1)
      setInfo({ ...info, currentPage: info.currentPage - 1 });
  };

  const nextPage = () => {
    if (info.currentPage < info.pages)
      setInfo({ ...info, currentPage: info.currentPage + 1 });
  };

  return (
    <div className={Style.divMain}>
      <h1>Inventario</h1>
      <div className={Style.filtrosContainer}>
        <Search
          className={Style.searchInput}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <select onChange={filterTypeProducts} className={Style.buttons}>
          <option value="all">Ver todos los productos</option>
          {allTypeProduct.map((p) => (
            <option key={p.id_catalogo} value={p.nombre_catalogo}>
              {p.nombre_catalogo}
            </option>
          ))}
        </select>
        <select onChange={orderProducts} className={Style.buttons}>
          <option value="all">Ordenar: Por defecto</option>
          <option value="nombre_producto">A-Z</option>
          <option value="DESC">Z-A</option>
        </select>
      </div>
      <div className={Style.cardContainer}>
        {products?.map((product, i) => (
          <div key={i} className={Style.card}>
            <Link
              to={`/detail/?name=${product?.PRODUCTO?.nombre_producto}&sucursal=${product?.SUCURSAL?.nombre_sucursal}`}
            >
              <img
                src={product?.PRODUCTO?.image}
                alt={product?.PRODUCTO?.nombre_producto}
              />
              <div className={Style.cardDetails}>
                <h2>{product?.PRODUCTO?.nombre_producto}</h2>
                <p>Precio: ${product?.PRODUCTO?.valor_venta}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* <button>Anterior</button>
      <label htmlFor="page">Page: </label>
      <button>Siguiente</button> */}
      <div className={Style.filtrosContainer}>
        <Paginate
          prevChange={prevPage}
          nextChange={nextPage}
          pages={info.currentPage}
          pageTotal={info.pages}
        />
      </div>
    </div>
  );
};

export default Inventory;
