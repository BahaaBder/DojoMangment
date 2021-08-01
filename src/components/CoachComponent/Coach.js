import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Col, Image, Modal, Button } from 'react-bootstrap'
import "./style/Coach.css"
import { TextField } from "@material-ui/core";
import { observer, inject } from 'mobx-react';
import axios from "axios";
const serverApi = "http://localhost:8080";

class Coach extends Component {
  constructor() {
    super();
    this.state = { show: false,name: "", age: "", department: "", img: "", descShort: "", allDepartments: [] }
  }
  handleClose = () => { this.setState({ show: false }) };
  handleShow = () => { this.setState({ show: true }) };

  change = (e) => {
    let id = e.target.id;
    let inputVal = e.target.value;
    if (id === "name-input") {
      this.setState({ name: inputVal })
    }
    else if (id === "department-input") {
      this.setState({ department: inputVal })
    }
    else if (id === "age-input") {
      this.setState({ age: inputVal })
    }
    else if (id === "img-input") {
      this.setState({ img: inputVal })
    }
    else {
      this.setState({ descShort: inputVal })
    }
  }

  UpdateCoach = () => {

    let coachData = {
      id: this.props.coach.id ,
      name: this.state.name ? this.state.name : this.props.coach.name ,
      department_id: parseInt(this.state.department) ? parseInt(this.state.department) : this.props.coach.department_id,
      age: parseInt(this.state.age) ? parseInt(this.state.age) : this.props.coach.age ,
      img: this.state.img ? this.state.img : this.props.coach.img,
      descShort: this.state.descShort ? this.state.descShort : this.props.coach.descrShort,
      dojo_id: 1
    }
    this.props.CoachStore.UpdateCoach(coachData)
    this.setState({ name: "", department: "", age: "", img: "", descShort: "" ,show:false});
    // this.setState({show:false})

  }

  componentDidMount = async () => {
    let allDepartments = await axios.get(serverApi + "/alldepartments");
    this.setState({ allDepartments: allDepartments.data })
  }

  render() {
    let coach = this.props.coach
    return (
          <Col xxl={4} xl={4} md={6} sm={12} xs={12} className="mb-5 text-center">
            <Image src={coach.img} className="w-50 h-50" />
            <h1 className="font-weight-bold mb-3">{coach.name}</h1>
            <h4 className="font-weight-bold grey-text mb-3">{coach.departmentName}</h4>
            <h3 className="grey-text">{coach.name} - {coach.type} ({coach.age})</h3>
            <p className="grey-text">{coach.descrShort}</p>
          </Col>
    )
  }
}
export default inject("CoachStore")(observer(Coach));