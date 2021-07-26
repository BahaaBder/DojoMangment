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
        console.log("-----list------", response.data);
        const temp = this.mapScheduleToStr(response.data);
        console.log("temp mapeed ", temp);
        this.tempProxy = temp;

        Object.assign(this.listSchedule, response.data);

        // console.log(" my list ",this.tempProxy)
        // this.listSchedule = response.data
        // // this.listSchedule =this.mapScheduleToStr(response.data )
        // console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    // let temp;
    // temp = await this.mapScheduleToStr(this.listSchedule)
    // this.listSchedule = [...temp]
    // console.log("-----", temp)
    // console.log("--0000---", this.listSchedule)
  };
}

export default ScheduleInventory;
