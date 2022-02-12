// Coloque aqui suas actions
// Arquivo criado já criado, porem adicionai os itens abaixo - Filipe

export const SET_USER = 'SET_USER';

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const SET_EXPENSES = 'SET_EXPENSES';

export const setExpenses = (payload) => ({
  type: SET_EXPENSES,
  payload,
});

export const SET_CURRENCIES = 'SET_CURRENCIES';

export const setCurrencies = (payload) => ({
  type: SET_CURRENCIES,
  payload,
});
