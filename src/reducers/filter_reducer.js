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
        all_products: [action.payload],
        filteredProducts:[action.payload],
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
        const {filteredProducts, sort} = state;
        // let product = products;
        if (sort === 'price-lowest') {
          filteredProducts.sort((a, b) => {
            return a.price - b.price;
          });
        }
        if (sort === 'price-highest') {
          filteredProducts.sort((a, b) => {
            return b.price - a.price;
          });
        }
        if (sort === 'name-a') {
          filteredProducts.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        }
        if (sort === 'name-z') {
          filteredProducts.sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
        }
        console.log(state.filteredProducts,"1")
        console.log(state.all_products,"2")
        return {...state, filteredProducts};
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
