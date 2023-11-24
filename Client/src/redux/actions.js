import {
  GET_PRODUCTS,
  GET_PRODUCT_NAME,
  GET_PRODUCT_ID,
} from "./actions-types.js";
import axios from "axios";

export const productsGet = () => {
  return async function (dispatch) {
    try {
      const dataPd = (await axios.get("http://localhost:3001/products")).data;
      return dispatch({
        type: GET_PRODUCTS,
        payload: dataPd,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const productGetName = (name) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/products/?name=${name}`
      );

      return dispatch({
        type: GET_PRODUCT_NAME,
        payload: data,
      });
    } catch (error) {
      alert(`No existe ningun producto con nombre ${name}`);
    }
  };
};
export const productById = (id) => {
  return async function (dispatch) {
    try {
      const dataId = (await axios.get(`http://localhost:3001/products/${id}`))
        .data;

      if (!dataId.length) throw Error("No existe ningun producto con ese ID");
      return dispatch({
        type: GET_PRODUCT_ID,
        payload: dataId,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
