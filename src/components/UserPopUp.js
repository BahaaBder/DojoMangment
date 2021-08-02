import { React, useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Button, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import axios from "axios";
const UserPopUp = inject("ScheduleStore")(
  observer((props) => {
    const [show, setshow] = useState(true);
    const [isJoined, setIsJoined] = useState(false);
    const handleClose = () => setshow(false);
    const [haveACource, sethaveACource] = useState(false);
    useEffect(() => {
      async function chechIsExist() {
        let IsExist = await props.ScheduleStore.checkIfAlreadyJoin(
          props.scheduleInfo
        );
        sethaveACource(IsExist);
      }
      chechIsExist();
    }, []);
    useEffect(() => {}, [haveACource]);
    const handleJoin = () => {
      sethaveACource(true);
      props.ScheduleStore.JoinToCourse(props.scheduleInfo);
      setshow(false);
    };
    const handleLeave = () => {
      sethaveACource(false);
      props.ScheduleStore.exitFromCource(props.scheduleInfo);
      setshow(false);
    };
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.scheduleInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4> start: {props.scheduleInfo.start}</h4>
          <br />
          <h4> end: {props.scheduleInfo.end}</h4>
        </Modal.Body>
        <Modal.Footer>
          {!haveACource ? (
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
  })
);
export default UserPopUp;
