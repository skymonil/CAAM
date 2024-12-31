const mongoose = require('mongoose')

const collegeSchema = mongoose.Schema
(
    {
        collegeId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        courses:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }],
        feeStructure: [{
            title: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }]
    },
    {
        timestamps: true,
    }
)

const College = mongoose.model('College',collegeSchema)

module.exports = College