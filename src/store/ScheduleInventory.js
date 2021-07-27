import { observable, action, makeObservable, computed, toJS } from "mobx";
import axios from "axios";

const serverApi = "http://localhost:8080";
class ScheduleInventory {
  constructor() {
    this.showModal = false;
    this.listSchedule = [];
    this.tempProxy = [];

    makeObservable(this, {
      showModal: observable,
      listSchedule: observable,
      handleAlertModalChange: action,
      getSchedule: observable,
      mapScheduleToStr: action,
      computedList: computed,
    });
  }
  get computedList() {
    return toJS(this.listSchedule);
  }

  handleAlertModalChange = () => {
    this.showModal = !this.showModal;
  };

  mapScheduleToStr = (list) => {
    const tempList = [];
    list.forEach((s) => {
      const object2 = Object.assign(
        {},
        s,
        { id: s.id.toString() },
        { calenderId: s.calenderId.toString() }
      );
      tempList.push(object2);
      // console.log(object2)
    });
    return tempList;
  };

  getSchedule = () => {
    axios
      .get(`${serverApi}/schedules`)
      .then((response) => {

        this.listSchedule=response

        const temp = this.mapScheduleToStr(response.data);

        Object.assign(this.listSchedule, response.data);


      })
      .catch(function (error) {
        console.log(error);
      });
    
  };
}

export default ScheduleInventory;
