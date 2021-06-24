import React from "react";

import logo from "../assets/logo.png";

export interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="text-center hero my-5">
      <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
      <h1 className="mb-4">React.js Sample Project</h1>

      <p className="lead">
        This is a sample application that demonstrates an authentication flow
        for an SPA, using <a href="https://reactjs.org">React.js</a>
      </p>
    </div>
  );
};

export default Hero;
