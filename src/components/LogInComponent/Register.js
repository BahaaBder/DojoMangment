import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Form, Alert, Container, Col, Image, Row } from "react-bootstrap";
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
      axios.post(SEND_REQUEST_ROUTE, user).then((res) => {
        setShowError(false);
        setShowSuccess(true);
      });
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
    <Container fluid>
      <Row className="justify-content-around">
      <Col className="border border-dark d-inline-block p-3 m-2" xxl={5} xl={12} lg={12} sm={12} xs={12}>
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
      </Col>

      <Col className="border border-dark rounded d-inline-block p-3 m-2 align-top text-center" xxl={2} xl={3} lg={3} md={3} sm={3} xs={12}>
        <Image src={PHONE_ICON} className="h-25 w-25" />
        <hr/>
        <h1 className="display-5">Telephone:<br />XXX-XXXXXXX</h1>
      </Col>

      <Col className="border border-dark rounded d-inline-block p-3 m-2 align-top text-center" xxl={2} xl={3} lg={3} md={3} sm={3} xs={12}>
        <Image src={CLOCK_ICON} className="h-25 w-25" />
        <hr/>
        <h1 className="display-5"> Available hours:<br />h-h D</h1>
      </Col>

        <Col className="border border-dark rounded d-inline-block p-3 m-2 align-top text-center" xxl={2} xl={3} lg={3} md={3} sm={3} xs={12}>
          <Image src={WAZE_ICON} className="h-25 w-25" />
          <hr/>
          <h1 className="display-5">Waze Address:<br />link waze</h1>
        </Col>
      </Row>
    </Container>
  );
}
