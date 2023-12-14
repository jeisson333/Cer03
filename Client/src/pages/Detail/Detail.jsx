/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Rotate } from "react-awesome-reveal";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import style from "../Detail/Detail.module.css";
import EditProduct from "./EditProduct";
import { BsShop } from "react-icons/bs";
const cookies = new Cookies();

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idBranch, branch } = cookies.get("auth");
  const { msg } = useSelector((state) => state);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get("name");
  const sucursal = query.get("sucursal");
  const url = import.meta.env.VITE_BASE_URL;
  const [product, setProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState(false);
  const sucursales = useSelector((state) => state.sucursales);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `${url}/products?name=${name}&sucursal=${sucursal}`,
          {
            id: idBranch,
          }
        );
        setProducts(data.data);
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);
  const modalEditProduc = async () => {
    setModalProduct(!modalProduct);
    try {
      const { data } = await axios.post(
        `${url}/products?name=${name}&sucursal=${sucursal}`,
        {
          id: idBranch,
        }
      );
      setProducts(data.data);
    } catch (error) {
      throw Error(error.message);
    }
  };

  const handleDeleteProduct = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        // Si el usuario ha confirmado, ejecuta la acción de borrar el producto
        dispatch(deleteProduct(product[0]?.PRODUCTO?.id_producto, branch));
        setProducts({});
        navigate("/products");
      }
    });
  };

  return (
    <div className={style.containerPrincipal}>
      <div className={style.containerInfo}>
        <div className={style.containerImage}>
          <img
            className={style.image}
            src={product[0]?.PRODUCTO?.image}
            alt={product[0]?.PRODUCTO?.nombre_producto}
            style={{ maxWidth: "300px", maxHeight: "250px" }}
          />
        </div>

        <div className={style.infoProduct}>
          <div>
            <h2 className={style.tittle}>
              {product[0]?.PRODUCTO?.nombre_producto}
            </h2>
            <p className={style.parrafoInfo}>
              <BsShop />
              Sucursal: {product[0]?.SUCURSAL.nombre_sucursal}
            </p>
            <p className={style.parrafoInfo}>
              Tipo de producto:{" "}
              {product[0]?.PRODUCTO?.CATALOGO_UNIVERSAL?.nombre_catalogo}
            </p>
            <p className={style.parrafoInfo}>
              Stock/Cantidad: {product[0]?.stock}
            </p>
            <p className={style.parrafoInfo}>
              Peso(gr): {product[0]?.PRODUCTO?.peso}
            </p>
            <p className={style.parrafoInfo}>
              Precio Compra: ${product[0]?.PRODUCTO?.valor_compra}
            </p>
            <p className={style.parrafoInfo}>
              Precio Venta: ${product[0]?.PRODUCTO?.valor_venta}
            </p>
            <button
              onClick={modalEditProduc}
              className={`${style.buttons} mr-6`}
            >
              Agregar Stock
            </button>
            <button className={style.buttons} onClick={handleDeleteProduct}>
              Eliminar
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
      <div className={modalProduct ? style.container : style.closedModal}>
        <EditProduct
          product={product[0]}
          sucursales={sucursales}
          modalEditProduc={modalEditProduc}
        />
      </div>
    </div>
  );
};

export default Detail;
