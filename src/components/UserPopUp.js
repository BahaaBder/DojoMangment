import { React, useState } from "react";
import { TextField } from "@material-ui/core";
import { Button, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function UserPopUp(props) {
  const [show, setshow] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const handleClose = () => setshow(false);
  const handleJoin = () => {
    setIsJoined(true);
  };
  const handleLeave = () => {
    setIsJoined(false);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.scheduleInfo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        start: {props.scheduleInfo.start}
        <br />
        end: {props.scheduleInfo.end}
      </Modal.Body>
      <Modal.Footer>
        {!isJoined ? (
          <Button variant="secondary" onClick={handleJoin}>
            Join
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleLeave}>
            Leave
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}