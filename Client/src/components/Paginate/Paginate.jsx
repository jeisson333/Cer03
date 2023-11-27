import style from "./Paginate.module.css";

const Paginate = ({ prevChange, nextChange, pages, pageTotal }) => {
  return (
    <div className={style.button}>
      <button onClick={prevChange}>Prev</button>

      <span>
        Page {pages} of {pageTotal}
      </span>

      <button onClick={nextChange}>Next</button>
    </div>
  );
};
export default Paginate;
