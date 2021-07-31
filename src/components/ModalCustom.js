import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { observer, inject } from 'mobx-react'

const ModalCustom=inject("ScheduleStore")(observer((props) => {
  const [selectedCustomer, setSelectedCustomer] = useState({})
  const[showModal,setShowModal]=useState(true)
  useEffect(() => {
    // setShowModal()
      // setSelectedCustomer(props.customer)
      // console.log(selectedCustomer)
  },[])



  const handleChange = (e) => {

      // console.log(e.target.value)
      // setSelectedCustomer({
      //     ...selectedCustomer,
      //     [e.target.name]: e.target.value
      // })

  }
  const handleSubmit=()=>{// this should call handle update in our store 
    // props.toggle()

      // console.log("-------after change=====",selectedCustomer)
      // const customerToUpdate={ 
      //     id:selectedCustomer.id,
      //     first:selectedCustomer.first,
      //     last:selectedCustomer.last,
      //     country:selectedCustomer.country
      // }
      // props.CustomerStore.updateSelectedCustomer(customerToUpdate)

  }
  const handleCancel=()=>{

  }
  return (
      <div>
          <Modal show={props.ScheduleStore.showModal} onHide={props.ScheduleStore.handleAlertModalChange} >
              <Modal.Header >
                  <Modal.Title>{"hi What would you like to change "} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div>
                      <span>Name</span><input name="first" value={selectedCustomer.first || ""} onChange={handleChange}></input>
                      <br></br>
                      <span>SurName</span><input name="last" value={selectedCustomer.last|| ""} onChange={handleChange}></input>
                      <br></br>

                      <span>Country</span><input name="country" value={selectedCustomer.country|| ""} onChange={handleChange}></input>

                  </div>

              </Modal.Body>
              <Modal.Footer>
                  <Button variant="primary" onClick={handleSubmit}>
                      submit
                  </Button>

                  <Button variant="primary" onClick={props.ScheduleStore.handleAlertModalChange}>
                  cancel
              </Button>
              </Modal.Footer>
          </Modal>
      </div>
  )
}))

export default ModalCustom
