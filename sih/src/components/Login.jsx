import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useState } from 'react';
import {motion} from 'framer-motion'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate=useNavigate()

  const [account,setAccount]=useState("tourist")
  
  const api="https://smart-tourist-safety-monitoring-and-86z0.onrender.com";
  const [list,setList]=useState()
  const [agentlist,setAgentlist]=useState();
  const [username,setUsername]=useState()
  const [password,setPassword]=useState()

  const [agentusername,setAgentusername]=useState();
  const [agentpassword,setAgentpassword]=useState();


 useEffect(()=>{
  const fetchfunction=async()=>{
    const res=await axios.get(`${api}/gettourist`)
    const res1=await axios.get(`${api}/agent`)
    setAgentlist(res1.data)
    console.log(res.data)
    console.log(res1.data)
    const dat=res.data
    setList(dat)
    
  };fetchfunction();
 },[api])

 const handlesubmit=(e)=>{
  e.preventDefault()
  try{
    const val=list.find((x)=>x.password==password && x.email==username)
     const valid=list.some((x)=>x.password==password && x.email==username)
     if(valid){
        
    if(val?.personaldetails.length>0){

        navigate(`/userhomepage/${val._id}`)
    }else{
   navigate(`/useraccount/${val._id}`)
  
     }
    alert("sucessfully ")
      }else{
      alert("Invalid username or password")
     }
   
  }catch(err){
    console.log("error")
  }
 }

const agentsubmit=(e)=>{
  e.preventDefault();
  try{
   
    const val=agentlist.find((x)=>x.username===agentusername && x.password===agentpassword)
    const valid=agentlist.some((x)=>x.username===agentusername && x.password===agentpassword)
    console.log(valid.name)
    if(valid){
      alert(`sucessfully login in to ${val.name}`)
      navigate(`/agentdashboard/${val._id}`)
    }else{
      alert("invalid")
    }
  }catch(err){
    console.log(err)
  }
}

  return (
    <>
       <motion.div
        className='lab1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
   
 
 {account==="tourist"&&(
    <Form className='for card-hover-animate card-animate' onSubmit={handlesubmit}>
      <div style={{display:'flex',gap:"20px",justifyContent:'center'}}>
        <Button style={{display:'flex',flexDirection:'row'}}>Toursit</Button>
        <Button style={{display:'flex',flexDirection:'row'}}
        onClick={()=>{setAccount('agent')}}
        >Agent</Button>
        </div>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
        onChange={(e)=>{
          setUsername(e.target.value)
        }}
        />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
       <p style={{cursor:'pointer'}}
      onClick={()=>{navigate('/createaccount')}}
      >New User.</p>
      <div style={{display:'flex',justifyContent:'center'}}>      
        <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>

    </Form>
    )}

    
 {account==="agent"&&(
    <Form className='for card-hover-animate card-animate' onSubmit={agentsubmit}>
      <div style={{display:'flex',gap:"20px",justifyContent:'center'}}>
        <Button style={{display:'flex',flexDirection:'row'}}
        onClick={()=>{setAccount('tourist')}}
        >Toursit</Button>
        <Button style={{display:'flex',flexDirection:'row'}}
        onClick={()=>{setAccount('agent')}}
        >Agent</Button>
        </div>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username address</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" 
        onChange={(e)=>{
          setAgentusername(e.target.value)
        }}
        />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        onChange={(e)=>{
          setAgentpassword(e.target.value)
        }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
        <p style={{cursor:'pointer'}}
      onClick={()=>{navigate('/createaccount')}}
      >New User.</p>
      <div style={{display:'flex',justifyContent:'center'}}>      
        <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>

    </Form>
    )}
   
      </motion.div>  </motion.div>
    </>
  );
}

export default Login;