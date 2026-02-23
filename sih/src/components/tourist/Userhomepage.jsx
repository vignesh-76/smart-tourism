import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../homepage/homepage.css'
import Card from 'react-bootstrap/Card';
import img1 from '../homepage/img1.jpeg'
import img2 from '../homepage/img2.jpg'
import img3 from '../homepage/img3.jpg'
import img4 from '../homepage/img4.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {motion} from 'framer-motion'
import Autoemergency from './Autoemergency';
import AutoEmergencyMic from './AutoEmergencyMic';


function Userhomepage() {

  const api="https://smart-tourist-safety-monitoring-and-86z0.onrender.com"
  const {id}=useParams()
  const navigate=useNavigate()

  const [list,setList]=useState([]);
  const [state,setState]=useState();
  const cardVariants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring" } },
  };

    const text = "Smart Tourism";

 
 const handleEmergency = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
const agentid = list.acceptbytourist[0]?.agentid;

          // Send to backend
          try {
            const response = await axios.put(
              `${api}/panic/${agentid}`,
              {
                latitude,
                longitude,
                touristid: id,
                touristname: list.name,
                phonenumber: list.phonenumber,
                message:'Emergency alert'
              }
            );
            console.log("Emergency alert sent:", response.data);
          } catch (err) {
            console.error("Error sending alert:", err);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

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

useEffect(()=>{
  const fetchfunction=async()=>{
    const res=await axios.get(`${api}/gettourist`)
    const valid=res.data.find((x)=>x._id===id)
    setList(valid)

  };fetchfunction();
},[api])

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
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Create Account</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
               <NavDropdown.Divider />
                  <NavDropdown.Item onClick={()=>{navigate('/')}}>
                   Log Out
                  </NavDropdown.Item>
                </NavDropdown>
            <Nav.Link onClick={()=>{navigate(`/editaccount/${id}/tourist`)}}>
             Edit Account
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

 <AutoEmergencyMic list={list} id={id} api={api} />
    <Autoemergency list={list} id={id} api={api} />
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
            <Button style={{ marginTop: "20px" }} onClick={handleEmergency}>Emergency Alert</Button>
          </motion.div>
        </div>
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
          <Card style={{ display: "flex", flexDirection: "row" }}>
            <Card.Img
              variant="top"
              src={img1}
              style={{
                width: "200px",
                objectFit: "cover",
                margin: "0 auto",
                display: "block",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            />
            <Card.Body>
              <Card.Title>📍 Location Fetch</Card.Title>
              <Card.Text style={{ textAlign: "justify" }}>
                Our system enables tourists to securely fetch their real-time GPS
                location through the mobile/web app. In <b>normal mode</b>, updates
                are sent periodically, while in <b>emergency mode</b>, the SOS trigger
                instantly shares the most accurate location with authorities. Locations
                are encrypted and logged on blockchain for integrity.
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Button variant="primary" style={{ borderRadius: "25px", padding: "8px 20px" }}>
                  Learn More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </div>

      <br />

      {/* AI Assistance */}
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
              src={img2}
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
                🤖 AI Assistance
              </Card.Title>
              <Card.Text style={{ textAlign: "justify" }}>
                The system uses <b>AI-powered anomaly detection</b> to monitor tourist
                activities and identify potential risks in real time. Automated alerts
                are generated for unusual patterns, ensuring faster response from authorities.
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Button
                  variant="success"
                  style={{ borderRadius: "25px", padding: "6px 18px" }}
                  onClick={() => navigate("/voice")}
                >
                  Learn More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </div>

      <br />

      {/* Digital Tourist ID */}
      <div style={{ paddingRight: "50%" }}>
        <motion.div
          variants={cardVariants}
          initial="hiddenLeft"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Card style={{ display: "flex", flexDirection: "row" }}>
            <Card.Img
              variant="top"
              src={img3}
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
                🪪 Digital Tourist ID
              </Card.Title>
              <Card.Text style={{ textAlign: "justify" }}>
                Each traveler is issued a secure <b>Blockchain-based Digital ID</b>
                that stores personal and travel details. This tamper-proof identity
                ensures trust, quick verification, and seamless access to emergency
                services while protecting user privacy.
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Button variant="info" style={{ borderRadius: "25px", padding: "6px 18px" }}>
                  Learn More
                </Button>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </div>

      <br />

      {/* Travel Agent */}
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
                  onClick={() => navigate(`/selectagent/${id}`)}
                >
                  Select Agent
                </Button>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </div>
    </motion.div>

</motion.div></motion.div>


    </>
  );

}

export default Userhomepage;