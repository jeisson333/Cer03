import { useEffect, useState } from "react";
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

import styles from "./Graph.module.css";

export default function Graph({ data, dataType, type }) {
  //   const data = [
  //     { sucursal: "JUMBO FORMOSA", totalVendido: 10000 },
  //     { sucursal: "JUMBO SALTA", totalVendido: 3000 },
  //     { sucursal: "JUMBO CORDOBA", totalVendido: 70000 },
  //   ];
  const [gananciaSucursales, setGananciaSucursales] = useState([]);

  useEffect(() => {
    if (type === "ganancia-sucursales" && dataType === "object") {
      for (let key in data) {
        setGananciaSucursales([
          ...gananciaSucursales,
          {
            name: data[key].nombre,
            value: data[key].total,
          },
        ]);
      }
    }
    console.log(gananciaSucursales);
  }, [data]);
  console.log(data);

  return (
    <ResponsiveContainer width="50%" aspect={2}>
      <BarChart
        data={data}
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
        <XAxis dataKey="sucursal" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalVendido" fill="#18a0fb" />
      </BarChart>
    </ResponsiveContainer>
  );
}
