import { observable, makeObservable, action } from "mobx";
import axios from "axios";

const serverApi = "http://localhost:8080";
class aboutStore{
  constructor() {
    this.aboutList = axios.get(`${serverApi}/about`)
    makeObservable(this, {
      aboutList: observable,
      createNewAbout : action
    })
  }
  createNewAbout = async (obj) => {
    await axios.post("http://localhost:8080/about", obj).then((res) => {
      console.log(res);
    })
  }
}

export default aboutStore;