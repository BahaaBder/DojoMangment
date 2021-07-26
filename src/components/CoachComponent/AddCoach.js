import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import { TextField } from '@material-ui/core';
import './style/Coach.css'

class AddCoach extends Component {
  constructor(){
    super();
    this.state={first:"", last:"", country:"", type:""};
  }

  change = (e) =>{
    let id = e.target.id;
    let inputVal = e.target.value;
    if(id === "first-input"){
        this.setState({first:inputVal})
    }
    else if(id === "last-input"){
      this.setState({last:inputVal})
    }
    else if(id === "country-input"){
      this.setState({country:inputVal})
    }
    else{
      this.setState({type:inputVal})
    }
  }

  AddCoach = () =>{
    //TODO : alert in matreail ui
    if (this.state.first === "" || this.state.last === "" ||
         this.state.country === "" || this.state.type === ""){
            alert("please enter all data")
         }
    else{
      //TODO sent request to stor to save coach
      this.setState({first:"", last:"", country:"", type:""});
    }
  }

  render() {

    //  let clients =  this.props.ClientsStore.clients;
    return (
      <div className="AddCoach">
        <h4>ADD Coach</h4>
        <div className="txtfild">
          <span>First Name: </span>
          <TextField className="text" id="first-input"
            value={this.state.first}
            onChange={this.change} />
        </div>
        <div className="txtfild">
          <span>SurName: </span>
          <TextField className="text" id="last-input"
            value={this.state.last}
            onChange={this.change} />
        </div>
        <div className="txtfild">
          <span>Country: </span>
          <TextField className="text" id="country-input"
            value={this.state.country}
            onChange={this.change} />
        </div>
        <div className="txtfild">
          <span>type: </span>
          <TextField className="text" id="type-input"
            value={this.state.type}
            onChange={this.change} />
        </div>
        <button className="btn" onClick={this.AddCoach}>Add New Coach</button>
      </div>
    );
  }
}

export default AddCoach