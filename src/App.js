import { observer, inject } from "mobx-react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Register from "./components/Register";
//CustomerStore
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import React from "react";

import Schedule from "./components/Schedule";
import Coachs from "./components/CoachComonent/Coachs";

function App() {
  return (
    // <div>
    //   <Register />
    //   <h1>test</h1>
    //   <Schedule></Schedule>
    // </div>
    <Router>
      <span>
        <Link className="link" to="/coachs">
          Coachs
        </Link>
      </span>
      <Route
        path="/coachs"
        exact
        render={() => <Coachs />}
      />
      {/* <Route
          path="/coachs/:id"
          exact
          render={({ match }) => <MovieDetail match={match} state={state} />}
      /> */}
    </Router>
  );
}

export default App;
