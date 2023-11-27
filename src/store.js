import { createStore } from "redux"

const inititalState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    fullName: '',
    nationalID: ''
};

const inititalStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAt: ''
};

function customerReducer(state = inititalStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt }
        case "customer/updateName":
            return { ...state, fullName: action.payload }
        default:
            return state;
    }
}

function accountReducer(state = inititalState, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload }
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }
        case "account/requestLoan":
            if (state.loan > 0)
                return state
            return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount }
        case "account/payLoan":
            return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }
        default:
            return state;
    }
}

const store = createStore(accountReducer, customerReducer);

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

function updateName(fullName) {
    return { type: 'account/updateName', payload: fullName }
}

function createCustomer(fullName, nationalID) {
    return {
        type: 'customer/createCustomer',
        payload: { fullName, nationalID, createdAt: new Date().toISOString() }
    }
}