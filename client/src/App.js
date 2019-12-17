import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import GitHubButton from 'react-github-btn';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar  navbar-expand-lg  shadow-lg">
          <div className="navbar-collapse" id="navbarsExampleDefault">
              <nav className="nav nav-underline">
                <span className="nav-link">
                    <Link to="/home">Home</Link>
                </span>

              </nav>
          </div>
        </nav>


          <main role="main" className="container pt-5 pb-2 mb-5">
              <Switch>
                  <Route path="/about" component={About} exact/>
                  <Route path="/home" component={Home} exact/>
                  <Route path="/" component={Home} exact/>
              </Switch>
          </main>

          <div className="nav-scroller bg-white col-10 p-3 m-auto table-responsive">
              <h5>Contributors</h5>
              <nav className="nav mb-1">
                  <a className="m-1" href={"https://github.com/gayanvoice"}>
                      <img alt={"gayanvoice"} src={"https://avatars1.githubusercontent.com/u/30500175?s=48&v=4"} className={"rounded"}/>
                  </a>

              </nav>

          </div>

          <div className={'align-items-center p-3 mb-4 mt-3 text-center'}>
              <span className={"ml-2"}><GitHubButton href="https://github.com/gayanvoice" data-size="large" data-show-count="true" aria-label="Follow @gayanvoice on GitHub">Follow @gayanvoice</GitHubButton></span>
              <span className={"ml-2"}><GitHubButton href="https://github.com/gayanvoice/nosql-editor" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star gayanvoice/nosql-editor on GitHub">Star</GitHubButton></span>
              <div><small>Like this project? Go to <a href={'https://github.com/gayanvoice/nosql-editor'}>gayanvoice/nosql-editor</a></small></div>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
