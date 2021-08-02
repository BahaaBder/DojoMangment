import React, { Component } from "react";
import { Button, Modal, Col, Image, Container, Form } from 'react-bootstrap';
import "./style/Coach.css"
import { TextField } from "@material-ui/core";
import { observer, inject } from 'mobx-react';
import axios from "axios";
import Swal from 'sweetalert2'
const serverApi = "http://localhost:8080";
class Coach extends Component {
  constructor() {
    super();
    this.state = { show: false, name: "", age: "", department: "", img: "", descShort: "", allDepartments: [] }
  }
  handleClose = () => {
    this.setState({ show: false })
    console.log("close : ", this.state.show);
  }
  handleShow = () => {
    this.setState({ show: true })
    console.log("show : ", this.state.show);
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
  UpdateCoach = async () => {
    let coachData = {
      id: this.props.coach.id,
      name: this.state.name ? this.state.name : this.props.coach.name,
      department_id: parseInt(this.state.department) ? parseInt(this.state.department) : this.props.coach.department_id,
      age: parseInt(this.state.age) ? parseInt(this.state.age) : this.props.coach.age,
      img: this.state.img ? this.state.img : this.props.coach.img,
      descShort: this.state.descShort ? this.state.descShort : this.props.coach.descrShort,
      dojo_id: 1
    }
    await this.props.CoachStore.UpdateCoach(coachData);
    let temp = await this.props.CoachStore.coachs
    this.props.updateCoachs(temp.data);
    await this.props.CoachStore.getAllCoachs();
    this.setState({ name: "", department: "", age: "", img: "", descShort: "", show: false });
  }

  DeleteCoach = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
      if (result.isConfirmed) {
        let isDelete = await this.props.CoachStore.DeleteCoach(this.props.coach.id);
        
          Swal.fire(
              'Deleted!',
              `The data has been deleted. 😔`,
              'success'
          )}
          this.handleClose()
          await this.props.CoachStore.getAllCoachs();
          this.setState({ name: "", department: "", age: "", img: "", descShort: "", show: false });
        })


  }

  componentDidMount = async () => {
    let allDepartments = await axios.get(serverApi + "/alldepartments");
    this.setState({ allDepartments: allDepartments.data })
  }
  render() {
    let coach = this.props.coach
    return (
      <Col xxl={6} xl={6} md={6} sm={12} xs={12} className="d-flex align-items-center justify-content-center mb-5 text-center">

        <Col xxl={12} xl={12} md={12} sm={12} xs={12} className="mb-5 text-center coachImgCard" onClick={this.handleShow}>
          <Image src={coach.img} className="w-50 h-50" />
          <h1 className="font-weight-bold mb-3">{coach.name}</h1>
          <h4 className="font-weight-bold grey-text mb-3">{coach.departmentName}</h4>
        </Col>

        <Container>
          <Modal className="modal" show={this.state.show && this.props.showDetails} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="coach-info"><div className="sign-in-titleCoach">about {coach.name}</div></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
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
              <Button className="button-close" variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal className="modal" show={this.state.show && !this.props.showDetails} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="coach-info"><div className="sign-in-titleCoach">About {coach.name}</div></Modal.Title>
            </Modal.Header>
            <Modal.Body className="bodyModle">
              <Form >
                <Form.Group className="mb-3">
                  <Form.Control id="name-input" value={this.state.name} className="user-input-coach" type="text" placeholder="Enter Name" onChange={this.change} />

                  <Form.Label>Department : </Form.Label>
                  <Form.Select id="department-input" className="user-input-coach" value={this.state.department} onChange={this.change}>
                    <option></option>
                    {
                      this.state.allDepartments.map((department, ind) => {
                        return (<option key={ind} value={department.id}>{department.name}</option>)
                      })
                    }
                  </Form.Select>
                  <Form.Control id="age-input" className="user-input-coach" value={this.state.age} type="text" placeholder="Enter age" onChange={this.change} />
                  <Form.Control id="img-input" className="user-input-coach" value={this.state.img} type="text" placeholder="Enter Image URL" onChange={this.change} />
                  <Form.Control id="descShort-input" className="user-input-coach" value={this.state.descShort} as="textarea" rows={7} placeholder="Short Description" onChange={this.change} />
                </Form.Group>
              </Form>

            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-save-changes" onClick={this.UpdateCoach}>Save Changes</Button>
            </Modal.Footer>
            <Button className="btn btn-delete-coach" onClick={this.DeleteCoach}>Delete Coach</Button>
          </Modal>
        </Container>
      </Col>
    );
  }
}
export default inject("CoachStore")(observer(Coach));