import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    username: {
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['superAdmin', 'DocAdmin', 'MarksAdmin', 'HOD'],
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
});

const Admin = model('Admin', adminSchema);

export default Admin;
