const mongoose = require('mongoose');

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
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;