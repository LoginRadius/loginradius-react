import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ExternalApi from "./containers/ExternalApi";
import Home from "./containers/Home";
import Profile from "./containers/Profile";

const App = () => {
  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
