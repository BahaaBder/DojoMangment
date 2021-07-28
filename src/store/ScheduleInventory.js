import { observable, action, makeObservable, computed, toJS } from "mobx";
import axios from "axios";
const serverApi = "http://localhost:8080";
class ScheduleInventory{
  constructor() {
    this.showModal = false;
    this.listSchedule = [];
    this.userId=1;
    this.isHaveACource=false;

    makeObservable(this, {
      showModal: observable,
      listSchedule: observable,
      isHaveACource: observable,
      getSchedule: observable,
      handleAlertModalChange: action,
      mapScheduleToStr: action,
      deleteSchedule: action,
      computedList: computed,
      createNewSchedule:action,
      haveACource:action
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
      if(s.userId===this.userId){
         const object2 = Object.assign(  {},
          s,
          { id: s.id.toString() },
          { calendarId: this.userId.toString() })
          tempList.push(object2);
      }else{
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

  //Tawfiq
  JoinToCours = async (data) =>{
    try{
        let res = await axios.post(`${serverApi}/userSchedule`,{scheduleId:parseInt(data.scheduleId),userId:data.userId})
        console.log(res);
    }
    catch(error){
      console.log(error.message);
    }
  }

  haveACource = async (data) =>{
    let isExist = await axios.get(`http://localhost:8080/userSchedule?userId=${data.userId}&scheduleId=${data.scheduleId}`);
    this.isHaveACource = isExist.data;
  }

   //Tawfiq
   exitFromCource = async (data) =>{
    try{
      let res = await axios.delete(`${serverApi}/userSchedule`,{data:{scheduleId:parseInt(data.scheduleId),userId:data.userId}})
      console.log(res);
    }
    catch(error){
      console.log(error.message);
    }
  }

  getSchedule = () => {
    axios
      .get(`${serverApi}/schedules`)
      .then((response) => {
        console.log("-----list------", response.data);
        const temp = this.mapScheduleToStr(response.data);
        console.log("temp mapeed ", temp);
        Object.assign(this.listSchedule, temp);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
export default ScheduleInventory;