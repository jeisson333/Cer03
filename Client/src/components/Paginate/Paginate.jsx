import PropTypes from "prop-types";
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
Paginate.propTypes = {
  prevChange: PropTypes.func.isRequired,
  nextChange: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  pageTotal: PropTypes.number.isRequired,
};

export default Paginate;
