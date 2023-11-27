import {
  GET_PRODUCTS,
  GET_TYPEPRODUCTS,
  POST_FILTERPRODCTS,
  POST_PRODUCTSNAME,
  POST_NEWPRODUCT,
  POST_ORDERPRODUCT,
  FILTER,
  PAGES,
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

export const filterTemperamentAction = (condition, idBranch) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/products/?type=${condition}`,
        {
          id: idBranch,
        }
      );
      console.log(response);
      return dispatch({
        type: POST_FILTERPRODCTS,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: POST_FILTERPRODCTS,
        payload: error.message,
      });
    }
  };
};

export const getTypeProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/catalogos?tipo_catalogo=3890c641-32e7-49cf-864e-de62c04efb1b"
      );
      return dispatch({
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

export const postProductName = (name, idBranch) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/products/?name=${name}`,
        {
          id: idBranch,
        }
      );
      return dispatch({
        type: POST_PRODUCTSNAME,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: POST_FILTERPRODCTS,
        payload: error.message,
      });
    }
  };
};
export const postOrderProducts = (nombre_producto, DESC, idBranch) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/products/?orderName=${nombre_producto}&order=${DESC}`,
        {
          id: idBranch,
        }
      );

      return dispatch({
        type: POST_ORDERPRODUCT,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filter = (conditions, idBranch) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/products${conditions ? conditions : ""}`,
        {
          id: idBranch,
        }
      );

      return dispatch({
        type: FILTER,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: FILTER,
        payload: { data: [] },
      });
    }
  };
};

export const handlerPages = (direction, page) => {
  return (dispatch) => {
    if (direction === "next") {
      return dispatch({
        type: PAGES,
        payload: page + 1,
      });
    } else if (direction === "prev") {
      return dispatch({
        type: PAGES,
        payload: page - 1,
      });
    }
  };
};
