import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "mobx-react";
import ScheduleInventory from "./store/ScheduleInventory";
import "bootstrap/dist/css/bootstrap.min.css";
import Coach from "./store/CoachStore";

const ScheduleStore = new ScheduleInventory();
const CoachStore = new Coach();
const store = {
  ScheduleStore,
  CoachStore,
};
ReactDOM.render(
  <Provider {...store}>
    {" "}
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
