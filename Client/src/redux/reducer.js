import {
  GET_PRODUCTS,
  POST_NEWPRODUCT,
  GET_TYPEPRODUCTS,
  GET_SUCURSAL,
  ADD_CART,
  REMOVE_CART,
  GET_USER,
} from "./action-types.js";

const initialState = {
  products: [],
  allTypeProducts: [],
  sucursales: [],
  totalPages: 1,
  user: {},
  authentication: false,
  inCart: [],
  cartRemove: { id: "", detect: false },
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

    case ADD_CART:
      return {
        ...state,
        inCart: [...state.inCart, action.payload],
      };
    case REMOVE_CART:
      return {
        ...state,
        cartRemove: {
          id: action.payload,
          detect: state.cartRemove.detect ? false : true,
        },
        inCart: [...state.inCart].filter((product) => {
          return product.PRODUCTO.id_producto !== action.payload;
        }),
      };
    case GET_USER:
      return {
        ...state,
        user: {
          idBranch: action.payload?.idBranch,
          role: action.payload?.role,
          branch: action.payload?.branch,
        },
      };

    default:
      return { ...state };
  }
}

export default reducer;
