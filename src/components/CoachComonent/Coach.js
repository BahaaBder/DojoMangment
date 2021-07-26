import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button,Modal } from 'react-bootstrap';
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
        <div class="coachImg" onClick={this.handleShow}>
            <img src={coach.img} />
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="coach-info">
                <div>
                    {coach.name} ({coach.year})
                </div>
                <div>
                    <img src={coach.img} />
                </div>
                <div>
                    <p>{coach.descrShort}</p>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}
