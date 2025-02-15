import { useState, useEffect } from "react";
import "./App.css";
import Fireflies from "./components/Fireflies";
import BlurMessage from "./components/BlurMessage";
import Flowers from "./components/Flowers";

function App() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [hideMessages, setHideMessages] = useState(false); // Hide messages before showing flowers
  const [showFlowers, setShowFlowers] = useState(false); // Control flowers appearance

  useEffect(() => {
    const messages = [
      { text: "Sé que no soy el hijo perfecto...", size: "2xl" },
      { text: "Sé que aún me queda mucho por aprender y mejorar.", size: "xl" },
      { text: "No soy bueno para hablar de mis sentimientos...", size: "lg" },
      { text: "Así que aprendí a programar para hacer algo especial para ti:", size: "xl" },
    ];

    if (showInitialMessage) {
      setCurrentMessage({ text: "Feliz San Valentín, Madre", size: "6xl" });
      const timer = setTimeout(() => {
        setShowInitialMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (messageIndex < messages.length) {
      const message = messages[messageIndex];
      setCurrentMessage(message);
      const timeToRead = message.text.length * 100;

      const timer = setTimeout(() => {
        setMessageIndex((prevIndex) => prevIndex + 1);
      }, timeToRead);

      return () => clearTimeout(timer);
    } else {
      // Delay before hiding messages
      const hideTimer = setTimeout(() => {
        setHideMessages(true);
      }, 1000);

      // Delay before showing flowers
      const flowerTimer = setTimeout(() => {
        setShowFlowers(true);
      }, 0);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(flowerTimer);
      };
    }
  }, [messageIndex, showInitialMessage]);

  return (
    <div className="App">
      <Fireflies />
      <h1 className="text-4xl text-white text-center mt-10">
        {showInitialMessage ? (
          <BlurMessage text="Feliz San Valentín, Madre" textSize="6xl" />
        ) : null}
      </h1>
      <div className="message-container mt-6">
        {!hideMessages && currentMessage && !showInitialMessage && (
          <BlurMessage
            key={messageIndex}
            text={currentMessage.text}
            textSize={currentMessage.size}
          />
        )}
      </div>
      {showFlowers && <Flowers />} {/* Show flowers when ready */}
    </div>
  );
}

export default App;
