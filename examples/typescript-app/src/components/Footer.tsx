import React from "react";

export interface FooterProps {}

const Footer: React.SFC<FooterProps> = () => (
  <footer className="bg-light p-3 text-center">
    <div className="logo" />
    <p>
      Sample project provided by{" "}
      <a href="https://loginradius.com">LoginRadius</a>
    </p>
  </footer>
);

export default Footer;
