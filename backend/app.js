const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = []; // dummy user "database"
let currentUser = null; // dummy "session"

// Dummy login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  currentUser = username;
  res.json({ message: "Login successful", user: { username } });
});

// Dummy signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const exists = users.find((u) => u.username === username);
  if (exists) return res.status(400).json({ message: "User already exists" });

  users.push({ username, password });
  currentUser = username;
  res.json({ message: "Signup successful", user: { username } });
});

// backend/index.js or wherever your routes are
app.post("/logout", (req, res) => {
  // If you had sessions you'd call req.session.destroy()
  res.status(200).json({ message: "Logged out successfully" });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
