import { Schema, model } from 'mongoose';

const studentDetailsSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student', // Reference to Student model
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`,
        },
    },
    parentName: {
        type: String,
        required: true,
    },
    parentPhone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`,
        },
    },
    address: {
        type: String,
        required: true,
    },
    lastInstitution: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100, // Assuming a score is a percentage
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course', // Reference to Course model
        required: true,
    },
    documents: {
        type: [String], // Array of strings containing document names or URLs
        validate: {
            validator: function (arr) {
                return arr.length === 4; // Ensure exactly 4 documents are provided
            },
            message: 'Exactly 4 documents are required: Photo, Marksheet, Leaving Certificate, Aadhar.',
        },
    },
    college: {
        type: String,
        required: true,
    },
    scholarship: {
        type: Schema.Types.ObjectId,
        ref: 'Scholarship', // Reference to Scholarship model
    },
    walletBalance: {
        type: Number,
        default: 0, // Default balance is 0
        min: 0, // Wallet balance cannot be negative
    },
    status: { 
        type: String,
        enum: ['Registered', 'Form Submitted', 'Selected', 'Admitted','Active'],
        default: 'Registered', // Default status is Registered
    },
}, {timestamps:true});

const StudentDetails = model('StudentDetails', studentDetailsSchema);

export default StudentDetails;
