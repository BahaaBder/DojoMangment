import React, { Component } from "react";
import { Button, Modal } from 'react-bootstrap';
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
  }

  componentDidMount = async () => {
    let allDepartments = await axios.get(serverApi + "/alldepartments");
    this.setState({ allDepartments: allDepartments.data })
  }

  render() {
    let coach = this.props.coach
    return (
      <div>
        <div className="coachMain" onClick={this.handleShow}>
          <span>
            <img className="coachImg" src={coach.img} alt="" />
          </span>
          <span className="displayName">
            <div >
              {coach.name}
            </div>
            <div >
              {coach.departmentName}
            </div>
          </span>
        </div>
        <Modal className="modal" show={this.state.show && this.props.showDetails} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="coach-info">about {coach.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bodyModal">
            <div className="onlyImg" >
              <img className="coachImg" src={coach.img} alt="" />
            </div>
            <div className="info">
              <div>
                {coach.name} - {coach.type} ({coach.age})
              </div>

              <div>
                <p>{coach.descrShort}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn" variant="secondary" onClick={this.handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>

        <Modal className="modal" show={this.state.show && !this.props.showDetails} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="coach-info">about {coach.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bodyModal">
            <h4>Update Coach</h4>
            <div className="txtfild">
              <span>Name: </span>
              <TextField className="text" id="name-input"
                value={this.state.name}
                onChange={this.change} />
            </div>
            <div className="txtfild">
              <span>department: </span>

              <select className="text" id="department-input" value={this.state.department} onChange={this.change}>
                {this.state.allDepartments.map((department, ind) => {
                  return (<option key={ind} value={department.id}>{department.name}</option>)
                })}
              </select>
            </div>
            <div className="txtfild">
              <span>age: </span>
              <TextField className="text" id="age-input"
                value={this.state.age}
                onChange={this.change} />
            </div>
            <div className="txtfild">
              <span>img: </span>
              <TextField className="text" id="img-input"
                label="img url"
                multiline
                maxRows={4}
                value={this.state.img}
                onChange={this.change}
              />
            </div>
            <div className="txtfild">
              <span>short description: </span>
              <textarea className="text" id="descShort-input"
                label="short description"
                multiline
                maxRows={7}
                value={this.state.descShort}
                onChange={this.change}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn" onClick={this.UpdateCoach}>save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default inject("CoachStore")(observer(Coach));