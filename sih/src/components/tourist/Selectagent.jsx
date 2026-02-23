import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../homepage/homepage.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { use } from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import img from './img.jpg'
import Carousel from "react-bootstrap/Carousel";
import img1 from './img1.jpg'
import './selectagent.css'
import { motion } from "framer-motion";



const Selectagent = () => {
  const {id}=useParams()
  const api="https://smart-tourist-safety-monitoring-and-86z0.onrender.com"
  const [list,setList]=useState()
  const [agent,setAgent]=useState()
  const [showMenu, setShowMenu] = useState(false);
  const [filter,setFilter]=useState('normal')
  const [state,setState]=useState('...')
  const [searchstate,setSearchstate]=useState();
  const [fromto,setFromto]=useState();
  const [placefrom,setPlacefrom]=useState();
  const [placeto,setPlaceto]=useState();
  const [show,setShow]=useState('normal');
  const [showmore,setShowmore]=useState(false)
 


  useEffect(()=>{
    const fetchfunction=async()=>{
      const res=await axios.get(`${api}/gettourist`)
      const valid=res.data.find((x)=>x._id===id)
      const res1=await axios.get(`${api}/agent`)
    
      console.log(res1.data)
      setAgent(res1.data)
      setList(valid)
  
    };fetchfunction();
  },[api,id])



   const text = "Smart Tourism";

  // Animation variants for each letter
  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // delay each letter
        duration: 0.6,
      },
    }),
  };





  const handlesubmit=async(x,from,to,amount)=>{
    const datas={name:list?.name,email:list?.email,phonenumber:list?.phonenumber,from:from,to:to,amount:amount,touristid:id}
    await axios.post(`${api}/agentbooking/${x}`,datas)
   console.log(x)
  }

  const search=async()=>{
    console.log(state)
    const res1=await axios.get(`${api}/fetchbystate/${state}`)
    setFilter('search')
    setSearchstate(res1.data)
    console.log(res1.data)
  }

  const from=async()=>{
    const res1=await axios.get(`${api}/fetchbyfromandto/${placefrom}/${placeto}`)
    setFilter('from')
    console.log(res1.data)
    setFromto(res1.data)
  }
 
  
const [sortOrder, setSortOrder] = useState("asc");
const change=(e)=>{
  setFilter('price')
  setSortOrder("asc")
console.log("hello")

  }
  const change1=(e)=>{
  setFilter('price')
  setSortOrder("desc")


  }

   const sortedAgents = agent
  ? agent.map((ag) => ({
      ...ag,
      touristagent: [...(ag.touristagent || [])].sort((a, b) =>
        sortOrder === "desc"
          ? b.agentamount - a.agentamount
          : a.agentamount - b.agentamount
      ),
    }))
  : [];

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
            <Nav.Link onClick={()=>{setShow('normal')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{setShow('agent')}}>Agent</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
               <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=>{navigate('/')}}>
                   Log Out
                  </NavDropdown.Item>
                </NavDropdown>
  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

 
    <motion.div
      className="frm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="homeimg" style={{ textAlign: "center" }}>
        <h5>
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              style={{ display: "inline-block", fontWeight: "bold", fontSize: "150px" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h5>

        <div className="imgbut">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
          >
            <Button style={{ marginTop: "20px" }}>Emergency Alert</Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
<br></br>

    
<div style={{display:"flex",gap:"2px",justifyContent:'center'}}>
  <input type='text' placeholder='Search by State' onChange={(e)=>{setState(e.target.value)}}/>
  <Button onClick={search}>Search</Button>
</div>
 <Button
        variant="primary"
        onClick={() => setShowMenu(true)}
        style={{ margin: '20px' }}
      >
        ☰ Menu
      </Button>
      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <input type='text' placeholder='Search by fromplace'
         onChange={(e)=>{setPlacefrom(e.target.value)}}
         />
          <br />
          <input type='text' placeholder='Search by toplace'
          onChange={(e)=>{setPlaceto(e.target.value)}}
          />
          <Button variant="link" onClick={from}>Filter</Button><br />
          <div style={{ padding: "20px", display: "flex", justifyContent: "flex-end" }}>
        <Dropdown >
          <Dropdown.Toggle variant="secondary" id="dropdown-sort" >
            Sort by Price
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={change}>
              Low → High
            </Dropdown.Item>
            <Dropdown.Item onClick={change1}>
              High → Low
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
        </Offcanvas.Body>
      </Offcanvas>

<br></br>


<motion.div
        className='ab1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
{show==='normal'&&(
<div style={{ padding: "20px" }}>

   {/* Grid with 3 cards per row */}
  <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(3, 1fr)", 
      gap: "20px" 
    }}>

  {/* Section Header */}
  <motion.div
        className='lb1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
  <div className='hero'>
    <h2>🧑‍💼 Why Do You Need a Tourism Agent?</h2>
    <p>
      A tourism agent is not just a booking assistant—they are a trusted 
      guide who ensures your travel experience is safe, smooth, and memorable. 
      From planning the trip to handling emergencies, agents add real value 
      for both tourists and authorities.
    </p>
  </div>
</motion.div></motion.div>
 
 <motion.div
        className='lb1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
     <div className='hero1'>
           <h3>✈️ Travel Planning & Guidance</h3>
      <p>Agents provide expert recommendations on destinations, routes, transport, and accommodation. Their planning reduces confusion and helps tourists save both time and money.</p>
    </div>
</motion.div></motion.div>

 <motion.div
        className='lb1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
    <div className='hero2'>
            <h3>🛡️ Safety & Emergency Support</h3>
      <p>During accidents, health issues, or lost directions, agents act as the first point of contact. They immediately alert authorities or nearby hospitals, ensuring quick support for tourists.</p>
    </div>
    </motion.div></motion.div>
 {showmore && (
  <>
   <motion.div
        className='lb1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
   <div className='hero3'>
          <h3>🌍 Local Expertise</h3>
      <p>Agents know the local culture, traditions, and safety regulations. They help tourists avoid risky areas, communicate with locals, and experience the place authentically without language barriers.</p>
    </div>
</motion.div></motion.div>

 <motion.div
        className='lb1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
  <div className='hero4'>
          <h3>📲 Easy Communication</h3>
      <p>Tourists can stay connected with agents via phone or digital apps. Agents help in booking services, guiding routes, and providing quick answers to traveler queries anytime.</p>
    </div>

</motion.div></motion.div>
 <motion.div
        className='lb1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
 <div className='hero5'>
       <h3>📑 Legal & Document Assistance</h3>
      <p>From permits and passes to digital tourist IDs, agents ensure tourists have the right documents for safe and hassle-free travel. They also guide travelers on local policies and compliance.</p>
    </div>

</motion.div></motion.div>
 <motion.div
        className='lb1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
  <div className='hero6'>
        <h3>🤝 Personalized Experience</h3>
      <p>Agents offer customized travel experiences by suggesting the best attractions, local food, and hidden gems based on tourist preferences. This makes the trip more enjoyable and unique.</p>
    </div>

</motion.div></motion.div>
 <motion.div
        className='la1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
   <div className='hero7'>
          <h3>⚡ Quick Problem Solving</h3>
      <p>Unexpected issues like lost luggage, transport delays, or booking errors are resolved quickly with the help of agents, preventing stress for the tourist.</p>
    </div>
</motion.div></motion.div>

 <motion.div
        className='ab1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
 <div className='hero8'>
       <h3>📊 Support for Authorities</h3>
      <p>Agents also act as a bridge between tourists and local authorities. They help in reporting incidents, guiding tourists in safe zones, and improving overall tourism management.</p>
    </div> 
    </motion.div></motion.div>
    </>
 )}

  
</div>


      {/* Show More / Show Less Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => setShowmore(!showmore)}
          style={{ padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}
        >
          {showmore ? "Show Less" : "Show More"}
        </button>
      </div>

  
</div>



)}
</motion.div>
</motion.div>


{show==='agent'&&(
  
<>

<motion.div
        className='lb1'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
{filter === "normal" && (

  
 <div style={{
  padding: "40px",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  overflowX: "auto" 
}}>
  {agent?.length > 0 ? (
    <div style={{ 
      display: "flex", 
      flexDirection: "row", 
      gap: "40px", 
      minWidth: "fit-content" 
    }}>
      {agent.map((agentItem, index) => (
        <div key={index} style={{ 
          backgroundColor: "rgba(0,0,0,0.6)", 
          padding: "20px", 
          borderRadius: "15px",
          flex: "0 0 350px" // fix width of each agent block
        }}>
          <h3 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>
            {agentItem.name}
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr", // single column inside agent block
            gap: "20px"
          }}>
            {agentItem.touristagent?.map((x, idx) => (
              <div key={idx} style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                padding: "20px",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                <h5 style={{ marginBottom: "10px" }}>{x.state} - {x.city}</h5>
                <p>
                  From: {x.fromplace} <br />
                  To: {x.toplace} <br />
                  Amount: {x.agentamount}
                 
                </p>
                <div style={{ display:'flex', justifyContent:'center' }}>               
                  <Button
                  disabled={agentItem.available}
                    onClick={() => handlesubmit(agentItem._id, x.fromplace, x.toplace, x.agentamount)}
                  >
                    Book Agent
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p style={{ color: "white", textAlign: "center" }}>Loading agents...</p>
  )}
</div>

)}

      
<br></br>
{filter === 'search' ? (
  <div
    style={{
      padding: "20px",
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
  >
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        padding: "20px",
      }}
    >
      {searchstate?.length > 0 ? (
        searchstate.map((user, idx) => (
          <div key={idx} style={{ display: "flex", gap: "20px", flexWrap: "wrap", padding: "20px" }}>
            {user.touristagent?.map((agent, index) => (
              <Card key={index} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{agent.state} - {agent.city}</Card.Title>
                  <Card.Text>
                    From: {agent.fromplace} <br />
                    To: {agent.toplace} <br />
                    Amount: ₹{agent.agentamount}
                  </Card.Text>
                  <Button
                   disabled={user.available}
                    variant="primary"
                    onClick={() => handlesubmit(user._id, agent.fromplace, agent.toplace, agent.agentamount)}
                  >
                    Book Agent
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        ))
      ) : (
        <p>Loading agents...</p>
      )}
    </div>
  </div>
) : null}



      
<br></br>
{filter==='from' && (
  <div style={{
    padding: "20px",
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}>
    {fromto?.length > 0 ? (
      <Carousel variant="dark">
        {fromto.map((user, index) => (
          <Carousel.Item key={index}>
            <h5 style={{ textAlign: "center", marginBottom: "10px", color: "white" }}>
              {user.name}
            </h5>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              {user.touristagent?.map((agent, idx) => (
                <Card key={idx} style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{agent.state} - {agent.city}</Card.Title>
                    <Card.Text>
                      From: {agent.fromplace} <br />
                      To: {agent.toplace} <br />
                      Amount: {agent.agentamount}
                    </Card.Text>
                    <Button
                      variant="primary"
                      disabled={!agent.available} 
                      onClick={() => handlesubmit(user._id, agent.fromplace, agent.toplace, agent.agentamount)}
                    >
                      {agent.available ? "Book Agent" : "Unavailable"} 
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    ) : (
      <p>Loading agents...</p>
    )}
  </div>
)}


      
<br></br>
{filter==='price'&&(
 <div>
  {sortedAgents.map((a) => (
    <div key={a._id}>
      <h5>{a.name}</h5>
      {a.touristagent.map((pkg, index) => (
        <Card key={index} style={{ width: "18rem", margin: "10px" }}>
          <Card.Body>
            <Card.Title>{pkg.state} - {pkg.city}</Card.Title>
            <Card.Text>
              From: {pkg.fromplace} <br />
              To: {pkg.toplace} <br />
              Amount1: {pkg.agentamount}
            </Card.Text>
            <Button  variant="primary"
                       disabled={sortedAgents.available}
                      onClick={() => handlesubmit(sortedAgents._id, pkg.fromplace, pkg.toplace, pkg.agentamount)}
                   >Book Agent</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  ))}
</div>)}
</motion.div></motion.div>
</>
)}

</>
  )
}

export default Selectagent