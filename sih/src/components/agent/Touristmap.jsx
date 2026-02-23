import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams } from "react-router-dom";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker for emergency
const emergencyIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/564/564619.png",
  iconSize: [35, 35],
});

const agentIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
  iconSize: [30, 30],
});

const normalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673221.png",
  iconSize: [30, 30],
});

// Define danger zones
const dangerZones = [
  { latitude: 10.990, longitude: 76.960, radius: 500 }, // radius in meters
  { latitude: 11.000, longitude: 76.950, radius: 300 },
];

const TouristMap = () => {
  const getTouristIcon = (message) => {
    if (message === "Emergency alert") return emergencyIcon;
    if (message === "Normal") return normalIcon;
    return normalIcon;
  };

  const [locations, setLocations] = useState([]);
  const [agentLocation, setAgentLocation] = useState(null);
  const { id } = useParams();

  // Fetch tourist notifications
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("https://smart-tourist-safety-monitoring-and-86z0.onrender.com/agent");
        const agent = res.data.find((x) => x._id === id);

        if (agent && agent.acceptbytourist && agent.acceptbytourist.length > 0) {
          const allNotifications = agent.acceptbytourist.flatMap(entry => entry.notifications || []);
          setLocations(allNotifications);
          console.log(allNotifications);
        } else {
          setLocations([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 5000);
    return () => clearInterval(interval);
  }, [id]);

  // Track agent's location in real-time
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setAgentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => console.error(err),
        { enableHighAccuracy: true, maximumAge: 1000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const lastLocation = locations[locations.length - 1];

  const polylinePositions =
    agentLocation && lastLocation
      ? [
          [agentLocation.latitude, agentLocation.longitude],
          [lastLocation.latitude, lastLocation.longitude],
        ]
      : [];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h3 style={{ textAlign: "center", margin: "10px 0" }}>
        Tourist Tracking with Path
      </h3>

      {lastLocation ? (
        <MapContainer
          center={[lastLocation.latitude, lastLocation.longitude]}
          zoom={13}
          style={{ height: "90%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Tourist markers */}
          {locations.map((loc, idx) => (
            <Marker
              key={idx}
              position={[loc.latitude, loc.longitude]}
              title={loc.touristName}
              icon={getTouristIcon(loc.message)}
            >
              <Popup>
                <b>{loc.touristName}</b> <br />
                {loc.message === "Emergency alert" ? "🚨 Emergency!" : "📍 Location"} <br />
                Lat: {loc.latitude}, Lng: {loc.longitude} <br />
                Phone: {loc.phonenumber} <br />
                Time: {new Date(loc.date).toLocaleTimeString()}
              </Popup>
            </Marker>
          ))}

          {/* Agent marker */}
          {agentLocation && agentLocation.latitude && agentLocation.longitude && (
            <Marker
              position={[agentLocation.latitude, agentLocation.longitude]}
              title="Your Location"
              icon={agentIcon}
            >
              <Popup>You are here</Popup>
            </Marker>
          )}

          {/* Polyline from agent to tourist */}
          {polylinePositions.length > 0 && (
            <Polyline
              positions={polylinePositions}
              color={lastLocation.message === "Emergency alert" ? "red" : "blue"}
              weight={4}
            />
          )}

          {/* Danger zones */}
          {dangerZones.map((zone, idx) => (
            <Circle
              key={idx}
              center={[zone.latitude, zone.longitude]}
              radius={zone.radius} // in meters
              pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.2 }}
            />
          ))}

        </MapContainer>
      ) : (
        <p style={{ textAlign: "center" }}>Loading tourist locations...</p>
      )}
    </div>
  );
};

export default TouristMap;
