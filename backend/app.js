import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

let users = [];
let currentUser = null;

// login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  currentUser = username;
  res.json({ message: "Login successful", user: { username } });
});

// signup
app.post("/signup", (req, res) => {
  const { username, phone, password } = req.body;
  const exists = users.find((u) => u.username === username);
  if (exists) return res.status(400).json({ message: "User already exists" });

  users.push({ username, phone, password });
  currentUser = username;
  res.json({ message: "Signup successful", user: { username, phone } });
});

// logout
app.post("/logout", (req, res) => {
  // If you had sessions you'd call req.session.destroy()
  res.status(200).json({ message: "Logged out successfully" });
});

app.listen(PORT, () => console.log("Server running on http://localhost:5000"));
