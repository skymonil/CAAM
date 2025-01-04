import express from "express";
import { getAdmin } from "../controllers/admin.controller.js";
import { authenticateAdmin } from "../middleware/authAdmin.middleware.js";
const router = express.Router();

router.get('/get', authenticateAdmin, getAdmin);

export default router;
