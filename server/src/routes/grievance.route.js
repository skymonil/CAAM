import express from 'express';

import { addGrievance, resolveGrievance, fetchGrievances } from '../controllers/grievance.controller.js';

const router = express.Router()

router.post('/add',addGrievance);

router.get('/fetch-grievances',fetchGrievances);

router.put('/resolve-grievance/:grievanceId',resolveGrievance);

export default router;