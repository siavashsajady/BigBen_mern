import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

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
      token: null,
    });
  } else {
    // If user doesn't exist or password doesn't match, return an error message with 401 status code
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export { authUser };
