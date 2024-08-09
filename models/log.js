const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    studentId: {
        type: String,
        enum: [], //.map of the array of student profiles???
        required: true
    },
    purpose: {
        type: String,
        enum: ['Conduct Referral', 'MTSS Referral', 'Journal'],
        required: true

        // the alert of an action required should be automated to 
        // if this property !Journal
    },
    notes: {
        type: String,
        required: true
    },
    actionCompleted: Boolean,
    // how to do createdAt?
    // how to do updatedAt?
    comments: [commentSchema], // not sure if this is right
});

module.exports = mongoose.model('Log', logSchema);