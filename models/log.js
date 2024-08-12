const mongoose = require('mongoose')
const { commentSchema } = require('./comment'); 

const logSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    // studentId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'StudentProfile',
    //     required: true
    // }, this will be for our stretch
    purpose: {
        type: String,
        enum: ['Conduct Referral', 'MTSS Referral', 'Journal'],
        required: true

        // the alert of an action required should be automated to 
        // if this property !Journal
    },
    notes: {
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
    
    comments: [CommentSchema],
});


const Log = mongoose.model('Log', logSchema);
module.exports = Log;