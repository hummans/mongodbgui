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
            <Route path="/home" component={Home} exact/>
            <Route path="/" component={Home} exact/>
            <Route path="/about" component={About} exact/>
            <Route path="/dashboard/:type" component={Dashboard} exact/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
