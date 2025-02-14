import { useState, useEffect } from 'react';
import './App.css';
import Fireflies from './components/Fireflies';

function App() {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Sé que no soy el hijo perfecto...",
    "Sé que aún me queda mucho por aprender y mejorar.",
    "No soy bueno para hablar de mis sentimientos...",
    "Así que aprendí a programar para hacer algo especial para ti:"
  ];

  useEffect(() => {
    if (messageIndex < messages.length) {
      const timer = setTimeout(() => {
        setMessageIndex(messageIndex + 1);
      }, 2000); // 2 segundos entre cada mensaje

      return () => clearTimeout(timer);
    }
  }, [messageIndex]);

  return (
    <div className="App">
      <Fireflies/>
      <h1>Feliz San Valentín, Mamá</h1>
      <div className="message">
        {messages.slice(0, messageIndex).map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
