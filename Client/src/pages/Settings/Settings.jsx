import { useEffect, useState } from "react";
import axios from "axios";
import FormVendedor from "../../components/FormVendedor/FormVendedor";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Settings = () => {
  const [sucursales, setSucursales] = useState([]);
  const url = import.meta.env.VITE_BASE_URL;
  const { idBranch } = cookies.get("auth");

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
      <FormVendedor />
    </div>
  );

  // return (
  //   <div>
  //     {sucursales.map((sucursal, index) => (
  //       <h3 key={index}>{sucursal?.nombre_sucursal}</h3>
  //     ))}
  //   </div>
  // );
};

export default Settings;
