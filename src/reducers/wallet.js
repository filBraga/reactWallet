// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_EXPENSES } from '../actions';

const ESTADO_INICIAL = {
  expenses: [],
  total: 0,
};

const wallet = (state = ESTADO_INICIAL, action) => {
  // const { valor, description, currency, method, tag } = action.payload;

  switch (action.type) {
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      total: state.total + action.payload.valor,
    };
  default:
    return state;
  }
};

export default wallet;
