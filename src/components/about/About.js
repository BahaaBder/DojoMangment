import 'bootstrap/dist/css/bootstrap.min.css'
import { observer, inject } from "mobx-react"
import React, { Component } from 'react'
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import "react-image-gallery/styles/css/image-gallery.css"

class About extends Component{
  
  constructor(){
    super()
    this.state = {
      aboutList : []
    }
  }

  componentDidMount = async () =>{
    let tempData = await this.props.about.aboutList
    this.setState({aboutList : tempData.data})
  }

  carousel(){
    return (
      <Container>
      <Row>
        <Col>
        <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require("../../dist/b.jpg").default}
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require("../../dist/p.jpg").default}
        alt="Second slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={require("../../dist/sh.jpg").default}
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>
        </Col>
      </Row>
    </Container>
    )
  }

render = () => {
  return (
    <div>
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
      <Container fluid className="intro d-flex flex-column align-items-center justify-content-center bg-dark text-white text-center">
            <h1>Imagin a Dojo where you can do everything.</h1>
            <Button variant="primary">Get Started</Button>
      </Container>

        <Container fluid className="p-4">
          <Row className="mt-5 mb-5">
            <Col className="border border-dark text-center p-5 m-1">
              <h1>We Are Elevation Dojo</h1>
              <p>bla bla</p>
            </Col>
            <Col className="border border-dark text-center p-5 m-1">
              <h1>We Are Professional</h1>
              <p>bla bla</p>
            </Col>
          </Row>

          <Row>
            <Col className="mb-3" xxl={6} xl={6} lg={6}>
            <h1>Endurance is one of the most difficult disciplines, but it is to the one who endures that the final victory comes.</h1>
            <br></br>
            <h1>It does not matter how slowly you go as long as you do not stop.</h1>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={12}>
              {this.carousel()}
            </Col>
          </Row>

          <Row>
            <Col className="d-flex flex-column align-items-center justify-content-center text-white text-center">
            <Button variant="primary">Get Started</Button>
            </Col>
          </Row>
        </Container>

        <Container fluid>

        </Container>

        <Container fluid className="bg-dark text-center text-white">Elevation dojo &copy; 2021</Container>
    </div>
  )}  
}

export default inject("about")(observer(About))