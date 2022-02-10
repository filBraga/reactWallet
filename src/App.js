import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <main className="Content">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
        {/* <Route exact path="*" component={NotFound} /> */}
      </Switch>
    </main>
  );
}
//
export default App;
