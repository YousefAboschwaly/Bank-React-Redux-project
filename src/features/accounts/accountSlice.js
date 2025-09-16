import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false
    },
    withdraw(state, action) {
      if (action.payload > state.balance) return;
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance = state.balance + action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      if (state.balance < state.loan) return;
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state){
      state.isLoading = true
    }
  },
});
console.log(accountSlice);

export const {  withdraw, requestLoan, payLoan } = accountSlice.actions;


// here we doesn't used actual action creators from createSlice because we have to do async work (fetching currency conversion rate) before dispatching the action
// so we have to write our own action creator for deposit

export function deposit (amount , currency){
  if (currency ==="USD")return { type: "account/deposit", payload: amount }
  return async function (dispatch ){
    dispatch({type:"account/convertingCurrency"})
  const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`)
  const data = await res.json()
   const convertedAmount = (amount * data.rates.USD);
   console.log(convertedAmount)
      dispatch({ type: "account/deposit", payload: convertedAmount })
    
  }
}

export default accountSlice.reducer;
