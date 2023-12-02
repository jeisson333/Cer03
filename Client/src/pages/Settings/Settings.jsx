import { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import FormVendedor from "../../components/FormVendedor/FormVendedor";
=======
import { useSelector } from "react-redux";
>>>>>>> fd7b3994387e56421fd9bfb68122bb1349957959

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

<<<<<<< HEAD
  return <div>
    <FormVendedor />
  </div>;
=======
  return (
    <div>
      {sucursales.map((sucursal, index) => (
        <h3 key={index}>{sucursal?.nombre_sucursal}</h3>
      ))}
    </div>
  );
>>>>>>> fd7b3994387e56421fd9bfb68122bb1349957959
};

export default Settings;
