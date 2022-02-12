// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_EXPENSES, SET_CURRENCIES } from '../actions';

const ESTADO_INICIAL = {
  expenses: [],
  currencies: [],
  total: 0,
};

const wallet = (state = ESTADO_INICIAL, action) => {
  // const { valor, description, currency, method, tag } = action.payload;

  switch (action.type) {
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      total: state.total + Number(action.payload.value)
      * action.payload.exchangeRates[action.payload.currency].ask,
    };
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
