import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {motion} from 'framer-motion'
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';



function Editaccount() {
  const api="https://smart-tourist-safety-monitoring-and-86z0.onrender.com"
const { id, account1 } = useParams();
const navigate=useNavigate()
    
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phonenumber,setPhonumber]=useState('')
    const [address,setAddress]=useState('')
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [zip,setZip]=useState('')
    const [list,setList]=useState()

    const [agentname,setAgentname]=useState('')
    const [agentemail,setAgentemail]=useState('')
    const [agentpassword,setAgentpassword]=useState('')
    const [agentusername,setAgentusername]=useState('')
    const [agentcity,setAgentcity]=useState('')
    const [agentstate,setAgentstate]=useState('')
    const [agentaddress,setAgentaddress]=useState('')
    const [agentaadharcard,setAgentaadharcard]=useState('')
    const [agentpancard,setAgentpancard]=useState('')
    const [agentphonenumber,setAgentphonenumber]=useState('')
    const [list1,setList1]=useState()
    

useEffect(()=>{
  const fetchdata=async()=>{
   const res=await axios.get(`${api}/gettourist`)
   const res1=await axios.get(`${api}/agent`)
   const valid=res.data.find((x)=>x._id===id)
   const valid1=res1.data.find((x)=>x._id===id)
   setList1(valid1)
     if (valid1) {
      setAgentname(valid1.name || "");
      setAgentemail(valid1.email || "");
      setAgentpassword(valid1.password || "");
      setAgentusername(valid1.username || "");
      setAgentcity(valid1.city || "");
      setAgentstate(valid1.state || "");
      setAgentaddress(valid1.address || "");
      setAgentaadharcard(valid1.aadharcard || "");
      setAgentpancard(valid1.pancard || "");
      setAgentphonenumber(valid1.phonenumber || "");
    }

    if(valid){
         setName(valid.name || "");
setEmail(valid.email || "");
setPassword(valid.password || "");
setPhonumber(valid.phonenumber || "");
setAddress(valid.address || "");
setState(valid.state || "");
setCity(valid.city || "");
setZip(valid.zip || "");

    }
   console.log(valid)
   console.log(res1.data)
   setList(res.data)
};
fetchdata();
},[api]);

const handlesubmit=async()=>{
  try{
   const datas={name,email,password,phonenumber,address,state,city,zip}
    await axios.put(`${api}/newtourist/${id}`,datas)
    alert("sucessfully created")
    navigate(`/userhomepage/${id}`)
  }catch(err){
    console.error(err)
  }
}

const agentsubmit=async(e)=>{
  e.preventDefault();
  const datas={name:agentname,email:agentemail,password:agentpassword,username:agentusername,city:agentcity,state:agentstate,address:agentaddress,aadharcard:agentaadharcard,pancard:agentpancard,phonenumber:agentphonenumber}
  try{
    const dat=await axios.put(`${api}/editagent/${id}`,datas)
    alert('successfully Updated')
    navigate(`agentdashboard/${id}`)
  }catch(err){
    console.log(err)
  }
}

  return (
    <>

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
                <Nav.Link href="#action1">Home</Nav.Link>
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
        </Navbar>
        </>



        <br></br>


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


      
{account1 === 'tourist' ? (
    <Form className='for card-hover-animate card-animate' onSubmit={handlesubmit}>
      <div style={{display:'flex',gap:"20px",justifyContent:'center'}}>
        <h5>Edit your Profile</h5>
        </div>
    
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name"
          value={name} 
          onChange={(e)=>{
            setName(e.target.value)
          }}
          />
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
          value={email} 
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
          value={password} 
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          />
        </Form.Group>
    
      

      

      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control type="txt" placeholder="Enter your Address" 
          value={address}
          onChange={(e)=>{
            setAddress(e.target.value)
          }}
          />
        </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select 
          value={state}
          onChange={(e)=>{
            setState(e.target.value)
          }}
          >
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type='text'
          value={city}
          onChange={(e)=>{setCity(e.target.value)}}/>
        </Form.Group>

      

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control type='text'
          value={zip}
          onChange={(e)=>{
            setZip(e.target.value)
          }} />
        </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>phonenumber</Form.Label>
          <Form.Control type="text" 
          value={phonenumber}
          placeholder="Enter phonenumber" 
          onChange={(e)=>{
            setPhonumber(e.target.value)
          }}
          />
        </Form.Group>
    

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
    <div style={{display:'flex',justifyContent:'center'}}>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>
    </Form>
)

:

(
    <Form className='for card-hover-animate card-animate' onSubmit={agentsubmit}>
      <div style={{display:'flex',gap:"20px",justifyContent:'center'}}>
       <h5>Edit your Profile</h5>
        </div>
    
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" 
       value={agentname}
          onChange={(e)=>{
            setAgentname(e.target.value)
          }}
          />
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"
          value={agentemail}
          placeholder="Enter email" 
          onChange={(e)=>{
            setAgentemail(e.target.value)
          }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" 
          value={agentpassword}
          placeholder="Password" 
          onChange={(e)=>{
            setAgentpassword(e.target.value)
          }}
          />
        </Form.Group>
           <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" 
          value={agentusername}
          placeholder="Username" 
          onChange={(e)=>{
            setAgentusername(e.target.value)
          }}
          />
        </Form.Group>
    
      

      

      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control type="txt"
         value={agentaddress}
          placeholder="Enter your Address" 
          onChange={(e)=>{
            setAgentaddress(e.target.value)
          }}
          />
        </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose..."
          value={list1?.state}
          onChange={(e)=>{
            setAgentstate(e.target.value)
          }}
          >
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type='text' 
         value={agentcity}
          onChange={(e)=>{setAgentcity(e.target.value)}}/>
        </Form.Group>

      

          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>phonenumber</Form.Label>
          <Form.Control type="text" 
          value={agentphonenumber}
          placeholder="Enter phonenumber" 
          onChange={(e)=>{
            setAgentphonenumber(e.target.value)
          }}
          />
        </Form.Group>

           <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>pancard</Form.Label>
          <Form.Control type="number" 
         value={agentpancard}
          placeholder="pan Number" 
          onChange={(e)=>{
            setAgentpancard(e.target.value)
          }}
          />
        </Form.Group>
           <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Aadhar card number</Form.Label>
          <Form.Control type="number" placeholder="Aadhar card number"
         value={agentaadharcard}
          onChange={(e)=>{
            setAgentaadharcard(e.target.value)
          }}
          />
        </Form.Group>
    

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
    <div style={{display:'flex',justifyContent:'center'}}>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>
    </Form>
)


}
    </motion.div> </motion.div>
    </>
  );
}

export default Editaccount;