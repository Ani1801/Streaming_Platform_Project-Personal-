const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // This references the 'User' model
        required: true,
        unique: true
    },
    fullName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    genrePreferences: {
        type: [String],
        default: []
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('profile', ProfileSchema);
