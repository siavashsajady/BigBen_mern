import express from 'express';
import { authUser } from '../controllers/userController.js';

const router = express.Router();

// Define a route for handling user login requests
// The authUser function from the userController module is used to handle the login logic
router.post('/login', authUser);

export default router;
