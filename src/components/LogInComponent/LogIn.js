import { React, useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
import "./style/Register.css";
import { TextField } from '@material-ui/core';
import { Button,Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
const axios = require("axios");

export default function Register(props) {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [show, setshow] = useState(true);

    const change = (e) =>{
        let id = e.target.id;
        let inputVal = e.target.value;
        if(id === "email-input"){
           setemail(inputVal)
        }
        if(id === "pass-input"){
          setpassword(inputVal)
        }

      }
    
      const handleClose = () => setshow(false)
      const handleShow = () => setshow(true)

    return(
        <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="coach-info">LogIn</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyModal">
            <div className="txtfild">
                <span>Email: </span>
                <TextField className="text" id="email-input"
                value={email}
                onChange={change} />
            </div>
            <div className="txtfild">
                <span>Passwors: </span>
                <TextField className="text" id="pass-input"
                value={password}
                onChange={change} />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn" variant="secondary" onClick={handleClose}>
            sign in
          </Button>
          <Link  to="/Register">
            <Button className="btn" variant="secondary" onClick={handleClose}>
                register
            </Button>
          </Link>


        </Modal.Footer>
      </Modal>
        
    );
}