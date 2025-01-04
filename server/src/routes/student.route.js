import express from "express";
import { getStudent } from "../controllers/student.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get('/get', authenticate, getStudent);

export default router;
