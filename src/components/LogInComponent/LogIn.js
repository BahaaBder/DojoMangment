import { React, useState } from "react";
import "./style/Register.css";
import { TextField } from "@material-ui/core";
import { Button, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
const axios = require("axios");
const LogIn = inject(
  "LogInStore",
  "ScheduleStore"
)(
  observer((props) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [show, setshow] = useState(true);
    const [error, seterror] = useState(false);
    const [passforget, setpassforget] = useState(false);
    const change = (e) => {
      let id = e.target.id;
      let inputVal = e.target.value;
      if (id === "email-input") {
        setemail(inputVal);
      }
      if (id === "pass-input") {
        setpassword(inputVal);
      }
    };
    const checkInputs = () => {
      if (email === "" || password === "") {
        return false;
      }
      return true;
    };
    const handleClose = () => setshow(false);
    const sign = async () => {
      if (checkInputs()) {
        //check if mail & pass exist
        try {
          let userIdExist = await axios.get(
            `http://localhost:8080/users?email=${email}&password=${password}`
          );
          userIdExist = userIdExist.data;
          if (userIdExist.id) {
            console.log("found");
            setshow(false);
            // let userId =  await axios.get(`http://localhost:8080/users?email=${email}&password=${password}`);
            props.LogInStore.updateId(userIdExist.id);
            props.ScheduleStore.updateId(userIdExist.id);
            props.LogInStore.updateSign(true);
            let isAdmin = await props.ScheduleStore.checkPermission("admin");
            props.LogInStore.updateAdminState(isAdmin);
          } else {
            console.log("not found");
            props.LogInStore.updateSign(false);
            seterror(true);
            setshow(true);
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        seterror(true);
        setshow(true);
      }
    };
    // const handleShow = () => setshow(true);
    const forgetPass = () => setpassforget(true);
    return (
      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="coach-info">Welcome to our set</Modal.Title>
          <Modal.Title className="coach-info">
            new here?{" "}
            <Link className="pass" to="/Register">
              Create Acount
            </Link>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="bodyModal">
          <div className="txtfild">
            <div>Email: </div>
            <TextField
              className="text"
              id="email-input"
              value={email}
              onChange={change}
            />
          </div>
          <div className="txtfild">
            <div>
              Passwors:{" "}
              <span className="pass" onClick={forgetPass}>
                Forget Password
              </span>{" "}
            </div>
            <TextField
              className="text"
              id="pass-input"
              type="password"
              value={password}
              onChange={change}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Link to="signIn">
            <Button className="btn" variant="secondary" onClick={sign}>
              sign in
            </Button>
          </Link>

          <Alert variant="danger" show={error}>
            Check Your Inputs Again !
          </Alert>

          <Alert variant="success" show={passforget}>
            Relax and try to remember you'r password
          </Alert>
        </Modal.Footer>
      </Modal>
    );
  })
);
export default LogIn;
