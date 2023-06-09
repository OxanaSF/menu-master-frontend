import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/selectors/userSelectors';

import './RegistrationForm.css';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    firstName: '',
    lastName: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userId = useSelector(selectUserId);

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dietaryRestrictions: '',
        preferredCuisineTypes: '',
        groceryList: '',
        individualMenu: '',
      }),
    };
    try {
      const response = await fetch(
        'http://localhost:8080/users/register',
        requestOptions
      );
      if (response.ok) {
        const userData = await response.json();
        if (userData[0] === 'User with the same username already exists!') {
          setErrorMessage('User with the same username already exists!');
          console.log('userData[0]', userData[0]);
        } else {
          console.log('User data updated:', userData);
          console.log('User registered successfully');
          setSuccessMessage('User registered successfully');
          navigate('/user-login');
        }
      } else {
        console.log('Error registering user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='register-page'>
      <Container className="my-5 py-3 form-container">
        <h2 className="text-center mb-4 register-h2">Register</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPasswordConfirmation">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              className="btn main-color text-white mt-3 register-h2"
              variant="primary"
              type="submit"
            >
              Register
            </Button>
            {userId && (
              <span style={{ marginLeft: '10px' }}>
                Already have an account?
                <Link
                  to={`/dashboard/${userId}`}
                  style={{ textDecoration: 'none' }}
                >
                  <span className="text-decoration-none main-color-text">
                    Log in
                  </span>
                </Link>
              </span>
            )}

            {!userId && (
              <span style={{ marginLeft: '10px' }}>
                Already have an account?
                <Link to="/user-login" style={{ textDecoration: 'none' }}>
                  <span className="text-decoration-none main-color-text">
                    Log in
                  </span>
                </Link>
              </span>
            )}
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterForm;
