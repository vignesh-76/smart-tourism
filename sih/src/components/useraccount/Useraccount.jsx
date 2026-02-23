import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './useraccount.css'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Useraccount() {
  const api="https://smart-tourist-safety-monitoring-and-86z0.onrender.com"
    
const [list,setList]=useState();
const {id}=useParams()



    const [name,setName]=useState();
    const [aadhar,setAadhar]=useState();
    const [mobile,setMobile]=useState();
    const [parmobile,setParmobile]=useState();
    const [pancard,setPancard]=useState();
    const navigate=useNavigate()


    useEffect(()=>{
       const fetchfunction=async()=>{
        const res=await axios.get(`${api}/gettourist`)
        const dat=await axios.get(`${api}/newtourist/${id}/personaldetails`)
        setList(res.data)
       };fetchfunction();
    },[api])

    const handlesubmit=async(e)=>{
      e.preventDefault();
      const datas={name:name,aadharcard:aadhar,phonenumber:mobile,parentmobilenumber:parmobile,pancard:pancard}
      try{
        await axios.post(`${api}/newtourist/${id}/personaldetails`,datas)
        alert("personal detail sucessfully created.")
        navigate(`/userhomepage/${id}`)
      }catch(err){
        console.log(err)
      }
    }


  return (
<>
      <motion.div
        className='farm'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >

       
    <Form className='for card-hover-animate card-animate' onSubmit={handlesubmit}>
     <h5 style={{display:'flex',justifyContent:'center'}}>Personal Details</h5>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" 
          onChange={(e)=>{setName(e.target.value)}}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Aadhar Card Number</Form.Label>
          <Form.Control type="number" placeholder="Enter you Aadhar card Number"
          onChange={(e)=>{setAadhar(e.target.value)}}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="number" placeholder="Enter you Mobile Number"
          onChange={(e)=>{setMobile(e.target.value)}}
          />
        </Form.Group>
         <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Parent Mobile Number</Form.Label>
          <Form.Control type="number" placeholder="Enter you Parent Mobile Number"
          onChange={(e)=>{setParmobile(e.target.value)}}
          />
        </Form.Group>
      

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>pancard</Form.Label>
        <Form.Control type='number' placeholder="Enter your pancard" 
        onChange={(e)=>{setPancard(e.target.value)}}
        />
      </Form.Group>

     
      

      <br></br>
     <div style={{display:'flex',justifyContent:'center'}}>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>
    </Form>
    </motion.div></motion.div>
    </>
  );
}

export default Useraccount;