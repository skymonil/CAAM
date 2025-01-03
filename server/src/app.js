import express from 'express';
import cors from 'cors';
import {connectDB} from './lib/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
import accountantRoute from './routes/accountant.route.js';
import grievanceRoute from './routes/grievance.route.js';

const app = express();
const PORT = 5000;

dotenv.config();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRoute);

//Endpoint to Add Money to Student Wallet from Accountant Side
app.use('/api/admin/accountant',accountantRoute);

//Endpoint to Add Grievance from Student side and Approve Grievance from HOD side
app.use('/api/grievance',grievanceRoute);

app.listen(PORT, () => {
  console.log(`Server is running on : ${PORT}`);
});
