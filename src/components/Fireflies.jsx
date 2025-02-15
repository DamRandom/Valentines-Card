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
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      initialSpeedX: (Math.random() - 0.5) * 0.5, // Store initial speed
      initialSpeedY: (Math.random() - 0.5) * 0.5, // Store initial speed
      size: Math.random() * 6 + 5, 
      flickerDuration: Math.random() * 2 + 2,
    }));

    setFireflies(newFireflies);
  }, []);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const updateFireflies = () => {
      setFireflies((prevFireflies) =>
        prevFireflies.map((firefly) => {
          let { x, y, speedX, speedY, initialSpeedX, initialSpeedY } = firefly;

          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            // Speed up when near the cursor
            speedX += dx * 0.05;
            speedY += dy * 0.05;
          } else {
            // Return to initial speed when not near the cursor
            speedX = initialSpeedX + (Math.random() - 0.5) * 0.05;
            speedY = initialSpeedY + (Math.random() - 0.5) * 0.05;
          }

          speedX = Math.max(-1.5, Math.min(1.5, speedX));
          speedY = Math.max(-1.5, Math.min(1.5, speedY));

          x += speedX;
          y += speedY;

          if (x < 0 || x > window.innerWidth) speedX *= -1;
          if (y < 0 || y > window.innerHeight) speedY *= -1;

          return { ...firefly, x, y, speedX, speedY, initialSpeedX, initialSpeedY };
        })
      );

      requestAnimationFrame(updateFireflies);
    };

    requestAnimationFrame(updateFireflies);

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
