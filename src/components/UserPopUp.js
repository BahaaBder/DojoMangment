import { React, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { observer, inject } from "mobx-react";

const UserPopUp = inject("ScheduleStore")(
  observer((props) => {
    const [show, setshow] = useState(true);
    // const [isJoined, setIsJoined] = useState(false);
    const handleClose = () => setshow(false);
    const [haveACource, sethaveACource] = useState(false);

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
      <Modal show={props.ScheduleStore.showModal} onHide={handleClose}>
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
