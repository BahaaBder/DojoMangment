import { React } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import AddCoach from "../CoachComponent/AddCoach";
import { Container, Row, Col } from 'react-bootstrap';
import CoachDetails from "./CoachDetils";

const Admin = inject("ScheduleStore")(
    observer((props) => {


        return (
            <Router>
                <Container fluid="md">
                    <Row className="justify-content-md-center">
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
            </Router>
        );
    }));

export default Admin;