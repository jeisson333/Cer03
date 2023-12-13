import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCantidadVendedores,
  getGananciasSucursales,
} from "../../redux/actions";
import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts";

import Cookies from "universal-cookie";
const cookies = new Cookies();

import styles from "./DashboardAdmin.module.css";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const { idBranch } = cookies.get("auth");
  const { gananciaSucursales, cantidadVendedores } = useSelector(
    (state) => state
  );
  // ganancia por sucursales
  const [ganSucOrder, setGanSucOrder] = useState([]);
  const [sucSorted, setSucSorted] = useState([]);
  const [sucOrder, setSucOrder] = useState("");
  const [sucTotal, setSucTotal] = useState(0);

  //cantidad de vendedores por sucursal
  const [cantVendOrder, setCantVendOrder] = useState([]);
  const [vendSorted, setVendSorted] = useState([]);
  const [vendOrder, setVendOrder] = useState("");
  const [vendTotal, setVendTotal] = useState(0);

  useEffect(() => {
    dispatch(getGananciasSucursales(idBranch));
    dispatch(getCantidadVendedores(idBranch));
  }, []);

  useEffect(() => {
    setGanSucOrder([...gananciaSucursales]);
    setCantVendOrder([...cantidadVendedores]);

    setSucSorted(
      [...gananciaSucursales]?.sort((first, second) => {
        return first.total > second.total;
      })
    );

    setVendSorted(
      [...cantidadVendedores]?.sort((first, second) => {
        return first.count > second.count;
      })
    );

    setSucTotal(countTotal(gananciaSucursales, "total"));
    setVendTotal(countTotal(cantidadVendedores, "count"));
  }, [gananciaSucursales, cantidadVendedores]);

  const countTotal = (array, toAccess) => {
    let total = 0;

    array.forEach((element) => {
      total += element[toAccess];
    });

    return total;
  };

  useEffect(() => {
    if (sucOrder) {
      setGanSucOrder(
        [...ganSucOrder]?.sort((first, second) => {
          if (sucOrder === "DESC") return first.total < second.total;
          if (sucOrder === "ASC") return first.total > second.total;
        })
      );
    } else {
      setGanSucOrder([...gananciaSucursales]);
    }
  }, [sucOrder]);

  useEffect(() => {
    if (vendOrder) {
      setCantVendOrder(
        [...cantVendOrder]?.sort((first, second) => {
          if (vendOrder === "DESC") return first.count < second.count;
          if (vendOrder === "ASC") return first.count > second.count;
        })
      );
    } else {
      setCantVendOrder([...cantidadVendedores]);
    }
  }, [vendOrder]);

  const selectHandler = (event) => {
    if (event.target.name === "gananciaSucursales")
      setSucOrder(event.target.value);

    if (event.target.name === "cantidadVendedores")
      setVendOrder(event.target.value);
  };

  return (
    <div>
      {/* ganancia por sucursal */}
      <div className={styles.gananciasGraph}>
        <div>
          <h2>Total vendido por sucursal</h2>
          <ResponsiveContainer width="50%" aspect={2}>
            <BarChart
              data={ganSucOrder}
              width={500}
              height={300}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="4 1 2" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#18a0fb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {sucSorted[0]?.total !==
        sucSorted[gananciaSucursales.length - 1]?.total ? (
          <div className={styles.ganSucDetails}>
            <p>
              <strong>Sucursal con menor ganancia:</strong> {sucSorted[0]?.name}
            </p>
            <p>
              <strong>Sucursal con mayor ganancia:</strong>{" "}
              {sucSorted[gananciaSucursales.length - 1]?.name}
            </p>
          </div>
        ) : null}
        <p>
          <strong>Total juntando todas las sucursales:</strong> ${sucTotal}
        </p>
        {sucSorted[0]?.total !==
        sucSorted[gananciaSucursales.length - 1]?.total ? (
          <div>
            <label>Orden: </label>
            <select
              name="gananciaSucursales"
              onChange={selectHandler}
              value={sucOrder}
            >
              <option value=""></option>
              <option value="ASC">Menor a mayor</option>
              <option value="DESC">Mayor a menor</option>
            </select>
          </div>
        ) : null}
      </div>
      {/* cantidad de vendedores */}
      <div className={styles.gananciasGraph}>
        <div>
          <h2>Cantidad de vendedores por sucursal</h2>
          <ResponsiveContainer width="50%" aspect={2}>
            <BarChart
              data={cantVendOrder}
              width={500}
              height={300}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="4 1 2" />
              <XAxis dataKey="nombre_sucursal" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#18a0fb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {vendSorted[0]?.count !==
        vendSorted[cantidadVendedores.length - 1]?.count ? (
          <div className={styles.ganSucDetails}>
            <p>
              <strong>Sucursal con menor cantidad de empleados:</strong>{" "}
              {vendSorted[0]?.nombre_sucursal}
            </p>
            <p>
              <strong>Sucursal con mayor cantidad de empleados:</strong>{" "}
              {vendSorted[cantidadVendedores.length - 1]?.nombre_sucursal}
            </p>
          </div>
        ) : null}
        <p>
          <strong>Total juntando todas las sucursales:</strong> {vendTotal}{" "}
          vendedores.
        </p>
        {vendSorted[0]?.count !==
        vendSorted[cantidadVendedores.length - 1]?.count ? (
          <div>
            <label>Orden: </label>
            <select
              name="cantidadVendedores"
              onChange={selectHandler}
              value={vendOrder}
            >
              <option value=""></option>
              <option value="ASC">Menor a mayor</option>
              <option value="DESC">Mayor a menor</option>
            </select>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardAdmin;
