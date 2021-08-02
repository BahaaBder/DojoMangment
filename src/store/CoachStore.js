import { observable, action, makeObservable, computed} from "mobx";
import axios from "axios";


const serverApi = "http://localhost:8080";
class CoachStore {
  constructor() {
    this.coachs = []
    
    makeObservable(this, {
      coachs: observable,
      getAllCoachs: action,
      saveCoach: action,
      UpdateCoach: action ,
      DeleteCoach: action,
      getCoachs: computed,
    });
  }


  get getCoachs() {
    return this.coachs;
  }
  // getAllCoachs = async () => {
  //   let coachsData = await axios.get(`${serverApi}/coachs`);
  //   this.coachs = coachsData.data;
  // };
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
  DeleteCoach = async (coachId) => {
    let req = await axios.delete(`${serverApi}/coachs`,{data: {coachId}})
    return req.data;
  }
}

export default CoachStore;