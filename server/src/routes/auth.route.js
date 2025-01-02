import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  register,
  login,
  logout,
  checkAuth,
  verifyOTP,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/check", authenticate, checkAuth);

router.post("/verify-otp",verifyOTP);

export default router;
