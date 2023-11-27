import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { getProducts, getTypeProducts, filterTemperamentAction,postProductName } from '../../redux/actions'
import Style from "./inventory.module.css";
import { Link } from "react-router-dom";
import { FaListOl } from "react-icons/fa6";
import { FaFilterCircleDollar } from "react-icons/fa6";
import Search from "../../components/SearchBar/SearchBar";

const Inventory = ({ idBranch }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const allTypeProduct = useSelector((state) => state.allTypeProducts)

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProducts(idBranch));
    dispatch(getTypeProducts());
  }, []);

  const filterTypeProducts = (event) => {
    if (event.target.value === "all") {
      dispatch(getProducts(idBranch));
    }
    else {
      dispatch(filterTemperamentAction(event.target.value, idBranch))
    }
  }

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postProductName(search,idBranch))
  }

  return (
    <div>
      <h1>Inventario</h1>
      <div className={Style.filtrosContainer}>

        <select onChange={filterTypeProducts} className={Style.buttons}>
          <option value="all">Ver todos los productos</option>
          {allTypeProduct.map((p) => (
            <option key={p.id_catalogo} value={p.nombre_catalogo}>{p.nombre_catalogo}</option>
          ))}
        </select>
        <button className={Style.buttons}><FaListOl /> Ordenar</button>
        <Search className={Style.searchInput} handleChange={handleChange} handleSubmit={handleSubmit} />


      </div>
      <div className={Style.cardContainer}>
        {products?.map((product, i) => (

          <div key={i} className={Style.card}>
            <Link to={`/detail/?name=${product?.PRODUCTO?.nombre_producto}&sucursal=${product?.SUCURSAL?.nombre_sucursal}`}>
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
    </div>
  );
};

export default Inventory;
