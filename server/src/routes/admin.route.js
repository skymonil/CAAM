import express from "express";
import { changePassword, getCredentials } from "../controllers/admin.controller.js";
import { authenticateAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/credentials', authenticateAdmin, getCredentials);
router.put('/change-password/:username', authenticateAdmin, changePassword);

export default router;