import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject', 
    }],
    duration: {
        type: String,
        required: true,
    },
    eligibility: {
        type: String,
        required: true, 
    },
    feeAmount: {
        type: Number,
        required: true,
        min: 0,
    },
});

const Course = model('Course', courseSchema);

export default Course;
