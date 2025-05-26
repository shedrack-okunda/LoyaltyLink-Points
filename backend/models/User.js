const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    password: String, // hash later with bcrypt
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
