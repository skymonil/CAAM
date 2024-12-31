import { Schema, model } from 'mongoose';

const feeSchema = new Schema({
    feeId: {
        type: String,
        required: true,
        unique: true,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student', // Reference to Student model
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    receiptUrl: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending', 'Failed'],
        default: 'Pending', // Default status is Pending
    },
});

const Fee = model('Fee', feeSchema);

export default Fee;
