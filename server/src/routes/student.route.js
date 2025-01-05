import express from "express";
import { fillDetails } from "../controllers/student.controller.js";
import upload from "../lib/cloudinary.js";
import { authenticateStudent } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/fill-details',authenticateStudent, fillDetails);

export default router;
