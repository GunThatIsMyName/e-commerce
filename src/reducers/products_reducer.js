import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return {
        ...state,
        isSidebarOpen: true,
      };
    case SIDEBAR_CLOSE:
      return {
        ...state,
        isSidebarOpen: false,
      };
    case GET_PRODUCTS_BEGIN:
      return {
        ...state,
        products_Loading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      const featured_products = action.payload.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        products: action.payload,
        products_Loading: false,
        featured_products,
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        products_Error: true,
        products_Loading: false,
      };
    case GET_SINGLE_PRODUCT_BEGIN:
      return{
        ...state,single_Product_Loading:true,single_Product_Error:false
      }
    case GET_SINGLE_PRODUCT_SUCCESS:
      return{
        ...state,single_Product_Loading:false,single_Products:action.payload
      }
    case GET_SINGLE_PRODUCT_ERROR:
      return{
        ...state,single_Product_Loading:false,single_Product_Error:true
      }
    default: {
      throw new Error(`No Matching "${action.type}" - action type`);
    }
  }
};

export default products_reducer;
