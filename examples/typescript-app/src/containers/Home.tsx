import React, { Fragment } from "react";
import Content from "../components/Content";
import Hero from "../components/Hero";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <Fragment>
      <Hero />
      <hr />
      <Content />
    </Fragment>
  );
};

export default Home;
