import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
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
    collegeId: {
        type: Schema.Types.ObjectId,
        ref: 'College', // Reference to the College model
        required: true,
    },
});

const Admin = model('Admin', adminSchema);

export default Admin;
