// import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ handlerChange, handlerSubmit }) => {
  return (
    <div className={styles.searchcontainer}>
      <input
        className={styles.searchinput}
        placeholder="Buscar producto..."
        onChange={handlerChange}
        type="search"
      />
      <button
        className={styles.searchbutton}
        type="submit"
        onClick={handlerSubmit}
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
