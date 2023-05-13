import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn } from '../../store/selectors/authSelectors';
import { logoutRequest } from '../../store/actions/authActions';
import { selectUserId } from '../../store/selectors/userSelectors';
import { saveUserId } from '../../store/actions/userActions';



export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isLoggedIn = useSelector(selectUserId);
  const userId = useSelector(selectUserId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDropdownToggle = () => setShowDropdown(!showDropdown);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      document.cookie =
        // eslint-disable-next-line no-template-curly-in-string
        'sessionId=${userId}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      dispatch(logoutRequest());
      navigate('/');
      window.location.reload();
      
    } catch (error) {
      console.log(error);
    }
  };


  const handleRecipesLink = () => {
    navigate('/recipes');
    // window.location.reload();
  };

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
              <Link to="/recipes" className="nav-link" onClick={handleRecipesLink}>
                Recipes
              </Link>
            </li>
            {
              Boolean(isLoggedIn) &&
              <li className="nav-item">
                <Link to={`/dashboard/${userId}`} className="nav-link">
                  Dashboard
                </Link>
              </li>
            }

            <li className="nav-item">
              <Link to="/plan-meals" className="nav-link">
                Meal Plans
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {
              Boolean(isLoggedIn) &&
               (
                <li className="nav-item">
                  <Dropdown show={showDropdown} onToggle={handleDropdownToggle}>
                    <Button
                      variant="outline-light"
                      id="dropdown-basic"
                      className="me-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Dropdown>
                </li>
              )
            }

            {
              !Boolean(isLoggedIn) &&
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
                    <Dropdown.Item href="/user-login">Log In</Dropdown.Item>
                    <Dropdown.Item href="/user-registration">
                      Register
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};
