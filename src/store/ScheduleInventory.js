import { observable, action, makeObservable, computed, toJS } from "mobx";
import axios from "axios";
const serverApi = "http://localhost:8080";
class ScheduleInventory {
  constructor() {
    this.showModal = false;
    this.listSchedule = [];
    this.userId = 1;
    this.isHaveACource = false;
    this.arrayOfUserDepartment = [];
    makeObservable(this, {
      showModal: observable,
      listSchedule: observable,
      isHaveACource: observable,
      getSchedule: observable,
      handleAlertModalChange: action,
      mapScheduleToStr: action,
      deleteSchedule: action,
      computedList: computed,
      createNewSchedule: action,
      haveACourse: action,
      JoinToCourse: action,
      arrayOfUserDepartment: observable,
      checkIfAlreadyJoin: action,
    });
  }

  get computedList() {
    return toJS(this.listSchedule);
  }
  handleAlertModalChange = () => {
    this.showModal = !this.showModal;
  };
  createNewSchedule = async (schedule) => {
    await axios.post(serverApi + "/schedules", schedule);
    this.getSchedule();
  };
  deleteSchedule = async (schedule) => {
    await axios.delete(serverApi + "/schedules", { data: schedule });
    this.getSchedule();
  };

  filterDepartmentForUser = (departmentOfUser) => {
    console.log(" inside=======filterdepartment");
    const tempList = [];
    this.listSchedule.forEach((s) => {
      if (departmentOfUser.includes(s.departmentID)) {
        const object2 = Object.assign({}, s, { calendarId: "0" });
        tempList.push(object2);
      } else {
        tempList.push(s);
      }
      this.listSchedule = tempList;
      console.log(" ------ after filtring ", tempList);
    });
  };

  mapScheduleToStr = async (list) => {
    const tempList = [];
    let getMyUser = await axios.get(`${serverApi}/userDepartment`);

    let departmentArray = this.getUserDepartments(getMyUser.data, this.userId);
    console.log("++++", departmentArray);
    list.forEach((s) => {
      console.log("--##", s);
      if (departmentArray.includes(s.department_id)) {
        const object2 = Object.assign({}, s, { calendarId: "1" });
        tempList.push(object2);
      } else {
        const object2 = Object.assign({}, s, { calendarId: "0" });
        tempList.push(object2);
      }
    });
    return tempList;
  };
  getUserDepartments = (users_departments, user_id) => {
    console.log(" insid function ", users_departments);
    let departmentForUser = [];
    users_departments.forEach((user_department) => {
      if (user_department.user_id == user_id) {
        departmentForUser.push(user_department.department_id);
      }
    });
    this.arrayOfUserDepartment = departmentForUser;
    return departmentForUser;
  };

  filterByUserDepartment = async () => {
    let getMyUser = await axios.get(`${serverApi}/userDepartment`);
    let departmentArray = this.getUserDepartments(getMyUser.data, this.userId);
    this.filterDepartmentForUser(departmentArray);
  };

  //Tawfiq

  checkIfAlreadyJoin = async (data) => {
    let departmentPromise = await axios.get(
      `${serverApi}/departmentOfSchedule/${data.scheduleId}`
    );
    const dep_id = departmentPromise.data[0].department_id;
    return this.arrayOfUserDepartment.includes(dep_id);
  };
  JoinToCourse = async (data) => {
    try {
      let departmentPromise = await axios.get(
        `${serverApi}/departmentOfSchedule/${data.scheduleId}`
      );
      const dep_id = departmentPromise.data[0].department_id;
      console.log("Join $ :", dep_id);

      let res = await axios.post(`${serverApi}/userDepartment`, {
        userId: data.userId,
        departmentId: dep_id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  haveACourse = async (data) => {
    // let isExist = await axios.get(`http://localhost:8080/userSchedule?userId=${data.userId}&scheduleId=${data.scheduleId}`);
    // this.isHaveACource = isExist.data;
  };

  //Tawfiq
  exitFromCource = async (data) => {
    let departmentPromise = await axios.get(
      `${serverApi}/departmentOfSchedule/${data.scheduleId}`
    );
    const dep_id = departmentPromise.data[0].department_id;
    console.log("Join $ :", dep_id);

    try {
      let res = await axios.delete(`${serverApi}/userDepartment`, {
        data: { department_id: dep_id, user_id: data.userId },
      });
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  changeScheduleColor = (userId) => {
    let temp = [];
    let schedule = toJS(this.listSchedule);
    axios.get(`${serverApi}/userInSchedule`).then((response) => {
      let usersInSchedule = response.data;
      let isExist = false;
      schedule.forEach((s) => {
        usersInSchedule.forEach((user) => {
          if (s.userId === user.userId && parseInt(s.id) === user.schedule_id) {
            isExist = true;
          }
        });
        if (isExist) {
          const object2 = Object.assign(
            {},
            s,
            { id: s.id.toString() },
            { calendarId: "4" }
          );
          temp.push(object2);
        } else {
          const object2 = Object.assign(
            {},
            s,
            { id: s.id.toString() },
            { calendarId: "5" }
          );
          temp.push(object2);
        }
      });
      Object.assign(this.listSchedule, temp);
    });
  };

  changeScheduleColor = () => {
    let temp = [];
    let schedule = toJS(this.listSchedule);
    axios.get(`${serverApi}/userInSchedule`).then((response) => {
      let usersInSchedule = response.data;
      let isExist = false;
      schedule.forEach((s) => {});
      Object.assign(this.listSchedule, temp);
    });
  };
  getSchedule = () => {
    axios
      .get(`${serverApi}/schedules`)
      .then(async (response) => {
        console.log("-----list------", response.data);
        const temp = await this.mapScheduleToStr(response.data);
        Object.assign(this.listSchedule, temp);
        console.log("$ ", this.computedList);
        //this.filterByUserDepartment();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default ScheduleInventory;
