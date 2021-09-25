import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filteredProducts: products, grid_view } = useFilterContext();
  if (products.length < 1) {
    return <h4>sorry , no matches item for your search ...</h4>;
  }
  return (
    <>
      {grid_view ? (
        <GridView products={products} />
      ) : (
        <ListView products={products} />
      )}
    </>
  );
};

export default ProductList;
