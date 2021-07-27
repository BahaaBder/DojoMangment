import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Form, Alert } from "react-bootstrap";
import "./style/Register.css";
const axios = require("axios");
const SEND_REQUEST_ROUTE = "http://localhost:8080/registrations";
const PHONE_ICON = "https://image.flaticon.com/icons/png/512/552/552489.png";
const CLOCK_ICON = "https://image.flaticon.com/icons/png/512/2784/2784459.png";
const WAZE_ICON = "https://image.flaticon.com/icons/png/512/732/732257.png";
export default function Register() {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState({
    username: "",
    useremail: "",
    userpassword: "",
    useraddress: "",
    userphone: "",
    userage: 0,
  });

  useEffect(() => {}, []);

  const checkUserValidInputs = () => {
    if (
      user.username === "" ||
      user.useremail === "" ||
      user.userphone === "" ||
      user.useraddress === "" ||
      user.userage === 0 ||
      user.userpassword === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleRequest = () => {
    if (checkUserValidInputs()) {
      axios.post(SEND_REQUEST_ROUTE, user).then(
        (res) => {
          if (res.data === "error") {
            console.log("BTATA");
          }
          setShowError(false);
          setShowSuccess(true);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      setShowError(true);
      setShowSuccess(false);
    }
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="page-content">
      <div className="form-sheet">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              onChange={handleChange}
              name="username"
              className="user-input"
            />
            <Form.Label>Email address </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              name="useremail"
              className="user-input"
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={handleChange}
              name="userpassword"
              className="user-input"
            />
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Age"
              onChange={handleChange}
              name="userage"
              className="user-input"
            />
            <Form.Label>Phone </Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone Number"
              onChange={handleChange}
              name="userphone"
              className="user-input"
            />
            <Form.Label>Address </Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Country Name"
              onChange={handleChange}
              name="useraddress"
              className="user-input"
            />
          </Form.Group>
          <Alert variant="danger" show={showError}>
            Check Your Inputs Again !
          </Alert>
          <Alert show={showSuccess} variant="success">
            <p>We've added you to the site.</p>
          </Alert>
          <Button variant="primary" onClick={handleRequest}>
            Register
          </Button>
        </Form>
      </div>
      <div className="info-page">
        <div className="info-box">
          <div className="icon-image">
            <img className="image" src={PHONE_ICON} />
          </div>
          <div className="info-content">
            <div>
              Telephone:
              <br />
              XXX-XXXXXXX
            </div>
          </div>
        </div>
        <div className="info-box">
          <div className="icon-image">
            <img className="image" src={CLOCK_ICON} />
          </div>
          <div className="info-content">
            <div>
              Available hours:
              <br />
              h-h D
            </div>
          </div>
        </div>
        <div className="info-box">
          <div className="icon-image">
            <img className="image" src={WAZE_ICON} />
          </div>
          <div className="info-content">
            <div>
              Waze Address:
              <br />
              link waze
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
