import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ["shop", "customer"], default: "customer" },
		shop: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: function () {
				return this.role === "customer";
			},
		},
		shopCode: { type: String, unique: true, sparse: true },
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
