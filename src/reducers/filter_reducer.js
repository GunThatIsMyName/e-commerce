import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts:action.payload,
      };
    case SET_GRIDVIEW:
      if(action.payload){
        return{
          ...state,grid_view:true
        }
      }
      return{
        ...state,grid_view:false
      }
    case UPDATE_SORT:
      return{...state,sort:action.payload}
    case SORT_PRODUCTS:
        const {filteredProducts: products, sort} = state;
        // let product = products;
        if (sort === 'price-lowest') {
          products.sort((a, b) => {
            return a.price - b.price;
          });
        }
        if (sort === 'price-highest') {
          products.sort((a, b) => {
            return b.price - a.price;
          });
        }
        if (sort === 'name-a') {
          products.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        }
        if (sort === 'name-z') {
          products.sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
        }
        return {...state, products};
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
