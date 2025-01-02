import express from "express";
import { addFunds } from "../controllers/accoutant.controller";

const router = express.Router();

router.post('/add-funds',addFunds);

export default router;