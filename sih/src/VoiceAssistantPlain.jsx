import React, { useState, useRef } from "react";
import axios from "axios";

const VoiceAssistant = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.start();
    setIsRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      handleTextSubmit(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Mic access error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const stopRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsRecording(false);
  };

  const handleTextSubmit = async (inputText) => {
    if (!inputText.trim()) return;

    try {
      const formData = new FormData();
      formData.append("text", inputText);

      const res = await axios.post("http://127.0.0.1:8000/get_info", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponse(res.data.text || "No response received.");
      setAudioUrl(res.data.audio ? `http://127.0.0.1:8000${res.data.audio}` : null);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error connecting to backend.");
      setAudioUrl(null);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🌍 Travel Voice Assistant</h1>
        <p>Ask about any city in the world by typing or speaking</p>
      </header>

      <main style={styles.main}>
        <textarea
          style={styles.textarea}
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your question here..."
        />

        <div style={styles.buttonsContainer}>
          <button style={styles.sendButton} onClick={() => handleTextSubmit(text)}>
            Send
          </button>

          {isRecording ? (
            <button style={styles.stopButton} onClick={stopRecording}>
              ⏹ Stop Recording
            </button>
          ) : (
            <button style={styles.micButton} onClick={startRecording}>
              🎤 Start Recording
            </button>
          )}
        </div>

        <div style={styles.responseBox}>
          <h3>Response:</h3>
          <p style={{ whiteSpace: "pre-line" }}>{response}</p>
          {audioUrl && <audio controls src={audioUrl} style={{ marginTop: "10px" }} />}
        </div>
      </main>

      <footer style={styles.footer}>
        <p>Developed by Your Name | Travel Assistant Demo</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    color: "#333",
  },
  header: {
    padding: "2rem",
    textAlign: "center",
    backgroundColor: "#2563eb",
    color: "#fff",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  main: {
    flex: 1,
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  buttonsContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  sendButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  micButton: {
    backgroundColor: "green",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  stopButton: {
    backgroundColor: "red",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  responseBox: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #ccc",
    minHeight: "100px",
  },
  footer: {
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#e2e8f0",
    marginTop: "auto",
    borderTop: "1px solid #ccc",
  },
};

export default VoiceAssistant;
