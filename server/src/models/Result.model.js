const mongoose = require('mongoose');

const resultSchema = mongoose.Schema
(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        },
        marksObtained:[{
            subjectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject',
                required: true
            },
            marks:{
                type: Number,
                required: true
            }
        }]
    }
)

const Result = mongoose.model('Result',resultSchema);
module.exports = Result;