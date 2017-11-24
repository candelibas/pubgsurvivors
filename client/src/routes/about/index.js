import React, { Component } from 'react';
import Menu from '../../components/Menu';
import logo from '../../images/logo2.png';
import patreon_logo from '../../images/patreon_button.png'
import './about.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';


class About extends Component {

  componentDidMount() {
    document.title = 'PUBG Survivors - About';
    document.body.className = 'about';
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
              <h2 style={{marginTop: '5vh', marginBottom: '5vh'}}>About</h2>
            </Col>
          </Row>
          </Grid>
          </div>
        <div>
          <Grid style={{padding: '10px'}}>
            <Row>
              <Col xs className="content">
                <h3>This project aims to solve finding your best soul-mate(s) on PUBG</h3>
                <p>If you would like to support the project, you can become Patron in the below button. With your supports, I'll be able to pay server costs and that will make me to work on project to make it much more better! You can also contact with me on candelibas00@gmail.com</p>
                <a href="https://patreon.com/candelibas"><img src={patreon_logo} className="patreon-btn" alt="" /></a>
                
                <p><b>Can Delibaş</b>, Software Developer</p>
                <p><b>Oktay Çolakoğlu</b>, UI/UX Designer</p>
              </Col>
            </Row>
          </Grid>
        </div>
        
      </div>
    );
  }
}

export default About;
