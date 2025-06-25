import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register a new user
export const registerUser = async (req, res) => {
	try {
		const { name, phone, password } = req.body;

		const existingUser = await User.findOne({ phone });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "User already exists, please login." });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			name,
			phone,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json({ message: "User registered.", newUser });
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
};

// Login a user
export const loginUser = async (req, res) => {
	try {
		const { phone, password } = req.body;

		const existingUser = await User.findOne({ phone });
		if (!existingUser) {
			return res
				.status(404)
				.json({ message: "User not found, please register." });
		}

		const isMatch = await bcrypt.compare(password, existingUser.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ id: existingUser._id },
			process.env.JWT_SECRET
		);

		res.status(200).json({
			message: "Login successful",
			token: token,
			user: existingUser,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
};

// User profile
export const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");

		res.status(200).json({ message: "User profile", user });
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
};

// logout user
export const logoutUser = async (req, res) => {
	try {
		res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
};
