import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filteredProducts:[],
  all_products:[],
  grid_view:true,
  sort:"price-lowest",
  filter:{
    text:"",
    category:"all",
    company:"all",
    colors:"all",
    min_price:0,
    max_price:0,
    current_price:0,
    shipping:false
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const {products}=useProductsContext();
  const [state,dispatch]=useReducer(reducer,initialState)
  const setListView = (style)=>{
    dispatch({type:SET_GRIDVIEW,payload:style})
  }
  const updateSort = (e)=>{
    const {value}=e.target
    dispatch({type:UPDATE_SORT,payload:value})
  }
  const updateFilter = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    if(name ==="category"){
      value = e.target.textContent
    }
    if(name === "colors"){
      value = e.target.dataset.color;
    }
    if(name==="current_price"){
      value = Number(value);
    }
    if(name === "shipping"){
      value = e.target.checked;
    }
    dispatch({type:UPDATE_FILTERS,payload:{name,value}})
  }
  const clearFilters = ()=>{
    dispatch({type:CLEAR_FILTERS})
  }
  useEffect(()=>{
    dispatch({type:LOAD_PRODUCTS,payload:products})
  },[products])
  useEffect(() => {
    dispatch({type: FILTER_PRODUCTS});
    dispatch({type: SORT_PRODUCTS});
  }, [state.sort,state.filter, products]);
  return (
    <FilterContext.Provider value={{clearFilters,updateFilter,updateSort,setListView,...state}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
