import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "mobx-react";
import ScheduleInventory from "./store/ScheduleInventory";
import aboutStore from './store/aboutStore'
import "bootstrap/dist/css/bootstrap.min.css";

let ScheduleStore = new ScheduleInventory();
let about = new aboutStore();
let store = {
  ScheduleStore,
  about
};
ReactDOM.render(<Provider {...store}><App /></Provider>,document.getElementById("root"))

reportWebVitals();