import React, { useEffect, useState } from "react";
import { BrowserRouter as Router,Route, Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import Coach from "../CoachComponent/Coach";
import { Row, Container, Button } from 'react-bootstrap'

const CoachDetails = inject("CoachStore")(observer((props) => {
    const [coachs, setCoachs] = useState([])

    useEffect( () => {
        const fetch = async () =>{
             await props.CoachStore.getAllCoachs();
             let temp = await props.CoachStore.getCoachs;
            // updateCoachs(temp.data)
            setCoachs(temp)
        }
        fetch();
    },[])

    const updateCoachs = (temp) =>{
        setCoachs(temp)
    }
    return (
        <Container fluid>
            <Container fluid className="d-flex align-items-end flex-column">
                <Link to='/addCoachs'><Button className="btn-lg text-center addCoachbtn" >Add Coach</Button></Link>
            </Container>
            <Row>
            {
            props.CoachStore.getCoachs.map((coach, ind) => {
                return ( <Coach key={ind} updateCoachs={updateCoachs} coach={coach} showDetails={false}/> )})
                }
            </Row>
        </Container>
        )
    }))

export default CoachDetails;