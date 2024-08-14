const mongoose = require('mongoose')
const commentSchema = require('./comment');

const logSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    purpose: { // for the form
        type: String,
        enum: ['Conduct Referral', 'MTSS Referral', 'Journal'],
        required: true

        // the alert of an action required should be automated to 
        // if this property !Journal
    },
    notes: { // for the form
        type: String,
        required: true,
    },
    
    actionCompleted: Boolean,
    createdAt: { 
        type: Date, 
        default: Date.now
    },
    updatedAt: {
        type:Date,
        default: Date.now
    },
    comments: [commentSchema],
});


const Log = mongoose.model('Log', logSchema);
module.exports = { logSchema, Log };