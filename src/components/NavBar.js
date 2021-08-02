import { BrowserRouter as Router,Route, Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { observer, inject } from "mobx-react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

import Schedule from "./Schedule";
import Coachs from "./CoachComponent/Coachs";
import AddCoach from "./CoachComponent/AddCoach";
import LogIn from "./LogInComponent/LogIn";
import Register from "./LogInComponent/Register";
import About from './about/About';
import DashBoard from './Admin/DashBoard';
import CoachDetails from "./Admin/CoachDetils";
import "./../App.css"

const NavBar = inject("LogInStore","ScheduleStore")(
    observer((props) => {
        const [isAdmin, setIsAdmin] = useState(false)
        useEffect(() => {
            isAdminFunc()
        })
        const isAdminFunc = async function (){
            let isAdmin = await props.ScheduleStore.checkPermission("admin")
            setIsAdmin(isAdmin)
            // console.log(isAdmin)
            return isAdmin
        }
        
        const NotLoggedInNav = () => {
            return (
                <div className="navBar-flex">
                <Navbar  collapseOnSelect expand="sm" d-flex="true" bg="dark" variant="dark">
                    <Container fluid>
                        <Navbar.Brand href="/about" className="border border-white rounded">Dojo</Navbar.Brand>
                        <Navbar.Toggle arial-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <Nav.Link href="/about">Home</Nav.Link>
                                <Nav.Link href="/schedules">Schedules</Nav.Link>
                                <Nav.Link href="/coachs">Coachs</Nav.Link>
                            </Nav> 
                            <Container fluid className="d-flex align-items-end justify-content-end">
                                <Nav.Link className="m-2 text-secondary" href="/login">Login</Nav.Link>
                                <Nav.Link className="m-2 text-secondary" href="/register">Register</Nav.Link>
                            </Container>
                            
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                </div>
            )
        }

        const AdminNav = () => {
            return (
                <div className="navBar-flex">
                <Navbar collapseOnSelect  expand="sm" d-flex="true" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/about" className="border border-white rounded">Dojo</Navbar.Brand>
                    <Navbar.Toggle arial-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/schedules">Schedules</Nav.Link>
                        <Nav.Link href="/UpdateCoachDetails">Coachs</Nav.Link>
                        <Nav.Link href="/dashboard">DashBoard</Nav.Link>
                    </Nav>
                    <Container fluid className="d-flex align-items-end justify-content-end">
                        <Navbar.Brand  className="m-2 text-secondary" href="/about" onClick={() =>
                        {
                            props.LogInStore.updateSign(false);
                            sessionStorage.setItem("isSign", false);
                            sessionStorage.setItem("isAdmin", false);
                        }}>Exit</Navbar.Brand >
                    </Container>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
                </div>
            )
        }

        const UserNav = () => {
            return (
                <div className="navBar-flex">
                <Navbar collapseOnSelect expand="sm" d-flex="true" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/about" className="border border-white rounded">Dojo</Navbar.Brand>
                    <Navbar.Toggle arial-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/schedules">Schedules</Nav.Link>
                    </Nav>
                    <Container fluid className="d-flex align-items-end justify-content-end">
                        <Navbar.Brand  className="m-2 text-secondary" href="/about" onClick={() =>{
                            props.LogInStore.updateSign(false);
                            sessionStorage.setItem("isSign", false);
                            sessionStorage.setItem("isAdmin", false);
                            }}>Exit</Navbar.Brand >
                    </Container>
                    </Navbar.Collapse>
                </Container>
                </Navbar>   
                </div>
            )
        }

    return (
        <Router>
            { ((props.LogInStore.computeIsSign === "false") || !props.LogInStore.computeIsSign) ? NotLoggedInNav() : props.LogInStore.computeIsAdmin === "true" ? AdminNav() : UserNav() }

            <Route path="/schedules" exact render={() =><Schedule/>}/>
            <Route path="/register" exact render={() =><Register/>}/>
            <Route path="/about" exact render={() =><About/>}/>
            <Route path="/coachs" exact render={() => <Coachs />}/>
            <Route path="/addCoachs" exact render={() => <AddCoach />}/>
            <Route path="/login" exact render={() => <LogIn />}/>
            <Route path="/dashboard" exact render={() => <DashBoard />}/>
            <Route path="/UpdateCoachDetails" exact render={() => <CoachDetails />}/>
        </Router>
    )
}))
export default NavBar;
