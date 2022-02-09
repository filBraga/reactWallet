// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_USER } from '../actions';

const ESTADO_INICIAL = {
  email: '',
};

const user = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case SET_USER:
    return { ...state, email: action.payload.email };
  default:
    return state;
  }
};

export default user;
