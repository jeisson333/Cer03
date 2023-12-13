/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import axios from "axios";
import FormVendedor from "../../components/FormVendedor/FormVendedor";
import Graph from "../../components/Graph/Graph";

export default function experiments() {
  // const [test, setTest] = useState("");
  // useEffect(() => {
  //   axios
  //     .post(`http://localhost:3001/ventas`, {
  //       id: "6f722d7f-515b-4705-a007-84b07317cc20",
  //     })
  //     .then(({ data }) => {
  //       console.log(typeof data?.data, data?.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div>
      <div>
        <Graph
          data1={12}
          data2={16}
          data3={5}
          value1={"Dato1"}
          value2={"Dato2"}
          value3={"Dato3"}
        />
      </div>
    </div>
    // <div>
    //   <Loading/>
    // </div>
  );
}
