import { useState, useEffect } from 'react';
import '../styles/Fireflies.css';

function Fireflies() {
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    const numFireflies = 40;
    const newFireflies = Array.from({ length: numFireflies }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedX: (Math.random() - 0.5) * 0.5, // Movimiento más lento
      speedY: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 6 + 5, // Tamaño aleatorio entre 5px y 11px
      flickerDuration: Math.random() * 2 + 2, // Duración de parpadeo entre 2s y 4s
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

          // Si el cursor está cerca, la luciérnaga huye más rápido
          if (distance < 100) {
            speedX += dx * 0.05; // Aceleración al huir
            speedY += dy * 0.05;
          }

          // Variar movimiento suavemente
          speedX += (Math.random() - 0.5) * 0.05;
          speedY += (Math.random() - 0.5) * 0.05;

          // Limitar velocidad máxima
          speedX = Math.max(-1.5, Math.min(1.5, speedX));
          speedY = Math.max(-1.5, Math.min(1.5, speedY));

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
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            animation: `flicker ${firefly.flickerDuration}s infinite alternate ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

export default Fireflies;
