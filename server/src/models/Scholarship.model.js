import { Schema, model } from 'mongoose';

const scholarshipSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    examDate: {
        type: Date,
        required: true,
    },
}, {timestamps:true});

const Scholarship = model('Scholarship', scholarshipSchema);

export default Scholarship;
