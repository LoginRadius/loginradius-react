import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import {
  Button,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Spinner,
} from "reactstrap";
import { useLRAuth } from "loginradius-react";

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { isAuthenticated, logout, loginWithRedirect, isLoading } = useLRAuth();
  return (
    <div>
      <Navbar light color="light" expand="md">
        <Container>
          <NavbarBrand href="/">LoginRadius</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>
              {isAuthenticated && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/external-api"
                    exact
                    activeClassName="router-link-exact-active"
                  >
                    External API
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <Nav
              className="d-none d-md-block"
              style={{ marginLeft: "auto" }}
              navbar
            >
              {!isAuthenticated && (
                <NavItem>
                  {!isLoading ? (
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      className="btn-margin"
                      onClick={() => loginWithRedirect()}
                    >
                      Log in
                    </Button>
                  ) : (
                    <div>
                      <Spinner type="glow" color="primary" />
                    </div>
                  )}
                </NavItem>
              )}
              {isAuthenticated && (
                <NavLink
                  tag={RouterNavLink}
                  to="/profile"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Profile
                </NavLink>
              )}
              {isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
