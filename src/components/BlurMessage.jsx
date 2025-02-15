import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import BlurText from "./BlurText";

const BlurMessage = ({ text, textSize, onAnimationComplete }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const hasAnimatedRef = useRef(false); 

  useEffect(() => {
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true; 
      setHasAnimated(true);
    }
  }, []); 

  useEffect(() => {
    if (hasAnimated && onAnimationComplete) {
      onAnimationComplete(); 
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


BlurMessage.propTypes = {
  text: PropTypes.string.isRequired,
  textSize: PropTypes.string.isRequired,
  onAnimationComplete: PropTypes.func.isRequired, 
};

export default BlurMessage;
