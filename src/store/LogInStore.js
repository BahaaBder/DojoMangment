import { observable, action, makeObservable, computed, toJS } from "mobx";

class LogInStore {
    constructor() {
  
      this.isSign = false;
      this.userId=0;
      makeObservable(this, {
        isSign: observable,
        userId:observable,
        updateSign: action,
  
      });
    }
  
    updateSign = (isSign) => {
       this.isSign = isSign;
    };
    updateId= (userId) => {
      this.userId = userId;
   };
  }
  
  export default LogInStore;