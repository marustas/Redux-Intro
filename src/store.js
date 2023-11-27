import { createStore } from "redux"
const inititalState = {
    balance: 0,
    loan: 0,
    loanPurpose: ''
};

function reducer(state = inititalState, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload }
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }
        case "account/requestLoan":
            if (state.loan > 0)
                return state
            return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose }
        case "account/payLoan":
            return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }
        default:
            return state;
    }
}

const store = createStore(reducer);

function deposit(amount) {
    return { type: 'account/deposit', payload: amount };
};

function withdraw(amount) {
    return { type: 'account/withdraw', payload: amount };
};

function requestLoan(amount, purpose) {
    return {
        type: 'account/requestLoan',
        payload: { amount, purpose }
    };
};

function payLoan(amount) {
    return { type: 'account/payLoan' };
};