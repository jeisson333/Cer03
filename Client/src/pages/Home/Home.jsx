import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { somethingReview } from "../../redux/actions";
import axios from "axios";
import styles from "./Home.module.css";
const url = import.meta.env.VITE_BASE_URL;
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Home() {
  const dispatch = useDispatch();
  const [sales, setSales] = useState([]);
  const { idBranch, role, branch } = cookies.get("auth");
  useEffect(() => {
    (async () => {
      try {
        dispatch(somethingReview(idBranch, "find", null));
        if (role === "admin") {
          const { data } = await axios.post(
            `${url}/ventas?orderName=createdAt&order=DESC`,
            {
              id: idBranch,
            }
          );
          setSales(data.data);
        } else {
          const { data } = await axios.post(
            `${url}/ventas?sucursal=${branch}&orderName=createdAt&order=DESC`,
            {
              id: idBranch,
            }
          );
          setSales(data.data);
        }
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.movimientos}`}>
        <h2>Movimientos</h2>
      </div>
      <div className={styles.divider}></div>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Fecha</th>
            {role === "admin" && <th>Sucursal</th>}
            <th>Metodo de Pago</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((producto) => (
            <tr key={producto["VENTum.id_venta"]}>
              <td>
                {new Date(producto["VENTum.createdAt"])?.toLocaleString()}
              </td>
              {role === "admin" && (
                <td>{producto["VENTum.SUCURSAL.nombre_sucursal"]}</td>
              )}
              <td>
                {/* {`${producto[
                  "VENTum.CATALOGO_UNIVERSAL.nombre_catalogo"
                ][0].toUpperCase()}${producto[
                  "VENTum.CATALOGO_UNIVERSAL.nombre_catalogo"
                ].slice(1)}`} */}
                {producto[
                  "VENTum.CATALOGO_UNIVERSAL.nombre_catalogo"
                ].toUpperCase()}
              </td>
              <td>
                <Link to={`/home/${producto["VENTum.id_venta"]}`}>
                  <button>Detalles</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
