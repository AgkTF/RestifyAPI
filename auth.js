const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // GET user by email
            const user = await User.findOne({ email });
            // MATCH password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user);
                } else {
                    // Passwords didn't match
                    reject('Authentication Failed!');
                }
            });
        } catch (err) {
            // Email not found
            reject('Authentication Failed!');
        }
    });
};
