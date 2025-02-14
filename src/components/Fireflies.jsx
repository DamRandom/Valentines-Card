import { useState, useEffect } from 'react';
import '../styles/Fireflies.css';

function Fireflies() {
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    const numFireflies = 20;
    const newFireflies = Array.from({ length: numFireflies }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
    }));

    setFireflies(newFireflies);
  }, []);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const updateFireflies = () => {
      setFireflies((prevFireflies) =>
        prevFireflies.map((firefly) => {
          let { x, y, speedX, speedY } = firefly;

          // Distancia del mouse
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Si el cursor está cerca, la luciérnaga huye
          if (distance < 100) {
            speedX += dx * 0.02;
            speedY += dy * 0.02;
          }

          // Variar movimiento de manera aleatoria
          speedX += (Math.random() - 0.5) * 0.1;
          speedY += (Math.random() - 0.5) * 0.1;

          // Limitar velocidad
          speedX = Math.max(-2, Math.min(2, speedX));
          speedY = Math.max(-2, Math.min(2, speedY));

          // Mover la luciérnaga
          x += speedX;
          y += speedY;

          // Evitar que se salgan de la pantalla
          if (x < 0 || x > window.innerWidth) speedX *= -1;
          if (y < 0 || y > window.innerHeight) speedY *= -1;

          return { ...firefly, x, y, speedX, speedY };
        })
      );

      requestAnimationFrame(updateFireflies);
    };

    requestAnimationFrame(updateFireflies);

    // Capturar movimiento del mouse
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="firefly-container">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="firefly"
          style={{
            left: `${firefly.x}px`,
            top: `${firefly.y}px`,
          }}
        />
      ))}
    </div>
  );
}

export default Fireflies;
