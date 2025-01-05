import express from 'express';
import { addScholarship, fetchAllParticipatedStudents, participateScholarship, scholarshipsWithoutParticipation, scholarshipsWithParticipation, fetchAllScholarships, approveStudents,payStudents } from '../controllers/scholarship.controller.js';

const router = express.Router()

router.post('/add',addScholarship);

router.post('/participate',participateScholarship);

router.get('/fetch-participated/:studentId',scholarshipsWithParticipation);

router.get('/fetch-non-participated/:studentId',scholarshipsWithoutParticipation);

router.get('/fetch-all',fetchAllScholarships);

router.get('/fetch-students/:scholarshipId',fetchAllParticipatedStudents);

router.post('/approve-students',approveStudents);

router.post('/pay-students',payStudents);

export default router;