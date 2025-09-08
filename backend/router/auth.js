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
    // Allow anonymous users to send only isAnonymous=true
    const { isAnonymous } = req.body || {};

    if (isAnonymous) {
      // accept anonymous users without Auth0 fields
      const anonymousId = req.body.anonymousId || `anon_${Date.now()}`;
      console.log('Anonymous login:', anonymousId);
      return res.status(200).json({ message: 'Anonymous user accepted', anonymousId });
    }

    // Expecting Auth0 profile fields from frontend for non-anonymous users
    const { auth0UserId, email, name, nickname, picture, emailVerified } = req.body || {};

    if (!auth0UserId || !email) {
      return res.status(400).json({ error: 'Missing required auth0 user fields' });
    }

    console.log('Login payload:', { auth0UserId, email, name, nickname, picture, emailVerified });

    // TODO: lookup or create user in DB using auth0UserId/email
    // For now just acknowledge receipt
    return res.status(200).json({ message: 'User data received', auth0UserId, email });
  } catch (err) {
    console.error('Login route error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err?.toString() });
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
