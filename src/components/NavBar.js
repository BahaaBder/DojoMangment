import { Container, Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Schedule from "./Schedule";
import Coachs from "./CoachComponent/Coachs";
import AddCoach from "./CoachComponent/AddCoach";
import LogIn from "./LogInComponent/LogIn";
import Register from "./LogInComponent/Register";
import About from "./about/About";
import { observer, inject } from "mobx-react";
import Admin from "./Admin/Admin";
import DashBoard from "./Admin/DashBoard";

// let adminLog = false;
const NavBar = inject(
  "LogInStore",
  "ScheduleStore"
)(
  observer((props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
      isAdminFunc();
    });
    // adminLog = false;
    const isAdminFunc = async function () {
      let isAdmin = await props.ScheduleStore.checkPermission("admin");
      setIsAdmin(isAdmin);
      // adminLog = adminLog
      console.log(isAdmin);
      return isAdmin;
    };
    return (
      <Router>
        <nav className="navbar navbar-dark bg-dark">
          <Container fluid="md">
            {!props.LogInStore.isSign ? (
              <Row className="justify-content-md-center">
                <Col>
                  <Link to="/about">about</Link>
                </Col>
                <Col>
                  <Link to="/schedules">schedules</Link>
                </Col>
                <Col>
                  <Link to="/coachs">Coachs</Link>
                </Col>
                <Col>
                  <Link to="/register"> register </Link>
                </Col>
                <Col>
                  <Link to="/LogIn">LogIn</Link>
                </Col>
              </Row>
            ) : isAdmin ? (
              <Row>
                {/* <Col>
                                        <Link to="/Admin">
                                            Admin
                                        </Link>
                                    </Col> */}
                <Col>
                  <Link to="/schedules">schedules</Link>
                </Col>
                <Col>
                  <Link to="/coach">Coach</Link>
                </Col>

                <Col>
                  <Link to="dashBoard">DashBoard</Link>
                </Col>
                <Col>
                  <Link
                    to="/"
                    onClick={() => {
                      props.LogInStore.updateSign(false);
                    }}
                  >
                    Exit
                  </Link>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col>
                  <Link to="/schedules">schedules</Link>
                </Col>
                {/* <Col>
                                    <Link to="/addCoachs">
                                        Add Coach
                                    </Link>
                                </Col> */}
                <Col>
                  <Link
                    to="/"
                    onClick={() => {
                      props.LogInStore.updateSign(false);
                    }}
                  >
                    Exit
                  </Link>
                </Col>
              </Row>
            )}
          </Container>
        </nav>
        <Route path="/schedules" exact render={() => <Schedule />} />

        <Route path="/register" exact component={Register} />
        <Route path="/about" exact component={About} />
        <Route path="/coachs" exact render={() => <Coachs />} />
        <Route path="/addCoachs" exact render={() => <AddCoach />} />
        <Route path="/LogIn" exact render={() => <LogIn />} />
        <Route path="/coach" exact render={() => <Admin />} />
        <Route path="/dashBoard" exact render={() => <DashBoard />} />
        {
          //  <Route path="/coaches" exact
          //  component={Coaches}
          //  />
        }
        {/* <Route path="/schedules" exact component={Schedule} />
        <Route path="/register" exact component={Register} />

        <Route path="/about" exact component={About} />
        <Route path="/coachs" exact render={() => <Coachs />} />
        <Route path="/addCoachs" exact render={() => <AddCoach />} />
        <Route path="/LogIn" exact render={() => <LogIn />} /> */}
        {
          //  <Route path="/coaches" exact
          //  component={Coaches}
          //  />
        }
      </Router>
    );
  })
);

export default NavBar;
