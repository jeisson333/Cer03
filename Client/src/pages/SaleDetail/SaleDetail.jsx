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

      <div className={styles.infoSale}>
        <h2>
          <strong>Fecha: </strong>
          {new Date(saleDetail?.createdAt)?.toLocaleString()}
        </h2>
        <h2>
          <strong>Sucursal: </strong>
          {saleDetail["SUCURSAL.nombre_sucursal"]}
        </h2>
        <h2>
          <strong>Metodo de pago: </strong>
          {saleDetail["CATALOGO_UNIVERSAL.nombre_catalogo"]?.toUpperCase()}
        </h2>
      </div>

      <div className="flex justify-center">
        <table className="table-auto border-collapse border border-blue-800">
          <thead>
            <tr>
              <th className="border border-black-600 p-3">Imagen</th>
              <th className="border border-black-600 p-3">Nombre</th>
              <th className="border border-black-600 p-3">Peso</th>
              <th className="border border-black-600 p-3">Valor venta</th>
              <th className="border border-black-600 p-3">Cantidad</th>
              <th className="border border-black-600 p-3">Total productos</th>
            </tr>
          </thead>
          <tbody>
            {saleDetail?.details?.map((product, i) => (
              <tr key={i}>
                <td className="border border-black-600 p-3">
                  <img
                    className={styles.imagen}
                    src={product.PRODUCTO.image}
                    alt={product.PRODUCTO.id_producto}
                  />
                </td>
                <td className="border border-black-600 p-3">
                  {product.PRODUCTO.nombre_producto}
                </td>
                <td className="border border-black-600 p-3">
                  {product.PRODUCTO.peso}
                </td>
                <td className="border border-black-600 p-3">
                  {product.PRODUCTO.valor_venta}
                </td>
                <td className="border border-black-600 p-3">
                  {product.cantidad_producto}
                </td>
                <td className="border border-black-600 p-3">
                  ${product.PRODUCTO.valor_venta * product.cantidad_producto}
                </td>
              </tr>
            ))}
            <tr>
              <td className="border border-black-600 p-3"></td>
              <td className="border border-black-600 p-3"></td>
              <td className="border border-black-600 p-3"></td>
              <td className="border border-black-600 p-3"></td>
              <td className="border border-black-600 p-3">
                <strong>Total Vendido:</strong>
              </td>
              <td className="border border-black-600 p-3">
                ${saleDetail?.totalValue}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleDetail;
