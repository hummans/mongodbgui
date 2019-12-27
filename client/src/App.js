import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import GettingStarted from './components/GettingStarted';

import Connection from './components/Connection';
import Cluster from './components/Cluster';
import Dashboard from './components/Dashboard';

function App() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path="/" component={GettingStarted} exact/>
            <Route path="/:connection" component={Connection} exact/>
            <Route path="/:connection/cluster" component={Cluster} exact/>
            <Route path="/:connection/collections" component={Dashboard} exact/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
