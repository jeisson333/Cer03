import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Settings = () => {
  const [sucursales, setSucursales] = useState([]);
  const url = import.meta.env.VITE_BASE_URL;
  const { idBranch } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(`${url}/sucursales`, {
          id: idBranch,
        });
        console.log(data);
        setSucursales(data.data);
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);

  return (
    <div>
      {sucursales.map((sucursal, index) => (
        <h3 key={index}>{sucursal?.nombre_sucursal}</h3>
      ))}
    </div>
  );
};

export default Settings;
