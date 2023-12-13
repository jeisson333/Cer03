import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalEmpresas } from "../../redux/actions";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";

const DashboardDeveloper = () => {
  const dispatch = useDispatch();
  const { totalEmpresas } = useSelector((state) => state);
  const [select, setSelect] = useState("");
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    dispatch(getTotalEmpresas());
  }, []);

  useEffect(() => {
    if (totalEmpresas) setSelect(totalEmpresas[0]?.nombre_empresa);
  }, [totalEmpresas]);

  const selectHandler = (event) => {
    setSelect(event.target.value);
  };

  useEffect(() => {
    if (totalEmpresas && select) {
      setSucursales(
        (totalEmpresas?.find((empresa) => empresa.nombre_empresa === select))
          .sucursales
      );
    }
  }, [select]);
  // console.log(sucursales);
  const COLORS = [
    "#ce93d8",
    "#5c6bc0",
    "#b39ddb",
    "#4dd0e1",
    "#f48fb1",
    "#d500f9",
  ];

  return (
    <div>
      <div style={{ width: "90%", height: 300 }}>
        <h2>Total de empresas + Total de sucursales</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="count"
              nameKey="nombre_empresa"
              data={totalEmpresas}
              innerRadius={60}
              outerRadius={110}
              fill="#82ca9d"
            >
              {totalEmpresas.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div>
          <p>
            La empresa{" "}
            <select name="empresa" onChange={selectHandler} value={select}>
              {totalEmpresas?.map((empresa) => (
                <option value={empresa.nombre_empresa}>
                  {empresa.nombre_empresa}
                </option>
              ))}
            </select>{" "}
            tiene las siguientes sucursales:{" "}
            {sucursales?.map((sucursal, i) => {
              if (i !== sucursales.length - 1) return `${sucursal}, `;
              else return `${sucursal}.`;
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardDeveloper;
