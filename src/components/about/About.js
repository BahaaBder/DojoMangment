import 'bootstrap/dist/css/bootstrap.min.css'
import { observer, inject } from "mobx-react"
import React, { Component } from 'react'

class About extends Component{
  constructor(){
    super()
    this.state = {
      aboutList : []
    }
  }
    // let overview = this.props.aboutStore.overview
    // let departments = this.props.aboutStore.departments
    // let motivations = this.props.aboutStore.motivations
    // let overview = ""
    // let departments = [
    //     {
    //         name : "Karate",
    //         descreption : `Karate (“the art of the empty hand”) is a fighting art that uses bare hands and feet,
    //          though weapon use is also part of the training. The origins of Karate began when the Chinese,
    //           and later the Japanese, occupied the island of Okinawa, prohibiting the use of weapons.
    //            The Okinawans developed both empty hand fighting and the use of farming implements as weapons.
    //             This style of fighting was also influenced by similar Chinese techniques which originated
    //              from those practiced at the Shaolin temple by Buddhist monks. The founder of modern Karate,
    //               the Japanese Funakoshi Gichin (1869–1957), tried to unite between the diverse Okinawan styles,
    //                and spread them throughout Japan.`,
    //         Course_of_study : `The student begins his training by learning basic techniques (stances, blocks, strikes and kicks).
    //          Once he is proficient with these techniques a controlled form of fighting is studied in order to better understand the use
    //           of these techniques against an opponent.`
    //     },
    //     {
    //         name : "Tai Chi Chuan",
    //         descreption : `Tai Chi Chuan (”grand ultimate fist”) is one of the three internal Chinese styles of martial arts.
    //          Its foundation is credited to the Taoist Chang San Feng more than 800 years ago. It consists of slow, connected movements
    //           that are practiced as a form of moving meditation. Its practice reduces tension, slows down the breath,
    //            clears the mind and produces long-term benefits to health. A strong emphasis is placed on the circulation of chi.
    //             Physically, students learn to yield so that the attacker is overcome by his own force.
    //              It is not ordinarily regarded as a practical self-defense system,
    //               though the movements have self-defense applications and practitioners can achieve great power in their techniques.`,
    //         Course_of_study : `The student begins by learning basic tai chi movement, which is slow, controlled and relaxed.
    //          Breathing and chi gung exercises are also emphasized.`
    //     }
    // ]

    // componentDidMount = async () =>{
    //   let tempData = await this.props.about.aboutList
    //   this.setState({aboutList : tempData.data})
    //   console.log(this.state.aboutList);
    // }

render(){
  return (
    <div>
      {/* {this.state.aboutList.map(dep =>
      <div key={dep.id}>
        <h1>{dep.department_name}</h1>
        <h3>{dep.descreption}</h3>
        <br></br>
        <br></br>
      </div>
      )} */}
    </div>
  )
}
  
}

export default inject("about")(observer(About))