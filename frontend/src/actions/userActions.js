import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

// Defining a login function that takes in user credentials and dispatches actions to update state accordingly
export const login = (email, password) => async (dispatch) => {
  try {
    // Dispatching a request action to set loading state to true while the login request is being processed
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // Defining the request headers for making the login request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Making a POST request to the login API with user credentials and the request headers
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    // Dispatching a success action to update the state with user information when the login request is successful
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Saving user information to local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    // Dispatching a fail action to update the state with error message when the login request fails
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Defining a logout function
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

// Defining a register function that takes in user credentials and dispatches actions to update state accordingly
export const register = (name, email, password) => async (dispatch) => {
  try {
    // Dispatching a request action to set loading state to true while the register request is being processed
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    // Defining the request headers for making the register request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Making a POST request to the user API with user credentials and the request headers
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    // Dispatching a success action to update the state with user information when the register request is successful
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // Dispatching a success action to update the state with user information when the login request is successful
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Saving user information to local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    // Dispatching a fail action to update the state with error message when the register request fails
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
