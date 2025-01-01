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

    const existingUser = await User.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    if (newStudent) {
      await newStudent.save();
      console.log("Student registered:", newStudent);
      res.status(201).json({
        message: "Registration Successful",
      });
      // TODO: OTP Verification
    } else {
      res.status(400).json({ message: "Invalid Student Data" });
    }
  } catch (error) {
    console.log("Error in register controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Username or password is incorrect",
        error: "Username or password is incorrect",
      });
    }

    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
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
    console.log("Error in login controller: ", error.message)
    res.status(500).json({message: "Internal Server Error"});
  }
};

export const logout = (_req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller: " + error);
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
