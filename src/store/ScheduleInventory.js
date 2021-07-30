import { observable, action, makeObservable, computed, toJS } from "mobx";
import axios from "axios";
const serverApi = "http://localhost:8080";
class ScheduleInventory {
  constructor() {
    this.showModal = false;
    this.listSchedule = [];
    this.userId = 2;
    this.isHaveACource = false;
    this.arrayOfUserDepartment = [];
    this.listDepartments = [];
    makeObservable(this, {
      showModal: observable,
      listSchedule: observable,
      isHaveACource: observable,
      getSchedule: observable,
      handleAlertModalChange: action,
      mapScheduleToStr: action,
      deleteSchedule: action,
      computedList: computed,
      computedListDepartment: computed,

      createNewSchedule: action,
      haveACourse: action,
      JoinToCourse: action,
      arrayOfUserDepartment: observable,
      checkIfAlreadyJoin: action,
      checkPermission: action,
      getDepartments: action,
    });
  }

  get computedList() {
    return toJS(this.listSchedule);
  }
  get computedListDepartment() {
    return toJS(this.listDepartments);
  }
  handleAlertModalChange = () => {
    this.showModal = !this.showModal;
  };
  createNewSchedule = async (schedule) => {
    await axios.post(serverApi + "/schedules", schedule);
    this.getSchedule();
  };
  deleteSchedule = (schedule) => {
    axios.delete(serverApi + "/schedules", { data: schedule }).then(() => {
      this.getSchedule();
    });
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
    list.forEach((s) => {
      if (departmentArray.includes(s.department_id)) {
        const object2 = Object.assign({}, s, {
          calendarId: s.department_id.toString(),
        });
        tempList.push(object2);
      } else {
        const object2 = Object.assign({}, s, {
          calendarId: "0",
        });
        tempList.push(object2);
      }
    });
    return tempList;
  };
  getUserDepartments = (users_departments, user_id) => {
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
      this.getSchedule();
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
      this.getSchedule();
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
        const temp = await this.mapScheduleToStr(response.data);
        Object.assign(this.listSchedule, temp);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  checkPermission = async (type) => {
    let is_admin = await axios.get(
      `${serverApi}/permissions/?type=${type}&user_id=${this.userId}`
    );
    console.log(is_admin.data[0][type] == 1);
    return is_admin.data[0][type] == 1;
  };
  updateSchedule = (schedule) => {
    axios.put(`${serverApi}/updateSchedule`, schedule).then(() => {
      this.getSchedule();
    });
  };
  getDepartments = async () => {
    let departments = await axios.get(`${serverApi}/departments`);
    return departments.data;
  };
}
export default ScheduleInventory;
