import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button,Modal } from 'react-bootstrap';
import "./style/Coach.css"

export default class Coach extends Component {
  constructor() {
    super();
    this.state={show:false}
  }
  handleClose = () => {this.setState({show:false})};
  handleShow = () => {this.setState({show:true})};

  render() {
    let coach = this.props.coach
    return (
      <div>
        <div className="coachMain" onClick={this.handleShow}>          
            <span>
                <img className="coachImg" src={coach.img} />
            </span>
            <span className="displayName">
                <div >
                    {coach.name} 
                </div>
                <div >
                    {coach.type}
                </div>
            </span> 
        </div>
        <Modal className="modal" show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="coach-info">about {coach.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyModal">
            <div class="onlyImg" >
                <img className="coachImg" src={coach.img} />
            </div>
            <div className="info">
                <div>
                    {coach.name} - {coach.type} ({coach.year})
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
      </div>
    );
  }
}
