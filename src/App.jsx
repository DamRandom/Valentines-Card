import { useState, useEffect } from "react";
import "./App.css";
import Fireflies from "./components/Fireflies";
import BlurMessage from "./components/BlurMessage";
import Flowers from "./components/Flowers"; // Importa el nuevo componente

function App() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [hideMessages, setHideMessages] = useState(false); // Para ocultar los mensajes antes de mostrar las flores
  const [showFlowers, setShowFlowers] = useState(false); // Para controlar la aparición de las flores

  useEffect(() => {
    const messages = [
      { text: "Sé que no soy el hijo perfecto...", size: "2xl" },
      { text: "Sé que aún me queda mucho por aprender y mejorar.", size: "xl" },
      { text: "No soy bueno para hablar de mis sentimientos...", size: "lg" },
      { text: "Así que aprendí a programar para hacer algo especial para ti:", size: "xl" }
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
      // Ocultar los mensajes antes de mostrar las flores
      const hideTimer = setTimeout(() => {
        setHideMessages(true);
      }, 1000);

      // Mostrar las flores después de ocultar los mensajes
      const flowerTimer = setTimeout(() => {
        setShowFlowers(true);
      }, 2000);

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
      {showFlowers && <Flowers />} {/* Renderizar las flores cuando el estado sea true */}
    </div>
  );
}

export default App;
