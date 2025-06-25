import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateShopCode } from "../utils/generateCode.js";

// Register a new user
export const registerUser = async (req, res) => {
	try {
		const {
			name,
			phone,
			password,
			role,
			shop,
			shopCode: customerShopCode,
		} = req.body;

		if (!["shop", "customer"].includes(role)) {
			return res.status(400).json({ message: "Invalid role" });
		}

		let shopCode = undefined;
		let shopRef = undefined;

		if (role === "shop") {
			shopCode = generateShopCode(name);
		}

		if (role === "customer") {
			if (!customerShopCode) {
				return res
					.status(400)
					.json({ message: "Customer must provide a shop code." });
			}

			const shopUser = await User.findOne({
				shopCode: customerShopCode,
			});
			if (!shopUser || shopUser.role !== "shop") {
				return res.status(400).json({ message: "Invalid shop code." });
			}

			shopRef = shopUser._id;
		}

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
			role,
			shop: shopRef,
			shopCode,
		});

		await newUser.save();

		const token = jwt.sign(
			{ id: newUser._id, role: newUser.role },
			process.env.JWT_SECRET
		);

		res.status(201).json({ message: "User registered.", newUser, token });
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
			{ id: existingUser._id, user: existingUser.role },
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
