import { observable, action, makeObservable, computed, toJS } from "mobx";
import axios from "axios";
const serverApi = "http://localhost:8080";
class ScheduleInventory{
  constructor() {
    this.showModal = false;
<<<<<<< HEAD
    this.listSchedule = {list:[]}
    this.tempProxy = [];

=======
    this.listSchedule = [];
>>>>>>> master
    makeObservable(this, {
      showModal: observable,
      listSchedule: observable,
      handleAlertModalChange: action,
      getSchedule: observable,
      mapScheduleToStr: action,
      deleteSchedule: action,
      computedList: computed,
      createNewSchedule:action
    });
  }
  get computedList() {
    return toJS(this.listSchedule);
  }
  handleAlertModalChange = () => {
    this.showModal = !this.showModal;
  };
  createNewSchedule=async (schedule)=>{
    await axios.post(serverApi + "/schedules",  schedule );
    this.getSchedule()


  }
  deleteSchedule = async (schedule) => {
    await axios.delete(serverApi + "/schedules", { data: schedule });
    this.getSchedule()

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
<<<<<<< HEAD

  getSchedule = async () => {
    let tempData = axios.get(`${serverApi}/schedules`)
    let data = await tempData
    this.listSchedule.list = data.data
    // console.log(this.listSchedule.list);
    // axios.get(`${serverApi}/schedules`)
    //   .then((response) => {
    //     console.log("-----list------", response.data);
    //     const temp = this.mapScheduleToStr(response.data);
    //     console.log("temp mapeed ", temp);
    //     this.tempProxy = temp;

    //     Object.assign(this.listSchedule, response.data);

    //     // console.log(" my list ",this.tempProxy)
    //     // this.listSchedule = response.data
    //     // // this.listSchedule =this.mapScheduleToStr(response.data )
    //     // console.log(response.data)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // let temp;
    // temp = await this.mapScheduleToStr(this.listSchedule)
    // this.listSchedule = [...temp]
    // console.log("-----", temp)
    // console.log("--0000---", this.listSchedule)
  };
}

=======
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
>>>>>>> master
export default ScheduleInventory;