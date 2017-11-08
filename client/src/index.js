import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Route
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/home/';
import EditProfile from './routes/edit-profile/';
import About from './routes/about/';
import LoginSteam from './routes/loginsteam/';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={EditProfile} />
      <Route path="/about" component={About} />
      <Route path="/loginsteam" component={LoginSteam} />
    </Switch>
  </Router>, 
    document.getElementById('root')
);
registerServiceWorker();
