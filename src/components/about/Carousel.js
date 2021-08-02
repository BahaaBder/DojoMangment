import React from 'react'
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";

const  departmentDetails = require('./DepartmentDetails');





function importAll(r) {
    let images = [];
    r.keys().map((item, index) => { images[index] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('../../dist', false, /\.(png|jpe?g|svg)$/));
  
function CarouselTemplate() {
    return (
        <Container>
        
        <Row>
          <Col>
          <Carousel>
  
          {
  
            images.map((img,index)=>(
              <Carousel.Item interval={1000} key={index}>
              <img
                className="d-block w-100"
                src={img.default}
                alt="First slide"
              />

              <Carousel.Caption>
              
              <h1>{departmentDetails.default[index].title}</h1>
              <p>{departmentDetails.default[index].description}</p>

            </Carousel.Caption>
            </Carousel.Item>
  
            ))
          }
      
    </Carousel>
          </Col>
        </Row>
      </Container>
      )
}

export default CarouselTemplate
