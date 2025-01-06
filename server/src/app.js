import express from 'express';
import cors from 'cors';
import {connectDB} from './lib/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import authRoute from './routes/auth.route.js';
import accountantRoute from './routes/accountant.route.js'
import adminRoute from './routes/admin.route.js'
import studentRoute from './routes/student.route.js'
import collegeRoute from './routes/college.route.js'
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
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/acc',accountantRoute);
app.use('/api/admin',adminRoute);
app.use('/api/student',studentRoute);
app.use('/api/college',collegeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on : ${PORT}`);
});
