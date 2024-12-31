import { Schema, model } from 'mongoose';

const grievanceSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student', // Reference to Student model
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Resolved', 'Rejected'],
        default: 'Pending', // Default status is Pending
    },
});

const Grievance = model('Grievance', grievanceSchema);

export default Grievance;
