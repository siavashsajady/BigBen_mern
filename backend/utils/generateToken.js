import jwt from 'jsonwebtoken';

// Define a function for generating a JWT token
const generateToken = (id) => {
  // Use the jwt.sign() method to create a new JWT token
  // The token payload contains the user ID
  // The JWT_SECRET environment variable is used as the signing secret
  // The token expires in 30 days
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
