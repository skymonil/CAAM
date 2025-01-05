import express from "express";
import { getStudent, getAllStudent } from "../controllers/student.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authenticateAdmin } from "../middleware/authAdmin.middleware.js";
const router = express.Router();

router.get('/get', authenticate, getStudent);

router.get('/getStudents', authenticateAdmin, getAllStudent);

export default router;
