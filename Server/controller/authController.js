const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (userId) => { 
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
};

exports.signup = async (req, res) => {// Signup new user
  const errors = validationResult(req);   // Validate request
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });// Return errors if any

  const { name, email, password } = req.body;// Extract user details
  const existing = await User.findOne({ email });// Check if email already exists
  if (existing) return res.status(400).json({ message: "Email already registered" });// Return error if exists

  const hashed = await bcrypt.hash(password, 10);// Hash password
  const user = await User.create({ name, email, password: hashed });// Create new user
  const token = signToken(user._id);// Sign JWT token

  res.status(201).json({ user: { id: user._id, name, email, role: user.role }, token });// Return user details and token
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) return res.status(400).json({ message: "Invalid credentials" });

  const token = signToken(user._id);
  res.json({ user: { id: user._id, name: user.name, email, role: user.role }, token });
};
