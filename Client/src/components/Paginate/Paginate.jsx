import style from "./Paginate.module.css";

const Paginate = ({ prevChange, nextChange, pages, pageTotal }) => {
  return (
    <div className={style.container}>
      <button
        onClick={prevChange}
        disabled={pages === 1}
        className={style.buttons}
      >
        Prev
      </button>

      <span className={style.spans}>
        Page {pages} of {pageTotal}
      </span>

      <button
        onClick={nextChange}
        disabled={pages === pageTotal || pageTotal === 0}
        className={style.buttons}
      >
        Next
      </button>
    </div>
  );
};
export default Paginate;
