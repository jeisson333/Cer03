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
<<<<<<< HEAD
=======
// Paginate.propTypes = {
//   prevChange: PropTypes.func.isRequired,
//   nextChange: PropTypes.func.isRequired,
//   pages: PropTypes.number.isRequired,
//   pageTotal: PropTypes.number.isRequired,
// };
>>>>>>> 91279d1b30d64f45e800f59dff708ca58a247cd6

export default Paginate;
