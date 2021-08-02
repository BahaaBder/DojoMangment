import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { TextField } from "@material-ui/core";
import './style/Coach.css'
import { Button, Alert, Form } from "react-bootstrap";
import axios from "axios";
var validUrl = require('valid-url');
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
    if (this.state.name === "" || this.state.department === "" ||
      this.state.age === "" || this.state.descShort === "") {
      this.setState({ showError: true, showSuccess: false })
    }
    else if(this.state.img.length>0 && !this.checkURLValid(this.state.img)){
      this.setState({ showError: true, showSuccess: false })
    }
    else {
      let coachData = {
        name: this.state.name,
        department_id: parseInt(this.state.department),
        age: parseInt(this.state.age),
        img: this.state.img ? this.state.img : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        descShort: this.state.descShort,
        dojo_id: 1
      }
      this.props.CoachStore.saveCoach(coachData)
      this.setState({ showError: false, showSuccess: true })
      this.setState({ name: "", department: "", age: "", img: "", descShort: "" });
    }
  };

  checkURLValid = (url) => {
    if (validUrl.isUri(url)) {
      return true;
    }
    else {
      return false;
    }
  };

  componentDidMount = async () => {
    let allDepartments = await axios.get(serverApi + "/alldepartments");
    this.setState({ allDepartments: allDepartments.data })
  }

  componentDidMount = async () => {
    let allDepartments = await axios.get(serverApi + "/alldepartments");
    this.setState({ allDepartments: allDepartments.data })
  }

  render = () => {
    return (
      
      <Form className="AddCoach">
         <Form.Group className="mb-3">
        <Form.Label>ADD Coach</Form.Label>
        <Form.Control id="name-input" value={this.state.name} type="text" placeholder="Enter Name" onChange={this.change}/>
        <br></br>

        <Form.Label>Department : </Form.Label>
        <Form.Select id="department-input" value={this.state.department} onChange={this.change}>
        <option></option>
          {
            this.state.allDepartments.map((department, ind) => {
            return (<option key={ind} value={department.id}>{department.name}</option>)
          })
          }
        </Form.Select>
        <br></br>
        <Form.Control id="age-input" value={this.state.age} type="text" placeholder="Enter age" onChange={this.change} />
        <br></br>
        <Form.Control id="img-input" value={this.state.img} type="text" placeholder="Enter Image URL" onChange={this.change} />
        <br></br>
        <Form.Control id="descShort-input" value={this.state.descShort} as="textarea" rows={7} placeholder="Short Description" onChange={this.change} />

        <Button className="btn" onClick={this.AddCoach}>
          Add New Coach
        </Button>

        <Alert variant="danger" show={this.state.showError}>
          Check Your Inputs Again !
        </Alert>

        <Alert show={this.state.showSuccess} variant="success">
          <p>We've added you to the site.</p>
        </Alert>
        </Form.Group>
      </Form>
    );
  }
}

export default inject("CoachStore")(observer(AddCoach));
