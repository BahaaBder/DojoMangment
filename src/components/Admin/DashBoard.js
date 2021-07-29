import { React, useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Button, Modal, Alert } from "react-bootstrap";
import { observer, inject } from "mobx-react";
import axios from "axios";
import AddCoach from "../CoachComponent/AddCoach";
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BarChart, CartesianGrid, Bar, XAxis,YAxis, ResponsiveContainer, Line, Tooltip } from 'recharts'

const serverApi = "http://localhost:8080";

const DashBoard = inject("ScheduleStore")(
    observer((props) => {
        const [users, setUsers] = useState([])
        const [userPerDepartment, setuserPerDepartment] = useState([])

        useEffect(async () => {
            let allUsers = await axios.get(serverApi + "/allUsers");
            setUsers(allUsers.data);
            let userPerDepartment = await axios.get(serverApi+"/userPerDepartment");
            setuserPerDepartment(userPerDepartment.data);
        }, [])


        return (
            <div>
                <span>
                    <img src="https://img.icons8.com/ios-filled/50/000000/ratings.png" />
                    <span className="spanClass">{users.length}</span>
                    <div className="divClass" >User In System</div>
                </span>

                <h4>Users per Department</h4>

              <BarChart
                  width={500}
                  height={500}
                  data={userPerDepartment}
                  maxBarSize={20}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis  dataKey="cnt" />
                <Tooltip/>
                <XAxis  dataKey="user"  />
                <Bar  dataKey="cnt" fill={"rgba(120,99,132,1)"} />
              </BarChart>
                {/* <Link to="/UpdateHomePage">
                    <span class="material-icons-outlined">
                        home_work
                    </span>
                </Link> */}
                {/* <Router>
                    <Container fluid="md">
                        <Row className="justify-content-md-center">
  
                        </Row>

                    </Container>

                </Router> */}




            </div>
        );
    }));

export default DashBoard;