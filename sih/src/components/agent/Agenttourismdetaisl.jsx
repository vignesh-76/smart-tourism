import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import '../firstlogin/createaccount.css'
import { useState } from 'react';
import {motion} from 'framer-motion'
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



function Agenttourismdetaisl() {
   
  const {id}=useParams();
  const navigate=useNavigate()
  const api="https://smart-tourist-safety-monitoring-and-86z0.onrender.com"
    
   const [state,setState]=useState()
   const [city,setCity]=useState()
   const [fromplace,setFromplace]=useState()
   const [toplace,setToplace]=useState()
   const [priceinclude,setPriceinclude]=useState()
   const [priceexclude,setPriceexclude]=useState()
   const [agentamount,setAgentamount]=useState()
   const [list,setList]=useState()

useEffect(()=>{
  const fetchdata=async()=>{
   const res=await axios.get(`${api}/agent`)
   console.log(res.data)
   setList(res.data)
};
fetchdata();
},[api]);

 const handlesubmit=async(e)=>{
    e.preventDefault();
        const datas={state,city,fromplace,toplace,priceinclude,priceexclude,agentamount}
        try{
          await axios.post(`${api}/agent/${id}/agentdetail`,datas)
          navigate(`/agentdashboard/${id}`)
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
                <Nav.Link onClick={()=>{
                  navigate(`/agentdashboard/${id}`)
                }} 
                >Home</Nav.Link>
                <Nav.Link onClick={()=>{
                  navigate(`/agenttourismdetaisl/${id}`)
                }}>Edit Account</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=>{navigate('/')}}>
                   Log Out
                  </NavDropdown.Item>
                </NavDropdown>
                
                <Nav.Link >
                  Link
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>



      <motion.div
        className='lab'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
   

      
    <Form className='for card-hover-animate card-animate' onSubmit={handlesubmit}>
      <div style={{display:'flex',justifyContent:'center'}}>
      <h5>Agent Details about tourism</h5>
      </div>
      
    
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose..."
          onChange={(e)=>{
            setState(e.target.value)
          }}
          >
             <option>Choose a state</option>
  <option>Andhra Pradesh</option>
  <option>Arunachal Pradesh</option>
  <option>Assam</option>
  <option>Bihar</option>
  <option>Chhattisgarh</option>
  <option>Goa</option>
  <option>Gujarat</option>
  <option>Haryana</option>
  <option>Himachal Pradesh</option>
  <option>Jharkhand</option>
  <option>Karnataka</option>
  <option>Kerala</option>
  <option>Madhya Pradesh</option>
  <option>Maharashtra</option>
  <option>Manipur</option>
  <option>Meghalaya</option>
  <option>Mizoram</option>
  <option>Nagaland</option>
  <option>Odisha</option>
  <option>Punjab</option>
  <option>Rajasthan</option>
  <option>Sikkim</option>
  <option>Tamil Nadu</option>
  <option>Telangana</option>
  <option>Tripura</option>
  <option>Uttar Pradesh</option>
  <option>Uttarakhand</option>
  <option>West Bengal</option>
  <option>Andaman and Nicobar Islands</option>
  <option>Chandigarh</option>
  <option>Dadra and Nagar Haveli and Daman & Diu</option>
  <option>Delhi</option>
  <option>Lakshadweep</option>
  <option>Puducherry</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>city</Form.Label>
          <Form.Control type="text" placeholder="Enter city" 
          onChange={(e)=>{
            setCity(e.target.value)
          }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>fromplace</Form.Label>
          <Form.Control type="text" placeholder="Fromplace" 
          onChange={(e)=>{
            setFromplace(e.target.value)
          }}
          />
        </Form.Group>
    
      

      

      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>toplace</Form.Label>
          <Form.Control type="text" placeholder="Enter your toPlace" 
          onChange={(e)=>{
            setToplace(e.target.value)
          }}
          />
        </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
          <Form.Label>priceincludefood</Form.Label>
          <Form.Control type="text" placeholder="Enter your priceincludefood" 
          onChange={(e)=>{
            setPriceinclude(e.target.value)
          }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>priceexcludefood</Form.Label>
          <Form.Control type='text' onChange={(e)=>{setPriceexclude(e.target.value)}}/>
        </Form.Group>

      

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>AgentAmount</Form.Label>
          <Form.Control type='text' onChange={(e)=>{
            setAgentamount(e.target.value)
          }} />
        </Form.Group>

         <br></br>
    <div style={{display:'flex',justifyContent:'center'}}>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>
    </Form>


    </motion.div> </motion.div>
    </>
  );
}

export default Agenttourismdetaisl;