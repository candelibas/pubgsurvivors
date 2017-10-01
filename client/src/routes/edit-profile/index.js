import React, { Component } from 'react';
import Menu from '../../components/Menu';
import logo from '../../images/logo2.png';
import discord_logo from '../../images/discord_logo.svg';
import './edit-profile.css';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
const FA = require('react-fontawesome');


class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.body.className = 'edit-profile';
  }

  render() {
    return (
      <div>
        <div className="header">
        <Menu />
        <Grid style={{paddingLeft: '10px'}}>
          <Row style={{paddingTop: '36' + 'px'}}>
            <Col xs>
               <Link to="/"><img src={logo} style={{width: 300}} alt="logo" /></Link>
            </Col>
          </Row>
          <Row>
            <Col xs>
              <h2 style={{marginTop: '5vh', marginBottom: '5vh'}}>PROFILE</h2>
            </Col>
          </Row>
          </Grid>
          </div>
        <div>
          <Grid style={{padding: '10px'}}>

            <Row>
              <Col xs>
                <h2>INFORMATION</h2>
              </Col>
            </Row>

            <Row>
              <Col xs>
                <input type="text" placeholder="LANGUAGES" />

                <p><input type="text" placeholder="FAVOURITE GAMES" /></p>

                <p className="label">DO YOU HAVE MICROPHONE?</p>
                
                <div className="onoffswitch-yes">
                  <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox-yes" id="myonoffswitch-yes" />
                  <label className="onoffswitch-label-yes" htmlFor="myonoffswitch-yes">
                    <span className="onoffswitch-inner-yes" />
                    <span className="onoffswitch-switch-yes" />
                  </label>
                </div>

                <p className="label">WHAT IS YOUR GAME STYLE?</p>
                <div className="onoffswitch-mode">
                  <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox-mode" id="myonoffswitch-mode" />
                  <label className="onoffswitch-label-mode" htmlFor="myonoffswitch-mode">
                    <span className="onoffswitch-inner-mode" />
                    <span className="onoffswitch-switch-mode" />
                  </label>
                </div>

              </Col>
              
            </Row>

            {/* SOCIAL LINKS*/}
            <Row style={{marginTop: '2vh'}}>
              <Col xs>
                <h2>LINKS</h2>
              </Col>
            </Row>
            <Row>
              <Col xs>
                <p><FA name="steam-square" className="profile-icon" /><input type="text" placeholder="steamcommunity.com/id/username" /></p>
                <p><img src={discord_logo} className="profile-discord" /> <input type="text" placeholder="username#1231" /></p>
                <p><FA name="reddit" className="profile-icon" /><input type="text" placeholder="REDDIT USERNAME" /></p>
              </Col>
            </Row>

            <Row>
              <Col xs>
              
                <button className="button orange" style={{fontSize: '16px', padding: '15px'}}>
                  <FA name="check" className="btn-icon" />
                  SAVE
                </button>
                
              </Col>
            </Row>

          </Grid>
        </div>
        
      </div>
    );
  }
}

export default EditProfile;
