import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Homepage = () => {
  const api = "https://smart-tourist-safety-monitoring-and-86z0.onrender.com";
  const { id } = useParams();
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("tourist");
  const [agentlist, setAgentlist] = useState([]);
  const [touristlist, setTouristlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // normalize helper
  const norm = (s) => (s || "").toLowerCase().trim();

  useEffect(() => {
    if (!id) return; // wait until id is available
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // fetch in parallel
        const [resAgents, resTourists, resTd] = await Promise.all([
          axios.get(`${api}/agent`),
          axios.get(`${api}/gettourist`),
          axios.get(`${api}/gettd`),
        ]);

        // defensive: extract arrays
        const agentsArr = Array.isArray(resAgents.data)
          ? resAgents.data
          : resAgents.data?.data || [];
        const touristsArr = Array.isArray(resTourists.data)
          ? resTourists.data
          : resTourists.data?.data || [];
        const tdArr = Array.isArray(resTd.data) ? resTd.data : resTd.data?.data || [];

        console.log("agentsArr:", agentsArr);
        console.log("touristsArr:", touristsArr);
        console.log("tdArr:", tdArr);

        // find the valid td entry by id (string-safe)
        const validdata = tdArr.find((x) => String(x._id) === String(id));
        console.log("validdata:", validdata);

        if (!validdata) {
          setAgentlist([]);
          setTouristlist([]);
          setError("No matching TD record found for this id");
          setLoading(false);
          return;
        }

        // Determine which state to use for agents and tourists:
        // prefer explicit fields if available, otherwise fallback
        const targetStateAgents =
          validdata.statefilterbyagent ?? validdata.state ?? "";
        const targetStateTourists =
          validdata.state ?? validdata.statefilterbyagent ?? "";

        console.log("targetStateAgents:", targetStateAgents);
        console.log("targetStateTourists:", targetStateTourists);

        // lenient exact match first
        let finalAgents = agentsArr.filter(
          (x) => norm(x.state) === norm(targetStateAgents)
        );
        let finalTourists = touristsArr.filter(
          (x) => norm(x.state) === norm(targetStateTourists)
        );

        // fallback: try includes (lenient) if strict match returned nothing
        if (finalAgents.length === 0 && targetStateAgents) {
          finalAgents = agentsArr.filter((x) =>
            norm(x.state).includes(norm(targetStateAgents))
          );
        }
        if (finalTourists.length === 0 && targetStateTourists) {
          finalTourists = touristsArr.filter((x) =>
            norm(x.state).includes(norm(targetStateTourists))
          );
        }

        console.log("finalAgents:", finalAgents);
        console.log("finalTourists:", finalTourists);

        setList(agentsArr);
        setAgentlist(finalAgents);
        setTouristlist(finalTourists);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data. Check console for details.");
        setAgentlist([]);
        setTouristlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">SMART TOURISM</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 navbar1" navbarScroll>
              <Nav.Link onClick={() => setFilter('agent')}>
                Agent
              </Nav.Link>
              <Nav.Link onClick={() => setFilter('tourist')}>
                Tourist
              </Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item >
                  Trip Details
                </NavDropdown.Item>
                <NavDropdown.Item >
                  Booking Details
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                  Process
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/")}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link >
                Edit Account
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />

      {loading && (
        <div style={{ padding: 20 }}>
          <Spinner animation="border" role="status" size="sm" /> Loading...
        </div>
      )}
      {error && <div style={{ color: "red", padding: 10 }}>{error}</div>}

      {/* AGENTS */}
      {filter === "agent" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px",justifyContent:'center' }}>
          {Array.isArray(agentlist) && agentlist.length > 0 ? (
            agentlist.map((x, index) => (
              <Card key={index} style={{ width: "18rem" }}>
               
                <Card.Body>
                  <Card.Title>{x.name || "Agent Name"}</Card.Title>
                  <Card.Text>
                    State: {x.state} <br />
                    City: {x.city} <br />
                    Phone: {x.phonenumber}
                  </Card.Text>
                  <Button
                    variant="primary"
                    
                    onClick={() =>{
                      const state=true
                      navigate(`/nextpage/${x._id}/${state}`)}}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No agents found.</p>
          )}
        </div>
      )}

      {/* TOURISTS */}
      {filter === "tourist" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px",justifyContent:'center' }}>
          {Array.isArray(touristlist) && touristlist.length > 0 ? (
            touristlist.map((x, index) => (
              <Card key={index} style={{ width: "18rem" }}>
                
                <Card.Body>
                  <Card.Title>{x.name || "Tourist"}</Card.Title>
                  <Card.Text>
                    <strong>State:</strong> {x.state} <br />
                    <strong>City:</strong> {x.city} <br />
                    <strong>Phone:</strong> {x.phonenumber}
                  </Card.Text>
                  <Button
                    variant="primary"
                    
                    onClick={() =>{
                      const state=false
                      navigate(`/nextpage/${x._id}/${state}`)}}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No tourists found.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Homepage;
