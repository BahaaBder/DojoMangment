import { Navbar, Nav, Button, Container, Form } from 'react-bootstrap'
import { BrowserRouter as Router,Route } from "react-router-dom";
import React from 'react'
import Schedule from './Schedule'
import Coachs from "./CoachComponent/Coachs";
import AddCoach from "./CoachComponent/AddCoach";
import LogIn from "./LogInComponent/LogIn";
import Register from "./LogInComponent/Register";
import About from './about/About';

function NavBar() {
    return (
        <Router>
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/about" className="border border-white rounded">Dojo</Navbar.Brand>
                    <Navbar.Toggle arial-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link href="/about">Home</Nav.Link>
                            <Nav.Link href="/schedules">Schedules</Nav.Link>
                            <Nav.Link href="/coachs">Coachs</Nav.Link>
                            <Nav.Link href="/addCoachs">addCoachs</Nav.Link>
                        </Nav>
                        <Container fluid className="d-flex flex-row align-items-end justify-content-end">
                        <Button variant="primary" href="/login">Login</Button>
                        <Button variant="primary" href="/register">Register</Button>
                        </Container>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Route path="/schedules" exact component={Schedule}/>
            <Route path="/register" exact component={Register}/>

            <Route path="/about" exact component={About}/>
            <Route path="/coachs" exact render={() => <Coachs />}/>
            <Route path="/addCoachs" exact render={() => <AddCoach />}/>
            <Route path="/LogIn" exact render={() => <LogIn />}/>
        </Router>
    )
}

export default NavBar