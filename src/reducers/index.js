import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

// Arquivo criado já criado, porem adicionai os itens abaixo - Filipe

// import { SET_INFO } from '../actions/index';

const rootReducer = combineReducers({
  user,
  wallet,
});

export default rootReducer;
