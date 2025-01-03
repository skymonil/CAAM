import express from 'express';
import { addLeave, approveLeave, fetchLeave, rejectLeave } from '../controllers/leave.controller.js';

const router = express.Router();

router.post('/add',addLeave);

router.get('/fetch-leaves',fetchLeave);

router.put('/approve-leave/:leaveId',approveLeave);

router.put('/reject-leave/:leaveId',rejectLeave);

export default router;