import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './createaccount.css'
import { useState } from 'react';
import {motion} from 'framer-motion'
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function Createaccount() {
  const api="https://smart-tourist-safety-monitoring-and-86z0.onrender.com"
const navigate=useNavigate()
  const [account,setAccount]=useState("tourist")
    
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [phonenumber,setPhonumber]=useState()
    const [address,setAddress]=useState()
    const [state,setState]=useState()
    const [city,setCity]=useState()
    const [zip,setZip]=useState()
    const [list,setList]=useState()

    const [agentname,setAgentname]=useState()
    const [agentemail,setAgentemail]=useState()
    const [agentpassword,setAgentpassword]=useState()
    const [agentusername,setAgentusername]=useState()
    const [agentcity,setAgentcity]=useState()
    const [agentstate,setAgentstate]=useState()
    const [agentaddress,setAgentaddress]=useState()
    const [agentaadharcard,setAgentaadharcard]=useState()
    const [agentpancard,setAgentpancard]=useState()
    const [agentphonenumber,setAgentphonenumber]=useState()
    

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
   const datas={name,email,password,phonenumber,address,state,city,zip}
    axios.post(`${api}/newtourist`,datas)
    alert("sucessfully created")
    navigate('/')
  }catch(err){
    console.error(err)
  }
}

const agentsubmit=async(e)=>{
  e.preventDefault();
  const datas={name:agentname,email:agentemail,password:agentpassword,username:agentusername,city:agentcity,state:agentstate,address:agentaddress,aadharcard:agentaadharcard,pancard:agentpancard,phonenumber:agentphonenumber}
  try{
    const dat=await axios.post(`${api}/newagent`,datas)
    console.log(dat)
    navigate('/')
  }catch(err){
    console.log(err)
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
   
     

      
       {account=='tourist'&&(
    <Form className='for card-hover-animate card-animate' onSubmit={handlesubmit}>
      <div style={{display:'flex',gap:"20px",justifyContent:'center'}}>
        <Button style={{display:'flex',flexDirection:'row'}}>Toursit</Button>
        <Button style={{display:'flex',flexDirection:'row'}}
        onClick={()=>{setAccount('agent')}}
        >Agent</Button>
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
    
      

      

      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control type="txt" placeholder="Enter your Address" 
          onChange={(e)=>{
            setAddress(e.target.value)
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

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type='text' onChange={(e)=>{setCity(e.target.value)}}/>
        </Form.Group>

      

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control type='text' onChange={(e)=>{
            setZip(e.target.value)
          }} />
        </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>phonenumber</Form.Label>
          <Form.Control type="text" placeholder="Enter phonenumber" 
          onChange={(e)=>{
            setPhonumber(e.target.value)
          }}
          />
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
    </Form>)
}

{/* Agent account */}

 {account=='agent'&&(
    <Form className='for card-hover-animate card-animate' onSubmit={agentsubmit}>
      <div style={{display:'flex',gap:"20px",justifyContent:'center'}}>
        <Button style={{display:'flex',flexDirection:'row'}}
        onClick={(e)=>{setAccount('tourist')}}
        >Toursit</Button>
        <Button style={{display:'flex',flexDirection:'row'}}
        onClick={()=>{setAccount('agent')}}
        >Agent</Button>
        </div>
    
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" 
          onChange={(e)=>{
            setAgentname(e.target.value)
          }}
          />
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
          onChange={(e)=>{
            setAgentemail(e.target.value)
          }}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
          onChange={(e)=>{
            setAgentpassword(e.target.value)
          }}
          />
        </Form.Group>
           <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" 
          onChange={(e)=>{
            setAgentusername(e.target.value)
          }}
          />
        </Form.Group>
    
      

      

      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control type="txt" placeholder="Enter your Address" 
          onChange={(e)=>{
            setAgentaddress(e.target.value)
          }}
          />
        </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose..."
          onChange={(e)=>{
            setAgentstate(e.target.value)
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

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type='text' onChange={(e)=>{setAgentcity(e.target.value)}}/>
        </Form.Group>

      

          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>phonenumber</Form.Label>
          <Form.Control type="text" placeholder="Enter phonenumber" 
          onChange={(e)=>{
            setAgentphonenumber(e.target.value)
          }}
          />
        </Form.Group>

           <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>pancard</Form.Label>
          <Form.Control type="number" placeholder="pan Number" 
          onChange={(e)=>{
            setAgentpancard(e.target.value)
          }}
          />
        </Form.Group>
           <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Aadhar card number</Form.Label>
          <Form.Control type="number" placeholder="Aadhar card number" 
          onChange={(e)=>{
            setAgentaadharcard(e.target.value)
          }}
          />
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
    </Form>)
}



    </motion.div> </motion.div>
    </>
  );
}

export default Createaccount;