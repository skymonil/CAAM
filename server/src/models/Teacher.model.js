import { Schema, model } from 'mongoose';

export const teacherSchema = new Schema({
    username: {
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    subjectId: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject', 
    }],
    comment: {
        type: String,
        default: ''
    }
}, {timestamps:true});

const Experiment = model('Experiment', experimentSchema);

export default Experiment;