import { createSlice } from "@reduxjs/toolkit";

const inititalState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    fullName: '',
    nationalID: '',
    isLoading: false
};

const accountSlice = createSlice({
    name: 'account',
    inititalState: inititalState,
    reducers: {
        deposit(state, action) {
            state.balance = state.balance + action.payload;
            state.isLoading = false
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return { payload: { amount, purpose } }
            },
            reducer(state, action) {
                if (state.loan > 0) return;

                state.balance = state.balance + action.payload;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
            },
        },
        payLoan(state, action) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = '';
        }
    }
})
export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

// export default function accountReducer(state = inititalState, action) {
//     switch (action.type) {
//         case "account/convertingCurrency":
//             return { ...state, isLoading: true }
//         case "account/deposit":
//             return { ...state, balance: state.balance + action.payload, isLoading: false }
//         case "account/withdraw":
//             return { ...state, balance: state.balance - action.payload }
//         case "account/requestLoan":
//             if (state.loan > 0)
//                 return state
//             return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount }
//         case "account/payLoan":
//             return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }
//         default:
//             return state;
//     }
// }

// export function deposit(amount, currency) {
//     if (currency === "USD") return { type: 'account/deposit', payload: amount };
//     return async function (dispatch, getState) {
//         dispatch({ type: 'account/convertingCurrency' });
//         const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
//         const data = res.json();
//         dispatch({
//             type: 'account/deposit',
//             payload: data.rates.USD
//         });
//     };
// };

// export function withdraw(amount) {
//     return { type: 'account/withdraw', payload: amount };
// };

// export function requestLoan(amount, purpose) {
//     return {
//         type: 'account/requestLoan',
//         payload: { amount, purpose }
//     };
// };
// export function payLoan(amount) {
//     return { type: 'account/payLoan' };
// };