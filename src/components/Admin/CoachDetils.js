import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import Coach from "../CoachComponent/Coach";
import { Row, Container } from 'react-bootstrap'

const CoachDetails = inject("CoachStore")(observer((props) => {
    const [coachs, setCoachs] = useState([])

    useEffect( async() => {
        let temp = await props.CoachStore.coachs
       setCoachs(temp.data)
    }, [])

    return (
        <Row>
            {
            coachs.map((coach, ind) => {
                return ( <Coach key={ind} coach={coach}/> )})
                }
            </Row>
        )
    }))

export default CoachDetails;