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
    dispatch(getSaleDetail(id));
  }, []);

  return (
    <div>
      <h2>{saleDetail.id_venta}</h2>
      <h2>{saleDetail.metodo_pago}</h2>
      <h2>{saleDetail.createdAt}</h2>
      <h2>{saleDetail.venta_sucursal}</h2>
      <div>
        {saleDetail?.DETALLES_VENTA.map((product) => (
          <div key={product.PRODUCTO.id_producto} className={styles.product}>
            <img
              src={product.PRODUCTO.image}
              alt={product.PRODUCTO.nombre_producto}
            />
            <h2>{product.PRODUCTO.nombre_producto}</h2>
            <h2>{product.PRODUCTO.valor_venta}</h2>
            <h2>{product.PRODUCTO.tipo_producto}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaleDetail;
