import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "mobx-react";
import ScheduleInventory from "./store/ScheduleInventory";
import aboutStore from './store/aboutStore'
import "bootstrap/dist/css/bootstrap.min.css";
import Coach from "./store/CoachStore";
import LogIn from "./store/LogInStore";

let ScheduleStore = new ScheduleInventory();
let about = new aboutStore();
const CoachStore = new Coach();
const LogInStore = new LogIn();
const store = {
  about,
  ScheduleStore,
  CoachStore,
  LogInStore
};
ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById("root")
);