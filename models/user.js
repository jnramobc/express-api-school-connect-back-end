const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    logId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Log'
    }],
    commentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});



userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

module.exports = mongoose.model('User', userSchema);