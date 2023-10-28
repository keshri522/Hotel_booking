import React from "react";
import Typewriter from "typewriter-effect";

const Typewrittereffect = ({ text }) => {
  return (
    <div style={{ fontSize: "1rem", color: "green", fontWeight: "bold" }}>
      <Typewriter
        options={{
          strings: text,
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default Typewrittereffect;
