import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import './agentdashboard.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import img from './img.webp'
import img1 from './img1.jpg'
import img2 from './img2.jpg'

const Agentdashboard = () => {
const navigate=useNavigate();
  const api="https://smart-tourist-safety-monitoring-and-86z0.onrender.com"
const {id}=useParams();
const [list,setList]=useState();
const [filter,setFilter]=useState('tripdetails')


useEffect(()=>{
  const fetchdata=async()=>{
     const res=await axios.get(`${api}/agent`)
     const validdata=res.data.find((x)=>x._id===id)
     setList(validdata)
     console.log(validdata)
  };fetchdata();
},[api])

const verify=async(x,y)=>{
  try{
    const datas={touristid:x,agentid:id,bookingid:y}
    console.log(id)
    await axios.put(`${api}/available/${id}`,{available:true})
    await axios.post(`${api}/availabletoturist/${x}/${id}`,datas)
  }catch(err){
    console.log(err) 
  }
} 

const decline=async(x,y)=>{
  try{
    await axios.delete(`${api}/delete/${id}/${y}`)
    await axios.delete(`${api}/availabletoturist/${x}/${y}/${id}`)
  }catch(err){
    console.log(err) 
  }
}

const finished=async(x,y)=>{
  try{
    await axios.delete(`${api}/delete/${id}/${y}`)
      await axios.put(`${api}/available/${id}`,{available:false})
    await axios.delete(`${api}/availabletoturist/${x}/${y}/${id}`)
  }catch(err){
    console.log(err) 
  }
}

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

<div  style={{minHeight:'90%',paddingRight:'10%',paddingLeft:"10%"}}>
         <Carousel data-bs-theme="dark" >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img}
          alt="First slide"
          height={600}
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Provides expert guidance for tourists.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1}
          alt="Second slide"
          height={750}
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Handles bookings and travel arrangements efficiently.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Third slide"
          height={750}
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Ensures safety and personalized travel experiences.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
</div>
    <br></br>
        


{filter==='tripdetails'&&(
  <>
<div style={{paddingLeft:"50px",display:'flex',justifyContent:'center'}}>
     <h5  style={{
      width: "18rem",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      padding:"20px",
      justifyContent:'center',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}>Your Trip Details</h5><br/>

     </div>
  <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", padding: "20px", justifyContent: "center" }}>
   
  {list?.touristagent?.map((x, index) => (
    <Card key={index} style={{
      width: "18rem",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer"
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
    >
      <Card.Body>
        <Card.Title style={{ fontWeight: "600", color: "#0d6efd" }}>{x.state} - {x.city}</Card.Title>
        <Card.Text style={{ color: "#555" }}>
          From: {x.fromplace} <br />
          To: {x.toplace} <br />
          Amount: ${x.agentamount}
        </Card.Text>
        <Button 
          style={{
            backgroundColor: "#111",
            color: "#fff",
            border: "2px solid #fff",
            width: "100%",
            transition: "all 0.3s",
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 15px #0d6efd"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
        >
          Book Agent
        </Button>
      </Card.Body>
    </Card>
  ))}
</div>
</>
)}


{filter==='booking'&&(
  <>
<div style={{paddingLeft:"50px",display:'flex',justifyContent:'center'}}>
     <h5  style={{
      width: "18rem",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      padding:"20px",
      justifyContent:'center',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}>Booking Details</h5><br/>
</div>
<div style={{ display: "flex", gap: "20px", flexWrap: "wrap", padding: "20px", justifyContent: "center" }}>
  {list?.booking?.map((x, index) => (
    <Card key={index} style={{
      width: "18rem",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
    >
      <Card.Body>
        <Card.Title style={{ fontWeight: "600", color: "#0d6efd" }}>{x.name}</Card.Title>
        <Card.Text style={{ color: "#555"}} 
        
        >
          Email: {x.email}<br />
          Phone: {x.phonenumber}<br />
          From: {x.from}<br />
          To: {x.to}<br />
         <br/>
          Amount: ${x.amount}
        </Card.Text>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button 
            style={{
              flex: 1,
              backgroundColor: "#28a745",
              color: "#fff",
              border: "2px solid #28a745",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 15px #28a745"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            onClick={()=>verify(x.touristid,x._id)}
          >
            Accept
          </Button>
          <Button 
            style={{
              flex: 1,
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "2px solid #dc3545",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 15px #dc3545"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            onClick={() => decline(x.touristid,x._id)}
          >
            Decline
          </Button>
        </div>
      </Card.Body>
    </Card>
  ))}
</div>
</>
)}


{filter==='process'&&(
  <>
<div style={{paddingLeft:"50px",display:'flex',justifyContent:'center'}}>
     <h5  style={{
      width: "18rem",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      padding:"20px",
      justifyContent:'center',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}>Process is running</h5><br/>
</div>
<div style={{ display: "flex", gap: "20px", flexWrap: "wrap", padding: "20px", justifyContent: "center" }}>
  <h4>{list?.available?"Running":"not in process"}</h4>
  {list?.acceptbytourist?.map((x, index) => (
    <Card key={index} style={{
      width: "18rem",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
      }}
    >
      <Card.Body>
        <Card.Title style={{ fontWeight: "600", color: "#0d6efd" }}>{x.name}</Card.Title>
        <Card.Text style={{ color: "#555"}} 
        
        >
         Process is running
        </Card.Text>
        <div style={{ display: "flex", gap: "10px" }}>
         
          <Button 
            style={{
              flex: 1,
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "2px solid #dc3545",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 15px #dc3545"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            onClick={() => finished(x.touristid,x.bookingid)}
          >
            finished
          </Button>
        </div>
      </Card.Body>
    </Card>
  ))}
</div>
</>
)}



    </>
  )
}

export default Agentdashboard