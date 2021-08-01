import { React, useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Button, Modal, Alert } from "react-bootstrap";
import { observer, inject } from "mobx-react";
import axios from "axios";
import AddCoach from "../CoachComponent/AddCoach";
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Coach from "../CoachComponent/Coach";

const serverApi = "http://localhost:8080";

const CoachDetails = inject("CoachStore")(
    observer((props) => {
        const [update, setUpdate] = useState(false);
        if(props.CoachStore.coachs.length===0){
            props.CoachStore.getAllCoachs();
        }
        let coachs = props.CoachStore.coachs
        return (
            <div>
                {coachs.map((coach, ind) => {
                    return (
<<<<<<< HEAD
                        <span key={ind} >
=======
                        <span key={ind}>
>>>>>>> ea93dca18d1a7d61662840cc1d8e8862db171ac8
                            <Coach key={ind}
                                coach={coach}
                                showDetails={false}
                            />
                        </span>
                    );
                })}


            </div>
        );
    }));

export default CoachDetails;