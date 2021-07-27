import { observer, inject } from "mobx-react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Register from "./components/Register";
//CustomerStore

import React from "react";

import Schedule from "./components/Schedule";

function App() {
  return (
    <div>
      <Register />
      <h1>test</h1>
      <Schedule></Schedule>
    </div>
  );
}

export default App
