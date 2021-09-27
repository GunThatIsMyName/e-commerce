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
      let MaxPrice = action.payload.map((item) => item.price);
      MaxPrice = Math.max(...MaxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filteredProducts: [...action.payload],
        filter: {
          ...state.filter,
          max_price: MaxPrice,
          current_price: MaxPrice,
        },
      };
    case SET_GRIDVIEW:
      if (action.payload) {
        return {
          ...state,
          grid_view: true,
        };
      }
      return {
        ...state,
        grid_view: false,
      };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      const { filteredProducts, sort } = state;
      // let product = products;
      if (sort === "price-lowest") {
        filteredProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "price-highest") {
        filteredProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "name-a") {
        filteredProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        filteredProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filteredProducts };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filter: { ...state.filter, [name]: value },
      };
    case FILTER_PRODUCTS:
      const { all_products } = state;
      const {
        text,
        category,
        company,
        colors,
        current_price,
        shipping,
        max_price,
        min_price,
      } = state.filter;
      let tempProducts = [...all_products];
      if (text) {
        tempProducts = tempProducts.filter((item) => item.name.includes(text));
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter(
          (item) => item.category === category
        );
      }
      if (company !== "all") {
        tempProducts = tempProducts.filter((item) => item.company === company);
      }
      if (colors !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === colors);
        });
      }
      tempProducts = tempProducts.filter((item) => {
        console.log({ current_price, max_price, min_price }, "curre");
        return current_price >= item.price;
      });
      if (shipping) {
        tempProducts = tempProducts.filter((item) => item.shipping === true);
      }
      return { ...state, filteredProducts: tempProducts };
    case CLEAR_FILTERS:
      return {
        ...state,
        filter: {
          ...state.filter,
          text: "",
          category: "all",
          company: "all",
          colors: "all",
          current_price: state.filter.max_price,
          shipping: false,
        },
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
