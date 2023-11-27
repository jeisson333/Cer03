import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getTypeProducts } from "../../redux/actions";
import { Link } from "react-router-dom";
import Paginate from "../../components/Paginate/Paginate";
import { FaListOl } from "react-icons/fa6";
import { FaFilterCircleDollar } from "react-icons/fa6";
import Style from "./inventory.module.css";

const Inventory = ({ idBranch }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [info, setInfo] = useState({
    count: 0, //count en caso de que se quiera mostrar la cantidad de productos
    currentPage: 1,
    pages: 1,
  });

  const allTypeProduct = useSelector((state) => state.allTypeProducts);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3001/products?page_size=5",
          {
            id: idBranch,
          }
        );

        setProducts(data.data);
        setInfo({ ...data.info });
      } catch (error) {
        throw Error(error.message);
      }
    })();
    dispatch(getTypeProducts());
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:3001/products?page_size=5&page=${info.currentPage}`,
          {
            id: idBranch,
          }
        );

        setProducts(data.data);
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, [info.currentPage]);

  //pages handlers
  const prevPage = () => {
    if (info.currentPage > 1)
      setInfo({ ...info, currentPage: info.currentPage - 1 });
  };

  const nextPage = () => {
    if (info.currentPage < info.pages)
      setInfo({ ...info, currentPage: info.currentPage + 1 });
  };

  return (
    <div>
      <h1>Inventario</h1>
      <div className={Style.filtrosContainer}>
        <button className={Style.buttons}>
          <FaFilterCircleDollar /> Filtrar
        </button>
        <button className={Style.buttons}>
          <FaListOl /> Ordenar
        </button>
        <input
          type="search"
          placeholder="Buscar concepto..."
          className={Style.searchInput}
        />
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
      <Paginate
        prevChange={prevPage}
        nextChange={nextPage}
        pages={info.currentPage}
        pageTotal={info.pages}
      />
    </div>
  );
};

export default Inventory;
