import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

// Define the LoginScreen component
const LoginScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get the userLogin state and dispatch function from the Redux store
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // Get the redirect path from the location query string
  const redirect = location.search ? location.search.split('=')[1] : '/';

  // Redirect to the specified path when the user is logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  // Handle the form submit event
  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch the login action with the email and password
    dispatch(login(email, password));
  };

  // Render the LoginScreen component with JSX
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {/* Show an error message if there is an error */}
      {error && <Message variant='danger'>{error}</Message>}
      {/* Show a loading spinner if the request is being processed */}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          {/* Update the email state when the email input changes */}
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          {/* Update the password state when the password input changes */}
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Submit the form when the "Sign In" button is clicked */}
        <Button type='submit' variant='primary' className='w-100 mt-3'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          {/* Show a link to the registration page */}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
