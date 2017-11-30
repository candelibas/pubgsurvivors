import React, { Component } from 'react';
import Menu from '../../components/Menu';
import logo from '../../images/logo.png';
import './not-found.css';
import { Link } from 'react-router-dom';

class NotFound extends Component {

  componentDidMount() {
    document.title = 'PUBG Survivors - Not Found';
    document.body.className = 'not-found';
  }

  render() {
    return( 
      <div className="App">
        <Menu />
        <div className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <h2>SURVIVORS</h2>
        </div>

        <div className="App-intro">
          <h2>Not Found</h2>
          <p>Uups! Something went wrong.</p>
          <p>You can turn back to <Link to="/">home</Link></p>
        </div>

      </div>
    );
  }
}

export default NotFound;