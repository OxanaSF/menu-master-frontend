import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Form, Button } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { loginRequest } from '../../store/actions/authActions';
import { saveUserId, saveUserName } from '../../store/actions/userActions';
import { selectUserId } from '../../store/selectors/userSelectors';


const LoginForm = () => {
  const userId = useSelector(selectUserId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    const response = await fetch(
      'http://localhost:8080/users/login',
      requestOptions
    );
    if (response.ok) {
      const userData = await response.json();
      dispatch(loginRequest());
      console.log('User data updated:', userData);
   
      document.cookie = `sessionId=${userData[0]};path=/`;

      dispatch(saveUserId(userData[0]));
      console.log('selectUserId', userId);
      dispatch(saveUserName(userData[1]));
      console.log(`/dashboard/${userData[0]}`);

      navigate(`/dashboard/${userData[0]}`);
    } else {
      setError('Invalid email or password');
    }
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
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="username"
              value={formData.username}
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

          <Button
            className="btn main-color text-white mt-3"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginForm;
