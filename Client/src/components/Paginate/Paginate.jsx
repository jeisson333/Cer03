import style from "./Paginate.module.css";

const Paginate = ({ prevChange, nextChange, pages, pageTotal }) => {
  return (
    <div className={style.button}>
      <button onClick={prevChange} disabled={pages === 1}>
        Prev
      </button>

      <span>
        Page {pages} of {pageTotal}
      </span>

      <button
        onClick={nextChange}
        disabled={pages === pageTotal || pageTotal === 0}
      >
        Next
      </button>
    </div>
  );
};
// Paginate.propTypes = {
//   prevChange: PropTypes.func.isRequired,
//   nextChange: PropTypes.func.isRequired,
//   pages: PropTypes.number.isRequired,
//   pageTotal: PropTypes.number.isRequired,
// };

export default Paginate;
