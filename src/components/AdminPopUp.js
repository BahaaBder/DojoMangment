import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { observer, inject } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import dayjs from "dayjs";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const AdminPopUp = inject("ScheduleStore")(
  observer((props) => {
    const classes = useStyles();
    const [schedule, setSchedule] = useState({});
    const [departments, setDepartments] = useState([{}]);
    useEffect(() => {
      setSchedule(props.scheduleInfo);
      const apiCall = async () => {
        const res = await props.ScheduleStore.getAllDepartment();
        setDepartments(res);
      };
      apiCall();
    }, []);

    useEffect(() => {
      console.log(departments);
    }, [departments]);

    function convertDate(date) {
      return dayjs(date).format("YYYY-MM-DDThh:mm");
    }

    const handleDepartmentChange = async (e) => {
      let department = departments.find((d) => d.name == e.target.value);
      setSchedule((prevState) => ({
        ...prevState,
        department_name: department.name,
        department_id: department.id,
      }));
    };
    const handleChange = (e) => {
      setSchedule((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const handleSubmit = () => {
      console.log(schedule);
    };
    return (
      <div>
        <Modal
          show={props.show}
          onHide={props.ScheduleStore.handleAlertModalChange}
        >
          <Modal.Header>
            <Modal.Title>{"your selected schedule"} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <span>Title</span>
              <input
                name="title"
                value={schedule.title || ""}
                onChange={handleChange}
              />
              <br></br>
              <br></br>
              <span>Department</span>
              <div>
                <select
                  className="selectUpdate"
                  onChange={handleDepartmentChange}
                  value={schedule.department_name}
                >
                  {departments.map((d, index) => {
                    return (
                      <option key={index} value={d.name}>
                        {d.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <br></br>
            </div>
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="startDate"
                type="datetime-local"
                defaultValue={convertDate(props.scheduleInfo.start)}
                className={classes.textField}
                onChange={handleChange}
                name="start"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="datetime-local"
                label="endDate"
                type="datetime-local"
                defaultValue={convertDate(props.scheduleInfo.end)}
                className={classes.textField}
                onChange={handleChange}
                name="end"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              update
            </Button>
            <Button
              variant="primary"
              onClick={props.ScheduleStore.handleAlertModalChange}
            >
              cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  })
);
export default AdminPopUp;
