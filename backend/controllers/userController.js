import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// Define a function to handle user authentication
const authUser = asyncHandler(async (req, res) => {
  // Get the email and password from the request body
  const { email, password } = req.body;

  // Find the user in the database with the provided email
  const user = await User.findOne({ email });

  // If user exists and the password matches, return user details and a token
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    // If user doesn't exist or password doesn't match, return an error message with 401 status code
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Define a function to handle user registration
const registerUser = asyncHandler(async (req, res) => {
  // Get the name, email and password from the request body
  const { name, email, password } = req.body;

  // Find if the user exists in the database with the provided email
  const userExists = await User.findOne({ email });

  // If user exists,  a 400 error is returned.
  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  // Create the user in the database with the provided name, email and password
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

// defines an async function that handles getting a user's profile.
// The asyncHandler middleware is used to handle errors.
const getUserProfile = asyncHandler(async (req, res) => {
  // finds the user based on the ID passed in the request object.
  const user = await User.findById(req.user._id);

  // If the user is found, their details are returned in the response.
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // If the user is not found, a 404 error is returned.
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, registerUser, getUserProfile };
