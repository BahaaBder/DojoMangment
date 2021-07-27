import { observer, inject } from "mobx-react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Register from "./components/Register";
//CustomerStore
import NavBar from "./components/NavBar";

import React from "react";

import Schedule from "./components/Schedule";

function App() {
  return (
    <div>
     <NavBar></NavBar>
    </div>
  );
}

export default App;
