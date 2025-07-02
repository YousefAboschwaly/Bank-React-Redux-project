import { combineReducers, createStore } from "redux";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";




const finalReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

export const store = createStore(finalReducer)







