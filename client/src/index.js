import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Route
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/home/';
import EditProfile from './routes/edit-profile/';
import About from './routes/about/';
import NotFound from './routes/not-found/';

import registerServiceWorker from './registerServiceWorker';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-110532802-1');
ReactGA.pageview(window.location.pathname + window.location.search);
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={EditProfile} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </Router>, 
    document.getElementById('root')
);
registerServiceWorker();
