import { observable, action, makeObservable, computed, toJS } from "mobx";
import axios from "axios";
const serverApi = "http://localhost:8080";
class ScheduleInventory{
  constructor() {
    this.showModal = false;
    this.listSchedule = [];
    makeObservable(this, {
      showModal: observable,
      listSchedule: observable,
      handleAlertModalChange: action,
      getSchedule: observable,
      mapScheduleToStr: action,
      deleteSchedule: action,
      computedList: computed,
      createNewSchedule: action,
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
  mapScheduleToStr = (list) => {
    const tempList = [];
    list.forEach((s) => {
      const object2 = Object.assign(
        {},
        s,
        { id: s.id.toString() },
        { calendarId: s.calendarId.toString() }
      );
      tempList.push(object2);
    });
    return tempList;
  };
  getSchedule = () => {
    axios
      .get(`${serverApi}/schedules`)
      .then((response) => {
        console.log("-----list------", response.data);
        const temp = this.mapScheduleToStr(response.data);
        console.log("temp mapeed ", temp);
        Object.assign(this.listSchedule, response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
export default ScheduleInventory;
