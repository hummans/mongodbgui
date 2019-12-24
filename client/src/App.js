import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import Dashboard from './components/Dashboard';

function App() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path="/signin" component={SignIn} exact/>
            <Route path="/signup" component={SignUp} exact/>
            <Route path="/" component={Home} exact/>
            <Route path="/dashboard/:type" component={Dashboard} exact/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
