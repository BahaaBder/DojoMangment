import { observable, action, makeObservable, computed, toJS } from "mobx";
import axios from "axios";

const serverApi = "http://localhost:8080";
class CoachStore {
  constructor() {

    this.coachs = [];

    makeObservable(this, {
      coachs: observable,
      getAllCoachs: action,
      saveCoach: action,
      UpdateCoach: action ,
    });
  }


  getAllCoachs = async () => {
    let coachsData = await axios.get(`${serverApi}/coachs`);
    this.coachs = coachsData.data;
  };

  saveCoach = async (coachData) => {
     let req = await axios.post(`${serverApi}/coachs`,{data: coachData})
     console.log(req);
  };

  UpdateCoach = async (coachData) => {
    let req = await axios.put(`${serverApi}/coachs`,{data: coachData})
    console.log(req);
  }
}

export default CoachStore;
