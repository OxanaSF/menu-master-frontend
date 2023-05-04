import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import bgImage from '../../Images/PublicImages/hero-image-2.png';
import { v4 as uuidv4 } from 'uuid';


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    firstName: '',
    lastName: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(formData),
      body: JSON.stringify({
        user_id: uuidv4(),
        username: formData.email,
        password: formData.password,
        dietaryRestrictions: '',
        preferredCuisineTypes: '',
        groceryList: '',
        individualMenu: '',
      }),
    };
    fetch('http://localhost:8080/users/register', requestOptions)
      .then(response => {
        if (response.ok) {
          console.log('User registered successfully');
        } else {
          console.log('Error registering user');
        }
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  };
  

  return (
    <div>
      <Container
        className="my-5 py-3 form-container"
        style={{
          maxWidth: '400px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
        }}
      >
        <h2 className="text-center mb-4">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
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
            />
          </Form.Group>

          <Button
            className="btn main-color text-white mt-3"
            variant="primary"
            type="submit"
          >
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterForm;
