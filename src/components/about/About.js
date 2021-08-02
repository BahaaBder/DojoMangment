import 'bootstrap/dist/css/bootstrap.min.css'
import { observer, inject } from "mobx-react"
import React, { Component } from 'react'
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import "react-image-gallery/styles/css/image-gallery.css"
import "./about.css"
import { Typography } from '@material-ui/core';

import CarouselTemplate from './Carousel';
import { Link } from "react-router-dom";

const word = [..." 🤜D o j o🔥C L u b🤛"];



class About extends Component {
  constructor() {
    super()
    this.state = {
      aboutList: []
    }
  }
  componentDidMount = async () => {
    let tempData = await this.props.about.aboutList
    this.setState({ aboutList: tempData.data })
  }

  render = () => {
    return (
      <div className="About-container">
        {/* <div className={}>
      </div> */}
        {/* {
      this.state.aboutList.map(dep =>
      <div key={dep.id} id={dep.id}>
        <h1>{dep.department_name}</h1>
        <h3>{dep.descreption}</h3>
        <br></br>
        <br></br>
      </div>)
      } */}



        <Row>
          <br></br>
          <div className="main-content">

            <div className="concept concept-two">


              {
                word.map((l, index) => (
                  <div key={index} className="hover">
                    <h1>{l}</h1>
                  </div>

                ))

              }


            </div>
            <br></br>

          </div>
        </Row>

        <Row>
          <Col>
            <CarouselTemplate></CarouselTemplate>
          </Col>
        </Row>

        <Container fluid className="p-4">
          <Row className="mt-5 mb-5">
            <Col className="border border-dark text-center p-5 m-1">
              <h1>Dojo🔥Club</h1>
              <p>Unlock Your Potential</p>
            </Col>
            <Col className="border border-dark text-center p-5 m-1">
              <h1>Professional Coaches🤛</h1>
              <p>to guide you to your goal</p>
            </Col>
          </Row>



          <Row>
            <Col className="mb-3" >
              <Typography variant="h4" className="motivation">
                Are you looking for a new form of exercise? Martial arts is your answer.



               



              </Typography>

              <Typography variant="h4" className="motivation">
                increase overall mobility, improve your body's pressure response,
                and increase muscle.

              </Typography>
              <Typography variant="h4" className="motivation">
              
              Because so many martial arts involve repeat muscular actions over time you'll build strength and burn fat.
              Who doesn't want that?
              </Typography>


            </Col>



          </Row>

          <Row>
            <Col className="d-flex flex-column align-items-center justify-content-center text-white text-center">
             <Link to="/register">
             <Button variant="primary">Register Now </Button>
             
             </Link>
            </Col>
          </Row>
        </Container>
        <Container fluid>
        </Container>
        <Container fluid className="bg-dark text-center text-white"> Dojo🔥Club &copy; 2021</Container>
      </div>
    )
  }
}
export default inject("about")(observer(About))