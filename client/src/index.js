import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Routes
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './routes/home/';
import EditProfile from './routes/edit-profile/';
import About from './routes/about/';
import NotFound from './routes/not-found/';
// Utils
import { isSteamLoggedIn } from './utils/steam-api';

import registerServiceWorker from './registerServiceWorker';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === 'authed'
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <PrivateRoute authed={
        isSteamLoggedIn().then((res) => (res.data.status))
      } path='/profile' component={EditProfile} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
