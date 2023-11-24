import style from "./Search.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { productGetName } from "../../redux/actions.js";

const Search = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const handleSearch = (event) => {
    setInput(event.target.value);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    if (!input.length) {
      return alert("Ingresa un nombre para buscar");
    } else {
      dispatch(productGetName(input));
      setInput("");
    }
  };

  return (
    <div className={style.search}>
      <form action="name" onSubmit={handlerSubmit}>
        <input
          id="search"
          name="search"
          type="search"
          value={input}
          onChange={handleSearch}
          placeholder="search..."
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
};
export default Search;
