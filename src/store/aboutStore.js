import { observable, makeObservable } from "mobx";
import axios from "axios";

const serverApi = "http://localhost:8080";
class aboutStore{
  constructor() {
    this.aboutList = axios.get(`${serverApi}/about`)
    makeObservable(this, {
      aboutList: observable,
    })
  }
}

export default aboutStore;