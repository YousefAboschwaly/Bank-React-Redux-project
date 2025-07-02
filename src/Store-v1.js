import { combineReducers, createStore } from "redux";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
fullName:"",
nationalId:"",
createdAt:""
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan": {
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    }

    case "account/payLoan":
      return {
        ...state,
        loanPurpose: "",
        loan: 0,
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer( state=initialStateCustomer, action){
  switch(action.type){
    case "customer/createCustomer":return{...state,
      fullName:action.payload.fullName,
      nationalId:action.payload.nationalId,
      createdAt:action.payload.createdAt
    }
    case "customer/updateName":return{
      ...state,
      fullName:action.payload
    }
    default: return state;
  }
}

const finalReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

const store = createStore(finalReducer)


// store.dispatch({ type: "account/deposit", payload: 500 })
// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 200 })
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "buy a car" },
// });
// console.log(store.getState());



// Using action creators --> is simple function that return action
function deposit (amount){
  return { type: "account/deposit", payload: amount }
}

function withdraw (amount){
  return { type: "account/withdraw", payload: amount }
}

function requestLoan (amount,purpose){
  return{
  type: "account/requestLoan",
  payload: { amount, purpose},
}
}
function payLoan (){
  return { type: "account/payLoan"}
}





function createCustomer(fullName , nationalId){
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt:new Date().toISOString() },
  };
}
function updateName(fullName ){
  return {
    type: "customer/updateName",
    payload: fullName 
  };
}

store.dispatch(deposit(500))
console.log(store.getState());

store.dispatch(withdraw(200))
console.log(store.getState());



store.dispatch(requestLoan(1000, "buy a car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer('Yousef Aboschwaly' , '12345678'))
console.log(store.getState())

store.dispatch(updateName('Yousef Mohamed'));
console.log(store.getState());