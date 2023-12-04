import {
  GET_PRODUCTS,
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
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  products: [],
  allTypeProducts: [],
  sucursales: [],
  totalPages: 1,
  authentication: false,
  sidebarActive: false,
  actionCart: false,
  newProduct: false,
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
        newProduct: false,
      };
    case POST_NEWPRODUCT:
      return { ...state, newProduct: true };

    case GET_SUCURSAL:
      return {
        ...state,
        sucursales: action.payload?.data,
      };

    case ADD_CART:
      cookies.set("inCart", [...cookies.get("inCart"), action.payload], {
        path: "/",
      });
      return { ...state };
    case REMOVE_CART:
      cookies.set(
        "inCart",
        [...cookies.get("inCart")].filter((product) => {
          return product.PRODUCTO.id_producto !== action.payload;
        }),
        { path: "/" }
      );
      cookies.set(
        "cartRemove",
        {
          id: action.payload,
          detect: cookies.get("cartRemove").detect ? false : true,
        },
        { path: "/" }
      );
      return { ...state };
    case SIGN_IN:
      cookies.set(
        "auth",
        {
          idBranch: action.payload?.idBranch,
          idUser: action.payload?.idUser,
          role: action.payload?.role,
          branch: action.payload?.branch,
        },
        { path: "/" }
      );
      return { ...state };
    case SIGN_UP:
      cookies.set(
        "auth",
        {
          idBranch: action.payload?.idBranch,
          idUser: action.payload?.idUser,
          role: action.payload?.role,
          branch: action.payload?.branch,
        },
        { path: "/" }
      );
      return { ...state };
    case SIGN_OUT:
      cookies.set("auth", {}, { path: "/" });
      return { ...state };

    case SIDEBAR:
      return { ...state, sidebarActive: action.payload };

    case ACTION_CART:
      return { ...state, actionCart: state.actionCart ? false : true };

    default:
      return { ...state };
  }
}

export default reducer;
