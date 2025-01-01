import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import Student from "../models/Student.model.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await Student.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new Student({
      username,
      email,
      password: hashedPassword,
    });
    console.log("User registered:", newUser);

    res.status(201).json({
      message:
        "OTP sent successfully. Complete verification to activate your account",
    });
  } catch (error) {
    console.log("Error in register: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Student.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Username or password is incorrect",
        error: "Username or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Username or password is incorrect",
        error: "Username or password is incorrect",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        error: "JWT secret is not defined in environment variables",
      });
    }

    generateToken(user._id, res);

    console.log("User login successful:", user.email);

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "An error occurred during login : " + err });
  }
};

export const logout = (_req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Error in logout: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in checkAuth: " + err);
    res.status(500).json({ message: "Internal server error" });
  }
};
