import express from 'express';
import { authUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define a route for handling user login requests
// The authUser function from the userController module is used to handle the login logic
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
