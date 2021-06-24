import React from 'react';
import { Link } from 'gatsby';
import { useLRAuth } from 'loginradius-react';
export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { isAuthenticated, logout, loginWithRedirect, user } = useLRAuth();
  const pathname = typeof window !== 'undefined' && window.location.pathname;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">@loginradius/loginradius-react</span>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <Link
            to="/"
            className={`nav-item nav-link${pathname === '/' ? ' active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/profile"
            className={`nav-item nav-link${
              pathname === '/profile' ? ' active' : ''
            }`}
          >
            Profile
          </Link>
          <Link
            to="/external-api"
            className={`nav-item nav-link${
              pathname === '/external-api' ? ' active' : ''
            }`}
          >
            External API
          </Link>
        </div>
      </div>

      {isAuthenticated ? (
        <div>
          <span id="hello">
            Hello, {user.FirstName || user.Email[0].Value}!
          </span>{' '}
          <button
            className="btn btn-outline-secondary"
            id="logout"
            onClick={() => logout(window.location.origin)}
          >
            logout
          </button>
        </div>
      ) : (
        <button
          className="btn btn-outline-success"
          id="login"
          onClick={() => loginWithRedirect()}
        >
          login
        </button>
      )}
    </nav>
  );
};

export default NavBar;
