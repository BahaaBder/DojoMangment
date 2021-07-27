
import {Container, Row, Col } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";
  import React from 'react'
 import Schedule from './Schedule'
 import Register from './Register'


function NavBar() {
    return (
            <Router>
                <nav className="navbar navbar-dark bg-dark">
                   
                       <Container fluid="md">
                        <Row className="justify-content-md-center">
                            <Col>
                                <Link to="/schedules">
                                    schedules 
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/coaches">  coaches </Link>
                            </Col>
                            <Col>
                                <Link to="/register"> register </Link>
                            </Col>
                        </Row>
                    
                    </Container>
                </nav>

                <Route path="/schedules" exact
                component={Schedule}
                />
                <Route path="/register" exact
                component={Register}

                />
               {
                   // <Route path="/actions" exact
                   // component={Actions}
   
                   // />

               }
            </Router>
    )
}

export default NavBar

