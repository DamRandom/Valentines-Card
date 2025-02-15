import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import BlurText from "./BlurText";

const BlurMessage = ({ text, textSize, onAnimationComplete }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const hasAnimatedRef = useRef(false); // Usamos ref para evitar que se reinicie la animación

  useEffect(() => {
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true; // Solo permite la animación una vez
      setHasAnimated(true);
    }
  }, []); // El useEffect se ejecuta una sola vez al montar el componente

  useEffect(() => {
    if (hasAnimated && onAnimationComplete) {
      onAnimationComplete(); // Notificar que la animación ha terminado
    }
  }, [hasAnimated, onAnimationComplete]);

  return (
    <BlurText
      text={text}
      delay={150}
      animateBy="words"
      direction="top"
      className={`text-${textSize} text-white text-center`}
    />
  );
};

// ✅ Definir los tipos de props
BlurMessage.propTypes = {
  text: PropTypes.string.isRequired,
  textSize: PropTypes.string.isRequired,
  onAnimationComplete: PropTypes.func.isRequired, // Asegurarnos de que se pase esta prop
};

export default BlurMessage;
