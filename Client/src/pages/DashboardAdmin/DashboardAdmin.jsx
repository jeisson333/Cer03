import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGananciasSucursales } from "../../redux/actions";
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
  const { gananciaSucursales } = useSelector((state) => state);
  const [ganSucOrder, setGanSucOrder] = useState([]);
  const [extremes, setExtremes] = useState({});
  const [sorted, setSorted] = useState([]);
  const [orderSelect, setOrderSelect] = useState("");

  useEffect(() => {
    dispatch(getGananciasSucursales(idBranch));
  }, []);

  useEffect(() => {
    setGanSucOrder([...gananciaSucursales]);

    setSorted(
      [...gananciaSucursales]?.sort((first, second) => {
        return first.total > second.total;
      })
    );

    setExtremes({
      minName: sorted[0]?.name,
      maxname: sorted[gananciaSucursales.length - 1]?.name,
    });
  }, [gananciaSucursales]);

  useEffect(() => {
    if (orderSelect) {
      setGanSucOrder(
        [...ganSucOrder]?.sort((first, second) => {
          if (orderSelect === "DESC") return first.total < second.total;
          if (orderSelect === "ASC") return first.total > second.total;
        })
      );
    } else {
      setGanSucOrder([...gananciaSucursales]);
    }
  }, [orderSelect]);

  const selectHandler = (event) => {
    setOrderSelect(event.target.value);
  };

  return (
    <div>
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
        <div className={styles.ganSucDetails}>
          <p>
            <strong>Sucursal con menor ganancia:</strong> {extremes.minName}
          </p>
          <p>
            <strong>Sucursal con mayor ganancia:</strong> {extremes.maxname}
          </p>
        </div>
        <div>
          <label>Orden: </label>
          <select
            name="gananciaSucursales"
            onChange={selectHandler}
            value={orderSelect.order}
          >
            <option value=""></option>
            <option value="ASC">Menor a mayor</option>
            <option value="DESC">Mayor a menor</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
