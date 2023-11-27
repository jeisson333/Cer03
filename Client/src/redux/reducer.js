import {
  GET_PRODUCTS,
  GET_TYPEPRODUCTS,
  POST_NEWPRODUCT,
} from "./action-types.js";
import {
  GET_PRODUCTS,
  GET_TYPEPRODUCTS,
  POST_FILTERPRODCTS,
  POST_PRODUCTSNAME,
} from "./action-types.js";

const initialState = {
  allTypeProducts: [],
  products: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case POST_FILTERPRODCTS:
      if (action.payload === "Request failed with status code 400") {
        state.products = [];
      }
      return {
        ...state,
        products: action.payload?.data,
      };
      break;
    case GET_TYPEPRODUCTS:
      return {
        ...state,
        allTypeProducts: action.payload?.data,
      };
      break;
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case POST_NEWPRODUCT:
      return { ...state };

    case POST_PRODUCTSNAME:
      if (action.payload === "Request failed with status code 400") {
        state.products = [];
      }
      return {
        ...state,
        products: action.payload?.data,
      };
      break;
    default:
      return { ...state };
  }
}

export default reducer;
