import { observer, inject } from "mobx-react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Register from "./components/Register";
//CustomerStore
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import React from "react";

import Schedule from "./components/Schedule";
import Coachs from "./components/CoachComponent/Coachs";
import AddCoach from "./components/CoachComponent/AddCoach";

function App() {
  return (
    // <div>
    //   <Register />
    //   <h1>test</h1>
    //   <Schedule></Schedule>
    // </div>
    <Router>

      <Link className="link" to="/coachs">
        Coachs
      </Link>
      <Link className="link" to="/addCoachs">
        Add Coach
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
      {/* <Route
          path="/coachs/:id"
          exact
          render={({ match }) => <MovieDetail match={match} state={state} />}
      /> */}
    </Router>
  );
}

export default App;
