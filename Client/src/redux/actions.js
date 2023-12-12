import { isExpired, decodeToken } from "react-jwt";
import {
  GET_PRODUCTS,
  ERROR_PRODUCTS,
  POST_NEWPRODUCT,
  DELETE_PRODUCT,
  RESTORE_PRODUCT,
  GET_DOCUMENTS,
  GET_TYPEPRODUCTS,
  GET_SUCURSAL,
  ADD_CART,
  REMOVE_CART,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  SIDEBAR,
  ACTION_CART,
  GET_PAYMENTS,
  POST_SALEMEN,
  CREATE_TYPE,
  GET_SALE_DETAIL,
  SOMETHING_REVIEW,
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
    } catch ({ response }) {
      console.log(response.data);
    }
  };
};

export const getPayments = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${baseUrl}/catalogos?tipo_catalogo=fdda2874-f53f-4784-a535-0bffb786ef8f`
      );
      return dispatch({
        type: GET_PAYMENTS,
        payload: response.data,
      });
    } catch ({ response }) {
      console.log(response.data);
    }
  };
};

export const getDocuments = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${baseUrl}/catalogos?tipo_catalogo=671d795f-bb6b-47d1-bf13-c639b58472b6`
      );
      return dispatch({
        type: GET_DOCUMENTS,
        payload: response.data,
      });
    } catch ({ response }) {
      console.log(response.data);
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
    } catch ({ response }) {
      console.log(response.data);
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
    } catch ({ response }) {
      console.log(response.data);
    }
  };
};

export const postSaleMen = (saleMen) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(
        `${baseUrl}/vendedor/newClient`,
        saleMen
      );
      return dispatch({
        type: POST_SALEMEN,
        payload: data,
      });
    } catch ({ response }) {
      console.log(response.data);
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

export const deleteProduct = (id_producto, nombre_sucursal) => {
  return async function (dispatch) {
    try {
      const url = `${baseUrl}/products/?id_producto=${id_producto}&nombre_sucursal=${nombre_sucursal}`;
      const { data } = await axios.delete(url);
      return dispatch({
        type: DELETE_PRODUCT,
        payload: data,
      });
    } catch ({ response }) {
      console.log(response.data);
    }
  };
};

export const restoreProduct = (id_inventario_producto) => {
  return async function (dispatch) {
    try {
      const url = `${baseUrl}/products/restoreproduct`;
      const { data } = await axios.post(url, {
        id_inventario_producto: id_inventario_producto,
      });
      return dispatch({
        type: RESTORE_PRODUCT,
        payload: data,
      });
    } catch ({ response }) {
      console.log(response.data);
    }
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
    } catch ({ response }) {
      return response;
    }
  };
};

export const signUp = (user) => {
  return async function (dispatch) {
    try {
      const url = `${baseUrl}/empresa/sign-up`;
      const { data } = await axios.post(url, user);
      const myDecodedToken = decodeToken(data);
      const isMyTokenExpired = isExpired(data);
      if (isMyTokenExpired) throw new Error("Expired token");
      return dispatch({
        type: SIGN_UP,
        payload: myDecodedToken,
      });
    } catch ({ response }) {
      return response;
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

export const createTypeProduct = (types) => {
  return async function (dispatch) {
    try {
      const url = `${baseUrl}/catalogos`;
      const response = await axios.post(url, {
        names: types,
        catalogue_type: "3890c641-32e7-49cf-864e-de62c04efb1b",
      });

      return dispatch({
        type: CREATE_TYPE,
        payload: response,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSaleDetail = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios(`${baseUrl}/ventas/${id}`);

      return dispatch({
        type: GET_SALE_DETAIL,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const somethingReview = (idBranch, action, form) => {
  return async function (dispatch) {
    try {
      if (action === "submit") {
        const response = await axios.post(`${baseUrl}/review/post`, {
          title: form.titulo,
          score: form.puntuacion,
          description: form.descripcion,
          branch: idBranch,
        });
      }

      const find = await axios.post(`${baseUrl}/review/get`, {
        branch: idBranch,
      });

      if (!find.message) return dispatch({ type: SOMETHING_REVIEW });
    } catch (error) {
      console.log(error);
    }
  };
};
