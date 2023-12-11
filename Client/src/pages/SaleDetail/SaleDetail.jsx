import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSaleDetail } from "../../redux/actions";

import styles from "./SaleDetail.module.css";

const SaleDetail = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const { saleDetail } = useSelector((state) => state);

  useEffect(() => {
    if (id) dispatch(getSaleDetail(id));
  }, []);
  console.log(saleDetail.details);
  return (
    <div>
      {/* <h2>{saleDetail.id_venta}</h2> */}
      <h2>{saleDetail["CATALOGO_UNIVERSAL.nombre_catalogo"]?.toUpperCase()}</h2>
      <h2>{saleDetail?.createdAt}</h2>
      <h2>{saleDetail["SUCURSAL.nombre_sucursal"]}</h2>
      <div>
        {saleDetail?.details?.map((product) => (
          <div key={product.id_detalles_venta} className={styles.product}>
            <img
              src={product.PRODUCTO.image}
              alt={product.PRODUCTO.id_producto}
            />
            <h2>{product.PRODUCTO.nombre_producto}</h2>
            <h2>{product.PRODUCTO.peso}</h2>
            <h2>{product.PRODUCTO.valor_venta}</h2>
            <h2>{product.cantidad_producto}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaleDetail;
