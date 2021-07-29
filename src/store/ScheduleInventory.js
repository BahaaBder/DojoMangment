import { observable, action, makeObservable, computed, toJS } from "mobx";
import axios from "axios";
const serverApi = "http://localhost:8080";
class ScheduleInventory {
  constructor() {
    this.showModal = false;
    this.listSchedule = [];
    this.userId = 1;
    this.isHaveACource = false;

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
    this.getSchedule()
  }
  deleteSchedule = async (schedule) => {
    await axios.delete(serverApi + "/schedules", { data: schedule });
    this.getSchedule()
  };
  filterDepartmentForUser = (departmentOfUser) => {
    console.log(" inside=======filterdepartment")
    const tempList = []
    this.listSchedule.forEach((s) => {
      if(departmentOfUser.includes(s.departmentID)){
        const object2 = Object.assign({},
          s,
          { calendarId: '0' })
        tempList.push(object2);

      }else{
        tempList.push(s);

      }
      this.listSchedule=tempList;
      console.log(" ------ after filtring ",tempList)


    })

  }

  mapScheduleToStr = (list) => {

    const tempList = [];
    list.forEach((s) => {
      if (s.userId === this.userId) {
        const object2 = Object.assign({},
          s,
          { id: s.id.toString() },
          { calendarId: this.userId.toString() })
        tempList.push(object2);
      } else {
        const object2 = Object.assign(
          {},
          s,
          { id: s.id.toString() },
          { calendarId: s.calendarId.toString() }
        );
        tempList.push(object2);
      }
    });
    return tempList;
  };
  getUserDepartments = (users_departments, user_id) => {
    console.log(" insid function ", users_departments)
    let departmentForUser = [];
    users_departments.forEach((user_department) => {
      if (user_department.user_id == user_id) {
        departmentForUser.push(user_department.department_id);
      }
    });
    return departmentForUser;
  };
  //Tawfiq

  filterByUserDepartment=async ()=>{
    let getMyUser = await axios.get(`${serverApi}/userDepartment`)

    let departmentArray = this.getUserDepartments(getMyUser.data, this.userId)
    this.filterDepartmentForUser(departmentArray)
    console.log(this.computedList);

  }
  JoinToCourse = async (data) => {
    try {

      let res = await axios.post(`${serverApi}/userDepartment`, { department_id: parseInt(data.calendarId), user_id: data.userId })
      let getMyUser = await axios.get(`${serverApi}/userDepartment`, { department_id: parseInt(data.calendarId), user_id: data.userId })
      let departmentArray = this.getUserDepartments(getMyUser.data, data.userId)
      this.filterDepartmentForUser(departmentArray)
     


    }
    catch (error) {
      console.log(error.message);
    }
  }

  haveACourse = async (data) => {

    // let isExist = await axios.get(`http://localhost:8080/userSchedule?userId=${data.userId}&scheduleId=${data.scheduleId}`);
    // this.isHaveACource = isExist.data;
  }


  //Tawfiq
  exitFromCource = async (data) => {
    try {
      let res = await axios.delete(`${serverApi}/userSchedule`, { data: { scheduleId: parseInt(data.scheduleId), userId: data.userId } })
      console.log(res);
    }
    catch (error) {
      console.log(error.message);
    }
  }
  changeScheduleColor = (userId) => {
    let temp = [];
    let schedule = toJS(this.listSchedule);
    axios
      .get(`${serverApi}/userInSchedule`).then((response) => {
        let usersInSchedule = response.data
        let isExist = false;
        schedule.forEach((s) => {
          usersInSchedule.forEach(user => {
            if (s.userId === user.userId && parseInt(s.id) === user.schedule_id) {
              isExist = true;
            }
          });
          if (isExist) {
            const object2 = Object.assign({},
              s,
              { id: s.id.toString() },
              { calendarId: '4' })
            temp.push(object2);
          } else {
            const object2 = Object.assign(
              {},
              s,
              { id: s.id.toString() },
              { calendarId: '5' }
            );
            temp.push(object2);
          }
        });
        Object.assign(this.listSchedule, temp);
      })
  };

  getSchedule = () => {
    axios
      .get(`${serverApi}/schedules`)
      .then((response) => {
        console.log("-----list------", response.data);
        const temp = this.mapScheduleToStr(response.data);
        Object.assign(this.listSchedule, temp);
        this.filterByUserDepartment()
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}


export default ScheduleInventory;