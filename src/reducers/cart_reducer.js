import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  switch(action.type){
    case ADD_TO_CART:
      const {id,mainColor,amount,product}=action.payload;
      let tempCart = state.cart.find(i=>i.id === id + mainColor)
      if(tempCart){
        const oldItem = state.cart.map(item=>{
          if(item.id === id+mainColor){
            let newAmount = item.amount + amount;
            if(newAmount >= item.max){
              newAmount = item.max;
            }
            return{...item,amount:newAmount}
          }else{
            return item
          }
        });
        console.log(oldItem,"old")
        return {...state,cart:oldItem}
      }else{
        console.log(tempCart,"else")
        const newItem = {
          id:id+mainColor,
          mainColor,
          amount,
          image:product.images[0].url,
          name:product.name,
          price:product.price,
          max:product.stock
        }
        return {...state,cart:[...state.cart,newItem]}
      }
    case REMOVE_CART_ITEM:
      console.log(state.cart,"cart")
      const newCartItem = state.cart.filter(item=>item.id !== action.payload)
      return{...state,cart:newCartItem}
    case CLEAR_CART:
      return {...state,cart:[]}
    case TOGGLE_CART_ITEM_AMOUNT:
      const newToggleItem = state.cart.map(item=>{
        if(item.id === action.payload.id){
          // value "inc"
          if(action.payload.value === "inc"){
            if(item.max === item.amount){
              return {...item,amount:item.max}
            }
            return {...item,amount:item.amount+1}
          }else{
            return {...item,amount:item.amount-1}
          }
        }
        return item;
      }).filter(tem=>tem.amount !== 0)
      return {...state,cart:newToggleItem}
    case COUNT_CART_TOTALS:
      const {total_price,total_amount} = state.cart.reduce((total,item)=>{
        const amount = item.amount;
        const price = item.price * amount;
        total.total_amount +=amount;
        total.total_price +=price;
        return total;
      },{
        total_price:0,
        total_amount:0
      })
      if(total_price > 100000){
        return{...state,total_price,total_amount,shipping:0}
      }
      return{...state,total_price,total_amount,shipping:534}
    default :
    throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default cart_reducer
