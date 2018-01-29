import React from 'react';
// Routes
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/home/';
import EditProfile from './routes/edit-profile/';
import About from './routes/about/';
import NotFound from './routes/not-found/';

import { isSteamLoggedIn } from './utils/steam-api';


class Routes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: null,
      steamid: null,
      username: null,
      profile: null,
      avatar: null
    };
  }

  componentDidMount() {
    isSteamLoggedIn()
      .then((response) => {

        // Set state for authenticated user
        if (response.data.status === 'authed') {
          this.setState({
            auth: response.data.status,
            steamid: response.data.user[0].steamid,
            username: response.data.user[0].username,
            profile: response.data.user[0].steam_profile,
            avatar: response.data.user[0].avatar
          });
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return(
      <Router>
        <Switch>  
          <Route exact path='/' render={
            () => 
              <Home 
                auth={this.state.auth}
                steamid={this.state.steamid}
                username={this.state.username} 
                profile={this.state.profile}
                avatar={this.state.avatar}
              />
          } />
          <Route path='/about' render={() => <About auth={this.state.auth} />} />
          <Route path='/profile' render={
            () =>
              <EditProfile 
                auth={this.state.auth}
                steamid={this.state.steamid}
                username={this.state.username} 
                profile={this.state.profile}
                avatar={this.state.avatar}
              />  
          } />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;