import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Coach from "./Coach";
import "./style/Coach.css";

class Coachs extends Component {
    componentDidMount = () =>{
 
      this.props.CoachStore.getAllCoachs()
    }
    render(){
      let coachs = this.props.CoachStore.coachs
      return (
        <div className="allCoaches">
            {coachs.map((coach,ind) => {
              return (
                <span key={ind} className="coach-item">
                  <Coach key={ind}
                    coach={coach}
                    showDetails={true}
                  />
                </span>
              );
            })}
        </div>
      );
    }
}

export default inject("CoachStore")(observer(Coachs));
