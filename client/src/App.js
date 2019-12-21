import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';

function App() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path="/home" component={Dashboard} exact/>
            <Route path="/" component={Dashboard} exact/>
            <Route path="/about" component={About} exact/>
            <Route path="/dashboard/:type" component={Home} exact/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
