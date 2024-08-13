const mongoose = require('mongoose');
const { logSchema } = require('./log');  // Destructure to get logSchema

const studentSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
   },
    iep: Boolean,
    plan504: Boolean,
    eld: {
        type: String,
        enum: ['1', '2', '3', '4', '5', 'FLEP', 'N/A']
    },
    logs: [logSchema],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
