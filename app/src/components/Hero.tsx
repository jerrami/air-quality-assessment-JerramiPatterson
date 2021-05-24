import React from "react";
import "./Hero.scss";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="hero">
      <p className="hero-label">Air Quality Assessment</p>
    </div>
  );
};

export default Hero;
