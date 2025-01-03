import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import Admin from "../models/Admin.model.js";

const otpStore = {};

export const adminSendOTP = async (email) => {
  const otp = crypto.randomInt(100000, 999999);
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore[email] = { otp, expiresAt };

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationMail = {
    from: "College Platform - Admin Verification",
    to: email,
    subject: "Admin Registration - Email Verification (Valid for 5 minutes)",
    text: `The OTP for college registration is ${otp}. It is only valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(verificationMail);
  } catch (error) {
    console.log("Error sending email:", error.message);
    return { message: "Failed to send OTP" };
  }

  return otp;
};

export const adminRegister = async (req, res) => {
  const { collegeName, email, password } = req.body;

  try {
    if (!collegeName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = await adminSendOTP(email);

    otpStore[email] = { otp, hashedPassword, collegeName };

    res.status(201).json({
      message: "OTP sent to your email. Please verify to complete registration.",
    });
  } catch (error) {
    console.log("Error in admin register controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminVerifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!otpStore[email]) {
      return res.status(400).json({ message: "OTP has expired or is invalid" });
    }

    const { otp: storedOTP, expiresAt, hashedPassword, collegeName } = otpStore[email];

    if (Date.now() > expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (parseInt(otp) !== storedOTP) {
      return res.status(400).json({ message: "Invalid OTP. Please try again!" });
    }

    const newAdmin = new Admin({
      collegeName,
      email,
      password: hashedPassword,
      role:'superAdmin',
      username: 'superadmin',
    });

    await newAdmin.save();
    delete otpStore[email];

    res.status(200).json({ message: "Registration Successful. Admin can now login!" });
  } catch (error) {
    console.log("Error in admin verifyOTP controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Email or password is incorrect",
        error: "Email or password is incorrect",
      });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Email or password is incorrect",
        error: "Email or password is incorrect",
      });
    }

    if (!process.env.SECRET_KEY) {
      return res.status(500).json({
        error: "JWT secret is not defined in environment variables",
      });
    }

    const token = generateToken(admin._id, res);

    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.log("Error in admin login controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminLogout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminCheckAuth = (req, res) => {
  try {
    res.status(200).json(req.admin);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
