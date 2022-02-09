// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_WALLET } from '../actions';

const ESTADO_INICIAL = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const wallet = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case SET_WALLET:
    return { ...state,
      wallet: action.payload.wallet,
    };
  default:
    return state;
  }
};

export default wallet;
