import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Student from "../models/Student.model.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("User model:", Student);
  console.log("Request body:", req.body);

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("MongoDB connection state:", mongoose.connection.readyState);

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name: username,
      email,
      password: hashedPassword,
    });

    if (newStudent) {
      try {
        await newStudent.save();
      } catch (err) {
        console.error("Error saving new student:", err.message, err.errors);
      }
      generateToken(newStudent._id, res);
      console.log("Student registered:", newStudent);
      res.status(201).json({
        _id: newStudent._id,
        message: "Registration Successful",
      });
      // TODO: OTP Verification
    } else {
      res.status(400).json({ message: "Invalid Student Data" });
    }
  } catch (error) {
    console.error("Error in register controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    console.log("Student:", student);
    console.log("email:", email);
    console.log("password:", password);

    if (!student) {
      return res.status(400).json({
        message: "Username or password is incorrect",
        error: "Username or password is incorrect",
      });
    }
    console.log("here1");

    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
      console.log("Password comparison failed:", {
        password,
        hashed: student.password,
      });
      return res.status(400).json({
        message: "Username or password is incorrect",
        error: "Username or password is incorrect",
      });
    }

    if (!process.env.SECRET_KEY) {
      return res.status(500).json({
        error: "JWT secret is not defined in environment variables",
      });
    }

    const token = generateToken(student._id, res);

    console.log("Student Login Successful:", student.email);

    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    console.log("Token cookie cleared.");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.student);
  } catch (error) {
    console.log("Error in checkAuth controller: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};
