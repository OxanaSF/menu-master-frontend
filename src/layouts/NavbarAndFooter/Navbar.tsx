import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

interface NavbarProps {
  loggedIn: boolean;
  handleLogout: () => void;
}

export const Navbar = ({ loggedIn, handleLogout }: NavbarProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => setShowDropdown(!showDropdown);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Menu Master
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/recipes" className="nav-link">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/plan-meals" className="nav-link">
                Plan Meals
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {loggedIn ? (
              <li className="nav-item">
                <Dropdown show={showDropdown} onToggle={handleDropdownToggle}>
                  <Dropdown.Toggle
                    variant="outline-light"
                    id="dropdown-basic"
                    className="me-2"
                  >
                    Logout
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <li className="nav-item">
                <Dropdown show={showDropdown} onToggle={handleDropdownToggle}>
                  <Dropdown.Toggle
                    variant="outline-light"
                    id="dropdown-basic"
                    className="me-2"
                  >
                    Sign In
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/user-login">Sign In</Dropdown.Item>
                    <Dropdown.Item href="/user-registration">
                      Register
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
