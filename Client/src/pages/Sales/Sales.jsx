import Cards from "../../components/Card/Card";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Paginate from "../../components/Paginate/Paginate.jsx";
import usePage from "../../components/utils/UsagePage.jsx";
// import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";

import style from "./Sales.module.css";

const Sales = ({ idBranch }) => {
  // const { changeNext, changePrev, paginate, count, totPagine } = usePage();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post("http://localhost:3001/ventas", {
          id: idBranch,
        });

        setSales(data.data);
      } catch (error) {
        throw Error(error.message);
      }
    })();
  }, []);

  return (
    <div className={style.contenSales}>
      {/* <NavBar /> */}
      {/* <SearchBar /> */}
      {/* <div className={style.salesPage}>
        <Paginate
          prevChange={changePrev}
          nextChange={changeNext}
          pages={count}
          pageTotal={totPagine}
        />
      </div> */}

      {/* <Cards products={paginate} /> */}
    </div>
  );
};

export default Sales;
