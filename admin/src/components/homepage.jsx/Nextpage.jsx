import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css'
import Card from 'react-bootstrap/Card';


const Nextpage = () => {

  const api="https://smart-tourist-safety-monitoring-and-86z0.onrender.com"
const {id,state}=useParams();
const [list,setList]=useState();
const [filter,setFilter]=useState('agent')
const [agentlist,setAgentlist]=useState()
const [touristlist,setTouristlist]=useState()

let state1 = state === "true";

useEffect(()=>{
  const fetchdata=async()=>{
console.log(state,id)
    if(state1){
     const res=await axios.get(`${api}/agent`)
     const valid=res.data.find((x)=>x._id===id)
     setAgentlist(valid ? [valid] : []);
    }else{
const res1=await axios.get(`${api}/gettourist`)
const valid=res1.data.find((x)=>x._id===id)

console.log(valid)
 setTouristlist(valid ? [valid] : []);
    }

  };fetchdata();
},[api])



  return (
    <>
    <Navbar expand="lg" className="">
          <Container fluid>
            <Navbar.Brand href="#">SMART TOURISM</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0 navbar1"
                style={{ maxHeight: '100px' }}
                navbarScroll
               >
                <Nav.Link onClick={()=>navigate(`/touristmap/${id}`)}>Home</Nav.Link>
                <Nav.Link onClick={()=>{
                  navigate(`/agenttourismdetaisl/${id}`)
                }}>Edit Account</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item onClick={()=>setFilter('tripdetails')}>Trip Details</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{setFilter('booking')}}>
                    Booking Details
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=>{setFilter('process')}}>
                   Process
                  </NavDropdown.Item>
                   <NavDropdown.Divider />
                       <NavDropdown.Item onClick={()=>{navigate('/')}}>
                         Log Out
                         </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link  onClick={()=>navigate(`/editaccount/${id}/agent`)}>
                  Edit Account
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar><br></br>

{state1?(

  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px",justifyContent:"center" }}>
  {agentlist?.map((x, index) => (
    <Card key={index} style={{ width: "18rem" }}>
     
      <Card.Body>
        <Card.Title>{x.name || "Agent Name"}</Card.Title>
        <Card.Text>
          State: {x.state} <br />
          City: {x.city} <br />
          Phone: {x.phonenumber} <br />
          Aadharcard: {x.aadharcard} <br />
          Pancard: {x.pancard} <br />
        </Card.Text>

        {x.booking?.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <h6>Booking Details:</h6>
            {x.booking.map((detail, i) => (
              <Card key={i} style={{ width: "16rem", marginBottom: "10px" }}>
                <Card.Body>
                  <Card.Title>{detail.name || "Name"}</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {detail.name} <br />
                    <strong>Email:</strong> {detail.email} <br />
                    <strong>From:</strong> {detail.from} <br />
                    <strong>To:</strong> {detail.to} <br />
                    <strong>Amount:</strong> {detail.amount} <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}

        {x.acceptbytourist?.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <h6>Accepted Tourism Details:</h6>
            {x.acceptbytourist.map((item, i) =>
              item.notifications?.length > 0 &&
              item.notifications.map((detail, j) => (
                <Card key={j} style={{ width: "16rem", marginBottom: "10px" }}>
                  <Card.Body>
                    <Card.Title>{detail.touristName || "Name"}</Card.Title>
                    <Card.Text>
                      <strong>Phone:</strong> {detail.phonenumber} <br />
                      <strong>Latitude:</strong> {detail.latitude} <br />
                      <strong>Longitude:</strong> {detail.longitude} <br />
                      <strong>Date:</strong> {new Date(detail.date).toLocaleString()} <br />
                      <strong>Message:</strong> {detail.message} <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  ))}
</div>


):(

   <div style={{ display: "flex", flexWrap: "wrap", gap: "20px",justifyContent:"center" }}>
  {touristlist?.map((agent, index) => (
    <Card key={index} style={{ width: "18rem" }}>
     
      <Card.Body>
        <Card.Title>{agent.name || "Agent Name"}</Card.Title>
        <Card.Text>
          <strong>State:</strong> {agent.state} <br />
          <strong>City:</strong> {agent.city} <br />
          <strong>Phone:</strong> {agent.phonenumber} <br />
          <strong>Email:</strong> {agent.email} <br />
        </Card.Text>

       
      {agent.personaldetails?.length > 0 && (
  <div style={{ marginTop: "10px" }}>
    <h6>Personal Details:</h6>
    {agent.personaldetails.map((detail, i) => (
      <Card key={i} style={{ width: "16rem", marginBottom: "10px" }}>
        <Card.Body>
          <Card.Title>{detail.name || "Name"}</Card.Title>
          <Card.Text>
            <strong>Parent Mobile Number:</strong> {detail.parentmobilenumber} <br />
            <strong>Aadhar:</strong> {detail.aadharcard} <br />
            <strong>Pancard:</strong> {detail.pancard} <br />
          </Card.Text>
        </Card.Body>
      </Card>
    ))}
  </div>
)}


    {agent.acceptbytourist?.length > 0 &&
  agent.acceptbytourist.map((item, i) => 
    item.notifications?.length > 0 ? (
      <div key={i} style={{ marginTop: "10px" }}>
        <h6>Accepted Tourism Details:</h6>
        {item.notifications.map((detail, j) => (
          <Card key={j} style={{ width: "16rem", marginBottom: "10px" }}>
            <Card.Body>
              <Card.Title>{detail.touristName || "Name"}</Card.Title>
              <Card.Text>
                <strong>Message:</strong> {detail.message} <br />
                <strong>Latitude:</strong> {detail.latitude} <br />
                <strong>Longitude:</strong> {detail.longitude} <br />
                <strong>Phone:</strong> {detail.phonenumber} <br />
                <strong>Date:</strong> {new Date(detail.date).toLocaleString()} <br />
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    ) : null
  )
}


      </Card.Body>
    </Card>
  ))}
</div>

)}
 



  



</>

  )
}

export default Nextpage