import React, { useEffect, useState } from "react";
import axios from "axios";
import FormVendedor from "../../components/FormVendedor/FormVendedor";

const Settings = ({ idBranch }) => {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post("http://localhost:3001/sucursales", {
          id: idBranch,
        });

        setSucursales(data.data);
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);

  return <div>
    <FormVendedor />
  </div>;
};

export default Settings;
