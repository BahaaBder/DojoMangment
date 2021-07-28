import { observable, action, makeObservable, computed, toJS } from "mobx";

class LogInStore {
    constructor() {
  
      this.isSign = false;
  
      makeObservable(this, {
        isSign: observable,
        updateSign: action,
  
      });
    }
  
    updateSign = (isSign) => {
       this.isSign = isSign;
    };
  
  }
  
  export default LogInStore;