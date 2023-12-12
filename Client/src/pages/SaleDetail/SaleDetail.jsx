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
    <div className={styles.container}>
      {/* <h2>{saleDetail.id_venta}</h2> */}
      <h1 className={styles.title}> Detalles Venta</h1>
      <div className={styles.productChart}>
        <div className={styles.tableHeader}>
        <h1 className={styles.imageText}>Imagen</h1>
        <h1 className={styles.name}>Nombre</h1>
        <h1 className={styles.name}>Peso</h1>
        <h1 className={styles.name}>Valor venta</h1>
        <h1 className={styles.name}>Cantidad</h1>
        <h1 className={styles.name}>Total productos</h1>
        </div>  
        {saleDetail?.details?.map((product) => (
          <div key={product.id_detalles_venta} className={styles.product}>
            <img
              className={styles.imagen}
              src={product.PRODUCTO.image}
              alt={product.PRODUCTO.id_producto}
            />
            <div className={styles.infoContainer}>
            <h2>{product.PRODUCTO.nombre_producto}</h2>
            </div>

            <div className={styles.digitContainer}>
            <h2>{product.PRODUCTO.peso}</h2>
            </div>
            
            <div className={styles.digitContainer}>
            <h2>{product.PRODUCTO.valor_venta}</h2>
            </div>
            
            <div className={styles.digitContainer}>
            <h2>{product.cantidad_producto}</h2>
            </div>
            
            <div className={styles.digitContainer}>
            <h2>${product.PRODUCTO.valor_venta * product.cantidad_producto}</h2>
            </div>
            
          </div>
        ))}
        <div className={styles.infoSale}>
        <h2>{saleDetail["CATALOGO_UNIVERSAL.nombre_catalogo"]?.toUpperCase()}</h2>
        <h2>{new Date(saleDetail?.createdAt)?.toLocaleString()}</h2>
        <h2>{saleDetail["SUCURSAL.nombre_sucursal"]}</h2>
        <h2><strong>Total Vendido:</strong> ${saleDetail?.totalValue}</h2>
        </div>
      </div>
    </div>
  );
};

export default SaleDetail;
