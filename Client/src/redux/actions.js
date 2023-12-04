import { isExpired, decodeToken } from "react-jwt";
import {
  GET_PRODUCTS,
  ERROR_PRODUCTS,
  POST_NEWPRODUCT,
  GET_TYPEPRODUCTS,
  GET_SUCURSAL,
  ADD_CART,
  REMOVE_CART,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  SIDEBAR,
  ACTION_CART,
} from "./action-types.js";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getProducts = (idBranch, conditions) => {
  return async function (dispatch) {
    try {
      const queryParams = new URLSearchParams(conditions).toString();
      const url = conditions
        ? `${baseUrl}/products?${queryParams}`
        : `${baseUrl}/products`;
      const { data } = await axios.post(url, { id: idBranch });

      return dispatch({
        type: GET_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR_PRODUCTS,
        payload: [],
      });
    }
  };
};

export const getTypeProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${baseUrl}/catalogos?tipo_catalogo=3890c641-32e7-49cf-864e-de62c04efb1b`
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

export const getSucursales = (idBranch, conditions) => {
  return async function (dispatch) {
    try {
      const queryParams = new URLSearchParams(conditions).toString();
      const url = conditions
        ? `${baseUrl}/sucursales?${queryParams}`
        : `${baseUrl}/sucursales`;
      const { data } = await axios.post(url, { id: idBranch });

      return dispatch({
        type: GET_SUCURSAL,
        payload: data,
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
        `${baseUrl}/products/newproduct`,
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

export const addCart = (product) => {
  return {
    type: ADD_CART,
    payload: product,
  };
};

export const removeCart = (productId) => {
  return {
    type: REMOVE_CART,
    payload: productId,
  };
};

export const signIn = (user) => {
  return async function (dispatch) {
    try {
      const url = `${baseUrl}/auth/sing-in`;
      const { data } = await axios.post(url, user);
      const myDecodedToken = decodeToken(data);
      const isMyTokenExpired = isExpired(data);
      if (isMyTokenExpired) throw new Error("Expired token");
      return dispatch({
        type: SIGN_IN,
        payload: myDecodedToken,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const signUp = (user) => {
  return async function (dispatch) {
    try {
      const url = `${baseUrl}/auth/sing-up`;
      const { data } = await axios.post(url, user);
      const myDecodedToken = decodeToken(data);
      const isMyTokenExpired = isExpired(data);
      if (isMyTokenExpired) throw new Error("Expired token");
      return dispatch({
        type: SIGN_UP,
        payload: myDecodedToken,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const signOut = (user) => {
  return {
    type: SIGN_OUT,
    payload: user,
  };
};

export const changeSidebar = (boolean) => {
  return {
    type: SIDEBAR,
    payload: boolean,
  };
};

export const actionCart = () => {
  return {
    type: ACTION_CART,
  };
};
