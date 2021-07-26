import { observer, inject } from "mobx-react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

//CustomerStore
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import React from "react";

import Schedule from "./components/Schedule";
import Coachs from "./components/CoachComponent/Coachs";
import AddCoach from "./components/CoachComponent/AddCoach";
import LogIn from "./components/LogInComponent/LogIn";
import Register from "./components/LogInComponent/Register";

function App() {
  return (
    // <div>
    //   <Register />
    //   <h1>test</h1>
    //   <Schedule></Schedule>
    // </div>
    <Router>

      <Link className="link" to="/schedule">
        Schedule
      </Link>
      <Link className="link" to="/coachs">
        Coachs
      </Link>
      <Link className="link" to="/addCoachs">
        Add Coach
      </Link>
      <Link className="link" to="/LogIn">
        LogIn
      </Link>

      <Route
        path="/coachs"
        exact
        render={() => <Coachs />}
      />
      <Route
        path="/addCoachs"
        exact
        render={() => <AddCoach />}
      />
      <Route
        path="/schedule"
        exact
        render={() => <Schedule />}
      />
      <Route
        path="/LogIn"
        exact
        render={() => <LogIn />}
      />
      <Route
        path="/Register"
        exact
        render={() => <Register />}
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
