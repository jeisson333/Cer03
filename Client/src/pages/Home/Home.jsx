import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
const url = import.meta.env.VITE_BASE_URL;
import { NavLink, Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Home() {
  const [sales, setSales] = useState([]);
  const { idBranch } = cookies.get("auth");
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(`${url}/ventas`, {
          id: idBranch,
        });
        setSales(data.data);
        sales.forEach((sale) => {
          console.log(Object.keys(sale));
        });
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.movimientos}`}>
        <h2>Movimientos</h2>

        <NavLink className={styles.buttonNv} to="/newsales">
          Nueva venta
        </NavLink>
      </div>
      <div className={styles.divider}></div>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Valor $</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((producto) => (
            <tr key={producto["VENTum.id_venta"]}>
              <td>
                {new Date(producto["VENTum.createdAt"])?.toLocaleString()}
              </td>
              <td>
                {`${producto[
                  "VENTum.CATALOGO_UNIVERSAL.nombre_catalogo"
                ][0].toUpperCase()}${producto[
                  "VENTum.CATALOGO_UNIVERSAL.nombre_catalogo"
                ].slice(1)}`}
              </td>
              <td>
                <Link to="/home">
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
