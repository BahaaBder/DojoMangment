import { React, useState,useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Button, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import axios from "axios";
 const UserPopUp = inject("ScheduleStore")(
    observer((props) =>  {
  const [show, setshow] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const handleClose = () => setshow(false);
  const [haveACource, sethaveACource] = useState(false);

  useEffect( async () => {
    let isExist = await axios.get(`http://localhost:8080/userSchedule?userId=${props.scheduleInfo.userId}&scheduleId=${props.scheduleInfo.scheduleId}`);
    sethaveACource(isExist.data);
  }, [])

  const handleJoin = () => {
    // setIsJoined(true);
    sethaveACource(true);
    props.ScheduleStore.JoinToCours(props.scheduleInfo)
  };

  const handleLeave = () => {
    // setIsJoined(false);
    sethaveACource(false);
    props.ScheduleStore.exitFromCource(props.scheduleInfo)
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
}));

export default UserPopUp;