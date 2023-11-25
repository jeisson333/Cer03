import { GET_PRODUCTS } from "./action-types.js";

const initialState = {
  products: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
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
