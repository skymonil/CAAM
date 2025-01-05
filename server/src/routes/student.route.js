import express from "express";
import { fillDetails } from "../controllers/student.controller.js";

const router = express.Router();

router.post('/fill-details',fillDetails);

export default router;