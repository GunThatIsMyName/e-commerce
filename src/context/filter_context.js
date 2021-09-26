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
  // products:[],
  grid_view:true,
  sort:"price-lowest"
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
  useEffect(()=>{
    dispatch({type:LOAD_PRODUCTS,payload:products})
  },[products])
  useEffect(() => {
    dispatch({type: SORT_PRODUCTS});
  }, [state.sort, products]);
  return (
    <FilterContext.Provider value={{updateSort,setListView,...state}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
