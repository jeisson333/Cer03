import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getTypeProducts,
  filterTemperamentAction,
  postProductName,
  postOrderProducts,
  filter,
  handlerPages,
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
  // const [info, setInfo] = useState({
  //   count: 0, //count en caso de que se quiera mostrar la cantidad de productos
  //   currentPage: 1,
  //   pages: 1,
  // });

  const pages = useSelector((state) => state.pages);
  const [currentPage, setCurrentPage] = useState(1);

  //type and order
  const [options, setOptions] = useState({
    type: "",
    orderName: "nombre_producto",
    order: "",
    name: "",
    page: 1,
  });

  const [conditions, setConditions] = useState("");

  useEffect(() => {
    dispatch(filter(conditions, idBranch));
  }, [options.type, options.order, options.name, options.page, conditions]);

  const handlertype = (event) => {
    setOptions({
      ...options,
      [event.target.name]: event.target.value,
      page: 1,
    });
    setCurrentPage(1);
    setConditions(
      `?type=${event.target.value}&order=${options.order}&name=${options.name}&orderName=${options.orderName}&page=${currentPage}`
    );
  };

  const handlerOrder = (event) => {
    setOptions({
      ...options,
      [event.target.name]: event.target.value,
      page: 1,
    });
    setCurrentPage(1);
    setConditions(
      `?type=${options.type}&order=${event.target.value}&name=${options.name}&orderName=${options.orderName}&page=${currentPage}`
    );
  };

  useEffect(() => {
    dispatch(getProducts(idBranch));
    dispatch(getTypeProducts());
  }, []);

  const typeTypeProducts = (event) => {
    dispatch(typeTemperamentAction(event.target.value, idBranch));
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOptions({
      ...options,
      name: search,
      page: 1,
    });
    setCurrentPage(1);
    setConditions(
      `?type=${options.type}&order=${options.order}&name=${search}&orderName=${options.orderName}&page=${currentPage}`
    );
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
    if (currentPage > 1) {
      setOptions({
        ...options,
        page: options.page - 1,
      });
      setCurrentPage(currentPage - 1);
      setConditions(
        `?type=${options.type}&order=${options.order}&name=${options.name}&orderName=${options.orderName}&page=${currentPage}`
      );
    }
  };

  const nextPage = () => {
    if (currentPage <= pages) {
      setOptions({
        ...options,
        page: options.page + 1,
      });
      setCurrentPage(currentPage + 1);
      setConditions(
        `?type=${options.type}&order=${options.order}&name=${options.name}&orderName=${options.orderName}&page=${currentPage}`
      );
    }
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
        <select name="type" onChange={handlertype} className={Style.buttons}>
          <option value="">Ver todos los productos</option>
          {allTypeProduct.map((p) => (
            <option key={p.id_catalogo} value={p.nombre_catalogo}>
              {p.nombre_catalogo}
            </option>
          ))}
        </select>
        <select name="order" onChange={handlerOrder} className={Style.buttons}>
          <option value="">Ordenar: Por defecto</option>
          <option value="ASC">A-Z</option>
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
          pages={currentPage}
          pageTotal={pages}
        />
      </div>
    </div>
  );
};

export default Inventory;
