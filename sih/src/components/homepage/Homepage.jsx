import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './homepage.css'
import Card from 'react-bootstrap/Card';
import img1 from './img1.jpeg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {motion} from 'framer-motion'

function Homepage() {

  const [showmore,setShowmore]=useState(false)

  const navigate=useNavigate()

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

   const cardVariants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring" } },
  };

    const text = "Smart Tourism";

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
            <Nav.Link onClick={()=>{navigate('/login')}}>Home</Nav.Link>
            <Nav.Link  onClick={()=>{navigate('/login')}}>Create Account</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item  onClick={()=>{navigate('/login')}}>Action</NavDropdown.Item>
   
          
            </NavDropdown>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <motion.div
        className='frm'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      > <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
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
            <Button style={{ marginTop: "20px" }} onClick={()=>alert("Login to your Account")}>Emergency Alert</Button>
          </motion.div>
        </div>
      </div>
   
<br></br>
<motion.div initial="hiddenLeft" animate="visible">
      {/* Location Fetch */}
      <div style={{ paddingLeft: "20px", paddingRight: "50%" }}>
        <motion.div
          variants={cardVariants}
          initial="hiddenLeft"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
  <Card style={{ display:'flex',flexDirection:'row'}} >
      <Card.Img variant="top"   src={img1}   style={{  width: "200px",   
   
    objectFit: "cover",
    margin: "0 auto",
    display: "block", borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
    />
      <Card.Body>
        <Card.Title>📍 Location Fetch</Card.Title>
          <Card.Text style={{ textAlign: 'justify' }}>
          Our system enables tourists to securely fetch their real-time GPS 
          location through the mobile/web app. In <b>normal mode</b>, updates 
          are sent periodically, while in <b>emergency mode</b>, the SOS 
          trigger instantly shares the most accurate location with authorities. 
          Locations are encrypted and logged on blockchain for integrity.
        </Card.Text>
        <div className="d-flex justify-content-center">
          <Button variant="primary" style={{ borderRadius: '25px', padding: '8px 20px' }}
         onClick={()=>{navigate('/login')}}
          >
            Learn More
          </Button>
          </div>
      </Card.Body>
    </Card>
    </motion.div>
    </div>
    </motion.div>

  <br></br>

<motion.div initial="hiddenLeft" animate="visible">
      {/* Location Fetch */}
      <div style={{paddingLeft: "50%" }}>
        <motion.div
          variants={cardVariants}
          initial="hiddenLeft"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
  <Card style={{ display:'flex',flexDirection:'row'}} >
      <Card.Img variant="top"   src={img2}   style={{  width: "200px",   
    margin: "0 auto",
    display: "block", objectFit: "cover", borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
    />
      <Card.Body>
        <Card.Title style={{ fontWeight: 'bold', textAlign: 'center' }}>
          🤖 AI Assistance
        </Card.Title>
        <Card.Text style={{ textAlign: 'justify' }}>
          The system uses <b>AI-powered anomaly detection</b> to monitor tourist
          activities and identify potential risks in real time. Automated
          alerts are generated for unusual patterns, ensuring faster response
          from authorities.
        </Card.Text>
        <div className="d-flex justify-content-center">
          <Button variant="success" style={{ borderRadius: '25px', padding: '6px 18px' }}
          onClick={()=>{navigate('/login')}}
          >
            Learn More
          </Button>
        </div>
      </Card.Body>
    </Card>
    </motion.div>
    </div>
</motion.div>


<br></br>
<motion.div initial="hiddenLeft" animate="visible">
      {/* Location Fetch */}
      <div style={{ paddingLeft: "20px", paddingRight: "50%" }}>
        <motion.div
          variants={cardVariants}
          initial="hiddenLeft"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
  <Card style={{ display:'flex',flexDirection:'row'}} >
      <Card.Img variant="top"   src={img3}   style={{width: "200px",   
   
  
    margin: "0 auto",
    display: "block", objectFit: "cover", borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
    />
      <Card.Body>
        <Card.Title style={{ fontWeight: 'bold', textAlign: 'center' }}>
          🪪 Digital Tourist ID
        </Card.Title>
        <Card.Text style={{ textAlign: 'justify' }}>
          Each traveler is issued a secure <b>Blockchain-based Digital ID</b> 
          that stores personal and travel details. This tamper-proof identity 
          ensures trust, quick verification, and seamless access to emergency 
          services while protecting user privacy.
        </Card.Text>
        <div className="d-flex justify-content-center">
          <Button variant="info" style={{ borderRadius: '25px', padding: '6px 18px' }}   onClick={()=>{navigate('/login')}}>
            Learn More
          </Button>
        </div>
      </Card.Body>
    </Card>
    </motion.div>
    </div>
    </motion.div>

<br></br>
<motion.div initial="hiddenLeft" animate="visible">
 <div style={{ paddingLeft: "50%" }}>
        <motion.div
          variants={cardVariants}
          initial="hiddenRight"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Card style={{ display: "flex", flexDirection: "row" }}>
            <Card.Img
              variant="top"
              src={img4}
              style={{
                width: "200px",
                margin: "0 auto",
                display: "block",
                objectFit: "cover",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            />
            <Card.Body>
              <Card.Title style={{ fontWeight: "bold", textAlign: "center" }}>
                🧑‍✈️ Travel Agent
              </Card.Title>
              <Card.Text style={{ textAlign: "justify" }}>
                This travel agent helps you move safely and conveniently from to world.
                They provide reliable transportation, optional meals, and assistance during
                your journey. Pricing options include services <b>with or without food</b>,
                and each agent has a fixed service amount. Selecting an agent ensures your
                trip is organized and secure.
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Button
                  variant="success"
                  style={{ borderRadius: "25px", padding: "6px 18px" }}
                  onClick={() => navigate('/login')}
                >
                  Select Agent
                </Button>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </div>
    </motion.div>


<div style={{ padding: "15%" }}>

   {/* Grid with 3 cards per row */}
  <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(3, 1fr)", 
      gap: "20px" ,
      
    }}>

  {/* Section Header */}
  <div className='hero'style={{paddingBottom:'20%'}}>
    <h2>🧑‍💼 Why Do You Need a Tourism Agent?</h2>
    <p>
      A tourism agent is not just a booking assistant—they are a trusted 
      guide who ensures your travel experience is safe, smooth, and memorable. 
      From planning the trip to handling emergencies, agents add real value 
      for both tourists and authorities.
    </p>
  </div>

 

     <div className='hero1'>
           <h3>✈️ Travel Planning & Guidance</h3>
      <p>Agents provide expert recommendations on destinations, routes, transport, and accommodation. Their planning reduces confusion and helps tourists save both time and money.</p>
    </div>

    <div className='hero2'>
            <h3>🛡️ Safety & Emergency Support</h3>
      <p>During accidents, health issues, or lost directions, agents act as the first point of contact. They immediately alert authorities or nearby hospitals, ensuring quick support for tourists.</p>
    </div>
 {showmore && (
  <>
   <div className='hero3'>
          <h3>🌍 Local Expertise</h3>
      <p>Agents know the local culture, traditions, and safety regulations. They help tourists avoid risky areas, communicate with locals, and experience the place authentically without language barriers.</p>
    </div>

  <div className='hero4'>
          <h3>📲 Easy Communication</h3>
      <p>Tourists can stay connected with agents via phone or digital apps. Agents help in booking services, guiding routes, and providing quick answers to traveler queries anytime.</p>
    </div>

 <div className='hero5'>
       <h3>📑 Legal & Document Assistance</h3>
      <p>From permits and passes to digital tourist IDs, agents ensure tourists have the right documents for safe and hassle-free travel. They also guide travelers on local policies and compliance.</p>
    </div>

  <div className='hero6'>
        <h3>🤝 Personalized Experience</h3>
      <p>Agents offer customized travel experiences by suggesting the best attractions, local food, and hidden gems based on tourist preferences. This makes the trip more enjoyable and unique.</p>
    </div>

   <div className='hero7'>
          <h3>⚡ Quick Problem Solving</h3>
      <p>Unexpected issues like lost luggage, transport delays, or booking errors are resolved quickly with the help of agents, preventing stress for the tourist.</p>
    </div>

 <div className='hero8'>
       <h3>📊 Support for Authorities</h3>
      <p>Agents also act as a bridge between tourists and local authorities. They help in reporting incidents, guiding tourists in safe zones, and improving overall tourism management.</p>
    </div> </>
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

</motion.div></motion.div>




    </>
  );

}

export default Homepage;