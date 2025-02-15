import React from "react";
import "../styles/Flowers.css"; // Asegúrate de importar los estilos

const Flowers: React.FC = () => {
  return (
    <div className="flowers-container">
      <div className="night"></div>
      <div className="flowers">
        {[1, 2, 3].map((num) => (
          <div key={num} className={`flower flower--${num}`}>
            <div className={`flower__leafs flower__leafs--${num}`}>
              {[1, 2, 3, 4].map((leaf) => (
                <div key={leaf} className={`flower__leaf flower__leaf--${leaf}`}></div>
              ))}
              <div className="flower__white-circle"></div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`flower__light flower__light--${i + 1}`}></div>
              ))}
            </div>
            <div className="flower__line">
              {[1, 2, 3, 4, 5, 6].map((leaf) => (
                <div key={leaf} className={`flower__line__leaf flower__line__leaf--${leaf}`}></div>
              ))}
            </div>
          </div>
        ))}

        <div className="grow-ans" style={{ "--d": "1.2s" } as React.CSSProperties}>
          <div className="flower__g-long">
            <div className="flower__g-long__top"></div>
            <div className="flower__g-long__bottom"></div>
          </div>
        </div>

        <div className="growing-grass">
          {[1, 2].map((num) => (
            <div key={num} className={`flower__grass flower__grass--${num}`}>
              <div className="flower__grass--top"></div>
              <div className="flower__grass--bottom"></div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}></div>
              ))}
              <div className="flower__grass__overlay"></div>
            </div>
          ))}
        </div>

        {[2.4, 2.8, 3.2].map((d, index) => (
          <div key={index} className="grow-ans" style={{ "--d": `${d}s` } as React.CSSProperties}>
            <div className="flower__g-right">
              <div className="leaf"></div>
            </div>
          </div>
        ))}

        {[0, 1, 2, 3, 4].map((num) => (
          <div key={num} className={`long-g long-g--${num}`}>
            {[3.6, 3.8, 4, 4.2].map((d, index) => (
              <div key={index} className="grow-ans" style={{ "--d": `${d}s` } as React.CSSProperties}>
                <div className={`leaf leaf--${index}`}></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flowers;
