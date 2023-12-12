import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSaleDetail } from "../../redux/actions";

import Style from "./SaleDetail.module.css";

const SaleDetail = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const { saleDetail } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getSaleDetail(id));
  }, []);

  return (
    <div className={Style.container}>
      {/* <h2>{saleDetail.id_venta}</h2> */}
      <h1 className={Style.title}> Detalles Venta</h1>

      <div className={Style.infoSale}>
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
        <table className={Style.table}>
          <thead>
            <tr>
              <th className={Style.cell}>Imagen</th>
              <th className={Style.cell}>Nombre</th>
              <th className={Style.cell}>Peso</th>
              <th className={Style.cell}>Valor venta</th>
              <th className={Style.cell}>Cantidad</th>
              <th className={Style.cell}>Total productos</th>
            </tr>
          </thead>
          <tbody>
            {saleDetail?.details?.map((product, i) => (
              <tr key={i}>
                <td className={Style.cell}>
                  <img
                    className={Style.imagen}
                    src={product.PRODUCTO.image}
                    alt={product.PRODUCTO.id_producto}
                  />
                </td>
                <td className={Style.cell}>
                  {product.PRODUCTO.nombre_producto}
                </td>
                <td className={Style.cell}>{product.PRODUCTO.peso}</td>
                <td className={Style.cell}>{product.PRODUCTO.valor_venta}</td>
                <td className={Style.cell}>{product.cantidad_producto}</td>
                <td className={Style.cell}>
                  ${product.PRODUCTO.valor_venta * product.cantidad_producto}
                </td>
              </tr>
            ))}
            <tr>
              <td className={Style.cell}></td>
              <td className={Style.cell}></td>
              <td className={Style.cell}></td>
              <td className={Style.cell}></td>
              <td className={Style.cell}>
                <strong>Total Vendido:</strong>
              </td>
              <td className={Style.cell}>${saleDetail?.totalValue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleDetail;
