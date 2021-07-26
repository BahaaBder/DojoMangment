import React, { Component } from "react";

import { observer, inject } from 'mobx-react';
import Coach from "./Coach"
import "./style/Coach.css"

export default class Coachs extends Component {
    constructor(){
        super();
        this.state={coachs:[
            {
                id: 0,
                name: "Wolf",
                type: "Boxing",
                img: "https://i.pinimg.com/originals/2f/52/22/2f5222ae1b29f92873e17c8753bda5fe.jpg",
                year: 1998,
                descrShort:
                "Tiger is a proffessional Boxing fighter, he start traing befor 5 years, his first professional boxing fight was before 2 years",
              },
            {
              id: 1,
              name: "Tiger",
              type: "Boxing",
              img: "https://st2.depositphotos.com/4265001/9912/v/950/depositphotos_99122894-stock-illustration-tiger-dressed-up-in-boxing.jpg",
              year: 1994,
              descrShort:
              "Tiger is a proffessional Boxing fighter, he start traing befor 7 years, his first professional boxing fight was before 5 years",
            },
            {
              id: 2,
              name: "Pitbull",
              type: "MMA",
              year: 1991,
              img: "https://i.pinimg.com/originals/c7/8d/21/c78d210162d74909f1a9ed1460cf1c6d.jpg",
              descrShort:
              "Pitbull is a proffessional MMA fighter, he start traing befor 7 years, his first professional boxing fight was before 5 years",
            },
            {
              id: 3,
              name: "Monkey",
              type: "MMA",
              year: 1963,
              img: "https://i.pinimg.com/236x/15/c8/25/15c825b1868d7a780c7122e600c94d48.jpg",
              descrShort:
              "Monkey is a proffessional MMA fighter, he start traing befor 13 years, his first professional boxing fight was before 6 years",
            },
            {
              id: 4,
              name: "Banda",
              type: "Muay Thai" ,
              year: 2016,
              img: "https://cdn1.vectorstock.com/i/1000x1000/79/65/panda-muay-thai-vector-3527965.jpg",
              descrShort:
              "Banda is a proffessional Muay Thai fighter, he start traing befor 13 years, his first professional boxing fight was before 6 years",
            },
          ]}
    }

    render(){
      return (
        <div class="allCoaches">
            {this.state.coachs.map((coach) => {
              return (
                <span className="coach-item">
                  <Coach
                    coach={coach}
                  />
                </span>
              );
            })}
        </div>
      );
    }
}
