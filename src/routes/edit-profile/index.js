import React, { Component } from 'react';
import Menu from '../../components/Menu';
import logo from '../../images/logo2.png';
import './edit-profile.css';
import { Grid, Row, Col } from 'react-flexbox-grid';


class EditProfile extends Component {

  componentDidMount(){
    document.body.className = 'edit-profile';
  }

  render() {
    return (
      <div>
        <div className="header">
        <Menu right />
        <Grid fluid>
          <Row style={{paddingTop: '36' + 'px'}}>
            <Col xs>
              <img src={logo} style={{width: 300}} alt="logo" />
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
          <Grid fluid>
            <Row>
              <Col xs>
                <input type="text" placeholder="LANGUAGES" />
                
            <div className="onoffswitch">
              <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" />
              <label className="onoffswitch-label" htmlFor="myonoffswitch">
                <span className="onoffswitch-inner" />
                <span className="onoffswitch-switch" />
              </label>
            </div>
              </Col>
            </Row>
          </Grid>
        </div>
        
      </div>
    );
  }
}

export default EditProfile;
