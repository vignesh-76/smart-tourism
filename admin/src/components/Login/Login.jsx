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
 
  const [username,setUsername]=useState()
  const [password,setPassword]=useState()



 useEffect(()=>{
  const fetchfunction=async()=>{
    const res=await axios.get(`${api}/gettd`)

    const dat=res.data
    setList(dat)
    
  };fetchfunction();
 },[api])

 const handlesubmit=(e)=>{
  e.preventDefault()
  try{
    const val=list.find((x)=>x.password==password && x.username==username)
     const valid=list.some((x)=>x.password==password && x.username==username)
     if(valid){
        
   

        navigate(`/homepage/${val._id}`)
 
    alert("sucessfully ")
      }else{
      alert("Invalid username or password")
     }
   
  }catch(err){
    console.log("error")
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
   

    <Form className='for1 card-hover-animate card-animate' onSubmit={handlesubmit}>
      <div style={{display:'flex',gap:"20px",justifyContent:'center'}}>
        <h5>Tourism Department</h5>
        </div>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" 
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
      onClick={()=>{navigate('/signup')}}
      >New User.</p>
      <div style={{display:'flex',justifyContent:'center'}}>      
        <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>

    </Form>
  
   
      </motion.div>  </motion.div>
    </>
  );
}

export default Login;