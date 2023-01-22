import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "./actions";
import { CartModel } from "./cart.model";

export const initialState: CartModel[] = []
let acumulateProd: CartModel[] = [];

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, data) => {
    let verifyExistProd = state.some(e => e.prodId === data.payload.prodId);

    if(verifyExistProd){
      console.log(state)
      state.forEach((e, i) => {
        if(e.prodId === data.payload.prodId){
          let oo = [...acumulateProd]
          let cpyObj = {...oo[i]}
  
          cpyObj.prodQty += 1;
          acumulateProd[i] = {...cpyObj}
          console.log('Já existe o produto no carrinho: incrementa a quantidade')
        }
      })
      state = [...acumulateProd];

      return state;
    }

    acumulateProd.push(data.payload)
    state = [...acumulateProd];

    return state;
  }),
  on(decrement, (state) => state),
  on(reset, (state) => {
    acumulateProd = [];
    return state = initialState; 
  })
);