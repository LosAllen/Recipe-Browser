const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatar: { type: String },
    dateJoined: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
