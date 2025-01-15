import express from "express";
import { updateAdminDashboard, updateStudentDashboard } from "../controllers/teacher.controller.js";
// import { authenticateAdmin } from "../middleware/authAdmin.middleware.js";

const router = express.Router();

router.get("/updateAdminDashboard", updateAdminDashboard);

router.get("/updateStudentDashboard", updateStudentDashboard);

export default router;
