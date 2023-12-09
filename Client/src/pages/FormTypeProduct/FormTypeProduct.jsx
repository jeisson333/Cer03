import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTypeProduct } from "../../redux/actions";

import Style from "./FormTypeProduct.module.css";

const FormTypeProduct = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [types, setTypes] = useState([]);

  const handlerInput = (event) => {
    setInput(event.target.value);
  };

  const addType = (event) => {
    event.preventDefault();
    if (
      !types?.find((type) => type.toLowerCase() === input.toLowerCase()) &&
      input
    ) {
      setTypes([...types, input]);
      setInput("");
    }
    //mostrar msj de error
  };

  const deleteType = (event) => {
    event.preventDefault();
    setTypes(types.filter((type) => type !== event.target.name));
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(createTypeProduct(types));
  };

  return (
    <div className={Style.container}>
      <form onSubmit={handlerSubmit} className={Style.containerForm}>
        <h2>Crea el tipo de producto</h2>
        <label>Nombre: </label>
        <input
          type="text"
          value={input}
          onChange={handlerInput}
          className={Style.input}
          name="sucursal"
        />
        <button onClick={addType}>Agregar</button>

        <div className={Style.labels}>
          {types?.map((type, i) => (
            <div key={i} className={Style.selected}>
              <p key={i}>{type}</p>
              <button key={i} onClick={deleteType} name={type}>
                x
              </button>
            </div>
          ))}
        </div>
        <input type="submit" value="Registar" className={Style.inputSubmit} />
      </form>
    </div>
  );
};

export default FormTypeProduct;
