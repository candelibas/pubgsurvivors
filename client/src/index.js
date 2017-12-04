import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Routes
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './routes/home/';
import EditProfile from './routes/edit-profile/';
import About from './routes/about/';
import NotFound from './routes/not-found/';
// Utils
//import PrivateRoute from '../src/components/PrivateRoute/';
import registerServiceWorker from './registerServiceWorker';

/*
This is for PrivateRoute component which we do not need it right now but who knows? Yeah...
function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === 'authed'
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/about', state: { from: props.location } }} />}
    />
  )
} 

<PrivateRoute path='/profile' component={EditProfile} />
*/

ReactDOM.render(
  <Router>
    <Switch>  
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/profile' component={EditProfile} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
