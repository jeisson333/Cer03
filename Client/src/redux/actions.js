import { GET_PRODUCTS } from "./action-types.js";
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
