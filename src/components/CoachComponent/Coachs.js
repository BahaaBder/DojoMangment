import React, { Component } from "react";
import { Row, Container } from 'react-bootstrap'
import { observer, inject } from "mobx-react";
import Coach from "./Coach";

class Coachs extends Component {
  constructor(){
    super()
    this.state = {
      coachs : []
    }
  }
    componentDidMount = async () =>{
      let temp = await this.props.CoachStore.coachs
      this.setState({coachs : temp.data})
    }

    render = () => {
      return (
        <Container fluid className="text-center">
            <h2 className="font-weight-bold m-5">Our Departments</h2>
            <p className="m-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
              error amet numquam iure provident voluptate esse quasi, veritatis
              totam voluptas nostrum quisquam eum porro a pariatur veniam.
            </p>
            
            <Row>{
                  this.state.coachs.map((coach,ind) => {
                    return ( <Coach key={ind} coach={coach} showDetails={true}/> )
                  })
                  }
            </Row>

        </Container>
      )
    }
}

export default inject("CoachStore")(observer(Coachs))
