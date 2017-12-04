import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom';
import { isSteamLoggedIn } from '../../utils/steam-api';

/*function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === 'authed'
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/about', state: { from: props.location } }} />}
    />
  )
} */

class PrivateRoute extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: false
    }
  }

  componentDidMount() {
    
    isSteamLoggedIn().then((res) => {
      if(res.data.status === 'authed') {
        this.setState({
          auth: true
        });
      }
    });

  }

  render() {
    const { component: Component, ...rest } = this.props;
    console.log(this.state.auth);
    return (
      <Route {...rest} render={props => (
        <div>
          {!this.state.auth && <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />}
          <Component {...this.props} />
        </div>
        )}
      />
    )
    
  }
}

export default PrivateRoute;