import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Define a middleware function for protecting routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the request headers contain a valid JWT token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(' ')[1];
      // Verify the token and decode its payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user details associated with the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      // If the token is invalid or expired, return an error response
      console.error(error);
      res.status(401);
      throw new Error('Not authorized,token failed ');
    }
  }

  // If no valid token was found, return an error response
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, No token! ');
  }
});

export { protect };
