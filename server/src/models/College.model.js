import { Schema, model } from 'mongoose';

const FeeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const SubjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true,
  },
  marks: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
});

const CourseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  subject: [SubjectSchema],
  fees: [FeeSchema],
});

// College Schema
const CollegeSchema = new Schema({
  collegeID: {
    type: String,
    required: true,
    unique: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  courses: [CourseSchema],
});

const College = model('College', CollegeSchema);

export default College;
