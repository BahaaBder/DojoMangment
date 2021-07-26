import { observer, inject } from "mobx-react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Register from "./components/Register";
//CustomerStore
import React from "react";

function App() {
  return (
    <div>
      <Register />
    </div>
  );
}

export default App;
