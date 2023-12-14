import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalEmpresas } from "../../redux/actions";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";
import { Link } from "react-router-dom";
import Styles from "./DashboardDeveloper.module.css";

const DashboardDeveloper = () => {
  const dispatch = useDispatch();
  const { totalEmpresas } = useSelector((state) => state);
  const [select, setSelect] = useState("");
  const [sucursales, setSucursales] = useState([]);
  const [cantidadTotalEmpresa, setCantidadTotalEmpresa] = useState(0);
  const [cantidadTotalSucursales, setCantidadTotalSucursales] = useState(0);

  useEffect(() => {
    dispatch(getTotalEmpresas());
  }, []);

  useEffect(() => {
    if (totalEmpresas.length) {
      setSelect(totalEmpresas[0]?.nombre_empresa);
      setCantidadTotalEmpresa(totalEmpresas.length);

      let total = 0;
      totalEmpresas.forEach((empresa) => (total += empresa.count));
      setCantidadTotalSucursales(total);
    }
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

  const COLORS = [
    "#ce93d8",
    "#5c6bc0",
    "#b39ddb",
    "#4dd0e1",
    "#f48fb1",
    "#d500f9",
  ];

  return (
    <div className="flex justify-center">
      <div className={Styles.conteiner}>
        <div className={Styles.title}>
          Total de empresas + Total de sucursales
        </div>
        <div style={{ width: "80%", height: 300 }}>
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
        </div>
        <div className={Styles.contenido}>
          <p>Cantidad total de empresas: {cantidadTotalEmpresa}</p>
          <p>Cantidad total de sucursales: {cantidadTotalSucursales}</p>
          <p>
            La empresa{" "}
            <select
              name="empresa"
              onChange={selectHandler}
              value={select}
              className={Styles.select}
            >
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
        <div>
          <button className={Styles.banBTN}>
            <Link to="/to-ban">Banear empresa</Link>
          </button>
          <button className={Styles.restBTN}>
            <Link to="/to-restore">Restaurar empresa</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardDeveloper;
