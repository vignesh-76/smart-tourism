import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './signup.css'
import { useState } from 'react';
import {motion} from 'framer-motion'
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function Signup() {
  const api="https://smart-tourist-safety-monitoring-and-86z0.onrender.com"
const navigate=useNavigate()
  const [account,setAccount]=useState("tourist")
    
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [state,setState]=useState()
  
    const [list,setList]=useState()


useEffect(()=>{
  const fetchdata=async()=>{
   const res=await axios.get(`${api}/gettourist`)
   console.log(res.data)
   setList(res.data)
};
fetchdata();
},[api]);

const handlesubmit=()=>{
  try{
   const datas={username:name,email:email,password:password,statefilterbyagent:state}
    axios.post(`${api}/tdaccount`,datas)
    alert("sucessfully created")
    navigate('/')
  }catch(err){
    console.error(err)
  }
}


  return (
    <>
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
      <div style={{display:'flex',gap:"20px",justifyContent:'center'}}>
        <h5>Tourist Department</h5>
        </div>
    
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" 
          onChange={(e)=>{
            setName(e.target.value)
          }}
          />
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          />
        </Form.Group>
    


          <Form.Group as={Col} controlId="formGridState">
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

    

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <p style={{cursor:'pointer'}}
      onClick={()=>{navigate('/')}}
      >Already have an Account.</p>
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

export default Signup;