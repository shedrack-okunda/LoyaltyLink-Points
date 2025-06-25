import express from "express";
import {
	getProfile,
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", verifyToken, getProfile);
router.post("/logout", verifyToken, logoutUser);

export default router;
