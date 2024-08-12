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
    logId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Log'
    }],
});

module.exports = mongoose.model('Student', studentSchema);