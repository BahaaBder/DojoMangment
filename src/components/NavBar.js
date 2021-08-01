import { Navbar, Nav, Container } from 'react-bootstrap'
import { BrowserRouter as Router,Route, Link } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { observer, inject } from "mobx-react";
import Schedule from './Schedule'
import Coachs from "./CoachComponent/Coachs";
import AddCoach from "./CoachComponent/AddCoach";
import LogIn from "./LogInComponent/LogIn";
import Register from "./LogInComponent/Register";
import About from './about/About';
import DashBoard from './Admin/DashBoard';
import Admin from './Admin/Admin';

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
                <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
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
            )
        }

        const AdminNav = () => {
            return (
                <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/about" className="border border-white rounded">Dojo</Navbar.Brand>
                    <Navbar.Toggle arial-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/schedules">Schedules</Nav.Link>
                        <Nav.Link href="/coachs">Coach</Nav.Link>
                        <Nav.Link href="/dashboard">DashBoard</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link>
                    </Nav>
                    <Container fluid className="d-flex align-items-end justify-content-end">
                        <Nav.Link className="m-2 text-secondary" href="/" onClick={() => props.LogInStore.updateSign(false)}>Exit</Nav.Link>
                    </Container>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            )
        }

        const UserNav = () => {
            return (
                <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/about" className="border border-white rounded">Dojo</Navbar.Brand>
                    <Navbar.Toggle arial-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/schedules">Schedules</Nav.Link>
                    </Nav>
                    <Container fluid className="d-flex align-items-end justify-content-end">
                        <Nav.Link className="m-2 text-secondary" href="/" onClick={() => props.LogInStore.updateSign(false)}>Exit</Nav.Link>
                    </Container>
                    </Navbar.Collapse>
                </Container>
                </Navbar>   
            )
        }

    return (
        <Router>
            { !props.LogInStore.isSign ? NotLoggedInNav() : isAdmin ? AdminNav() : UserNav() }

            <Route path="/schedules" exact render={() =><Schedule/>}/>
            <Route path="/register" exact render={() =><Register/>}/>
            <Route path="/about" exact render={() =><About/>}/>
            <Route path="/coachs" exact render={() => <Coachs />}/>
            <Route path="/addCoachs" exact render={() => <AddCoach />}/>
            <Route path="/login" exact render={() => <LogIn />}/>
            <Route path="/dashboard" exact render={() => <DashBoard />}/>
            <Route path="/admin" exact render={() => <Admin />}/>
        </Router>
    )
}))

export default NavBar;