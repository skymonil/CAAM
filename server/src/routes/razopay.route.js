import express from "express";
import { verifyPayment } from "../controllers/verifyPayment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/verify-payment', authenticate, verifyPayment);

export default router;
