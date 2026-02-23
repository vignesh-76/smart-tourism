import { useEffect } from "react";
import axios from "axios";

// Example danger zones (lat, lng, radius in km)
const dangerZones = [
  { latitude: 10.990, longitude: 76.960, radius: 0.5 }, // 0.5 km radius
  { latitude: 11.000, longitude: 76.950, radius: 0.3 },
];

// Function to calculate distance between two coordinates in km
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function Autoemergency({ list, id, api }) {
  useEffect(() => {
    let interval;

    if (navigator.geolocation) {
      interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const agentid = list.acceptbytourist[0]?.agentid;

            if (!agentid) {
              console.warn("No agent found for this tourist.");
              return;
            }

            // Check if tourist is in any danger zone
            const inDanger = dangerZones.some((zone) => {
              const distance = getDistance(
                latitude,
                longitude,
                zone.latitude,
                zone.longitude
              );
              return distance <= zone.radius;
            });

            const message = inDanger ? "Emergency alert" : "Normal";

            try {
              await axios.put(`${api}/panic1/${agentid}`, {
                latitude,
                longitude,
                touristid: id,
                touristname: list.name,
                phonenumber: list.phonenumber,
                message, // send "Emergency alert" if in danger zone
              });

              console.log(
                `🚨 Alert sent at ${new Date().toLocaleTimeString()} | ${message}`
              );
            } catch (err) {
              console.error("Error sending auto alert:", err);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }, 5000); // every 5 seconds
    } else {
      alert("Geolocation is not supported by your browser.");
    }

    return () => clearInterval(interval);
  }, [list, id, api]);

  return null;
}

export default Autoemergency;
