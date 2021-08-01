// import { observer, inject } from "mobx-react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useEffect } from "react";

//CustomerStore
import NavBar from "./components/NavBar";

import React from "react";
import AdminPopUp from "./components/AdminPopUp";

// import Schedule from "./components/Schedule";
// import Coachs from "./components/CoachComponent/Coachs";
// import AddCoach from "./components/CoachComponent/AddCoach";
// import LogIn from "./components/LogInComponent/LogIn";
// import Register from "./components/LogInComponent/Register";

function App() {
  const info = {
    id: 1,
    title: "MMA Mixed Martil art ",
    category: "time",
    duDateClass: "",
    start: "2021-07-25T12:00:00.000Z",
    //2017-05-24T10:30
    end: "2021-07-25T14:30:00.000Z",
    department_id: 1,
  };
  return (
    <div>
      {/* <NavBar></NavBar> */}
      <AdminPopUp show={true} scheduleInfo={info}></AdminPopUp>
    </div>
  );
}

export default App;
