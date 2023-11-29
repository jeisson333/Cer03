import {
  GET_PRODUCTS,
  POST_NEWPRODUCT,
  GET_TYPEPRODUCTS,
  GET_SUCURSAL,
} from "./action-types.js";

const initialState = {
  allTypeProducts: [],
  products: [],
  totalPages: 1,
  sucursales: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TYPEPRODUCTS:
      return {
        ...state,
        allTypeProducts: action.payload?.data,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.data,
        totalPages: action.payload.info.pages,
        // currentPages: action.payload.info.currentPages,
        // pages: action.payload.info.pages,
      };
    case POST_NEWPRODUCT:
      return { ...state };

    case GET_SUCURSAL:
      return {
        ...state,
        sucursales: action.payload?.data,
      };
    default:
      return { ...state };
  }
}

export default reducer;
