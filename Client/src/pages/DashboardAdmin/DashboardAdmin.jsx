import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getGananciasSucursales } from "../../redux/actions";
import Cookies from "universal-cookie";
import Graph from "../../components/Graph/Graph";
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

const cookies = new Cookies();
const baseUrl = import.meta.env.VITE_BASE_URL;

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const { idBranch } = cookies.get("auth");
  const { gananciaSucursales } = useSelector((state) => state);
  const [auxiliar, setAuxiliar] = useState([]);

  useEffect(() => {
    dispatch(getGananciasSucursales(idBranch));
  }, []);

  useEffect(() => {}, [auxiliar]);
  console.log(gananciaSucursales);
  return (
    <div>
      {/* <Graph
        data={gananciasSucursales}
        dataType="object"
        type="ganancia-sucursales"
      /> */}
      <div>
        <h2>Total vendido por sucursal</h2>
        <ResponsiveContainer width="50%" aspect={2}>
          <BarChart
            data={gananciaSucursales}
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
    </div>
  );
};

export default DashboardAdmin;
