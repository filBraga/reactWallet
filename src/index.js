import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// Adicionado abaixo - Filipe
// import { Provider } from 'react-redux';
// import store from './store/index';
// Adicionado acima - Filipe
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    {/* Adivionado o privider dentro de BrowserRouter - Filipe */}
    {/* <Provider store={ store }> */}
    <App />
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
