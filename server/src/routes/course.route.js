import express from "express";
import { getCourses } from "../controllers/course.controller.js";
import { authenticate} from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/get-courses", authenticate , getCourses);

export default router;
