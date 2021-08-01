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
    console.log(props);
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [showModal, setShowModal] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [schedule, setSchedule] = useState({ department_id: 1 });
    const [indexDepartment, setIndexDepartment] = useState(0);
    const [departmentName, setDepartmentName] = useState("");
    const [department, setDepartment] = useState([{ name: "department" }]);
    const [departmentId, setDepartmentId] = useState(0);
    useEffect(() => {
      setDepartmentId(props.scheduleInfo.department_id);
      setDepartmentName(props.scheduleInfo.title);
      const apiCall = async () => {
        const res = await props.ScheduleStore.getAllDepartment();
        // debugger;
        setDepartment(res);
      };
      apiCall();
      setSchedule(props.scheduleInfo);
      setStartDate(dayjs(props.scheduleInfo.start).format("YYYY-MM-DDTHH:mm"));
      console.info(dayjs(props.scheduleInfo.start).format("YYYY-MM-DDTHH:mm"));
      // setShowModal()
      // setSelectedCustomer(props.customer)
      // console.log(selectedCustomer)
    }, []);
    useEffect(() => {
      console.log(department);
    }, [department]);
    function convertDate(date) {
      return dayjs(date).format("YYYY-MM-DDThh:mm");
    }
    console.log(convertDate());
    const handleDepartmentChange = (e) => {
      setDepartmentName(e.target.value);
      const department_id = department.find((d) => d.name == e.target.value);
      console.log(e.target.value);
      const newIndex = e.target.value - 1;
      console.log("%%%%", department[newIndex].id);
      setIndexDepartment(newIndex);
      // setSchedule(prevState => ({
      //   ...prevState,
      //   [e.target.name]: e.target.value
      // }))
    };
    const handleChange = (e) => {
      setSchedule((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
      console.log(" ------------------");
      console.log("name", e.target.name, "value", e.target.value);
      console.log(schedule);
      console.log("++++++++++++++++++++++");
      // console.info(e.target.name)
    };
    const handleSubmit = () => {
      // this should call handle update in our store
      // props.toggle()
      // console.log("-------after change=====",selectedCustomer)
      // const customerToUpdate={
      //     id:selectedCustomer.id,
      //     first:selectedCustomer.first,
      //     last:selectedCustomer.last,
      //     country:selectedCustomer.country
      // }
      // props.CustomerStore.updateSelectedCustomer(customerToUpdate)
    };
    const handleCancel = () => {};
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
                name="first"
                value={schedule.title || ""}
                onChange={handleChange}
              ></input>
              <br></br>
              <br></br>
              <span>Department</span>
              <div className="updateForm">
                <select
                  className="selectUpdate"
                  onChange={handleDepartmentChange}
                  value={department[indexDepartment].name}
                  name="department_id"
                >
                  {department.map((d, index) => {
                    return (
                      <option key={index} value={d.id}>
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
