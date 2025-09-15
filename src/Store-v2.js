import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from 'redux-thunk'
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";
import { composeWithDevTools } from "@redux-devtools/extension";



const finalReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

//  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(finalReducer, composeEnhancers( applyMiddleware(thunk)));


export const store = createStore(finalReducer, composeWithDevTools( applyMiddleware(thunk)));







