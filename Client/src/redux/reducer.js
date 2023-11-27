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

const initialState = {
  allTypeProducts: [],
  products: [],

  pages: 1,
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
        currentPages: action.payload.info.currentPages,
        pages: action.payload.info.pages,
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
        currentPages: action.payload.info.currentPages,
        pages: action.payload.info.pages,
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
        currentPages: action.payload.info.currentPages,
        pages: action.payload.info.pages,
      };
      break;
    case POST_ORDERPRODUCT:
      return {
        ...state,
        products: action.payload?.data,
        currentPages: action.payload.info.currentPages,
        pages: action.payload.info.pages,
      };
      break;

    case FILTER:
      return {
        ...state,
        products: action.payload?.data,
        currentPages: action.payload.info.currentPages,
        pages: action.payload.info.pages,
      };

    case PAGES:
      return {
        ...state,
        currentPages: action.payload,
      };

    default:
      return { ...state };
  }
}

export default reducer;
