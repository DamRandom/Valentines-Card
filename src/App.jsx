import { useState, useEffect } from "react";
import "./App.css";
import Fireflies from "./components/Fireflies";
import BlurMessage from "./components/BlurMessage";

function App() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(null); // Mensaje actual
  const [showInitialMessage, setShowInitialMessage] = useState(true); // Controla si se muestra el mensaje inicial

  useEffect(() => {
    const messages = [
      { text: "Sé que no soy el hijo perfecto...", size: "2xl" },
      { text: "Sé que aún me queda mucho por aprender y mejorar.", size: "xl" },
      { text: "No soy bueno para hablar de mis sentimientos...", size: "lg" },
      { text: "Así que aprendí a programar para hacer algo especial para ti:", size: "xl" }
    ];

    if (showInitialMessage) {
      setCurrentMessage({ text: "Feliz San Valentín, Mamá", size: "6xl" });
      const timer = setTimeout(() => {
        setShowInitialMessage(false); // Después de mostrar el mensaje inicial, se oculta
      }, 2000); // Muestra "Feliz San Valentín" por 2 segundos

      return () => clearTimeout(timer);
    } else if (messageIndex < messages.length) {
      const message = messages[messageIndex];
      setCurrentMessage(message); // Set the current message
      const timeToRead = message.text.length * 100; // Approx 100ms per character

      const timer = setTimeout(() => {
        setMessageIndex(messageIndex + 1); // Move to the next message
      }, timeToRead); // Delay based on the message length

      return () => clearTimeout(timer);
    }
  }, [messageIndex, showInitialMessage]); // Dependencias: cuando el mensaje cambia o se oculta el inicial

  return (
    <div className="App">
      <Fireflies />
      <h1 className="text-4xl text-white text-center mt-10">
        {showInitialMessage ? (
          <BlurMessage text="Feliz San Valentín, Mamá" textSize="6xl" />
        ) : (
          <></>
        )}
      </h1>
      <div className="message-container mt-6">
        {currentMessage && !showInitialMessage && (
          <BlurMessage
            key={messageIndex} // Ensure the component re-renders when message changes
            text={currentMessage.text}
            textSize={currentMessage.size}
          />
        )}
      </div>
    </div>
  );
}

export default App;
