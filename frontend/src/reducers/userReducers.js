import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants';

// Reducer function for handling user login actions and updating state
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      // Set loading state to true while the login request is being processed
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      // Update the state with user info when login request is successful
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      // Update the state with error message if login request fails
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      // Reset the state when user logs out
      return {};
    default:
      return state;
  }
};
