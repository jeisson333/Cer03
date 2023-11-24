import Cards from "../../components/Cards/Cards.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import Paginate from "../../components/Paginate/Paginate.jsx";
import style from "./Sales.module.css";
import usePage from "../../components/utils/UsagePage.jsx";
import Search from "../../components/SearchBar/SearchBar.jsx";

const Sales = () => {
  const { changeNext, changePrev, paginate, count, totPagine } = usePage();

  return (
    <div className={style.contenSales}>
      <NavBar />
      <SearchBar />
      <div className={style.salesPage}>
        <Paginate
          prevChange={changePrev}
          nextChange={changeNext}
          pages={count}
          pageTotal={totPagine}
        />
      </div>

      <Cards products={paginate} />
    </div>
  );
};

export default Sales;
