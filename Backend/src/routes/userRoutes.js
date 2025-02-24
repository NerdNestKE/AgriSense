import express from "express";
import { registerUser } from "../../controllers/userController.js"; // Import the registerUser controller

const router = express.Router();

//defining the route for user registration
router.post("/register", registerUser);

export default router;