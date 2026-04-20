const User = require('../models/User');

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({ email }).select('+password');
    }

    async findById(id) {
        return await User.findById(id);
    }

    async findByVerificationToken(token) {
        return await User.findOne({
            verificationToken: token,
            verificationTokenExpire: { $gt: Date.now() }
        });
    }

    async update(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
    }
}

module.exports = new UserRepository();
