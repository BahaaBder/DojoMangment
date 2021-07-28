import React, { Component } from "react";
// import { observer, inject } from 'mobx-react';
import { TextField } from '@material-ui/core';
// import Button f
import './style/Coach.css'
import { Button,Alert } from "react-bootstrap";

class AddCoach extends Component {
  constructor(){
    super();
    this.state={name:"", year:"", type:"",img:"",descShort:"",showError:false,showSuccess:false};
  }

  change = (e) =>{
    let id = e.target.id;
    let inputVal = e.target.value;
    if(id === "name-input"){
        this.setState({name:inputVal})
    }
    else if(id === "type-input"){
      this.setState({type:inputVal})
    }
    else if(id === "year-input"){
      this.setState({year:inputVal})
    }
    else if(id === "img-input"){
      this.setState({img:inputVal})
    }
    else{
      this.setState({descShort:inputVal})
    }
  }

  AddCoach = () =>{
    //TODO : alert in matreail ui
    if (this.state.name === "" || this.state.type === "" ||
         this.state.year === "" || this.state.img === "" || this.state.descShort===""){
            this.setState({showError:true,showSuccess:false})
         }
    else{
      let coachData = {
        name:this.state.name,
        type:this.state.type,
        year:parseInt(this.state.year),
        img:this.state.img,
        descShort:this.state.descShort,
        dojo_id:1
      }
      this.props.CoachStore.saveCoach(coachData)
      this.setState({showError:false,showSuccess:true})
      this.setState({name:"", type:"", year:"", img:"",descShort:""});
    }
  }

  render() {

    return (
      <div className="AddCoach">
        <h4>ADD Coach</h4>
        <div className="txtfild">
          <span>Name: </span>
          <TextField className="text" id="name-input"
            value={this.state.name}
            onChange={this.change} />
        </div>
        <div className="txtfild">
          <span>type: </span>
          <TextField className="text" id="type-input"
            value={this.state.type}
            onChange={this.change} />
        </div>
        <div className="txtfild">
          <span>year: </span>
          <TextField className="text" id="year-input"
            value={this.state.year}
            onChange={this.change} />
        </div>
        <div className="txtfild">
          <span>img: </span>
          <TextField className="text" id="img-input"
            label="img url"
            multiline
            maxRows={4}
            value={this.state.img}
            onChange={this.change}
          />
        </div>
        <div className="txtfild">
          <span>short description: </span>
          <TextField className="text" id="descShort-input"
            label="short description"
            multiline
            maxRows={7}
            value={this.state.descShort}
            onChange={this.change}
          />
        </div>
        <Button className="btn" onClick={this.AddCoach}>Add New Coach</Button>
        <Alert variant="danger" show={this.state.showError}>
            Check Your Inputs Again !
          </Alert>
          <Alert show={this.state.showSuccess} variant="success">
            <p>We've added you to the site.</p>
          </Alert>
      </div>
    );
  }
}

export default inject("CoachStore")(observer(AddCoach));