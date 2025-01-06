import express from "express";
import { getStudent, getAllStudent, fillDetails } from "../controllers/student.controller.js";
import { authenticateStudent } from "../middleware/auth.middleware.js";
import { authenticateAdmin } from "../middleware/authAdmin.middleware.js";
import upload from "../lib/cloudinary.js";

const router = express.Router();

router.get('/get', authenticateStudent, getStudent);

router.get('/getStudents', authenticateAdmin, getAllStudent);

router.post('/fill-details',authenticateStudent, fillDetails);

export default router;
