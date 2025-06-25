import User from "../models/User.js";

export const getCustomersForShop = async (req, res) => {
	try {
		if (req.user.role !== "shop") {
			return res.status(403).json({ message: "Access denied." });
		}

		const customers = await User.find({
			role: "customer",
			shop: req.user.id,
		}).select("-password");

		res.status(200).json({ message: "Customers", customers });
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
};
