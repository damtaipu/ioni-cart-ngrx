import { createAction, props } from "@ngrx/store";
import { CartModel } from "./cart.model";

export const increment = createAction('[Counter Component] Increment', props<{payload: CartModel}>());
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');