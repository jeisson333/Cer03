import {
  GET_PRODUCTS,
  ERROR_PRODUCTS,
  POST_NEWPRODUCT,
  DELETE_PRODUCT,
  GET_DOCUMENTS,
  GET_TYPEPRODUCTS,
  POST_SALEMEN,
  GET_SUCURSAL,
  ADD_CART,
  REMOVE_CART,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  SIDEBAR,
  ACTION_CART,
  GET_PAYMENTS,
  CREATE_TYPE,
  GET_SALE_DETAIL,
} from "./action-types.js";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  products: [],
  allTypeProducts: [],
  paymentMethods: [],
  sucursales: [],
  documents: [],
  totalPages: 1,
  newProduct: false,
  sidebarActive: false,
  actionCart: false,
  msg: "",
  saleDetail: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TYPEPRODUCTS:
      return {
        ...state,
        allTypeProducts: action.payload?.data,
      };

    case GET_PAYMENTS:
      return {
        ...state,
        paymentMethods: action.payload?.data,
      };
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload?.data,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.data,
        totalPages: action.payload.info.pages,
        newProduct: false,
        msg: "",
      };
    case ERROR_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        newProduct: false,
      };
    case POST_NEWPRODUCT:
      return { ...state, newProduct: true };
    case DELETE_PRODUCT:
      return { ...state, msg: action.payload?.msg };

    case POST_SALEMEN:
      return { ...state };

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

    case CREATE_TYPE:
      return { ...state, allTypeProducts: action.payload };

    case GET_SALE_DETAIL:
      return {
        ...state,
        saleDetail: action.payload,
      };

    default:
      return { ...state };
  }
}

export default reducer;
