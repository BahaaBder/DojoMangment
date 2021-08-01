import { React, useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Button, Modal, Alert } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import axios from "axios";
import AddCoach from "../CoachComponent/AddCoach";
import { Container, Row, Col } from 'react-bootstrap';
import DashBoard from "./DashBoard";
import UpdateHomePage from "./UpdateHomePage";
import CoachDetails from "./CoachDetils";

const Admin = inject("ScheduleStore")(
    observer((props) => {


        return (
            <Router>
                <Container fluid="md">
                    <Row className="justify-content-md-center">
                        {/* <Col>
                            <Link to="/UpdateHomePage">Update Home Page</Link>
                        </Col> */}
                        {/* <Col>
                            <Link to="updateSchedule">Update Schedule</Link>
                        </Col> */}

                        <Col>
                            <Link to="/addCoachs">
                                Add Coach
                            </Link>
                        </Col>
                        <Col>
                            <Link to="/UpdateCoachDetails">Update Coach Detail</Link>
                        </Col>
                    </Row>

                </Container>
                {/* <Route
                    path="/dashBoard"
                    exact
                    render={() => <DashBoard />}
                /> */}
                <Route
                    path="/addCoachs"
                    exact
                    render={() => <AddCoach />}
                />
                <Route
                    path="/UpdateCoachDetails"
                    exact
                    render={() => <CoachDetails />}
                />
                {/* <Route
                    path="/UpdateHomePage"
                    exact
                    render={() => <UpdateHomePage />}
                /> */}
            </Router>
        );
    }));

export default Admin;