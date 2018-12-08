const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }
});

userSchema.plugin(timestamps);
const User = mongoose.model('User', userSchema);

module.exports = User;
