import { applyMiddleware, combineReducers, createStore } from "redux";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";

import { thunk } from 'redux-thunk'



const finalReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

export const store = createStore(finalReducer,applyMiddleware(thunk));







