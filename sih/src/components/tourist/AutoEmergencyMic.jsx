import { useState, useRef, useEffect } from "react";
import axios from "axios";

function AutoEmergencyMic({ list, id, api }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const restartTimeoutRef = useRef(null);


  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      alert("❌ Speech recognition is not supported in this browser.");
      return;
    }
console.log(list,id,api)
    const recog = new SpeechRecognition();
    recognitionRef.current = recog;
    recog.continuous = true;       // keep listening
    recog.interimResults = false;
    recog.lang = "en-US";
    const agentid = list?.acceptbytourist?.[0]?.agentid;
console.log(agentid);


    recog.onstart = () => {
      console.log("🎤 Voice recognition started automatically...");
      setIsRecording(true);
    };

    recog.onresult = async (event) => {
      const voiceText =
        event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

      console.log("✅ Voice detected:", voiceText);
      setTranscript(voiceText);

      // Trigger panic only if keyword matches
      if (voiceText.includes("emergency") || voiceText.includes("help")) {
        try {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;

            await axios.put(`${api}/panic2/${agentid}`, {
              touristid: list?._id,
              touristname: list?.name,
              phonenumber: list?.phonenumber,
              latitude,
              longitude,
              message: voiceText,
            });

            alert(`🚨 Panic alert sent: "${voiceText}" at location ${latitude}, ${longitude}`);
          });
        } catch (err) {
          console.error("❌ Error sending panic alert:", err);
          alert("⚠️ Failed to send panic alert.");
        }
      }
    };

    recog.onerror = (err) => {
      if (err.error === "no-speech") {
        console.warn("⚠️ No speech detected, still listening...");
      } else {
        console.error("Speech recognition error:", err.error);
      }
      setIsRecording(false);
    };

    recog.onend = () => {
      console.log("🎤 Recognition ended. Restarting in 1 minute...");
      setIsRecording(false);

      restartTimeoutRef.current = setTimeout(() => {
        try {
          recog.start();
        } catch (err) {
          console.error("❌ Error restarting recognition:", err);
        }
      }, 60000); // restart after 1 minute
    };

    // Start automatically on mount
    try {
      recog.start();
    } catch (err) {
      console.error("❌ Error starting recognition:", err);
    }

    return () => {
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      recog.stop();
      setIsRecording(false);
    };
  }, [api, id, list]);

  return (
    <div>
      <p style={{ marginTop: "10px", fontWeight: "bold", color: "green" }}>
        🎤 Auto emergency detection {isRecording ? "ON" : "OFF"}
      </p>

      {transcript && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Last detected: "{transcript}"
        </p>
      )}
    </div>
  );
}

export default AutoEmergencyMic;
