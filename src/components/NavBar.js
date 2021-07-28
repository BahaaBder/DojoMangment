
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import React from 'react'
import Schedule from './Schedule'
import Coachs from "./CoachComponent/Coachs";
import AddCoach from "./CoachComponent/AddCoach";
import LogIn from "./LogInComponent/LogIn";
import Register from "./LogInComponent/Register";
import About from './about/About';
import { observer, inject } from 'mobx-react';

const NavBar = inject("LogInStore")(
    observer((props) =>  {
    return (
        <Router>
            <nav className="navbar navbar-dark bg-dark">
                <Container fluid="md">
                    {!props.LogInStore.isSign ?  
                        <Row className="justify-content-md-center">
                            <Col>
                                <Link to="/about">
                                    about
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/schedules">
                                    schedules
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/coachs">
                                    Coachs
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/register"> register </Link>
                            </Col>
                            <Col>
                                <Link to="/addCoachs">
                                    Add Coach
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/LogIn">
                                    LogIn
                                </Link>
                            </Col>

                    </Row>

                    :
                    <Row>
                        <Col>
                            <Link to="/addCoachs">
                                 Add Coach
                            </Link>
                        </Col>
                        <Col>
                            <Link onClick={() =>{props.LogInStore.updateSign(false)}}>
                                 Exit
                            </Link>
                        </Col>
                    </Row>
                    }
                    
                </Container>
            </nav>

            <Route path="/schedules" exact
                component={Schedule}
            />
            <Route path="/register" exact
                component={Register}

            />

            <Route path="/about" exact
                component={About}

            />
            <Route
                path="/coachs"
                exact
                render={() => <Coachs />}
            />
            <Route
                path="/addCoachs"
                exact
                render={() => <AddCoach />}
            />
            <Route
                path="/LogIn"
                exact
                render={() => <LogIn />}
            />
            {
                //  <Route path="/coaches" exact
                //  component={Coaches}

                //  /> 
            }



        </Router>
    )
}))

export default NavBar
