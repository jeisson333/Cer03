import { GET_PRODUCTS,GET_TYPEPRODUCTS } from "./action-types.js";

const initialState = {
  allTypeProducts: [],
  products: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TYPEPRODUCTS:
      return{
        ...state,
        allTypeProducts: payload
      }
      break
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
      };
    default:
      state;
  }
}

export default reducer;
