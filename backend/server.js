import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Create an instance of the Express application
const app = express();

// Use the JSON body parser middleware
app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('API is running');
});

// Define routes for handling products and users
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Use the notFound middleware to handle requests for non-existent routes
app.use(notFound);

// Use the errorHandler middleware to handle errors
app.use(errorHandler);

// Start the server and listen for incoming requests
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
