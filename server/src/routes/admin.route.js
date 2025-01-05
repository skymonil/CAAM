import express from "express";
import { getAdmin, getAdmincredential } from "../controllers/admin.controller.js";
import { authenticateAdmin } from "../middleware/authAdmin.middleware.js";
const router = express.Router();

router.get('/get', authenticateAdmin, getAdmin);

router.get('/credential', authenticateAdmin, getAdmincredential);

export default router;
