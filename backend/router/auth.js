const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../model/user");
const { v4: uuidv4 } = require("uuid");

const secretkey = "prantik@2004"; // move this to environment variable in production

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, password, email, phone, location } = req.body;
    const uid = uuidv4();

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      uid,
      username,
      password: hashedPassword,
      email,
      phone,
      location,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", uid });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ uid: user.uid, username: user.username }, secretkey, {
      expiresIn: "5h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err });
  }
});

// Verify Token Route
router.post("/verify", (req, res) => {
  const { token } = req.body;
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      res.json({ valid: false, message: "Invalid Token" });
    } else {
      res.json({ valid: true, message: "Valid Token", decoded });
    }
  });
});

module.exports = router;
