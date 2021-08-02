import { observable, action, makeObservable, computed } from "mobx";
class LogInStore {
  constructor() {
    this.isSign = false;
    this.isAdmin = false
    this.userId = 0;
    makeObservable(this, {
      isSign: observable,
      userId: observable,
      isAdmin: observable,
      updateSign: action,
      updateId: action,
      updateAdminState: action,
      computeIsSign: computed,
      computeIsAdmin: computed,
    });
  }
  get computeIsSign() {
    let sign = sessionStorage.getItem("isSign");
    this.isSign=sign
    return this.isSign
    // sessionStorage.getItem("isSign");
  }
  get computeIsAdmin() {
    let admin = sessionStorage.getItem("isAdmin");
    this.isAdmin=admin;
    return this.isAdmin
    // sessionStorage.getItem("isAdmin");
  }
  updateSign = (isSign) => {
    this.isSign = isSign;
    sessionStorage.setItem("isSign",isSign);
  };
  updateId = (userId) => {
    this.userId = userId;
  };
  updateAdminState = (state) => {
    this.isAdmin = state;
    sessionStorage.setItem("isAdmin",this.isAdmin);
  };
}
export default LogInStore;
