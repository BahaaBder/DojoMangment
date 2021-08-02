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
                <Navbar collapseOnSelect expand="sm" fixed="top" bg="dark" variant="dark">
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
                <Navbar collapseOnSelect expand="sm" fixed="top" bg="dark" variant="dark">
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

// import { observer, inject } from 'mobx-react';
// import Admin from './Admin/Admin';
// import DashBoard from './Admin/DashBoard';

// const NavBar = inject("LogInStore", "ScheduleStore")(
//     observer((props) => {
//         return (
//             <Router>
//                 <nav className="navbar navbar-dark bg-dark">
//                     <Container fluid="md">
//                         {((props.LogInStore.computeIsSign === "false") || !props.LogInStore.computeIsSign) ?
//                             <Row className="justify-content-md-center">
//                                 <Col>
//                                     <Link to="/about">
//                                         about
//                                     </Link>
//                                 </Col>
//                                 <Col>
//                                     <Link to="/schedules">
//                                         schedules
//                                     </Link>
//                                 </Col>
//                                 <Col>
//                                     <Link to="/coachs">
//                                         Coachs
//                                     </Link>
//                                 </Col>
//                                 <Col>
//                                     <Link to="/register"> register </Link>
//                                 </Col>
//                                 <Col>
//                                     <Link to="/LogIn">
//                                         LogIn
//                                     </Link>
//                                 </Col>
//                             </Row>
//                             :
//                             props.LogInStore.computeIsAdmin === "true" ?
//                                 <Row>
//                                     {/* <Col>
//                                         <Link to="/Admin">
//                                             Admin
//                                         </Link>
//                                     </Col> */}
//                                     <Col>
//                                         <Link to="/schedules">
//                                             schedules
//                                         </Link>
//                                     </Col>
//                                     <Col>
//                                         <Link to="/coach">
//                                             Coach
//                                         </Link>
//                                     </Col>
//                                     <Col>
//                                         <Link to="dashBoard">DashBoard</Link>
//                                     </Col>
//                                     <Col>
//                                         <Link to="/"
//                                             onClick={() => {
//                                                 props.LogInStore.updateSign(false);
//                                                 sessionStorage.setItem("isSign", false);
//                                                 sessionStorage.setItem("isAdmin", false);
//                                             }}>
//                                             Exit
//                                         </Link>
//                                     </Col>
//                                 </Row>
//                                 :
//                                 <Row>
//                                     <Col>
//                                         <Link to="/schedules">
//                                             schedules
//                                         </Link>
//                                     </Col>
//                                     {/* <Col>
//                                     <Link to="/addCoachs">
//                                         Add Coach
//                                     </Link>
//                                 </Col> */}
//                                     <Col>
//                                         <Link to="/"
//                                             onClick={() => {
//                                                 props.LogInStore.updateSign(false);
//                                                 sessionStorage.setItem("isSign", false);
//                                                 sessionStorage.setItem("isAdmin", false);
//                                             }}>
//                                             Exit
//                                         </Link>
//                                     </Col>
//                                 </Row>
//                         }
//                     </Container>
//                 </nav>
//                 <Route path="/schedules" exact
//                     component={Schedule}
//                 />
//                 <Route path="/register" exact
//                     component={Register}
//                 />
//                 <Route path="/about" exact
//                     component={About}
//                 />
//                 <Route
//                     path="/coachs"
//                     exact
//                     render={() => <Coachs />}
//                 />
//                 <Route
//                     path="/addCoachs"
//                     exact
//                     render={() => <AddCoach />}
//                 />
//                 <Route
//                     path="/LogIn"
//                     exact
//                     render={() => <LogIn />}
//                 />
//                 <Route
//                     path="/coach"
//                     exact
//                     render={() => <Admin />}
//                 />
//                 <Route
//                     path="/dashBoard"
//                     exact
//                     render={() => <DashBoard />}
//                 />
//                 {
//                     //  <Route path="/coaches" exact
//                     //  component={Coaches}
//                     //  /> 
//                 }
//                 {/* <Route path="/schedules" exact component={Schedule} />
//         <Route path="/register" exact component={Register} />
//         <Route path="/about" exact component={About} />
//         <Route path="/coachs" exact render={() => <Coachs />} />
//         <Route path="/addCoachs" exact render={() => <AddCoach />} />
//         <Route path="/LogIn" exact render={() => <LogIn />} /> */}
//                 {
//                     //  <Route path="/coaches" exact
//                     //  component={Coaches}
//                     //  />
//                 }
//             </Router>
//         );
//     })
// );
export default NavBar;