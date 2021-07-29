import { React, useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Button, Modal, Alert } from "react-bootstrap";
import { observer, inject } from "mobx-react";
import axios from "axios";
import AddCoach from "../CoachComponent/AddCoach";
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const serverApi = "http://localhost:8080";

const UpdateHomePage = inject("ScheduleStore")(
    observer((props) => {
        const [users, setUsers] = useState([])

        return (
            <div>
                <span>
                    sdfsdf
                </span>


            </div>
        );
    }));

export default UpdateHomePage;