import {
  GET_PRODUCTS,
  GET_TYPEPRODUCTS,
  POST_NEWPRODUCT,
} from "./action-types.js";
import axios from "axios";

export const getProducts = (idBranch) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post("http://localhost:3001/products", {
        id: idBranch,
      });

      return dispatch({
        type: GET_PRODUCTS,
        payload: data.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getTypeProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/catalogos?tipo_catalogo=3890c641-32e7-49cf-864e-de62c04efb1b"
      );
      dispatch({
        type: GET_TYPEPRODUCTS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postNewProduct = (input) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/products/newproduct",
        input
      );
      return dispatch({
        type: POST_NEWPRODUCT,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
