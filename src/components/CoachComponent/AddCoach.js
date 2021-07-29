import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import { TextField } from '@material-ui/core';
// import Button f
import './style/Coach.css'
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
const serverApi = "http://localhost:8080";

class AddCoach extends Component {
  constructor() {
    super();
    this.state = {
      name: "", age: "", department: "", img: "", descShort: "", allDepartments: [],
      showError: false, showSuccess: false
    };
  }

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

  AddCoach = () => {
    //TODO : alert in matreail ui
    if (this.state.name === "" || this.state.department === "" ||
      this.state.age === "" || this.state.img === "" || this.state.descShort === "") {
      this.setState({ showError: true, showSuccess: false })
    }
    else {
      let coachData = {
        name: this.state.name,
        department_id: parseInt(this.state.department),
        age: parseInt(this.state.age),
        img: this.state.img,
        descShort: this.state.descShort,
        dojo_id: 1
      }
      this.props.CoachStore.saveCoach(coachData)
      this.setState({ showError: false, showSuccess: true })
      this.setState({ name: "", department: "", age: "", img: "", descShort: "" });
    }
  }

  componentDidMount = async () => {
    let allDepartments = await axios.get(serverApi + "/alldepartments");
    this.setState({ allDepartments: allDepartments.data })
  }

  render() {

    return (
      <div className="AddCoach">
        <h4>ADD Coach</h4>
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
        <Button className="btn" onClick={this.AddCoach}>Add New Coach</Button>
        <Alert variant="danger" show={this.state.showError}>
          Check Your Inputs Again !
        </Alert>
        <Alert show={this.state.showSuccess} variant="success">
          <p>We've added you to the site.</p>
        </Alert>
      </div>
    );
  }
}

export default inject("CoachStore")(observer(AddCoach));